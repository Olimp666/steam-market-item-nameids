const axios = require('axios');
const fs = require('fs');

//steam store app id, 730 for CS2
const game_id = 730

try {
    names = JSON.parse(fs.readFileSync('names.json', 'utf-8'))
}
catch (err) {
    console.log('JSON error. Emptying JSON.')
    names = []
}
async function get_names() {
    let total_names_count = (await axios.get(`https://steamcommunity.com/market/search/render/?norender=1&appid=${game_id}&sort_column=name`)).data.total_count
    for (let i = 0; i <= total_names_count / 100; i++) {
        try {
            let response = await axios.get(`https://steamcommunity.com/market/search/render/?norender=1&query=&start=${100 * i}&count=${100 * i + 100}&search_descriptions=0&sort_column=name&sort_dir=asc&appid=730`)

            response.data.results.forEach(item => {
                names.push(item.asset_description.market_hash_name)
            });
            if (response.data.total_count == 0) {
                console.log(`Fetch ${i}: retrying`)
                i--
            }
            else {
                console.log(`Fetch ${i}: ${response.statusText}`)
            }
        }
        //TODO: implement a timer for fuly automatic fetching
        catch (err) {
            //continue from this i after rate limit
            console.log(`i = ${i}`)
            return
        }
    }
}
get_names().then(() => {
    fs.writeFile("names.json", JSON.stringify(names), function (err) {
        if (err) {
            console.log(err)
        }
    })
})
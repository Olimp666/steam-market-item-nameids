const axios = require('axios');
const fs = require('fs');

const regex = /Market_LoadOrderSpread\( (\d+) \)/
try {
    names = JSON.parse(fs.readFileSync('names.json', 'utf-8'))
    known = JSON.parse(fs.readFileSync('ids.json', 'utf-8'))
}
catch (err) {
    console.log(err)
}
ids = {}

async function get_ids() {

    for (const name of names) {
        if (known[name] != undefined) {
            ids[name] = known[name]
            continue
        }
        try {
            let url = `https://steamcommunity.com/market/listings/730/${encodeURI(name)}`
            let page = await axios.get(url, { responseType: 'document' })
            let id = parseInt(page.data.match(regex)[1])
            console.log(`${name}: ${id}`)
            ids[name] = id
        }
        catch (err) {
            console.log('Rate limit')
            return
        }
    }
}
get_ids().then(() => {
    fs.writeFile("ids.json", JSON.stringify(ids), function (err) {
        if (err) {
            console.log(err)
        }
    })
})
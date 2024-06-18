# Steam market item_nameids
This project is part of [Skins Profit Calclator](https://github.com/Olimp666/Profit-Calculator) userscript.

## Creating new list
First, you need to obtain every single `market_hash_name` for your game. To do that, run `get_names.js` until it doesn't output error message. When that happens, copy the number and paste it in the for loop body. Steam rate limit is around 20rpm, so it should fetch everything in a few tries.

Then, run `get_ids.js` until it doesn't output anything. Games often have an absurd amount of items, so it should take a whlile to fetch everything.

## Updating the list
In order to keep the list relevant, it should be updated every once in a while (every major update should be fine). Basically, you need to repeat the previous step, but it will me much faster since the majority of items are already fetched.

__The list present here contains all CS2 items as for 19.06.2024__
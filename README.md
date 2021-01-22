# Blackerz-SDK
A developer kit for interact with our API.

<br>

__Example nodeJS Post Bot Description__
```js
const botFunctions = require("./lib/main")

const gobloxBOT = new botFunctions.bot("v1 auth", "bot developer id");
gobloxBOT.botId("bot id")

gobloxBOT.edit({
    shortDescription: "new description here, test test"
}).then(result => {
    console.log(`${result} bisa`)
}).catch(err => {
    console.log(err)
})
```
<br>
Developed by Officall Blackerz, join our [server](https://discord.gg/t7zJBwynFU) for more info.

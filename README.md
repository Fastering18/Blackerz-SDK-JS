# Blackerz-SDK
A developer kit for interact with our API.

<br>

__Example node Post Bot Description__
```js
const botFunctions = require("blackers-api-sdk")

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

Get your v1 auth by visiting our website then click your profile

<br>
Developed by Offical Blackerz, join our [Discord server](https://discord.gg/t7zJBwynFU) for more info.

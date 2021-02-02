# Blackerz-SDK
A developer kit for interact with our API.

<br>

__Example node Post Bot Description__
```js
const blackerz = require("blackers-api-sdk")

blackerz.Authorize("V1auth", "bot developer id");
const scannerBOT = new blackerz.bot("bot id")

scannerBOT.edit({
    shortDescription: "test test lagi ok"
}).then(result => {
    console.log(`${JSON.stringify(result)} sucess`)
}).catch(console.error)

scannerBOT.botData().then(console.log).catch(console.error)

```

Get your **V1 auth** by login to our website then visit your profile, here the link  
https://blackerz.herokuapp.com/

<br>
Developed by Offical Blackerz, join our https://discord.gg/t7zJBwynFU for more information.

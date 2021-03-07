# Blackerz-SDK
A developer kit for interact with our API.

<br>

__Example node Post Bot Description__
```js
const blackerz = require("blackers-api-sdk")

// Getting bot data without authorize
blackerz.botData("777756503028400138").then(console.log)

// Sync with your bot, require auth
blackerz.Authorize("V1auth", "bot developer id");
const scannerBOT = new blackerz.bot("bot id")

scannerBOT.edit({
    shortDescription: "test test lagi ok"
}).then(result => {
    console.log(`${JSON.stringify(result)} sucess`)
}).catch(console.error)

scannerBOT.botData().then(console.log).catch(console.error)

//Check user vote
scannerBOT.checkVote("775363892167573535").then(console.log).catch(console.error)
```  
## API  
`blackerz.botData(BOT_ID)`  
return bot data without authorization  

`blackerz.Authorize(V1_AUTH, DeveloperID?)`  
authorize your access, can be used to construct bot class  

`new blackerz.bot(BOT_ID)`  
return object class to to domething with bot  


## Website  

Get your **V1 auth** by login to our website then visit your profile, here the link  
https://blackerz.herokuapp.com/

<br>
Developed by Offical Blackerz, join our [Discord server](https://discord.gg/t7zJBwynFU) for more information.

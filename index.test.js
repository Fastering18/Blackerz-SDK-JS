// Blackerz API SDK by Fastering18
// More info join our Discord server

const blackerz = require("blackerz-api-sdk")

botFunctions.Authorize("V1auth", "bot developer id");
const goblox = new botFunctions.bot("bot id")

goblox.edit({
    shortDescription: "test test lagi ok"
}).then(result => {
    console.log(`${JSON.stringify(result)} sucess`)
}).catch(console.error)

goblox.botData().then(console.log).catch(console.error)

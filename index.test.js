// Blackerz API SDK by Fastering18
// More info join our Discord server

const botFunctions = require("./lib/main")

const goblox = new botFunctions.bot("v1 auth", "bot developer id");
goblox.botId("bot id")

goblox.edit({
    shortDescription: "test test"
}).then(result => {
    console.log(`${result} wow bisa`)
}).catch(err => {
    console.log(err)
})
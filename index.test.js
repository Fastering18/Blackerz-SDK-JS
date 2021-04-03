// Blackerz API SDK by Fastering18
// More info join our Discord server

const blackerz = require("./lib/main")

blackerz.botData("777756503028400138", {baseURL: "https://blackerz.tk"}).then(console.log).catch(console.error)


/* Sync with your bot*/

/*
blackerz.Authorize("auth v1");

const goblox = new blackerz.bot("bot id or client", {baseURL: "https://blackerz.herokuapp.com"})

goblox.checkVote("user id to check").then(console.log).catch(console.error)

goblox.edit({
    shortDescription: "Discord bot Goblox allow you to calculate number, moderate server, get account information from roblox, etc.",
    longDescription: "# lol"
}).then(result => {
    console.log(`${JSON.stringify(result)} sucess`)
}).catch(console.error)

goblox.botData().then(console.log).catch(console.error)
*/

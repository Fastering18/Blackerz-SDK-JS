const fetch = require("node-fetch")
const baseURL = "https://blackerz.herokuapp.com"

function getBotData(id) {
    if (!id) return undefined;
    const URL = `${baseURL}/api/v1/bots/${id}`
    return new Promise((resolve, reject) => {
        botData = fetch(URL)
        .then(res => res.json())
        .then(bot => {
            if (bot.error) reject(bot);
            resolve(bot) 
        }).catch(err => reject(err))
    })
}

module.exports = getBotData

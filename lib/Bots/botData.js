const fetch = require("node-fetch")
const utilities = require("../util/baseRequest")

/**
 * 
 * @param {(number|string)} id - Client ID of the bot
 * @param {Object} [data={}] - Optional second parameter as option 
 * @param {string} [data.baseURL=utilities.baseURL] - Optional Base URL for request
 * @returns {Promise}
 */
function getBotData(id, data) {
    if (!id) return undefined;
    data = typeof data == "object" ? data : {}
    const URL = `${data.baseURL || utilities.baseURL}/api/v1/bots/${String(id)}`
    return new Promise((resolve, reject) => {
        new utilities.request({url: URL}).get()
        .then(res => res.json())
        .then(bot => {
            if (bot.error) return reject(bot);
            return resolve(bot) 
        }).catch(err => reject(err))
    })
}

module.exports = getBotData

const fetch = require("node-fetch")
const baseURL = "https://blackerz.herokuapp.com"

const votingManager = {
    checkBotVote: function (user, data) {
        return new Promise((resolve, reject) => {
            if (!user) reject(TypeError("check vote require user id parameter"));
            if (typeof user != "number" && typeof user != "string") return reject(TypeError("user parameter should be string or nmber of user id!"));
            user = user.toString()
            const Options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": data["v1Auth"]
                }
            }
            const URL = `${baseURL}/api/v1/bots/${data.botId}/votes?user=${user}`
            fetch(URL, Options)
                .then(res => res.json())
                .then(jsonData => {
                    return resolve(jsonData.voted == 1)
                }).catch(err => reject(err))
        })
    }
}

module.exports = votingManager;

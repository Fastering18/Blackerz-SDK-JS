const utilities = require("../util/baseRequest")

const votingManager = {
    checkBotVote: (user, data, anydata) => {
        return new Promise((resolve, reject) => {
            if (!user) reject(TypeError("check vote require user id parameter"));
            if (typeof user != "number" && typeof user != "string") return reject(TypeError("user parameter should be string or nmber of user id!"));
            anydata = typeof anydata == "object" ? anydata : {}
            user = user.toString()

            const headerss = {
                "Content-Type": "application/json",
                "Authorization": data["v1Auth"]
            }
            const URLto = `${anydata.baseURL || utilities.baseURL}/api/v1/bots/${data.botId}/votes?user=${user}`

            new utilities.request({url: URLto, headers: headerss}).get()
                .then(res => res.json())
                .then(jsonData => {
                    return resolve(jsonData.voted == 1)
                }).catch(err => reject(err))
        })
    }
}

module.exports = votingManager;

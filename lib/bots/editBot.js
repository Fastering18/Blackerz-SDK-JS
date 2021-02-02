const fetch = require("node-fetch")
const baseURL = "https://blackerz.herokuapp.com"

const botEdits = {
    edit: function (data) {
        return new Promise((resolve, reject) => {
            if (!data) reject(TypeError("Edit bot data require object parameter"));
            let botId = data.id;
            if (!botId) reject(TypeError("Edit bot data require id"));
            
            const finalData = {}
            if (data["shortDescription"] !== undefined) finalData["shortDescription"] = data["shortDescription"];
            
            const Options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": data["v1Auth"],
                    "clientId": data["authorID"]
                },
                body: JSON.stringify(finalData)
            }
            const URL = `${baseURL}/api/v1/bots/${botId}/edit`
            fetch(URL, Options)
                .then(res => res.json())
                .then(jsonData => {
                    if (jsonData.error !== "null") reject(jsonData);
                    return resolve(jsonData)
                }).catch(err => reject(err))
        })
    }
}

module.exports = botEdits;

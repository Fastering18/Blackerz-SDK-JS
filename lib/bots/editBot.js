const fetch = require("node-fetch")

function errorHandler(err, reject) {
    reject(err)
}

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
            const URL = `https://blackerz-api.herokuapp.com/api/v1/bots/${botId}/edit`
            fetch(URL, Options)
                .then(res => res.json())
                .then(jsonData => {
                    console.log(jsonData)
                    if (jsonData.error !== "null") errorHandler(jsonData.error, reject);
                    resolve(jsonData)
                }).catch(err => errorHandler(err, reject))
        })
    }
}

module.exports = botEdits;

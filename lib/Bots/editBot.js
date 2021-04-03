const fetch = require("node-fetch")
const utilities = require("../util/baseRequest")

const botEdits = {
    edit: function (data, anydata) {
        return new Promise((resolve, reject) => {
            if (!data) reject(TypeError("Edit bot data require object parameter"));
            let botId = data.id;
            if (!botId) reject(TypeError("Edit bot data require id"));
            
            const finalData = {}
            if (data["shortDescription"] !== undefined) finalData["shortDescription"] = data["shortDescription"];
            if (data["longDescription"] !== undefined) finalData["longDescription"] = data["longDescription"];

            /*const Options = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": data["v1Auth"]
                },
                body: JSON.stringify(finalData)
            }*/
            const headerss =  {
                "Content-Type": "application/json",
                "Authorization": data["v1Auth"]
            }
            const URL = `${anydata.baseURL || utilities.baseURL}/api/v1/bots/${botId}/edit`
            //fetch(URL, Options)
            new utilities.request({url: URL, body: finalData, headers: headerss}).put()
                .then(res => res.json())
                .then(jsonData => {
                    if (jsonData.error !== "null") reject(jsonData);
                    return resolve(jsonData)
                }).catch(err => reject(err))
        })
    }
}

module.exports = botEdits;

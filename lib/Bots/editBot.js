const {request,baseURL} = require("../util/baseRequest")
//const util = require("util");

const botEdits = {
    edit: (data, anydata) => {
        return new Promise((resolve, reject) => {
            if (!data) reject(TypeError("Edit bot data require object parameter"));
            let botId = data.id;
            if (!botId) reject(TypeError("Edit bot data require id"));
            
            const finalData = {}
            if (typeof(data["shortDescription"]) === "string") finalData["shortDescription"] = data["shortDescription"];
            if (typeof(data["longDescription"]) === "string") finalData["longDescription"] = data["longDescription"];
            if (typeof(data["prefix"]) === "string") finalData["prefix"] = data["prefix"];
            if (Array.isArray(data["tags"])) finalData["tags"] = data["tags"];

            const headerss =  {
                "Content-Type": "application/json",
                "Authorization": data["v1Auth"]
            }
            const URL = `${anydata.baseURL || baseURL}/api/v1/bots/${botId}/edit`

            new request({url: URL, body: finalData, headers: headerss}).put()
                .then(res => res.json())
                .then(jsonData => {
                    if (jsonData.error !== "null") reject(jsonData);
                    return resolve(jsonData)
                }).catch(err => reject(err))
        })
    }
}

module.exports = botEdits;

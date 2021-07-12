const {request, baseURL} = require("../util/baseRequest")

let interval = null

function updateServerCount(client, auth, anydata) {
    return new Promise((resolve, reject) => {
        if (!client || !client.user || isNaN(client.user.id)) return reject(false);
        if (!client.guilds || !client.guilds.cache || isNaN(client.guilds.cache.size)) return reject(false);
        
        anydata = typeof anydata == "object" ? anydata : {}
        const finalData = {
            servercount: client.guilds.cache.size
        }

        const headerss = {
            "Content-Type": "application/json",
            "Authorization": auth["v1Auth"]
        }
        new request({url: `${anydata.baseURL || baseURL}/api/v1/bots/${client.user.id}/edit/servercount`, body: finalData, headers: headerss}).post()
            .then(res => res.json())
            .then(jsonData => {
                if (jsonData.error !== "null") reject(jsonData.error);
                return resolve(jsonData)
            }).catch(err => reject(err))
    })
}

function serverCountManager(client, auth) {
    if (!client || !client.user || isNaN(client.user.id)) return console.warn("client invalid");
    if (!client.guilds || !client.guilds.cache || isNaN(client.guilds.cache.size)) return console.warn("server size invalid");
    
    if (interval !== null) clearInterval(interval);
    updateServerCount(client, auth).then(result=> {
        interval = setInterval(() => {
            updateServerCount(client, auth).catch(err => {
                if (interval !== null) clearInterval(interval);
            })
        }, 7.2e6);
        return;
    }).catch(err => {
        if (interval !== null) clearInterval(interval);
        return;
    })
}

module.exports = serverCountManager;
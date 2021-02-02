const fetch = require("node-fetch")

let interval = null
const baseURL = "https://blackerz.herokuapp.com"

function updateServerCount(client, auth) {
    return new Promise((resolve, reject) => {
        if (!client || !client.user || isNaN(client.user.id)) return reject(false);
        if (!client.guilds || !client.guilds.cache || isNaN(client.guilds.cache.size)) return reject(false);

        const finalData = {
            serverCount: client.guilds.cache.size
        }
        const Options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": auth["v1Auth"],
                "clientId": auth["authorID"]
            },
            body: JSON.stringify(finalData)
        }
        const URL = `${baseURL}/api/v1/bots/${client.user.id}/edit`
        fetch(URL, Options)
            .then(res => res.json())
            .then(jsonData => {
                if (jsonData.error !== "null") errorHandler(jsonData.error, reject);
                return resolve(jsonData)
            }).catch(err => reject(err))
    })
}

function serverCountManager(client, auth) {
    if (!client || !client.user || isNaN(client.user.id)) return console.warn("client invalid");
    if (!client.guilds || !client.guilds.cache || isNaN(client.guilds.cache.size)) return console.warn("server size invalid");
    
    if (interval !== null) clearInterval(interval);
    updateServerCount(client, auth).then(result=> {
        interval = setInterval(function() {
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

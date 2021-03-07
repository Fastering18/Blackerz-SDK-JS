// Routing resources
const editBot = require("./Bots/editBot")
const serverCountManager = require("./Bots/serverCount")
const getBotData = require("./Bots/botData")
const checkVote = require("./Bots/checkUserVote")

const Resources = {
    Authorize: function authorize(Auth, authorID) {
        if (!Auth) return TypeError("blackerz.Authorize(auth) require authorization v1 parameter!");

        Resources.AuthorizationV1 = Auth
        Resources.authorID = authorID
    },
    botData: getBotData,
    bot: class botData {
        constructor(id) {
            if (!id) return TypeError("bot.botData('id') require bot id!");
            if (!Resources.AuthorizationV1) return TypeError("To access bot, you have to authorize:  Blackerz.Authorize(AuthV1)");
            if (id.user && !isNaN(id.user.id)) {
                const auth = {
                    v1Auth: Resources.AuthorizationV1
                }
                serverCountManager(id, auth)
                this.botID = id;
                this.clientType = "client"
            } else {
                if (isNaN(id)) return TypeError("Bot id must be a valid number!");
                this.botID = id.toString()
                this.clientType = "clientID"
            }
        };
        botData() {
            if (!this.botID || !this.clientType) return undefined;
            return getBotData(this.clientType == "clientID" ? this.botID : this.botID.user.id)
        }
        edit(data) {
                if (!this.botID) return reject(TypeError("this function require bot id parameter! bot.botId(yourbotid)"));
                let editData = data || {};
                let id = this.clientType == "clientID" ? this.botID : this.botID.user.id
                editData["id"] = id;
                editData["v1Auth"] = Resources.AuthorizationV1;

                return editBot.edit(editData)
        }
        checkVote(userid) {
            return checkVote.checkBotVote(userid, {"v1Auth": Resources.AuthorizationV1, "botId": (this.clientType == "clientID" ? this.botID : this.botID.user.id)})
        }
    }
}

module.exports = Resources;

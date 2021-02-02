// Routing resources
const editBot = require("./Bots/editBot")
const serverCountManager = require("./Bots/serverCount")
const getBotData = require("./Bots/botData")

const Resources = {
    Authorize: function authorize(Auth, authorID) {
        if (!Auth) return TypeError("blackerz.Authorize(auth, authorID) require authorization v1 parameter!");
        if (!authorID) return TypeError("new blackerz.bot(auth, authorID) require Discord author id for bot author!");
        if (isNaN(authorID)) TypeError("Author id must be a valid number!");

        Resources.AuthorizationV1 = Auth
        Resources.authorID = authorID
    },
    bot: class botData {
        constructor(id) {
            if (!id) return TypeError("bot.botData('id') require bot id!");
            if (!Resources.AuthorizationV1 || !Resources.authorID ) return TypeError("To access bot, you must do:  Blackerz.Authorize(AuthV1, authorID)");
            if (id.user && !isNaN(id.user.id)) {
                const auth = {
                    v1Auth: Resources.AuthorizationV1,
                    authorID: Resources.authorID 
                }
                serverCountManager(id, auth)
                this.botID = id;
                this.clientType = "client"
            } else {
                if (isNaN(id)) return TypeError("Bot id must be a valid number!");
                this.botID = id
                this.clientType = "clientID"
            }
        };
        botData() {
            if (!this.botID || !this.clientType) return undefined;
            if (this.clientType == "client"){
                return getBotData(this.botID.user.id)
            } else {
                return getBotData(this.botID)
            }          
        }
        edit(data) {
                if (!this.botID) return reject(TypeError("this function require bot id parameter! bot.botId(yourbotid)"));
                let editData = data || {};
                let id = this.botID
                if (this.botID.user && !isNaN(this.botID.user.id)) id = this.botID.user.id;
                editData["id"] = id;
                editData["v1Auth"] = Resources.AuthorizationV1;
                editData["authorID"] = Resources.authorID;

                return editBot.edit(editData)
        }
    }
}

module.exports = Resources;

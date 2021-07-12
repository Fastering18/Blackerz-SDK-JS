// Routing resources
const editBot = require("./Bots/editBot");
const serverCountManager = require("./Bots/serverCount");
const getBotData = require("./Bots/botData");
const checkVote = require("./Bots/checkUserVote");
const utilities = require("./util/baseRequest");

const Resources = {
    Authorize: 
    /**
     * Authorizing requests
     * @param {string} Auth - Authorization V1, obtain from blackerz website profile page
     * @param {string|number} authorID - Optional, Owner user ID
     * @returns {undefined} - Return void
     */
    function authorize(Auth, authorID) {
        if (!Auth) return TypeError("blackerz.Authorize(auth) require authorization v1 parameter!");

        Resources.AuthorizationV1 = Auth
        Resources.OwnerID = authorID
    },

    botData: getBotData,

    bot: class botData {
        /**
         * Bot class, botData(), edit(), checkVote()
         * @callback botClass
         * @param {function} botData - Get current bot data
         * @param {function} edit - Edit bot data
         * @param {function} checkVote - Check if user voted
         */

        /**
         * @param {(object|string|number)} id - Your discord.js Client or Client Id e.g,  new blackerz.bot("2223123133")
         * @param {object} data - Optional, Authorization can be used without authorize function, set baseURL to modify the default
         * @param {string} [data.AuthorizationV1=authorize function] - Authorization V1, obtain your key from blackerz website account profile
         * @param {string} [data.baseURL="https://blackerz.herokuapp.com"] - Base URL for all requests
         * @returns {botClass} - Return bot class
         */
        constructor(id, data) {
            if (!id) return TypeError("bot.botData('id') require bot id!");
            data = typeof data == "object" ? data : {}
            if (!Resources.AuthorizationV1 && typeof (data.AuthorizationV1) !== "string") return TypeError("To access bot, you have to authorize:  Blackerz.Authorize(AuthV1)");
            if (id.user && !isNaN(id.user.id)) {
                const auth = {
                    v1Auth: Resources.AuthorizationV1
                }
                serverCountManager(id, auth)
                this.botID = id;
                this.clientType = "client"
            } else {
                if (isNaN(id)) return TypeError("Bot id must be a valid number or client Object");
                this.botID = String(id)
                this.clientType = "clientID"
            }
            this.baseURL = data.baseURL || utilities.baseURL // base URL
            this.webhookKey = ""
        };

        /**
         * Bot class, botData(), edit(), checkVote()
         * @callback botData
         * @param {string} LongDescription - Long description of the bot
         * @param {string} ShortDescription - Short description of the bot
         * @param {string} avatar - Discord avatar ID
         * @param {string} inviteLink - Bot invite link
         * @param {string} name - Bot display name
         * @param {object} owner - Owner object
         * @param {string} owner.id - Owner user id
         * @param {string} owner.name - Owner display name
         * @param {string} prefix - Bot prefix
         * @param {number} serverCount - Total server count of the bot
         * @param {string} tag - Bot tag
         * @param {number} upvotes - Bot upvotes on website
         * @param {bool} verified - Bot verified state
         */

        /**
         * Get current bot data
         * @returns {Promise}
         */
        botData() {
            if (!this.botID || !this.clientType) return undefined;
            return getBotData(this.clientType == "clientID" ? this.botID : this.botID.user.id, this)
        }

        /**
         * Edit bot data
         * @param {object} data - Edit data object
         * @param {string} [data.shortDescription=empty] - Short description for bot
         * @param {string} [data.longDescription=empty] - Long description for bot
         * @returns {Promise}
         */
        edit(data) {
            if (!this.botID) return reject(TypeError("this function require bot id parameter! bot.botId(yourbotid)"));
            let editData = data || {};
            let id = this.clientType == "clientID" ? this.botID : this.botID.user.id
            editData["id"] = id;
            editData["v1Auth"] = Resources.AuthorizationV1;

            return editBot.edit(editData, this)
        }

        /**
         * Check if user voted
         * @param {number|string} userid - User id to check
         * @returns {Promise}
         */
        checkVote(userid) {
            return checkVote.checkBotVote(userid, { "v1Auth": Resources.AuthorizationV1, "botId": (this.clientType == "clientID" ? this.botID : this.botID.user.id) }, this)
        }

        /**
         * Express middleware to handle vote webhook
         * @param {string} [key=undefined] - Key to authorize request from blackerz, check out webhook page of your bot.  
         * @returns {function} - function middleware for express
         */
        middleware(key) {
            key = typeof(key) == "string" && key.length >= 1 ? key : typeof(this.webhookKey) == "string" && this.webhookKey.length >= 1 ? this.webhookKey : undefined 
            return (req, res, next) => {
                /*utilities.bodyParser(req, res, next).then(reqn, resn, nextn => {
                    if (typeof (reqn.body) == "object" && reqn.body.vote && reqn.body.vote.id && reqn.headers['authorization'] == key) reqn.vote = reqn.body.vote;
                    return nextn();
                })*/
                var rawbody = "";
                req.on('data', (pecahanData) => { rawbody += pecahanData })
                req.on('end', () => {
                    try {
                        req.body = JSON.parse(rawbody);
                    } catch (err) {
                        req.body = rawbody
                    }
                    if (typeof (req.body) == "object" && req.body.vote && req.body.vote.id && req.headers['authorization'] == key) req.vote = req.body.vote;
                    return next();
                })
            }
        }
    },

    /**
     * Express middleware to handle vote webhook
     * @param {string} key - Key to authorize request from blackerz, check out webhook page of your bot.  
     */
    webhook: class {
        constructor(key) {
            if (key && typeof(key) != "string") return TypeError("First parameter should be key string.");
            this.webhookKey = key
        }
        middleware(key) {
            key = typeof(key) == "string" && key.length >= 1 ? key : typeof(this.webhookKey) == "string" && this.webhookKey.length >= 1 ? this.webhookKey : undefined 
            return (req, res, next) => {
                var rawbody = "";
                req.on('data', (pecahanData) => { rawbody += pecahanData })
                req.on('end', () => {
                    try {
                        req.body = JSON.parse(rawbody);
                    } catch (err) {
                        req.body = rawbody
                    }
                    if (typeof (req.body) == "object" && req.body.vote && req.body.vote.id && req.headers['authorization'] == key) req.vote = req.body.vote;
                    return next();
                })
            }
        }
    }
}

module.exports = Resources;

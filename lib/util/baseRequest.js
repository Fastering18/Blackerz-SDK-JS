const fetch = require("node-fetch")

const config = {
    baseURL: "https://blackerz.herokuapp.com",
    userAgent: "blackerz SDK 0.0.47 (https://github.com/Fastering18/Blackerz-SDK-JS)",
    request: class {
        /**
         * - Request class, get(), put(), post()
         * @callback requestOperation
         * @param {function} get - GET request
         * @param {function} put - PUT request
         * @param {function} post - POST request
         */

        /**
         * Request class
         * @param {object} data - {url: tujuan url, body: isi body, headers: isi headers}
         * @param {string} data.url - link https://amogus.sus
         * @param {object} data.body - body {pesen: "halo kk"}
         * @param {object} data.headers - headers {Authorization: "taulah"}
         * @returns {requestOperation} Request operation
         */
        constructor(data) {
            data = typeof data == "object" ? data : {}
            this.url = data.url
            this.body = typeof data.body == "object" ? JSON.stringify(data.body) : "{}"
            this.headers = data.headers || {}
            this.headers["user-agent"] = data.userAgent || config.userAgent
        }
        
        /**
         * GET response
         * @returns {Promise} promise.then | promise.catch 
         */
        get() {
            return fetch(this.url, {
                method: "GET",
                headers: this.headers
            })
        }

        /**
         * POST response
         * @returns {Promise} promise.then | promise.catch 
         */
        post() {
            return fetch(this.url, {
                method: "POST",
                headers: this.headers,
                body: this.body
            })
        }

        /**
         * PUT response
         * @returns {Promise} promise.then | promise.catch 
         */
        put() {
            return fetch(this.url, {
                method: "PUT",
                headers: this.headers,
                body: this.body
            })
        }
    }
}

module.exports = config

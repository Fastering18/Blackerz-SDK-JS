const fetch = require("node-fetch");

const config = {
    baseURL: "https://blackerz.herokuapp.com", // default URL

    userAgent: "blackerz SDK 0.0.5 (https://github.com/Fastering18/Blackerz-SDK-JS)",

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
         * GET request
         * @returns {Promise} promise.then | promise.catch 
         */
        get() {
            return fetch(this.url, {
                method: "GET",
                headers: this.headers
            })
        }

        /**
         * POST request
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
         * PUT request
         * @returns {Promise} promise.then | promise.catch 
         */
        put() {
            return fetch(this.url, {
                method: "PUT",
                headers: this.headers,
                body: this.body
            })
        }

        /**
         * DELETE request
         * @returns {Promise} promise.then | promise.catch 
         */
        delete() {
            return fetch(this.url, {
                method: "DELETE",
                headers: this.headers
            })
        }

        /**
         * PATCH request
         * @returns {Promise} promise.then | promise.catch 
         */
        patch() {
            return fetch(this.url, {
                method: "PATCH",
                headers: this.headers,
                body: this.body
            })
        }
    },

    bodyParser: (req, res, next) => {
        return new Promise((terima) => {
            var rawbody = "";
            req.on('data', (pecahanData) => { rawbody += pecahanData });
            req.on('end', () => {
                try {
                    req.body = JSON.parse(rawbody);
                } catch (err) {
                    req.body = rawbody;
                };
                return terima(req, res, next);
            });
        });
    }
}

module.exports = config;
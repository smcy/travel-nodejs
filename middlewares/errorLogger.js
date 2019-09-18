/**
 * Travel
 * errorLogger.js
 * Created by Sıdıka ÇAY on 2019-07-02
 */

const {status} = require("../constants/app");

/**
 * Catches server errors and returns a user friendly message
 * @param err
 * @param req
 * @param res
 * @param next
 */
function errorLogger(err, req, res, next) {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const agent = req.headers["user-agent"] || "";
    const time = new Date().toUTCString();
    console.log("\x1b[31mError:\x1b[0m", {path: req.url, method: req.method, message: err.message, ip, agent, time});
    res.status(status.INTERNAL_SERVER_ERROR).send("Something went wrong!");
}

module.exports.errorLogger = errorLogger;

/**
 * Travel
 * logger.js
 * Created by Sıdıka ÇAY on 2019-07-02
 */

/**
 * Logs every incoming request
 * @param req
 * @param res
 * @param next
 */
function logger(req, res, next) {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const agent = req.headers["user-agent"] || "";
    const time = new Date().toUTCString();
    console.log("\x1b[32mIncoming:\x1b[0m", {path: req.url, method: req.method, ip, agent, time});
    next();
}

module.exports.logger = logger;

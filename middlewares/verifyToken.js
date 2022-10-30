const { sendError } = require("../helper/error");
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

exports.verifyToken = async (req, res, next) => {
    try {
        const token = req.headers?.authorization.split(" ")?.[1];
        if (!token) sendError(res, "You aren't logged in")
        const decoded = await promisify(jwt.verify)(token, process.env.TOKEN_SECRATE)
        req.user = decoded;
        next()
    } catch (error) {
        res.status(403).json({ status: "fail", error: "Invalid token" })
    }
}
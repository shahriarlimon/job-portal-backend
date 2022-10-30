const { sendError } = require("../helper/error");

exports.authorization = (...role) => {
    return async (req, res, next) => {
        const userRole = req.user.role;
        if (!role.includes(userRole)) sendError(res, "You aren't authorized to access this")
        next()
    }
}
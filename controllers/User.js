const { sendError } = require("../helper/error")
const bcrypt = require('bcrypt');
const User = require("../models/User")
const { generateToken } = require("../utils/token")

exports.signup = async (req, res) => {
    try {
        console.log(req.body)
        const user = new User(req.body)
        user.save()
        if (!user) sendError(res, "Couldn't able to create the user ")
        res.status(200).json({ status: "success", data: user, message: "User created successfully" })

    } catch (error) {
        res.status(400).json({ status: "fail", error: "Couldn't create the user" })
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) sendError(res, "Email/password is required")
        const user = await User.find({ email: email })
        console.log(user)
        if (!user) sendError(res, "User not found");
        const isPasswordMatched = bcrypt.compareSync(password, user[0].password)
        console.log(isPasswordMatched)
         if (!isPasswordMatched) sendError(res, "Password didn't match")
         const token = generateToken(user[0]);
         console.log(token)
         const { password: pwd, ...others } = user[0].toObject();
         console.log(pwd)
         res.status(200).json({ status: "success", token: token, data: others, message: "User logged in successfully" })

    } catch (error) {
        res.status(400).json({ status: "fail", error: " there're some error" })

    }
}
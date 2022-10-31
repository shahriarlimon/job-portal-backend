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
        const user = await User.findOne({ email: email })
        console.log(user)
        if (!user) sendError(res, "User not found");
        const isPasswordMatched = bcrypt.compareSync(password, user.password)
        console.log(isPasswordMatched)
        if (!isPasswordMatched) sendError(res, "Password didn't match")
        const token = generateToken(user);
        console.log(token)
        const { password: pwd, ...others } = user.toObject();
        console.log(pwd)
        res.status(200).json({ status: "success", token: token, data: others, message: "User logged in successfully" })

    } catch (error) {
        res.status(400).json({ status: "fail", error: " there're some error" })

    }
}
exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find({});
        res.status(200).json({ status: "success", data: users })
    } catch (error) {
        res.status(400).json({ status: "fail", error: " there're some error" })


    }
}
exports.getUserById = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await User.findOne({ _id: id })
    } catch (error) {
        res.status(400).json({ status: "fail", error: " there're some error" })
    }
}
exports.getMe = async (req, res, next) => {
    try {
        const email = req.user?.email;
        const user = await User.findOne({ email: email })
        res.status(200).json({ status: 'success', data: user })
    } catch (error) {
        res.status(403).json({ status: 'fail', error })

    }
}


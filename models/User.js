const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please provide a first name"],
        trim: true,
        minLength: [3, "Name must be at least 3 characters"],
        maxLength: [100, "Name is too large"]
    },
    lastName: {
        type: String,
        required: [true, "Please provide a last name"],
        trim: true,
        minLength: [3, "Name must be at least 3 characters"],
        maxLength: [100, "Name is too large"]
    },
    email: {
        type: String,
        validate: [validator.isEmail, "Please provide a valid email"],
        trim: true,
        unique: true,
        lowercase: true,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    confirmPassword: {
        type: String,
        validate: {
            validator: function (value) {
                return value === this.password
            },
            message: "Passwords don't match"
        }
    },
    role: {
        type: String,
        enum: ["candidate", "admin", "hiring manager"],
        default: "candidate"
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("User", userSchema)
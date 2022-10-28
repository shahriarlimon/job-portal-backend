const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;
const jobSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide job name"],
        trim: true,
        lowercase: true,
        minLength: [3, "Job name must be at least 3 characters long"],
        maxLength: [100, "Job name is too large"]
    },
    location: {
        type: String,
        required: [true, "Please provide job location"]
    },
    salary: {
        type: Number,
        required: [true, "Please provide the salary amount"]
    },
    hiringManager: {
        name: { type: String, required: true },
        email: { type: String, required: true, validate: [validator.isEmail, "Please provide a valid email"] },
        id: {
            type: ObjectId,
            ref: "User",
            required: true
        }
    },
    applyInfo: {
        candidates: [{ id: ObjectId, ref: "User" }]
    },
    deadLine: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("Job", jobSchema)
const { json } = require("express")
const Job = require("../models/Job")

exports.getJobs = async (req, res, next) => {
    try {
        let filters = { ...req.query }
        const excludeFields = ['sort', 'limit', 'page']
        excludeFields.forEach(field => delete filters[field])
        let filterString = JSON.stringify(filters)
        filterString = filterString.replace(/\b(gt|lt|lte)\b/g, match => `$${match}`)
        filters = JSON.parse(filterString)
        const queries = {}
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(" ");
            queries.sortBy = sortBy
        }
        if (req.query.fields) {
            const fields = req.query.sort.split(',').join(" ");
            queries.fields = fields
        }
        if (req.query.page) {
            const { page = 1, limit = 5 } = req.query;
            const skip = (page - 1) * parseInt(limit);
            queries.skip = skip;
            queries.limit = parseInt(limit)
        }
        const jobs = await Job.find({ filters }, "-applyInfo -hiringManager").skip(queries.skip).limit(queries.limit).select(queries.fields).sort(queries.sortBy);
        res.status(200).json({ status: "success", data: jobs, message: "successfully getting the jobs" })
    } catch (error) {
        res.status(401).json({ status: "failed", error: error.message })
    }
}
exports.getJobById = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await Job.findOne({ _id: id }, "-applyInfo");
        res.status(200).json({ status: "success", data: job })

    } catch (error) {
        res.status(401).json({ status: "failed", error: error.message })

    }
}
/* exports.createJob = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await Job.create(data);
        res.status(200).json({ status: "success", result, message: "created successfully" })
    } catch (error) {

    }
} */
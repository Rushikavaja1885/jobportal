import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        console.log("COOKIES:", req.cookies);
        if (!req.body) {
            return res.status(400).json({
                message: "Request body is missing.",
                success: false
            });
        }
        const { title, description, requirements, salary, location, jobtype, experience, position, companyId } = req.body;
        const userId = req.id;
        if (!title || !description || !requirements || !salary || !location || !jobtype || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "something is missing.",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobtype,
            experiencelevel: experience,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "new job created successfully.",
            job,
            success: true
        });
    }
    catch (error) {
        console.log(error);
    }
}
export const getAlljobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company" 
        }).sort({createdAt:-1});
        if (!jobs) {
            return res.status(404).json({
                message: "jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    }
    catch (error) {
        console.log(error);
    }
}
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });

    }
    catch (error) {
        console.log(error);
    }
}
//for admin
export const getAdminjobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId });
        if (!jobs) {
            return res.status(404).json({
                message: "jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    }
    catch (error) {
        console.log(error);
    }
}          
import Job from '../models/jobModel.js'
import {StatusCodes} from 'http-status-codes'




export const getAllJobs = async (req, res) => {
    const jobs = await Job.find({createdBy: req.user.userId})

    res.status(StatusCodes.OK).json({jobs});
}

export const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId

    const job = await Job.create(req.body)
    return res.status(StatusCodes.CREATED).json({job});
}

export const getJob = async  (req, res) => {
    const {id} = req.params;
    const job = await Job.findById(id)

    return res.status(StatusCodes.OK).json({job});
}

export const updateJob = async (req, res) => {
    const {id} = req.params
    const updatedJob = await Job.findByIdAndUpdate(id,req.body, {new: true})

    return res.status(StatusCodes.OK).json({message: `job was modified`, updatedJob})
}

export const deleteJob = async (req , res) => {
    const {id} = req.params;
    const job = await Job.findByIdAndDelete(id)

    return res.status(StatusCodes.OK).json({message: `job was deleted`, job})
}

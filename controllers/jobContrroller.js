import Job from '../models/jobModel.js'
import {StatusCodes} from 'http-status-codes'
import mongoose from "mongoose";
import day from "dayjs";



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

export const showStats = async (req , res) => {
    // lesson 158,159
    let stats = await Job.aggregate([
        {$match:{createdBy:new mongoose.Types.ObjectId(req.user.userId)}},
        {$group:{_id:'$jobStatus', count: {$sum:1}}},
    ])
    stats = stats.reduce((acc, curr)=> {
        const {_id: title, count} = curr
        acc[title] = count
        return acc
    },{})
    console.log(stats)

    const defaultStats = {
        pending: stats.pending|| 0,
        interview:stats.interview || 0,
        declined: stats.declined || 0
    }

    let monthlyApplications = await Job.aggregate([
        {$match:{createdBy:new mongoose.Types.ObjectId(req.user.userId)}},
        {$group: {
            _id:{year:{$year:'$createdAt'},
                month:{$month:'$createdAt'}},
                count: {$sum:1}
            }},
        {$sort:{'_id.year': -1, '_id.month': -1}},
        {$limit: 6}
    ])

    monthlyApplications = monthlyApplications.map((item)=> {
        // convert 2 to february
        const {_id:{year, month}, count} = item
        const date = day().month(month - 1).year(year).format('MMM YY')
        return {date, count}
    }).reverse()
    res.status(StatusCodes.OK).json({defaultStats, monthlyApplications})
}

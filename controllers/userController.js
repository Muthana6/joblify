import {StatusCodes} from "http-status-codes";
import Job from '../models/jobModel.js'
import User from '../models/UserModel.js'



export const getCurrentUser = async (req, res) => {
    const user =  await User.findOne({_id:req.user.userId})

    const userWithoutPassword = user.toJSON() // check UserModel 'toJSON' function
    res.status(StatusCodes.OK).json({user: userWithoutPassword})
}

export const getApplicationStats = async (req, res) => {
    const users = await User.countDocuments()
    const jobs = await Job.countDocuments()
    res.status(StatusCodes.OK).json({users, jobs})
}

export const updateUser = async (req, res) => {
    const obj = {...req.body}
    delete obj.password
    const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj)
    res.status(StatusCodes.OK).json({msg:'update user'})
}

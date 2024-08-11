import {StatusCodes} from "http-status-codes";
import Job from '../models/jobModel.js'
import User from '../models/UserModel.js'
import cloudinary from "cloudinary";
import {promises as fs} from 'fs'



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
    const newUser = {...req.body}
    delete newUser.password

    if(req.file){
        const respose = await cloudinary.v2.uploader.upload(req.file.path)
        await fs.unlink(req.file.path)
        newUser.avatar = respose.secure_url
        newUser.avatarPublicId = respose.public_id
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser)

    if(req.file && updatedUser.avatarPublicId){
        await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId)
    }
    res.status(StatusCodes.OK).json({msg:'update user'})
}

import { body, param,validationResult } from "express-validator";
import {BadRequestError, NotFoundError, UnauthorizedError} from "../errors/customError.js";
import {JOB_STATUS, JOB_TYPE} from "../util/constants.js";
import mongoose from "mongoose";
import Job from "../models/jobModel.js";
import User from "../models/UserModel.js";

// A higher-order function to apply validation and handle errors
const withValidationErrors = (validateValues) => {

    // Returns an array where the first element is the validation chain and the second element is the error handling middleware
    return [
        validateValues, // Array of validation rules
        (req, res, next) => {
            // Check for validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                // If there are errors, map them to an array of error messages
                const errorMessages = errors.array().map((error) => {
                    return error.msg;
                });
                if(errorMessages[0].startsWith('no job')){
                    throw new NotFoundError(errorMessages)
                }
                if(errorMessages[0].endsWith('not authorized')){
                    throw new UnauthorizedError(errorMessages)
                }

                // Throw a custom BadRequestError with the error messages
                throw new BadRequestError(errorMessages);
            }
            // If no errors, proceed to the next middleware
            next();
        }
    ];
}

// validation for job input
export const validateJobInput = withValidationErrors(
    [
        body('company').notEmpty().withMessage('company is required'),
        body('position').notEmpty().withMessage('position is required'),
        body('jobLocation').notEmpty().withMessage('job location is required'),

        body('jobStatus').isIn(Object.values(JOB_STATUS)).withMessage('invalid status value'),

        body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('invalid job type'),
    ]
)

export const validateRegisterInput = withValidationErrors(
    [
        body('name').notEmpty().withMessage('name is required'),
        body('email').isEmail().withMessage('invalid email address')
            .custom(async (email)=> {
                const user = await User.findOne({email});
                if(user){
                    throw new BadRequestError('email already exists');
                }
            }),
        body('password').isLength({min:6}).withMessage('password must be 6 characters at least'),
        body('location').notEmpty().withMessage('location is required'),

    ]
)

export const validateLoginInput = withValidationErrors(
    [
        body('email').isEmail().withMessage('invalid email address'),
        body('password').notEmpty().withMessage('password is required'),
    ]
)

// just for testing, ignore
export const validateTest = withValidationErrors(
    [
        // Validate that 'name' is not empty
        body('name')
            .notEmpty().withMessage('Name is required')
            // Validate that 'name' is between 3 and 30 characters long
            .isLength({ min: 3, max: 30 }).withMessage('Name must be between 3 and 30 characters long')
            .trim() // Remove whitespace from both ends of the 'name' string
    ]
);

// validate id params, weather it is a legit mongoose id
export const validateIdParam = withValidationErrors([
    param('id')
        .custom(async (value,{req}) => { // value is the value of the id param
            const isValidId = mongoose.Types.ObjectId.isValid(value)

            // because this function was a sync, we cant return true or false, but we have to throw it as an error
            if(!isValidId) throw new BadRequestError('invalid mongoDB id')

            const job = await Job.findById(value)
            if(!job) throw new NotFoundError(`no job with id ${value}`)

            // authorization error
            const isAdmin = req.user.roles === 'admin'
            const isOwner = req.user.userId === job.createdBy.toString()
            if(!isAdmin && !isOwner) throw new UnauthorizedError('not authorized to access this route')

            })
])

export const validateUserInput = withValidationErrors(
    [
        body('name').notEmpty().withMessage('name is required'),
        body('email').isEmail().withMessage('invalid email address')
            .custom(async (email)=> {
                const user = await User.findOne({email});
                if(user && user._id.toString() !== req.user.userId){
                    throw new BadRequestError('email already exists');
                }
            }),

        body('location').notEmpty().withMessage('location is required'),
        body('lastName').notEmpty().withMessage('lastName is required'),

    ]
)

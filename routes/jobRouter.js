import {Router} from 'express'
import {getJob, getAllJobs, createJob, updateJob, deleteJob} from '../controllers/jobContrroller.js'
import {validateIdParam, validateJobInput} from "../middleware/validationMiddleware.js";

const router = Router()

router.get('/', getAllJobs)
router.post('/', validateJobInput ,createJob)
router.get('/:id',validateIdParam ,getJob)
router.patch('/:id',validateIdParam,validateJobInput ,updateJob)
router.delete('/:id',validateIdParam, deleteJob)

export default router

// const router = Router()
//
// router.get('/', getAllJobs)
// router.post('/' ,createJob)
// router.get('/:id' ,getJob)
// router.patch('/:id' ,updateJob)
// router.delete('/:id', deleteJob)
//
// export default router



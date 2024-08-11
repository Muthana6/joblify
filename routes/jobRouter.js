import {Router} from 'express'
import {getJob, getAllJobs, createJob, updateJob, deleteJob, showStats} from '../controllers/jobContrroller.js'
import {validateIdParam, validateJobInput} from "../middleware/validationMiddleware.js";
import {checkForTestUser} from "../middleware/authMiddleware.js";

const router = Router()

router.get('/', getAllJobs)
router.post('/',checkForTestUser ,validateJobInput ,createJob)
router.get('/stats' ,showStats)
router.get('/:id',validateIdParam ,getJob)
router.patch('/:id',checkForTestUser,validateIdParam,validateJobInput ,updateJob)
router.delete('/:id',checkForTestUser,validateIdParam, deleteJob)

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



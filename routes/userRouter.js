import {Router} from 'express'
import {getApplicationStats, getCurrentUser, updateUser} from "../controllers/userController.js";
import {validateUserInput} from "../middleware/validationMiddleware.js";
import {authorizedPermissions, checkForTestUser} from "../middleware/authMiddleware.js";
import upload from "../middleware/multerMiddleware.js";


const router = Router()

router.get('/current-user',getCurrentUser)
router.get('/admin/app-stats',authorizedPermissions('admin'), getApplicationStats)
router.patch('/update-user',checkForTestUser,upload.single('avatar'),validateUserInput,updateUser)

export default router


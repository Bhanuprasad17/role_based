

import express from 'express'
import {getUsers, loginController, registerController} from '../controllers/registerLoginControllers.js'
import { verifyUser } from '../middlewares/authMiddleware.js'
const router = express.Router()


router.post('/login',loginController)
router.post('/register',registerController)


export default router
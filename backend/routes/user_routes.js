import express from 'express'
import {
    sendRegisterOTP, verifyRegisterOTP,
    completeRegister, loginUser,
} from '../controllers/user_controllers.js'
import { verifyJWTtoken } from '../middlewares/verify_user.js'

const router = express.Router()

router.post('/sendRegisterOTP', sendRegisterOTP)

router.post('/verifyRegisterOTP', verifyRegisterOTP)

router.post('/completeRegister', completeRegister)

router.post('/loginUser', verifyJWTtoken, loginUser)

export default router
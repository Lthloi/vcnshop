import express from 'express'
import {
    sendRegisterOTP, verifyRegisterOTP,
    completeRegister,
} from '../controllers/user_controllers.js'

const router = express.Router()

router.post('/sendRegisterOTP', sendRegisterOTP)

router.post('/verifyRegisterOTP', verifyRegisterOTP)

router.post('/completeRegister', completeRegister)

export default router
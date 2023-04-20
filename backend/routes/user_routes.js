import express from 'express'
import {
    sendRegisterOTP, verifyRegisterOTP,
    completeRegister, loginUser, forgotPassword,
} from '../controllers/user_controllers.js'

const router = express.Router()

router.post('/sendRegisterOTP', sendRegisterOTP)

router.post('/verifyRegisterOTP', verifyRegisterOTP)

router.post('/completeRegister', completeRegister)

router.post('/loginUser', loginUser)

router.post('/forgotPassword', forgotPassword)

export default router
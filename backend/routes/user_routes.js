import express from 'express'
import {
    sendRegisterOTP, verifyOTP, completeRegister,
    loginUser, forgotPassword, resetPassword
} from '../controllers/user_controllers.js'

const router = express.Router()

router.post('/sendRegisterOTP', sendRegisterOTP)

router.post('/verifyOTP', verifyOTP)

router.post('/completeRegister', completeRegister)

router.post('/loginUser', loginUser)

router.post('/forgotPassword', forgotPassword)

router.post('/resetPassword', resetPassword)

export default router
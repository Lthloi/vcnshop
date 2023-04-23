import express from 'express'
import {
    sendRegisterOTP, verifyOTP, completeRegister,
    loginUser, forgotPassword, resetPassword,
    updateProfile, changePassword, updateAvatarUser,
} from '../controllers/user_controllers.js'
import { verifyJWTtoken } from '../middlewares/verify_user.js'

const router = express.Router()

router.post('/sendRegisterOTP', sendRegisterOTP)

router.post('/verifyOTP', verifyOTP)

router.post('/completeRegister', completeRegister)

router.post('/loginUser', loginUser)

router.post('/forgotPassword', forgotPassword)

router.post('/resetPassword', resetPassword)

router.put('/updateProfile', verifyJWTtoken, updateProfile)

router.put('/changePassword', verifyJWTtoken, changePassword)

router.put('/updateAvatarUser', verifyJWTtoken, updateAvatarUser)

export default router
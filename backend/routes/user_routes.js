import express from 'express'
import {
    sendRegisterOTP, verifyOTP, completeRegister,
    loginUser, forgotPassword, resetPassword,
    getUser,
    updateProfile, changePassword, updateUserAvatar,
    logoutUser, getUserLocation,
    getUsersByAdmin,
} from '../controllers/user_controllers.js'
import { roleAuthorization, verifyJWTtoken } from '../middlewares/auth.js'

const router = express.Router()

router.post('/sendRegisterOTP', sendRegisterOTP)

router.post('/verifyOTP', verifyOTP)

router.post('/completeRegister', completeRegister)

router.post('/loginUser', loginUser)

router.post('/forgotPassword', forgotPassword)

router.post('/resetPassword', resetPassword)

router.get('/getUser', verifyJWTtoken, getUser)

router.put('/updateProfile', verifyJWTtoken, updateProfile)

router.put('/changePassword', verifyJWTtoken, changePassword)

router.put('/updateUserAvatar', verifyJWTtoken, updateUserAvatar)

router.post('/logoutUser', logoutUser)

router.get('/getUserLocation', getUserLocation)

router.get('/getUsersByAdmin', verifyJWTtoken, roleAuthorization('Admin'), getUsersByAdmin)

export default router
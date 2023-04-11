import express from 'express'
import {
    sendOTP, verifyOTP,
} from '../controllers/user_controllers.js'

const router = express.Router()

// router.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Credentials', true)
//     next()
// })

router.post('/sendOTP', sendOTP)

router.post('/verifyOTP', verifyOTP)

export default router
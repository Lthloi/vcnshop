import express from 'express'
import {
    getCoupons, getCoupon,
} from '../controllers/coupon_controllers.js'
import { verifyJWTtoken } from '../middlewares/verify_user.js'

const router = express.Router()

router.get('/getCoupons', verifyJWTtoken, getCoupons)

router.get('/getCoupon', verifyJWTtoken, getCoupon)

export default router
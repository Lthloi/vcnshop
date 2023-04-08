import express from 'express'
import {
    getCoupons, getCoupon,
} from '../controllers/coupon_controllers.js'

const router = express.Router()

router.get('/getCoupons/:email', getCoupons)

router.get('/getCoupon/:couponCode', getCoupon)

export default router
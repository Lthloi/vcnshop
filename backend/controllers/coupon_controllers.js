import UserModel from "../models/user_schema.js"
import CouponModel from '../models/coupon_schema.js'
import BaseError from "../utils/base_error.js"
import moment from 'moment'
import catchAsyncError from "../middlewares/catch_async_error.js"
import mongoose from "mongoose"

//get coupons info from an user
const getCoupons = catchAsyncError(async (req, res, next) => {
    let user = await UserModel.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(req.user._id) } },
        {
            $project: {
                '_id': 0,
                'coupon_codes': {
                    $map: {
                        input: '$coupons.list',
                        as: 'coupon',
                        in: {
                            $cond: {
                                if: {
                                    $gt: ['$$coupon.expireAt', new Date()],
                                },
                                then: '$$coupon.code',
                                else: false,
                            }
                        }
                    }
                },
            },
        }
    ])

    if (!user) throw new BaseError('User Not Found', 404)

    let codes = user.coupon_codes.filter((code) => !!code)

    let coupons = await CouponModel.aggregate([
        {
            $match: { code: { $in: codes } }
        },
        {
            $project: {
                'code': 1,
                'name': 1,
                'type': 1,
                'cost': 1,
                'image': 1,
                'describe': 1,
                'apply_for': 1,
                'expired': {
                    $cond: {
                        if: { $lt: ['$expireAt', new Date()] },
                        then: true,
                        else: false,
                    }
                },
                'outOfStock': {
                    $cond: {
                        if: { $eq: ['$stock', 0] },
                        then: true,
                        else: false,
                    }
                }
            }
        },
        { $sort: { 'cost.value': -1 } }
    ])

    if (!coupons) throw new BaseError('Coupons not found', 404)

    res.status(200).json({
        coupons,
    })
})

const getCoupon = catchAsyncError(async (req, res, next) => {
})

export {
    getCoupons, getCoupon,
}
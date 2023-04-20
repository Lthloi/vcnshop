import UserModel from "../models/user_schema.js"
import CouponModel from '../models/coupon_schema.js'
import BaseError from "../utils/base_error.js"
import moment from 'moment'
import catchAsyncError from "../middlewares/catch_async_error.js"

//get coupons info from an user
const getCoupons = catchAsyncError(async (req, res, next) => {
    if (!req.params.email) throw new BaseError('Wrong request property', 400)

    let [{ user_coupon_codes }] = await UserModel.aggregate([
        { $match: { 'email': req.params.email } },
        {
            $project: {
                '_id': 0,
                'user_coupon_codes': {
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

    if (!user_coupon_codes) throw new BaseError('User Not Found', 404)

    let codes = user_coupon_codes.filter((code) => !!code)

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
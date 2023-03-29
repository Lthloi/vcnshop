
import UsersModel from "../models/user_schema.js"
import CouponsModel from '../models/coupon_schema.js'
import BaseError from "../utils/base_error.js"
import moment from 'moment'

//get coupons info from an user
const getCoupons = async (req, res, next) => {
    try {
        if (!req.params.username) throw new BaseError('Wrong request property', 400)

        let [{ user_coupon_codes }] = await UsersModel.aggregate([
            { $match: { 'username': req.params.username } },
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

        let coupons = await CouponsModel.aggregate([
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
    } catch (error) {
        next(error)
    }
}

const getCoupon = async (req, res, next) => {
    try {
        let { couponCode } = req.params
        if (!couponCode) throw new BaseError('Wrong request property', 400)

        let coupon = await CouponsModel.findOne(
            {
                code: couponCode,
            },
        ).lean()

        if (!coupon)
            return res.status(200).json({
                noCoupon: 1,
            })

        if (coupon.stock === 0)
            return res.status(200).json({
                outOfStock: 1,
            })

        if (moment(coupon.expireAt).isBefore(moment()))
            return res.status(200).json({
                outOfDate: 1,
            })

        res.status(200).json({
            coupon,
        })
    } catch (error) {
        next(error)
    }
}

export {
    getCoupons, getCoupon,
}
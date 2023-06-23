import BaseError from "../utils/base_error.js"
import catchAsyncError from "./catch_async_error.js"
import jwt from "jsonwebtoken"
import UserModel from "../models/user_schema.js"
import ShopModel from "../models/shop_schema.js"

const { JWT_SECRET_KEY } = process.env

const verifyJWTtoken = catchAsyncError(async (req, res, next) => {
    let token = req.cookies.JWT_token
    if (!token) throw new BaseError('Token not found', 401, null, true)

    let decoded_data

    try {
        decoded_data = jwt.verify(token, JWT_SECRET_KEY)
    } catch (error) {
        throw error
    }

    let user = await UserModel.findOne(
        { _id: decoded_data.userId },
        {
            '_id': 1,
            'name': 1,
            'avatar': 1,
            'email': 1,
            'role': 1,
        }
    ).lean()
    if (!user) throw new BaseError('User not found', 404)

    req.user = {
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
        role: user.role,
    }

    next()
})

const roleAuthorization = (...valid_role_list) => catchAsyncError((req, res, next) => {
    if (!req.user) throw new BaseError()
    if (!valid_role_list.includes(req.user.role))
        throw new BaseError('You don\'t have permission to access this resource', 403)
    next()
})

const verifyShop = catchAsyncError(async (req, res, next) => {
    let shop = await ShopModel.findOne(
        { 'user.id': req.user._id },
        {
            '_id': 1,
            'name': 1,
        }
    ).lean()
    if (!shop) throw new BaseError('User not found', 404)

    req.shop = {
        _id: shop._id,
        name: shop.name,
    }

    next()
})

export {
    verifyJWTtoken, roleAuthorization, verifyShop
}
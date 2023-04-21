import BaseError from "../utils/base_error.js"
import catchAsyncError from "./catch_async_error.js"
import jwt from "jsonwebtoken"
import UserModel from "../models/user_schema.js"

const { JWT_SECRET_KEY } = process.env

const verifyJWTtoken = catchAsyncError(async (req, res, next) => {
    let token = req.cookies.JWT_token
    if (!token) throw new BaseError('Token not found', 401)

    let decoded_data

    try {
        decoded_data = jwt.verify(token, JWT_SECRET_KEY)
    } catch (error) {
        throw error
    }

    let user = await UserModel.findOne({ _id: decoded_data.userId })
    if (!user) throw new BaseError('User not found', 404)

    next()
})

const roleAuthorization = () => {

}

export {
    verifyJWTtoken, roleAuthorization,
}
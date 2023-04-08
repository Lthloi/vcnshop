import BaseError from '../utils/base_error.js'
import sendMail from '../utils/send_mail.js'
import UsersModel from '../models/user_schema.js'
import { totp } from 'otplib'
import catchAsyncError from '../middlewares/catch_async_error.js'
import { uploadUserAvatar } from '../utils/upload_images.js'

const { OTP_SECRET_KEY } = process.env

const sendOTPAndVerifyEmail = catchAsyncError(async (req, res, next) => {
    let { email } = req.body
    if (!email) throw new BaseError('Wrong property name', 400)

    let user_is_exist = await UsersModel.findOne({ email }, { 'email': 1, _id: 0 }).lean()
    if (user_is_exist) return res.status(200).json({ fail: 'User with the email is exist!' })

    let OTP_code = UsersModel.getOTPCode()

    await UsersModel.create({ email }, { $set: { OTP_code } })

    await sendMail(OTP_code, email)

    res.status(200).json({ success: true })
})

const verifyEmail = catchAsyncError(async (req, res, next) => {
    let { OTP_code, email } = req.body
    if (!OTP_code) throw new BaseError('Wrong property name', 400)

    let OTP_isValid = totp.verify({ token: OTP_code, secret: OTP_SECRET_KEY })
    if (!OTP_isValid) throw new BaseError('OTP is not valid', 400)

    let user_with_OTP_code = await UsersModel.findOne({ email }, { 'OTP_code': 1, _id: 0 })
    if (!user_with_OTP_code)
        return res.status(200).json({ fail: 'Time for register is over, please reregister!' })
    if (user_with_OTP_code.OTP_code !== OTP_code)
        return res.status(200).json({ fail: 'The OTP code is wrong!' })
})

const register = catchAsyncError(async (req, res, next) => {
    let { name, password, email } = req.body
    if (!password || !email) throw new BaseError('Wrong property', 400)

    let avatar_url = await uploadUserAvatar(req.files.avatar, email)

    let hashed_password = await UsersModel.getHashedPassword(password)

    let user = await UsersModel.create({
        name,
        email,
        password: hashed_password,
        avatar: avatar_url,
        coupons: {},
        OTP_code: '',
    })
})

export {
    sendOTPAndVerifyEmail, register, verifyEmail,
}
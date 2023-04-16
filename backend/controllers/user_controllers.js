import BaseError from '../utils/base_error.js'
import sendMail from '../utils/send_mail.js'
import UserModel from '../models/user_schema.js'
import catchAsyncError from '../middlewares/catch_async_error.js'
import { uploadUserAvatar } from '../utils/upload_images.js'
import { SESSION_OTP_EXPIRE } from '../utils/contants.js'
import mongoStore from '../configs/session_store.js'

const sendOTP = catchAsyncError(async (req, res, next) => {
    let { email } = req.body
    if (!email) throw new BaseError('Wrong property name', 400)

    let user_is_exist = await UserModel.findOne({ email })
    if (user_is_exist)
        return res.status(200).json({ fail: 'User with the email is exist!' })

    let user_instance = new UserModel()
    let OTP_code = user_instance.getOTPCode()

    await sendMail(OTP_code, SESSION_OTP_EXPIRE, email)

    req.session.cookie.maxAge = SESSION_OTP_EXPIRE
    req.session.OTP_code = OTP_code
    
    res
        .status(200)
        .cookie('OTP_sid', req.session.id, {
            maxAge: SESSION_OTP_EXPIRE,
            httpOnly: true,
            path: '/',
            domain: req.hostname,
        })
        .json({ success: true })
})

const verifyOTP = catchAsyncError(async (req, res, next) => {
    let { OTP_code } = req.body
    if (!OTP_code) throw new BaseError('Wrong property name', 400)

    let OTP_sid_from_user = req.cookies.OTP_sid
    if (!OTP_sid_from_user) throw new BaseError('Not found session id of OTP from user', 400)

    let OTP_is_matched = false
    let time_is_over = false

    await new Promise((resolve, reject) => {
        mongoStore.load(OTP_sid_from_user, (error, session) => {
            if (error) reject(error)
            if (!session) {
                time_is_over = true
                resolve()
            }
            if (session.OTP_code * 1 === OTP_code * 1) {
                OTP_is_matched = true
                resolve()
            } else resolve()
        })
    })

    if (!OTP_is_matched) return res.status(200).json({ fail: 'OTP code is incorrect!' })
    if (time_is_over) return res.status(200).json({ fail: 'Time for register is over!' })

    res.status(200).json({ success: true })
})

const register = catchAsyncError(async (req, res, next) => {
    let { name, password, email } = req.body
    if (!password || !email) throw new BaseError('Wrong property', 400)

    let avatar_url = await uploadUserAvatar(req.files.avatar, email)

    let hashed_password = await UserModel.getHashedPassword(password)

    let user = await UserModel.create({
        name,
        email,
        password: hashed_password,
        avatar: avatar_url,
        coupons: {},
        OTP_code: '',
    })
})

export {
    sendOTP, verifyOTP,
    register,
}
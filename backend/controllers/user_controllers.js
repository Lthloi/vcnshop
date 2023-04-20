import BaseError from '../utils/base_error.js'
import sendOTPViaEmail from '../utils/send_mail.js'
import UserModel from '../models/user_schema.js'
import catchAsyncError from '../middlewares/catch_async_error.js'
import moment from 'moment'
import sendJWTToken from '../utils/JWT_token.js'
import crypto from 'crypto'

const { JWT_TOKEN_MAX_AGE_IN_DAY } = process.env

const sendRegisterOTP = catchAsyncError(async (req, res, next) => {
    let { email } = req.body
    if (!email) throw new BaseError('Wrong property name', 400)

    let user = await UserModel.findOne({ email }, { 'active': 1, '_id': 0 })
    if (user && user.active)
        throw new BaseError('User with the email has been registered!', 409, null, true)

    let user_instance = new UserModel()
    let OTP_code = user_instance.getOTPCode()
    let OTP_expire_in_minute = 5

    await sendOTPViaEmail(OTP_code, OTP_expire_in_minute, email, null, null, false)

    await UserModel.updateOne(
        { email },
        {
            $set: {
                'OTP_code.value': OTP_code,
                'OTP_code.expireAt': moment().add(OTP_expire_in_minute, 'minutes'),
                'password': crypto.randomBytes(12).toString('hex'), //just for secure, not much important
                'active': false,
            },
        },
        { upsert: true }
    )

    res.status(200).json({ success: true })
})

const verifyRegisterOTP = catchAsyncError(async (req, res, next) => {
    let { OTP_code, email } = req.body
    if (!OTP_code || !email) throw new BaseError('Wrong property name', 400)

    let user = await UserModel.findOne(
        {
            email,
            'OTP_code.expireAt': { $gt: moment() },
        }
    ).lean()
    if (!user) throw new BaseError('Time for register is over!', 408, null, true)

    if (user.OTP_code.value !== OTP_code) throw new BaseError('OTP code is incorrect!', 401, null, true)

    await UserModel.updateOne({ email }, { $set: { 'OTP_code.expireAt': moment().add(30, 'minutes') } })

    res.status(200).json({ success: true })
})

const completeRegister = catchAsyncError(async (req, res, next) => {
    let { name, email, password } = req.body
    if (!email || !password) throw new BaseError('Wrong property name', 400)

    let user = await UserModel.findOne(
        {
            email,
            'OTP_code.expireAt': { $gt: moment() }
        }
    ).lean()
    if (!user) throw new BaseError('Time for register is over!', 408, null, true)

    let user_instance = new UserModel()
    let hashed_password = await user_instance.getHashedPassword(password)

    await UserModel.updateOne(
        { email },
        {
            $set: {
                name: name || 'Unname-User',
                email,
                password: hashed_password,
                active: true,
            }
        }
    )

    sendJWTToken(res, user._id)

    res.status(200).json({ success: true })
})

const loginUser = catchAsyncError(async (req, res, next) => {
    let { email, password } = req.body
    if (!email || !password) throw new BaseError('Wrong property name', 400)

    let user = await UserModel.findOne(
        { email },
        {
            'active': 1,
            'password': 1,
            'avatar': 1,
            'name': 1,
        }
    ).lean()

    if (!user) throw new BaseError('Incorrect email or password, please try again!', 401, null, true)
    if (user && !user.active)
        throw new BaseError('User with the email is not active, please activate user by complete the register!', 401, null, true)

    let user_instance = new UserModel({ password: user.password })
    let match_the_password = await user_instance.compareHashedPassword(password)

    if (!match_the_password)
        throw new BaseError('Incorrect email or password, please try again!', 401, null, true)

    sendJWTToken(res, user._id)

    //>>> fix this: change domain property in cookie
    let cookie_option = { path: '/', domain: 'localhost', httpOnly: true, maxAge: JWT_TOKEN_MAX_AGE_IN_DAY * 86400000 }

    res.cookie('user_avatar', user.name, cookie_option)
    if (user.avatar) res.cookie('user_name', user.avatar, cookie_option)

    res.status(200).json({ success: true })
})

const forgotPassword = catchAsyncError(async (req, res, next) => {
    let { email } = req.body
    if (!email) throw new BaseError('Wrong property name', 400)

    let user = await UserModel.findOne({ email }, { 'active': 1, '_id': 0 })
    if (!user)
        throw new BaseError('User with the email is not registered, please register to continue!', 404, null, true)
    if (user && !user.active)
        throw new BaseError('User with the email is not active, please activate user by complete the register!', 401, null, true)

    let user_instance = new UserModel()
    let OTP_code = user_instance.getOTPCode()
    let OTP_expire_in_minute = 5

    await sendOTPViaEmail(OTP_code, OTP_expire_in_minute, email)

    res.status(200).json({ success: true })
})

export {
    sendRegisterOTP, verifyRegisterOTP, completeRegister,
    loginUser, forgotPassword,
}
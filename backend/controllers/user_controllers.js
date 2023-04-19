import BaseError from '../utils/base_error.js'
import sendMail from '../utils/send_mail.js'
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
        return res.status(200).json({ fail: 'User with the email has been registered!' })

    let user_instance = new UserModel()
    let OTP_code = user_instance.getOTPCode()

    await sendMail(OTP_code, 5, email)

    if (!user) {
        user_instance.email = email
        user_instance.active = false
        user_instance.OTP_code.value = OTP_code
        user_instance.OTP_code.expireAt = moment().add(5, 'minutes')
        user_instance.password = crypto.randomBytes(16).toString('hex') //just for secure, not much important
        await user_instance.save()
    } else
        await UserModel.updateOne(
            { email },
            {
                $set: {
                    'OTP_code.value': OTP_code,
                    'OTP_code.expireAt': moment().add(5, 'minutes'),
                    'password': crypto.randomBytes(16).toString('hex'), //just for secure, not much important
                },
            }
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
    if (!user) return res.status(200).json({ fail: 'Time for register is over!', OTPIsExpire: true })

    if (user.OTP_code.value !== OTP_code) return res.status(200).json({ fail: 'OTP code is incorrect!' })

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
    if (!user) return res.status(200).json({ fail: 'Time for register is over!', registerIsExpire: true })

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
    if (!user) return res.status(200).json({ fail: 'Incorrect email or password, please try again' })
    if (user && !user.active)
        return res.status(200).json({ fail: 'User with the email is not active, please active by complete the register' })

    let user_instance = new UserModel({ password: user.password })
    let match_the_password = await user_instance.compareHashedPassword(password)

    if (!match_the_password)
        return res.status(200).json({ fail: 'Incorrect email or password, please try again' })

    sendJWTToken(res, user._id)

    //>>> fix this: change domain property in cookie
    let cookie_option = { path: '/', domain: 'localhost', httpOnly: true, maxAge: JWT_TOKEN_MAX_AGE_IN_DAY * 86400000 }

    res
        .status(200)
        .cookie('user_avatar', user.avatar, cookie_option)
        .cookie('user_name', user.name, cookie_option)
        .json({ success: true })
})

export {
    sendRegisterOTP, verifyRegisterOTP,
    completeRegister, loginUser,
}
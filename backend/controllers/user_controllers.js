import BaseError from '../utils/base_error.js'
import sendMail from '../utils/send_mail.js'
import UserModel from '../models/user_schema.js'
import catchAsyncError from '../middlewares/catch_async_error.js'
import moment from 'moment'

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
        await user_instance.save({ validateBeforeSave: true })
    } else
        await UserModel.updateOne(
            { email },
            {
                $set: {
                    'OTP_code.value': OTP_code,
                    'OTP_code.expireAt': moment().add(5, 'minutes'),
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
            'OTP_code.expireAt': { $gt: moment() }
        }
    ).lean()
    if (!user) return res.status(200).json({ fail: 'Time for register is over!' })

    if (user.OTP_code.value !== OTP_code) return res.status(200).json({ fail: 'OTP code is incorrect!' })

    res.status(200).json({ success: true })
})

const completeRegister = catchAsyncError(async (req, res, next) => {
    let { name, email, password } = req.body
    if (!email || !password) throw new BaseError('Wrong property', 400)

    let user = await UserModel.findOne(
        {
            email,
            'OTP_code.expireAt': { $gt: moment() }
        }
    ).lean()
    if (!user) return res.status(200).json({ fail: 'Time for register is over!' })

    let hashed_password = await UserModel.getHashedPassword(password)

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

    res.status(200).json({ success: true })
})

export {
    sendRegisterOTP, verifyRegisterOTP,
    completeRegister,
}
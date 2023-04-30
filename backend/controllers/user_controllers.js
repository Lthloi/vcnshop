import BaseError from '../utils/base_error.js'
import sendOTPViaEmail from '../utils/send_mail.js'
import UserModel from '../models/user_schema.js'
import catchAsyncError from '../middlewares/catch_async_error.js'
import moment from 'moment'
import { removeJWTToken, sendJWTToken } from '../utils/JWT_token.js'
import crypto from 'crypto'
import { uploadOneImage } from '../utils/image_uploading.js'
import { IP2_ERROR } from '../utils/constant.js'

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

const verifyOTP = catchAsyncError(async (req, res, next) => {
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

    let OTP_verification_expire_in_minute = 30
    await UserModel.updateOne(
        { email },
        {
            $set: {
                'OTP_code.expireAt': moment().add(OTP_verification_expire_in_minute, 'minutes'),
            }
        }
    )

    res.status(200).json({ success: true })
})

const completeRegister = catchAsyncError(async (req, res, next) => {
    let { name, email, password, gender } = req.body
    if (!email || !password) throw new BaseError('Wrong property name', 400)

    let user = await UserModel.findOne({ email, 'OTP_code.expireAt': { $gt: moment() } }).lean()
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
                gender,
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

    await sendOTPViaEmail(OTP_code, OTP_expire_in_minute, email, 'VCN Shop - Verify OTP For Forgot Password ✔')

    res.status(200).json({ success: true })
})

//only for register period
const resetPassword = catchAsyncError(async (req, res, next) => {
    let { email, newPassword } = req.body
    if (!email || !newPassword) throw new BaseError('Wrong property name', 400)

    let user = await UserModel.findOne({ email, 'OTP_code.expireAt': { $gt: moment() } }).lean()
    if (!user) throw new BaseError('Time for reset password is over!', 408, null, true)

    let user_instance = new UserModel()
    let hashed_password = await user_instance.getHashedPassword(newPassword)

    await UserModel.updateOne({ email }, { $set: { 'password': hashed_password } })

    sendJWTToken(res, user._id)

    res.status(200).json({ success: true })
})

const getUser = catchAsyncError(async (req, res, next) => {
    let user = await UserModel.findOne(
        { _id: req.user._id },
        {
            '_id': 0,
            'name': 1,
            'email': 1,
            'gender': 1,
            'avatar': 1,
            'date_of_birth': 1,
        }
    ).lean()

    res.status(200).json({ user })
})

const updateProfile = catchAsyncError(async (req, res, next) => {
    let { nameOfUser, email, gender, dateOfBirth } = req.body
    if (!nameOfUser || !email || !gender || !dateOfBirth) throw new BaseError('Wrong property name', 400)

    let user_id = req.user._id

    await UserModel.updateOne(
        { _id: user_id },
        {
            $set: {
                'name': nameOfUser,
                'email': email,
                'gender': gender,
                'date_of_birth': dateOfBirth,
            }
        }
    )

    res.status(200).json({ success: true })
})

const changePassword = catchAsyncError(async (req, res, next) => {
    let { oldPassword, newPassword } = req.body
    let user_id = req.user._id
    if (!oldPassword || !newPassword) throw new BaseError('Wrong property name', 400)

    let user = await UserModel.findOne({ _id: user_id }, { 'password': 1 })
    let user_instance = new UserModel({ password: user.password })
    let isMatched = await user_instance.compareHashedPassword(oldPassword)
    if (!isMatched) throw new BaseError('The old password is not correct!', 401, null, true)

    let hashed_newPassword = await user_instance.getHashedPassword(newPassword)
    await UserModel.updateOne({ _id: user_id }, { $set: { 'password': hashed_newPassword } })

    res.status(200).json({ sucess: true })
})

const updateUserAvatar = catchAsyncError(async (req, res, next) => {
    let { avatarImage } = req.files
    let user_id = req.user._id
    let avatar_url = await uploadOneImage(avatarImage, 'users/' + user_id + '/profile')
    if (!avatar_url) throw new BaseError('Can\'t upload image', 500)

    await UserModel.updateOne({ _id: user_id }, { $set: { 'avatar': avatar_url } })

    res.status(200).json({ avatarUrl: avatar_url })
})

const logoutUser = catchAsyncError(async (req, res, next) => {
    removeJWTToken(res)

    res.status(200).json({ success: true })
})

const getUserLocation = catchAsyncError(async (req, res, next) => {
    let ip2_fetchor = await fetch(`https://api.ip2location.io/?key=${process.env.IP2LOCATION_APIKEY}&format=json`)
    if (!ip2_fetchor) throw new BaseError('NetWork or system error', 502)

    let user_location_detail = await ip2_fetchor.json()

    let ip2_error = user_location_detail.error
    if (ip2_error)
        throw new BaseError('Location service is not usable now', ip2_error.error_code, IP2_ERROR)

    res.status(200).json({
        country_name: user_location_detail.country_name,
        region_name: user_location_detail.region_name,
        city_name: user_location_detail.city_name,
        zip_code: user_location_detail.zip_code,
    })
})

export {
    sendRegisterOTP, verifyOTP, completeRegister,
    loginUser,
    forgotPassword, resetPassword,
    getUser,
    updateProfile, changePassword, updateUserAvatar,
    logoutUser, getUserLocation,
}
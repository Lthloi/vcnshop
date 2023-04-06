import mongoose from 'mongoose'
import { totp } from 'otplib'
import BaseError from '../utils/base_error'

const { Schema } = mongoose

const UsersSchema = new Schema({
    name: {
        type: String,
        default: 'Unname-User',
    },
    username: {
        type: String,
        require: true,
        index: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    coupons: {
        count: {
            type: Number,
            required: true,
        },
        list: [{
            type: { type: String, },
            code: { type: String },
            quantity: { type: Number },
            picked: { type: Boolean },
            expireAt: { type: Date, default: Date.now },
        }]
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

UsersSchema.methods.getOTPToken = () => {
    const { OTP_SECRET_KEY } = process.env
    
    let otp_code = totp.generate(OTP_SECRET_KEY) //6 digit
    let isValid = totp.check(token, OTP_SECRET_KEY)
    if (!isValid) return new BaseError('Can\'t generate OTP code. Can\'t send OTP', 500)
    return otp_code
}

const UsersModel = mongoose.model('users', UsersSchema)

export default UsersModel
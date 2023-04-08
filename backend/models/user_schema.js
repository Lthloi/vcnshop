import mongoose from 'mongoose'
import { totp } from 'otplib'
import BaseError from '../utils/base_error.js'
import bcrypt from 'bcrypt'

const { Schema } = mongoose

const UsersSchema = new Schema({
    name: {
        type: String,
        default: 'Unname-User',
    },
    email: {
        type: String,
        require: true,
        index: true,
        unique: true,
        maxLength: [35, 'The length of email must not longer than 25 characters']
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

    OTP_code: {
        type: Number,
        default: 0,
    },
    //>>> set expire field for otp code and for cancel register by user.
    //consider set expire by cookie session at client.
    //At step verify otp code: the time for register is over, please reregister. At this time,...
    //the user has been removed from DB
})

UsersSchema.methods.getOTPCode = function (secret_key) {
    let otp_code = totp.generate(secret_key) //6 digit
    let isValid = totp.check(token, secret_key)
    if (!isValid) throw new BaseError('Can\'t generate OTP code. Can\'t send OTP', 500)
    return otp_code
}

UsersSchema.methods.getHashedPassword = async function (password) {
    let saltRounds = 10
    let hashed_password = await bcrypt.hash(password, saltRounds)
    return hashed_password
}

UsersSchema.methods.compareHashedPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const UsersModel = mongoose.model('users', UsersSchema)

export default UsersModel
import mongoose from 'mongoose'
import { totp } from 'otplib'
import bcrypt from 'bcrypt'
import moment from 'moment'
import jwt from 'jsonwebtoken'

const { Schema } = mongoose

const UserSchema = new Schema({
    name: {
        type: String,
        default: 'Unname-User',
        minLength: [2, 'The length of name must not shorter than 2 characters'],
        maxLength: [25, 'The length of name must not longer than 25 characters'],
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true,
        maxLength: [35, 'The length of email must not longer than 25 characters'],
    },
    password: {
        type: String,
        maxLength: [20, 'The length of password must not longer than 25 characters'],
        minLength: [6, 'The length of name must not shorter than 6 characters'],
        required: true,
    },
    gender: {
        type: String,
        default: 'Female',
    },
    avatar: {
        type: String,
    },
    date_of_birth: {
        type: String, //dd-mm-yyyy
    },
    role: {
        type: String,
        default: 'User', //roles: User || Admin
    },
    coupons: {
        count: {
            type: Number,
            default: 0,
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
        value: {
            type: String,
            minLength: [4, 'The OTP code must not be shorter than 4 characters'],
            maxLength: [6, 'The OTP code must not be longer than 6 characters'],
        },
        expireAt: {
            type: Date,
            default: moment().add(5, 'minutes'),
        },
    },
    active: {
        type: Boolean,
        default: false,
    },
})

const { OTP_SECRET_KEY, JWT_SECRET_KEY, JWT_TOKEN_MAX_AGE_IN_HOUR } = process.env

UserSchema.methods.getOTPCode = function () {
    totp.options = { digits: 4 }
    let OTP_code = totp.generate(OTP_SECRET_KEY)
    return OTP_code
}

UserSchema.methods.getHashedPassword = async function (password) {
    let saltRounds = 10
    return bcrypt.hash(password, saltRounds)
}

UserSchema.methods.compareHashedPassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

UserSchema.methods.getJWTToken = function () {
    let payload = { userId: this._id }
    let token = jwt.sign(payload, JWT_SECRET_KEY, { 'expiresIn': JWT_TOKEN_MAX_AGE_IN_HOUR + 'h' })
    return token
}

const UserModel = mongoose.model('users', UserSchema)

export default UserModel
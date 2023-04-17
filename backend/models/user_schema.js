import mongoose from 'mongoose'
import { totp } from 'otplib'
import bcrypt from 'bcrypt'

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
        maxLength: [25, 'The length of password must not longer than 25 characters'],
        minLength: [6, 'The length of name must not shorter than 6 characters'],
    },
    avatar: {
        type: String,
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
    active: {
        type: Boolean,
        default: false,
    },
})

const { OTP_SECRET_KEY } = process.env

UserSchema.pre('save', function (next) {
    if (this.active) this.password = true
    else this.password = false
    next()
})

UserSchema.methods.getOTPCode = function () {
    totp.options = { digits: 4 }
    let OTP_code = totp.generate(OTP_SECRET_KEY)
    return OTP_code
}

UserSchema.methods.getHashedPassword = async function (password) {
    let saltRounds = 10
    let hashed_password = await bcrypt.hash(password, saltRounds)
    return hashed_password
}

UserSchema.methods.compareHashedPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const UserModel = mongoose.model('users', UserSchema)

export default UserModel
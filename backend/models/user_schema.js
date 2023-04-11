import mongoose from 'mongoose'
import { totp } from 'otplib'
import bcrypt from 'bcrypt'

const { Schema } = mongoose

const UserSchema = new Schema({
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
})

const { OTP_SECRET_KEY } = process.env

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
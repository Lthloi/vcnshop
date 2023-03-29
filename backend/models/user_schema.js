import mongoose from 'mongoose'

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
    shop_followed: [{
        username: String,
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const UsersModel = mongoose.model('users', UsersSchema)

export default UsersModel
import mongoose from 'mongoose'

const { Schema } = mongoose

const ShopSchema = new Schema({
    username: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    greeting: {
        type: String,
    },
    products: {
        ids: [{ type: mongoose.Types.ObjectId }],
        count: {
            type: Number,
            min: [0, 'Number of count must not lower than 0'],
        }
    },
    contact_info: {
        phone: {
            type: String,
            required: true,
        },
        mail: {
            type: String,
            required: true,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    background: {
        type: String,
    },
    avatar: {
        type: String,
    },
    followers: [],
})

const ShopModel = mongoose.model('shops', ShopSchema)

export default ShopModel
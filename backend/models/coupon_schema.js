import mongoose from 'mongoose'

const { Schema } = mongoose

const CouponSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    type: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
        min: [0, 'The cost of coupon can\'t be smaller than or equal 0'],
    },
    currency: {
        type: String,
        default: 'U',
    },
    image: {
        type: String,
        required: true,
    },
    shop: {
        id: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
        },
    },
    describe: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expireAt: {
        type: Date,
        required: true,
    },
    stock: {
        type: String,
        required: true,
        min: [0, 'The stock of coupon can\'t be smaller than or equal 0'],
    },
    apply_for: {
        all: { type: Boolean, default: false },
        shop_username: {
            type: String,
            required: function () { return !this.apply_for.all },
        },
        product_skus: [{ type: String }],
    },
})

const CouponModel = mongoose.model('coupons', CouponSchema)

export default CouponModel
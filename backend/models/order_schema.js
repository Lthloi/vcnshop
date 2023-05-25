import mongoose from 'mongoose'

const { Schema } = mongoose

const OrderSchema = new Schema({
    shipping_info: {
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        zip_code: {
            type: Number,
            required: true,
        },
        phone_number: {
            type: Number,
        },
        method: {
            type: String,
            required: true,
        }
    },
    items_of_order: [
        {
            _id: {
                type: mongoose.Schema.ObjectId,
                ref: "products",
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            cost: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            image_link: {
                type: String,
                required: true,
            },
            color: {
                type: String,
            },
            size: {
                type: String,
            }
        }
    ],
    user: {
        id: {
            type: mongoose.Schema.ObjectId,
            ref: "users",
            required: true,
        },
        email: {
            type: String,
            required: true,
        }
    },
    payment_info: {
        id: {
            type: String,
            required: true,
        },
        method: {
            type: String,
            required: true,
        },
        status: { // stripe, payment intent: processing || canceled || succeeded 
            type: String,
            required: true,
        },
    },
    price_of_items: {
        type: Number,
        required: true,
        default: 0,
    },
    tax_fee: {
        type: Number,
        required: true,
        default: 0,
    },
    shipping_fee: {
        type: Number,
        required: true,
        default: 0,
    },
    total_to_pay: {
        type: Number,
        required: true,
        default: 0,
    },
    order_status: {
        type: String,
        required: true,
        default: 'processing',
    },
    deliveredAt: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const OrderModel = mongoose.model('orders', OrderSchema)

export default OrderModel
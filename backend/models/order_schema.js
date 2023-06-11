import mongoose from 'mongoose'
import ProductModel from './product_schema.js'

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
                type: Schema.Types.ObjectId,
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
            type: Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        }
    },
    payment_info: {
        id: {
            type: String,
            required: true,
            index: true,
            unique: true,
        },
        method: {
            type: String,
            required: true,
        },
    },
    payment_status: { // stripe, statuses of payment intent: processing || canceled || succeeded 
        type: String,
        required: true,
    },
    price_of_items: {
        type: Number,
        required: true,
    },
    tax_fee: {
        type: Number,
        required: true,
    },
    shipping_fee: {
        type: Number,
        required: true,
    },
    total_to_pay: {
        type: Number,
        required: true,
    },
    order_status: { //order statuses: uncompleted || processing || delivering || delivered
        type: String,
        required: true,
    },
    deliveredAt: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

// update the product after every time update order
OrderSchema.pre('updateOne', async function (next) {
    let update_obj = this.getUpdate()
    if (update_obj.$set && update_obj.$set.payment_status === 'succeeded') {
        let order = await OrderModel.findOne({ _id: this.getQuery()._id }, { '_id': 0, 'items_of_order._id': 1 })
        let id_list = order.items_of_order.map(({ _id }) => _id)
        await ProductModel.updateMany(
            { '_id': { $in: id_list } },
            {
                $inc: {
                    'stock': -1,
                    'sold.count': 1,
                },
                $set: {
                    'sold.is_sold_last_time': Date.now,
                }
            }
        )
    }
    next()
})

const OrderModel = mongoose.model('orders', OrderSchema)

export default OrderModel
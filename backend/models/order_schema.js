import mongoose from 'mongoose'

const { Schema } = mongoose

const OrderSchema = new Schema({
    
})

const OrderModel = mongoose.model('coupons', OrderSchema)

export default OrderModel
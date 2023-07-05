import catchAsyncError from "../middlewares/catch_async_error.js"
import OrderModel from "../models/order_schema.js"
import BaseError from "../utils/base_error.js"
import Stripe from "stripe"
import { sendReceiptViaEmail } from '../utils/send_mail.js'
import mongoose from "mongoose"

const { STRIPE_SECRET_KEY, STRIPE_PUBLIC_KEY } = process.env

const stripe = new Stripe(STRIPE_SECRET_KEY)

const initPlaceOrder = catchAsyncError(async (req, res, next) => {
    let {
        currency,
        shipping_info,
        items_of_order,
        price_of_items,
        tax_fee,
        shipping_fee,
        total_to_pay,
    } = req.body

    if (!currency || !shipping_info || !items_of_order || !price_of_items || !total_to_pay)
        throw new BaseError('Wrong property name', 400)
    if ((!tax_fee && tax_fee !== 0) || (!shipping_fee && shipping_fee !== 0))
        throw new BaseError('Wrong property name', 400)

    let { email: user_email, name: user_name } = req.user

    let paymentIntent = await stripe.paymentIntents.create({
        receipt_email: user_email,
        amount: (total_to_pay * 100).toFixed(2) * 1,
        currency,
        metadata: {
            'Company': 'VCN Shop - Fox COR',
        },
    })

    let client_secret = paymentIntent.client_secret

    let order = await OrderModel.create({
        shipping_info,
        items_of_order,
        price_of_items,
        tax_fee,
        shipping_fee,
        total_to_pay,
        order_status: 'uncompleted',
        payment_status: 'processing',
        payment_info: {
            id: client_secret,
            method: 'none',
        },
        user: {
            id: req.user._id,
            email: req.user.email,
            name: req.user.name,
            avatar: req.user.avatar,
        },
    })

    res.status(200).json({
        client_secret,
        stripe_key: STRIPE_PUBLIC_KEY,
        user_email,
        user_name,
        orderId: order._id,
    })
})

// complete the order
const completePlaceOrder = catchAsyncError(async (req, res, next) => {
    let { orderId, paymentId, paymentMethod } = req.body
    if (!orderId) throw new BaseError('Wrong property name', 400)

    await OrderModel.updateOne(
        { _id: orderId },
        {
            $set: {
                'payment_status': 'succeeded',
                'payment_info': {
                    'id': paymentId,
                    'method': paymentMethod,
                },
                'order_status': 'processing',
            }
        }
    )

    res.status(200).json({
        success: true,
    })
})

const sendReceipt = catchAsyncError(async (req, res, next) => {
    let { paymentId, deliveryInfo, receiverInfo, items, taxFee, shippingFee, totalToPay } = req.body

    if (!paymentId || !deliveryInfo || !receiverInfo || !items || !totalToPay)
        throw new BaseError('Wrong property', 400)
    if ((!taxFee && taxFee !== 0) || (!shippingFee && shippingFee !== 0))
        throw new BaseError('Wrong property', 400)

    await sendReceiptViaEmail(
        req.user.email,
        'Receipt Of Payment ' + paymentId,
        {
            paymentId,
            deliveryInfo,
            receiverInfo,
            items,
            shippingFee,
            taxFee,
            totalToPay
        }
    )

    res.status(200).json({ success: true })
})

const getOrder = catchAsyncError(async (req, res, next) => {
    let { paymentId, orderId } = req.query
    if (!paymentId && !orderId) throw new BaseError('Wrong property', 400)

    let order_query = {}
    if (paymentId) order_query['payment_info.id'] = paymentId
    else order_query._id = orderId

    let order = await OrderModel.findOne(order_query).lean()
    if (!order) throw new BaseError('Order not found', 404)

    res.status(200).json({ order, stripe_key: STRIPE_PUBLIC_KEY })
})

const getOrderForShop = catchAsyncError(async (req, res, next) => {
    let { paymentId, orderId, productId } = req.query
    if (!paymentId && !orderId && !productId) throw new BaseError('Wrong property name', 400)
    console.log('>>> req.query >>>', req.query)
    let order_query = {}
    if (paymentId) order_query['payment_info.id'] = mongoose.Types.ObjectId(paymentId)
    else if (orderId) order_query._id = mongoose.Types.ObjectId(orderId)
    else order_query['items_of_order._id'] = mongoose.Types.ObjectId(productId)

    let shop_id = req.user.shop.id

    let orders = await OrderModel.aggregate([
        { $match: order_query },
        {
            $addFields: {
                'items': {
                    $filter: {
                        input: "$items_of_order",
                        as: "item",
                        cond: { $eq: ["$$item.shop_id", shop_id] }
                    }
                },
            }
        },
        {
            $project: {
                'items_of_order': 0,
                'price_of_items': 0,
                'total_to_pay': 0,
                'tax_fee': 0,
                'shipping_fee': 0,
            }
        },
    ])

    if (orders.length === 0) throw new BaseError('Order not found', 404)

    res.status(200).json({ order: orders[0] })
})

const getOrders = catchAsyncError(async (req, res, next) => {
    let { page, limit, paymentStatus } = req.query
    if (!page || !limit) throw new BaseError('Wrong property name', 400)

    let query_object = { 'user.id': req.user._id }
    if (paymentStatus) query_object.payment_status = paymentStatus

    let sort = req.query.sort || { name: 'createdAt', type: -1 }

    let orders = await OrderModel
        .find(
            query_object,
            {
                'createdAt': 1,
                '_id': 1,
                'order_status': 1,
                'payment_status': 1,
                'items_of_order': {
                    $slice: ['$items_of_order', 0, 2]
                },
            }
        )
        .skip((page * 1 - 1) * (limit * 1))
        .sort({ [sort.name]: sort.type })
        .limit(limit * 1)
        .lean()

    let count_product = await OrderModel.countDocuments(query_object)

    if (!orders) throw new BaseError('Orders not found', 404)

    res.status(200).json({ orders, countOrder: count_product })
})

const getOrdersForShop = catchAsyncError(async (req, res, next) => {
    let { page, limit, orderStatus } = req.query

    if (!page || !limit)
        throw new BaseError('Wrong property name', 400)

    let shop_id = req.user.shop.id

    let query_object = { 'items_of_order.shop_id': mongoose.Types.ObjectId(shop_id) }
    if (orderStatus) query_object.order_status = orderStatus

    let orders = await OrderModel.aggregate([
        { $match: query_object },
        {
            $addFields: {
                'items': {
                    $filter: {
                        input: "$items_of_order",
                        as: "item",
                        cond: { $eq: ["$$item.shop_id", shop_id] }
                    }
                },
            }
        },
        {
            $project: {
                'items_of_order': 0,
                'price_of_items': 0,
                'total_to_pay': 0,
                'tax_fee': 0,
                'shipping_fee': 0,
            }
        },
    ])

    if (orders.length === 0) throw new BaseError('Orders not found', 404)

    let slice_begin = (page * 1 - 1) * (limit * 1)
    orders = orders.slice(slice_begin, slice_begin + limit)

    res.status(200).json({ orders })
})

const getOrdersByAdmin = catchAsyncError(async (req, res, next) => {
    let format = {}

    let field_set = req.query

    for (let key of Object.keys(field_set))
        format[key] = 1

    let list = await OrderModel.find({}, format)
    if (!list) throw new BaseError('Something went wrong', 500)

    res.status(200).json({ list })
})

export {
    initPlaceOrder, completePlaceOrder, sendReceipt,
    getOrder, getOrders, getOrdersByAdmin,
    getOrdersForShop, getOrderForShop,
}
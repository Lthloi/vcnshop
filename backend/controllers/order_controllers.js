import catchAsyncError from "../middlewares/catch_async_error.js"
import OrderModel from "../models/order_schema.js"
import BaseError from "../utils/base_error.js"
import Stripe from "stripe"
import { sendReceiptViaEmail } from '../utils/send_mail.js'
import moment from "moment"

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
            method: '...',
        },
        user: {
            id: req.user._id,
            email: req.user.email,
            name: req.user.name,
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
    let { orderId, paymentId, paymentMethod, paymentStatus } = req.body
    if (!orderId) throw new BaseError('Wrong property name', 400)

    await OrderModel.updateOne(
        { _id: orderId },
        {
            $set: {
                'payment_status': paymentStatus,
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

    order.createdAt = moment(order.createdAt.toISOString()).format('MMMM Do YYYY, HH:mm')

    res.status(200).json({ order, stripe_key: STRIPE_PUBLIC_KEY })
})

const getOrders = catchAsyncError(async (req, res, next) => {
    let { page, limit, paymentStatus } = req.query
    if (!page || !limit) throw new BaseError('Wrong property', 400)

    let query_object = { 'user.id': req.user._id }
    if (paymentStatus) query_object.payment_status = paymentStatus

    let orders = await OrderModel
        .find(
            query_object,
            {
                'createdAt': 1,
                '_id': 1,
                'order_status': 1,
                'payment_status': 1,
                'items_of_order': {
                    $slice: [0, 2]
                },
            }
        )
        .skip((page - 1) * (limit * 1))
        .sort({ 'createdAt': -1 })
        .limit(limit * 1)

    let count_product = await OrderModel.countDocuments(query_object)

    if (!orders) throw new BaseError('Orders not found', 404)

    res.status(200).json({ orders, countOrder: count_product })
})

export {
    initPlaceOrder, completePlaceOrder, sendReceipt,
    getOrder, getOrders,
}
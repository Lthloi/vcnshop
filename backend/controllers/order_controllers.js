import catchAsyncError from "../middlewares/catch_async_error.js"
import OrderModel from "../models/order_schema.js"
import BaseError from "../utils/base_error.js"
import Stripe from "stripe"
import { sendReceiptViaEmail } from '../utils/send_mail.js'
import moment from "moment"

const { STRIPE_SECRET_KEY, STRIPE_PUBLIC_KEY } = process.env

const stripe = new Stripe(STRIPE_SECRET_KEY)

const initPayment = catchAsyncError(async (req, res, next) => {
    let { amount, currency } = req.body
    if (!amount || !currency) throw new BaseError('Wrong property name', 400)

    let { email: user_email, name: user_name } = req.user

    let paymentIntent = await stripe.paymentIntents.create({
        receipt_email: user_email,
        amount,
        currency,
        metadata: {
            'Company': 'VCN Shop - Fox COR',
        },
    })

    await OrderModel.create({
        'shipping_fee': 0,
        'tax_fee': 0,
        'total_to_pay': amount,
        'price_of_items': 0,
        'order_status': 'uncompleted',
        'payment_status': 'processing',
        'user': {
            id: req.user._id,
            email: req.user.email,
        }
    })

    res.status(200).json({
        client_secret: paymentIntent.client_secret,
        stripe_key: STRIPE_PUBLIC_KEY,
        user_email,
        user_name,
    })
})

// complete the order
const newOrder = catchAsyncError(async (req, res, next) => {
    let {
        shipping_info,
        items_of_order,
        payment_info,
        price_of_items,
        tax_fee,
        shipping_fee,
        total_to_pay,
    } = req.body

    if (!shipping_info || !items_of_order || !payment_info || !price_of_items || !total_to_pay)
        throw new BaseError('Wrong property name', 400)
    if ((!tax_fee && tax_fee !== 0) || (!shipping_fee && shipping_fee !== 0))
        throw new BaseError('Wrong property name', 400)

    await OrderModel.create({
        shipping_info,
        items_of_order,
        payment_info,
        price_of_items,
        tax_fee,
        shipping_fee,
        total_to_pay,
        user: {
            id: req.user._id,
            email: req.user.email,
        },
    })

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

    res.status(200).json({ order })
})

const getOrders = catchAsyncError(async (req, res, next) => {
    let { page, limit } = req.query
    if (!page || !limit) throw new BaseError('Wrong property', 400)

    let user_id = req.user._id

    let orders = await OrderModel
        .find(
            { 'user.id': user_id },
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

    let count_product = await OrderModel.countDocuments({ 'user.id': user_id })

    if (!orders) throw new BaseError('Orders not found', 404)

    res.status(200).json({ orders, countOrder: count_product })
})

export {
    initPayment, newOrder, sendReceipt,
    getOrder, getOrders,
}
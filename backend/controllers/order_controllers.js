import catchAsyncError from "../middlewares/catch_async_error.js"
import OrderModel from "../models/order_schema.js"
import BaseError from "../utils/base_error.js"
import Stripe from "stripe"
import { sendReceiptViaEmail } from '../utils/send_mail.js'

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

    res.status(200).json({
        client_secret: paymentIntent.client_secret,
        stripe_key: STRIPE_PUBLIC_KEY,
        user_email,
        user_name,
    })
})

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

    if (
        !shipping_info || !items_of_order || !payment_info || !price_of_items || !tax_fee || !shipping_fee || !total_to_pay
    ) throw new BaseError('Wrong property name', 400)

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
        },
    })

    res.status(200).json({
        success: true,
    })
})

const sendReceipt = catchAsyncError(async (req, res, next) => {
    let { paymentId, deliveryInfo, receiverInfo, items, taxFee, shippingFee, totalToPay } = req.body

    if (!paymentId || !deliveryInfo || !receiverInfo || !items || !taxFee || !shippingFee || !totalToPay)
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
    let { paymentId, orderId } = req.body
    if (!paymentId && !orderId) throw new BaseError('Wrong property', 400)

    let order_query = {}
    if (paymentId) order_query['payment_info.id'] = paymentId
    else order_query._id = orderId

    let order = await OrderModel.findOne(order_query)
    if (!order) throw new BaseError('Order not found', 404)

    res.status(200).json({ order })
})

export {
    initPayment, newOrder, sendReceipt,
    getOrder,
}
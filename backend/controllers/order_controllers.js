import catchAsyncError from "../middlewares/catch_async_error.js"
import OrderModel from "../models/order_schema.js"
import BaseError from "../utils/base_error.js"
import Stripe from "stripe"

const { STRIPE_SECRET_KEY, STRIPE_PUBLIC_KEY } = process.env

const stripe = new Stripe(STRIPE_SECRET_KEY)

const initPayment = catchAsyncError(async (req, res, next) => {
    let { amount, currency } = req.body
    if (!amount || !currency) throw new BaseError('Wrong property name', 400)

    let { email: user_email } = req.user
    if (!user_email) throw new BaseError('Wrong property name', 400)

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
        shipping_info: {
            ...shipping_info,
            address: shipping_info.address || '',
        },
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

    res.status(200).json({ success: true })
})

export {
    initPayment, newOrder,
}
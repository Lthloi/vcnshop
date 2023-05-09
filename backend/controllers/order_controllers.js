import catchAsyncError from "../middlewares/catch_async_error.js"
import BaseError from "../utils/base_error.js"
import Stripe from "stripe"

const { STRIPE_SECRET_KEY, STRIPE_PUBLIC_KEY } = process.env

const stripe = new Stripe(STRIPE_SECRET_KEY)

const initPayment = catchAsyncError(async (req, res, next) => {
    let { amount, currency } = req.body
    if (!amount || !currency) throw new BaseError('Wrong property name', 400)

    let paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        metadata: {
            'Company':'VCN Shop',
        },
    })
    
    res.status(200).json({ client_secret: paymentIntent.client_secret, stripe_key: STRIPE_PUBLIC_KEY })
})

export {
    initPayment,
}
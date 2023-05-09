import React from "react"
import { styled } from '@mui/material/styles'
import { useStripe, PaymentElement } from '@stripe/react-stripe-js'
import { toast } from "react-toastify"

const PaymentCardSection = ({ clientSecret }) => {
    const stripe = useStripe()

    const paymentSubmit = async () => {
        if (!clientSecret) return toast.error('Something went wrong, please reload page and try again in some minutes later!')
        // await stripe.confirmCardPayment(order.client_secret, {
        //     payment_method: {
        //         card,
        //     },
        // })
    }

    return (
        <PaymentElement  />
    )
}

export default PaymentCardSection

const PaymentCard = styled('div')(({ theme }) => ({

}))
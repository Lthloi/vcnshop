import React from "react"
import { styled } from '@mui/material/styles'
import Header from '../components/checkout/header'
import ShippingInfo from "../components/checkout/shipping_info"
import Short from "../components/layouts/footer/short"
import { useLocation } from "react-router-dom"
import NotFound404 from './not_found_404'
import ConfirmOrder from "../components/checkout/confirm_order"
import Payment from '../components/checkout/payment'
import Success from '../components/checkout/success'
import { useGetQueryValue } from "../hooks/custom_hooks"

const steps = ['shipping_info', 'confirm_order', 'payment', 'success']

const Checkout = () => {
    const search_string = useLocation().search
    const query_value_getter = useGetQueryValue()

    if (!search_string.includes('step=') && !search_string.includes('payment_intent='))
        return (<NotFound404 />)

    const step_index = steps.indexOf(query_value_getter(search_string, 'step'))

    if (step_index < 0)
        return (<NotFound404 />)

    const paymentId = query_value_getter(search_string, 'payment_intent')

    return (
        <CheckoutPage id="CheckoutPage">
            <Header activeStep={step_index} />

            {
                step_index === 0 ? (
                    <ShippingInfo />
                ) : step_index === 1 ? (
                    <ConfirmOrder />
                ) : step_index === 2 ? (
                    <Payment />
                ) : <Success paymentId={paymentId} />
            }

            <div style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', borderTop: '2px black solid' }}>
                <Short />
            </div>
        </CheckoutPage>
    )
}

export default Checkout

const CheckoutPage = styled('div')(({ theme }) => ({
    padding: '10px',
    paddingBottom: '35px',
    position: 'relative',
}))
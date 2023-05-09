import React from "react"
import { styled } from '@mui/material/styles'
import CheckoutStep from "../components/checkout/checkout_step"
import Header from '../components/checkout/header'
import ShippingInfo from "../components/checkout/shipping_info"
import Short from "../components/layouts/footer/short"
import HelpChat from '../components/help_chat'
import { useLocation } from "react-router-dom"
import NotFound404 from './not_found_404'
import ConfirmOrder from "../components/checkout/confirm_order"
import Payment from '../components/checkout/payment'

const steps = ['shipping_info', 'confirm_order', 'payment']

const Checkout = () => {
    const search_string = useLocation().search

    if (!search_string.includes('step='))
        return (<NotFound404 />)

    const step = search_string.split('step=')[1]

    const step_index = steps.indexOf(step)

    if (step_index < 0)
        return (<NotFound404 />)

    return (
        <CheckoutPage id="CheckoutPage">
            <Header />
            <Hr />
            <CheckoutStep stepIsCompleted={step_index} />
            <Hr />

            {
                step_index === 0 ? (
                    <ShippingInfo />
                ) : step_index === 1 ? (
                    <ConfirmOrder />
                ) : <Payment />
            }

            <div style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', borderTop: '2px black solid' }}>
                <Short />
            </div>

            <HelpChat />
        </CheckoutPage>
    )
}

export default Checkout

const CheckoutPage = styled('div')(({ theme }) => ({
    padding: '10px',
    paddingBottom: '35px',
    position: 'relative',
}))

const Hr = styled('div')({
    height: '1px',
    width: '100%',
    backgroundColor: '#dddddd',
    margin: '0 auto',
})
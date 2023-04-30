import React from "react"
import { styled } from '@mui/material/styles'
import CheckoutStep from "../components/checkout/checkout_step"
import Navigation from '../components/checkout/navigation'
import ShippingInfo from "../components/checkout/shipping_info"
import Short from "../components/layouts/footer/short"

const Checkout = () => {
    return (
        <CheckoutPage id="CheckoutPage">
            <Navigation />
            <Hr />
            <CheckoutStep stepIsCompleted={0} />
            <Hr />
            <ShippingInfo />

            <div style={{ marginTop: '50px' }}></div>

            <div style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', borderTop: '2px black solid' }}>
                <Short />
            </div>
        </CheckoutPage>
    )
}

export default Checkout

const CheckoutPage = styled('div')(({ theme }) => ({
    padding: '10px',
    position: 'relative',
}))

const Hr = styled('div')({
    height: '1px',
    width: '100%',
    backgroundColor: '#dddddd',
    margin: '0 auto',
})
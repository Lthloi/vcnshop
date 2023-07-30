import React from "react"
import { styled } from '@mui/material/styles'
import Header from '../components/checkout/header'
import ShippingInfo from "../components/checkout/shipping_info"
import NotFound404 from './not_found_404'
import ConfirmOrder from "../components/checkout/confirm_order"
import Payment from '../components/checkout/payment'
import Success from '../components/checkout/success'
import { useCurrentRoute } from "../hooks/custom_hooks"
import { Routes, Route } from "react-router-dom"
import { Stack, Typography } from "@mui/material"
import { useTheme } from "@emotion/react"

const steps = ['shipping_info', 'confirm_order', 'payment', 'success']

const get_step_from_route = (current_route) => {
    let split_route = current_route.toLowerCase().split('checkout/')
    let step_in_route = split_route[1]
    if (!step_in_route) return null
    return steps.find((step) => step_in_route === step)
}

const get_step_index = (step) => steps.indexOf(step)

const Bottom = () => {
    const theme = useTheme()

    return (
        <Stack
            flexDirection="row"
            justifyContent="space-evenly"
            alignItems="center"
            padding="5px"
            bgcolor="#f0f0f0"
            width="100%"
            boxSizing="border-box"
        >
            <Typography
                fontFamily={theme.fontFamily.nunito}
                fontSize="0.8em"
            >
                &copy; 2023 VCN Shop - FOX Relational E-commerce Corporation
            </Typography>
            <Typography
                fontFamily={theme.fontFamily.nunito}
                fontSize="0.8em"
            >
                Oficial Website: https://www.vcnshop.new
            </Typography>
        </Stack>
    )
}

const Checkout = () => {
    const current_route = useCurrentRoute()

    const step = get_step_from_route(current_route)

    if (!step)
        return (<NotFound404 />)

    return (
        <CheckoutPage id="CheckoutPage">
            <Header activeStep={get_step_index(step)} />

            <Routes>
                <Route path="/shipping_info" element={<ShippingInfo />} />
                <Route path="/confirm_order" element={<ConfirmOrder />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/success" element={<Success />} />
            </Routes>

            <Stack
                position="absolute"
                bottom="0"
                left="0"
                width="100%"
                borderTop='2px black solid'
            >
                <Bottom />
            </Stack>
        </CheckoutPage>
    )
}

export default Checkout

const CheckoutPage = styled('div')(({ theme }) => ({
    padding: '10px',
    paddingBottom: '35px',
    position: 'relative',
}))
import React, { useEffect, useRef, useState } from "react"
import { styled } from '@mui/material/styles'
import ErrorPage from '../../pages/error_page'
import { Skeleton } from "@mui/material"
import { useDispatch } from "react-redux"
import PaymentCardSection from "./payment_card_section"
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from "@stripe/stripe-js"
import axios from "axios"
import { EXPRESS_SERVER } from "../../utils/constants"
import OrderDetail from "./order_detail"

const payment_appearance = {
    theme: 'flat',
    variables: {
        fontFamily: '"Gill Sans", sans-serif',
        borderRadius: '5px',
        colorBackground: 'white',
        colorText: 'black',
    },
    rules: {
        '.Block': {
            backgroundColor: 'var(--colorBackground)',
            boxShadow: 'none',
            padding: '12px',
        },
        '.Input': {
            padding: '12px',
            border: '1px rgba(0,0,0,0.3) solid',
        },
        '.Input:focus': {
            boxShadow: '0px 0px 5px gray',
        },
        '.Input:disabled, .Input--invalid:disabled': {
            color: 'lightgray',
        },
        '.Input--invalid': {
            border: 'none',
        },
        '.Label': {
            fontWeight: 'bold',
            fontSize: '0.9em',
        },
    }
}

const currency_code = 'usd'

const count = 2

const Payment = () => {
    const [orderInit, setOrderInit] = useState({ client_secret: '', stripe_key: '' })
    const dispatch = useDispatch()

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))

    const stripe_promise_ref = useRef()
    const client_secret_ref = useRef()

    const initPayment = async () => {
        if (orderInfo && orderInfo.total_to_pay) {
            let { data } = await axios.post(
                EXPRESS_SERVER + '/api/initPayment',
                { amount: orderInfo.total_to_pay * 100, currency: currency_code },
                { withCredentials: true }
            )

            setOrderInit({
                client_secret: data.client_secret,
                stripe_key: data.stripe_key,
            })

            stripe_promise_ref.current = loadStripe(data.stripe_key)
            client_secret_ref.current = data.client_secret
        }
    }

    useEffect(() => {
        if (count > 1)
            initPayment()
    }, [dispatch])

    if (!orderInfo || !orderInfo.total_to_pay)
        return (<ErrorPage />)

    if (!orderInit.client_secret || !orderInit.stripe_key)
        return (
            <LoadingSection className="loading_section">
                <div style={{ width: '100%' }}>
                    <Loading animation="wave" />
                    <Loading sx={{ marginTop: '20px' }} animation="wave" />
                </div>
                <Loading sx={{ width: '65%', height: '70vh' }} animation="wave" />
            </LoadingSection>
        )

    return (
        <PaymentSection id="PaymentSection">
            <Title>Payment</Title>

            <Section>
                <OrderDetail orderInfo={orderInfo} />

                <PaymentCard>
                    <ElementsProvider
                        stripe={stripe_promise_ref.current}
                        options={{ appearance: payment_appearance, clientSecret: client_secret_ref.current }}
                    >
                        <PaymentCardSection
                            clientSecret={orderInit.client_secret}
                            totalToPay={orderInfo.total_to_pay}
                            currencyCode={currency_code}
                        />
                    </ElementsProvider>
                </PaymentCard>
            </Section>
        </PaymentSection>
    )
}

export default Payment

const LoadingSection = styled('div')({
    display: 'flex',
    padding: '30px',
    columnGap: '20px',
})

const Loading = styled(Skeleton)({
    width: '100%',
    height: '30vh',
    transform: 'scale(1)',
})

const PaymentSection = styled('div')({
})

const Title = styled('h2')({
    color: 'white',
    boxSizing: 'border-box',
    margin: '20px 0',
    fontFamily: '"Gill Sans", sans-serif',
    textAlign: 'center',
    padding: '15px',
    width: '100%',
    fontSize: '1.5em',
    backgroundColor: 'black',
    letterSpacing: '3px',
})

const Section = styled('div')({
    display: 'flex',
    padding: '30px 50px',
    columnGap: '20px',
})

const PaymentCard = styled('div')({
    height: 'fit-content',
    width: '65%',
    boxShadow: '0px 0px 3px gray',
    padding: '50px 30px',
    borderRadius: '5px',
})

const ElementsProvider = styled(Elements)(({ theme }) => ({

}))
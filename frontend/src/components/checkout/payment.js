import React, { useEffect, useRef, useState } from "react"
import { styled } from '@mui/material/styles'
import ErrorPage from '../../components/error_boundary'
import LoadingApp from '../../components/loading_app'
import { useDispatch, useSelector } from "react-redux"
import PaymentCardSection from "./payment_card_section"
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from "@stripe/stripe-js"
import axios from "axios"
import { EXPRESS_SERVER } from "../../utils/constants"

const payment_appearance = {
    theme: 'flat',
    variables: {
        fontFamily: ' "Gill Sans", sans-serif',
        borderRadius: '5px',
        colorBackground: 'white',
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
        '.Label': {
            fontWeight: 'bold',
        },
    }
}

const currency_code = 'usd'

const Payment = () => {
    const { cartItems, shippingInfo } = useSelector(({ cart }) => cart)
    const [orderInit, setOrderInit] = useState({ client_secret: '', stripe_key: '' })
    const dispatch = useDispatch()

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))

    const stripe_promise_ref = useRef()
    const client_secret_ref = useRef()

    const initPayment = async () => {
        if (orderInfo.total_to_pay) {
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
        initPayment()
    }, [dispatch])

    if (!orderInfo || !orderInfo.total_to_pay)
        return (<ErrorPage />)

    if (!orderInit.client_secret || !orderInit.stripe_key)
        return (<LoadingApp isAuthorization={true} />)

    return (
        <PaymentSection id="PaymentSection">
            <LeftContainer>

            </LeftContainer>

            <RightContainer>
                <ElementsProvider
                    stripe={stripe_promise_ref.current}
                    options={{ appearance: payment_appearance, clientSecret: client_secret_ref.current }}
                >
                    <PaymentCardSection clientSecret={orderInit.client_secret} />
                </ElementsProvider>
            </RightContainer>
        </PaymentSection>
    )
}

export default Payment

const PaymentSection = styled('div')({
    display: 'flex',
    padding: '30px',
    columnGap: '20px',
})

const ElementsProvider = styled(Elements)(({ theme }) => ({

}))

const LeftContainer = styled('div')({
    width: '100%',
})

const RightContainer = styled('div')({
    width: '80%',
    borderLeft: '1px rgba(0,0,0,0.3) solid',
    paddingLeft: '30px',
})
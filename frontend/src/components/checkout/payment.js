import React, { useEffect, useRef, useState } from "react"
import { styled } from '@mui/material/styles'
import { Skeleton } from "@mui/material"
import { useSelector } from "react-redux"
import PaymentCardSection from "./payment_card_section"
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from "@stripe/stripe-js"
import axios from "axios"
import { EXPRESS_SERVER } from "../../utils/constants"
import OrderDetail from "./order_detail"
import { toast } from "react-toastify"
import actionsErrorHandler from "../../utils/error_handler"
import { useGetQueryValue } from '../../hooks/custom_hooks'
import { useNavigate } from "react-router-dom"

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
const shipping_method = 'Sea Transport'

const Payment = () => {
    const { cartItems, shippingInfo } = useSelector(({ cart }) => cart)
    const [orderInitor, setOrderInitor] = useState(null)
    const [orderInfo, setOrderInfo] = useState(null)
    const get_value_of_query_string = useGetQueryValue()
    const navigate = useNavigate()

    const stripe_promise_ref = useRef()
    const client_secret_ref = useRef()

    const initPlaceOrder = async (order_info) => {
        let data

        try {
            let response = await axios.post(
                EXPRESS_SERVER + '/api/initPlaceOrder',
                {
                    currency: currency_code,
                    shipping_info: {
                        city: shippingInfo.City,
                        country: shippingInfo.Country,
                        state: shippingInfo.State,
                        address: shippingInfo.Address,
                        zip_code: shippingInfo['Zip Code'],
                        phone_number: shippingInfo['Phone Number'],
                        method: shipping_method,
                    },
                    items_of_order: cartItems,
                    price_of_items: order_info.subtotal,
                    tax_fee: order_info.tax_fee,
                    shipping_fee: order_info.shipping_fee,
                    total_to_pay: order_info.total_to_pay,
                },
                { withCredentials: true }
            )
            data = response.data
        } catch (error) {
            let errorObject = actionsErrorHandler(error)
            return toast.error(errorObject.message)
        }

        stripe_promise_ref.current = loadStripe(data.stripe_key)
        client_secret_ref.current = data.client_secret

        setOrderInitor({
            client_secret: data.client_secret,
            stripe_key: loadStripe(data.stripe_key),
            user_email: data.user_email,
            user_name: data.user_name,
            order_id: data.orderId,
        })

        sessionStorage.removeItem('orderInfo')
    }

    const getUnpaidOrder = async (order_id) => {
        let api_to_get_order = '/api/getOrder?orderId=' + order_id
        let { data } = await axios.get(EXPRESS_SERVER + api_to_get_order, { withCredentials: true })
        let order_info = data.order
        setOrderInfo(order_info)
        setOrderInitor({
            client_secret: order_info.payment_info.id,
            stripe_key: loadStripe(data.stripe_key),
            user_email: order_info.user.email,
            user_name: order_info.user.name,
            order_id: order_info._id,
        })
    }

    useEffect(() => {
        let order_id = get_value_of_query_string(1, 'orderId')
        if (order_id)
            getUnpaidOrder(order_id)
        else {
            let stored_order = sessionStorage.getItem('orderInfo')
            if (!stored_order) {
                toast.warning('Something went wrong')
                navigate(-1)
            } else {
                let stored_order_parsed = JSON.parse(stored_order)
                setOrderInfo(stored_order_parsed)
                initPlaceOrder(stored_order_parsed)
            }
        }
    }, [])

    if (!orderInitor || !orderInfo)
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
        <div id="PaymentSection">
            <Title>Payment</Title>

            <Section>
                <OrderDetail orderInfo={orderInfo} />

                <PaymentCard>
                    <Elements
                        stripe={orderInitor.stripe_key}
                        options={{ appearance: payment_appearance, clientSecret: orderInitor.client_secret }}
                    >
                        <PaymentCardSection
                            clientSecret={orderInitor.client_secret}
                            currencyCode={currency_code}
                            userEmail={orderInitor.user_email}
                            userName={orderInitor.user_name}
                            orderId={orderInitor.order_id}
                            shippingInfo={shippingInfo}
                            totalToPay={orderInfo.total_to_pay}
                        />
                    </Elements>
                </PaymentCard>
            </Section>
        </div>
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
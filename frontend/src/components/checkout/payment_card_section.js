import React, { useState } from "react"
import { styled } from '@mui/material/styles'
import { useStripe, PaymentElement, useElements } from '@stripe/react-stripe-js'
import { toast } from "react-toastify"
import EmailIcon from '@mui/icons-material/Email'
import ErrorIcon from '@mui/icons-material/Error'
import { CircularProgress } from "@mui/material"
import { useDispatch } from "react-redux"
import { completePlaceOrder } from '../../store/actions/order_actions'

const email_is_read_only = true

const step_after_complete_payment = 'success'

const payment_method = 'card'

const PaymentCardSection = ({ totalToPay, shippingInfo, clientSecret, orderId, currencyCode, userEmail, userName }) => {
    const stripe = useStripe()
    const elements = useElements()
    const [paying, setPaying] = useState(false)
    const dispatch = useDispatch()

    const confirmPayment = async () => {
        if (!clientSecret) return toast.error('Something went wrong, please reload page and try again in some minutes later!')

        setPaying(true)

        let response = await stripe.confirmPayment({
            elements: elements,
            confirmParams: {
                return_url: window.location.origin + '/checkout?step=' + step_after_complete_payment,
                shipping: {
                    address: {
                        country: shippingInfo.City,
                        city: shippingInfo.City,
                        state: shippingInfo.State,
                    },
                    phone: shippingInfo['Phone Number'],
                    name: userName,
                },
            },
            redirect: 'if_required',
        })

        if (response.error) {
            let error = response.error
            if (error.type === 'validation_error' || error.type === 'card_error') {
                toast.error(error.message)
            } else if (error.type === 'invalid_request_error') {
                toast.error('Can\'t complete the payment, fail in authentication.')
            }
            setPaying(false)
        } else {
            let paymentIntent_info = response.paymentIntent

            dispatch(completePlaceOrder(
                {
                    orderId,
                    paymentMethod: payment_method,
                    paymentId: paymentIntent_info.id,
                    paymentStatus: paymentIntent_info.status,
                },
                step_after_complete_payment
            ))
        }
    }

    return (
        <>
            <EmailFromGroup>
                <Label htmlFor="email_receipts">Email Receipts</Label>
                <InputContainer>
                    <EmailInput
                        id="email_receipts"
                        readOnly={email_is_read_only}
                        sx={email_is_read_only && { pointerEvents: 'none' }}
                        maxLength={35}
                        defaultValue={userEmail || ''}
                        placeholder="Enter your email for receipts..."
                    />
                    <EmailIcon />
                </InputContainer>
                <Note>
                    <ErrorIcon sx={{ fontSize: '1.2em', color: 'gray' }} />
                    <span>
                        In case the email receipts are not provided then we use your email you used
                        for register to send you with receipts after invoices are paid.
                    </span>
                </Note>
            </EmailFromGroup>
            <PaymentElement />
            <PayNowBtn onClick={confirmPayment} sx={paying && { pointerEvents: 'none' }}>
                {
                    paying ?
                        <CircularProgress
                            thickness={6}
                            size={22}
                            sx={{ color: 'white', margin: 'auto' }}
                        />
                        :
                        <span>{'Pay ' + totalToPay + ' ' + currencyCode.toUpperCase()}</span>
                }
            </PayNowBtn>
            <HoverBarAnimation className="hover_animate" />
        </>
    )
}

export default PaymentCardSection

const EmailFromGroup = styled('div')({
    width: '100%',
    marginBottom: '10px',
})

const Label = styled('label')({
    fontFamily: '"Gill Sans", sans-serif',
    fontSize: '0.9em',
    fontWeight: 'bold',
})

const InputContainer = styled('div')({
    display: 'flex',
    columnGap: '10px',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 15px',
    marginTop: '5px',
    border: '1px rgba(0,0,0,0.3) solid',
    borderRadius: '5px',
    transition: 'box-shadow 0.2s',
    boxSizing: 'border-box',
    '&.on_focus_with_error': {
        outline: '2px #DF1B41 solid',
        boxShadow: 'unset',
        border: 'unset',
    },
    ':focus': {
        outline: 'unset',
        boxShadow: '0px 0px 5px gray',
        border: 'unset',
    }
})

const EmailInput = styled('input')({
    fontFamily: '"Gill Sans", sans-serif',
    fontSize: '1em',
    width: '100%',
    border: 'none',
    outline: 'unset',
})

const Note = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '5px',
    marginTop: '5px',
    padding: '0 10px',
    '& span': {
        fontFamily: '"Nunito", "sans-serif"',
        fontSize: '0.7em',
    }
})

const PayNowBtn = styled('button')({
    display: 'flex',
    justifyContent: 'center',
    padding: '10px 15px',
    width: '100%',
    borderRadius: '5px',
    backgroundColor: 'black',
    border: '2px black solid',
    boxSizing: 'border-box',
    fontFamily: '"Gill Sans", sans-serif',
    fontWeight: 'bold',
    fontSize: '1.2em',
    marginTop: '20px',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    ':hover~.hover_animate': {
        width: '100%',
    },
})

const HoverBarAnimation = styled('div')({
    width: '0',
    height: '5px',
    marginTop: '5px',
    transition: 'width 0.5s',
    backgroundColor: 'black',
})
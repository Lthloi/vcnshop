import React, { useRef, useState } from "react"
import { styled } from '@mui/material/styles'
import { useStripe, PaymentElement, useElements } from '@stripe/react-stripe-js'
import { toast } from "react-toastify"
import EmailIcon from '@mui/icons-material/Email'
import ErrorIcon from '@mui/icons-material/Error'
import validator from 'validator'
import { CircularProgress } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { createNewOrder } from '../../store/actions/order_actions'

const email_is_read_only = true

const step_after_complete_payment = 'success'

const PaymentCardSection = ({ clientSecret, totalToPay, currencyCode, userEmail, userName, subtotal, taxFee, shippingFee }) => {
    const { cartItems, shippingInfo } = useSelector(({ cart }) => cart)
    const stripe = useStripe()
    const elements = useElements()
    const [warning, setWarning] = useState(false)
    const [paying, setPaying] = useState(false)
    const dispatch = useDispatch()

    const email_ref = useRef()
    const email_input_container = useRef()

    const confirmPayment = async () => {
        if (!clientSecret) return toast.error('Something went wrong, please reload page and try again in some minutes later!')
        let email = email_ref.current.value
        if (email && !validator.isEmail(email)) {
            email_input_container.current.classList.add('on_focus_with_error')
            return setWarning(true)
        }

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
            let order_info = {
                shipping_info: {
                    city: shippingInfo.City,
                    country: shippingInfo.Country,
                    state: shippingInfo.State,
                    address: shippingInfo.Address,
                    zip_code: shippingInfo['Zip Code'],
                    phone_number: shippingInfo['Phone Number'],
                },
                items_of_order: cartItems,
                payment_info: {
                    id: paymentIntent_info.id,
                    method: 'card',
                    status: paymentIntent_info.status,
                },
                price_of_items: subtotal,
                tax_fee: taxFee,
                shipping_fee: shippingFee,
                total_to_pay: totalToPay,
            }

            dispatch(createNewOrder(order_info, step_after_complete_payment))
        }
    }

    const handleOnEventInput = () => {
        email_input_container.current.classList.remove('on_focus_with_error')
        setWarning(false)
    }

    return (
        <>
            <EmailFromGroup>
                <Label htmlFor="email_receipts">Email Receipts</Label>
                <InputContainer ref={email_input_container}>
                    <EmailInput
                        id="email_receipts"
                        ref={email_ref}
                        readOnly={email_is_read_only}
                        sx={email_is_read_only && { pointerEvents: 'none' }}
                        maxLength={35}
                        onFocus={handleOnEventInput}
                        defaultValue={userEmail || ''}
                        placeholder="Enter your email for receipts..."
                    />
                    <EmailIcon />
                </InputContainer>
                {
                    warning && <Warning>Email is invalid!</Warning>
                }
                <Note>
                    <ErrorIcon sx={{ fontSize: '1.2em', color: 'gray' }} />
                    <span>
                        In case the email receipts are not provided then we use your email you used
                        for register to send you with receipts after invoices are paid.
                    </span>
                </Note>
            </EmailFromGroup>
            <PaymentElement o />
            <PayNowBtn onClick={confirmPayment}>
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

const Warning = styled('div')({
    fontFamily: '"Gill Sans", sans-serif',
    fontSize: '0.9em',
    marginTop: '4px',
    color: '#E23053',
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
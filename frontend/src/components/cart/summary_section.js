import React, { useMemo } from "react"
import { styled } from '@mui/material/styles'
import PaymentType from "./payment_type"
import { useFloatNumber, useNumerToWords } from "../../hooks/custom_hooks"

const SummarySection = ({ cartItems }) => {
    const get_float_number = useFloatNumber()
    const number_to_words_convertor = useNumerToWords()

    const subtotal = useMemo(() => {
        if (cartItems.length > 0)
            return cartItems.reduce(
                (accumulator, { cost, quantity }) => get_float_number(cost * quantity + accumulator), 0
            )
        return 0
    }, [cartItems])

    const subTotalInWords = useMemo(() => number_to_words_convertor(subtotal), [subtotal])

    const handleCheckOut = () => {
        let summary_object = {
            subtotal,
        }

        sessionStorage.setItem('summary', JSON.stringify(summary_object))

        window.open('/checkout?step=shipping_info', '_self')
    }

    return (
        <PaymenSectionArea id="PaymenSectionArea">
            <PaymentSectionTitle>SUMMARY</PaymentSectionTitle>

            <Hr />

            <PaymentType title={'SUBTOTAL'} in_number={subtotal} in_words={subTotalInWords} />

            <CheckoutBtn onClick={handleCheckOut}>
                Check Out
            </CheckoutBtn>
        </PaymenSectionArea>
    )
}

export default SummarySection

const PaymenSectionArea = styled('div')({
    padding: '10px 20px',
    backgroundColor: 'lightcyan',
    width: '34%',
    height: 'fit-content',
    boxSizing: 'border-box',
})

const PaymentSectionTitle = styled('h2')({
    fontFamily: '"Kanit", "sans-serif"',
    transform: 'scaleY(0.8)',
    margin: '0',
})

const Hr = styled('hr')({
    backgroundColor: 'black',
    borderWidth: '0',
    height: '2px',
})

const CheckoutBtn = styled('button')({
    backgroundColor: 'black',
    padding: '10px',
    color: 'white',
    cursor: 'pointer',
    fontFamily: '"Nunito", "sans-serif"',
    fontWeight: 'bold',
    fontSize: '1em',
    marginTop: '10px',
    width: '100%',
    boxSizing: 'border-box',
    borderRadius: '20px',
    border: '1.5px lightcyan solid',
    '&:hover': {
        outline: '3px black solid',
    }
})
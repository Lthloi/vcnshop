import React, { useMemo } from "react"
import { styled } from '@mui/material/styles'
import { useFloatNumber, useNumerToWords } from "../../hooks/custom_hooks"
import { toast } from "react-toastify"

const PaymentType = ({ title, in_number, in_words }) => {
    return (
        <div id="PaymentTypeContainer">
            <PaymentTypeContainer>
                <PaymentTypeTitle>
                    {title + ' '}{title === 'OFF' ? <span>(Coupons)</span> : ''}
                </PaymentTypeTitle>
                <PaymentTypeCost>
                    {'$' + in_number}
                </PaymentTypeCost>
            </PaymentTypeContainer>
            <InWords>
                {
                    title === 'OFF' ?
                        <>
                            <span>You get </span>
                            <b>{in_words}</b>
                            <span> with promo code</span>
                        </>
                        :
                        <>
                            <span>In Words: </span>
                            <b>{in_words}</b>
                        </>
                }
            </InWords>
        </div>
    )
}

const SummarySection = ({ cartItems }) => {
    const get_float_number = useFloatNumber()
    const number_to_words_convertor = useNumerToWords()

    const subtotal = useMemo(() => {
        if (cartItems.length > 0)
            return cartItems.reduce(
                (accumulator, { price, quantity }) => get_float_number(price * quantity + accumulator), 0
            )
        return 0
    }, [cartItems])

    const subTotalInWords = useMemo(() => number_to_words_convertor(subtotal), [subtotal])

    const handleCheckOut = () => {
        if (cartItems.length === 0) return toast.warning('You have no product in the cart!')

        window.open('/checkout/shipping_info', '_self')
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

const PaymentTypeContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
})

const PaymentTypeTitle = styled('h2')({
    fontFamily: '"Kanit", "sans-serif"',
    transform: 'scaleY(0.8)',
    margin: '0',
})

const PaymentTypeCost = styled('div')({
    fontFamily: '"Nunito", "sans-serif"',
    fontWeight: 'bold',
    fontSize: '1em',
})

const InWords = styled('div')({
    display: 'block',
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '0.9em',
})

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
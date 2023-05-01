import React, { useMemo } from "react"
import { styled } from '@mui/material/styles'
import paypal_checkout from '../../../assets/images/cart/paypal.svg'
import PaymentType from "./payment_type"
import { useFloatNumber } from "../../../hooks/custom_hooks"
import AddCoupons from "./add_coupons"
import { useSelector } from "react-redux"

const convertNumberToWords = (number, currency = 'USD') => {
    let oneToTwenty = [
        '', 'one ', 'two ', 'three ', 'four ', 'five ',
        'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ',
        'twelve ', 'thirteen ', 'fourteen ', 'fifteen ',
        'sixteen ', 'seventeen ', 'eighteen ', 'nineteen ',
    ]
    let tenth = [
        '', '', 'twenty', 'thirty', 'forty', 'fifty',
        'sixty', 'seventy', 'eighty', 'ninety',
    ]

    let numberStr = `${number}`

    let dot_index = numberStr.indexOf('.')
    let remainder = ''
    let remainder_in_words = ''

    if (dot_index > 0) {
        remainder = numberStr.slice(dot_index + 1, dot_index + 3) //length === 2

        if (remainder.length === 2) {
            let tenth_part = tenth[remainder[0] * 1]
            remainder_in_words = tenth_part ? tenth_part + ' ' + oneToTwenty[remainder[1] * 1] : oneToTwenty[remainder * 1]
        }
        else
            remainder_in_words = tenth[remainder[0] * 1] || 'ten '

        numberStr = numberStr.slice(0, dot_index)
    }

    if (numberStr.length > 7) return null

    let matcher = `0000000${numberStr}`.slice(-7).match(/^(\d{1})(\d{1})(\d{2})(\d{1})(\d{2})$/)
    if (!matcher) return null

    let words = ''

    if (numberStr * 1 === 0)
        words += 'zero'
    else {
        words += matcher[1] * 1 !== 0 ? (oneToTwenty[matcher[1]] || tenth[matcher[1][0]] + ' ' +
            oneToTwenty[matcher[1][1]]) + 'million ' : ''
        words += matcher[2] * 1 !== 0 ? (oneToTwenty[matcher[2]] || tenth[matcher[2][0]] + ' ' +
            oneToTwenty[matcher[2][1]]) + 'hundred ' : ''
        words += matcher[3] * 1 !== 0 ? (oneToTwenty[matcher[3]] || tenth[matcher[3][0]] + ' ' +
            oneToTwenty[matcher[3][1]]) + 'thousand ' : ''
        words += matcher[4] * 1 !== 0 ? (oneToTwenty[matcher[4]] || tenth[matcher[4][0]] + ' ' +
            oneToTwenty[matcher[4][1]]) + 'hundred ' : ''
        words += matcher[5] * 1 !== 0 ? (oneToTwenty[matcher[5]] || tenth[matcher[5][0]] + ' ' +
            oneToTwenty[matcher[5][1]]) : ''
    }

    if (currency === 'USD') {
        words += numberStr * 1 > 1 ? ' dollars' : ' dollar'
    }

    if (remainder.length > 0)
        words += ' and ' + remainder_in_words + (remainder * 1 > 1 ? ' cents' : ' cent')

    return words
}

const SummarySection = ({ cartItems }) => {
    const { pickedCoupons } = useSelector(({ coupons }) => coupons)
    const getFloatNumber = useFloatNumber()

    const subtotal = useMemo(() => {
        if (cartItems.length > 0)
            return cartItems.reduce(
                (accumulator, { cost, quantity }) => getFloatNumber(cost * quantity + accumulator), 0
            )
        return 0
    }, [cartItems])

    const tax = getFloatNumber(subtotal * 0.18)

    const off = useMemo(() => {
        if (pickedCoupons && pickedCoupons.length > 0)
            return pickedCoupons.reduce(
                (accumulator, { cost }) => getFloatNumber(cost + accumulator), 0
            )
        return 0
    }, [pickedCoupons])

    const total = useMemo(() => getFloatNumber(subtotal + tax - off), [subtotal, off, tax])

    const subTotalInWords =
        useMemo(() => convertNumberToWords(subtotal), [subtotal])
    const offInWords =
        useMemo(() => convertNumberToWords(off), [off])
    const taxInWords =
        useMemo(() => convertNumberToWords(tax), [tax])
    const totalInWords =
        useMemo(() => convertNumberToWords(total), [total])

    const handleCheckOut = () => {
        let summary_object = {
            subtotal,
            total,
            tax,
            off,
        }

        sessionStorage.setItem('summary', JSON.stringify(summary_object))

        window.open('/checkout?step=shipping_info', '_self')
    }

    return (
        <PaymenSectionArea id="PaymenSectionArea">
            <PaymentSectionTitle>SUMMARY</PaymentSectionTitle>
            <Hr />

            <AddCoupons cartItemsLength={cartItems.length} />

            <Hr />

            <PaymentType title={'SUBTOTAL'} in_number={subtotal} in_words={subTotalInWords} />

            <PaymentType title={'TAX'} in_number={tax} in_words={taxInWords} />

            <PaymentType title={'OFF'} in_number={off} in_words={offInWords} />

            <Hr sx={{ height: '3px', }} />

            <PaymentType title={'TOTAL'} in_number={total} in_words={totalInWords} />

            <CheckoutBtn onClick={handleCheckOut}>
                Check Out
            </CheckoutBtn>
            <PaypalCheckoutBtn title="Pay via Paypal">
                <PaypalImg src={paypal_checkout} alt="Paypal" />
            </PaypalCheckoutBtn>
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
    height: '1.5px',
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

const PaypalCheckoutBtn = styled(CheckoutBtn)({
    padding: '8px',
    height: '45px',
})

const PaypalImg = styled('img')({
    height: '100%',
    '&:hover': {
        '& svg': {

            fill: 'black',
        }
    }
})
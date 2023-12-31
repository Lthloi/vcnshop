import React, { useMemo } from "react"
import { styled } from '@mui/material/styles'
import { useFloatNumber, useNumerToWords } from "../../hooks/custom_hooks"
import { toast } from "react-toastify"
import { Box, Stack } from "@mui/material"

const PaymentType = ({ title, in_number, in_words }) => {
    return (
        <div>
            <Stack
                flexDirection="row"
                justifyContent='space-between'
                alignItems='center'
                columnGap="50px"
            >
                <PaymentTypeTitle>
                    {title + ' '}{title === 'OFF' ? <span>(Coupons)</span> : ''}
                </PaymentTypeTitle>
                <PaymentTypeCost>
                    {'$' + in_number}
                </PaymentTypeCost>
            </Stack>

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

const Summary = ({ cartItems }) => {
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
        <SummarySection>
            <Box
                bgcolor="lightcyan"
                padding='10px 20px'
                minWidth='100%'
                height='fit-content'
                boxSizing='border-box'
            >
                <PaymentSectionTitle>
                    SUMMARY
                </PaymentSectionTitle>

                <Hr />

                <PaymentType title={'SUBTOTAL'} in_number={subtotal} in_words={subTotalInWords} />

                <CheckoutBtn onClick={handleCheckOut}>
                    Check Out
                </CheckoutBtn>
            </Box>
        </SummarySection>
    )
}

export default Summary

const SummarySection = styled('div')(({ theme }) => ({
    width: '35%',
    [theme.breakpoints.down('lg')]: {
        width: '100%',
        marginTop: '10px',
    },
}))

const PaymentTypeTitle = styled('h2')(({ theme }) => ({
    fontFamily: theme.fontFamily.kanit,
    transform: 'scaleY(0.8)',
    margin: '0',
}))

const PaymentTypeCost = styled('div')(({ theme }) => ({
    fontFamily: theme.fontFamily.kanit,
    fontSize: '1em',
}))

const InWords = styled('div')(({ theme }) => ({
    display: 'block',
    fontFamily: theme.fontFamily.nunito,
    fontSize: '0.9em',
}))

const PaymentSectionTitle = styled('h2')(({ theme }) => ({
    fontFamily: theme.fontFamily.kanit,
    transform: 'scaleY(0.8)',
    margin: '0',
}))

const Hr = styled('hr')({
    backgroundColor: 'black',
    borderWidth: '0',
    height: '2px',
})

const CheckoutBtn = styled('button')(({ theme }) => ({
    backgroundColor: 'black',
    padding: '10px',
    color: 'white',
    cursor: 'pointer',
    fontFamily: theme.fontFamily.nunito,
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
}))
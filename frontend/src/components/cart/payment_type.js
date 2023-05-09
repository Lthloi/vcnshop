import React from "react"
import { styled } from '@mui/material/styles'

const PaymentType = ({ title, in_number, in_words }) => {

    return (
        <div id="PaymentTypeContainer">
            <PaymentTypeContainer>
                <PaymentTypeTitle>
                    {title + ' '}{title === 'OFF' && <span>(Coupons)</span>}
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

export default PaymentType

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
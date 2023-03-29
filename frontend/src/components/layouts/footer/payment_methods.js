import React from "react"
import { styled } from '@mui/material/styles'
import paypal from '../../../assets/images/payment_methods/paypal.png'
import payeer from '../../../assets/images/payment_methods/payeer.png'
import perfect_money from '../../../assets/images/payment_methods/perfect_money.png'
import MoMo from '../../../assets/images/payment_methods/MoMo.png'
import zalopay from '../../../assets/images/payment_methods/zalopay.png'
import cash from '../../../assets/images/payment_methods/cash.png'
import visa from '../../../assets/images/payment_methods/visa.png'
import mastercard from '../../../assets/images/payment_methods/mastercard.png'

const payment_methods = [
    { name: 'Paypal', img: paypal },
    { name: 'Payeer', img: payeer },
    { name: 'Perfect Money', img: perfect_money },
    { name: 'MoMo', img: MoMo },
    { name: 'Zalo Pay', img: zalopay },
    { name: 'Visa', img: visa },
    { name: 'Mastercard', img: mastercard },
    { name: 'Cash', img: cash },
]

const PaymentMethods = () => {
    return (
        <PaymentMethodsArea id="PaymentMethodsArea">
            <PaymentMethodsContainer>
                <TitleWrapper>
                    <Title>Accept payment via</Title>
                </TitleWrapper>
                <Methods>
                    {
                        payment_methods.map(({ name, img }) => (
                            <Method src={img} key={name}
                                title={name}
                            />
                        ))
                    }
                </Methods>
            </PaymentMethodsContainer>
        </PaymentMethodsArea>
    )
}

export default PaymentMethods

const PaymentMethodsArea = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'relative',
    zIndex: '2',
    marginTop: '20px',
}))

const PaymentMethodsContainer = styled('div')({

})

const TitleWrapper = styled('div')({
    display: 'flex',
    width: '100%',
})

const Title = styled('h2')({
    margin: 'auto',
    color: 'white',
    fontFamily: '"Chakra Petch", "sans-serif"',
    fontSize: '1.6em',
    paddingBottom: '10px',
    borderBottom: '3px #9000ec solid',
    width: 'fit-content',
})

const Methods = styled('div')({
    display: 'flex',
    columnGap: '20px',
    marginTop: '15px',
})

const Method = styled('img')({
    height: '35px',
    width: '35px',
})
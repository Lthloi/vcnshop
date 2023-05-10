import React from "react"
import { styled } from '@mui/material/styles'
import { useSelector } from "react-redux"
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'
import { useFloatNumber, useNumerToWords } from "../../hooks/custom_hooks"
import ErrorIcon from '@mui/icons-material/Error'
import { useNavigate } from "react-router-dom"

const ConfirmOrder = () => {
    const { cartItems, shippingInfo } = useSelector(({ cart }) => cart)
    const number_to_words_convertor = useNumerToWords()
    const get_float_number = useFloatNumber()
    const navigate = useNavigate()

    const summary_calculation = () => { //a function for some bad situations such as when user do something like cleaning then the data in session storage has been lost. IDK but it looks like useful, right ? =))
        let subtotal = cartItems.reduce(
            (accumulator, { cost, quantity }) => get_float_number(cost * quantity + accumulator), 0
        )
        let tax = get_float_number(subtotal * 0.18)
        let total = subtotal + tax
        return { subtotal, tax, total }
    }

    const summary = JSON.parse(sessionStorage.getItem('summary')) || summary_calculation()

    const shipping_fee = get_float_number(shippingInfo.Country !== 'Viet Nam' || shippingInfo.Country !== 'VN' ? summary.subtotal * 0.1 : summary.subtotal * 0.2)

    const confirmOrder = () => {
        let order_info = {
            total_to_pay: summary.total,
            shipping_fee,
            tax: summary.tax,
        }

        sessionStorage.setItem('orderInfo', JSON.stringify(order_info))

        navigate('/checkout?step=payment')
    }

    return (
        <ConfirmOrderSection id="ConfirmOrderSection">
            <SectionTitle>CONFIRM ORDER</SectionTitle>

            <ConfirmOrderContainer>
                <LeftContainer>
                    <ShippingInfoSection>
                        <Title>SHIPPING INFO</Title>
                        {
                            shippingInfo && shippingInfo.Country &&
                            ['Address', 'City', 'State', 'Zip Code', 'Country', 'Phone'].map((item, index) => (
                                <ShippingItem
                                    key={item}
                                    sx={{ borderTop: index === 0 && '1px #cdcdcd solid' }}
                                >
                                    <ItemName>{item + ':'}</ItemName>
                                    <ItemValue sx={{ color: shippingInfo[item === 'Phone' ? 'Phone Number' : item] ? 'black' : '#ababab' }}>
                                        {shippingInfo[item === 'Phone' ? 'Phone Number' : item] || 'Not Provided'}
                                    </ItemValue>
                                </ShippingItem>
                            ))
                        }
                        <Note>
                            <ErrorIcon sx={{ fontSize: '1.2em', color: 'gray' }} />
                            <span>In case the phone number isn't provided then we use your email to contact to you when dilivery</span>
                        </Note>
                    </ShippingInfoSection>
                    <CartItemsSection>
                        <Title>ITEMS</Title>
                        {
                            cartItems && cartItems.length > 0 &&
                            cartItems.map(({ _id, name, cost, color, size, quantity, image_link }) => (
                                <ProductCard key={_id}>
                                    <ProductImg src={image_link} />
                                    <ProductDetailContainer>
                                        <Detail>
                                            <DetailName>Name:</DetailName>
                                            <DetailValue>{name}</DetailValue>
                                        </Detail>
                                        <Detail>
                                            <DetailName>Cost:</DetailName>
                                            <DetailValue>{'$' + cost}</DetailValue>
                                        </Detail>
                                        <Detail>
                                            <DetailName>Color:</DetailName>
                                            <DetailValue>{color}</DetailValue>
                                        </Detail>
                                        <Detail>
                                            <DetailName>Size:</DetailName>
                                            <DetailValue>{size}</DetailValue>
                                        </Detail>
                                        <Detail>
                                            <DetailName>Quantity:</DetailName>
                                            <DetailValue>{quantity}</DetailValue>
                                        </Detail>
                                    </ProductDetailContainer>
                                </ProductCard>
                            ))
                        }
                    </CartItemsSection>
                </LeftContainer>

                <RightContainer>
                    <Title sx={{ textAlign: 'center' }}>SUMMARY</Title>
                    <SummarySection>
                        <SummaryItem>
                            <Type>Subtotal</Type>
                            <Value>{'$' + summary.subtotal}</Value>
                        </SummaryItem>
                        <SummaryItem>
                            <Type>Tax</Type>
                            <Value>{'$' + summary.tax}</Value>
                        </SummaryItem>
                        <SummaryItem>
                            <Type>Shipping Fee</Type>
                            <Value>{'$' + shipping_fee}</Value>
                        </SummaryItem>
                        <Hr />
                        <SummaryItem>
                            <Type className="total_to_pay">
                                Total To Pay
                            </Type>
                            <Value className="total_to_pay">
                                {'$' + get_float_number(summary.total + shipping_fee)}
                            </Value>
                        </SummaryItem>
                        <TotalToPayInWords>
                            <span>In Words: </span>
                            <span>{number_to_words_convertor(get_float_number(summary.total + shipping_fee))}</span>
                        </TotalToPayInWords>
                    </SummarySection>

                    <ConfirmOrderSubmit onClick={confirmOrder}>
                        <span>Proceed To Payment</span>
                        <DoubleArrowIcon />
                    </ConfirmOrderSubmit>
                </RightContainer>
            </ConfirmOrderContainer>
        </ConfirmOrderSection>
    )
}

export default ConfirmOrder

const ConfirmOrderSection = styled('div')(({ theme }) => ({
    marginTop: '30px',
}))

const SectionTitle = styled('h2')({
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

const ConfirmOrderContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '35px',
    padding: '0 30px',
    boxSizing: 'border-box',
    columnGap: '20px',
})

const LeftContainer = styled('div')({
    width: '55%',
})

const ShippingInfoSection = styled('div')({
    width: '100%',
})

const Title = styled('div')({
    fontFamily: '"Nunito", "sans-serif"',
    fontWeight: 'bold',
    fontSize: '1.2em',
    padding: '8px 17px',
    boxSizing: 'border-box',
    borderRadius: '5px',
    backgroundColor: 'black',
    width: '100%',
    color: 'white',
    marginBottom: '5px',
})

const ShippingItem = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    columnGap: '20px',
    padding: '10px 20px',
    boxSizing: 'border-box',
    border: '1px #cdcdcd solid',
    borderTop: 'none',
    borderRadius: '3px',
})

const ItemName = styled('span')({
    fontFamily: '"Nunito", "sans-serif"',
    fontWeight: 'bold',
})

const ItemValue = styled('span')({
    fontFamily: '"Nunito", "sans-serif"',
})

const Note = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '5px',
    marginTop: '5px',
    paddingLeft: '10px',
    '& span': {
        fontFamily: '"Nunito", "sans-serif"',
        fontSize: '0.8em',
    }
})

const CartItemsSection = styled('div')({
    marginTop: '30px',
    width: '100%',
})

const ProductCard = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '15px',
    width: '100%',
    marginBottom: '10px',
    backgroundColor: '#ececec',
    padding: '15px 10px',
    boxSizing: 'border-box',
    border: '2px #e1e1e1 solid',
    borderRadius: '3px',
})

const ProductImg = styled('img')({
    height: '120px',
})

const ProductDetailContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '2px',
    width: '100%',
})

const Detail = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    columnGap: '20px',
    padding: '2px 10px',
    boxSizing: 'border-box',
    borderBottom: '1.5px black solid',
    borderRadius: '10px',
    backgroundColor: 'white',
})

const DetailName = styled('span')({
    fontFamily: '"Nunito", "sans-serif"',
    fontWeight: 'bold',
    fontSize: '0.9em',
})

const DetailValue = styled('span')({
    fontFamily: '"Nunito", "sans-serif"',
})

const RightContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '45%',
    rowGap: '10px',
})

const SummarySection = styled('div')({
    width: '75%',
    padding: '20px',
    boxSizing: 'border-box',
    border: '2px black solid',
})

const SummaryItem = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    columnGap: '20px',
    marginBottom: '5px',
    '& .total_to_pay': {
        fontSize: '1.2em',
        fontWeight: 'bold',
    }
})

const Hr = styled('div')({
    margin: '20px 0',
    height: '3px',
    width: '100%',
    backgroundColor: 'black',
})

const Type = styled('div')({
    fontFamily: '"Nunito", "sans-serif"',
    color: 'black',
})

const Value = styled('div')({
    fontFamily: '"Nunito", "sans-serif"',
    color: 'black',
})

const TotalToPayInWords = styled('div')({
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '0.8em',
    color: 'black',
})

const ConfirmOrderSubmit = styled('button')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '5px',
    fontFamily: '"Nunito", "sans-serif"',
    fontWeight: 'bold',
    fontSize: '1em',
    padding: '10px 20px',
    backgroundColor: 'black',
    border: '2px black solid',
    cursor: 'pointer',
    color: 'white',
    marginTop: '10px',
    '&:hover': {
        color: 'black',
        backgroundColor: 'white',
        '& svg': {
            color: 'black',
        }
    },
    '&:active': {
        color: 'white',
        backgroundColor: 'black',
    },
})
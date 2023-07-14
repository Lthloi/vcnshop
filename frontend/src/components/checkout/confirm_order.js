import React from "react"
import { styled } from '@mui/material/styles'
import { useDispatch, useSelector } from "react-redux"
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'
import { useFloatNumber, useNumerToWords } from "../../hooks/custom_hooks"
import ErrorIcon from '@mui/icons-material/Error'
import { useNavigate, Navigate } from "react-router-dom"
import { saveOrderInfo } from "../../store/actions/cart_actions"
import { Stack, Divider, Typography } from "@mui/material"

const DetailComponent = ({ label, value }) => (
    <Detail>
        <Typography fontSize="0.9" fontWeight="bold" fontFamily="inherit">
            {label}
        </Typography>
        <span>{value}</span>
    </Detail>
)

const ProductCard = ({ cardInfo }) => {
    const { image_link, name, price, color, size, quantity } = cardInfo

    return (
        <ProductCardSection>
            <div style={{ minWidth: '121px' }}>
                <ProductImg src={image_link} />
            </div>
            <Stack rowGap="2px" width="100%">
                <DetailComponent label={'Name:'} value={name} />
                <DetailComponent label={'Price:'} value={price} />
                <DetailComponent label={'Color:'} value={color} />
                <DetailComponent label={'Size:'} value={size} />
                <DetailComponent label={'Quantity:'} value={quantity} />
            </Stack>
        </ProductCardSection>
    )
}

const CartItems = ({ cartItems }) => {
    return (
        <Stack marginTop="30px" width="100%">
            <Title>ITEMS</Title>
            {
                cartItems && cartItems.length > 0 &&
                cartItems.map((item) => (
                    <ProductCard key={item._id} cardInfo={item} />
                ))
            }
        </Stack>
    )
}

const ShippingInfo = ({ shippingInfo }) => {
    return (
        <Stack width="100%">
            <Title>Delivery Information</Title>
            {
                shippingInfo && shippingInfo.Country &&
                ['Address', 'City', 'State', 'Zip Code', 'Country', 'Phone'].map((label, index) => (
                    <ShippingItem
                        key={label}
                        sx={{ borderTop: index === 0 && '1px #cdcdcd solid' }}
                    >
                        <Typography fontWeight="bold">
                            {label + ':'}
                        </Typography>
                        <ItemValue theme={{ provided: shippingInfo[label === 'Phone' ? 'Phone Number' : label] }}>
                            {shippingInfo[label === 'Phone' ? 'Phone Number' : label] || 'Not Provided'}
                        </ItemValue>
                    </ShippingItem>
                ))
            }
            <Note>
                <ErrorIcon sx={{ fontSize: '1.2em', color: 'gray' }} />
                <span>In case the phone number isn't provided then we use your email to contact to you when dilivery</span>
            </Note>
        </Stack>
    )
}

const SummaryItemComponent = ({ label, value, isTotalToPay }) => (
    <SummaryItem sx={isTotalToPay ? { fontSize: '1.2em', fontWeight: 'bold' } : {}}>
        <span>
            {label}
        </span>
        <span>
            {'$' + value}
        </span>
    </SummaryItem>
)

const Summary = ({ summaryInfo }) => {
    const { subtotal, tax_fee, shipping_fee, total_to_pay } = summaryInfo
    const number_to_words_convertor = useNumerToWords()

    return (
        <Stack padding="20px" boxSizing="border-box" border="2px black solid">
            <SummaryItemComponent label={'Subtotal'} value={subtotal} />
            <SummaryItemComponent label={'Tax'} value={tax_fee} />
            <SummaryItemComponent label={'Shipping Fee'} value={shipping_fee} />
            <Hr />
            <SummaryItemComponent label={'Total To Pay'} value={total_to_pay} isTotalToPay={true} />
            <Typography fontSize="0.8em" fontFamily="inherit">
                <span>In words: </span>
                <span>{number_to_words_convertor(total_to_pay)}</span>
            </Typography>
        </Stack>
    )
}

const tax_charge = 0.08

const ConfirmOrder = () => {
    const { cartItems, shippingInfo } = useSelector(({ cart }) => cart)
    const get_float_number = useFloatNumber()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    if (!shippingInfo || cartItems.length === 0) {
        return (<Navigate to={-1} />)
    }

    const subtotal = get_float_number(
        cartItems.reduce((accumulator, { price, quantity }) => get_float_number(accumulator + price * quantity), 0)
    )

    const tax_fee = get_float_number(subtotal * tax_charge)

    const shipping_fee = shippingInfo.Method.cost

    const total_to_pay = get_float_number(subtotal + shipping_fee + tax_fee)

    const confirmOrder = () => {
        let order_info = {
            total_to_pay: total_to_pay,
            shipping_fee: shipping_fee,
            tax_fee: tax_fee,
            subtotal: subtotal,
        }

        dispatch(saveOrderInfo(order_info))

        navigate('/checkout/payment')
    }

    return (
        <ConfirmOrderSection id="ConfirmOrderSection">
            <SectionTitle>CONFIRM ORDER</SectionTitle>

            <ConfirmOrderContainer>

                <Stack width="55%">
                    <ShippingInfo shippingInfo={shippingInfo} />

                    <CartItems cartItems={cartItems} />
                </Stack>

                <Stack width="45%" alignItems="center" rowGap="10px">

                    <Title sx={{ textAlign: 'center' }}>SUMMARY</Title>

                    <Summary summaryInfo={{ subtotal, tax_fee, shipping_fee, total_to_pay }} />

                    <ConfirmOrderSubmit onClick={confirmOrder}>
                        <span>Proceed To Payment</span>
                        <DoubleArrowIcon />
                    </ConfirmOrderSubmit>

                    <Divider sx={{ margin: '30px auto', width: '50%' }} flexItem />

                    <Stack>
                        <Note>
                            <ErrorIcon sx={{ fontSize: '1.2em', color: 'gray' }} />
                            <span>If you have any questions about Tax or more, please go to FAQ</span>
                        </Note>
                    </Stack>
                </Stack>

            </ConfirmOrderContainer>
        </ConfirmOrderSection>
    )
}

export default ConfirmOrder

const ConfirmOrderSection = styled('div')(({ theme }) => ({
    marginTop: '30px',
    marginBottom: '20px',
    fontFamily: theme.fontFamily.nunito,
}))

const SectionTitle = styled('h2')(({ theme }) => ({
    color: 'white',
    boxSizing: 'border-box',
    margin: '20px 0',
    fontFamily: theme.fontFamily.GillSans,
    textAlign: 'center',
    padding: '15px',
    width: '100%',
    fontSize: '1.5em',
    backgroundColor: 'black',
    letterSpacing: '3px',
}))

const ConfirmOrderContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '35px',
    padding: '0 30px',
    boxSizing: 'border-box',
    columnGap: '20px',
})

const Title = styled('div')({
    fontWeight: 'bold',
    fontSize: '1.2em',
    padding: '10px 30px',
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

const ItemValue = styled('span')(({ theme }) => ({
    color: theme.provided ? 'black' : '#ababab',
}))

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

const ProductCardSection = styled('div')({
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
    maxWidth: '120px',
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

const SummaryItem = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    columnGap: '20px',
    marginBottom: '5px',
})

const Hr = styled('div')({
    margin: '20px 0',
    height: '3px',
    width: '100%',
    backgroundColor: 'black',
})

const ConfirmOrderSubmit = styled('button')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '5px',
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
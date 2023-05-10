import React from "react"
import { styled } from '@mui/material/styles'
import { useSelector } from "react-redux"
import BlackLogo from '../../assets/images/logo_app_black.svg'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const OrderDetail = ({ orderInfo }) => {
    const { cartItems, shippingInfo } = useSelector(({ cart }) => cart)

    const { total_to_pay, shipping_fee, tax } = orderInfo

    return (
        cartItems && cartItems.length > 0 &&
        <OrderDetailSection id="OrderDetailSection">
            <LogoContainer>
                <LogoApp src={BlackLogo} />
                <div>
                    <LogoText>VCN Shop</LogoText>
                    <LogoText>Fox COR</LogoText>
                </div>
            </LogoContainer>
            <AmountContainer>
                <AmountText>Total To Pay</AmountText>
                <Amount>{total_to_pay + ' $US'}</Amount>
            </AmountContainer>
            <Products>
                <Count>{cartItems.length > 1 ? cartItems.length + ' products' : '1 product'}</Count>
                {
                    cartItems.map(({ name, color, size, cost, image_link }) => (
                        <Product>
                            <div style={{ display: 'flex', alignItems: 'center', columnGap: '15px' }}>
                                <ProductImg src={image_link} />
                                <Details>
                                    <Detail sx={{ fontWeight: 'bold' }}>{name}</Detail>
                                    <Detail>{'Color: ' + color}</Detail>
                                    <Detail>{'Size: ' + size}</Detail>
                                </Details>
                            </div>
                            <Cost>{'$' + cost}</Cost>
                        </Product>
                    ))
                }
            </Products>
            <FeeContainer sx={{ marginTop: '40px' }}>
                <FeeTextContainer title="Click to view detail">
                    <FeeText>Shipping Fee</FeeText>
                    <DropDownIcon />
                </FeeTextContainer>
                <Fee>{'$' + shipping_fee}</Fee>
            </FeeContainer>
            <FeeContainer sx={{ marginTop: '15px' }}>
                <FeeTextContainer title="Click to view detail">
                    <FeeText>Sale Tax</FeeText>
                    <DropDownIcon />
                </FeeTextContainer>
                <Fee>{'$' + tax}</Fee>
            </FeeContainer>
        </OrderDetailSection>
    )
}

export default OrderDetail

const OrderDetailSection = styled('div')({
    width: '100%',
    paddingRight: '20px',
    boxSizing: 'border-box',
})

const LogoContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '10px',
})

const LogoApp = styled('img')({
    height: '100px',
})

const LogoText = styled('div')({
    fontFamily: '"Gill Sans", sans-serif',
    fontWeight: 'bold',
    fontSize: '1em',
})

const AmountContainer = styled('div')({
    marginTop: '30px',
})

const AmountText = styled('div')({
    fontFamily: '"Gill Sans", sans-serif',
    color: 'gray',
    fontWeight: 'bold',
    fontSize: '1em',
})

const Amount = styled('div')({
    fontFamily: '"Gill Sans", sans-serif',
    fontWeight: 'bold',
    fontSize: '1.8em',
    marginTop: '5px',
})

const Products = styled('div')({
    marginTop: '30px',
})

const Count = styled('div')({
    fontFamily: '"Gill Sans", sans-serif',
    color: 'gray',
    fontWeight: 'bold',
    fontSize: '0.9em',
    borderBottom: '2px gray solid',
    paddingBottom: '3px',
    paddingLeft: '3px',
})

const Product = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
    columnGap: '20px',
})

const ProductImg = styled('img')({
    height: '70px',
})

const Details = styled('div')({

})

const Detail = styled('div')({
    fontFamily: '"Gill Sans", sans-serif',
    fontSize: '0.9em',
    marginTop: '2px',
})

const Cost = styled(Detail)({
    fontWeight: 'bold',
})

const FeeContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '3px',
    borderBottom: '1px rgba(0,0,0,0.12) solid',
})

const FeeTextContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '5px',
    cursor: 'pointer',
})

const FeeText = styled('div')({
    fontFamily: '"Gill Sans", sans-serif',
    fontSize: '0.8em',
})

const DropDownIcon = styled(KeyboardArrowDownIcon)({
    fontSize: '1.2em',
})

const Fee = styled('div')({
    fontFamily: '"Gill Sans", sans-serif',
    fontWeight: 'bold',
    fontSize: '0.9em',
})
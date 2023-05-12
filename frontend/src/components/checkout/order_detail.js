import React from "react"
import { styled } from '@mui/material/styles'
import { useSelector } from "react-redux"
import BlackLogo from '../../assets/images/logo_app_black.svg'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import ErrorIcon from '@mui/icons-material/Error'

const RenderShippingMethod = (method, label, helper_text, fee) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
            <FormControlLabel
                value={method}
                control={<StyledRadio color="default" readOnly />}
                label={label}
                sx={{ pointerEvents: 'none' }}
            />
            <HelperText>{helper_text}</HelperText>
        </div>
        <ShippingFee>{fee}</ShippingFee>
    </div>
)

const OrderDetail = ({ orderInfo }) => {
    const { cartItems } = useSelector(({ cart }) => cart)

    const { total_to_pay, shipping_fee, tax_fee, tax_charge, shipping_fee_charge } = orderInfo

    return (
        cartItems && cartItems.length > 0 &&
        <OrderDetailSection id="OrderDetailSection">
            <LogoContainer>
                <LogoApp src={BlackLogo} />
                <div>
                    <LogoText>VCN Shop</LogoText>
                    <LogoText sx={{ marginTop: '5px' }}>Fox COR</LogoText>
                </div>
            </LogoContainer>
            <AmountContainer>
                <AmountText>Total To Pay</AmountText>
                <Amount>{total_to_pay + ' $US'}</Amount>
            </AmountContainer>
            <Products>
                <Count>{cartItems.length > 1 ? cartItems.length + ' products' : '1 product'}</Count>
                {
                    cartItems.map(({ name, color, size, cost, image_link, _id, quantity }) => (
                        <Product key={_id}>
                            <div style={{ display: 'flex', alignItems: 'center', columnGap: '15px' }}>
                                <ProductImg src={image_link} />
                                <Details>
                                    <Detail sx={{ fontWeight: 'bold' }}>{name}</Detail>
                                    <Detail>{'Color: ' + color}</Detail>
                                    <Detail>{'Size: ' + size}</Detail>
                                    <Detail>{'Qty: ' + quantity}</Detail>
                                </Details>
                            </div>
                            <Cost>{'$' + cost}</Cost>
                        </Product>
                    ))
                }
            </Products>

            <StyledAccordion>
                <FeeContainer sx={{ marginTop: '30px' }}>
                    <FeeTextContainer
                        title="Click to view detail"
                        expandIcon={<DropDownIcon />}
                    >
                        <FeeText>Shipping Fee</FeeText>
                    </FeeTextContainer>
                    <Fee>{'$' + shipping_fee}</Fee>
                </FeeContainer>
                <FeeExpandSection>
                    <Note>
                        <ErrorIcon sx={{ fontSize: '1.2em', color: 'gray' }} />
                        <div>
                            <span>In case the place for receiving the order that's not from Vet Nam then we will charge</span>
                            <span> {shipping_fee_charge * 100 + '%'} </span>
                            <span>of the total price of each item to the shipping fee, thank you for your order!</span>
                        </div>
                    </Note>
                    <StyledRadioGroup value={'Sea'}>
                        {RenderShippingMethod('Sea', 'Sea Transport', '5 - 7 bussiness days', 'Free')}
                    </StyledRadioGroup>
                </FeeExpandSection>
            </StyledAccordion>

            <StyledAccordion>
                <FeeContainer sx={{ marginTop: '10px' }}>
                    <FeeTextContainer
                        title="Click to view detail"
                        expandIcon={<DropDownIcon />}
                    >
                        <FeeText>Sale Tax</FeeText>
                    </FeeTextContainer>
                    <Fee>{'$' + tax_fee}</Fee>
                </FeeContainer>
                <FeeExpandSection>
                    <Note>
                        <ErrorIcon sx={{ fontSize: '1.2em', color: 'gray' }} />
                        <span>We will charge</span>
                        <span> {tax_charge * 100 + '%'} </span>
                        <span>to your order.</span>
                    </Note>
                </FeeExpandSection>
            </StyledAccordion>
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
    fontSize: '2em',
    transform: 'scaleY(1.2)',
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
    height: '80px',
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

const StyledAccordion = styled(Accordion)({
    '&::before': {
        content: 'unset',
    },
    boxShadow: 'none',
})

const FeeContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '2px rgba(0,0,0,0.12) solid',
})

const FeeTextContainer = styled(AccordionSummary)({
    display: 'flex',
    alignItems: 'center',
    columnGap: '5px',
    cursor: 'pointer',
    padding: '5px',
    minHeight: '0',
    '&.Mui-expanded': {
        minHeight: '0',
    },
    '& .MuiAccordionSummary-content.Mui-expanded': {
        margin: '0',
    },
    '& .MuiAccordionSummary-content': {
        margin: '0',
    },
})

const FeeText = styled('div')({
    fontFamily: '"Gill Sans", sans-serif',
    fontSize: '0.8em',
})

const DropDownIcon = styled(ExpandMoreIcon)({
    fontSize: '1.2em',
})

const Fee = styled('div')({
    fontFamily: '"Gill Sans", sans-serif',
    fontWeight: 'bold',
    fontSize: '0.9em',
})

const FeeExpandSection = styled(AccordionDetails)({
    marginTop: '10px',
    padding: '0',
    '& .MuiTypography-root': {
        fontSize: '0.9em',
        width: 'fit-content',
    },
    '& .MuiFormGroup-root': {
        padding: '5px 15px',
    },
    '& .MuiFormControlLabel-root': {
        width: 'fit-content',
    },
})

const StyledRadioGroup = styled(RadioGroup)({
    boxShadow: '0px 0px 3px gray',
    borderRadius: '5px',
})

const Note = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '5px',
    marginTop: '5px',
    marginBottom: '15px',
    padding: '0 10px',
    '& span': {
        fontFamily: '"Nunito", "sans-serif"',
        fontSize: '0.7em',
    }
})

const StyledRadio = styled(Radio)({
    pointerEvents: 'none',
    color: 'black',
    '& .MuiSvgIcon-root': {
        fontSize: '1em',
    },
})

const HelperText = styled('div')({
    color: 'gray',
    fontFamily: '"Gill Sans", sans-serif',
    fontSize: '0.8em',
    marginBottom: '5px',
})

const ShippingFee = styled('div')({
    fontFamily: '"Gill Sans", sans-serif',
    fontSize: '0.8em',
})
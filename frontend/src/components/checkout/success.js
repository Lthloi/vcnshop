import React from "react"
import { styled } from '@mui/material/styles'
import deliveryIcon from '../../assets/images/delivery.svg'
import ListAltIcon from '@mui/icons-material/ListAlt'
import PaymentIcon from '@mui/icons-material/Payment'
import PlaceIcon from '@mui/icons-material/Place'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const RenderBillType = (icon, small_title, value_of_type, class_name) => (
    <BillType className={class_name}>
        {icon}
        <TypeContainer>
            <Type>{small_title}</Type>
            <Value>{value_of_type}</Value>
        </TypeContainer>
    </BillType>
)

const Success = () => {
    return (
        <SuccessSection>
            <Title>
                <CheckCircleIcon sx={{ fontSize: '3em', color: 'white' }} />
                <TitleText>Yay! Order Successfully Placed</TitleText>
            </Title>
            <div style={{ display: 'flex', marginTop: '30px' }}>
                <BillSection>
                    <BillContainer>
                        <BillTitle>BILLING</BillTitle>
                        {RenderBillType(<ListAltIcon />, '3 items', '$208.52', 'Number_of_item_and_total_cost')}
                        {RenderBillType(<PaymentIcon />, 'Payment', 'Pay on card', 'Payment method')}
                        {RenderBillType(<AccessTimeIcon />, 'Delivery Date & Time', 'Today, 6 PM', 'Date of place order')}
                        {RenderBillType(<PlaceIcon />, 'Delivery Address', 'Dong Nai, Bien Hoa, Tan Phong', 'Address of place for receive order')}
                    </BillContainer>
                </BillSection>
                <ThankingSection>
                    <TruckAnimation src={deliveryIcon} />
                    <ThankTitle>THANK YOU!</ThankTitle>
                    <ThankText>
                        We are getting started on your order right away, and you will receive an email for an invoice of
                        your order.
                    </ThankText>
                    <ThankText sx={{ marginTop: '10px' }}>
                        We suggest you should check your email regularly to receive your order in time. Thank
                        for ordering in our site, have a nice day!
                    </ThankText>
                    <Buttons>
                        <LeftBtn>
                            Continue Shopping
                        </LeftBtn>
                        <RightBtn>
                            View Order
                        </RightBtn>
                    </Buttons>
                </ThankingSection>
            </div>
        </SuccessSection>
    )
}

export default Success

const SuccessSection = styled('div')(({ theme }) => ({
    margin: '20px 0',
}))

const Title = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: '10px',
    backgroundColor: 'black',
    padding: '15px',
})

const TitleText = styled('h2')({
    fontFamily: '"Gill Sans", sans-serif',
    margin: '0',
    color: 'white',
})

const BillSection = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    padding: '10px',
    boxSizing: 'border-box',
})

const BillContainer = styled('div')({
    padding: '40px 30px 40px',
    border: '1px black solid',
    width: '50%',
    boxSizing: 'border-box',
    borderRadius: '5px',
})

const BillTitle = styled('h2')({
    margin: '0',
    fontFamily: '"Gill Sans", sans-serif',
    letterSpacing: '2px',
    marginBottom: '30px',
})

const BillType = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '15px',
    width: '100%',
    marginTop: '20px',
})

const TypeContainer = styled('div')({

})

const Type = styled('div')({
    fontFamily: '"Gill Sans", sans-serif',
    fontSize: '0.9em',
    color: 'gray',
})

const Value = styled('div')({
    fontFamily: '"Gill Sans", sans-serif',
    fontSize: '1.1em',
})

const ThankingSection = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '50%',
    padding: '10px',
    boxSizing: 'border-box',
}))

const TruckAnimation = styled('img')(({ theme }) => ({
    position: 'relative',
    zIndex: '3',
    height: '80px',
    animation: 'car_jump 3s infinite linear',
    '@keyframes car_jump': {
        '0%': { top: '3px', },
        '10%': { top: '0', },
        '20%': { top: '3px', },
        '30%': { top: '0', },
        '40%': { top: '3px', },
        '50%': { top: '0', },
        '60%': { top: '3px', },
        '70%': { top: '0', },
        '80%': { top: '3px', },
        '90%': { top: '0', },
        '100%': { top: '3px', },
    },
}))

const ThankTitle = styled('h2')({
    fontFamily: '"Gill Sans", sans-serif',
    fontSize: '2em',
    fontWeight: 'bold',
    margin: '25px 0',
})

const ThankText = styled('p')({
    margin: '0',
    fontFamily: '"Gill Sans", sans-serif',
    width: '50%',
    textAlign: 'center',
})

const Buttons = styled('div')({
    display: 'flex',
    columnGap: '15px',
    marginTop: '30px',
})

const Button = styled('button')({
    fontFamily: '"Gill Sans", sans-serif',
    fontWeight: 'bold',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    boxSizing: 'border-box',
    cursor: 'pointer',
    '&:hover': {
        outline: '2px black solid',
    },
})

const LeftBtn = styled(Button)({
    boxShadow: '0px 0px 3px gray',
    backgroundColor: 'white',
})

const RightBtn = styled(Button)({
    color: 'white',
    backgroundColor: 'black',
})
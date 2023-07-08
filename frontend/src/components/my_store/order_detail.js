import React, { useEffect } from "react"
import { styled } from '@mui/material/styles'
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getOrderForShop } from "../../store/actions/order_actions"
import { Skeleton } from "@mui/material"
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { StepConnector } from "@mui/material"
import { stepConnectorClasses } from "@mui/material"
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PaidIcon from '@mui/icons-material/Paid'
import InventoryIcon from '@mui/icons-material/Inventory'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import { Tooltip } from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import { Avatar } from "@mui/material"
import PublicIcon from '@mui/icons-material/Public'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import PlaceIcon from '@mui/icons-material/Place'
import HomeIcon from '@mui/icons-material/Home'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import InfoIcon from '@mui/icons-material/Info'

const icon_style = { fontSize: '1.8em', color: 'white' }

const steps = [
    {
        label: 'Order Placed',
        description: '',
        icon: <PaidIcon sx={icon_style} />,
    }, {
        label: 'Packed',
        description: '',
        icon: <InventoryIcon sx={icon_style} />
    }, {
        label: 'Delivering',
        description: '',
        icon: <LocalShippingIcon sx={icon_style} />
    }, {
        label: 'Deliveried',
        description: '',
        icon: <CheckCircleIcon sx={icon_style} />
    }
]

const RenderStepIcon = ({ active, completed, error, }, icon_component) => {
    return (
        <StepIconWrapper theme={{ active, completed, error }}>
            {icon_component}
        </StepIconWrapper>
    )
}

const getActiveStep = (order_status) => {
    if (order_status === 'processing')
        return 1
    if (order_status === 'delivering')
        return 2
    if (order_status === 'delivered')
        return 4
}

const ContainerComponent = ({ children, title, width, marginTop }) => (
    <div style={{ width: width || '100%', marginTop: marginTop || '0' }}>
        <ContainerTitle>{title}</ContainerTitle>
        <Container>
            {children}
        </Container>
    </div>
)

const OrderStatus = ({ orderStatus }) => (
    <ContainerComponent title="Order Status" marginTop="20px">
        <Stepper
            activeStep={getActiveStep(orderStatus)}
            alternativeLabel
            connector={<ColorlibConnector />}
        >
            {
                steps.map(({ label, icon }) => (
                    <Step key={label}>
                        <StyledStepLabel StepIconComponent={(state) => RenderStepIcon(state, icon)}>
                            <CheckCircleIcon
                                className="completed_icon"
                                sx={{ marginRight: '5px', fontSize: '1.2em' }}
                            />
                            <span>{label}</span>
                        </StyledStepLabel>
                    </Step>
                ))
            }
        </Stepper>
    </ContainerComponent>
)

const TotalPriceSection = ({ items }) => {

    const get_total_price = () => items.reduce((accumulator, { price, quantity }) => accumulator + (price * quantity).toFixed(2) * 1, 0)

    return (
        <Payment>
            <span></span>
            <div style={{ display: 'flex', columnGap: '20px' }}>
                <Type>Total</Type>
                <div>{'$' + get_total_price()}</div>
            </div>
        </Payment>
    )
}

const ItemsSection = ({ items }) => (
    <ContainerComponent title="Items" width="60%">
        <Items>
            {
                items.map(({ _id, name, price, quantity, image_link, color, size }) => (
                    <Item key={_id}>
                        <Details>
                            <div style={{ minWidth: '101px' }}>
                                <Image src={image_link} />
                            </div>
                            <div>
                                <Detail style={{ fontWeight: 'bold', color: 'black' }}>{name}</Detail>
                                <Detail>{'Color: ' + color}</Detail>
                                <Detail>{'Size: ' + size}</Detail>
                                <Detail>{'Qty: ' + quantity}</Detail>
                            </div>
                        </Details>
                        <Price>{'$' + price}</Price>
                    </Item>
                ))
            }
        </Items>
        <TotalPriceSection items={items} />
    </ContainerComponent>
)

const CustomerDetailComponent = ({ icon, text }) => (
    <CustomerDetail>
        {icon}
        {
            text ?
                <span>{text}</span>
                :
                <div style={{ display: 'flex', columnGap: '5px', alignItems: 'center', color: '#A1A1A1' }}>
                    <span>not provided</span>
                    <Tooltip title="The customer didn't provide this one before" placement="right">
                        <ErrorIcon sx={{ fontSize: '1em' }} />
                    </Tooltip>
                </div>
        }
    </CustomerDetail>
)

const CustomerSection = ({ userInfo, shippingInfo, paymentInfo }) => (
    <ContainerComponent title="Customer Info">
        <SectionContainer style={{}}>
            <Tooltip title="Avatar Of Customer" placement="right">
                <CustomerAvatar src={userInfo.avatar} />
            </Tooltip>
            {
                userInfo.name &&
                <CustomerDetailComponent icon={<PersonIcon />} text={userInfo.name} />
            }
            {<CustomerDetailComponent icon={<EmailIcon />} text={userInfo.email} />}
            {<CustomerDetailComponent icon={<PhoneIcon />} text={shippingInfo.phone_number ? '+' + shippingInfo.phone_number : null} />}
            {<CustomerDetailComponent icon={<CreditCardIcon />} text={paymentInfo.method !== 'none' ? 'Paid On ' + paymentInfo.method : 'Unpaid'} />}
        </SectionContainer>
    </ContainerComponent>
)

const ShippingSection = ({ shippingInfo }) => (
    <ContainerComponent title="Shipping Info" marginTop="5px">
        <SectionContainer>
            <CustomerDetailComponent icon={<PublicIcon />} text={shippingInfo.country} />
            <CustomerDetailComponent icon={<LocationCityIcon />} text={shippingInfo.city} />
            <CustomerDetailComponent icon={<PlaceIcon />} text={shippingInfo.zip_code} />
            <CustomerDetailComponent icon={<HomeIcon />} text={shippingInfo.address} />
        </SectionContainer>
    </ContainerComponent>
)

const OrderDetail = () => {
    const { order, loading, error } = useSelector(({ order }) => order)
    const { orderId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getOrderForShop(undefined, orderId))
    }, [dispatch])

    return (
        <OrderDetailSection id="OrderDetailSection">
            <SectionTitle>
                <GoBackBtn onClick={() => navigate(-1)}>
                    <NavigateBeforeIcon />
                    <span>Back</span>
                </GoBackBtn>
                <InfoIcon sx={{ fontSize: '1.3m' }} />
                <span>Order Detail</span>
            </SectionTitle>

            {
                loading ? (
                    <Skeleton sx={{ height: '500px', transform: 'scale(1)', marginTop: '20px' }} />
                ) : error ? (
                    <Error>{'error.message'}</Error>
                ) : order && order.user &&
                <Order>
                    <OrderStatus orderStatus={order.order_status} />

                    <div style={{ display: 'flex', marginTop: '5px', columnGap: '5px' }}>
                        <ItemsSection items={order.items} />
                        <div style={{ width: '40%' }}>
                            <CustomerSection
                                userInfo={order.user}
                                paymentInfo={order.payment_info}
                                shippingInfo={order.shipping_info}
                            />
                            <ShippingSection
                                shippingInfo={order.shipping_info}
                            />
                        </div>
                    </div>
                </Order>
            }
        </OrderDetailSection>
    )
}

export default OrderDetail

const state_color = {
    active: 'black',
    completed: '#4bba7b',
    non_active: '#a1a1a1',
}

const OrderDetailSection = styled('div')(({ theme }) => ({
    marginTop: '20px',
}))

const SectionTitle = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: '10px',
    paddingBottom: '3px',
    boxSizing: 'border-box',
    width: '100%',
    borderBottom: '2px black solid',
    margin: '0',
    fontSize: '1.3em',
    marginTop: '30px',
    position: 'relative',
})

const GoBackBtn = styled('button')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '5px',
    backgroundColor: 'white',
    border: 'none',
    fontSize: '1em',
    position: 'absolute',
    left: '0',
    top: '0',
    cursor: 'pointer',
    '&:hover': {
        textDecoration: 'underline',
    }
})

const Error = styled('div')({
    color: 'red',
    width: '100%',
    textAlign: 'center',
    padding: '20px 0',
    fontSize: '1.2em',
    fontWeight: 'bold',
})

const Order = styled('div')({

})

const Items = styled('div')({

})

const Item = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '5px',
    boxShadow: '0px 0px 1px gray',
    padding: '20px',
    transition: 'transform 0.2s, border-color 0.2s',
    border: '2px white solid',
    backgroundColor: 'white',
    '&:hover': {
        transform: 'scale(1.05)',
        borderColor: 'black',
    }
})

const Image = styled('img')({
    height: '100px',
    boxShadow: '0px 0px 3px gray',
})

const Details = styled('div')({
    fontFamily: '"Kanit", "sans-serif"',
    fontSize: '0.9em',
    display: 'flex',
    columnGap: '15px',
})

const Detail = styled('p')({
    margin: '0',
    marginTop: '3px',
    color: 'gray',
})

const Price = styled('p')({
    fontSize: '1.5em',
    fontFamily: '"Kanit", "sans-serif"',
})

const Container = styled('div')({
    padding: '25px 20px',
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: '#F5F5F5',
})

const ContainerTitle = styled('h2')({
    margin: '0',
    backgroundColor: '#F5F5F5',
    padding: '8px',
    paddingLeft: '20px',
    fontSize: '0.9em',
    marginBottom: '5px',
    textAlign: 'center',
})

const ColorlibConnector = styled(StepConnector)({
    display: 'flex',
    justifyContent: 'center',
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: '25px',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: state_color.active,
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: state_color.completed,
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: '5px',
        width: '90%',
        border: 'unset',
        backgroundColor: state_color.non_active,
    },
})

const StepIconWrapper = styled('div')(({ theme }) => ({
    padding: '12px 12px 7px',
    borderRadius: '50%',
    backgroundColor: (theme.completed && state_color.completed) || (theme.active && state_color.active) || state_color.non_active,
}))

const StyledStepLabel = styled(StepLabel)({
    '& .MuiStepLabel-label.MuiStepLabel-alternativeLabel': {
        marginTop: '10px',
        color: state_color.non_active,
        '& .completed_icon': {
            display: 'none',
        },
        '&.Mui-completed': {
            color: state_color.completed,
            '& .completed_icon': {
                display: 'initial',
            }
        },
        '&.Mui-active': {
            color: state_color.active,
        },
    },
})

const CustomerDetail = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '20px',
    fontFamily: '"Kanit", "sans-serif"',
    paddingLeft: '10px',
})

const CustomerAvatar = styled(Avatar)({
    width: '100px',
    height: '100px',
    boxShadow: '0px 0px 3px gray',
})

const SectionContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: '20px',
})

const Payment = styled('div')({
    display: 'flex',
    columnGap: '25px',
    justifyContent: 'space-between',
    fontFamily: '"Kanit", "sans-serif"',
    marginTop: '20px',
    borderTop: '1px lightgrey solid',
    paddingTop: '10px',
    fontSize: '1.3em',
})

const Type = styled('h4')({
    color: 'gray',
    margin: '0',
})
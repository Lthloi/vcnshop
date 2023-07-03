import React, { useEffect } from "react"
import { styled } from '@mui/material/styles'
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getOrder } from "../../../store/actions/order_actions"
import { Skeleton } from "@mui/material"
import Tooltip from '@mui/material/Tooltip'
import OrderStatus from "./order_status"
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import PublicIcon from '@mui/icons-material/Public'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import PlaceIcon from '@mui/icons-material/Place'
import HomeIcon from '@mui/icons-material/Home'
import ErrorIcon from '@mui/icons-material/Error'
import moment from "moment"

const RenderPayment = (type_name, type_cost) => (
    <Payment>
        <Type>{type_name}</Type>
        <div>{'$' + type_cost}</div>
    </Payment>
)

const RenderCustomerDetail = (icon, text) => (
    <CustomerDetail>
        {icon}
        {
            text ?
                <span>{text}</span>
                :
                <div style={{ display: 'flex', columnGap: '5px', alignItems: 'center', color: '#A1A1A1' }}>
                    <span>not provided</span>
                    <Tooltip title="You didn't provide this one before" placement="right">
                        <ErrorIcon sx={{ fontSize: '1em' }} />
                    </Tooltip>
                </div>
        }
    </CustomerDetail>
)

const format_date = (time_string) => {
    return moment(time_string.toISOString()).format('MMMM Do YYYY, HH:mm')
}

const OrderDetail = () => {
    const { order, loading, error } = useSelector(({ order }) => order)
    const dispatch = useDispatch()
    const { orderId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getOrder(null, orderId))
    }, [dispatch])

    const viewProduct = (proudtc_id) => navigate('/productDetail/' + proudtc_id)

    return (
        <OrderDetailSection id="OrderDetailSection">
            <TitleSection>Order Details</TitleSection>
            <HelperText>Thanks for your order! Check out the details below</HelperText>
            <div style={{ marginTop: '30px' }}></div>
            {
                loading ? (
                    <Skeleton sx={{ transform: 'unset', height: '400px' }} />
                ) : error ? (
                    <Error>{error.message}</Error>
                ) : order && order._id &&
                <div>
                    <IDTitle>
                        <span>Order </span>
                        <span className="hightlight">{'#' + order.payment_info.id}</span>
                        <CreatedAt>{format_date(order.createdAt)}</CreatedAt>
                    </IDTitle>
                    <div style={{ display: 'flex', columnGap: '20px', marginTop: '25px' }}>
                        <OrderedItemsContainer>
                            <OrderedItemTitle>Ordered Items</OrderedItemTitle>
                            <OrderItems>
                                {
                                    order.items_of_order.map(({ _id, name, cost, quantity, image_link, color, size }) => (
                                        <Item key={_id}>
                                            <Details>
                                                <Tooltip title="Click for visiting the product">
                                                    <div style={{ minWidth: '101px' }}>
                                                        <Image
                                                            src={image_link}
                                                            onClick={() => viewProduct(_id)}
                                                        />
                                                    </div>
                                                </Tooltip>
                                                <div>
                                                    <Detail style={{ fontWeight: 'bold', color: 'black' }}>{name}</Detail>
                                                    <Detail>{'Color: ' + color}</Detail>
                                                    <Detail>{'Size: ' + size}</Detail>
                                                    <Detail>{'Qty: ' + quantity}</Detail>
                                                </div>
                                            </Details>
                                            <Price>{'$' + cost}</Price>
                                        </Item>
                                    ))
                                }
                            </OrderItems>
                            <PaymentContainer>
                                <span></span>
                                <div>
                                    {RenderPayment('Subtotal', order.price_of_items)}
                                    {RenderPayment('Shipping', order.shipping_fee)}
                                    {RenderPayment('Tax', order.tax_fee)}
                                    <Payment sx={{ borderTop: '1px lightgrey solid', paddingTop: '10px' }}>
                                        <Type>Total</Type>
                                        <div>{'$' + order.total_to_pay}</div>
                                    </Payment>
                                </div>
                            </PaymentContainer>
                        </OrderedItemsContainer>

                        <OrderStatus status={order.order_status} />
                    </div>
                    <div style={{ display: 'flex', columnGap: '20px', justifyContent: 'space-between', marginTop: '30px' }}>
                        <CustomerDetailsContainer>
                            <DetailsTitle>
                                <LocalShippingIcon />
                                <span>Shipping Details</span>
                            </DetailsTitle>
                            <div>
                                {RenderCustomerDetail(<PublicIcon />, order.shipping_info.country)}
                                {RenderCustomerDetail(<LocationCityIcon />, order.shipping_info.city)}
                                {RenderCustomerDetail(<PlaceIcon />, order.shipping_info.zip_code)}
                                {RenderCustomerDetail(<HomeIcon />, order.shipping_info.address)}
                            </div>
                        </CustomerDetailsContainer>
                        <CustomerDetailsContainer>
                            <DetailsTitle>
                                <PersonIcon />
                                <span>Customer Details</span>
                            </DetailsTitle>
                            <div>
                                {
                                    order.user.name &&
                                    RenderCustomerDetail(<PersonIcon />, order.user.name)
                                }
                                {RenderCustomerDetail(<EmailIcon />, order.user.email)}
                                {RenderCustomerDetail(<PhoneIcon />, order.shipping_info.phone_number ? '+' + order.shipping_info.phone_number : null)}
                                {RenderCustomerDetail(<CreditCardIcon />, 'paid on ' + order.payment_info.method)}
                            </div>
                        </CustomerDetailsContainer>
                    </div>
                </div>
            }
        </OrderDetailSection>
    )
}

export default OrderDetail

const OrderDetailSection = styled('div')(({ theme }) => ({
    padding: '20px 30px 40px',
    backgroundColor: '#F5F5F5',
}))

const TitleSection = styled('h2')({
    fontFamily: '"Kanit", "sans-serif"',
    margin: '10px 0',
    fontSize: '2.2em',
    width: '100%',
    textAlign: 'center',
})

const HelperText = styled('p')({
    margin: '0',
    fontSize: '0.9em',
    textAlign: 'center',
    fontFamily: '"Kanit", "sans-serif"',
    '& span.dot_required': {
        display: 'inline-block',
        color: 'red',
        fontSize: '1em',
        transform: 'scale(1.2)',
    },
})

const IDTitle = styled('h2')({
    margin: '0',
    fontFamily: '"Kanit", "sans-serif"',
    fontWeight: 'normal',
    fontSize: '1.1em',
    padding: '10px 20px',
    backgroundColor: 'white',
    '& .hightlight': {
        color: '#439093',
    }
})

const CreatedAt = styled('div')({
    fontSize: '0.8em',
    color: 'gray',
})

const OrderedItemsContainer = styled('div')({
    backgroundColor: 'white',
    width: '100%',
    padding: '30px',
})

const OrderedItemTitle = styled('h2')({
    fontFamily: '"Kanit", "sans-serif"',
    padding: '0 20px',
    margin: '0',
})

const OrderItems = styled('div')({
    border: '1px lightgrey solid',
    borderLeft: 'none',
    borderRight: 'none',
    padding: '20px 0 30px',
    marginTop: '15px',
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
    cursor: 'pointer',
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

const PaymentContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 20px',
})

const Payment = styled('div')({
    display: 'flex',
    columnGap: '25px',
    justifyContent: 'space-between',
    fontFamily: '"Kanit", "sans-serif"',
    marginTop: '15px',
})

const Type = styled('h4')({
    color: 'gray',
    margin: '0',
})

const DetailsTitle = styled('h2')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '10px',
    fontFamily: '"Kanit", "sans-serif"',
    fontSize: '1.2em',
    padding: '0 10px 15px',
    borderBottom: '1px lightgrey solid',
})

const CustomerDetailsContainer = styled('div')({
    backgroundColor: 'white',
    padding: '10px 30px 25px',
    width: '50%',
})

const CustomerDetail = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '20px',
    marginTop: '20px',
    fontFamily: '"Kanit", "sans-serif"',
    paddingLeft: '10px',
})

const Error = styled('div')({
    fontFamily: '"Kanit", "sans-serif"',
    color: 'red',
    padding: '20px',
    textAlign: 'center',
})
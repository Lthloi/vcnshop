import React, { useEffect, useState } from "react"
import { styled } from '@mui/material/styles'
import deliveryIcon from '../../assets/images/delivery.svg'
import ListAltIcon from '@mui/icons-material/ListAlt'
import PaymentIcon from '@mui/icons-material/Payment'
import PlaceIcon from '@mui/icons-material/Place'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import EmailIcon from '@mui/icons-material/Email'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { getOrder } from "../../store/actions/order_actions"
import { useDispatch, useSelector } from "react-redux"
import { PDFDownloadLink } from '@react-pdf/renderer'
import PDFReceipt from './PDF_receipt'
import axios from "axios"
import { EXPRESS_SERVER } from "../../utils/constants"
import { CircularProgress } from "@mui/material"
import { toast } from "react-toastify"
import actionsErrorHandler from "../../utils/error_handler"
import Skeleton from "@mui/material/Skeleton"
import { useNavigate } from "react-router-dom"
import { useGetQueryValue } from "../../hooks/custom_hooks"
import { Stack } from '@mui/material'

const project_info = {
    email: 'vcnshop@gmail.com',
    website: 'https://www.vcnshop.new',
}

const SEA_TRANSPORT = 'Sea Transport'

const SummaryTypeComponent = ({ icon, small_title, value_of_type }) => (
    <SummaryType>
        {icon}
        <div>
            <Type>{small_title}</Type>
            <Value>{value_of_type}</Value>
        </div>
    </SummaryType>
)

const SummarySection = ({ order }) => {
    return (
        <Stack padding="0 30px" width="33%" boxSizing="border-box" justifyContent="center" alignItems="center">
            <Summary>
                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                <SummaryTypeComponent
                    icon={<ListAltIcon />}
                    small_title={order.items_of_order.length + ' items'}
                    value_of_type={order.total_to_pay + ' USD'}
                />
                <SummaryTypeComponent
                    icon={<PaymentIcon />}
                    small_title={'Payment'}
                    value_of_type={'Paid on ' + order.payment_info.method}
                />
                <SummaryTypeComponent
                    icon={<AccessTimeIcon />}
                    small_title={'Delivery Date & Time'}
                    value_of_type={order.shipping_info.method === SEA_TRANSPORT ? 'Within 5 - 7 days' : ''}
                />
                <SummaryTypeComponent
                    icon={<PlaceIcon />}
                    small_title={'Delivery Address'}
                    value_of_type={order.shipping_info.country + ', ' + order.shipping_info.city + ', ' + order.shipping_info.address}
                />
            </Summary>
        </Stack>
    )
}

const ThankingSection = () => {
    return (
        <Thanking>
            <TruckAnimation src={deliveryIcon} />
            <ThankTitle>THANK YOU!</ThankTitle>
            <ThankText>
                We are getting started on your order right away, and you will receive an email for an invoice of
                your order.
            </ThankText>
            <ThankText sx={{ marginTop: '10px' }}>
                We suggest you should check your email regularly to receive your order in time. Thank
                for shopping in our site, have a nice day!
            </ThankText>
            <Buttons>
                <LeftBtn href="/">
                    Continue Shopping
                </LeftBtn>
                <RightBtn href="/account/myOrders">
                    View Order
                </RightBtn>
            </Buttons>
        </Thanking>
    )
}

const ReceiptOptionsSection = ({ order }) => {
    const [sendReceiptLoading, setSendReceiptLoading] = useState(false)
    const user_email = useSelector(({ user }) => user.user.email)

    const sendReceiptViaEmail = async () => {
        setSendReceiptLoading(true)

        try {
            await axios.post(
                EXPRESS_SERVER + '/api/order/sendReceiptViaEmail',
                {
                    paymentId: order.payment_info.id,
                    deliveryInfo: {
                        address: order.shipping_info.address,
                        shippingMethod: order.shipping_info.method,
                    },
                    receiverInfo: {
                        email: user_email,
                        phone: order.shipping_info.phone_number,
                        paidOn: order.payment_info.method,
                    },
                    items: order.items_of_order,
                    taxFee: order.tax_fee,
                    shippingFee: order.shipping_fee,
                    totalToPay: order.total_to_pay,
                },
                { withCredentials: true }
            )
            toast.success('The receipt was sent to ' + user_email + ' successfully!')
        } catch (error) {
            let errorObject = actionsErrorHandler(error)
            toast.error(errorObject.message)
        }

        setSendReceiptLoading(false)
    }

    return (
        <ReceiptOptions>
            <ReceiptIconWrapper>
                <ReceiptIcon sx={{ fontSize: '3em', color: 'white', margin: 'auto' }} />
            </ReceiptIconWrapper>
            <Note>Get A Receipt For Your Order.</Note>
            <Option onClick={sendReceiptViaEmail}>
                {
                    sendReceiptLoading ?
                        <CircularProgress
                            sx={{ color: 'black', padding: '3px' }}
                            thickness={6}
                            size={19}
                        />
                        :
                        <>
                            <EmailIcon />
                            <span>Send A Receipt Via Email</span>
                        </>
                }
            </Option>
            <DownloadOption
                fileName="VCNShop-Receipt.pdf"
                document={
                    <PDFReceipt
                        items={order.items_of_order}
                        systemEmail={project_info.email}
                        website={project_info.website}
                        receiverInfo={order.user}
                        deliveryInfo={order.shipping_info}
                        totalToPay={order.total_to_pay}
                        taxFee={order.tax_fee}
                        shippingFee={order.shipping_fee}
                        paymentInfo={order.payment_info}
                        dateOfPayment={order.createdAt}
                    />
                }
            >
                <FileDownloadIcon />
                <span>Download A Receipt</span>
            </DownloadOption>
        </ReceiptOptions>
    )
}

const Success = () => {
    const { order } = useSelector(({ order }) => order)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const query_value_getter = useGetQueryValue()

    const paymentId = query_value_getter(1, 'payment_intent')

    useEffect(() => {
        if (!paymentId) {
            navigate(-1)
        } else {
            dispatch(getOrder(paymentId))
        }
    }, [dispatch])

    return (
        <SuccessSection>
            <Title>
                <CheckCircleIcon sx={{ fontSize: '3em', color: 'white' }} />
                <TitleText>Yay! Order Successfully Placed</TitleText>
            </Title>
            {
                order && order.shipping_info ?
                    <Stack flexDirection="row" marginTop="30px">
                        <SummarySection order={order} />

                        <ThankingSection />

                        <ReceiptOptionsSection order={order} />
                    </Stack>
                    :
                    <Stack flexDirection="row" columnGap="20px" width="100%" padding="15px 0" marginTop="10px">
                        <Loading animation="wave" />
                        <Loading animation="wave" />
                        <Loading animation="wave" />
                    </Stack>
            }
        </SuccessSection >
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

const Summary = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    padding: '30px 0',
    border: '1px black solid',
    borderBottomWidth: '5px',
    borderRightWidth: '5px',
    width: '85%',
    boxSizing: 'border-box',
    borderRadius: '5px',
})

const SummaryTitle = styled('h2')({
    fontSize: '1.3em',
    padding: '15px 30px',
    color: 'white',
    margin: '0',
    fontFamily: '"Gill Sans", sans-serif',
    letterSpacing: '2px',
    marginBottom: '20px',
    backgroundColor: 'black',
})

const SummaryType = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '15px',
    width: '100%',
    marginTop: '20px',
    padding: '5px 30px',
    boxSizing: 'border-box',
    backgroundColor: 'rgb(128 128 128 / 11%)',
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

const ReceiptOptions = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '33%',
})

const ReceiptIconWrapper = styled('div')({
    display: 'flex',
    padding: '5px',
    backgroundColor: 'black',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
})

const Note = styled('div')({
    textAlign: 'center',
    columnGap: '5px',
    marginTop: '10px',
    paddingLeft: '10px',
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '0.8em',
    width: '80%',
})

const style_of_option = {
    display: 'flex',
    columnGap: '5px',
    alignItems: 'center',
    padding: '5px 10px',
    backgroundColor: 'white',
    boxShadow: '3px 3px 0px gray',
    borderRadius: '5px',
    cursor: 'pointer',
    border: '1px gray solid',
    position: 'relative',
    marginTop: '15px',
    color: 'black',
    fontFamily: '"Gill Sans", sans-serif',
    textDecoration: 'unset',
    fontSize: '0.8em',
    '&:hover': {
        backgroundColor: 'rgb(0 0 0)',
        color: 'white',
        '& svg': {
            color: 'white',
        }
    },
    '&:active': {
        top: '3px',
        left: '3px',
        boxShadow: 'none',
    },
}

const Option = styled('button')({
    ...style_of_option,
})

const DownloadOption = styled(PDFDownloadLink)({
    ...style_of_option,
})

const Thanking = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '33%',
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
    width: '80%',
    textAlign: 'center',
})

const Buttons = styled('div')({
    display: 'flex',
    columnGap: '15px',
    marginTop: '30px',
})

const Button = styled('a')({
    textDecoration: 'unset',
    color: 'black',
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
    '&:active': {
        outline: 'none',
    },
})

const LeftBtn = styled(Button)({
    color: 'white',
    backgroundColor: 'black',
})

const RightBtn = styled(Button)({
    boxShadow: '0px 0px 3px gray',
    backgroundColor: 'white',
})

const Loading = styled(Skeleton)({
    width: '100%',
    height: '400px',
    transform: 'scale(1)',
})
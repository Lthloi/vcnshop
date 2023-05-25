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

const project_info = {
    email: 'vcnshop@gmail.com',
    website: 'https://www.vcnshop.new',
}

const SEA_TRANSPORT = 'Sea Transport'

const RenderBillType = (icon, small_title, value_of_type) => (
    <SummaryType>
        {icon}
        <div>
            <Type>{small_title}</Type>
            <Value>{value_of_type}</Value>
        </div>
    </SummaryType>
)

const Success = ({ paymentId }) => {
    const [sendReceiptLoading, setSendReceiptLoading] = useState(false)
    const { order } = useSelector(({ order }) => order)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getOrder(paymentId))
    }, [dispatch])

    const sendReceiptViaEmail = async () => {
        setSendReceiptLoading(true)

        try {
            await axios.post(
                EXPRESS_SERVER + '/api/sendReceiptViaEmail',
                {
                    paymentId: order.payment_info.id,
                    deliveryInfo: order.shipping_info,
                    receiverInfo: order.user,
                    items: order.items_of_order,
                    taxFee: order.tax_fee,
                    shippingFee: order.shipping_fee,
                    totalToPay: order.total_to_pay,
                },
                { withCredentials: true }
            )
            toast.success('The receipt was sent successfully!')
        } catch (error) {
            let errorObject = actionsErrorHandler(error)
            toast.error(errorObject.message)
        }

        setSendReceiptLoading(false)
    }

    return (
        <SuccessSection>
            <Title>
                <CheckCircleIcon sx={{ fontSize: '3em', color: 'white' }} />
                <TitleText>Yay! Order Successfully Placed</TitleText>
            </Title>
            {
                order && order.shipping_info ?
                    <div style={{ display: 'flex', marginTop: '30px' }}>
                        <SummarySection>
                            <SummaryContainer>
                                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                                {RenderBillType(<ListAltIcon />, order.items_of_order.length + ' items', order.total_to_pay + ' USD')}
                                {RenderBillType(<PaymentIcon />, 'Payment', 'Pay on ' + order.payment_info.method)}
                                {RenderBillType(<AccessTimeIcon />, 'Delivery Date & Time', order.shipping_info.method === SEA_TRANSPORT ? 'Within 5 - 7 days' : '')}
                                {RenderBillType(<PlaceIcon />, 'Delivery Address', order.shipping_info.country + ', ' + order.shipping_info.city + ', ' + order.shipping_info.address)}
                            </SummaryContainer>
                        </SummarySection>

                        <ThankingSection>
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
                        </ThankingSection>

                        <ReceiptOptions>
                            <ReceiptIconWrapper>
                                <ReceiptIcon sx={{ fontSize: '3em', color: 'white', margin: 'auto' }} />
                            </ReceiptIconWrapper>
                            <Note>Get A Receipt For Your Order.</Note>
                            <Option onClick={sendReceiptViaEmail}>
                                {
                                    sendReceiptLoading ?
                                        <CircularProgress
                                            sx={{ color: 'black' }}
                                            thickness={6}
                                            size={18}
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
                                    />
                                }
                            >
                                <FileDownloadIcon />
                                <span>Download A Receipt</span>
                            </DownloadOption>
                        </ReceiptOptions>
                    </div>
                    :
                    <div style={{ display: 'flex', columnGap: 10, width: '100%', padding: '15px 0' }}>
                        <Loading animation="wave" />
                        <Loading animation="wave" />
                    </div>
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

const SummarySection = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '33%',
    padding: '10px',
    boxSizing: 'border-box',
})

const SummaryContainer = styled('div')({
    padding: '30px 0',
    border: '1px black solid',
    borderBottomWidth: '5px',
    borderRightWidth: '5px',
    width: '80%',
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

const ThankingSection = styled('div')(({ theme }) => ({
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
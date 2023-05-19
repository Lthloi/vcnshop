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

const data = {
    data: [
        { name: 'vcn1', quantity: 1, price: 18, _id: 1 },
        { name: 'vcn2', quantity: 2, price: 19, _id: 2 },
        { name: 'vcn3', quantity: 3, price: 20, _id: 3 },
    ],
    project_info: {
        email: 'vcnshop@gmail.com',
        website: 'https://www.vcnshop.new',
    },
    delivery_info: {
        address: 'street, city, state 0000',
        shipping_method: 'Sea Transport',
    },
    receiver_info: {
        email: 'JohnDoe@gmail.com',
        phone: '555-555-5555',
        payment_method: 'card',
    },
    payment_id: 'pi_nan23u190e0jdicnekj12ne1i10',
    total_to_pay: 208.55,
    shipping_fee: 21,
    tax_fee: 12,
}

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
    console.log('>>> order >>>', order)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getOrder(paymentId))
    }, [])

    const sendReceiptViaEmail = async () => {
        setSendReceiptLoading(true)

        try {
            await axios.post(
                EXPRESS_SERVER + '/api/sendReceiptViaEmail',
                {
                    paymentId: data.payment_id,
                    deliveryInfo: data.delivery_info,
                    receiverInfo: data.receiver_info,
                    items: data.data,
                    taxFee: data.tax_fee,
                    shippingFee: data.shipping_fee,
                    totalToPay: data.total_to_pay,
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
            <div style={{ display: 'flex', marginTop: '30px' }}>
                <SummarySection>
                    <SummaryContainer>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        {RenderBillType(<ListAltIcon />, '3 items', '$208.52')}
                        {RenderBillType(<PaymentIcon />, 'Payment', 'Pay on card')}
                        {RenderBillType(<AccessTimeIcon />, 'Delivery Date & Time', 'Today, 6 PM')}
                        {RenderBillType(<PlaceIcon />, 'Delivery Address', 'Dong Nai, Bien Hoa, Tan Phong')}
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
                        <RightBtn href="/order/history">
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
                        document={
                            <PDFReceipt
                                items={data.data}
                                systemEmail={data.project_info.email}
                                website={data.project_info.website}
                                receiverInfo={data.receiver_info}
                                deliveryInfo={data.delivery_info}
                                totalToPay={data.total_to_pay}
                                taxFee={data.tax_fee}
                                shippingFee={data.shipping_fee}
                                paymentId={data.payment_id}
                            />
                        }
                        fileName="VCNShop-Receipt.pdf"
                    >
                        <FileDownloadIcon />
                        <span>Download A Receipt</span>
                    </DownloadOption>
                </ReceiptOptions>
            </div>
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
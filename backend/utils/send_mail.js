import nodemailer from 'nodemailer'
import UserModel from '../models/user_schema.js'
import moment from 'moment'
import { getOTPHtmlString, getReceiptHtmlString } from './html_string_handlers.js'

const company_info = {
    name: 'VCN Shop',
    address: '9th floor of FoxLand Building',
    country: 'Viet Nam',
    website: 'https://www.vcnshop.new',
    email: 'vcnshop@gmail.com',
}

const { GMAIL_USERNAME, GMAIL_PASSWORD } = process.env

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
        user: GMAIL_USERNAME,
        pass: GMAIL_PASSWORD,
    },
})

const sendOTPViaEmail = async (
    OTP_code, OTP_expire_in_minute, receiver, subject, update_OTP_via_UserModel = true,
) => {
    try {
        let html_to_send = await getOTPHtmlString(company_info, OTP_expire_in_minute, OTP_code)

        await transporter.sendMail({
            from: `"VCN Shop" <${GMAIL_USERNAME}>`,
            to: receiver,
            subject: subject,
            text: 'This is your OTP code: ' + OTP_code + '. If you have not requested this email then, please ignore it.',
            html: html_to_send,
        })

        if (update_OTP_via_UserModel)
            await UserModel.updateOne(
                { email: receiver },
                {
                    $set: {
                        'OTP_code.value': OTP_code,
                        'OTP_code.expireAt': moment().add(OTP_expire_in_minute, 'minutes'),
                    }
                }
            )

    } catch (error) {
        throw error
    }
}

const sendReceiptViaEmail = async (
    receiver,
    subject,
    {
        paymentId,
        deliveryInfo,
        receiverInfo,
        items,
        taxFee,
        shippingFee,
        totalToPay,
        createdAt
    }
) => {

    let generated_on = moment().format("MMMM Do YYYY")
    let paidAt = moment(createdAt).format('MMMM Do YYYY, h:mm a')

    try {
        let html_to_send = await getReceiptHtmlString(
            paymentId,
            deliveryInfo,
            receiverInfo,
            items,
            company_info,
            shippingFee,
            taxFee,
            totalToPay,
            generated_on,
            paidAt
        )

        await transporter.sendMail({
            from: `"VCN Shop" <${GMAIL_USERNAME}>`,
            to: receiver,
            subject: subject,
            text:
                `
                Payment Receipt:\n
                \nID: ${paymentId}
                \nAddress: ${deliveryInfo.address}
                \nShipping Method: ${deliveryInfo.shipping_method}
                \nEmail: ${receiverInfo.email}
                \nPhone: ${receiverInfo.phone}
                \nPaid On: ${receiverInfo.payment_method}
                \nSum: ${items.length > 1 ? items.length + ' items' : items.length + ' item'}
                \nTax Fee: ${taxFee}
                \nShipping Fee: ${shippingFee}
                \nTotal To Pay: ${totalToPay}
                \nGenerated On: ${generated_on}
            `,
            html: html_to_send,
        })
    } catch (error) {
        throw error
    }
}

export {
    sendOTPViaEmail, sendReceiptViaEmail,
}
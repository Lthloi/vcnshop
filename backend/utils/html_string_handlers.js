import ejs from 'ejs'

const getOTPHtmlString = async (company_info, OTP_expire_in_minute, OTP_code) => {
    let html_string = await ejs.renderFile(
        './backend/templates/otp.ejs',
        {
            company_info,
            OTP_expire_in_minute,
            OTP_code,
        }
    )

    return html_string
}

const getReceiptHtmlString = async (
    paymentId,
    deliveryInfo,
    receiverInfo,
    items,
    company_info,
    shipping_fee,
    tax_fee,
    total_to_pay,
    generated_on
) => {
    let html_string = await ejs.renderFile(
        './backend/templates/receipt.ejs',
        {
            paymentId,
            deliveryInfo,
            receiverInfo,
            company_info,
            generated_on,
            items,
            shipping_fee,
            tax_fee,
            total_to_pay,
        }
    )

    return html_string
}

export {
    getOTPHtmlString, getReceiptHtmlString,
}
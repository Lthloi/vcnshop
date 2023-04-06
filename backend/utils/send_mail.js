import nodemailer from 'nodemailer'

const project_info = {
    name: 'VCN Shop',
    address: '9th floor of FoxLand Building',
    country: 'Viet Nam',
}

const minutes_for_otp_is_expire = 5

const { GMAIL_USERNAME, GMAIL_PASSWORD } = process.env

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
        user: GMAIL_USERNAME,
        pass: GMAIL_PASSWORD,
    },
})

const sendMail = async (otp_code, receiver, subject, message = '') => {
    let email_content = message ? message :
        `
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
                <div style="border-bottom:1px solid #eee">
                    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">
                        ${project_info.name}
                    </a>
                </div>
                <p style="font-size:1.1em">Hi,</p>
                <p>
                    Thank you for choosing ${project_info.name}. Use the following OTP to
                    complete your register procedures. OTP is valid for ${minutes_for_otp_is_expire} minutes
                </p>
                <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">
                    ${otp_code}
                </h2>
                <p style="font-size:0.9em;">
                    Regards,<br />
                    ${project_info.name}
                </p>
                <hr style="border:none;border-top:1px solid #eee" />
                <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                    <p>${project_info.name}</p>
                    <p>${project_info.address}</p>
                    <p>${project_info.country}</p>
                </div>
            </div>
        </div>
        `

    try {
        await transporter.sendMail({
            from: `"VCN Shop" <${GMAIL_USERNAME}>`,
            to: receiver,
            subject,
            text: 'This is OTP code: ' + token,
            html: email_content,
        })
    } catch (error) {
        return error
    }

    return otp_code
}

export default sendMail
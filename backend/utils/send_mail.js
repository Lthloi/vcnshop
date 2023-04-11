import nodemailer from 'nodemailer'

const project_info = {
    name: 'VCN Shop',
    address: '9th floor of FoxLand Building',
    country: 'Viet Nam',
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

const sendMail = async (OTP_code, OTP_expire, receiver, subject, message) => {
    try {
        await transporter.sendMail({
            from: `"VCN Shop" <${GMAIL_USERNAME}>`,
            to: receiver,
            subject: subject ? subject : 'VCN Shop - Verify OTP ✔',
            text: 'This is OTP code: ' + OTP_code,
            html: message ? message :
                `
                <div style="font-family: Helvetica,Arial,sans-serif; width: 100%; display: flex; justify-content: center; align-items: center; box-sizing: border-box; ">
                    <div style="padding: 10px; ">
                        <div style="border-bottom: 1px solid #c1c1c1; padding: 5px 0 15px;">
                            <a href="https://www.vcnshop.new" style="font-size: 1.4em; color: #00466a; text-decoration: none; font-weight: 600; ">
                                ${project_info.name}
                            </a>
                        </div>
                        <p style="font-size: 1.1em; ">Hi,</p>
                        <p>
                            Thank you for choosing ${project_info.name}. Use the following OTP to
                            complete your register procedures. OTP is valid for ${OTP_expire} minutes.
                        </p>
                        <h2 style="background: #00466a; margin: 0 auto; width: fit-content; padding: 5px 10px; color: #fff; border-radius: 4px; ">
                            ${OTP_code}
                        </h2>
                        <p style="font-size: 0.9em; ">
                            <span>Regards,</span>
                            <br />
                            <span>${project_info.name}</span>
                        </p>
                        <hr style="border: none; border-top: 1px solid #c1c1c1; " />
                        <div style="display: flex; justify-content: space-between; ">
                            <div></div>
                            <div style="font-size: 0.8em; ">
                                <p>${project_info.name}</p>
                                <p>${project_info.address}</p>
                                <p>${project_info.country}</p>
                            </div>
                        </div>
                    </div>
                </div>
                `,
        })
    } catch (error) {
        throw error
    }
}

export default sendMail
import BaseError from './base_error.js'
import nodemailer from 'nodemailer'

const { GMAIL_USERNAME, GMAIL_PASSWORD } = process.env

const sendMail = async (
    sender = '"VCN" <codevoicainay@gmail.com>',
    receiver, header, plain_text, html_code,
) => {
    try {
        let error = null

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: GMAIL_USERNAME,
                pass: GMAIL_PASSWORD,
            },
        })

        let info = await transporter.sendMail({
            from: sender,
            to: receiver,
            subject: header,
            text: plain_text,
            html: html_code,
        })

        throw error
    } catch (error) {
        return error
    }
}

export default sendMail
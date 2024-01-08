const nodemailer = require('nodemailer')
const asyncHandler = require('express-async-handler')

const sendMail = asyncHandler(async ({ email, html, subject }) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    })

    let info = await transporter.sendMail({
        from: "'ecommercebytdv' <no-reply@ecommercebytdv.com>",
        to: email,
        subject: subject,
        html: html,
    })
})

module.exports = sendMail
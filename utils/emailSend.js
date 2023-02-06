const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const password = process.env.MAIL_PASSWORD;
const email = process.env.MAIL_ADDRESS;

const sendMail = async (options) => {
    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.MAIL_ADDRESS,
            pass: process.env.MAIL_PASSWORD
        }
    });

    let mailOptions = {
        from: process.env.MAIL_ADDRESS,
        to: options.email,
        subject: options.subject,
        text: options.message
    };
    console.log(process.env.MAIL_ADDRESS);
    console.log(process.env.MAIL_PASSWORD);
    const info = await transporter.sendMail(mailOptions);
}

module.exports = sendMail;
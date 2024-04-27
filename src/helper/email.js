const emailer = require('nodemailer')

const sendEmail =async (email,subject,html)=>{
    let configOptions = {
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
    }
    const transporter = emailer.createTransport(configOptions);
    const info = await transporter.sendMail({
        from: 'Mail <ahmed@email.com>',
        to:email,
        subject,
        html,
    })

    return info
}
module.exports = sendEmail
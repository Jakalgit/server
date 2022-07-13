const nodemailer = require('nodemailer')

class emailSender {
    async send(req, res) {
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })

        const mailOptions = {
            from: process.env.EMAIL,
            to: 'mistetsmit05@gmail.com',
            subject: 'Письмо Node JS',
            text: 'Текст письма'
        }

        await transport.sendMail(mailOptions, err => {
            return res.json(err)
        })
    }
}

module.exports = new emailSender()
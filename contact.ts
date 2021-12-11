import type { NextApiRequest, NextApiResponse } from 'next'


export default function (req: any, res: any) {
  require('dotenv').config()

  let nodemailer = require('nodemailer')
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.domain.com",
    auth: {
      user: 'support@ssanctus.com',
      pass: process.env.password,
    },
    secure: true,
  })
  const mailData = {
    from: 'leekong415@gmail.com',
    to: 'allee227888@gmail.com',
    subject: `Message From ${req.body.name}`,
    text: req.body.message + " | Sent from: " + req.body.email,
    html: `<div>${req.body.phone}</div><p>Sent from:
    ${req.body.email}</p>`
  }
  transporter.sendMail(mailData, function (err: any, info: any) {
    if (err)
      console.log(err, "++++++++")
    else
      console.log(info)
  })
  res.status(200)
}

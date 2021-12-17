

const fs = require('fs');

require('https').globalAgent.options.ca = require('ssl-root-cas').create();
export default function (req: any, res: any) {
  require('dotenv').config()
  const dirPath = 'list.json';
  const newData = req.body;
  // const originData = fs.readFileSync(dirPath, { encoding: 'utf8', flag: 'r' });
  // data = { newData, originData, ...data };
  fs.appendFileSync(dirPath, JSON.stringify(newData));
  const PASSWORD = process.env.password
  let nodemailer = require('nodemailer')
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.domain.com",
    auth: {
      user: 'support@ssanctus.com',
      pass: process.env.password,
    },
    secure: true,
    tls: {
      rejectUnauthorized: false,
    },
  })
  const mailData = {
    from: 'support@ssanctus.com',
    to: 'saulsaidgonzalez@ssanctus.com',
    subject: `Message From ${req.body.name}`,
    text: req.body.message + " | Sent from: " + req.body.email,
    html: `<div>${req.body.phone}</div><p>Sent from:
    ${req.body.email}</p>`
  }
  transporter.sendMail(mailData, function (err: any, info: any) {
    if (err)
      console.log(err)
    else
      console.log(info)
  })

  res.status(200).end();
}

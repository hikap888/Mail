const fs = require('fs');
const dirPath = 'd:/emailList.json';
//const dirPath = '/home/ubuntu/m/emailList.json';
function parseJobs(): Promise<any> {
  return new Promise(function (resolve, reject) {

    fs.readFile(dirPath, function (err: any, data: string) {
      if (err) {
        reject(err);
      };
      if (data.length <= 0)
        resolve(data)
      else
        resolve(JSON.parse(data));
    })
  });
}
require('https').globalAgent.options.ca = require('ssl-root-cas').create();
export default async function (req: any, res: any) {
  require('dotenv').config()
  const newData = req.body;
  const data = await parseJobs();

  if (data.length <= 0) {
    let fileData = [];
    fileData.push(newData);
    putandsendmail(fileData, newData);
    res.status(200).end();
  } else {
    for (let i = 0; i < data.length; i++) {
      if (data[i].email === newData.email) {
        res.status(999).end();
        return false;
      }
    }

    data.push(newData);
    putandsendmail(data, newData);
    res.status(200).end();
  }
}

function putandsendmail(data: any, req: any) {
  console.log(req, "+++++++++");
  fs.writeFileSync(dirPath, JSON.stringify(data, null, 2));
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
    subject: `Message From ${req.name}`,
    text: req.message + " | Sent from: " + req.email,
    html: `<div>${req.phone}</div><p>Sent from:
        ${req.email}</p>`
  }
  transporter.sendMail(mailData, function (err: any, info: any) {
    if (err)
      console.log(err)
    else
      console.log(info)
  })
}
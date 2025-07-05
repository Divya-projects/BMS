const nodemailer = require('nodemailer')
const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config()

const { SENDGRID_API_KEY }= process.env
function replaceContent(content, creds){
    //customize the content(name & otp) for each mail
    console.log('from replace mail content func', creds)
    let allKeysArr = Object.keys(creds)
    allKeysArr.forEach(function (key) {
        console.log('keyssss', key, creds[key])
        content = content.replace(`#{${key}}`, creds[key])
    })
    return content
}

async function EmailHelper(templateName, receiverEmail, creds){
    try{
    //take the path of the file where actual email content exists, & read them to fetch content
    const templatePath = path.join(__dirname, "email_templates", templateName)
    const content = await fs.promises.readFile(templatePath, "utf-8")

    // configure the email details
    const emailDetails = {
        to : receiverEmail,
        from : "divya.p0895@gmail.com",
        subject : "Mail from SCaler shows",
        text : `Hi ${creds.name}, this is your reset otp ${creds.otp}`,
        html : replaceContent(content, creds)
    }

    const transportDetails = {
        host: "smtp.sendgrid.net",
        port: 587,
        auth: {
            user: "apikey",
            pass: SENDGRID_API_KEY,
        },
    }

    //sending mails
    const transporter = nodemailer.createTransport(transportDetails)
    await transporter.sendMail(emailDetails)
} catch(e){
    console.log(e)
}
}

module.exports = EmailHelper

//how to send emails containing OTPs to recipients.

var nodemailer = require('nodemailer');     //library used for sending emails in Node.js applications.
var otpgenerator=require('otp-generator');  //lib to generate otp in node.js
require('dotenv').config();


// Creating a transporter for sending emails using Gmail service
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ishitachd@gmail.com',
        pass: 'vfqvllzqjaupxopf'
    },
    tls: { rejectUnauthorized: false }  //tls protocol
});


function sendTestEmail(to, text, html) {
    //define email
    var mailOptions = {
        from: 'Ishita <ishitachd@gmail.com>',
        to: to || 'anushka2187.be21@chitkara.edu.in',
        subject: 'NodeMailer Twitter',
        text: text || 'Email from Ishita',
        html: html || '<h1>Email from Ishita</h1>'

    };
    // send email
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log('Error: ', error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
// Generating a 4-digit OTP
var otp=otpgenerator.generate(4);
// Calling sendTestEmail function to send the OTP
function sendOTp(to, otp) {    
    sendTestEmail(to,"here is Otp "+otp);
    return otp;
}

// Call the function with desired parameters
// var a=20;
// while(a-->0){
    // sendTestEmail();
    // Calling the sendOTp function to send OTP to a specified email address
    sendOTp('ishita2166.be21@chitkara.edu.in',otp);
// }

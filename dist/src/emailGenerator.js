"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailGenerator = void 0;
const nodemailer_1 = require("nodemailer");
const emailGenerator = (email, otp) => {
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: 'boldbotofficial@gmail.com',
            pass: 'Vktw4519!',
        },
    });
    const mailOptions = {
        from: 'youremail@gmail.com',
        to: email,
        subject: 'OTP',
        text: `OTP LELE BUDHIRAJE ${otp}`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
};
exports.emailGenerator = emailGenerator;
//# sourceMappingURL=emailGenerator.js.map
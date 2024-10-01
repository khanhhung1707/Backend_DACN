import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); 


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
    }
});

// Hàm để gửi email
export const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER, // Địa chỉ email người gửi
        to: to,                       // Địa chỉ email người nhận
        subject: subject,             // Tiêu đề email
        text: text                    // Nội dung email
    };

    return transporter.sendMail(mailOptions);
};

import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();


export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, 
  port: process.env.EMAIL_PORT, 
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, 
  },
});


export const sender = {
  email: process.env.SENDER_EMAIL,
  name: process.env.SENDER_NAME,
};

export const adminEmail = process.env.ADMIN_EMAIL;

transporter.verify(function (error, success) {
  if (error) {
    console.error("Error connecting to email server:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});


import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
  CONTACT_US_EMAIL_TEMPLATE,
  CONTACT_US_EMAIL_TEMPLATE_COPY_TO_USER,
} from "./emailTemplates.js";

import { transporter, sender, adminEmail } from "./nodemailer.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const response = await transporter.sendMail({
      from: sender,
      to: email,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.error(`Error sending verification`, error);

    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  try {
    const response = await transporter.sendMail({
      from: sender,
      to: email,
      subject: "User created Successful",
      html: WELCOME_EMAIL_TEMPLATE.replace("{userName}", name),
      category: "User created",
    });

    console.log("Welcome email sent successfully", response);
  } catch (error) {
    console.error(`Error sending welcome email`, error);

    throw new Error(`Error sending welcome email: ${error}`);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const response = await transporter.sendMail({
      from: sender,
      to: email,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });
  } catch (error) {
    console.error(`Error sending password reset email`, error);

    throw new Error(`Error sending password reset email: ${error}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  try {
    const response = await transporter.sendMail({
      from: sender,
      to: email,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    });

    console.log("Password reset email sent successfully", response);
  } catch (error) {
    console.error(`Error sending password reset success email`, error);

    throw new Error(`Error sending password reset success email: ${error}`);
  }
};


export const contactUsEmail = async (email, name, query) => {
  try {
    const response = await transporter.sendMail({
      from: email, // Who sent it
      to: adminEmail,
      subject: `Query Mail by ${name}`,
      html: CONTACT_US_EMAIL_TEMPLATE.replace("{userName}", name)
        .replace("{userEmail}", email)
        .replace("{userMessage}", query),

      category: "Contact by user",
    });

    console.log("Query sent successfully", response);
  } catch (error) {
    console.error(`Error sending query`, error);
    throw new Error(`Error sending query: ${error}`);
  }
};

export const sendCopyOfContactUsEmailToUser = async (email, name, query) => {
  try {
    const response = await transporter.sendMail({
      from: sender, // Who sent it
      to: email,
      subject: `Query Mail by ${name} (Copy)`,
      html: CONTACT_US_EMAIL_TEMPLATE_COPY_TO_USER.replaceAll("{userName}", name)
        .replace("{userEmail}", email)
        .replace("{userMessage}", query),
      category: "Contact by user Copy to user",
    });

    console.log("Query sent successfully", response);
  } catch (error) {
    console.error(`Error sending query`, error);
    throw new Error(`Error sending query: ${error}`);
  }
};

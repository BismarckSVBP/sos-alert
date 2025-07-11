

// export const VERIFICATION_EMAIL_TEMPLATE = `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Verify Your Email</title>
// </head>
// <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
//   <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
//     <h1 style="color: white; margin: 0;">Verify Your Email</h1>
//   </div>
//   <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
//     <p>Hello,</p>
//     <p>Thank you for signing up! Your verification code is:</p>
//     <div style="text-align: center; margin: 30px 0;">
//       <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4CAF50;">{verificationCode}</span>
//     </div>
//     <p>Enter this code on the verification page to complete your registration.</p>
//     <p>This code will expire in 15 minutes for security reasons.</p>
//     <p>If you didn't create an account with us, please ignore this email.</p>
//     <p>Best regards,<br>Your App Team</p>
//   </div>
//   <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
//     <p>This is an automated message, please do not reply to this email.</p>
//   </div>
// </body>
// </html>
// `;

// export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Password Reset Successful</title>
// </head>
// <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
//   <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
//     <h1 style="color: white; margin: 0;">Password Reset Successful</h1>
//   </div>
//   <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
//     <p>Hello,</p>
//     <p>We're writing to confirm that your password has been successfully reset.</p>
//     <div style="text-align: center; margin: 30px 0;">
//       <div style="background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
//         ✓
//       </div>
//     </div>
//     <p>If you did not initiate this password reset, please contact our support team immediately.</p>
//     <p>For security reasons, we recommend that you:</p>
//     <ul>
//       <li>Use a strong, unique password</li>
//       <li>Enable two-factor authentication if available</li>
//       <li>Avoid using the same password across multiple sites</li>
//     </ul>
//     <p>Thank you for helping us keep your account secure.</p>
//     <p>Best regards,<br>Your App Team</p>
//   </div>
//   <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
//     <p>This is an automated message, please do not reply to this email.</p>
//   </div>
// </body>
// </html>
// `;

// export const PASSWORD_RESET_REQUEST_TEMPLATE = `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Reset Your Password</title>
// </head>
// <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
//   <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
//     <h1 style="color: white; margin: 0;">Password Reset</h1>
//   </div>
//   <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
//     <p>Hello,</p>
//     <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
//     <p>To reset your password, click the button below:</p>
//     <div style="text-align: center; margin: 30px 0;">
//       <a href="{resetURL}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
//     </div>
//     <p>This link will expire in 1 hour for security reasons.</p>
//     <p>Best regards,<br>Your App Team</p>
//   </div>
//   <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
//     <p>This is an automated message, please do not reply to this email.</p>
//   </div>
// </body>
// </html>
// `;

// export const WELCOME_EMAIL_TEMPLATE = `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Welcome to Abhay's Site!</title>
// </head>
// <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
//   <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
//     <h1 style="color: white; margin: 0;">Welcome to Your App!</h1>
//   </div>
//   <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
//     <p>Hello {userName},</p>
//     <p>We're excited to have you on board! 🎉</p>
//     <div style="text-align: center; margin: 30px 0;">
//       <div style="background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
//         👋
//       </div>
//     </div>
//     <p>Here are a few things you can do to get started:</p>
//     <ul>
//       <li>Explore your dashboard</li>
//       <li>Customize your profile</li>
//       <li>Discover new features</li>
//     </ul>
//     <p>If you have any questions, feel free to reach out to our support team anytime.</p>
//     <p>Thank you for joining us. We're glad you're here!</p>
//     <p>Best regards,<br>Abhay's Team</p>
//   </div>
//   <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
//     <p>This is an automated message, please do not reply to this email.</p>
//   </div>
// </body>
// </html>
// `;


// export const CONTACT_US_EMAIL_TEMPLATE = `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Contact Us Message</title>
//   <style>
//     body {
//       margin: 0;
//       padding: 0;
//       font-family: 'Arial', sans-serif;
//       background-color: #f4f4f4;
//       color: #333333;
//     }
//     .container {
//       max-width: 600px;
//       margin: 30px auto;
//       background-color: #ffffff;
//       border-radius: 8px;
//       overflow: hidden;
//       box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//     }
//     .header {
//       background: linear-gradient(to right, #2196F3, #0b7dda);
//       color: #ffffff;
//       padding: 30px 20px;
//       text-align: center;
//     }
//     .header h1 {
//       margin: 0;
//       font-size: 24px;
//     }
//     .content {
//       padding: 20px;
//     }
//     .content p {
//       margin: 0 0 15px;
//     }
//     .details {
//       margin: 20px 0;
//     }
//     .details h3 {
//       margin-bottom: 10px;
//       color: #0b7dda;
//       font-size: 18px;
//     }
//     .details ul {
//       list-style: none;
//       padding: 0;
//       margin: 0;
//     }
//     .details li {
//       margin-bottom: 8px;
//       font-size: 14px;
//     }
//     .message-box {
//       background-color: #fafafa;
//       padding: 15px;
//       border: 1px solid #e0e0e0;
//       border-radius: 5px;
//       font-size: 14px;
//       color: #555555;
//       white-space: pre-wrap;
//     }
//     .footer {
//       text-align: center;
//       padding: 15px 20px;
//       font-size: 12px;
//       color: #999999;
//       background-color: #f9f9f9;
//     }
//     .signature {
//       margin-top: 30px;
//       font-size: 14px;
//     }
//     @media (max-width: 600px) {
//       .header h1 {
//         font-size: 20px;
//       }
//       .content, .footer {
//         padding: 15px;
//       }
//       .details h3 {
//         font-size: 16px;
//       }
//     }
//   </style>
// </head>
// <body>
//   <div class="container">
//     <div class="header">
//       <h1>New Contact Us Message</h1>
//     </div>
//     <div class="content">
//       <p>Hello Admin,</p>
//       <p>You have received a new message from the contact form:</p>

//       <div class="details">
//         <h3>Sender Details</h3>
//         <ul>
//           <li><strong>Name:</strong> {userName}</li>
//           <li><strong>Email:</strong> {userEmail}</li>
//         </ul>
//       </div>

//       <div class="details">
//         <h3>Message</h3>
//         <div class="message-box">
//           {userMessage}
//         </div>
//       </div>

//       <p class="signature">
//         Please get back to the user as soon as possible.<br><br>
//         Best regards,<br>
//         Abhay's Team
//       </p>
//     </div>
//     <div class="footer">
//       <p>This is an Query asked by your website's user. Please reply to the user on their email.</p>
//     </div>
//   </div>
// </body>
// </html>
// `;
// export const CONTACT_US_EMAIL_TEMPLATE_COPY_TO_USER = `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>We Have Received Your Message</title>
//   <style>
//     body {
//       margin: 0;
//       padding: 0;
//       font-family: 'Arial', sans-serif;
//       background-color: #f4f4f4;
//       color: #333333;
//     }
//     .container {
//       max-width: 600px;
//       margin: 30px auto;
//       background-color: #ffffff;
//       border-radius: 8px;
//       overflow: hidden;
//       box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//     }
//     .header {
//       background: linear-gradient(to right, #2196F3, #0b7dda);
//       color: #ffffff;
//       padding: 30px 20px;
//       text-align: center;
//     }
//     .header h1 {
//       margin: 0;
//       font-size: 24px;
//     }
//     .content {
//       padding: 20px;
//     }
//     .content p {
//       margin: 0 0 15px;
//       font-size: 14px;
//       line-height: 1.6;
//     }
//     .details {
//       margin: 20px 0;
//     }
//     .details h3 {
//       margin-bottom: 10px;
//       color: #0b7dda;
//       font-size: 18px;
//     }
//     .details ul {
//       list-style: none;
//       padding: 0;
//       margin: 0;
//     }
//     .details li {
//       margin-bottom: 8px;
//       font-size: 14px;
//     }
//     .message-box {
//       background-color: #fafafa;
//       padding: 15px;
//       border: 1px solid #e0e0e0;
//       border-radius: 5px;
//       font-size: 14px;
//       color: #555555;
//       white-space: pre-wrap;
//     }
//     .signature {
//       margin-top: 30px;
//       font-size: 14px;
//     }
//     .footer {
//       text-align: center;
//       padding: 15px 20px;
//       font-size: 12px;
//       color: #999999;
//       background-color: #f9f9f9;
//     }
//     @media (max-width: 600px) {
//       .header h1 {
//         font-size: 20px;
//       }
//       .content, .footer {
//         padding: 15px;
//       }
//       .details h3 {
//         font-size: 16px;
//       }
//     }
//   </style>
// </head>
// <body>
//   <div class="container">
//     <div class="header">
//       <h1>We've Received Your Message</h1>
//     </div>
//     <div class="content">
//       <p>Hello <strong>{userName}</strong>,</p>

//       <p>Thank you for reaching out to us! We have successfully received your query and our team will review it shortly.</p>

//       <p>We appreciate your patience and will get back to you as soon as possible.</p>

//       <div class="details">
//         <h3>Your Contact Details</h3>
//         <ul>
//           <li><strong>Name:</strong> {userName}</li>
//           <li><strong>Email:</strong> {userEmail}</li>
//         </ul>
//       </div>

//       <div class="details">
//         <h3>Your Message</h3>
//         <div class="message-box">
//           {userMessage}
//         </div>
//       </div>

//       <p class="signature">
//         Best regards,<br>
//         Abhay's Team
//       </p>
//     </div>
//     <div class="footer">
//       <p>This is an automated confirmation email. You will receive a response from our team shortly.</p>
//     </div>
//   </div>
// </body>
// </html>
// `;
// // emailTemplates.js

// export const LOCATION_SHARING_EMAIL_TEMPLATE = `
//   <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
//     <h2 style="color: #d32f2f;">🚨 SOS Location Sharing</h2>
//     <p>Hello,</p>
//     <p>This is an emergency SOS alert. The sender has shared their live location with you.</p>
//     <p>Please click the link below to view the location:</p>
//     <p>
//       <a href="{link}" target="_blank" style="display: inline-block; background-color: #1976d2; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
//         View Live Location
//       </a>
//     </p>
//     <p>If you believe this message was sent in error, please ignore it.</p>
//     <hr />
//     <small style="color: #888;">This message was sent automatically by the SOS Location Sharing System.</small>
//   </div>
// `;
export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Verification</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f1f1f1; padding: 20px;">
  <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
    <div style="background-color: #d32f2f; padding: 20px; color: white; text-align: center;">
      <h2 style="margin: 0;">SOS-Alert Email Verification</h2>
    </div>
    <div style="padding: 20px;">
      <p>Hello,</p>
      <p>Thank you for registering with <strong>SOS-Alert</strong>! Use the code below to verify your email:</p>
      <div style="text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #d32f2f; margin: 30px 0;">
        {verificationCode}
      </div>
      <p>This code is valid for 15 minutes. Please do not share it.</p>
      <p>If you didn't initiate this, you can ignore this message.</p>
      <p>Best regards,<br />The SOS-Alert Team</p>
    </div>
    <div style="text-align: center; background-color: #fafafa; padding: 10px; color: #999; font-size: 12px;">
      This is an automated message. Please do not reply.
    </div>
  </div>
</body>
</html>
`;
export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Password Reset Request</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f1f1f1; padding: 20px;">
  <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
    <div style="background-color: #d32f2f; padding: 20px; text-align: center; color: white;">
      <h2 style="margin: 0;">Reset Your SOS-Alert Password</h2>
    </div>
    <div style="padding: 20px;">
      <p>Hello,</p>
      <p>We received a request to reset your SOS-Alert password. Click the button below to proceed:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="{resetURL}" style="background-color: #d32f2f; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
      </div>
      <p>This link is valid for 1 hour.</p>
      <p>If you didn't request a password reset, just ignore this email.</p>
      <p>Best regards,<br />The SOS-Alert Team</p>
    </div>
    <div style="text-align: center; background-color: #fafafa; padding: 10px; color: #999; font-size: 12px;">
      This is an automated message. Please do not reply.
    </div>
  </div>
</body>
</html>
`;
export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Password Reset Success</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f1f1f1; padding: 20px;">
  <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
    <div style="background-color: #388e3c; padding: 20px; text-align: center; color: white;">
      <h2 style="margin: 0;">Your SOS-Alert Password Has Been Reset</h2>
    </div>
    <div style="padding: 20px;">
      <p>Hello,</p>
      <p>We're confirming that your SOS-Alert password has been successfully reset.</p>
      <div style="text-align: center; margin: 30px;">
        <div style="background-color: #388e3c; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">✓</div>
      </div>
      <p>If this wasn't you, please contact our support team immediately.</p>
      <p>Security Tips:</p>
      <ul>
        <li>Use strong and unique passwords</li>
        <li>Enable two-factor authentication</li>
        <li>Avoid using the same password on multiple platforms</li>
      </ul>
      <p>Stay safe,<br />The SOS-Alert Team</p>
    </div>
    <div style="text-align: center; background-color: #fafafa; padding: 10px; color: #999; font-size: 12px;">
      This is an automated message. Please do not reply.
    </div>
  </div>
</body>
</html>
`;
export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to SOS-Alert</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f1f1f1; padding: 20px;">
  <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
    <div style="background-color: #1976d2; padding: 20px; color: white; text-align: center;">
      <h2 style="margin: 0;">Welcome to SOS-Alert, {userName}!</h2>
    </div>
    <div style="padding: 20px;">
      <p>We're thrilled to have you join SOS-Alert 🚨</p>
      <p>Get started by:</p>
      <ul>
        <li>Exploring your dashboard</li>
        <li>Setting up emergency contacts</li>
        <li>Trying our real-time SOS features</li>
      </ul>
      <p>If you need help, our support team is here for you.</p>
      <p>Warm regards,<br />The SOS-Alert Team</p>
    </div>
    <div style="text-align: center; background-color: #fafafa; padding: 10px; color: #999; font-size: 12px;">
      This is an automated message. Please do not reply.
    </div>
  </div>
</body>
</html>
`;
export const CONTACT_US_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Contact Message</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f1f1f1; padding: 20px;">
  <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
    <div style="background-color: #1976d2; padding: 20px; text-align: center; color: white;">
      <h2 style="margin: 0;">SOS-Alert - New Contact Request</h2>
    </div>
    <div style="padding: 20px;">
      <p><strong>Sender Name:</strong> {userName}</p>
      <p><strong>Sender Email:</strong> {userEmail}</p>
      <p><strong>Message:</strong></p>
      <div style="background-color: #fafafa; padding: 15px; border: 1px solid #ddd; border-radius: 5px; white-space: pre-wrap;">
        {userMessage}
      </div>
      <p>Please respond to this query as soon as possible.</p>
      <p>Regards,<br />SOS-Alert System</p>
    </div>
    <div style="text-align: center; background-color: #fafafa; padding: 10px; color: #888; font-size: 12px;">
      This message was submitted from the SOS-Alert app.
    </div>
  </div>
</body>
</html>
`;
export const CONTACT_US_EMAIL_TEMPLATE_COPY_TO_USER = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>We Received Your Message</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f1f1f1; padding: 20px;">
  <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
    <div style="background-color: #1976d2; padding: 20px; color: white; text-align: center;">
      <h2 style="margin: 0;">Your Message Has Been Received</h2>
    </div>
    <div style="padding: 20px;">
      <p>Hello <strong>{userName}</strong>,</p>
      <p>Thank you for contacting SOS-Alert. We’ve received your message and will get back to you shortly.</p>
      <div style="margin: 20px 0;">
        <p><strong>Your Details:</strong></p>
        <ul>
          <li>Name: {userName}</li>
          <li>Email: {userEmail}</li>
        </ul>
      </div>
      <div>
        <p><strong>Your Message:</strong></p>
        <div style="background-color: #fafafa; padding: 15px; border: 1px solid #ddd; border-radius: 5px; white-space: pre-wrap;">
          {userMessage}
        </div>
      </div>
      <p>Best regards,<br />The SOS-Alert Team</p>
    </div>
    <div style="text-align: center; background-color: #fafafa; padding: 10px; color: #888; font-size: 12px;">
      This is an automated message. You will receive a response soon.
    </div>
  </div>
</body>
</html>
`;
export const LOCATION_SHARING_EMAIL_TEMPLATE = `
<div style="font-family: Arial, sans-serif; background-color: #fff3f3; padding: 20px; border-radius: 10px;">
  <h2 style="color: #d32f2f;">🚨 SOS-Alert - Live Emergency Alert</h2>
  <p>Hello,</p>
  <p>This is an emergency notification from <strong>SOS-Alert</strong>. The sender has initiated an SOS and shared the following with you:</p>

  <ul style="margin: 20px 0; padding-left: 20px;">
    <li><strong>Live Location:</strong> Real-time tracking of the sender’s current position</li>
    <li><strong>Live Media Stream:</strong> Live video/audio feed from the sender's device</li>
  </ul>

  <div style="text-align: center; margin: 30px 0;">
    <a href="{locationLink}" target="_blank" style="display: inline-block; background-color: #d32f2f; color: white; padding: 12px 20px; margin: 10px 5px; text-decoration: none; border-radius: 5px; font-weight: bold;">
      View Live Location
    </a>
    <a href="{mediaLink}" target="_blank" style="display: inline-block; background-color: #1976d2; color: white; padding: 12px 20px; margin: 10px 5px; text-decoration: none; border-radius: 5px; font-weight: bold;">
      Watch Live Media
    </a>
  </div>

  <p>If you believe this message was sent in error, you can safely ignore it.</p>
  <hr />
  <small style="color: #888;">This is an automated emergency alert from SOS-Alert. Please do not reply.</small>
</div>
`;

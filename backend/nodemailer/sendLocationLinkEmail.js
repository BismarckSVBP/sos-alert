
import { transporter, sender } from "./nodemailer.config.js";
import { LOCATION_SHARING_EMAIL_TEMPLATE } from "./emailTemplates.js";

export const sendLocationLinkEmail = async (email, link) => {
  try {
    const response = await transporter.sendMail({
      from: sender,
      to: email,
      subject: "📍 SOS Location Shared with You",
      html: LOCATION_SHARING_EMAIL_TEMPLATE.replace("{link}", link),
      category: "Location Sharing email",
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.error("Error sending Location Sharing email:", error);
    throw new Error(`Error sending Location Sharing email: ${error.message}`);
  }
};

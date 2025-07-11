import { v4 as uuidv4 } from "uuid";
import Session from "../models/Session.js";
import { sendLocationLinkEmail } from "../nodemailer/sendLocationLinkEmail.js";

export const startSharingEmailSender = async (req, res) => {
  try {
    const { emails } = req.body;

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return res.status(400).json({ error: "No emails provided" });
    }

    const sessionId = uuidv4();
    const link = `${process.env.SOS_LINK}/receiver-end/${sessionId}`;

    await Session.create({ sessionId });

    for (const email of emails) {
      await sendLocationLinkEmail(email, link);
    }

    res.status(200).json({ sessionId });
  } catch (error) {
    console.error("Error:", errEmailSenderor);
    res.status(500).json({ error: "Failed to start media sharing session" });
  }
};

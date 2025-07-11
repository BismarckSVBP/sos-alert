import express from "express";
import { startSharingEmailSender } from "../controllers/startSharingEmailSender.js";

const router = express.Router();

router.post("/sharing-email", startSharingEmailSender);

export default router;

import express from "express";
import {
  login,
  logout,
  signup,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
  resendVerificationCode,
  contactUs,
} from "../controllers/auth.controller.js";

import { verifyToken } from "../middleware/verifyToken.js";
import { registerSosDetails } from "../controllers/registerSosDetails.js";
import { upload, uploadImage } from "../controllers/cloudinary.js";
import { getAllSosDetails } from "../controllers/allSosDetails.Controller.js";
import { updateSosDetails } from "../controllers/registerSosDetails.js"; // Import the update function
import { getSosDetails } from "../controllers/registerSosDetails.js"; // Import the getSosDetails function
const router = express.Router();

// Auth routes
router.get("/check-auth", verifyToken, checkAuth);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/resend-otp", resendVerificationCode);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/contact-us", contactUs);

// Student registration
router.post("/SosDetailssubmit", registerSosDetails);
router.get("/getSosDetails", getSosDetails);
router.put('/update-sos-details', updateSosDetails);
// Image upload
router.post("/upload", upload.single("image"), uploadImage);

router.get("/allSosDetails", getAllSosDetails);

export default router;

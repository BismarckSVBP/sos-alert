





import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import http from "http";

import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import sharingEmail from "./routes/sharingEmail.route.js";
import initSocket from "./socket/socket.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// CORS
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// ✅ Create HTTP server for socket.io
const server = http.createServer(app);

// ✅ Initialize Socket.IO and bind to server
const io = initSocket(server);

// ✅ Attach socket instance to req BEFORE ROUTES
app.use((req, res, next) => {
  req.io = io;
  next();
});

// ✅ Now register routes
app.use("/api/auth", authRoutes);

app.use("/api/email/", sharingEmail);
// ✅ Serve frontend if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// ✅ Start Server + DB
server.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server running at  ${process.env.CLIENT_URL}`);
});

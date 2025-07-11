import dotenv from "dotenv";
import { Server } from "socket.io";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import Stream from "../models/Stream.js";
import Location from "../models/Location.js";

dotenv.config();

const viewerSockets = {}; // { sessionId: Set<viewerSocketId> }
const senderSockets = {}; // { sessionId: senderSocketId }

export default function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("🔌 Client connected:", socket.id);

    // --- Room join for streaming ---
    socket.on("join-room", ({ sessionId, role }) => {
      socket.join(sessionId);

      if (role === "sender") {
        senderSockets[sessionId] = socket.id;
        viewerSockets[sessionId] = new Set();
        console.log(`🎥 Sender joined session ${sessionId}: ${socket.id}`);
      } else {
        viewerSockets[sessionId]?.add(socket.id);
        console.log(`👁️ Viewer joined session ${sessionId}: ${socket.id}`);
        const senderId = senderSockets[sessionId];
        if (senderId) {
          io.to(senderId).emit("new-viewer", { viewerId: socket.id });
        } else {
          socket.emit("error", {
            message: "No active sender for this session.",
          });
        }
      }
    });

    // --- WebRTC Signaling ---
    socket.on("offer", ({ sessionId, viewerId, offer }) => {
      io.to(viewerId).emit("offer", { offer, senderId: socket.id });
    });

    socket.on("answer", ({ sessionId, answer, viewerId }) => {
      const senderId = senderSockets[sessionId];
      if (senderId) {
        io.to(senderId).emit("answer", { answer, viewerId });
      }
    });

    socket.on("candidate", ({ sessionId, candidate, targetId }) => {
      if (targetId) {
        io.to(targetId).emit("candidate", { candidate, senderId: socket.id });
      }
    });

    // --- End Call and Cleanup ---
    socket.on("end-call", ({ sessionId }) => {
      io.to(sessionId).emit("end-call");
      socket.leave(sessionId);
      delete senderSockets[sessionId];
      delete viewerSockets[sessionId];
      console.log(`📴 Stream ended for session ${sessionId}`);
    });

    // --- Media Upload ---
    socket.on("media-blob", async ({ sessionId, blob }) => {
      try {
        const result = await uploadToCloudinary(blob, sessionId);
        await Stream.create({ sessionId, blobUrl: result.secure_url });
        console.log("✅ Media uploaded:", result.secure_url);
      } catch (err) {
        console.error("❌ Media upload failed:", err.message);
      }
    });

    // --- Location Sharing ---
    socket.on("join-location", (sessionId) => {
      socket.join(sessionId);
    });

    socket.on(
      "send-location",
      async ({ sessionId, latitude, longitude, timestamp }) => {
        try {
          const location = await Location.create({
            sessionId,
            latitude,
            longitude,
            timestamp: timestamp ? new Date(timestamp) : new Date(),
          });

          io.to(sessionId).emit("receive-location", {
            latitude: location.latitude,
            longitude: location.longitude,
            timestamp: location.timestamp,
          });
        } catch (err) {
          console.error("📍 Location saving error:", err.message);
        }
      }
    );

    socket.on("stop-location", ({ sessionId }) => {
      io.to(sessionId).emit("location-paused");
      console.log(`⏸️ Location paused for session ${sessionId}`);
    });

    socket.on("resume-location", ({ sessionId }) => {
      io.to(sessionId).emit("location-resumed");
      console.log(`▶️ Location resumed for session ${sessionId}`);
    });

    socket.on("terminate-location", ({ sessionId }) => {
      io.to(sessionId).emit("location-terminated");
      socket.leave(sessionId);
      console.log(`🛑 Location terminated for session ${sessionId}`);
    });

    // --- Cleanup on Disconnect ---
    socket.on("disconnect", () => {
      console.log("❌ Disconnected:", socket.id);

      for (const [sessionId, viewers] of Object.entries(viewerSockets)) {
        if (viewers.has(socket.id)) {
          viewers.delete(socket.id);
          if (viewers.size === 0) delete viewerSockets[sessionId];
        }
      }

      for (const [sessionId, senderId] of Object.entries(senderSockets)) {
        if (senderId === socket.id) {
          delete senderSockets[sessionId];
          io.to(sessionId).emit("sender-disconnected");
          console.log(`🚫 Sender disconnected for session ${sessionId}`);
        }
      }
    });
  });

  return io;
}

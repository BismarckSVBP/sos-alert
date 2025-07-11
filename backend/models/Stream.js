// backend/models/Stream.js
import mongoose from "mongoose";

const streamSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  blobUrl: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Stream", streamSchema);

// models/Location.js
import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  latitude: Number,
  longitude: Number,
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Location", locationSchema);

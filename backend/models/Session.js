import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  sessionId: { type: String, unique: true },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Session", sessionSchema);

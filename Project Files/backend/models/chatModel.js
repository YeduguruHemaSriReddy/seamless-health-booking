const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    room:   { type: String, required: true }, // doctorId or custom room name
    sender: { type: String, required: true }, // email / name
    text:   { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);


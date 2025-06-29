const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    userId:      { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    /* ✅ Canonical field names */
    fullName:    { type: String,  required: true },
    phone:       { type: String,  required: true },
    email:       { type: String,  required: true, unique: true },
    address:     { type: String,  required: true },
    department:  { type: String,  required: true },

    availableSlots: [String],              // e.g. ["09:00", "11:00"]
    experience:    { type: Number, required: true },
    fees:          { type: Number, required: true },

    status:        { type: String, enum: ["pending", "approved"], default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);


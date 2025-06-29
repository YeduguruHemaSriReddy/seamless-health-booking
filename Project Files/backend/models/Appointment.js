const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    default: "Pending"
  }
}, { timestamps: true });

// ✅ Prevent OverwriteModelError
const Appointment = mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;

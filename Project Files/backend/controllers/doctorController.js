const Doctor = require("../models/Doctor");

// Apply as a doctor
async function apply(req, res) {
  try {
    const {
      fullName,
      phone,
      email,
      address,
      department,
      slots,          // "09:00, 11:00"
      experience,
      fees,
    } = req.body;

    if (
      !fullName ||
      !phone ||
      !email ||
      !address ||
      !department ||
      !slots ||
      !experience ||
      !fees
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const slotArr = slots.split(",").map(s => s.trim());
    const userId = req.user?.userId || req.user?._id;
if (!userId) return res.status(401).json({ message: "Unauthorized" });


   const newDoc = await Doctor.create({
  userId,               // ✅ MUST set userId
  fullName,
  phone,
  email,
  address,
  department,
  availableSlots: slotArr,
  experience,
  fees,
  status: "pending",
});


    return res.status(201).json({
      message: "Application submitted",
      doctorId: newDoc._id,
    });
  } catch (err) {
    console.error("❌ applyDoctor error:", err);
    return res.status(500).json({ message: err.message });
  }
}

// Approve a pending doctor
async function approveDoctor(req, res) {
  try {
    const doc = await Doctor.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    if (!doc) return res.status(404).json({ message: "Doctor not found" });
    res.json({ message: "Doctor approved", doctor: doc });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get all approved doctors
async function getApprovedDoctors(req, res) {
  try {
    const docs = await Doctor.find({ status: "approved" });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get all pending doctors
async function getPendingDoctors(req, res) {
  try {
    const docs = await Doctor.find({ status: "pending" });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  apply,
  getApprovedDoctors,
  getPendingDoctors,
  approveDoctor,
};

/* ──────────────────────────────────────────────────────────
   backend/routes/adminRoutes.js
   Prefix in server.js → /api/admin
─────────────────────────────────────────────────────────── */
const express = require("express");
const router = express.Router();

const auth = require("../middlewares/authMiddleware");
const Appointment = require("../models/Appointment");

/* ===== ADMIN CONTROLLERS ===== */
const {
  // User-side
  getAllUsersControllers,
  deleteUserController,

  // Doctor-side
  getAllDoctorsControllers,
  getStatusApproveController,
  getStatusRejectController,
  addDoctor,
  deleteDoctor,

  // Appointment-side
  displayAllAppointmentController,
  getAllAppointments, // we override this below to add population
  changeStatus,
} = require("../controllers/adminController");

/* ===== SHARED DOCTOR CONTROLLERS ===== */
const {
  approveDoctor,
  getApprovedDoctors,
  getPendingDoctors,
} = require("../controllers/doctorController");

/* ────────── USER MANAGEMENT ────────── */
router.get("/users", auth, getAllUsersControllers);
router.delete("/users/:id", auth, deleteUserController);

// Legacy aliases
router.get("/getallusers", auth, getAllUsersControllers);
router.delete("/delete-user/:id", auth, deleteUserController);

/* ────────── DOCTOR MANAGEMENT ────────── */
router.get("/doctors", auth, getAllDoctorsControllers);
router.post("/doctors", auth, addDoctor);
router.delete("/doctors/:id", auth, deleteDoctor);

router.post("/approve-doctor/:id", auth, approveDoctor);
router.get("/approved-doctors", auth, getApprovedDoctors);
router.get("/pending-doctors", auth, getPendingDoctors);

// Legacy doctor status routes (used in older UI)
router.post("/doctors/approved", auth, getStatusApproveController);
router.post("/doctors/rejected", auth, getStatusRejectController);

/* ────────── APPOINTMENT MANAGEMENT ────────── */

// ✅ Updated to include doctor/patient name via .populate()
router.get("/appointments", auth, async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("doctor", "name")
      .populate("patient", "name");
    res.json(appointments);
  } catch (err) {
    console.error("❌ Failed to fetch appointments:", err);
    res.status(500).json({ message: "Error fetching appointments" });
  }
});

// Legacy list
router.get("/appointments/all", auth, displayAllAppointmentController);

// Change status
router.patch("/appointments/:id", auth, changeStatus);

// Delete appointment
router.delete("/appointments/:id", auth, async (req, res) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Appointment not found" });
    res.json({ message: "Appointment deleted" });
  } catch (err) {
    console.error("❌ Delete appointment error:", err);
    res.status(500).json({ message: "Failed to delete appointment" });
  }
});

module.exports = router;

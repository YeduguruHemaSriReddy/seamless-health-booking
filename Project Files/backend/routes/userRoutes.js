const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getDoctors,
  addDoctor,
  bookAppointmentController,
  getMyAppointments,
  checkDoctorStatus,
  getAvailableSlots, // ✅ Import this!
} = require("../controllers/userController");

const auth = require("../middlewares/authMiddleware");
const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");

/* ───────────────  PUBLIC ROUTES  ─────────────── */
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/doctors", getDoctors);
router.get("/available-slots/:doctorId/:date", getAvailableSlots); // ✅ Fixes your time slot issue

/* ───────────────  PROTECTED ROUTES  ─────────────── */
router.post("/add-doctor", auth, addDoctor);
router.post("/book-appointment", auth, bookAppointmentController);
router.get("/my-appointments", auth, getMyAppointments);
router.get("/check-doctor-status", auth, checkDoctorStatus);
const { apply } = require("../controllers/doctorController");
router.post("/apply-doctor", auth, apply);

/* ───────────────  TEST ONLY (optional)  ─────────────── */
router.get("/appointments/:userId", auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.params.userId });

    const result = await Promise.all(
      appointments.map(async (a) => ({
        _id: a._id,
        doctor: (await Doctor.findById(a.doctorId))?.name || "Unknown",
        date: a.date,
        time: a.time,
        status: a.status || "Pending",
      }))
    );

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch appointments", err });
  }
});

module.exports = router;

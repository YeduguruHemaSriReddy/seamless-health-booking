const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ─────────────── Register user ───────────────
async function registerUser(req, res) {
  try {
    const { name, email, password, phone, type } = req.body;

    if (await User.findOne({ email }))
      return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, phone, type });

    res.status(201).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Registration failed", err });
  }
}

// ─────────────── Login user ───────────────
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, name: user.name, type: user.type },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1d" }
    );

    res.json({
      token,
      type: user.type,
      user: { _id: user._id, name: user.name, email: user.email, type: user.type },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", err });
  }
}

// ─────────────── Apply as doctor ───────────────
async function addDoctor(req, res) {
  try {
    const {
      fullName,
      email,
      phone,
      address,
      specialization,
      experience,
      fees,
      timings,
    } = req.body.doctor;

    const userId = req.user.userId || req.user._id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const doc = await Doctor.create({
      userId,
      fullName,
      email,
      phone,
      address,
      department: specialization,
      experience,
      fees,
      availableSlots: timings,
      status: "pending",
    });

    res.status(201).json({ success: true, message: "Application submitted", doctor: doc });
  } catch (err) {
    res.status(500).json({ success: false, message: "Apply-doctor failed", err });
  }
}

// ─────────────── Get all approved doctors ───────────────
async function getDoctors(_, res) {
  try {
    const doctors = await Doctor.find({ status: "approved" });
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
}

// ─────────────── Book appointment ───────────────
const bookAppointmentController = async (req, res) => {
  try {
    const { userId, doctorId, date, time } = req.body;

    if (!userId || !doctorId || !date || !time) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Check if the slot is already booked
    const alreadyBooked = await Appointment.findOne({
      doctor: doctorId,
      date,
      time,
    });

    if (alreadyBooked) {
      return res.status(409).json({ success: false, message: "Slot already booked" });
    }

    // Create and save appointment
    const newAppointment = new Appointment({
      patient: userId,
      doctor: doctorId,
      date,
      time,
      status: "pending",
    });

    await newAppointment.save();

    res.status(200).json({ success: true, message: "Appointment booked successfully" });
  } catch (error) {
    console.error("❌ Booking failed:", error.message);
    res.status(500).json({ success: false, message: "Booking failed", error: error.message });
  }
};

// ─────────────── Get user's appointments ───────────────
async function getMyAppointments(req, res) {
  try {
    const userId = req.user.userId || req.user._id;
    const appts = await Appointment.find({ patient: userId });

    const details = await Promise.all(
      appts.map(async (a) => ({
        _id: a._id,
        doctor: (await Doctor.findById(a.doctor))?.fullName || "Unknown",
        date: a.date,
        time: a.time,
        status: a.status || "Pending",
      }))
    );

    res.json(details);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
}

// ─────────────── Get available slots ───────────────
async function getAvailableSlots(req, res) {
  try {
    const { doctorId, date } = req.params;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json([]);

    const taken = await Appointment.find({ doctor: doctorId, date }).select("time -_id");
    const bookedTimes = taken.map((b) => b.time);

    const free = doctor.availableSlots.filter((t) => !bookedTimes.includes(t));
    res.json(free); // example: ["09:00", "11:00"]
  } catch (err) {
    console.error("Slots error:", err);
    res.status(500).json([]);
  }
}

// ─────────────── Check if user is doctor or applied ───────────────
async function checkDoctorStatus(req, res) {
  try {
    const userId = req.user.userId || req.user._id;
    const doc = await Doctor.findOne({ userId });

    res.json({
      isDoctor: doc?.status === "approved",
      hasApplied: !!doc,
    });
  } catch (err) {
    res.status(500).json({ message: "Status check error", err });
  }
}

// ─────────────── Exports ───────────────
module.exports = {
  registerUser,
  loginUser,
  addDoctor,
  getDoctors,
  bookAppointmentController,
  getMyAppointments,
  getAvailableSlots,
  checkDoctorStatus,
};

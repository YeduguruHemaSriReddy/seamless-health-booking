const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');

const getAllUsersControllers = async (_, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

const deleteUserController = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch {
    res.status(500).json({ error: 'Delete user failed' });
  }
};

const getAllDoctorsControllers = async (_, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch {
    res.status(500).json({ error: 'Failed to fetch doctors' });
  }
};

const getStatusApproveController = async (req, res) => {
  try {
    await Appointment.findByIdAndUpdate(req.body.id, { status: 'Approved' });
    res.json({ message: 'Approved' });
  } catch {
    res.status(500).json({ error: 'Fail' });
  }
};

const getStatusRejectController = async (req, res) => {
  try {
    await Appointment.findByIdAndUpdate(req.body.id, { status: 'Rejected' });
    res.json({ message: 'Rejected' });
  } catch {
    res.status(500).json({ error: 'Fail' });
  }
};

const displayAllAppointmentController = async (_, res) => {
  try {
    const appts = await Appointment.find()
      .populate({ path: "userId",   select: "name email" })      // patient
      .populate({ path: "doctorId", select: "fullName email" });  // doctor

    res.json(appts);                      // frontend can read userId.name etc.
  } catch (err) {
    console.error("Admin appt list error:", err);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate({ path: 'doctorId', select: 'fullName name email' }) // name/fullName
      .populate({ path: 'userId', select: 'name email' }); // patient

    // Normalize for frontend: doctor → appointment.doctor.name
    const formatted = appointments.map((appt) => ({
      ...appt.toObject(),
      doctor: {
        name: appt.doctorId?.fullName || appt.doctorId?.name || 'N/A',
      },
      patient: {
        name: appt.userId?.name || 'N/A',
      },
    }));

    res.status(200).json(formatted);
  } catch (err) {
    console.error('❌ Failed to fetch appointments:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
const changeStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const appointment = await Appointment.findByIdAndUpdate(id, { status }, { new: true });

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json({ message: 'Status updated', appointment });
  } catch (error) {
    console.error('❌ Error updating appointment status:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

// GET  /api/admin/doctors
const getAllDoctors = async (_, res) => {
  try {
    const docs = await Doctor.find();
    res.json(docs);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch doctors' });
  }
};

// POST /api/admin/doctors
const addDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);   // {name, department, …}
    res.status(201).json(doctor);
  } catch (e) {
    res.status(500).json({ error: 'Failed to add doctor' });
  }
};

// DELETE /api/admin/doctors/:id
const deleteDoctor = async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Doctor deleted' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to delete doctor' });
  }
};

module.exports = {
  getAllUsersControllers,
  deleteUserController,
  getAllDoctorsControllers,
  getStatusApproveController,
  getStatusRejectController,
  displayAllAppointmentController,
  getAllAppointments,
  changeStatus,
  getAllDoctors, 
  addDoctor, 
  deleteDoctor,
};

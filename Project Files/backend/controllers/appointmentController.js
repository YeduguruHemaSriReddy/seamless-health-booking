const Appointment = require('../models/Appointment');
const Doctor      = require('../models/Doctor');

const getUserAppointments = async (req, res) => {
  try {
    const { userId } = req.params;

    // fetch appointments for this user
    const appts = await Appointment.find({ userId });

    // attach doctor names
    const full = await Promise.all(
      appts.map(async (apt) => {
        const doc = await Doctor.findById(apt.doctorId);
        return {
          _id: apt._id,
          doctorName: doc ? doc.name : 'Unknown',
          date: apt.date,
          time: apt.time,
          status: apt.status || 'Pending',
        };
      })
    );

    res.json(full);
  } catch (err) {
    console.error('Get appointments error:', err);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
};
const bookAppointment = async (req, res) => {
  try {
    const { doctorId, date } = req.body;

    const newAppointment = new Appointment({
      doctor: doctorId,         // must be ObjectId of a doctor (stored in Users or Doctor model)
      patient: req.user.id,     // authenticated user
      date,
    });

    await newAppointment.save();

    res.status(201).json({ message: 'Appointment booked', appointment: newAppointment });
  } catch (err) {
    console.error('❌ Booking error:', err);
    res.status(500).json({ message: 'Booking failed' });
  }
};

module.exports = { getUserAppointments };

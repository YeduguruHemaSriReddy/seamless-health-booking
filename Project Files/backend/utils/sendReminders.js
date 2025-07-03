const Appointment = require("../models/Appointment");
const User = require('../models/User'); // ✅ correct filename
const Doctor = require("../models/Doctor");
const sendEmail = require("./sendMail");

const sendReminders = async () => {
  try {
    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

    const appointments = await Appointment.find({
      date: now.toISOString().split('T')[0],
      reminderSent: false,
    });

    for (const appt of appointments) {
      const [hour, minute] = appt.time.split(":");
      const apptTime = new Date(appt.date);
      apptTime.setHours(+hour, +minute, 0);

      if (apptTime <= oneHourLater && apptTime > now) {
        const user = await User.findById(appt.userId);
        const doctor = await Doctor.findById(appt.doctorId);

        if (user?.email && doctor?.name) {
          await sendEmail({
            to: user.email,
            subject: "⏰ Appointment Reminder",
            text: `Hi ${user.name}, this is a reminder for your appointment with Dr. ${doctor.name} at ${appt.time} today.`,
          });

          appt.reminderSent = true;
          await appt.save();

          console.log(`✅ Reminder sent to ${user.email} for ${appt.time}`);
        }
      }
    }
  } catch (err) {
    console.error("❌ Reminder sending error:", err.message);
  }
};

module.exports = sendReminders;

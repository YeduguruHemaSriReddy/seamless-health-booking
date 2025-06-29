// src/pages/UserAppointments.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Userappointments.css';
import { useNavigate } from 'react-router-dom';

const Userappointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  useEffect(() => {
    if (!userData?._id) {
      alert("⚠️ Please log in.");
      navigate("/login");
      return;
    }

    axios
      .get(`http://localhost:5000/api/user/appointments/${userData._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error("Error loading appointments", err));
  }, [navigate, token, userData]);

  const handleCancel = async (id) => {
    const confirm = window.confirm("Are you sure you want to cancel this appointment?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/appointment/${id}`);
      setAppointments(appointments.filter(a => a._id !== id));
      alert("❌ Appointment cancelled");
    } catch (err) {
      console.error("Cancel error:", err);
      alert("Failed to cancel appointment.");
    }
  };

  return (
    <div className="appointment-history">
      <h2>📅 My Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        <ul>
          {appointments.map((appt) => (
            <li key={appt._id}>
              <strong>{appt.date}</strong> at <strong>{appt.time}</strong> with <strong>{appt.doctorId?.name || "Doctor"}</strong>
              {new Date(appt.date) >= new Date() && (
                <button onClick={() => handleCancel(appt._id)} className="btn-cancel">Cancel</button>
              )}
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => navigate("/userhome")} className="btn-back">← Back to Home</button>
    </div>
  );
};

export default Userappointments;

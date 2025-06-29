// src/pages/DoctorAppointments.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  /* Load appointments for the logged‑in doctor */
  useEffect(() => {
    const load = async () => {
      try {
        const doctor = JSON.parse(localStorage.getItem("user") || "null");
        if (!doctor?._id) return alert("⚠ Please log in again");

        const { data } = await axios.get(
          `http://localhost:5000/api/appointments/doctor/${doctor._id}`
        );
        setAppointments(data);
      } catch (err) {
        console.error("❌ Fetch error:", err.response?.data || err.message);
      }
    };
    load();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>📅 My Appointments</h2>

      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        appointments.map((a) => (
          <div
            key={a._id}
            className="appointment-card"
            style={{
              border: "1px solid #ccc",
              padding: 15,
              marginBottom: 10,
              borderRadius: 8,
            }}
          >
            <p>
              <strong>Patient:</strong> {a.userName}
            </p>
            <p>
              <strong>Date:</strong> {a.date}
            </p>
            <p>
              <strong>Time:</strong> {a.time}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

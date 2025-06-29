import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Doctorhome = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const doctorId = localStorage.getItem('userId'); // doctor ID
        const res = await axios.get(`http://localhost:5000/api/appointments/doctor/${doctorId}`);
        setAppointments(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Doctor Dashboard</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div>
          {appointments.map((appointment, idx) => (
            <div key={idx} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
              <p><strong>Patient:</strong> {appointment.userName}</p>
              <p><strong>Date:</strong> {appointment.date}</p>
              <p><strong>Time:</strong> {appointment.time}</p>
              <button onClick={() => navigate(`/doctor-chat/${appointment.userId}`)}>
                💬 Chat with Patient
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Doctorhome;

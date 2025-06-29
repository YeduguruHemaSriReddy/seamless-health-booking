import React, { useEffect, useState, useCallback } from 'react';
import authAxios from '../../utils/authAxios';
import './Admin.css';

const Adminappointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true);
      const res = await authAxios.get('/api/admin/appointments');
      setAppointments(res.data);
    } catch (err) {
      console.error('❌ Fetch appointments failed:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const changeStatus = async (id, status) => {
    try {
      await authAxios.patch(`/api/admin/appointments/${id}`, { status });
      fetchAppointments();
    } catch (err) {
      console.error('❌ Status update error:', err?.response?.data || err);
    }
  };

  const deleteAppointment = async (id) => {
    if (!window.confirm('Are you sure you want to delete this appointment?')) return;
    try {
      await authAxios.delete(`/api/admin/appointments/${id}`);
      alert('Appointment deleted');
      fetchAppointments();
    } catch (err) {
      console.error('❌ Delete error:', err);
      alert('Failed to delete appointment');
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return (
    <div className="admin-appts">
      <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>All Appointments</h2>

      {loading ? (
        <p>Loading...</p>
      ) : appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Patient</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt, index) => (
              <tr key={index}>
                <td style={{ fontSize: '0.9em' }}>{appt.doctor?.name || 'N/A'}</td>
                <td style={{ fontSize: '0.9em' }}>{appt.patient?.name || 'N/A'}</td>
                <td style={{ fontSize: '0.9em' }}>{new Date(appt.date).toLocaleString()}</td>
                <td style={{ fontSize: '0.9em' }}>{appt.status}</td>
                <td>
                  {appt.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => changeStatus(appt._id, 'Approved')}
                        style={{
                          backgroundColor: 'green',
                          color: 'white',
                          display: 'block',
                          width: '100%',
                          marginBottom: '6px',
                          fontSize: '0.9em',
                          padding: '6px 8px',
                        }}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => changeStatus(appt._id, 'Rejected')}
                        style={{
                          backgroundColor: 'tomato',
                          color: 'white',
                          display: 'block',
                          width: '100%',
                          marginBottom: '6px',
                          fontSize: '0.9em',
                          padding: '6px 8px',
                        }}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => deleteAppointment(appt._id)}
                    style={{
                      backgroundColor: 'gray',
                      color: 'white',
                      display: 'block',
                      width: '100%',
                      fontSize: '0.9em',
                      padding: '6px 8px',
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Adminappointments;

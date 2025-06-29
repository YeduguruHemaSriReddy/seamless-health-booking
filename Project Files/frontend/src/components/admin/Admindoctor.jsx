import React, { useEffect, useState } from 'react';
import authAxios from '../../utils/authAxios';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Admindoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await authAxios.get('/api/admin/doctors');
      setDoctors(res.data);
    } catch (err) {
      console.error('Failed to fetch doctors', err);
      alert('Error loading doctor list');
    }
  };

  const handleApprove = async (id) => {
    try {
      await authAxios.post(`/api/admin/approve-doctor/${id}`);
      alert('Doctor approved successfully!');
      fetchDoctors();
    } catch (err) {
      console.error(err);
      alert('Approval failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this doctor?')) return;
    try {
      await authAxios.delete(`/api/admin/doctors/${id}`);
      alert('Doctor deleted.');
      fetchDoctors();
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  return (
    <div className="admin-doctors">
      <h2>Doctor Applications</h2>

      {doctors.length === 0 ? (
        <p>No doctor applications found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Specialization</th>
              <th>Experience</th>
              <th>Fees</th>
              <th>Approved</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doc) => (
              <tr key={doc._id}>
                <td>{doc.fullName}</td>
                <td>{doc.department}</td>
                <td>{doc.experience} yrs</td>
                <td>₹{doc.fees}</td>
                <td>{doc.status === "approved" ? "✅" : "❌"}</td>
                <td>
                  <button onClick={() => handleApprove(doc._id)}>Approve</button>
                  <button onClick={() => handleDelete(doc._id)} style={{ marginLeft: '8px' }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button onClick={() => navigate('/adminhome')} className="btn-back">
        ← Back to Dashboard
      </button>
    </div>
  );
};

export default Admindoctor;

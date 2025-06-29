import React, { useEffect, useState } from 'react';
import authAxios from '../../utils/authAxios';
import { useNavigate, Link } from 'react-router-dom';
import './Admin.css';
import { useTranslation } from 'react-i18next';

const Adminhome = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    users: 0,
    doctors: 0,
    appointments: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [userRes, docRes, apptRes] = await Promise.all([
          authAxios.get('/api/admin/getallusers'),
          authAxios.get('/api/admin/doctors'),
          authAxios.get('/api/admin/appointments'),
        ]);

        setStats({
          users: userRes.data.length,
          doctors: docRes.data.length,
          appointments: apptRes.data.length,
        });
      } catch (err) {
        console.error('Stats fetch error:', err);
      }
    };

    loadStats();
  }, []);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="admin-dashboard">
      <h2>{t('adminDashboard')}</h2>

      <select onChange={(e) => changeLanguage(e.target.value)} style={{ marginBottom: '10px' }}>
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
      </select>

      <div className="cards">
        <div className="card">
          <h3>{stats.doctors}</h3>
          <p>{t('doctors')}</p>
        </div>
        <div className="card">
          <h3>{stats.appointments}</h3>
          <p>{t('appointments')}</p>
        </div>
        <div className="card">
          <h3>{stats.users}</h3>
          <p>{t('users')}</p>
        </div>
      </div>

      {/* Manage Buttons */}
      <div className="manage-section">
        <button onClick={() => navigate('/adminappointments')} className="btn-manage">
          {t('manageAppointments')}
        </button>
        <button onClick={() => navigate('/adminusers')} className="btn-manage">
          {t('manageUsers')}
        </button>
        <button onClick={() => navigate('/admindoctor')} className="btn-manage">
          {t('manageDoctors')}
        </button>
      </div>
    </div>
  );
};

export default Adminhome;

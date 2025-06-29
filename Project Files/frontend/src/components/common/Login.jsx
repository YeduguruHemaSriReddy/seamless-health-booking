import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        'http://localhost:5000/api/user/login',
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      const { user, token, type } = res.data;

      if (!token || !user) {
        throw new Error('Invalid login response');
      }

      // Save login data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      alert(t('loginSuccess'));

      // Redirect based on role
      if (type === 'admin') {
        navigate('/adminhome');
      } else {
        navigate('/userhome');
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        t('loginFailed');
      alert(message);
      console.error('❌ Login Error:', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="form-section">
        <h2>{t('signInTitle')}</h2>
        <form onSubmit={handleSubmit} autoComplete="on">
          <input
            type="email"
            name="email"
            placeholder={t('email')}
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />
          <input
            type="password"
            name="password"
            placeholder={t('password')}
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
          />
          <button type="submit" className="btn-yellow" disabled={loading}>
            {loading ? t('loading') : t('login')}
          </button>
        </form>
        <p>
          {t('noAccount')}{' '}
          <span onClick={() => navigate('/register')} className="link">
            {t('registerHere')}
          </span>
        </p>
      </div>

      <div className="image-section">
        <img src="/images/photo1.png" alt="Login Visual" />
      </div>
    </div>
  );
};

export default Login;

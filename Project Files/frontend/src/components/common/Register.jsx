import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { useTranslation } from 'react-i18next';

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    type: 'user',
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Send OTP to given email
  const sendOtp = async () => {
    if (!formData.email) {
      return alert(t("enterEmailToSendOtp"));
    }
    try {
      await axios.post('/api/otp/send', { email: formData.email });
      alert(t("otpSent"));
      setOtpSent(true);
    } catch (err) {
      console.error("❌ Error sending OTP:", err.response?.data || err.message);
      alert(t("otpFailed"));
    }
  };

  // Verify the OTP code
  const verifyOtp = async () => {
    if (!otp) return alert(t("enterOtp"));
    try {
      const res = await axios.post('/api/otp/verify', {
        email: formData.email,
        otp,
      });
      if (res.data.success) {
        alert(t("otpVerified"));
        setIsOtpVerified(true);
      } else {
        throw new Error(res.data.message || "Invalid OTP");
      }
    } catch (err) {
      console.error("❌ OTP verification failed:", err.response?.data || err.message);
      alert(t("otpVerifyFailed"));
    }
  };

  // Final registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isOtpVerified) {
      return alert(t("verifyOtpWarning"));
    }

    setLoading(true);
    try {
      const res = await axios.post('/api/user/register', formData);
      if (res.data.success) {
        alert(t("registrationSuccess"));
        navigate('/login');
      } else {
        throw new Error(res.data.message || "Registration failed");
      }
    } catch (err) {
      console.error("❌ Registration failed:", err.response?.data || err.message);
      alert(t("registrationFailed") + ": " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="form-section">
        <h2>{t("signupTitle")}</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <input
            type="text"
            name="name"
            placeholder={t("fullName")}
            value={formData.name}
            onChange={handleChange}
            required
          />

          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="email"
              name="email"
              placeholder={t("email")}
              value={formData.email}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={sendOtp}
              className="btn-yellow"
              disabled={otpSent}
            >
              {otpSent ? t("otpSent") : t("sendOtp")}
            </button>
          </div>

          {otpSent && !isOtpVerified && (
            <>
              <input
                type="text"
                placeholder={t("enterOtp")}
                value={otp}
                onChange={e => setOtp(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={verifyOtp}
                className="btn-green"
                style={{ marginBottom: '10px' }}
              >
                {t("verifyOtp")}
              </button>
            </>
          )}

          {isOtpVerified && (
            <p style={{ color: 'green' }}>{t("otpVerifiedMessage")}</p>
          )}

          <input
            type="password"
            name="password"
            placeholder={t("password")}
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder={t("phone")}
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <div className="role-options">
            <label>
              <input
                type="radio"
                name="type"
                value="admin"
                onChange={handleChange}
              />{' '}
              {t("admin")}
            </label>
            <label>
              <input
                type="radio"
                name="type"
                value="user"
                onChange={handleChange}
                defaultChecked
              />{' '}
              {t("user")}
            </label>
          </div>

          <button
            type="submit"
            className="btn-yellow"
            disabled={loading || !isOtpVerified}
          >
            {loading ? t("loading") : t("register")}
          </button>
        </form>

        <p>
          {t("haveAccount")}{' '}
          <span onClick={() => navigate('/login')} className="link">
            {t("loginHere")}
          </span>
        </p>
      </div>

      <div className="image-section">
        <img src="/images/register.png" alt="Register visual" />
      </div>
    </div>
  );
};

export default Register;

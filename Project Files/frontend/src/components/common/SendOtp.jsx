// src/components/common/SendOtp.jsx
import React, { useState } from "react";
import axios from "axios";

const SendOtp = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const sendOtp = async () => {
    try {
      await axios.post("http://localhost:5000/api/otp/send", { email });
      alert("✅ OTP sent to your email.");
      setStep(2);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to send OTP.");
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/otp/verify", { email, otp });
      alert(res.data.message || "OTP verified.");
    } catch (err) {
      console.error(err);
      alert("❌ Invalid OTP.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h3>🔐 OTP Verification</h3>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={step === 2}
        required
      />
      {step === 1 ? (
        <button onClick={sendOtp}>Send OTP</button>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}
    </div>
  );
};

export default SendOtp;

import React, { useState } from "react";
import authAxios from "../utils/authAxios"; // adjust if needed
import "./ApplyDoctor.css"; // Optional CSS

export default function ApplyDoctor() {
  const [form, setForm] = useState({
    fullName:       "",
    phone:          "",
    email:          "",
    address:        "",
    department:     "",
    availableSlots: "",
    experience:     "",
    fees:           "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!user._id) return alert("⚠ Please log in first.");

      const doctor = {
        fullName:     form.fullName,
        email:        form.email,
        phone:        form.phone,
        address:      form.address,
        specialization: form.department,
        experience:   Number(form.experience),
        fees:         Number(form.fees),
        timings:      form.availableSlots.split(",").map((s) => s.trim()),
      };

      // src/components/doctor/ApplyDoctor.jsx
const res = await authAxios.post(
  "/api/user/apply-doctor",   // ← same path, POST
  {
    fullName,
    phone,
    email,
    address,
    department,
    slots,        // "09:00, 11:00"
    experience,
    fees,
  }
);

      alert("✅ Doctor application submitted!");
    } catch (err) {
      console.error("❌ Error:", err.response?.data || err.message);
      alert("❌ Submission failed");
    }
  };

  return (
    <div className="apply-doctor-container">
      <h2>Apply as Doctor</h2>
      <form onSubmit={handleSubmit}>
        {[
          ["fullName",       "Full Name"],
          ["phone",          "Phone"],
          ["email",          "Email"],
          ["address",        "Address"],
          ["department",     "Department"],
          ["availableSlots", "Available Slots (e.g. 09:00, 11:00)"],
          ["experience",     "Experience (Years)", "number"],
          ["fees",           "Consultation Fee (INR)", "number"],
        ].map(([name, placeholder, type = "text"]) => (
          <input
            key={name}
            name={name}
            value={form[name]}
            onChange={handleChange}
            placeholder={placeholder}
            required
            type={type}
          />
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

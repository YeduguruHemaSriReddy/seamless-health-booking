import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authAxios from "../../utils/authAxios";
import "./DoctorApplicationForm.css";

export default function DoctorApplicationForm() {
  const navigate = useNavigate();
  const [loading, setLoading]   = useState(false);
  const [msg, setMsg]           = useState("");
  const [data, setData] = useState({
  fullName:   "",
  phone:      "",
  email:      "",
  address:    "",
  department: "",
  slots:      "",   // "09:00, 11:00"
  experience: "",
  fees:       "",
});


  const onChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      /* If your backend expects auth, attach token: 
         const token = localStorage.setItem("token", res.data.token);
         await axios.post(URL, data, { headers:{ Authorization:`Bearer ${token}` }});
      */
      await authAxios.post("/api/doctors/apply", data);

      setMsg("✅ Application submitted! Redirecting…");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setMsg(err.response?.data?.message || "❌ Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="doc-app-wrapper">
      <h2>Apply as Doctor</h2>

      <form onSubmit={submit}>
        {[
          ["fullName",    "Full Name"],
          ["phone",       "Phone (10 digits)", "tel",    "[0-9]{10}"],
          ["email",       "Email",             "email"],
          ["address",     "Address"],
          ["department",  "Department"],
          ["slots",       "Slots (e.g. 09:00, 11:00)"],
          ["experience",  "Experience (years)", "number", "0"],
          ["fees",        "Consultation Fees (INR)", "number", "0"],
        ].map(([name, placeholder, type = "text", pattern]) => (
          <input
            key={name}
            name={name}
            value={data[name]}
            onChange={onChange}
            placeholder={placeholder}
            required
            type={type}
            pattern={pattern}
            min={pattern}
          />
        ))}

        <button disabled={loading}>
          {loading ? "Submitting…" : "Submit"}
        </button>

        {msg && <p className="msg">{msg}</p>}
      </form>
    </div>
  );
}

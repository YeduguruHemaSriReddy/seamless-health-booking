import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Userhome.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Userhome = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  /* ───── Local state ───── */
  const [user, setUser]               = useState(null);
  const [token, setToken]             = useState(null);
  const [doctors, setDoctors]         = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [doctorStatus, setDoctorStatus] = useState({
    isDoctor: false,
    hasApplied: false,
  });

  const [searchTerm, setSearchTerm]   = useState("");
  const [darkMode, setDarkMode]       = useState(false);

  /* Booking + review */
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [date, setDate]               = useState("");
  const [time, setTime]               = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [comment, setComment]         = useState("");
  const [rating, setRating]           = useState(5);

  const canApplyDoctor =
    !doctorStatus.isDoctor && !doctorStatus.hasApplied;

  /* ───── Auth + initial load ───── */
  useEffect(() => {
    const localUser  = JSON.parse(localStorage.getItem("user") || "null");
    const localToken = localStorage.getItem("token");

    if (!localUser || !localToken) {
      alert("⚠️ Please login to continue.");
      navigate("/login");
      return;
    }

    setUser(localUser);
    setToken(localToken);
  }, [navigate]);

  /* ───── Fetch doctors + appointments + status ───── */
  useEffect(() => {
    if (!token) return; // wait for token

    const fetchData = async () => {
      try {
        const [doctorRes, apptRes, statusRes] = await Promise.all([
          axios.get("http://localhost:5000/api/user/doctors"),
          axios.get("http://localhost:5000/api/user/my-appointments", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/user/check-doctor-status", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setDoctors(doctorRes.data);
        setAppointments(apptRes.data);
        setDoctorStatus(statusRes.data);
      } catch (err) {
        console.error("❌ Data load error:", err.response?.data || err.message);
      }
    };

    fetchData();
  }, [token]);

  /* ───── Helpers ───── */
  const changeLanguage = (lang) => i18n.changeLanguage(lang);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // ... unchanged imports & state

const fetchAvailableSlots = async (doctorId, selectedDate) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/user/available-slots/${doctorId}/${selectedDate}`
    );
    console.log("Slots API →", res.data);
    // 🆕   accept both ["09:00"] or { slots: ["09:00"] }
    setAvailableSlots(Array.isArray(res.data) ? res.data : res.data.slots || []);
  } catch (err) {
    console.error("❌ Slot fetch error:", err);
  }
};

const handleBooking = async () => {
  if (!time) return alert("⏰ Please select time"); // 🆕 guard

  try {
    await axios.post(
      "http://localhost:5000/api/user/book-appointment",
      {
        userId: user._id,
        doctorId: selectedDoctor._id,
        date,
        time,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("✅ Appointment booked!");
    setSelectedDoctor(null);
  } catch (err) {
    console.error("❌ Booking error:", err.response?.data || err.message);
    alert("Booking failed.");
  }
};


  const handleSubmitReview = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/user/review/${selectedDoctor._id}`,
        { comment, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Review submitted!");
      setComment("");
      setRating(5);

      const updated = await axios.get("http://localhost:5000/api/user/doctors");
      setDoctors(updated.data);
    } catch (err) {
      console.error("❌ Review error:", err.response?.data || err.message);
      alert("Failed to submit review.");
    }
  };

  const handleApplyDoctorClick = () => {
    if (doctorStatus.isDoctor) {
      alert("✅ You are already a doctor.");
    } else if (doctorStatus.hasApplied) {
      alert("🕓 Your doctor application is pending.");
    } else {
      navigate("/apply-doctor");
    }
  };

  /* ───── Derived list based on searchTerm ───── */
  const filteredDoctors = doctors.filter((d) => {
    const dept   = (d?.department || "").toLowerCase();
    const target = searchTerm.toLowerCase();
    return dept.includes(target);
  });

  /* ───── JSX ───── */
  return (
    <div className={`userhome ${darkMode ? "dark" : ""}`}>
      {/* Theme toggle */}
      <button
        className="btn-toggle-mode"
        style={{ position: "absolute", top: 20, right: 20 }}
        onClick={toggleDarkMode}
      >
        {darkMode ? t("lightMode") : t("darkMode")}
      </button>

      {/* Language picker */}
      <select
        onChange={(e) => changeLanguage(e.target.value)}
        style={{ marginTop: 70 }}
      >
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
      </select>

      <h2>{t("availableDoctors")}</h2>

      {/* Search box */}
      <input
        type="text"
        placeholder={t("searchDoctors")}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {/* Doctor cards */}
      <div className="doctor-list">
        {filteredDoctors.map((doctor) => (
          <div className="doctor-card" key={doctor._id}>
            <img src="/images/doctorcard.png" alt="Doctor" />
            <h3>{doctor.fullName}</h3>
            <p>
              <strong>{t("department")}:</strong> {doctor.department}
            </p>
            <p>
              <strong>{t("availableSlots")}:</strong>{" "}
              {doctor.availableSlots?.join(", ") || t("notProvided")}
            </p>
            <p>
              <strong>{t("averageRating")}:</strong>{" "}
              {doctor.reviews?.length
                ? (
                    doctor.reviews.reduce((sum, r) => sum + r.rating, 0) /
                    doctor.reviews.length
                  ).toFixed(1)
                : t("noRatings")}
            </p>

            {/* latest two reviews */}
            {doctor.reviews?.slice(-2).map((r) => (
              <p key={r._id}>
                <em>“{r.comment}”</em> — <strong>{r.name}</strong> ⭐{r.rating}
              </p>
            ))}

            <button
              onClick={() => {
                setSelectedDoctor(doctor);
                setDate("");
                setTime("");
                setAvailableSlots([]);
              }}
            >
              {t("bookAppointment")}
            </button>
          </div>
        ))}
      </div>

      {/* Upcoming appointments */}
      <div className="upcoming-section">
        <h3>{t("upcomingAppointments")}</h3>
        {appointments.length === 0 ? (
          <p>{t("noAppointments")}</p>
        ) : (
          <ul className="appointment-list">
            {appointments.slice(0, 3).map((appt) => (
              <li key={appt._id}>
                <strong>{t("date")}:</strong> {appt.date} |{" "}
                <strong>{t("time")}:</strong> {appt.time} |{" "}
                <strong>{t("doctor")}:</strong> {appt.doctor}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Apply as doctor */}
      {canApplyDoctor && (
        <div style={{ marginTop: 30 }}>
          <button
            className="btn-apply-doctor"
            onClick={handleApplyDoctorClick}
          >
            {t("applyDoctor")}
          </button>
        </div>
      )}

      {/* Booking & Review form */}
      {selectedDoctor && (
        <div className="booking-form">
          <h3>
            {t("bookWith")} {selectedDoctor.fullName}
          </h3>

          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              fetchAvailableSlots(selectedDoctor._id, e.target.value);
            }}
          />

          <select value={time} onChange={(e) => setTime(e.target.value)}>
            <option value="">{t("selectTime")}</option>
            {availableSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>

          <button onClick={handleBooking}>{t("confirmBooking")}</button>
          <button onClick={() => navigate("/userappointments")}>
            {t("viewAppointments")}
          </button>
          <button onClick={() => setSelectedDoctor(null)}>
            {t("cancel")}
          </button>

          {/* Review section */}
          <div className="review-form">
            <h4>
              {t("leaveReview")} {selectedDoctor.fullName}
            </h4>
            <textarea
              rows="3"
              placeholder={t("writeReview")}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} Star{r > 1 ? "s" : ""}
                </option>
              ))}
            </select>
            <button onClick={handleSubmitReview}>{t("submitReview")}</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Userhome;

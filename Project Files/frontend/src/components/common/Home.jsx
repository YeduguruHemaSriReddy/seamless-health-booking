import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* ─────────────────────  NAVBAR  ───────────────────── */}
      <nav className="navbar">
        <h2 className="logo">BOOK A DOCTOR</h2>

        <div className="nav-buttons-horizontal">
          <button className="btn-yellow" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="btn-yellow" onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      </nav>

      {/* ─────────────────────  HERO  ───────────────────── */}
      <div className="hero-section">
        <img
          src="/images/doctors.png"
          alt="Doctors"
          className="hero-image"
        />

        <div className="hero-text">
          <h3>Effortlessly schedule your doctor</h3>
          <p>
            appointments with just a few clicks,
            <br />
            putting your health in your hands.
          </p>

          <button
            className="btn-yellow"
            onClick={() => navigate("/login")}
          >
            Book your Doctor
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

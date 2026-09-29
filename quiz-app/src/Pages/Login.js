import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Brain,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  UserRound,
  ShieldCheck,
} from "lucide-react";

import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    /*
      Temporary login navigation.

      Later you can connect this to your backend/database.
    */

    if (formData.role === "staff") {
      navigate("/staff-dashboard");
    } else {
      navigate("/student-dashboard");
    }
  };

  return (
    <div className="login-page">

      {/* =========================
          LEFT SIDE
      ========================= */}

      <div className="login-left">

        <div className="login-left-content">

          <Link to="/" className="login-brand">

            <div className="login-brand-icon">
              <Brain size={21} />
            </div>

            <span>
              Quiz<span>Master</span>
            </span>

          </Link>


          <div className="login-message">

            <div className="login-small-badge">
              <span></span>
              WELCOME BACK
            </div>

            <h1>
              Learn.
              <br />
              Practice.
              <br />
              <span>Achieve.</span>
            </h1>

            <p>
              Continue your learning journey with
              interactive quizzes and track your
              progress every step of the way.
            </p>

          </div>


          <div className="login-left-stats">

            <div>
              <strong>10K+</strong>
              <span>Students</span>
            </div>

            <div>
              <strong>500+</strong>
              <span>Questions</span>
            </div>

            <div>
              <strong>95%</strong>
              <span>Satisfaction</span>
            </div>

          </div>

        </div>

        <div className="login-decoration decoration-one"></div>
        <div className="login-decoration decoration-two"></div>

      </div>


      {/* =========================
          RIGHT SIDE
      ========================= */}

      <div className="login-right">

        <div className="login-card">

          <div className="login-card-header">

            <div className="mobile-login-logo">

              <div className="login-brand-icon">
                <Brain size={20} />
              </div>

              <span>
                Quiz<span>Master</span>
              </span>

            </div>

            <h2>Welcome Back! 👋</h2>

            <p>
              Sign in to continue to your account
            </p>

          </div>


          {/* ROLE SELECTOR */}

          <div className="role-selector">

            <button
              type="button"
              className={
                formData.role === "student"
                  ? "role-button active"
                  : "role-button"
              }
              onClick={() =>
                setFormData({
                  ...formData,
                  role: "student",
                })
              }
            >

              <UserRound size={16} />

              <span>Student</span>

            </button>


            <button
              type="button"
              className={
                formData.role === "staff"
                  ? "role-button active"
                  : "role-button"
              }
              onClick={() =>
                setFormData({
                  ...formData,
                  role: "staff",
                })
              }
            >

              <ShieldCheck size={16} />

              <span>Staff</span>

            </button>

          </div>


          {/* LOGIN FORM */}

          <form onSubmit={handleSubmit}>

            {/* EMAIL */}

            <div className="login-input-group">

              <label>Email Address</label>

              <div className="login-input-wrapper">

                <Mail size={17} />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="login-input-group">

              <div className="password-label-row">

                <label>Password</label>

                <a href="#forgot-password">
                  Forgot password?
                </a>

              </div>


              <div className="login-input-wrapper">

                <Lock size={17} />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>

              </div>

            </div>


            {/* REMEMBER */}

            <div className="remember-row">

              <label>

                <input type="checkbox" />

                <span>Remember me</span>

              </label>

            </div>


            {/* ERROR */}

            {error && (
              <div className="login-error">
                {error}
              </div>
            )}


            {/* SUBMIT */}

            <button
              type="submit"
              className="login-submit"
            >

              Sign In

              <ArrowRight size={16} />

            </button>

          </form>


          {/* DIVIDER */}

          <div className="login-divider">
            <span>OR</span>
          </div>


          {/* REGISTER */}

          <div className="register-prompt">

            <span>Don't have an account?</span>

            <Link to="/register">
              Create an account
            </Link>

          </div>


          <div className="login-security">

            <ShieldCheck size={14} />

            <span>
              Your information is securely protected
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;
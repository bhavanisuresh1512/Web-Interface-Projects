import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Brain,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  ShieldCheck,
  UserRound,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all the fields.");
      return;
    }

    if (formData.password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (
      formData.password !== formData.confirmPassword
    ) {
      setError("Passwords do not match.");
      return;
    }

    /*
      Temporary registration logic.

      Later this can be connected to
      your backend/database.
    */

    setSuccess(
      "Account created successfully! Redirecting..."
    );

    setTimeout(() => {
      if (formData.role === "staff") {
        navigate("/staff-dashboard");
      } else {
        navigate("/student-dashboard");
      }
    }, 1200);
  };

  return (
    <div className="register-page">

      {/* =====================================
          LEFT SIDE
      ===================================== */}

      <div className="register-left">

        <div className="register-left-content">

          {/* LOGO */}

          <Link to="/" className="register-brand">

            <div className="register-brand-icon">
              <Brain size={21} />
            </div>

            <span>
              Quiz<span>Master</span>
            </span>

          </Link>


          {/* MESSAGE */}

          <div className="register-message">

            <div className="register-small-badge">
              <span></span>
              JOIN QUIZMASTER
            </div>

            <h1>
              Start Your
              <br />
              Learning
              <br />
              <span>Journey.</span>
            </h1>

            <p>
              Create your account and get access to
              interactive quizzes, performance tracking,
              and personalized learning.
            </p>

          </div>


          {/* BENEFITS */}

          <div className="register-benefits">

            <div className="register-benefit">

              <div className="register-check">
                <CheckCircle2 size={14} />
              </div>

              <span>Interactive quizzes</span>

            </div>


            <div className="register-benefit">

              <div className="register-check">
                <CheckCircle2 size={14} />
              </div>

              <span>Track your performance</span>

            </div>


            <div className="register-benefit">

              <div className="register-check">
                <CheckCircle2 size={14} />
              </div>

              <span>Learn at your own pace</span>

            </div>

          </div>

        </div>


        {/* DECORATIONS */}

        <div className="register-decoration register-decoration-one"></div>

        <div className="register-decoration register-decoration-two"></div>

      </div>


      {/* =====================================
          RIGHT SIDE
      ===================================== */}

      <div className="register-right">

        <div className="register-card">

          {/* HEADER */}

          <div className="register-card-header">

            {/* MOBILE LOGO */}

            <div className="mobile-register-logo">

              <div className="register-brand-icon">
                <Brain size={20} />
              </div>

              <span>
                Quiz<span>Master</span>
              </span>

            </div>


            <h2>Create Your Account</h2>

            <p>
              Join QuizMaster and start learning today
            </p>

          </div>


          {/* ROLE SELECTOR */}

          <div className="register-role-selector">

            <button
              type="button"
              className={
                formData.role === "student"
                  ? "register-role-button active"
                  : "register-role-button"
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
                  ? "register-role-button active"
                  : "register-role-button"
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


          {/* FORM */}

          <form onSubmit={handleSubmit}>

            {/* NAME */}

            <div className="register-input-group">

              <label>Full Name</label>

              <div className="register-input-wrapper">

                <User size={17} />

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* EMAIL */}

            <div className="register-input-group">

              <label>Email Address</label>

              <div className="register-input-wrapper">

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

            <div className="register-input-group">

              <label>Password</label>

              <div className="register-input-wrapper">

                <Lock size={17} />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className="register-password-toggle"
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


            {/* CONFIRM PASSWORD */}

            <div className="register-input-group">

              <label>Confirm Password</label>

              <div className="register-input-wrapper">

                <Lock size={17} />

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className="register-password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >

                  {showConfirmPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}

                </button>

              </div>

            </div>


            {/* TERMS */}

            <div className="register-terms">

              <label>

                <input type="checkbox" required />

                <span>
                  I agree to the{" "}
                  <a href="#terms">
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#privacy">
                    Privacy Policy
                  </a>
                </span>

              </label>

            </div>


            {/* ERROR */}

            {error && (
              <div className="register-error">
                {error}
              </div>
            )}


            {/* SUCCESS */}

            {success && (
              <div className="register-success">
                <CheckCircle2 size={14} />
                {success}
              </div>
            )}


            {/* SUBMIT */}

            <button
              type="submit"
              className="register-submit"
            >

              Create Account

              <ArrowRight size={16} />

            </button>

          </form>


          {/* LOGIN */}

          <div className="register-login">

            <span>
              Already have an account?
            </span>

            <Link to="/login">
              Sign in
            </Link>

          </div>


          {/* SECURITY */}

          <div className="register-security">

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

export default Register;
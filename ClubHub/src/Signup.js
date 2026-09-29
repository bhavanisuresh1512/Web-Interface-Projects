import "./Signup.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaUniversity } from "react-icons/fa";

function Signup() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    department: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (
      !user.name ||
      !user.department ||
      !user.email ||
      !user.password ||
      !user.confirmPassword
    ) {
      alert("Please fill all the fields.");
      return;
    }

    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    localStorage.setItem("student", JSON.stringify(user));

    alert("Registration Successful!");

    navigate("/login");
  };

  return (
    <div className="signup-page">

      <div className="signup-card">

        <h1>Campus Club Hub</h1>

        <h2>Create Account</h2>

        <p>Join clubs and participate in exciting events.</p>

        <form onSubmit={handleSignup}>

          <div className="input-box">
            <FaUser className="icon" />

            <input
              type="text"
              placeholder="Full Name"
              name="name"
              value={user.name}
              onChange={handleChange}
            />
          </div>

          <div className="input-box">
            <FaUniversity className="icon" />

            <input
              type="text"
              placeholder="Department"
              name="department"
              value={user.department}
              onChange={handleChange}
            />
          </div>

          <div className="input-box">
            <FaEnvelope className="icon" />

            <input
              type="email"
              placeholder="College Email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-box">
            <FaLock className="icon" />

            <input
              type="password"
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
          </div>

          <div className="input-box">
            <FaLock className="icon" />

            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button type="submit">
            Sign Up
          </button>

        </form>

        <p className="login-link">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>

      </div>

    </div>
  );
}

export default Signup;
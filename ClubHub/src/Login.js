import "./Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

function Login() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (user.email === "" || user.password === "") {
      alert("Please fill all fields");
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));

    alert("Login Successful!");

    navigate("/");
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>Campus Club Hub</h1>

        <h2>Welcome Back 👋</h2>

        <p>Login to continue your journey.</p>

        <form onSubmit={handleLogin}>

          <div className="input-box">

            <FaUser className="icon"/>

            <input
              type="email"
              name="email"
              placeholder="College Email"
              value={user.email}
              onChange={handleChange}
            />

          </div>

          <div className="input-box">

            <FaLock className="icon"/>

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
            />

          </div>

          <button type="submit">
            Login
          </button>

        </form>

        <p className="signup-text">
          Don't have an account?
          <Link to="/signup"> Sign Up</Link>
        </p>

      </div>

    </div>
  );
}

export default Login;
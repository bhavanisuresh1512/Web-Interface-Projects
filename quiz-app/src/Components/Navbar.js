import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  Bell,
  LayoutDashboard,
  ClipboardList,
  BarChart3,
  ChevronDown,
  LogOut,
} from "lucide-react";
import "./Navbar.css";

function Navbar({ onMenuClick }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Left Side */}
        <div className="navbar-left">

          {/* Hamburger */}
          <button
            className="menu-button"
            onClick={onMenuClick}
            aria-label="Toggle sidebar"
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <div
            className="navbar-logo"
            onClick={() => navigate("/")}
          >
            <div className="logo-box">
              Q
            </div>

            <div className="logo-content">
              <h2>QuizMaster</h2>
              <span>Learn • Challenge • Achieve</span>
            </div>
          </div>

        </div>

        {/* Navigation */}
        <div className="nav-links">

          <button
            className="nav-link active"
            onClick={() => navigate("/")}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>

          <button
            className="nav-link"
            onClick={() => navigate("/quizzes")}
          >
            <ClipboardList size={18} />
            <span>Quizzes</span>
          </button>

          <button
            className="nav-link"
            onClick={() => navigate("/results")}
          >
            <BarChart3 size={18} />
            <span>Results</span>
          </button>

        </div>

        {/* Right Side */}
        <div className="navbar-actions">

          {/* Notification */}
          <button className="notification">
            <Bell size={20} />

            <span className="notification-dot"></span>
          </button>

          {/* Profile */}
          <div
            className="profile"
            onClick={() => navigate("/profile")}
          >
            <div className="profile-avatar">
              B
            </div>

            <div className="profile-info">
              <strong>Bhavani</strong>
              <span>Student</span>
            </div>

            <ChevronDown
              className="profile-arrow"
              size={17}
            />
          </div>

          {/* Logout */}
          <button
            className="logout"
            onClick={handleLogout}
          >
            <LogOut size={17} />
            <span>Logout</span>
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;
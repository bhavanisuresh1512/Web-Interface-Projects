import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  BarChart3,
  User,
  Settings,
  PlusCircle,
  BookOpen,
  Users,
  HelpCircle,
  X,
} from "lucide-react";
import "./Sidebar.css";

function Sidebar({
  role = "student",
  isOpen = false,
  onClose,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const studentMenu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/",
    },
    {
      name: "Available Quizzes",
      icon: ClipboardList,
      path: "/quizzes",
    },
    {
      name: "My Results",
      icon: BarChart3,
      path: "/results",
    },
    {
      name: "My Profile",
      icon: User,
      path: "/profile",
    },
  ];

  const staffMenu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/",
    },
    {
      name: "Create Quiz",
      icon: PlusCircle,
      path: "/create-quiz",
    },
    {
      name: "Manage Quizzes",
      icon: BookOpen,
      path: "/manage-quizzes",
    },
    {
      name: "Students",
      icon: Users,
      path: "/students",
    },
    {
      name: "Results",
      icon: BarChart3,
      path: "/results",
    },
  ];

  const menuItems =
    role.toLowerCase() === "staff"
      ? staffMenu
      : studentMenu;

  const handleNavigation = (path) => {
    navigate(path);

    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* SIDEBAR */}
      <aside
        className={`sidebar ${
          isOpen ? "sidebar-open" : ""
        }`}
      >

        {/* HEADER */}
        <div className="sidebar-header">

          <div className="sidebar-role">

            <div className="role-icon">
              {role.toLowerCase() === "staff" ? (
                <Users size={18} />
              ) : (
                <User size={18} />
              )}
            </div>

            <div>
              <span className="role-label">
                {role.toLowerCase() === "staff"
                  ? "Staff Portal"
                  : "Student Portal"}
              </span>

              <span className="role-subtitle">
                {role.toLowerCase() === "staff"
                  ? "Manage your quizzes"
                  : "Keep learning & growing"}
              </span>
            </div>

          </div>

          <button
            className="sidebar-close"
            onClick={onClose}
          >
            <X size={20} />
          </button>

        </div>


        {/* MAIN MENU */}
        <div className="sidebar-section">

          <span className="sidebar-title">
            MAIN MENU
          </span>

          <div className="sidebar-menu">

            {menuItems.map((item) => {

              const Icon = item.icon;

              const active =
                location.pathname === item.path;

              return (
                <button
                  key={item.path}
                  className={`sidebar-item ${
                    active ? "active" : ""
                  }`}
                  onClick={() =>
                    handleNavigation(item.path)
                  }
                >

                  <Icon size={19} />

                  <span>{item.name}</span>

                  {active && (
                    <div className="active-indicator"></div>
                  )}

                </button>
              );
            })}

          </div>

        </div>


        {/* BOTTOM */}
        <div className="sidebar-bottom">

          <button
            className="sidebar-item"
            onClick={() =>
              handleNavigation("/settings")
            }
          >
            <Settings size={19} />
            <span>Settings</span>
          </button>

          <button
            className="sidebar-item"
            onClick={() =>
              handleNavigation("/help")
            }
          >
            <HelpCircle size={19} />
            <span>Help & Support</span>
          </button>


          <div className="sidebar-divider"></div>


          {/* USER */}
          <div className="sidebar-footer">

            <div className="footer-avatar">
              {role.toLowerCase() === "staff"
                ? "S"
                : "B"}
            </div>

            <div className="footer-user">

              <strong>
                {role.toLowerCase() === "staff"
                  ? "Staff User"
                  : "Bhavani"}
              </strong>

              <span>
                {role.toLowerCase() === "staff"
                  ? "Administrator"
                  : "Student"}
              </span>

            </div>

          </div>

        </div>

      </aside>
    </>
  );
}

export default Sidebar;
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

// STAFF
import StaffDashboard from "./Pages/Staff/StaffDashboard";
import CreateQuiz from "./Pages/Staff/CreateQuiz";
import ManageQuizzes from "./Pages/Staff/ManageQuizzes";
import StaffResults from "./Pages/Staff/StaffResults";

// STUDENT
import StudentDashboard from "./Pages/Student/StudentDashboard";
import AvailableQuizzes from "./Pages/Student/AvailableQuizzes";
import TakeQuiz from "./Pages/Student/TakeQuiz";
import StudentResults from "./Pages/Student/StudentResults";

import "./App.css";

function App() {
  return (
    <div className="app">

      <Routes>

        {/* =========================
            HOME
        ========================= */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* =========================
            AUTHENTICATION
        ========================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* =========================
            STAFF
        ========================= */}

        <Route
          path="/staff-dashboard"
          element={<StaffDashboard />}
        />

        <Route
          path="/create-quiz"
          element={<CreateQuiz />}
        />

        <Route
          path="/manage-quizzes"
          element={<ManageQuizzes />}
        />

        <Route
          path="/staff-results"
          element={<StaffResults />}
        />


        {/* =========================
            STUDENT
        ========================= */}

        <Route
          path="/student-dashboard"
          element={<StudentDashboard />}
        />

        <Route
          path="/available-quizzes"
          element={<AvailableQuizzes />}
        />

        <Route
          path="/take-quiz"
          element={<TakeQuiz />}
        />

        <Route
          path="/student-results"
          element={<StudentResults />}
        />


        {/* =========================
            INVALID URL
        ========================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

    </div>
  );
}

export default App;
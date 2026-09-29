import React, { useEffect, useState } from "react";
import {
  FileQuestion,
  CheckCircle2,
  Edit3,
  Users,
  Plus,
  ArrowRight,
  Clock,
  BarChart3,
  CalendarDays,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import "./StaffDashboard.css";

function StaffDashboard() {
  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState([]);

  // =========================================
  // LOAD QUIZZES FROM LOCAL STORAGE
  // =========================================

  useEffect(() => {
    const savedQuizzes =
      localStorage.getItem("quizzes");

    if (savedQuizzes) {
      setQuizzes(JSON.parse(savedQuizzes));
    } else {
      setQuizzes([]);
    }
  }, []);


  // =========================================
  // CALCULATE STATISTICS
  // =========================================

  const totalQuizzes = quizzes.length;

  const publishedQuizzes = quizzes.filter(
    (quiz) =>
      quiz.status === "Published"
  ).length;

  const draftQuizzes = quizzes.filter(
    (quiz) =>
      quiz.status === "Draft"
  ).length;

  const totalAttempts = quizzes.reduce(
    (total, quiz) =>
      total + (quiz.participants || 0),
    0
  );


  // =========================================
  // RECENT QUIZZES
  // =========================================

  const recentQuizzes = [...quizzes]
    .reverse()
    .slice(0, 5);


  // =========================================
  // REFRESH DATA
  // =========================================

  const refreshDashboard = () => {
    const savedQuizzes =
      localStorage.getItem("quizzes");

    setQuizzes(
      savedQuizzes
        ? JSON.parse(savedQuizzes)
        : []
    );
  };


  return (
    <div className="staff-dashboard">


      {/* =====================================
          HEADER
      ===================================== */}

      <div className="staff-dashboard-header">

        <div>

          <h1>
            Staff Dashboard
          </h1>

          <p>
            Manage your quizzes and monitor
            student performance
          </p>

        </div>


        <button
          className="dashboard-create-btn"
          onClick={() =>
            navigate("/create-quiz")
          }
        >

          <Plus size={18} />

          Create Quiz

        </button>

      </div>


      {/* =====================================
          STATISTICS
      ===================================== */}

      <div className="dashboard-stats">


        {/* TOTAL QUIZZES */}

        <div className="dashboard-stat-card">

          <div className="dashboard-stat-icon purple">
            <FileQuestion size={22} />
          </div>

          <div>

            <span>
              Total Quizzes
            </span>

            <strong>
              {totalQuizzes}
            </strong>

          </div>

        </div>


        {/* PUBLISHED */}

        <div className="dashboard-stat-card">

          <div className="dashboard-stat-icon green">
            <CheckCircle2 size={22} />
          </div>

          <div>

            <span>
              Published
            </span>

            <strong>
              {publishedQuizzes}
            </strong>

          </div>

        </div>


        {/* DRAFT */}

        <div className="dashboard-stat-card">

          <div className="dashboard-stat-icon orange">
            <Edit3 size={22} />
          </div>

          <div>

            <span>
              Drafts
            </span>

            <strong>
              {draftQuizzes}
            </strong>

          </div>

        </div>


        {/* ATTEMPTS */}

        <div className="dashboard-stat-card">

          <div className="dashboard-stat-icon blue">
            <Users size={22} />
          </div>

          <div>

            <span>
              Total Attempts
            </span>

            <strong>
              {totalAttempts}
            </strong>

          </div>

        </div>

      </div>


      {/* =====================================
          MAIN DASHBOARD AREA
      ===================================== */}

      <div className="dashboard-main-grid">


        {/* ===================================
            RECENT QUIZZES
        =================================== */}

        <div className="recent-quizzes-card">

          <div className="section-header">

            <div>

              <h2>
                Recent Quizzes
              </h2>

              <p>
                Your recently created quizzes
              </p>

            </div>


            <button
              className="view-all-btn"
              onClick={() =>
                navigate("/manage-quizzes")
              }
            >

              View All

              <ArrowRight size={15} />

            </button>

          </div>


          {recentQuizzes.length > 0 ? (

            <div className="recent-quiz-list">

              {recentQuizzes.map(
                (quiz) => (

                  <div
                    className="recent-quiz-item"
                    key={quiz.id}
                  >


                    {/* ICON */}

                    <div className="recent-quiz-icon">

                      <FileQuestion
                        size={19}
                      />

                    </div>


                    {/* DETAILS */}

                    <div className="recent-quiz-details">

                      <h3>
                        {quiz.title}
                      </h3>

                      <div className="recent-quiz-meta">

                        <span>
                          {quiz.category}
                        </span>

                        <span>
                          <FileQuestion
                            size={12}
                          />

                          {
                            quiz.questionCount ||
                            quiz.questions?.length ||
                            0
                          }{" "}
                          Questions
                        </span>

                        <span>
                          <Clock
                            size={12}
                          />

                          {quiz.duration ||
                            0}{" "}
                          mins
                        </span>

                      </div>

                    </div>


                    {/* STATUS */}

                    <div className="recent-quiz-status">

                      <span
                        className={
                          quiz.status ===
                          "Published"
                            ? "dashboard-status published"
                            : "dashboard-status draft"
                        }
                      >

                        {quiz.status}

                      </span>

                    </div>


                    {/* ACTION */}

                    <button
                      className="recent-quiz-arrow"
                      onClick={() =>
                        navigate(
                          "/manage-quizzes"
                        )
                      }
                    >

                      <ArrowRight
                        size={16}
                      />

                    </button>

                  </div>

                )
              )}

            </div>

          ) : (

            /* =================================
               EMPTY STATE
            ================================= */

            <div className="dashboard-empty-state">

              <div className="dashboard-empty-icon">

                <FileQuestion
                  size={30}
                />

              </div>

              <h3>
                No quizzes created yet
              </h3>

              <p>
                Create your first quiz and it
                will appear here.
              </p>

              <button
                onClick={() =>
                  navigate("/create-quiz")
                }
              >

                <Plus size={16} />

                Create Your First Quiz

              </button>

            </div>

          )}

        </div>


        {/* ===================================
            QUICK ACTIONS
        =================================== */}

        <div className="quick-actions-card">

          <div className="section-header">

            <div>

              <h2>
                Quick Actions
              </h2>

              <p>
                Manage your quiz platform
              </p>

            </div>

          </div>


          <div className="quick-actions">


            {/* CREATE */}

            <button
              className="quick-action"
              onClick={() =>
                navigate("/create-quiz")
              }
            >

              <div className="quick-action-icon purple">
                <Plus size={20} />
              </div>

              <div>

                <strong>
                  Create Quiz
                </strong>

                <span>
                  Add a new quiz
                </span>

              </div>

              <ArrowRight size={16} />

            </button>


            {/* MANAGE */}

            <button
              className="quick-action"
              onClick={() =>
                navigate("/manage-quizzes")
              }
            >

              <div className="quick-action-icon blue">
                <FileQuestion size={20} />
              </div>

              <div>

                <strong>
                  Manage Quizzes
                </strong>

                <span>
                  Edit your quizzes
                </span>

              </div>

              <ArrowRight size={16} />

            </button>


            {/* RESULTS */}

            <button
              className="quick-action"
              onClick={() =>
                navigate("/staff-results")
              }
            >

              <div className="quick-action-icon green">
                <BarChart3 size={20} />
              </div>

              <div>

                <strong>
                  View Results
                </strong>

                <span>
                  Check student results
                </span>

              </div>

              <ArrowRight size={16} />

            </button>


            {/* CALENDAR */}

            <button
              className="quick-action"
              onClick={() =>
                alert(
                  "Calendar functionality can be added later."
                )
              }
            >

              <div className="quick-action-icon orange">
                <CalendarDays size={20} />
              </div>

              <div>

                <strong>
                  Schedule
                </strong>

                <span>
                  Plan your quizzes
                </span>

              </div>

              <ArrowRight size={16} />

            </button>

          </div>

        </div>

      </div>


      {/* =====================================
          DASHBOARD FOOTER
      ===================================== */}

      <div className="dashboard-footer">

        <span>
          QuizMaster Staff Panel
        </span>

        <button
          onClick={refreshDashboard}
        >
          Refresh Dashboard
        </button>

      </div>

    </div>
  );
}

export default StaffDashboard;
import React, { useEffect, useState } from "react";
import {
  FileQuestion,
  Trophy,
  Target,
  Clock,
  Play,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  CalendarDays,
  Award,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import "./StudentDashboard.css";

function StudentDashboard() {
  const navigate = useNavigate();

  const [results, setResults] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  // =========================================
  // LOAD DATA
  // =========================================

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    // Load student results
    const savedResults =
      localStorage.getItem("quizResults");

    if (savedResults) {
      try {
        setResults(JSON.parse(savedResults));
      } catch (error) {
        console.error(
          "Error loading quiz results:",
          error
        );

        setResults([]);
      }
    } else {
      setResults([]);
    }

    // Load quizzes created by staff
    const savedQuizzes =
      localStorage.getItem("quizzes");

    if (savedQuizzes) {
      try {
        setQuizzes(JSON.parse(savedQuizzes));
      } catch (error) {
        console.error(
          "Error loading quizzes:",
          error
        );

        setQuizzes([]);
      }
    } else {
      setQuizzes([]);
    }
  };


  // =========================================
  // ONLY RELEASED RESULTS
  // =========================================

  const releasedResults = results.filter(
    (result) => result.released === true
  );


  // =========================================
  // STATISTICS
  // =========================================

  const quizzesCompleted =
    results.length;

  const averageScore =
    results.length > 0
      ? results.reduce(
          (sum, result) =>
            sum + Number(result.score || 0),
          0
        ) / results.length
      : 0;

  const bestScore =
    results.length > 0
      ? Math.max(
          ...results.map((result) =>
            Number(result.score || 0)
          )
        )
      : 0;

  const bestQuiz =
    results.find(
      (result) =>
        Number(result.score || 0) === bestScore
    )?.quiz || "No quiz yet";


  // =========================================
  // PASSED / FAILED
  // =========================================

  const passedCount = results.filter(
    (result) =>
      Number(result.score || 0) >= 50
  ).length;

  const failedCount =
    results.length - passedCount;


  // =========================================
  // TIME SPENT
  // =========================================

  const parseTime = (time) => {
    if (!time) return 0;

    const value = parseFloat(time);

    return isNaN(value) ? 0 : value;
  };

  const totalMinutes = results.reduce(
    (total, result) =>
      total + parseTime(result.time),
    0
  );

  const timeSpent =
    totalMinutes >= 60
      ? `${(totalMinutes / 60).toFixed(1)}h`
      : `${totalMinutes}m`;


  // =========================================
  // RECENT RESULTS
  // =========================================

  const recentResults = [...releasedResults]
    .reverse()
    .slice(0, 5);


  // =========================================
  // UPCOMING / AVAILABLE QUIZZES
  // =========================================

  const availableQuizzes = quizzes
    .filter(
      (quiz) =>
        quiz.status === "Published" ||
        quiz.status === "published"
    )
    .slice(0, 5);


  // =========================================
  // MONTHLY GOAL
  // =========================================

  const monthlyGoal = 25;

  const monthlyProgress = Math.min(
    (quizzesCompleted / monthlyGoal) * 100,
    100
  );

  const remainingQuizzes = Math.max(
    monthlyGoal - quizzesCompleted,
    0
  );


  // =========================================
  // REFRESH DASHBOARD
  // =========================================

  const refreshDashboard = () => {
    loadDashboardData();
  };


  return (
    <div className="student-dashboard">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="student-dashboard-header">

        <div>

          <h1>
            Student Dashboard
          </h1>

          <p>
            Welcome back! Ready to test your
            knowledge?
          </p>

        </div>


        <button
          className="browse-quizzes-btn"
          onClick={() =>
            navigate("/available-quizzes")
          }
        >

          <Play
            size={16}
            fill="currentColor"
          />

          Browse Quizzes

        </button>

      </div>


      {/* =====================================
          STAT CARDS
      ===================================== */}

      <div className="student-stat-grid">


        {/* COMPLETED */}

        <div className="student-stat-card">

          <div className="student-stat-icon purple">
            <FileQuestion size={22} />
          </div>

          <div>

            <span>
              Quizzes Completed
            </span>

            <h2>
              {quizzesCompleted}
            </h2>

            <small>
              {quizzesCompleted === 0
                ? "No quizzes completed"
                : "Total attempts"}
            </small>

          </div>

        </div>


        {/* AVERAGE */}

        <div className="student-stat-card">

          <div className="student-stat-icon blue">
            <Target size={22} />
          </div>

          <div>

            <span>
              Average Score
            </span>

            <h2>
              {averageScore.toFixed(1)}%
            </h2>

            <small>
              {results.length === 0
                ? "No results yet"
                : "Across all attempts"}
            </small>

          </div>

        </div>


        {/* BEST SCORE */}

        <div className="student-stat-card">

          <div className="student-stat-icon green">
            <Trophy size={22} />
          </div>

          <div>

            <span>
              Best Score
            </span>

            <h2>
              {bestScore}%
            </h2>

            <small>
              {bestQuiz}
            </small>

          </div>

        </div>


        {/* TIME */}

        <div className="student-stat-card">

          <div className="student-stat-icon orange">
            <Clock size={22} />
          </div>

          <div>

            <span>
              Time Spent
            </span>

            <h2>
              {timeSpent}
            </h2>

            <small>
              Total quiz time
            </small>

          </div>

        </div>

      </div>


      {/* =====================================
          MAIN GRID
      ===================================== */}

      <div className="student-main-grid">


        {/* ===================================
            RECENT QUIZZES
        =================================== */}

        <div className="student-panel">

          <div className="student-panel-header">

            <div>

              <h2>
                Recent Quizzes
              </h2>

              <p>
                Your released quiz results
              </p>

            </div>


            <button
              className="student-view-all"
              onClick={() =>
                navigate("/student-results")
              }
            >

              View All

              <ArrowRight size={14} />

            </button>

          </div>


          {recentResults.length > 0 ? (

            <div className="student-recent-list">

              {recentResults.map(
                (result) => (

                  <div
                    className="student-recent-item"
                    key={result.id}
                  >

                    <div className="recent-quiz-icon">

                      <FileQuestion
                        size={19}
                      />

                    </div>


                    <div className="recent-quiz-info">

                      <h3>
                        {result.quiz ||
                          "Untitled Quiz"}
                      </h3>

                      <div className="recent-quiz-meta">

                        <span>
                          {result.category ||
                            "General"}
                        </span>

                        <span>
                          •
                        </span>

                        <span>
                          {result.correct || 0}/
                          {result.total || 0}{" "}
                          Correct
                        </span>

                      </div>

                    </div>


                    <div className="recent-score">

                      <strong
                        className={
                          Number(
                            result.score || 0
                          ) >= 70
                            ? "score-good"
                            : "score-low"
                        }
                      >

                        {result.score || 0}%

                      </strong>

                      <span>
                        {result.date ||
                          "Recently"}
                      </span>

                    </div>


                    <CheckCircle2
                      size={18}
                      className="completed-icon"
                    />

                  </div>

                )
              )}

            </div>

          ) : (

            <div className="student-empty-state">

              <div className="student-empty-icon">

                <FileQuestion
                  size={28}
                />

              </div>

              <h3>
                No completed quizzes
              </h3>

              <p>
                Your released quiz results will
                appear here after you complete
                quizzes.
              </p>

              <button
                onClick={() =>
                  navigate(
                    "/available-quizzes"
                  )
                }
              >

                <Play
                  size={15}
                  fill="currentColor"
                />

                Browse Quizzes

              </button>

            </div>

          )}

        </div>


        {/* ===================================
            PERFORMANCE
        =================================== */}

        <div className="student-panel">

          <div className="student-panel-header">

            <div>

              <h2>
                My Performance
              </h2>

              <p>
                Your overall progress
              </p>

            </div>

            <TrendingUp
              size={21}
              className="performance-icon"
            />

          </div>


          <div className="performance-content">

            <div
              className="performance-circle"
              style={{
                background: `conic-gradient(
                  #6366f1 ${averageScore * 3.6}deg,
                  #eef2ff 0deg
                )`,
              }}
            >

              <div className="performance-circle-inner">

                <strong>
                  {averageScore.toFixed(1)}%
                </strong>

                <span>
                  Average
                </span>

              </div>

            </div>


            <div className="performance-details">

              <div className="performance-detail">

                <span>
                  Completed
                </span>

                <strong>
                  {quizzesCompleted}
                </strong>

              </div>


              <div className="performance-detail">

                <span>
                  Passed
                </span>

                <strong className="passed-text">
                  {passedCount}
                </strong>

              </div>


              <div className="performance-detail">

                <span>
                  Failed
                </span>

                <strong className="failed-text">
                  {failedCount}
                </strong>

              </div>

            </div>

          </div>


          {/* MONTHLY GOAL */}

          <div className="performance-progress">

            <div className="performance-progress-header">

              <span>
                Monthly Goal
              </span>

              <strong>
                {quizzesCompleted} /{" "}
                {monthlyGoal}
              </strong>

            </div>


            <div className="performance-bar">

              <div
                className="performance-fill"
                style={{
                  width: `${monthlyProgress}%`,
                }}
              />

            </div>


            <p>

              {remainingQuizzes > 0
                ? `Complete ${remainingQuizzes} more ${
                    remainingQuizzes === 1
                      ? "quiz"
                      : "quizzes"
                  } to reach your monthly goal.`
                : "🎉 Monthly goal completed!"}

            </p>

          </div>

        </div>

      </div>


      {/* =====================================
          BOTTOM GRID
      ===================================== */}

      <div className="student-bottom-grid">


        {/* ===================================
            AVAILABLE QUIZZES
        =================================== */}

        <div className="student-panel">

          <div className="student-panel-header">

            <div>

              <h2>
                Available Quizzes
              </h2>

              <p>
                Quizzes published by staff
              </p>

            </div>

            <CalendarDays
              size={21}
              className="calendar-icon"
            />

          </div>


          {availableQuizzes.length > 0 ? (

            <div className="upcoming-list">

              {availableQuizzes.map(
                (quiz, index) => (

                  <div
                    className="upcoming-item"
                    key={
                      quiz.id || index
                    }
                  >

                    <div className="upcoming-date">

                      <strong>
                        <FileQuestion
                          size={19}
                        />
                      </strong>

                      <span>
                        QUIZ
                      </span>

                    </div>


                    <div className="upcoming-info">

                      <h3>
                        {quiz.title ||
                          "Untitled Quiz"}
                      </h3>

                      <span>
                        {quiz.category ||
                          "General"}
                      </span>


                      <div className="upcoming-meta">

                        <span>

                          <FileQuestion
                            size={12}
                          />

                          {quiz.questionCount ||
                            quiz.questions?.length ||
                            0}{" "}
                          Questions

                        </span>


                        <span>

                          <Clock
                            size={12}
                          />

                          {quiz.duration ||
                            0}{" "}
                          min

                        </span>

                      </div>

                    </div>


                    <button
                      className="upcoming-start-btn"
                      onClick={() =>
                        navigate(
                          "/available-quizzes"
                        )
                      }
                    >

                      Start

                    </button>

                  </div>

                )
              )}

            </div>

          ) : (

            <div className="student-empty-state small">

              <div className="student-empty-icon">

                <CalendarDays
                  size={25}
                />

              </div>

              <h3>
                No quizzes available
              </h3>

              <p>
                Published quizzes will appear
                here when staff releases them.
              </p>

            </div>

          )}

        </div>


        {/* ===================================
            ACHIEVEMENTS
        =================================== */}

        <div className="student-panel">

          <div className="student-panel-header">

            <div>

              <h2>
                Achievements
              </h2>

              <p>
                Your latest accomplishments
              </p>

            </div>

            <Award
              size={21}
              className="award-icon"
            />

          </div>


          <div className="achievement-list">


            {/* QUIZ MASTER */}

            <div className="achievement-item">

              <div className="achievement-icon gold">
                <Trophy size={18} />
              </div>

              <div>

                <h3>
                  Quiz Master
                </h3>

                <p>

                  {quizzesCompleted >= 15
                    ? "Completed 15+ quizzes"
                    : `${quizzesCompleted}/15 quizzes completed`}

                </p>

              </div>

              <span>
                {quizzesCompleted >= 15
                  ? "🏆"
                  : "🔒"}
              </span>

            </div>


            {/* PERFECT SCORE */}

            <div className="achievement-item">

              <div className="achievement-icon green">
                <Target size={18} />
              </div>

              <div>

                <h3>
                  High Scorer
                </h3>

                <p>

                  {bestScore >= 90
                    ? "Scored above 90%"
                    : "Reach 90% in a quiz"}

                </p>

              </div>

              <span>
                {bestScore >= 90
                  ? "⭐"
                  : "🔒"}
              </span>

            </div>


            {/* FAST LEARNER */}

            <div className="achievement-item">

              <div className="achievement-icon blue">
                <TrendingUp size={18} />
              </div>

              <div>

                <h3>
                  Consistent Learner
                </h3>

                <p>

                  {quizzesCompleted >= 5
                    ? "Completed 5+ quizzes"
                    : `${quizzesCompleted}/5 quizzes completed`}

                </p>

              </div>

              <span>
                {quizzesCompleted >= 5
                  ? "🚀"
                  : "🔒"}
              </span>

            </div>

          </div>


          <button
            className="all-achievements-btn"
            onClick={() =>
              navigate("/student-results")
            }
          >

            View My Results

            <ArrowRight size={14} />

          </button>

        </div>

      </div>


      {/* =====================================
          REFRESH
      ===================================== */}

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "20px",
        }}
      >

        <button
          onClick={refreshDashboard}
          style={{
            border: "none",
            background: "transparent",
            color: "#6366f1",
            fontSize: "11px",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          Refresh Dashboard
        </button>

      </div>

    </div>
  );
}

export default StudentDashboard;
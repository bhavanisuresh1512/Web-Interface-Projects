import React, { useEffect, useState } from "react";
import {
  Trophy,
  FileQuestion,
  Clock,
  CheckCircle2,
  Lock,
  Eye,
  Search,
  CalendarDays,
  BarChart3,
} from "lucide-react";

import "./StudentResults.css";

function StudentResults() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  /* =========================================
     LOAD RESULTS
  ========================================= */

  useEffect(() => {
    const savedResults = localStorage.getItem("quizResults");

    if (savedResults) {
      try {
        setResults(JSON.parse(savedResults));
      } catch (error) {
        console.error("Unable to load quiz results:", error);
        setResults([]);
      }
    } else {
      setResults([]);
    }
  }, []);

  /* =========================================
     RELEASED RESULTS
  ========================================= */

  const releasedResults = results.filter(
    (result) => result.released === true
  );

  /* =========================================
     STATISTICS
  ========================================= */

  const averageScore =
    releasedResults.length > 0
      ? releasedResults.reduce(
          (sum, result) => sum + Number(result.score || 0),
          0
        ) / releasedResults.length
      : 0;

  const highestScore =
    releasedResults.length > 0
      ? Math.max(
          ...releasedResults.map((result) =>
            Number(result.score || 0)
          )
        )
      : 0;

  /* =========================================
     SEARCH
  ========================================= */

  const filteredResults = results.filter((result) => {
    const quizName = result.quiz || result.title || "";

    return quizName
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  /* =========================================
     VIEW RESULT
  ========================================= */

  const viewResult = (result) => {
    if (!result.released) {
      alert(
        "This result has not been released by the staff yet."
      );
      return;
    }

    alert(
      `Quiz: ${result.quiz || result.title}\n\n` +
        `Score: ${result.score}%\n` +
        `Correct: ${result.correct}/${result.total}\n` +
        `Time: ${result.time || "Not available"}`
    );
  };

  /* =========================================
     FORMAT DATE
  ========================================= */

  const formatDate = (date) => {
    if (!date) return "Date not available";

    return date;
  };

  return (
    <div className="student-results">

      {/* =========================================
          HEADER
      ========================================= */}

      <div className="student-results-header">

        <div>
          <h1>My Results</h1>

          <p>
            View your quiz performance and released results.
          </p>
        </div>

      </div>


      {/* =========================================
          NOTICE
      ========================================= */}

      <div className="result-notice">

        <div className="result-notice-icon">
          <Lock size={19} />
        </div>

        <div>
          <strong>
            Results are controlled by staff
          </strong>

          <p>
            Your score will only be visible after
            the staff member releases your result.
          </p>
        </div>

      </div>


      {/* =========================================
          STATISTICS
      ========================================= */}

      <div className="student-result-stats">

        {/* QUIZZES TAKEN */}

        <div className="student-result-stat">

          <div className="student-result-stat-icon purple">
            <FileQuestion size={20} />
          </div>

          <div>
            <span>Quizzes Taken</span>

            <h2>
              {results.length}
            </h2>
          </div>

        </div>


        {/* RELEASED */}

        <div className="student-result-stat">

          <div className="student-result-stat-icon green">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <span>Results Released</span>

            <h2>
              {releasedResults.length}
            </h2>
          </div>

        </div>


        {/* AVERAGE */}

        <div className="student-result-stat">

          <div className="student-result-stat-icon blue">
            <BarChart3 size={20} />
          </div>

          <div>
            <span>Average Score</span>

            <h2>
              {averageScore.toFixed(1)}%
            </h2>
          </div>

        </div>


        {/* HIGHEST */}

        <div className="student-result-stat">

          <div className="student-result-stat-icon orange">
            <Trophy size={20} />
          </div>

          <div>
            <span>Highest Score</span>

            <h2>
              {highestScore}%
            </h2>
          </div>

        </div>

      </div>


      {/* =========================================
          SEARCH
      ========================================= */}

      <div className="student-results-toolbar">

        <div className="student-results-search">

          <Search size={17} />

          <input
            type="text"
            placeholder="Search your quiz results..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

      </div>


      {/* =========================================
          RESULTS
      ========================================= */}

      <div className="student-results-list">

        {filteredResults.length > 0 ? (

          filteredResults.map((result) => {

            const quizName =
              result.quiz || result.title || "Untitled Quiz";

            const total =
              Number(result.total) ||
              Number(result.questions) ||
              0;

            const correct =
              Number(result.correct) || 0;

            const score =
              Number(result.score) || 0;

            return (

              <div
                className={`student-result-card ${
                  !result.released
                    ? "result-locked"
                    : ""
                }`}
                key={result.id}
              >

                {/* =================================
                    ICON
                ================================= */}

                <div
                  className={`student-result-icon ${
                    result.released
                      ? "released-icon"
                      : "locked-icon"
                  }`}
                >

                  {result.released ? (
                    <FileQuestion size={22} />
                  ) : (
                    <Lock size={21} />
                  )}

                </div>


                {/* =================================
                    INFORMATION
                ================================= */}

                <div className="student-result-info">

                  <div className="student-result-title-row">

                    <h2>
                      {quizName}
                    </h2>

                    {result.released ? (

                      <span className="released-badge">

                        <CheckCircle2 size={11} />

                        Result Released

                      </span>

                    ) : (

                      <span className="pending-badge">

                        <Lock size={11} />

                        Result Pending

                      </span>

                    )}

                  </div>


                  <p>
                    {result.category ||
                      "Quiz"}
                  </p>


                  <div className="student-result-meta">

                    <span>

                      <CalendarDays size={13} />

                      {formatDate(
                        result.date
                      )}

                    </span>


                    <span>

                      <FileQuestion size={13} />

                      {total} Questions

                    </span>


                    <span>

                      <Clock size={13} />

                      {result.released
                        ? result.time ||
                          "Not available"
                        : "--"}

                    </span>

                  </div>

                </div>


                {/* =================================
                    RELEASED RESULT
                ================================= */}

                {result.released ? (

                  <>

                    <div className="student-score">

                      <strong>
                        {score}%
                      </strong>

                      <span>
                        {correct}/{total} correct
                      </span>

                    </div>


                    <div className="student-result-progress">

                      <div className="student-progress-track">

                        <div
                          className="student-progress-fill"
                          style={{
                            width: `${score}%`,
                          }}
                        ></div>

                      </div>

                    </div>


                    <button
                      className="student-view-result-btn"
                      onClick={() =>
                        viewResult(result)
                      }
                    >

                      <Eye size={15} />

                      View

                    </button>

                  </>

                ) : (

                  /* =================================
                     LOCKED RESULT
                  ================================= */

                  <div className="restricted-result">

                    <Lock size={17} />

                    <div>

                      <strong>
                        Restricted
                      </strong>

                      <span>
                        Waiting for staff
                      </span>

                    </div>

                  </div>

                )}

              </div>

            );
          })

        ) : (

          /* =================================
             EMPTY STATE
          ================================= */

          <div className="student-no-results">

            {search ? (
              <Search size={30} />
            ) : (
              <FileQuestion size={30} />
            )}

            <h2>
              {search
                ? "No results found"
                : "No quiz results yet"}
            </h2>

            <p>
              {search
                ? "Try searching for another quiz."
                : "Your completed quizzes will appear here."}
            </p>

          </div>

        )}

      </div>


      {/* =========================================
          FOOTER
      ========================================= */}

      <div className="result-footer-message">

        <Lock size={15} />

        <span>
          Unreleased results remain hidden until
          your staff member publishes them.
        </span>

      </div>

    </div>
  );
}

export default StudentResults;
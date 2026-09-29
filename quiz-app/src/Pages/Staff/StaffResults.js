import React, { useEffect, useState } from "react";
import {
  Search,
  Download,
  Eye,
  Trophy,
  Users,
  BarChart3,
  CheckCircle2,
  Clock,
  ChevronDown,
  Lock,
  Unlock,
} from "lucide-react";

import "./StaffResults.css";

function StaffResults() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Quizzes");
  const [results, setResults] = useState([]);

  // =========================================
  // LOAD RESULTS FROM LOCAL STORAGE
  // =========================================

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = () => {
    const savedResults = localStorage.getItem("quizResults");

    if (savedResults) {
      try {
        setResults(JSON.parse(savedResults));
      } catch (error) {
        console.error("Error loading results:", error);
        setResults([]);
      }
    } else {
      setResults([]);
    }
  };

  // =========================================
  // SAVE RESULTS
  // =========================================

  const saveResults = (updatedResults) => {
    setResults(updatedResults);

    localStorage.setItem(
      "quizResults",
      JSON.stringify(updatedResults)
    );
  };

  // =========================================
  // RELEASE / HIDE RESULT
  // =========================================

  const toggleRelease = (id) => {
    const updatedResults = results.map((result) => {
      if (result.id === id) {
        return {
          ...result,
          released: !result.released,
        };
      }

      return result;
    });

    saveResults(updatedResults);
  };

  // =========================================
  // SEARCH + FILTER
  // =========================================

  const filteredResults = results.filter((result) => {
    const studentName = result.student || "";
    const quizName = result.quiz || "";

    const matchesSearch =
      studentName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      quizName
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All Quizzes" ||
      quizName === filter;

    return matchesSearch && matchesFilter;
  });

  // =========================================
  // UNIQUE QUIZZES
  // =========================================

  const quizNames = [
    ...new Set(
      results.map((result) => result.quiz)
    ),
  ];

  // =========================================
  // STATISTICS
  // =========================================

  const totalAttempts = results.length;

  const averageScore =
    results.length > 0
      ? results.reduce(
          (sum, result) =>
            sum + Number(result.score || 0),
          0
        ) / results.length
      : 0;

  const releasedCount = results.filter(
    (result) => result.released === true
  ).length;

  const pendingCount = results.filter(
    (result) => result.released !== true
  ).length;

  const passedCount = results.filter(
    (result) =>
      result.status === "Passed" ||
      Number(result.score || 0) >= 50
  ).length;

  const highestScore =
    results.length > 0
      ? Math.max(
          ...results.map((result) =>
            Number(result.score || 0)
          )
        )
      : 0;

  const highestStudent =
    results.find(
      (result) =>
        Number(result.score || 0) === highestScore
    )?.student || "-";

  // =========================================
  // VIEW RESULT
  // =========================================

  const viewResult = (result) => {
    if (!result.released) {
      alert(
        `Result for ${result.student} has not been released yet.`
      );

      return;
    }

    alert(
      `${result.student}\n\n` +
        `${result.quiz}\n` +
        `Score: ${result.score}%\n` +
        `Correct: ${result.correct}/${result.total}\n` +
        `Time: ${result.time || "Not available"}`
    );
  };

  // =========================================
  // EXPORT RESULTS
  // =========================================

  const exportResults = () => {
    if (results.length === 0) {
      alert("There are no results to export.");

      return;
    }

    const headers = [
      "Student",
      "Quiz",
      "Category",
      "Score",
      "Correct",
      "Total",
      "Time",
      "Date",
      "Status",
      "Released",
    ];

    const rows = results.map((result) => [
      result.student || "",
      result.quiz || "",
      result.category || "",
      result.score || 0,
      result.correct || 0,
      result.total || 0,
      result.time || "",
      result.date || "",
      result.status || "",
      result.released ? "Yes" : "No",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((value) => `"${value}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "quiz-results.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="staff-results">

      {/* =========================
          HEADER
      ========================= */}

      <div className="staff-results-header">

        <div>
          <h1>Quiz Results</h1>

          <p>
            Monitor student performance and control
            when results are released.
          </p>
        </div>

        <button
          className="export-results-btn"
          onClick={exportResults}
        >
          <Download size={17} />

          Export Results
        </button>

      </div>


      {/* =========================
          RELEASE INFORMATION
      ========================= */}

      <div className="release-information">

        <div className="release-information-icon">
          <Lock size={18} />
        </div>

        <div>
          <strong>
            Result Release Control
          </strong>

          <p>
            Students can only see their score after
            you release the result.
          </p>
        </div>

      </div>


      {/* =========================
          STATISTICS
      ========================= */}

      <div className="results-stat-grid">

        <div className="results-stat-card">

          <div className="results-stat-icon purple">
            <Users size={21} />
          </div>

          <div>
            <span>Total Attempts</span>

            <h2>
              {totalAttempts}
            </h2>

            <small>
              Student quiz attempts
            </small>
          </div>

        </div>


        <div className="results-stat-card">

          <div className="results-stat-icon blue">
            <BarChart3 size={21} />
          </div>

          <div>
            <span>Average Score</span>

            <h2>
              {averageScore.toFixed(1)}%
            </h2>

            <small>
              Across all attempts
            </small>
          </div>

        </div>


        <div className="results-stat-card">

          <div className="results-stat-icon green">
            <CheckCircle2 size={21} />
          </div>

          <div>
            <span>Released Results</span>

            <h2>
              {releasedCount}
            </h2>

            <small>
              {pendingCount} pending
            </small>
          </div>

        </div>


        <div className="results-stat-card">

          <div className="results-stat-icon orange">
            <Trophy size={21} />
          </div>

          <div>
            <span>Highest Score</span>

            <h2>
              {highestScore}%
            </h2>

            <small>
              {highestStudent}
            </small>
          </div>

        </div>

      </div>


      {/* =========================
          RESULTS PANEL
      ========================= */}

      <div className="results-panel">

        {/* TOOLBAR */}

        <div className="results-toolbar">

          <div className="results-search">

            <Search size={17} />

            <input
              type="text"
              placeholder="Search student or quiz..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          <div className="results-filter">

            <ChevronDown size={15} />

            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value)
              }
            >

              <option>
                All Quizzes
              </option>

              {quizNames.map((quizName) => (
                <option
                  key={quizName}
                  value={quizName}
                >
                  {quizName}
                </option>
              ))}

            </select>

          </div>

        </div>


        {/* =========================
            TABLE
        ========================= */}

        <div className="results-table-wrapper">

          <table className="results-table">

            <thead>

              <tr>
                <th>STUDENT</th>
                <th>QUIZ</th>
                <th>SCORE</th>
                <th>CORRECT</th>
                <th>TIME TAKEN</th>
                <th>DATE</th>
                <th>RELEASE</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>

            </thead>


            <tbody>

              {filteredResults.length > 0 ? (

                filteredResults.map((result) => (

                  <tr key={result.id}>

                    {/* STUDENT */}

                    <td>

                      <div className="result-student">

                        <div className="result-avatar">
                          {result.initials ||
                            (result.student || "S")
                              .split(" ")
                              .map(
                                (name) =>
                                  name[0]
                              )
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()}
                        </div>

                        <div>

                          <strong>
                            {result.student ||
                              "Unknown Student"}
                          </strong>

                          <span>
                            Student
                          </span>

                        </div>

                      </div>

                    </td>


                    {/* QUIZ */}

                    <td>

                      <div className="result-quiz">

                        <strong>
                          {result.quiz ||
                            "Untitled Quiz"}
                        </strong>

                        <span>
                          {result.category ||
                            "General"}
                        </span>

                      </div>

                    </td>


                    {/* SCORE */}

                    <td>

                      <div className="score-container">

                        <strong
                          className={
                            Number(result.score) >= 70
                              ? "good-score"
                              : "low-score"
                          }
                        >
                          {result.score || 0}%
                        </strong>

                        <div className="mini-progress">

                          <div
                            className={
                              Number(result.score) >= 70
                                ? "mini-progress-fill good"
                                : "mini-progress-fill low"
                            }
                            style={{
                              width: `${Number(
                                result.score || 0
                              )}%`,
                            }}
                          />

                        </div>

                      </div>

                    </td>


                    {/* CORRECT */}

                    <td>

                      <span className="correct-answer">
                        {result.correct || 0}/
                        {result.total || 0}
                      </span>

                    </td>


                    {/* TIME */}

                    <td>

                      <div className="time-taken">

                        <Clock size={13} />

                        {result.time ||
                          "Not available"}

                      </div>

                    </td>


                    {/* DATE */}

                    <td>

                      <span className="result-date">
                        {result.date ||
                          "Not available"}
                      </span>

                    </td>


                    {/* RELEASE */}

                    <td>

                      <button
                        className={
                          result.released
                            ? "release-result-btn released"
                            : "release-result-btn pending"
                        }
                        onClick={() =>
                          toggleRelease(result.id)
                        }
                      >

                        {result.released ? (
                          <>
                            <Unlock size={13} />

                            Released
                          </>
                        ) : (
                          <>
                            <Lock size={13} />

                            Release
                          </>
                        )}

                      </button>

                    </td>


                    {/* STATUS */}

                    <td>

                      <span
                        className={`result-status ${
                          result.status === "Passed" ||
                          Number(result.score || 0) >= 50
                            ? "passed"
                            : "failed"
                        }`}
                      >
                        {result.status ||
                          (Number(result.score || 0) >= 50
                            ? "Passed"
                            : "Failed")}
                      </span>

                    </td>


                    {/* ACTION */}

                    <td>

                      <button
                        className={
                          result.released
                            ? "view-result-btn"
                            : "view-result-btn disabled"
                        }
                        title={
                          result.released
                            ? "View Result"
                            : "Result Not Released"
                        }
                        onClick={() =>
                          viewResult(result)
                        }
                      >

                        {result.released ? (
                          <Eye size={16} />
                        ) : (
                          <Lock size={16} />
                        )}

                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="9"
                    className="no-results"
                  >

                    <div className="no-results-content">

                      <div className="no-results-icon">
                        <BarChart3 size={28} />
                      </div>

                      <strong>
                        No quiz results yet
                      </strong>

                      <span>
                        Student attempts will appear
                        here after they complete a quiz.
                      </span>

                    </div>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>


        {/* =========================
            FOOTER
        ========================= */}

        <div className="results-footer">

          <span>
            Showing {filteredResults.length} of{" "}
            {results.length} results
          </span>

        </div>

      </div>

    </div>
  );
}

export default StaffResults;
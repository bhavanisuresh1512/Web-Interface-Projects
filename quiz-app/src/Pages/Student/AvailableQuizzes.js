import React, { useEffect, useState } from "react";
import {
  Search,
  Clock,
  FileQuestion,
  Users,
  Play,
  Filter,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./AvailableQuizzes.css";

function AvailableQuizzes() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [quizzes, setQuizzes] = useState([]);

  /* =========================================
     LOAD QUIZZES CREATED BY STAFF
  ========================================= */

  useEffect(() => {
    loadQuizzes();

    // Update page if another tab/window changes quizzes
    const handleStorageChange = () => {
      loadQuizzes();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener(
        "storage",
        handleStorageChange
      );
    };
  }, []);

  const loadQuizzes = () => {
    const savedQuizzes =
      JSON.parse(
        localStorage.getItem("quizzes")
      ) || [];

    setQuizzes(savedQuizzes);
  };

  /* =========================================
     SEARCH + CATEGORY FILTER
  ========================================= */

  const filteredQuizzes = quizzes.filter((quiz) => {
    const title =
      quiz.title ||
      quiz.name ||
      "";

    const description =
      quiz.description ||
      "";

    const quizCategory =
      quiz.category ||
      "General";

    const matchesSearch =
      title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      description
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "All Categories" ||
      quizCategory === category;

    return (
      matchesSearch &&
      matchesCategory
    );
  });

  /* =========================================
     START QUIZ
  ========================================= */

  const handleStartQuiz = (quiz) => {
    navigate("/take-quiz", {
      state: {
        quiz: quiz,
      },
    });
  };

  /* =========================================
     CATEGORY LIST
  ========================================= */

  const categories = [
    "All Categories",
    ...new Set(
      quizzes.map(
        (quiz) =>
          quiz.category || "General"
      )
    ),
  ];

  return (
    <div className="available-quizzes">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="available-header">

        <div>
          <span className="page-label">
            STUDENT PORTAL
          </span>

          <h1>Available Quizzes</h1>

          <p>
            Choose a quiz created by your staff
            and test your knowledge.
          </p>
        </div>

        <div className="quiz-count">
          <FileQuestion size={18} />

          <span>
            {filteredQuizzes.length}{" "}
            {filteredQuizzes.length === 1
              ? "Quiz"
              : "Quizzes"}{" "}
            Available
          </span>
        </div>

      </div>


      {/* =====================================
          SEARCH + FILTER
      ===================================== */}

      {quizzes.length > 0 && (
        <div className="quiz-controls">

          <div className="quiz-search">

            <Search size={17} />

            <input
              type="text"
              placeholder="Search quizzes..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          <div className="quiz-category-filter">

            <Filter size={15} />

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >

              {categories.map(
                (item, index) => (
                  <option
                    key={index}
                    value={item}
                  >
                    {item}
                  </option>
                )
              )}

            </select>

          </div>

        </div>
      )}


      {/* =====================================
          QUIZ CARDS
      ===================================== */}

      {filteredQuizzes.length > 0 ? (

        <div className="available-quiz-grid">

          {filteredQuizzes.map(
            (quiz, index) => {

              const title =
                quiz.title ||
                quiz.name ||
                "Untitled Quiz";

              const description =
                quiz.description ||
                "Test your knowledge with this quiz.";

              const quizCategory =
                quiz.category ||
                "General";

              const questions =
                quiz.questions?.length ||
                quiz.questionCount ||
                quiz.questionsCount ||
                0;

              const duration =
                quiz.duration ||
                quiz.timeLimit ||
                "30 min";

              const difficulty =
                quiz.difficulty ||
                "Medium";

              return (
                <div
                  className="available-quiz-card"
                  key={
                    quiz.id ||
                    `${title}-${index}`
                  }
                >

                  {/* CARD TOP */}

                  <div className="quiz-card-top">

                    <div
                      className={`quiz-card-icon ${
                        index % 6 === 0
                          ? "purple"
                          : index % 6 === 1
                          ? "blue"
                          : index % 6 === 2
                          ? "green"
                          : index % 6 === 3
                          ? "orange"
                          : index % 6 === 4
                          ? "cyan"
                          : "pink"
                      }`}
                    >
                      <FileQuestion
                        size={23}
                      />
                    </div>


                    <span
                      className={`difficulty ${difficulty.toLowerCase()}`}
                    >
                      {difficulty}
                    </span>

                  </div>


                  {/* CONTENT */}

                  <div className="quiz-card-content">

                    <span className="quiz-category">
                      {quizCategory}
                    </span>

                    <h2>
                      {title}
                    </h2>

                    <p>
                      {description}
                    </p>

                  </div>


                  {/* RATING */}

                  <div className="quiz-rating">

                    <div className="rating-stars">

                      <Star
                        size={14}
                        fill="currentColor"
                      />

                      <span>
                        {quiz.rating ||
                          "New"}
                      </span>

                    </div>

                    <span>
                      {quiz.attempts || 0}{" "}
                      attempts
                    </span>

                  </div>


                  {/* INFORMATION */}

                  <div className="quiz-card-info">

                    <div>

                      <FileQuestion
                        size={15}
                      />

                      <span>
                        {questions} Questions
                      </span>

                    </div>


                    <div>

                      <Clock
                        size={15}
                      />

                      <span>
                        {duration}
                      </span>

                    </div>


                    <div>

                      <Users
                        size={15}
                      />

                      <span>
                        {quiz.attempts || 0}
                      </span>

                    </div>

                  </div>


                  {/* START BUTTON */}

                  <button
                    className="start-quiz-btn"
                    onClick={() =>
                      handleStartQuiz(
                        quiz
                      )
                    }
                  >

                    <Play
                      size={16}
                      fill="currentColor"
                    />

                    Start Quiz

                  </button>

                </div>
              );
            }
          )}

        </div>

      ) : (

        /* =================================
           EMPTY STATE
        ================================= */

        <div className="no-quizzes">

          <div className="no-quizzes-icon">
            <FileQuestion
              size={38}
            />
          </div>

          {quizzes.length === 0 ? (
            <>
              <h2>
                No quizzes available
              </h2>

              <p>
                Staff hasn't created any
                quizzes yet. New quizzes will
                appear here when they are
                created.
              </p>
            </>
          ) : (
            <>
              <h2>
                No quizzes found
              </h2>

              <p>
                Try changing your search or
                category filter.
              </p>
            </>
          )}

        </div>

      )}

    </div>
  );
}

export default AvailableQuizzes;
import React, { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  Eye,
  MoreVertical,
  Clock,
  FileQuestion,
  Users,
  CheckCircle2,
  XCircle,
  BarChart3,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import "./ManageQuizzes.css";

function ManageQuizzes() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // =========================================
  // LOAD SAVED QUIZZES
  // =========================================

  const [quizzes, setQuizzes] = useState(() => {
    const savedQuizzes = localStorage.getItem("quizzes");

    return savedQuizzes
      ? JSON.parse(savedQuizzes)
      : [];
  });


  // =========================================
  // SAVE QUIZZES WHENEVER THEY CHANGE
  // =========================================

  useEffect(() => {
    localStorage.setItem(
      "quizzes",
      JSON.stringify(quizzes)
    );
  }, [quizzes]);


  // =========================================
  // DELETE QUIZ
  // =========================================

  const deleteQuiz = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this quiz?"
    );

    if (!confirmDelete) {
      return;
    }

    const updatedQuizzes = quizzes.filter(
      (quiz) => quiz.id !== id
    );

    setQuizzes(updatedQuizzes);
  };


  // =========================================
  // CHANGE PUBLISH STATUS
  // =========================================

  const toggleStatus = (id) => {
    const updatedQuizzes = quizzes.map(
      (quiz) =>
        quiz.id === id
          ? {
              ...quiz,
              status:
                quiz.status === "Published"
                  ? "Draft"
                  : "Published",
            }
          : quiz
    );

    setQuizzes(updatedQuizzes);
  };


  // =========================================
  // FILTER QUIZZES
  // =========================================

  const filteredQuizzes = quizzes.filter(
    (quiz) => {
      const matchesSearch =
        quiz.title
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        quiz.category
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" ||
        quiz.category === categoryFilter;

      const matchesStatus =
        statusFilter === "All" ||
        quiz.status === statusFilter;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    }
  );


  // =========================================
  // CATEGORY LIST
  // =========================================

  const categories = [
    ...new Set(
      quizzes
        .map((quiz) => quiz.category)
        .filter(Boolean)
    ),
  ];


  return (
    <div className="manage-quizzes-page">


      {/* =====================================
          HEADER
      ===================================== */}

      <div className="manage-header">

        <div>

          <h1>
            Manage Quizzes
          </h1>

          <p>
            Create, manage and monitor all your
            quizzes
          </p>

        </div>


        <button
          className="create-quiz-btn"
          onClick={() =>
            navigate("/create-quiz")
          }
        >

          <Plus size={19} />

          Create Quiz

        </button>

      </div>



      {/* =====================================
          STATISTICS
      ===================================== */}

      <div className="quiz-stats">


        {/* TOTAL */}

        <div className="quiz-stat-card">

          <div className="stat-icon purple">
            <FileQuestion size={21} />
          </div>

          <div>

            <span>
              Total Quizzes
            </span>

            <strong>
              {quizzes.length}
            </strong>

          </div>

        </div>


        {/* PUBLISHED */}

        <div className="quiz-stat-card">

          <div className="stat-icon green">
            <CheckCircle2 size={21} />
          </div>

          <div>

            <span>
              Published
            </span>

            <strong>
              {
                quizzes.filter(
                  (quiz) =>
                    quiz.status ===
                    "Published"
                ).length
              }
            </strong>

          </div>

        </div>


        {/* DRAFT */}

        <div className="quiz-stat-card">

          <div className="stat-icon orange">
            <Edit3 size={21} />
          </div>

          <div>

            <span>
              Drafts
            </span>

            <strong>
              {
                quizzes.filter(
                  (quiz) =>
                    quiz.status === "Draft"
                ).length
              }
            </strong>

          </div>

        </div>


        {/* ATTEMPTS */}

        <div className="quiz-stat-card">

          <div className="stat-icon blue">
            <Users size={21} />
          </div>

          <div>

            <span>
              Total Attempts
            </span>

            <strong>
              {quizzes.reduce(
                (total, quiz) =>
                  total +
                  (quiz.participants || 0),
                0
              )}
            </strong>

          </div>

        </div>

      </div>



      {/* =====================================
          FILTER BAR
      ===================================== */}

      <div className="filter-bar">


        {/* SEARCH */}

        <div className="search-box">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search quizzes..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

        </div>


        {/* CATEGORY */}

        <div className="filter-select">

          <Filter size={16} />

          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(
                e.target.value
              )
            }
          >

            <option value="All">
              All Categories
            </option>

            {categories.map(
              (category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              )
            )}

          </select>

        </div>


        {/* STATUS */}

        <select
          className="status-filter"
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
        >

          <option value="All">
            All Status
          </option>

          <option value="Published">
            Published
          </option>

          <option value="Draft">
            Draft
          </option>

        </select>

      </div>



      {/* =====================================
          QUIZ LIST HEADER
      ===================================== */}

      <div className="quiz-list-header">

        <div>

          <h2>
            All Quizzes
          </h2>

          <span>
            {filteredQuizzes.length}{" "}
            {filteredQuizzes.length === 1
              ? "quiz"
              : "quizzes"}{" "}
            found
          </span>

        </div>

      </div>



      {/* =====================================
          QUIZ LIST
      ===================================== */}

      <div className="quiz-grid">

        {filteredQuizzes.length > 0 ? (

          filteredQuizzes.map(
            (quiz) => (

              <div
                className="quiz-card"
                key={quiz.id}
              >


                {/* CARD TOP */}

                <div className="quiz-card-top">

                  <div
                    className={`category-icon ${
                      quiz.category ===
                      "Programming"
                        ? "programming"
                        : quiz.category ===
                          "Web Development"
                        ? "web"
                        : quiz.category ===
                          "AI & ML"
                        ? "ai"
                        : quiz.category ===
                          "Database"
                        ? "database"
                        : "data"
                    }`}
                  >

                    <FileQuestion
                      size={21}
                    />

                  </div>


                  <div className="quiz-actions">

                    <button
                      title="View"
                      onClick={() =>
                        navigate(
                          `/take-quiz?id=${quiz.id}`
                        )
                      }
                    >
                      <Eye size={17} />
                    </button>


                    <button
                      title="Edit"
                      onClick={() =>
                        alert(
                          "Edit functionality will be added next."
                        )
                      }
                    >
                      <Edit3 size={17} />
                    </button>


                    <button
                      title="More"
                    >
                      <MoreVertical
                        size={17}
                      />
                    </button>

                  </div>

                </div>



                {/* CARD CONTENT */}

                <div className="quiz-card-content">


                  <div className="quiz-title-row">

                    <h3>
                      {quiz.title}
                    </h3>


                    <span
                      className={`status-badge ${
                        quiz.status ===
                        "Published"
                          ? "published"
                          : "draft"
                      }`}
                    >

                      {quiz.status ===
                      "Published" ? (
                        <CheckCircle2
                          size={12}
                        />
                      ) : (
                        <XCircle
                          size={12}
                        />
                      )}

                      {quiz.status}

                    </span>

                  </div>


                  <p>
                    {quiz.description}
                  </p>


                  {/* CATEGORY */}

                  <span className="category-label">
                    {quiz.category}
                  </span>


                  {/* INFORMATION */}

                  <div className="quiz-info">

                    <div>

                      <FileQuestion
                        size={15}
                      />

                      <span>
                        {
                          quiz.questionCount ||
                          quiz.questions?.length ||
                          0
                        }{" "}
                        Questions
                      </span>

                    </div>


                    <div>

                      <Clock size={15} />

                      <span>
                        {quiz.duration} mins
                      </span>

                    </div>


                    <div>

                      <Users size={15} />

                      <span>
                        {quiz.participants ||
                          0}{" "}
                        Attempts
                      </span>

                    </div>

                  </div>


                  {/* BOTTOM */}

                  <div className="quiz-card-bottom">

                    <div className="difficulty">

                      <span>
                        Difficulty
                      </span>

                      <strong
                        className={
                          (
                            quiz.difficulty ||
                            "Easy"
                          ).toLowerCase()
                        }
                      >
                        {quiz.difficulty ||
                          "Easy"}
                      </strong>

                    </div>


                    <span className="created-date">

                      {quiz.createdAt ||
                        quiz.created ||
                        "Today"}

                    </span>

                  </div>

                </div>



                {/* CARD FOOTER */}

                <div className="quiz-card-footer">


                  <button
                    className="view-results"
                    onClick={() =>
                      navigate(
                        `/staff-results?quizId=${quiz.id}`
                      )
                    }
                  >

                    <BarChart3 size={15} />

                    View Results

                  </button>


                  <div className="footer-actions">


                    <button
                      className={
                        quiz.status ===
                        "Published"
                          ? "unpublish"
                          : "publish"
                      }
                      onClick={() =>
                        toggleStatus(
                          quiz.id
                        )
                      }
                    >

                      {quiz.status ===
                      "Published"
                        ? "Unpublish"
                        : "Publish"}

                    </button>


                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteQuiz(
                          quiz.id
                        )
                      }
                    >

                      <Trash2 size={15} />

                    </button>

                  </div>

                </div>

              </div>

            )
          )

        ) : (

          /* =================================
             EMPTY STATE
          ================================= */

          <div className="no-quizzes">

            <div className="empty-icon">

              <FileQuestion
                size={34}
              />

            </div>


            <h3>
              No quizzes yet
            </h3>


            <p>
              You haven't created any quizzes.
              Create your first quiz to get
              started.
            </p>


            <button
              className="empty-create-btn"
              onClick={() =>
                navigate("/create-quiz")
              }
            >

              <Plus size={17} />

              Create Your First Quiz

            </button>

          </div>

        )}

      </div>

    </div>
  );
}

export default ManageQuizzes;
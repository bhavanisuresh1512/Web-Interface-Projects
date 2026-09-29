import React, { useEffect, useState } from "react";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Flag,
  Send,
  ArrowLeft,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import "./TakeQuiz.css";

function TakeQuiz() {
  const navigate = useNavigate();
  const location = useLocation();

  /* =========================================
     GET SELECTED QUIZ
  ========================================= */

  const [quiz, setQuiz] = useState(null);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [selectedAnswers, setSelectedAnswers] = useState({});

  const [timeLeft, setTimeLeft] = useState(30 * 60);

  const [showSubmitModal, setShowSubmitModal] =
    useState(false);

  const [submitted, setSubmitted] = useState(false);

  /* =========================================
     LOAD QUIZ FROM LOCAL STORAGE
  ========================================= */

  useEffect(() => {
    let selectedQuiz = null;

    /*
      If AvailableQuizzes sends the quiz through
      navigate("/take-quiz", { state: { quiz } })
    */

    if (location.state?.quiz) {
      selectedQuiz = location.state.quiz;
    }

    /*
      Otherwise try localStorage
    */

    if (!selectedQuiz) {
      const storedQuiz =
        localStorage.getItem("selectedQuiz");

      if (storedQuiz) {
        try {
          selectedQuiz = JSON.parse(storedQuiz);
        } catch (error) {
          console.error(
            "Unable to load selected quiz",
            error
          );
        }
      }
    }

    if (selectedQuiz) {
      setQuiz(selectedQuiz);

      /*
        Use quiz duration if it exists
      */

      const duration =
        Number(selectedQuiz.duration) || 30;

      setTimeLeft(duration * 60);
    }
  }, [location.state]);

  /* =========================================
     TIMER
  ========================================= */

  useEffect(() => {
    if (!quiz || submitted) return;

    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((previousTime) => previousTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted, quiz]);

  /* =========================================
     FORMAT TIMER
  ========================================= */

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);

    const seconds = timeLeft % 60;

    return `${minutes
      .toString()
      .padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  /* =========================================
     SELECT ANSWER
  ========================================= */

  const selectAnswer = (answer) => {
    setSelectedAnswers((previousAnswers) => ({
      ...previousAnswers,
      [currentQuestion]: answer,
    }));
  };

  /* =========================================
     NEXT QUESTION
  ========================================= */

  const nextQuestion = () => {
    if (
      quiz &&
      currentQuestion <
        quiz.questions.length - 1
    ) {
      setCurrentQuestion(
        (previousQuestion) =>
          previousQuestion + 1
      );
    }
  };

  /* =========================================
     PREVIOUS QUESTION
  ========================================= */

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(
        (previousQuestion) =>
          previousQuestion - 1
      );
    }
  };

  /* =========================================
     GO TO QUESTION
  ========================================= */

  const goToQuestion = (index) => {
    setCurrentQuestion(index);
  };

  /* =========================================
     CALCULATE SCORE
  ========================================= */

  const calculateScore = () => {
    if (!quiz) return 0;

    let score = 0;

    quiz.questions.forEach(
      (question, index) => {
        if (
          selectedAnswers[index] ===
          question.answer
        ) {
          score++;
        }
      }
    );

    return score;
  };

  /* =========================================
     SUBMIT QUIZ
  ========================================= */

  const handleSubmit = () => {
    if (!quiz) return;

    setShowSubmitModal(false);

    const score = calculateScore();

    const totalQuestions =
      quiz.questions.length;

    const percentage = Math.round(
      (score / totalQuestions) * 100
    );

    /*
      Create result object
    */

    const newResult = {
      id: Date.now(),

      quiz: quiz.title,

      category:
        quiz.category || "General",

      score: percentage,

      correct: score,

      total: totalQuestions,

      time: `${Math.floor(
        (quiz.duration * 60 - timeLeft) / 60
      )} min`,

      date: new Date().toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
          year: "numeric",
        }
      ),

      /*
        IMPORTANT:
        Student cannot see result until
        staff releases it.
      */

      released: false,
    };

    /*
      Get existing student results
    */

    const existingResults =
      JSON.parse(
        localStorage.getItem(
          "studentResults"
        )
      ) || [];

    /*
      Save new result
    */

    localStorage.setItem(
      "studentResults",
      JSON.stringify([
        ...existingResults,
        newResult,
      ])
    );

    setSubmitted(true);
  };

  /* =========================================
     NO QUIZ SELECTED
  ========================================= */

  if (!quiz) {
    return (
      <div className="take-quiz-page">

        <div className="quiz-result-card">

          <div className="quiz-result-icon">
            <AlertCircle size={45} />
          </div>

          <h1>No Quiz Selected</h1>

          <p>
            Please select a quiz from Available
            Quizzes before starting.
          </p>

          <button
            className="submit-quiz-btn"
            onClick={() =>
              navigate("/available-quizzes")
            }
          >
            <ArrowLeft size={16} />
            Back to Available Quizzes
          </button>

        </div>

      </div>
    );
  }

  const questions = quiz.questions || [];

  /* =========================================
     NO QUESTIONS
  ========================================= */

  if (questions.length === 0) {
    return (
      <div className="take-quiz-page">

        <div className="quiz-result-card">

          <div className="quiz-result-icon">
            <AlertCircle size={45} />
          </div>

          <h1>No Questions Available</h1>

          <p>
            This quiz does not contain any
            questions yet.
          </p>

          <button
            className="submit-quiz-btn"
            onClick={() =>
              navigate("/available-quizzes")
            }
          >
            <ArrowLeft size={16} />
            Back to Quizzes
          </button>

        </div>

      </div>
    );
  }

  const current = questions[currentQuestion];

  const answeredCount =
    Object.keys(selectedAnswers).length;

  const progress =
    ((currentQuestion + 1) /
      questions.length) *
    100;

  /* =========================================
     RESULT SCREEN
  ========================================= */

  if (submitted) {
    const score = calculateScore();

    const percentage = Math.round(
      (score / questions.length) * 100
    );

    return (
      <div className="take-quiz-page">

        <div className="quiz-result-card">

          <div className="quiz-result-icon">
            <CheckCircle2 size={48} />
          </div>

          <h1>Quiz Submitted!</h1>

          <p>
            Your answers have been submitted
            successfully.
          </p>

          <div className="final-score">

            <strong>{percentage}%</strong>

            <span>
              {score} out of{" "}
              {questions.length} correct
            </span>

          </div>

          <div className="result-summary">

            <div>
              <span>Questions</span>
              <strong>
                {questions.length}
              </strong>
            </div>

            <div>
              <span>Answered</span>
              <strong>
                {answeredCount}
              </strong>
            </div>

            <div>
              <span>Correct</span>
              <strong>{score}</strong>
            </div>

            <div>
              <span>Incorrect</span>
              <strong>
                {questions.length - score}
              </strong>
            </div>

          </div>

          <p className="result-release-note">
            Your result has been submitted. It
            will appear on your Results page after
            the staff member releases it.
          </p>

          <button
            className="submit-quiz-btn"
            style={{
              marginTop: "20px",
              width: "100%",
            }}
            onClick={() =>
              navigate("/student-results")
            }
          >
            View My Results
          </button>

        </div>

      </div>
    );
  }

  /* =========================================
     QUIZ PAGE
  ========================================= */

  return (
    <div className="take-quiz-page">

      {/* HEADER */}

      <div className="take-quiz-header">

        <div>

          <div className="quiz-breadcrumb">
            Student / Available Quizzes /
            Take Quiz
          </div>

          <h1>{quiz.title}</h1>

          <p>
            {quiz.description ||
              "Complete the quiz by answering all the questions."}
          </p>

        </div>

        <div
          className={`quiz-timer ${
            timeLeft <= 300
              ? "timer-warning"
              : ""
          }`}
        >

          <Clock size={18} />

          <div>

            <span>Time Remaining</span>

            <strong>
              {formatTime()}
            </strong>

          </div>

        </div>

      </div>

      {/* PROGRESS */}

      <div className="quiz-progress-card">

        <div className="quiz-progress-top">

          <span>
            Question{" "}
            {currentQuestion + 1} of{" "}
            {questions.length}
          </span>

          <span>
            {answeredCount} answered
          </span>

        </div>

        <div className="quiz-progress-track">

          <div
            className="quiz-progress-fill"
            style={{
              width: `${progress}%`,
            }}
          ></div>

        </div>

      </div>

      {/* MAIN */}

      <div className="take-quiz-layout">

        {/* QUESTION */}

        <div className="question-card">

          <div className="question-top">

            <span className="question-number">
              Question{" "}
              {currentQuestion + 1}
            </span>

            <button className="flag-question">
              <Flag size={14} />
              Flag
            </button>

          </div>

          <h2>
            {current.question}
          </h2>

          <p className="select-answer-text">
            Select the correct answer
          </p>

          {/* OPTIONS */}

          <div className="quiz-options">

            {current.options?.map(
              (option, index) => {

                const isSelected =
                  selectedAnswers[
                    currentQuestion
                  ] === option;

                return (
                  <button
                    key={index}
                    className={`quiz-option ${
                      isSelected
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      selectAnswer(option)
                    }
                  >

                    <span className="option-letter">
                      {String.fromCharCode(
                        65 + index
                      )}
                    </span>

                    <span className="option-text">
                      {option}
                    </span>

                    {isSelected && (
                      <CheckCircle2
                        size={19}
                        className="selected-check"
                      />
                    )}

                  </button>
                );
              }
            )}

          </div>

          {/* NAVIGATION */}

          <div className="question-navigation">

            <button
              className="previous-question"
              onClick={previousQuestion}
              disabled={
                currentQuestion === 0
              }
            >
              <ChevronLeft size={17} />
              Previous
            </button>

            {currentQuestion ===
            questions.length - 1 ? (

              <button
                className="submit-quiz-btn"
                onClick={() =>
                  setShowSubmitModal(true)
                }
              >
                <Send size={16} />
                Submit Quiz
              </button>

            ) : (

              <button
                className="next-question"
                onClick={nextQuestion}
              >
                Next
                <ChevronRight size={17} />
              </button>

            )}

          </div>

        </div>

        {/* QUESTION NAVIGATOR */}

        <div className="question-navigator">

          <div className="navigator-header">

            <h3>Questions</h3>

            <span>
              {answeredCount}/
              {questions.length}
            </span>

          </div>

          <div className="navigator-info">

            <div>
              <span className="legend answered"></span>
              Answered
            </div>

            <div>
              <span className="legend current"></span>
              Current
            </div>

            <div>
              <span className="legend unanswered"></span>
              Unanswered
            </div>

          </div>

          <div className="question-grid">

            {questions.map(
              (question, index) => {

                const answered =
                  selectedAnswers[index];

                const isCurrent =
                  currentQuestion === index;

                return (
                  <button
                    key={question.id || index}
                    className={`question-number-btn ${
                      answered
                        ? "answered"
                        : ""
                    } ${
                      isCurrent
                        ? "current"
                        : ""
                    }`}
                    onClick={() =>
                      goToQuestion(index)
                    }
                  >
                    {index + 1}
                  </button>
                );
              }
            )}

          </div>

          <div className="quiz-warning">

            <AlertCircle size={16} />

            <p>
              Make sure you answer all
              questions before submitting.
            </p>

          </div>

        </div>

      </div>

      {/* SUBMIT MODAL */}

      {showSubmitModal && (

        <div className="quiz-modal-overlay">

          <div className="quiz-submit-modal">

            <div className="modal-icon">
              <Send size={22} />
            </div>

            <h2>
              Submit Quiz?
            </h2>

            <p>
              Are you sure you want to submit
              your quiz?
            </p>

            <div className="modal-stat">

              <div>
                <span>Answered</span>

                <strong>
                  {answeredCount}
                </strong>
              </div>

              <div>
                <span>Unanswered</span>

                <strong>
                  {questions.length -
                    answeredCount}
                </strong>
              </div>

            </div>

            <div className="modal-buttons">

              <button
                className="cancel-submit"
                onClick={() =>
                  setShowSubmitModal(false)
                }
              >
                Continue Quiz
              </button>

              <button
                className="confirm-submit"
                onClick={handleSubmit}
              >
                Submit Quiz
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default TakeQuiz;
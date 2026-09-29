import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Save,
} from "lucide-react";

import "./CreateQuiz.css";

function CreateQuiz() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [duration, setDuration] = useState(30);

  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      answer: "",
    },
  ]);

  const [message, setMessage] = useState("");

  // Add a new question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        options: ["", "", "", ""],
        answer: "",
      },
    ]);
  };

  // Delete a question
  const deleteQuestion = (index) => {
    if (questions.length === 1) {
      return;
    }

    setQuestions(
      questions.filter((_, i) => i !== index)
    );
  };

  // Update question text
  const updateQuestion = (index, value) => {
    const updatedQuestions = [...questions];

    updatedQuestions[index].question = value;

    setQuestions(updatedQuestions);
  };

  // Update option
  const updateOption = (
    questionIndex,
    optionIndex,
    value
  ) => {
    const updatedQuestions = [...questions];

    updatedQuestions[questionIndex].options[
      optionIndex
    ] = value;

    setQuestions(updatedQuestions);
  };

  // Select correct answer
  const updateAnswer = (
    questionIndex,
    value
  ) => {
    const updatedQuestions = [...questions];

    updatedQuestions[questionIndex].answer = value;

    setQuestions(updatedQuestions);
  };

  // SAVE QUIZ
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!title.trim()) {
      setMessage("Please enter a quiz title.");
      return;
    }

    if (!description.trim()) {
      setMessage("Please enter a description.");
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];

      if (!q.question.trim()) {
        setMessage(
          `Please enter question ${i + 1}.`
        );
        return;
      }

      if (q.options.some((option) => !option.trim())) {
        setMessage(
          `Please fill all options for question ${
            i + 1
          }.`
        );
        return;
      }

      if (!q.answer) {
        setMessage(
          `Please select the correct answer for question ${
            i + 1
          }.`
        );
        return;
      }
    }

    // Get existing quizzes
    const existingQuizzes =
      JSON.parse(
        localStorage.getItem("quizzes")
      ) || [];

    // Create new quiz
    const newQuiz = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      category,
      duration: Number(duration),
      questions,
      questionCount: questions.length,
      createdAt: new Date().toLocaleDateString(),
      published: true,
      resultReleased: false,
    };

    // Add quiz
    const updatedQuizzes = [
      ...existingQuizzes,
      newQuiz,
    ];

    // Save
    localStorage.setItem(
      "quizzes",
      JSON.stringify(updatedQuizzes)
    );

    setMessage("Quiz created successfully!");


    // Go to Manage Quizzes
    setTimeout(() => {
      navigate("/manage-quizzes");
    }, 800);
  };

  return (
    <div className="create-quiz-page">

      {/* HEADER */}

      <div className="create-quiz-header">

        <button
          className="back-button"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={17} />
          Back
        </button>

        <div>
          <h1>Create Quiz</h1>
          <p>
            Create a new quiz for your students
          </p>
        </div>

      </div>


      <form onSubmit={handleSubmit}>

        {/* QUIZ INFORMATION */}

        <div className="quiz-form-card">

          <div className="section-title">
            <h2>Quiz Information</h2>
            <p>
              Enter the basic details of your quiz
            </p>
          </div>


          <div className="form-grid">

            <div className="form-group">

              <label>Quiz Title</label>

              <input
                type="text"
                placeholder="Example: React Fundamentals"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
              />

            </div>


            <div className="form-group">

              <label>Category</label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
              >
                <option>General</option>
                <option>React</option>
                <option>JavaScript</option>
                <option>Python</option>
                <option>HTML</option>
                <option>CSS</option>
                <option>AI & ML</option>
                <option>Data Science</option>
              </select>

            </div>

          </div>


          <div className="form-group">

            <label>Description</label>

            <textarea
              rows="3"
              placeholder="Describe what this quiz is about..."
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />

          </div>


          <div className="form-group duration-group">

            <label>Duration (minutes)</label>

            <input
              type="number"
              min="1"
              value={duration}
              onChange={(e) =>
                setDuration(e.target.value)
              }
            />

          </div>

        </div>


        {/* QUESTIONS */}

        <div className="questions-header">

          <div>
            <h2>Questions</h2>

            <p>
              Add questions and select the correct
              answer.
            </p>
          </div>

          <button
            type="button"
            className="add-question-button"
            onClick={addQuestion}
          >
            <Plus size={16} />
            Add Question
          </button>

        </div>


        {questions.map((q, questionIndex) => (

          <div
            className="question-card"
            key={questionIndex}
          >

            <div className="question-card-header">

              <h3>
                Question {questionIndex + 1}
              </h3>

              {questions.length > 1 && (
                <button
                  type="button"
                  className="delete-question"
                  onClick={() =>
                    deleteQuestion(questionIndex)
                  }
                >
                  <Trash2 size={15} />
                </button>
              )}

            </div>


            {/* QUESTION */}

            <div className="form-group">

              <label>Question</label>

              <textarea
                rows="2"
                placeholder="Enter your question..."
                value={q.question}
                onChange={(e) =>
                  updateQuestion(
                    questionIndex,
                    e.target.value
                  )
                }
              />

            </div>


            {/* OPTIONS */}

            <div className="options-container">

              <label>Options</label>

              {q.options.map(
                (option, optionIndex) => (

                  <div
                    className="option-row"
                    key={optionIndex}
                  >

                    <div className="option-label">
                      {String.fromCharCode(
                        65 + optionIndex
                      )}
                    </div>

                    <input
                      type="text"
                      placeholder={`Option ${
                        optionIndex + 1
                      }`}
                      value={option}
                      onChange={(e) =>
                        updateOption(
                          questionIndex,
                          optionIndex,
                          e.target.value
                        )
                      }
                    />

                    <input
                      type="radio"
                      name={`answer-${questionIndex}`}
                      value={option}
                      checked={
                        q.answer === option &&
                        option !== ""
                      }
                      onChange={(e) =>
                        updateAnswer(
                          questionIndex,
                          e.target.value
                        )
                      }
                    />

                    <span className="correct-label">
                      Correct
                    </span>

                  </div>

                )
              )}

            </div>

          </div>

        ))}


        {/* MESSAGE */}

        {message && (
          <div className="quiz-message">
            {message}
          </div>
        )}


        {/* ACTIONS */}

        <div className="create-quiz-actions">

          <button
            type="button"
            className="cancel-button"
            onClick={() =>
              navigate("/manage-quizzes")
            }
          >
            Cancel
          </button>

          <button
            type="submit"
            className="save-quiz-button"
          >
            <Save size={16} />
            Create Quiz
          </button>

        </div>

      </form>

    </div>
  );
}

export default CreateQuiz;
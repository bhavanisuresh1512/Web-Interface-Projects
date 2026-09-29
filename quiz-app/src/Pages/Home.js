import React from "react";
import { Link } from "react-router-dom";
import {
  Brain,
  Menu,
  X,
  ArrowRight,
  Play,
  Trophy,
  Users,
  BookOpen,
  Clock3,
  CheckCircle2,
  Code2,
  Database,
  Bot,
  Globe,
} from "lucide-react";

import "./Home.css";

function Home() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const categories = [
    {
      icon: <Code2 size={24} />,
      title: "Programming",
      description: "Test your coding knowledge",
      quizzes: "25+ Quizzes",
    },
    {
      icon: <Bot size={24} />,
      title: "AI & Machine Learning",
      description: "Challenge your AI skills",
      quizzes: "18+ Quizzes",
    },
    {
      icon: <Database size={24} />,
      title: "Database",
      description: "Master database concepts",
      quizzes: "15+ Quizzes",
    },
    {
      icon: <Globe size={24} />,
      title: "Web Development",
      description: "Learn modern web technologies",
      quizzes: "20+ Quizzes",
    },
  ];

  return (
    <div className="home-page">

      {/* =========================
          NAVBAR
      ========================= */}

      <nav className="home-navbar">

        <div className="home-logo">
          <div className="home-logo-icon">
            <Brain size={21} />
          </div>

          <span>Quiz<span>Master</span></span>
        </div>


        <div
          className={`home-nav-links ${
            menuOpen ? "mobile-open" : ""
          }`}
        >

          <a href="#home" onClick={() => setMenuOpen(false)}>
            Home
          </a>

          <a href="#categories" onClick={() => setMenuOpen(false)}>
            Categories
          </a>

          <a href="#features" onClick={() => setMenuOpen(false)}>
            Features
          </a>

          <a href="#about" onClick={() => setMenuOpen(false)}>
            About
          </a>

          <div className="mobile-auth-buttons">

            <Link to="/login" className="nav-login">
              Login
            </Link>

            <Link to="/register" className="nav-register">
              Register
            </Link>

          </div>

        </div>


        <div className="desktop-auth-buttons">

          <Link to="/login" className="nav-login">
            Login
          </Link>

          <Link to="/register" className="nav-register">
            Get Started
          </Link>

        </div>


        <button
          className="home-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <X size={22} />
          ) : (
            <Menu size={22} />
          )}
        </button>

      </nav>


      {/* =========================
          HERO SECTION
      ========================= */}

      <section className="home-hero" id="home">

        <div className="hero-background-circle circle-one"></div>
        <div className="hero-background-circle circle-two"></div>

        <div className="hero-content">

          <div className="hero-badge">
            <span className="badge-dot"></span>
            Learn • Practice • Succeed
          </div>

          <h1>
            Challenge Yourself.
            <br />

            <span>Master Your Skills.</span>
          </h1>

          <p>
            Take interactive quizzes, track your performance,
            compete with others, and improve your knowledge
            across multiple subjects.
          </p>


          <div className="hero-buttons">

            <Link
              to="/register"
              className="hero-primary-btn"
            >
              Start Quiz
              <ArrowRight size={17} />
            </Link>

            <a
              href="#features"
              className="hero-secondary-btn"
            >
              <Play size={15} />
              Explore Platform
            </a>

          </div>


          <div className="hero-trust">

            <div className="trust-avatars">
              <span>AK</span>
              <span>PS</span>
              <span>RV</span>
              <span>SR</span>
            </div>

            <div>
              <strong>10,000+</strong>
              <small>Students learning with us</small>
            </div>

          </div>

        </div>


        {/* =========================
            HERO QUIZ CARD
        ========================= */}

        <div className="hero-visual">

          <div className="floating-card floating-top">
            <Trophy size={17} />
            <div>
              <strong>Top Performer</strong>
              <span>92% Score</span>
            </div>
          </div>


          <div className="quiz-preview-card">

            <div className="quiz-preview-header">

              <div>
                <span>Today's Challenge</span>
                <h3>JavaScript Fundamentals</h3>
              </div>

              <div className="quiz-preview-icon">
                <Code2 size={20} />
              </div>

            </div>


            <div className="quiz-progress-info">
              <span>Question 7 of 10</span>
              <span>70%</span>
            </div>

            <div className="quiz-preview-progress">
              <div></div>
            </div>


            <h4>
              Which method is used to add an item
              to the end of an array?
            </h4>


            <div className="preview-options">

              <div>
                <span>A</span>
                concat()
              </div>

              <div className="correct-option">
                <span>B</span>
                push()
                <CheckCircle2 size={15} />
              </div>

              <div>
                <span>C</span>
                add()
              </div>

              <div>
                <span>D</span>
                append()
              </div>

            </div>


            <div className="preview-footer">

              <span>
                <Clock3 size={13} />
                12:45 remaining
              </span>

              <button>
                Next
                <ArrowRight size={13} />
              </button>

            </div>

          </div>


          <div className="floating-card floating-bottom">

            <div className="floating-stat-icon">
              <BookOpen size={17} />
            </div>

            <div>
              <strong>78%</strong>
              <span>Average Score</span>
            </div>

          </div>

        </div>

      </section>


      {/* =========================
          STATS
      ========================= */}

      <section className="home-stats">

        <div className="stat-item">

          <div className="stat-icon">
            <Users size={20} />
          </div>

          <div>
            <strong>10K+</strong>
            <span>Active Students</span>
          </div>

        </div>


        <div className="stat-item">

          <div className="stat-icon">
            <BookOpen size={20} />
          </div>

          <div>
            <strong>500+</strong>
            <span>Quiz Questions</span>
          </div>

        </div>


        <div className="stat-item">

          <div className="stat-icon">
            <Trophy size={20} />
          </div>

          <div>
            <strong>25K+</strong>
            <span>Quizzes Completed</span>
          </div>

        </div>


        <div className="stat-item">

          <div className="stat-icon">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <strong>95%</strong>
            <span>Student Satisfaction</span>
          </div>

        </div>

      </section>


      {/* =========================
          CATEGORIES
      ========================= */}

      <section
        className="home-categories"
        id="categories"
      >

        <div className="section-heading">

          <div>
            <span className="section-label">
              EXPLORE CATEGORIES
            </span>

            <h2>
              Find a Quiz That
              <span> Matches Your Interest</span>
            </h2>
          </div>

          <p>
            Choose from a wide range of subjects
            and test your knowledge.
          </p>

        </div>


        <div className="category-grid">

          {categories.map((category, index) => (

            <div
              className="category-card"
              key={index}
            >

              <div className="category-icon">
                {category.icon}
              </div>

              <h3>{category.title}</h3>

              <p>{category.description}</p>

              <div className="category-footer">

                <span>{category.quizzes}</span>

                <ArrowRight size={15} />

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* =========================
          FEATURES
      ========================= */}

      <section
        className="home-features"
        id="features"
      >

        <div className="feature-content">

          <span className="section-label">
            WHY QUIZMASTER?
          </span>

          <h2>
            Everything You Need
            <span> To Learn Better</span>
          </h2>

          <p>
            Our interactive quiz platform makes learning
            engaging, measurable, and enjoyable for every
            student.
          </p>


          <div className="feature-list">

            <div className="feature-item">

              <div className="feature-item-icon">
                <Clock3 size={18} />
              </div>

              <div>
                <h3>Timed Quizzes</h3>
                <p>
                  Challenge yourself with timed
                  assessments.
                </p>
              </div>

            </div>


            <div className="feature-item">

              <div className="feature-item-icon">
                <Trophy size={18} />
              </div>

              <div>
                <h3>Track Your Progress</h3>
                <p>
                  Monitor your scores and improve
                  your performance.
                </p>
              </div>

            </div>


            <div className="feature-item">

              <div className="feature-item-icon">
                <CheckCircle2 size={18} />
              </div>

              <div>
                <h3>Instant Feedback</h3>
                <p>
                  Learn from your answers and
                  identify areas to improve.
                </p>
              </div>

            </div>

          </div>

        </div>


        <div className="feature-dashboard">

          <div className="dashboard-window">

            <div className="dashboard-window-header">

              <div className="window-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <span>Student Dashboard</span>

            </div>


            <div className="dashboard-welcome">
              <span>Welcome back 👋</span>
              <h3>Keep up the great work!</h3>
            </div>


            <div className="dashboard-mini-cards">

              <div>
                <span>Quizzes</span>
                <strong>24</strong>
              </div>

              <div>
                <span>Avg. Score</span>
                <strong>86%</strong>
              </div>

              <div>
                <span>Rank</span>
                <strong>#12</strong>
              </div>

            </div>


            <div className="dashboard-chart">

              <div className="chart-header">
                <strong>Performance</strong>
                <span>This Week</span>
              </div>

              <div className="chart-bars">

                <span style={{ height: "35%" }}></span>
                <span style={{ height: "52%" }}></span>
                <span style={{ height: "42%" }}></span>
                <span style={{ height: "68%" }}></span>
                <span style={{ height: "55%" }}></span>
                <span style={{ height: "82%" }}></span>
                <span style={{ height: "92%" }}></span>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          CTA
      ========================= */}

      <section
        className="home-cta"
        id="about"
      >

        <div>

          <span>READY TO GET STARTED?</span>

          <h2>
            Turn Your Knowledge
            <br />
            Into Your Strength.
          </h2>

          <p>
            Join thousands of students and start
            your learning journey today.
          </p>

        </div>

        <Link
          to="/register"
          className="cta-button"
        >
          Create Free Account
          <ArrowRight size={17} />
        </Link>

      </section>


      {/* =========================
          FOOTER
      ========================= */}

      <footer className="home-footer">

        <div className="footer-brand">

          <div className="home-logo">

            <div className="home-logo-icon">
              <Brain size={19} />
            </div>

            <span>
              Quiz<span>Master</span>
            </span>

          </div>

          <p>
            Making learning interactive,
            engaging, and rewarding.
          </p>

        </div>


        <div className="footer-links">

          <a href="#home">Home</a>
          <a href="#categories">Categories</a>
          <a href="#features">Features</a>
          <Link to="/login">Login</Link>

        </div>


        <div className="footer-copy">
          © 2026 QuizMaster. All rights reserved.
        </div>

      </footer>

    </div>
  );
}

export default Home;
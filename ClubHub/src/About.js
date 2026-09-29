import "./About.css";

import Navbar from "./Navbar";
import Footer from "./Footer";

import {
  FaUsers,
  FaCalendarAlt,
  FaAward,
  FaHandshake,
} from "react-icons/fa";

function About() {
  return (
    <>
      <Navbar />

      <section className="about-hero">
        <h1>About Campus Club Hub</h1>
        <p>
          Empowering students to discover, connect, and grow through
          extracurricular activities.
        </p>
      </section>

      <section className="about-content">

        <div className="about-text">
          <h2>Who We Are</h2>

          <p>
            Campus Club Hub is a platform designed to help students
            explore clubs, register for events, earn achievement
            badges, and build meaningful connections beyond academics.
          </p>

          <p>
            Our goal is to encourage students to participate in
            extracurricular activities that improve leadership,
            teamwork, creativity, and communication skills.
          </p>
        </div>

        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700"
            alt="Students"
          />
        </div>

      </section>

      <section className="about-features">

        <h2>Why Choose Campus Club Hub?</h2>

        <div className="feature-grid">

          <div className="feature-box">
            <FaUsers className="icon" />
            <h3>Join Clubs</h3>
            <p>
              Explore technical, cultural, sports, and social clubs.
            </p>
          </div>

          <div className="feature-box">
            <FaCalendarAlt className="icon" />
            <h3>Register Events</h3>
            <p>
              Participate in exciting college events with one click.
            </p>
          </div>

          <div className="feature-box">
            <FaAward className="icon" />
            <h3>Earn Badges</h3>
            <p>
              Get recognition for your active participation.
            </p>
          </div>

          <div className="feature-box">
            <FaHandshake className="icon" />
            <h3>Build Network</h3>
            <p>
              Meet students with similar interests and passions.
            </p>
          </div>

        </div>

      </section>

      <section className="vision">

        <h2>Our Vision</h2>

        <p>
          To create an engaging campus environment where every student
          can discover opportunities, showcase talents, and build
          lifelong friendships through extracurricular activities.
        </p>

      </section>

      <Footer />
    </>
  );
}

export default About;
import "./Home.css";

import { useNavigate } from "react-router-dom";

import Navbar from "./Navbar";
import Hero from "./Hero";
import Featurecard from "./Featurecard";
import Clubcard from "./Clubcard";
import Eventcard from "./Eventcard";
import Footer from "./Footer";

import {
  FaUsers,
  FaCalendarAlt,
  FaAward,
  FaHandshake,
} from "react-icons/fa";

function Home() {

  const navigate = useNavigate();

  return (
    <>

      <Navbar />

      <Hero />

      {/* FEATURES */}

      <section className="features">

        <h2>Why Campus Club Hub?</h2>

        <div className="feature-container">

          <Featurecard
            icon={<FaUsers />}
            title="Join Clubs"
            description="Become a member of clubs based on your interests."
          />

          <Featurecard
            icon={<FaCalendarAlt />}
            title="Attend Events"
            description="Register and participate in exciting campus events."
          />

          <Featurecard
            icon={<FaAward />}
            title="Earn Badges"
            description="Collect achievement badges for every activity."
          />

          <Featurecard
            icon={<FaHandshake />}
            title="Networking"
            description="Connect with students across different departments."
          />

        </div>

      </section>

      {/* CLUBS */}

      <section className="home-clubs">

        <div className="title-row">

          <h2>Popular Clubs</h2>

          <button
            onClick={() => navigate("/clubs")}
          >
            View All
          </button>

        </div>

        <div className="club-grid">

          <Clubcard
            image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500"
            clubName="Coding Club"
            category="Technical"
            members="180"
            description="Hackathons, Coding Challenges and Workshops."
          />

          <Clubcard
            image="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500"
            clubName="Dance Club"
            category="Cultural"
            members="120"
            description="Western, Classical and Folk Dance."
          />

          <Clubcard
            image="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500"
            clubName="Music Club"
            category="Cultural"
            members="95"
            description="Vocals, Instruments and Live Performances."
          />

        </div>

      </section>

      {/* EVENTS */}

      <section className="home-events">

        <div className="title-row">

          <h2>Upcoming Events</h2>

          <button
            onClick={() => navigate("/events")}
          >
            View All
          </button>

        </div>

        <div className="event-grid">

          <Eventcard
            image="https://images.unsplash.com/photo-1515169067868-5387ec356754?w=500"
            title="Hackathon 2026"
            date="10 Aug 2026"
            venue="Seminar Hall"
            seats="100"
            category="Technical"
          />

          <Eventcard
            image="https://images.unsplash.com/photo-1506157786151-b8491531f063?w=500"
            title="Music Fest"
            date="18 Aug 2026"
            venue="Open Auditorium"
            seats="250"
            category="Cultural"
          />

        </div>

      </section>

      <Footer />

    </>
  );
}

export default Home;
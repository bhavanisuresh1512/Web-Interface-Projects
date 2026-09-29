import "./Achievements.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FaMedal, FaAward, FaCertificate } from "react-icons/fa";

function Achievements() {

  const achievements = [
    {
      id: 1,
      title: "Coding Club Member",
      description: "Successfully joined the Coding Club.",
      icon: <FaMedal />,
      color: "#A38560"
    },
    {
      id: 2,
      title: "Hackathon Participant",
      description: "Participated in Hackathon 2026.",
      icon: <FaAward />,
      color: "#390517"
    },
    {
      id: 3,
      title: "Music Fest Certificate",
      description: "Received participation certificate.",
      icon: <FaCertificate />,
      color: "#16302B"
    },
    {
      id: 4,
      title: "Sports Meet Winner",
      description: "Won 1st Place in Athletics.",
      icon: <FaMedal />,
      color: "#03110D"
    }
  ];

  return (
    <>
      <Navbar />

      <section className="achievement-hero">
        <h1>My Achievements</h1>
        <p>
          Celebrate your journey through clubs, events, and extracurricular activities.
        </p>
      </section>

      <section className="achievement-container">

        {achievements.map((item) => (

          <div className="achievement-card" key={item.id}>

            <div
              className="achievement-icon"
              style={{ background: item.color }}
            >
              {item.icon}
            </div>

            <h2>{item.title}</h2>

            <p>{item.description}</p>

            <button>View Certificate</button>

          </div>

        ))}

      </section>

      <Footer />
    </>
  );
}

export default Achievements;
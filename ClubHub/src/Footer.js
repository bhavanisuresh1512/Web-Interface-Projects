import "./Footer.css";
import {
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Logo & Description */}
        <div className="footer-section">
          <h2>Campus Club Hub</h2>

          <p>
            Explore clubs, participate in events,
            connect with students, and create unforgettable
            campus memories.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>

          <ul>
            <li>Home</li>
            <li>Clubs</li>
            <li>Events</li>
            <li>About</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact</h3>

          <p>
            <FaEnvelope /> support@campusclubhub.com
          </p>

          <div className="social-icons">

            <FaInstagram />

            <FaLinkedin />

            <FaGithub />

          </div>
        </div>

      </div>

      <hr />

      <div className="copyright">
        © 2025 Campus Club Hub | All Rights Reserved
      </div>

    </footer>
  );
}

export default Footer;
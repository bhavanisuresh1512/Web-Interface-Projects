import "./Contact.css";
import { useState } from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Message Sent Successfully!");

    localStorage.setItem(
      "contactForm",
      JSON.stringify(formData)
    );

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      <Navbar />

      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>
          We'd love to hear from you. Reach out with any questions or suggestions.
        </p>
      </section>

      <div className="contact-container">

        <div className="contact-info">

          <h2>Get in Touch</h2>

          <p>
            <FaMapMarkerAlt /> Campus Club Hub,
            ABC College, Chennai
          </p>

          <p>
            <FaPhoneAlt /> +91 98765 43210
          </p>

          <p>
            <FaEnvelope /> support@campusclubhub.com
          </p>

        </div>

        <div className="contact-form">

          <h2>Send Message</h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              rows="6"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit">
              Send Message
            </button>

          </form>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Contact;
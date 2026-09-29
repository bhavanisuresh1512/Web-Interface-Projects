import "./Register.css";
import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Register() {

  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    department: "",
    year: "",
    email: "",
    phone: "",
    event: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "eventRegistration",
      JSON.stringify(formData)
    );

    alert("🎉 Event Registered Successfully!");

    setFormData({
      name: "",
      rollNo: "",
      department: "",
      year: "",
      email: "",
      phone: "",
      event: "",
    });
  };

  return (
    <>
      <Navbar />

      <section className="register-section">

        <div className="register-card">

          <h1>Event Registration</h1>

          <p>
            Fill in your details to register for your favorite event.
          </p>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="rollNo"
              placeholder="Roll Number"
              value={formData.rollNo}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
              required
            />

            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
            >
              <option value="">Select Year</option>
              <option>First Year</option>
              <option>Second Year</option>
              <option>Third Year</option>
              <option>Final Year</option>
            </select>

            <input
              type="email"
              name="email"
              placeholder="College Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <select
              name="event"
              value={formData.event}
              onChange={handleChange}
              required
            >
              <option value="">Select Event</option>
              <option>Hackathon 2026</option>
              <option>Music Fest</option>
              <option>Sports Meet</option>
              <option>Tree Plantation</option>
              <option>Photography Contest</option>
            </select>

            <button type="submit">
              Register Now
            </button>

          </form>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Register;
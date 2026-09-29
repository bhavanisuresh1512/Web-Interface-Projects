import React, { useState } from "react";
import "./Contact.css";

import {
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaTimes,
  FaBackspace,
  FaSearch,
} from "react-icons/fa";

const people = [
  {
    id: 1,
    name: "Deva Sree Periaswamy",
    description: "Always happy to connect and share ideas.",
    phone: "+918610237114",
    email: "devasree1105@gmail.com",
    whatsapp: "8610237114",
    location: "Chennai, Tamil Nadu, India",
    image: "/images/DevaSree.jpeg",
  },

  {
    id: 2,
    name: "Kaviya Venkatesan",
    description: "Feel free to reach out anytime.",
    phone: "+917299358324",
    email: "kaviyakarthika1@gmail.com",
    whatsapp: "917299358324",
    location: "Bangalore, Karnataka, India",
    image: "/images/Kaviya.jpeg",
  },

  {
    id: 3,
    name: "Maria Jessica Joseph",
    description: "Let's connect and keep in touch.",
    phone: "+918610575594",
    email: "jmariajessica789@gmail.com",
    whatsapp: "8610575594",
    location: "Coimbatore, Tamil Nadu, India",
    image: "/images/Maria.jpeg",
  },

  {
    id: 4,
    name: "Bhavani Suresh",
    description: "Always available for a good conversation.",
    phone: "+919710284943",
    email: "bhavanisuresh1512@gmail.com",
    whatsapp: "9710284943",
    location: "Kochi, Kerala, India",
    image: "/images/Bhavani.jpeg",
  },

  {
    id: 5,
    name: "Srimathi Senthilnadhan",
    description: "Happy to hear from you.",
    phone: "+916380155809",
    email: "srimathi200821@gmail.com",
    whatsapp: "6380155809",
    location: "Ahmedabad, Gujarat, India",
    image: "/images/Srimathi.jpeg",
  },

  {
    id: 6,
    name: "Lathika Suriya",
    description: "Let's stay connected.",
    phone: "+918925742624",
    email: "lathika967@gmail.com",
    whatsapp: "8925742624",
    location: "Delhi, India",
    image: "/images/Lathika.jpeg",
  },

  {
    id: 7,
    name: "Hemamalini Govindaswamy",
    description: "Feel free to get in touch.",
    phone: "+918610563034",
    email: "hemamalini.govindaswamy@example.com",
    whatsapp: "918610563034",
    location: "Madurai, Tamil Nadu, India",
    image: "https://i.pravatar.cc/500?img=45",
  },

  {
    id: 8,
    name: "Sathya Suresh",
    description: "Always glad to connect with new people.",
    phone: "+919176895641",
    email: "sathyasuresh41@example.com",
    whatsapp: "919176895641",
    location: "Kolkata, West Bengal, India",
    image: "https://i.pravatar.cc/500?img=32",
  },

  {
    id: 9,
    name: "Suresh",
    description: "Let's keep in touch.",
    phone: "+919600135856",
    email: "sathiyasuresh41@example.com",
    whatsapp: "919600135856",
    location: "Thiruvananthapuram, Kerala, India",
    image: "https://i.pravatar.cc/500?img=54",
  },

  {
    id: 10,
    name: "Uma",
    description: "You can reach me anytime.",
    phone: "+919941213706",
    email: "uma05@gmail.com",
    whatsapp: "9941213706",
    location: "Hyderabad, Telangana, India",
    image: "https://i.pravatar.cc/500?img=42",
  },

  {
    id: 11,
    name: "Sumathi A",
    description: "Always happy to hear from you.",
    phone: "+91 9790862772",
    email: "sumathia@gmail.com",
    whatsapp: " 9790862772",
    location: "Pune, Maharashtra, India",
    image: "https://i.pravatar.cc/500?img=44",
  },

  {
    id: 12,
    name: "Prakash",
    description: "Let's connect and exchange ideas.",
    phone: "+918825595289",
    email: "prakash@gmail.com",
    whatsapp: "918825595289",
    location: "Chennai, Tamil Nadu, India",
    image: "https://i.pravatar.cc/500?img=60",
  },

  {
    id: 13,
    name: "Shah",
    description: "Feel free to reach out.",
    phone: "+919000000013",
    email: "shah@example.com",
    whatsapp: "919000000013",
    location: "Mumbai, Maharashtra, India",
    image: "https://i.pravatar.cc/500?img=13",
  },

  {
    id: 14,
    name: "John Doe",
    description: "Always glad to stay connected.",
    phone: "+916383568573",
    email: "john.doe@example.com",
    whatsapp: "6383568573",
    location: "Salem, Tamil Nadu, India",
    image: "https://i.pravatar.cc/500?img=14",
  },

  {
    id: 15,
    name: "Aditi Menon",
    description: "Happy to connect with you.",
    phone: "+919000000015",
    email: "aditi.menon@example.com",
    whatsapp: "919000000015",
    location: "Kochi, Kerala, India",
    image: "https://i.pravatar.cc/500?img=15",
  },

  {
    id: 16,
    name: "Riya Kapoor",
    description: "Let's stay in touch.",
    phone: "+919000000016",
    email: "riya.kapoor@example.com",
    whatsapp: "919000000016",
    location: "Jaipur, Rajasthan, India",
    image: "https://i.pravatar.cc/500?img=16",
  },

  {
    id: 17,
    name: "Manoj Reddy",
    description: "You can always reach out.",
    phone: "+919000000017",
    email: "manoj.reddy@example.com",
    whatsapp: "919000000017",
    location: "Hyderabad, Telangana, India",
    image: "https://i.pravatar.cc/500?img=17",
  },

  {
    id: 18,
    name: "Harini S",
    description: "Always happy to connect.",
    phone: "+919000000018",
    email: "harini.s@example.com",
    whatsapp: "919000000018",
    location: "Tiruchirappalli, Tamil Nadu, India",
    image: "https://i.pravatar.cc/500?img=21",
  },

  {
    id: 19,
    name: "Akash Joshi",
    description: "Let's get in touch.",
    phone: "+919000000019",
    email: "akash.joshi@example.com",
    whatsapp: "919000000019",
    location: "Indore, Madhya Pradesh, India",
    image: "https://i.pravatar.cc/500?img=19",
  },

  {
    id: 20,
    name: "Keerthana R",
    description: "Feel free to contact me.",
    phone: "+919000000020",
    email: "keerthana.r@example.com",
    whatsapp: "919000000020",
    location: "Chennai, Tamil Nadu, India",
    image: "https://i.pravatar.cc/500?img=20",
  },

  {
    id: 21,
    name: "Varun Bhat",
    description: "Always available to connect.",
    phone: "+919000000021",
    email: "varun.bhat@example.com",
    whatsapp: "919000000021",
    location: "Mangalore, Karnataka, India",
    image: "https://i.pravatar.cc/500?img=18",
  },

  {
    id: 22,
    name: "Lavanya P",
    description: "Let's stay connected.",
    phone: "+919000000022",
    email: "lavanya.p@example.com",
    whatsapp: "919000000022",
    location: "Pondicherry, India",
    image: "https://i.pravatar.cc/500?img=22",
  },

  {
    id: 23,
    name: "Naveen Thomas",
    description: "Happy to hear from you.",
    phone: "+919000000023",
    email: "naveen.thomas@example.com",
    whatsapp: "919000000023",
    location: "Bangalore, Karnataka, India",
    image: "https://i.pravatar.cc/500?img=67",
  },

  {
    id: 24,
    name: "Shreya Bose",
    description: "Let's connect anytime.",
    phone: "+919000000024",
    email: "shreya.bose@example.com",
    whatsapp: "919000000024",
    location: "Kolkata, West Bengal, India",
    image: "https://i.pravatar.cc/500?img=24",
  },

  {
    id: 25,
    name: "Yashini K",
    description: "Always happy to stay connected.",
    phone: "+919000000025",
    email: "yashini.k@example.com",
    whatsapp: "919000000025",
    location: "Chennai, Tamil Nadu, India",
    image: "https://i.pravatar.cc/500?img=27",
  },
];

function Contact() {
  const [search, setSearch] = useState("");
  const [dialerOpen, setDialerOpen] = useState(false);
  const [dialNumber, setDialNumber] = useState("");

  const filteredPeople = people.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  // OPEN DIALER
  const openDialer = (phone) => {
    setDialNumber(phone);
    setDialerOpen(true);
  };

  // OPEN GMAIL COMPOSE
  const openGmail = (email) => {
    const gmailUrl =
      `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
        email
      )}`;

    window.open(gmailUrl, "_blank");
  };

  // ADD NUMBER
  const addNumber = (number) => {
    setDialNumber((previous) => previous + number);
  };

  // DELETE NUMBER
  const deleteNumber = () => {
    setDialNumber((previous) => previous.slice(0, -1));
  };

  // CLOSE DIALER
  const closeDialer = () => {
    setDialerOpen(false);
    setDialNumber("");
  };

  return (
    <div className="contact-page">

      <main className="contact-container">

        {/* TOP SECTION */}

        <section className="top-section">

          <div className="title-area">
            <span className="small-title">
              GET IN TOUCH
            </span>

            <h1>
              Let's Connect
            </h1>

            <p>
              Find a person and choose your way to connect.
            </p>
          </div>

          {/* SEARCH */}

          <div className="search-box">

            <FaSearch className="search-icon" />

            <input
              type="text"
              placeholder="Search people..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

        </section>

        {/* PEOPLE */}

        <section className="people-section">

          <div className="section-heading">

            <div>
              <h2>Our People</h2>
              <p>
                {filteredPeople.length} people available
              </p>
            </div>

          </div>

          <div className="people-grid">

            {filteredPeople.map((person) => (

              <article
                className="person-card"
                key={person.id}
              >

                {/* IMAGE */}

                <div className="person-image">

                  <img
                    src={person.image}
                    alt={person.name}
                  />

                </div>

                {/* CONTENT */}

                <div className="person-content">

                  <h3>
                    {person.name}
                  </h3>

                  <p className="description">
                    {person.description}
                  </p>

                  {/* PHONE */}

                  <button
                    className="contact-button"
                    onClick={() =>
                      openDialer(person.phone)
                    }
                  >

                    <span className="icon-box">
                      <FaPhone />
                    </span>

                    <span className="button-text">
                      {person.phone}
                    </span>

                  </button>

                  {/* EMAIL */}

                  <button
                    className="contact-button"
                    onClick={() =>
                      openGmail(person.email)
                    }
                  >

                    <span className="icon-box">
                      <FaEnvelope />
                    </span>

                    <span className="button-text">
                      {person.email}
                    </span>

                  </button>

                  {/* WHATSAPP */}

                  <a
                    href={`https://wa.me/${person.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-button"
                  >

                    <span className="icon-box">
                      <FaWhatsapp />
                    </span>

                    <span className="button-text">
                      WhatsApp
                    </span>

                  </a>

                  {/* LOCATION */}

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      person.location
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-button"
                  >

                    <span className="icon-box">
                      <FaMapMarkerAlt />
                    </span>

                    <span className="button-text location-text">
                      {person.location}
                    </span>

                  </a>

                </div>

              </article>

            ))}

          </div>

          {/* NO RESULTS */}

          {filteredPeople.length === 0 && (

            <div className="no-results">

              <h3>
                No one found
              </h3>

              <p>
                Try searching with another name.
              </p>

            </div>

          )}

        </section>

      </main>

      {/* =====================================
          DIALER
      ===================================== */}

      {dialerOpen && (

        <div
          className="dialer-overlay"
          onClick={closeDialer}
        >

          <div
            className="dialer"
            onClick={(e) => e.stopPropagation()}
          >

            {/* DIALER TOP */}

            <div className="dialer-top">

              <div>
                <span className="dialer-label">
                  CALL
                </span>

                <h2>
                  Dial Number
                </h2>
              </div>

              <button
                className="close-button"
                onClick={closeDialer}
              >
                <FaTimes />
              </button>

            </div>

            {/* NUMBER */}

            <div className="number-display">

              {dialNumber || "Enter number"}

            </div>

            {/* PAD */}

            <div className="dial-pad">

              <button onClick={() => addNumber("1")}>
                1
              </button>

              <button onClick={() => addNumber("2")}>
                2
              </button>

              <button onClick={() => addNumber("3")}>
                3
              </button>

              <button onClick={() => addNumber("4")}>
                4
              </button>

              <button onClick={() => addNumber("5")}>
                5
              </button>

              <button onClick={() => addNumber("6")}>
                6
              </button>

              <button onClick={() => addNumber("7")}>
                7
              </button>

              <button onClick={() => addNumber("8")}>
                8
              </button>

              <button onClick={() => addNumber("9")}>
                9
              </button>

              <button onClick={() => addNumber("*")}>
                *
              </button>

              <button onClick={() => addNumber("0")}>
                0
              </button>

              <button onClick={() => addNumber("#")}>
                #
              </button>

            </div>

            {/* ACTIONS */}

            <div className="dialer-actions">

              <a
                href={
                  dialNumber
                    ? `tel:${dialNumber}`
                    : "#"
                }
                className="call-button"
              >

                <FaPhone />

                <span>
                  Call
                </span>

              </a>

              <button
                className="delete-button"
                onClick={deleteNumber}
              >

                <FaBackspace />

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Contact;
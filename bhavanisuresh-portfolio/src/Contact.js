import { useState } from "react";
import "./Contact.css";

function Contact() {

  const [emailError, setEmailError] = useState(false);

  return (
    <section className="contact" id="contact">
      <div className="wrap">

        {/* SECTION TITLE */}
        <div className="section-title">
          <p className="eyebrow">Contact</p>

          <h2>Let's Work Together</h2>

          <p>
            Have an opportunity or just want to say hi?
            Feel free to connect with me.
          </p>
        </div>


        {/* CONTACT GRID */}
        <div className="contact-grid">

          {/* CONTACT INFORMATION */}
          <div className="contact-info">

            <h3>Find me here</h3>


            {/* GITHUB */}
            <div className="contact-channel">

              <div className="ch-icon">
                <img
                  src="/assets/Github.svg"
                  alt="GitHub"
                  width="20"
                />
              </div>

              <div>
                <a
                  href="https://github.com/bhavanisuresh1512"
                  target="_blank"
                  rel="noreferrer"
                >
                  Bhavani Suresh
                </a>

                <small>GitHub</small>
              </div>

            </div>


            {/* LINKEDIN */}
            <div className="contact-channel">

              <div className="ch-icon">
                <img
                  src="/assets/Linkedin.svg"
                  alt="LinkedIn"
                  width="20"
                />
              </div>

              <div>
                <a
                  href="https://www.linkedin.com/in/bhavani-suresh-9643ab386"
                  target="_blank"
                  rel="noreferrer"
                >
                  Bhavani Suresh
                </a>

                <small>LinkedIn</small>
              </div>

            </div>


            {/* EMAIL */}
            <div className="contact-channel">

              <div className="ch-icon">
                <img
                  src="/assets/Email.svg"
                  alt="Email"
                  width="20"
                />
              </div>

              <div>
                <a href="mailto:bhavanisuresh1512@gmail.com">
                  Bhavani Suresh
                </a>

                <small>Email</small>
              </div>

            </div>

          </div>


          {/* CONTACT FORM */}
          <form
            className="contact-form"
            action="https://formspree.io/f/xljrbwod"
            method="POST"
            noValidate
            onSubmit={(e) => {
              const email = e.target.email.value;

              if (!email.includes("@")) {
                e.preventDefault();
                setEmailError(true);
                return;
              }

              setEmailError(false);
            }}
          >

            {/* NAME */}
            <div className="form-group">

              <label htmlFor="name">
                Name
              </label>

              <input
                id="name"
                type="text"
                name="name"
                placeholder="Ex : Bhavani Suresh"
                required
              />

            </div>


            {/* EMAIL */}
            <div className={`form-group ${emailError ? "invalid" : ""}`}>

              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="Ex : bhavanisuresh@gmail.com"
                required
                onChange={() => setEmailError(false)}
              />

              <p className="error-msg">
                Please enter a valid email address.
              </p>

            </div>


            {/* MESSAGE */}
            <div className="form-group">

              <label htmlFor="message">
                Message
              </label>

              <textarea
                id="message"
                name="message"
                rows="6"
                placeholder="Type your message..."
                required
              />

            </div>


            {/* BUTTON */}
            <button type="submit">
              Send Message
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}

export default Contact;
import "./About.css";

function About() {
  return (
    <section id="about" className="about">

      <div className="wrap">

        <div className="section-title">
          <p className="eyebrow">About</p>
          <h2>A little about me</h2>
        </div>

        <div className="about-grid">

          <div className="about-left">

            <p>
              I'm <span>Bhavani S</span>, a B.Tech student specializing in
              <strong> Artificial Intelligence & Data Science (AI&DS)</strong>.
              I enjoy building practical, logic-driven applications—from
              console-based simulations to interactive web applications.
            </p>

            <p>
              My foundation in <strong>Java</strong>,
              <strong> Python</strong> and
              <strong> Object-Oriented Programming</strong> has strengthened
              my problem-solving skills. Alongside programming, I'm expanding
              into Frontend Development and UI/UX Design to create applications
              that are both functional and visually appealing.
            </p>

            <p>
              I believe good software isn't just about solving problems—it's
              also about delivering a seamless user experience. Every project I
              build helps me become a better developer and designer.
            </p>

          </div>

          <div className="about-right">

            <div className="info-card">

              <h3>Education & Details</h3>

              <div className="info-row">
                <span>Degree</span>
                <span>B.Tech AI & DS</span>
              </div>

              <div className="info-row">
                <span>Focus</span>
                <span>Java • Python • Web</span>
              </div>

              <div className="info-row">
                <span>Interest</span>
                <span>UI/UX Design</span>
              </div>

              <div className="info-row">
                <span>Status</span>
                <span>Open to Opportunities</span>
              </div>

            </div>

            <div className="interest-card">

              <h3>Interests</h3>

              <div className="tags">

                <span>Problem Solving</span>
                <span>UI Design</span>
                <span>Open Source</span>
                <span>Coding Games</span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default About;
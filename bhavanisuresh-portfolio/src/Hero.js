import "./Hero.css";

function Hero() {
  return (
    <section id="home" className="hero">

      <div className="grid-backdrop"></div>

      <div className="wrap hero-inner">

        <div className="hero-content">

          <p className="eyebrow">B.Tech • AI & DS</p>

          <h1>
            Hi, I'm <span>Bhavani S</span>
          </h1>

          <p className="tagline">
            Aspiring AI & Data Science engineer building with Java,
            Python and Web Technologies while developing a passion for
            thoughtful UI/UX Design.
          </p>

          <div className="hero-buttons">
            <a href="#projects-preview" className="primary-btn">
              View My Work
            </a>

            <a href="#contact" className="secondary-btn">
              Get In Touch
            </a>
          </div>

        </div>

        <div className="hero-image">

          <div className="avatar-ring"></div>

          <div className="avatar">
            <img src={"/assets/BhavaniSuresh.jpeg"} alt="Bhavani Suresh" />
          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;
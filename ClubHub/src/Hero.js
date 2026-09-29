import "./Hero.css";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <p className="hero-tag">
          Discover • Connect • Participate
        </p>

        <h1>
          Explore Campus Life
          <span> Beyond Academics</span>
        </h1>

        <p className="hero-description">
          Join exciting clubs, register for events, showcase your talents,
          earn achievements, and create unforgettable memories with
          Campus Club Hub.
        </p>

        <div className="hero-buttons">
          <button className="explore-btn">
            Explore Clubs
          </button>

          <button className="join-btn">
            Join Now
          </button>
        </div>

      </div>

      <div className="hero-image">

        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800"
          alt="Students"
        />

      </div>

    </section>
  );
}

export default Hero;
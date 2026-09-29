import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="wrap footer-content">

        <div className="footer-left">
          <h2>Bhavani <span>Suresh</span></h2>
          <p>
            B.Tech AI & Data Science Student
          </p>
        </div>

        <div className="footer-center">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects-preview">Projects</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer-right">
          <a
            href="https://github.com/bhavanisuresh1512"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>

          <a
            href="https://www.linkedin.com/in/bhavani-suresh-9643ab386"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn ↗
          </a>

          <a href="mailto:bhavanisuresh1512@gmail.com">
            Email ↗
          </a>
        </div>

      </div>

      <div className="copyright">
        © 2026 BHAVANI S • ALL RIGHTS RESERVED
      </div>

    </footer>
  );
}

export default Footer;
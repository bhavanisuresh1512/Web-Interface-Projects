import React, { useEffect, useMemo, useRef, useState } from "react";
import { Award, ExternalLink, ImageOff } from "lucide-react";
import "./Projects.css"

const PROJECTS = [
  { name: "ATM Machine Operation", tech: ["Python"], link: "https://github.com/bhavanisuresh1512/ATM-Machine-Operation", image: "/assets/P12.jpeg" },
  { name: "Simple MCQ Question System", tech: ["Python"], link: "https://github.com/bhavanisuresh1512/Simple-MCQ-Question-System", image: "/assets/P11.jpeg" },
  { name: "Number Guessing Game", tech: ["Python"], link: "https://github.com/bhavanisuresh1512/Number-Guessing-Game", image: "/assets/P13.jpeg" },
  { name: "Password Strength Checker", tech: ["Python"], link: "https://github.com/bhavanisuresh1512/Password-Strength-Checker", image: "/assets/P14.jpeg" },
  { name: "Library Management App", tech: ["Python"], link: "https://github.com/bhavanisuresh1512/Mini-Library-Management-System", image: "/assets/P15.jpeg" },
  { name: "Rock - Paper - Scissors", tech: ["Python"], link: "https://github.com/bhavanisuresh1512/Rock-Paper-Scissors-Game-Project", image: "/assets/P16.jpeg" },
  { name: "Mini Library Management", tech: ["OOPS"], link: "https://github.com/bhavanisuresh1512/Oops---Projects/tree/main/Oops%20Project/UNIT%201", image: "/assets/O11.png" },
  { name: "Mobile Recharge App", tech: ["OOPS"], link: "https://github.com/bhavanisuresh1512/Oops---Projects/tree/main/Oops%20Project/UNIT%201", image: "/assets/O12.png" },
  { name: "Student management App", tech: ["OOPS"], link: "https://github.com/bhavanisuresh1512/Oops---Projects/tree/main/Oops%20Project/UNIT%201", image: "/assets/O13.png" },
  { name: "Bank Management App", tech: ["OOPS"], link: "https://github.com/bhavanisuresh1512/Oops---Projects/tree/main/Oops%20Project/UNIT%202", image: "/assets/O14.png" },
  { name: "Course Management App", tech: ["OOPS"], link: "https://github.com/bhavanisuresh1512/Oops---Projects/tree/main/Oops%20Project/UNIT%202", image: "/assets/O15.png" },
  { name: "Employee Management App", tech: ["OOPS"], link: "https://github.com/bhavanisuresh1512/Oops---Projects/tree/main/Oops%20Project/UNIT%202", image: "/assets/O16.png" },
  { name: "Data Processing", tech: ["Python"], link: "https://github.com/bhavanisuresh1512/Data-Processing-Using-Student", image: "/assets/P17.png" },
  { name: "File-Based Notes Saver", tech: ["Python"], link: "https://github.com/bhavanisuresh1512/File-Based-Notes-Saver", image: "/assets/P18.png" },
  { name: "Hangman Game", tech: ["Python"], link: "https://github.com/bhavanisuresh1512/Hangman-Game", image: "/assets/P19.png" },
  { name: "Dice Game", tech: ["Python"], link: "https://github.com/bhavanisuresh1512/Dice-Game-", image: "/assets/P20.png" },
  { name: "Bank System App", tech: ["OOPS"], link: "https://github.com/bhavanisuresh1512/Oops---Projects/tree/main/Oops%20Project/UNIT%203", image: "/assets/O17.png" },
  { name: "Hospital management App", tech: ["OOPS"], link: "https://github.com/bhavanisuresh1512/Oops---Projects/tree/main/Oops%20Project/UNIT%203", image: "/assets/O18.png" },
  { name: "Mini App Project", tech: ["OOPS"], link: "https://github.com/bhavanisuresh1512/Oops---Projects/tree/main/Oops%20Project/UNIT%203", image: "/assets/O19.png" },
  { name: "Vehicle Hierarchy", tech: ["OOPS"], link: "https://github.com/bhavanisuresh1512/Oops---Projects/tree/main/Oops%20Project/UNIT%203", image: "/assets/O20.png" },
  { name: "Contact Management App", tech: ["OOPS"], link: "https://github.com/bhavanisuresh1512/Oops---Projects/tree/main/Oops%20Project/UNIT%204", image: "/assets/O21.png" },
  { name: "Inventory Management App", tech: ["OOPS"], link: "https://github.com/bhavanisuresh1512/Oops---Projects/tree/main/Oops%20Project/UNIT%204", image: "/assets/O22.png" },
  { name: "Movie Booking App", tech: ["OOPS"], link: "https://github.com/bhavanisuresh1512/Oops---Projects/tree/main/Oops%20Project/UNIT%204", image: "/assets/O23.png" },
  { name: "File Manager App", tech: ["OOPS"], link: "https://github.com/bhavanisuresh1512/Oops---Projects/tree/main/Oops%20Project/UNIT%205", image: "/assets/O24.png" },
  { name: "Food Delievery App", tech: ["OOPS"], link: "https://github.com/bhavanisuresh1512/Oops---Projects/tree/main/Oops%20Project/UNIT%205", image: "/assets/O25.png" },
  { name: "Vehicle Rental App", tech: ["OOPS"], link: "https://github.com/bhavanisuresh1512/Oops---Projects/tree/main/Oops%20Project/UNIT%205", image: "/assets/O26.png" },
  { name: "Vehicle Rental System", tech: ["OOPS"], link: "https://github.com/bhavanisuresh1512/Oops---Projects/tree/main/Oops%20Project/UNIT%205", image: "/assets/O27.png" },
  { name: "Nocturne - Moon Between Lines", tech: ["Web Technology"], link: "https://nocturne-tawny.vercel.app/", image: "/assets/W1.png" },
];



/* ---------- One project card, reveals on scroll into view ---------- */
function ProjectCard({ project }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const showImage = project.image && !imgFailed;

  return (
    <article ref={ref} className={`showcase-card${inView ? " in-view" : ""}`}>
      <div className={`showcase-media${showImage ? "" : " placeholder"}`}>
        {showImage ? (
          <img src={project.image} alt={project.name} loading="lazy" onError={() => setImgFailed(true)} />
        ) : (
          <ImageOff />
        )}
      </div>

      <div className="showcase-body">
        <div className="showcase-kicker">
          <Award />
          <span className="showcase-title">{project.name}</span>
        </div>
        <div className="showcase-badges">
          {project.tech.map((t) => (
            <span className="tag" key={t}>{t}</span>
          ))}
        </div>
        <a className="showcase-btn" href={project.link} target="_blank" rel="noopener noreferrer">
          <ExternalLink />
          View Project
        </a>
      </div>
    </article>
  );
}

/* ---------- Full page ---------- */
export default function ProjectsPage() {
  const [navOpen, setNavOpen] = useState(false);
  const [activeTech, setActiveTech] = useState("All");

  const technologies = useMemo(
    () => ["All", ...new Set(PROJECTS.flatMap((p) => p.tech))],
    []
  );

  const visibleProjects = useMemo(
    () =>
      activeTech === "All"
        ? PROJECTS
        : PROJECTS.filter((p) => p.tech.includes(activeTech)),
    [activeTech]
  );

  return (
    <div className="proj-page">

      <header className="page-header">
        <div className="grid-backdrop" />
        <div className="wrap">
          <div className="eyebrow">Portfolio</div>
          <h1>Projects</h1>
          <p>A collection of things I've built, from Python scripts to full OOP systems.</p>
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          <div className="filter-bar" style={{ marginTop: "40px" }}>
            {technologies.map((tech) => (
              <button
                key={tech}
                className={`filter-btn${tech === activeTech ? " active" : ""}`}
                onClick={() => setActiveTech(tech)}
              >
                {tech}
              </button>
            ))}
          </div>

          {visibleProjects.length === 0 ? (
            <div className="empty-state">No projects in this category yet — check back soon.</div>
          ) : (
            <div className="showcase-grid">
              {visibleProjects.map((project) => (
                <ProjectCard project={project} key={project.name} />
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="site-footer">
        <div className="wrap footer-inner">
          <p>© {new Date().getFullYear()} — Built and maintained by Bhavani.</p>
          <div className="social-row">
            <a href="https://github.com/bhavanisuresh1512" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

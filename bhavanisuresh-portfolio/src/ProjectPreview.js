import "./ProjectPreview.css";

function ProjectPreview() {
  const projects = [
    {
      title: "ATM Machine System",
      description:
        "A Python application for managing Atm machine System functions.",
      tech: ["Python"],
      github:
        "https://github.com/bhavanisuresh1512/ATM-Machine-Operation",
    },
    {
      title: "Hangman Game",
      description:
        "A Python application for playing Hangman Game.",
      tech: ["Python"],
      github:
        "https://github.com/bhavanisuresh1512/Hangman-Game",
    },
    {
      title: "Movie Booking App",
      description:
        "A Java application for booking Movie tickets using oops.",
      tech: ["Python"],
      github:
        "https://github.com/bhavanisuresh1512/Oops---Projects/tree/main/Oops%20Project/UNIT%204",
    },
  ];

  return (
    <section className="project-preview" id="projects-preview">
      <div className="wrap">

        <div className="section-title">
          <p className="eyebrow">Projects</p>

          <h2>Selected Work</h2>

          <p>
            A few of my favourite projects showcasing programming,
            web development and problem-solving skills.
          </p>
        </div>

        <div className="project-grid">

          {projects.map((project, index) => (
            <div className="project-card" key={index}>

              <span className="project-number">
                0{index + 1}
              </span>

              <h3>{project.title}</h3>

              <p>{project.description}</p>

              <div className="tech-stack">
                {project.tech.map((item, i) => (
                  <span key={i}>
                    {item}
                  </span>
                ))}
              </div>

              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                View Project →
              </a>

            </div>
          ))}

        </div>

        {/* SEE ALL PROJECTS BUTTON */}
        <div className="see-all-projects">
          <a href="/projects" className="btn-primary">
            See All Projects  →
          </a>
        </div>

      </div>
    </section>
  );
}

export default ProjectPreview;
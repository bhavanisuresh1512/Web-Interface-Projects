import "./Skills.css";

function Skills() {
  const skills = [
    { name: "Java & OOP", percentage: 89 },
    { name: "Python", percentage: 85 },
    { name: "UI/UX Design", percentage: 85 },
    { name: "Web Technology (HTML/CSS/JS)", percentage: 90 },
    { name: "Object-Oriented Programming", percentage: 85 }
  ];

  return (
    <section id="skills" className="skills">

      <div className="wrap">

        <div className="section-title">
          <p className="eyebrow">Skills</p>
          <h2>What I work with</h2>
          <p>
            A blend of programming fundamentals and an emerging
            focus on interface design.
          </p>
        </div>

        <div className="skills-grid">

          {skills.map((skill, index) => (
            <div className="skill-card" key={index}>

              <div className="skill-header">
                <h3>{skill.name}</h3>
                <span>{skill.percentage}%</span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${skill.percentage}%` }}
                ></div>
              </div>

            </div>
          ))}

        </div>

        <p className="skill-note">
          Percentages are self-assessed proficiency levels and will continue
          to improve with experience and continuous learning.
        </p>

      </div>

    </section>
  );
}

export default Skills;
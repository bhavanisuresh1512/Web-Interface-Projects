import React, { useEffect, useRef, useState } from "react";
import { Award, ExternalLink, ImageOff } from "lucide-react";

import "./Certificates.css"

const CERTIFICATES = [
  {
    title: "Secure Storage for Azure Files & Azure Blob Storage",
    issuer: "Microsoft",
    description:
      "Certified in securing Azure Files and Blob Storage using Microsoft Azure security and access management practices.",
    link: "/assets/C1.jpeg",
    image: "/assets/C1.jpeg",
  },
  {
    title: "Create and Manage Canvas Apps with Power Apps",
    issuer: "Microsoft",
    description:
      "Certified in building and managing low-code business applications using Microsoft Power Apps.",
    link: "/assets/C2.jpeg",
    image: "/assets/C2.jpeg",
  },
  {
    title: "Java Course – Mastering the Fundamentals",
    issuer: "Scaler Topics",
    description:
      "Learned Java fundamentals, OOP concepts, and problem-solving techniques.",
    link: "/assets/C3.jpeg",
    image: "/assets/C3.jpeg",
  },
  {
    title: "JavaScript Course",
    issuer: "Scaler Topics",
    description:
      "Gained practical knowledge of JavaScript programming and web development concepts.",
    link: "/assets/C4.jpeg",
    image: "/assets/C4.jpeg",
  },
  {
    title: "Communication Skills",
    issuer: "TCS iON",
    description:
      "Developed effective verbal, non-verbal, and professional communication skills.",
    link: "/assets/C5.jpeg",
    image: "/assets/C5.jpeg",
  },
  {
    title: "User Experience",
    issuer: "FutureLearn (Accenture)",
    description:
      "Learned UX principles for designing intuitive and user-friendly digital experiences.",
    link: "/assets/C6.jpeg",
    image: "/assets/C6.jpeg",
  },
  {
    title: "Java Programming Fundamentals",
    issuer: "Infosys Springboard",
    description:
      "Learned Java programming basics, OOP concepts, and core programming skills.",
    link: "/assets/C7.jpeg",
    image: "/assets/C7.jpeg",
  },
  {
    title: "Python Fundamentals",
    issuer: "Infosys Springboard",
    description:
      "Gained foundational knowledge of Python programming and problem-solving techniques.",
    link: "/assets/C8.jpeg",
    image: "/assets/C8.jpeg",
  },
  {
    title: "Legacy Responsive Web Design V8",
    issuer: "FreeCodeCamp",
    description:
      "Built responsive websites using HTML5 and CSS3 with modern web design principles.",
    link: "/assets/C9.jpeg",
    image: "/assets/C9.jpeg",
  },
  {
    title: "Responsive Web Design Developer Certification",
    issuer: "FreeCodeCamp",
    description:
      "Completed a 300-hour certification in responsive web design using HTML and CSS.",
    link: "/assets/C10.jpeg",
    image: "/assets/C10.jpeg",
  },
  {
    title: "Claude 101",
    issuer: "Anthropic",
    description: "Introductory course on Claude AI fundamentals.",
    link: "/assets/A1.png",
    image: "/assets/A1.png",
  },
  {
    title: "Claude Code 101",
    issuer: "Anthropic",
    description: "Learned the basics of Claude Code for AI-assisted coding.",
    link: "/assets/A2.png",
    image: "/assets/A2.png",
  },
  {
    title: "Introduction to Claude Cowork",
    issuer: "Anthropic",
    description: "Introduction to collaborating with Claude for productivity.",
    link: "/assets/A3.png",
    image: "/assets/A3.png",
  },
  {
    title: "Claude Code in Action",
    issuer: "Anthropic",
    description: "Applied Claude Code to practical coding workflows.",
    link: "/assets/A4.png",
    image: "/assets/A4.png",
  },
  {
    title: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic",
    description: "Built foundational knowledge of AI concepts and frameworks.",
    link: "/assets/A5.png",
    image: "/assets/A5.png",
  },
  {
    title: "Introduction to Model Context Protocol",
    issuer: "Anthropic",
    description: "Learned the fundamentals of the Model Context Protocol (MCP).",
    link: "/assets/A6.png",
    image: "/assets/A6.png",
  },
  {
    title: "Claude with the Anthropic API",
    issuer: "Anthropic",
    description:
      "Learned to integrate Claude models using the Anthropic API for AI-powered applications.",
    link: "/assets/A7.png",
    image: "/assets/A7.png",
  },
  {
    title: "AI Fluency for Educators",
    issuer: "Anthropic",
    description:
      "Explored practical AI concepts and responsible AI use in education.",
    link: "/assets/A8.png",
    image: "/assets/A8.png",
  },
  {
    title: "AI Fluency for Students",
    issuer: "Anthropic",
    description:
      "Gained foundational knowledge of AI, prompting, and ethical AI practices.",
    link: "/assets/A9.png",
    image: "/assets/A9.png",
  },
  {
    title: "Model Context Protocol: Advanced Topics",
    issuer: "Anthropic",
    description:
      "Learned advanced Model Context Protocol (MCP) concepts for connecting AI with external tools and data.",
    link: "/assets/A10.png",
    image: "/assets/A10.png",
  },
  {
    title: "Claude with Amazon Bedrock",
    issuer: "Anthropic",
    description:
      "Learned to deploy and use Claude AI models through Amazon Bedrock for generative AI applications.",
    link: "/assets/A11.png",
    image: "/assets/A11.png",
  },
  {
    title: "Claude with Google Vertex AI",
    issuer: "Anthropic",
    description:
      "Gained hands-on knowledge of integrating Claude models with Google Vertex AI services.",
    link: "/assets/A12.png",
    image: "/assets/A12.png",
  },
  {
    title: "Teaching the AI Fluency Framework",
    issuer: "Anthropic",
    description:
      "Explored AI fluency principles and effective methods for teaching AI concepts and skills.",
    link: "/assets/A13.png",
    image: "/assets/A13.png",
  },
  {
    title: "AI Fluency for Nonprofits",
    issuer: "Anthropic",
    description:
      "Learned how nonprofits can use AI responsibly to improve impact, efficiency, and outreach.",
    link: "/assets/A14.png",
    image: "/assets/A14.png",
  },
  {
    title: "Introduction to Agent Skills",
    issuer: "Anthropic",
    description:
      "Learned the fundamentals of AI agents, including task automation, reasoning, and tool usage.",
    link: "/assets/A15.png",
    image: "/assets/A15.png",
  },
  {
    title: "Introduction to Subagents",
    issuer: "Anthropic",
    description:
      "Learned how subagents collaborate to break down complex tasks and improve AI workflow efficiency.",
    link: "/assets/A16.png",
    image: "/assets/A16.png",
  },
  {
    title: "AI Capabilities & Limitations",
    issuer: "Anthropic",
    description:
      "Explored the strengths, limitations, and responsible use of AI systems in real-world scenarios.",
    link: "/assets/A10.png",
    image: "/assets/A10.png",
  },
];

/* ---------- One certificate card, reveals on scroll into view ---------- */
function CertCard({ cert }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <article className="certificate-card">
  <div className="certificate-image">
    <img
  src={cert.image}
  alt={cert.title}
  className="certificate-img"
/>
  </div>

  <div className="certificate-content">
    <div className="certificate-header">
      <Award className="award-icon"/>
      <span className="certificate-title">
        {cert.title}
      </span>
    </div>

    <div className="certificate-issuer">
      Issued by: {cert.issuer}
    </div>

    <p className="certificate-description">
      {cert.description}
    </p>

    <a
      href={cert.link}
      target="_blank"
      rel="noopener noreferrer"
      className="certificate-link"
    >
      <ExternalLink size={15}/>
      View Certificate
    </a>
  </div>
</article>
  );
}

/* ---------- Full page ---------- */
function Certificates() {
  return (
    <div className="certificates-page">
  <div className="wrap">
    <div className="page-title">
      <span className="eyebrow">CREDENTIALS</span>
      <h1>Certificates</h1>
    </div>

    {CERTIFICATES.length===0 ? (
      <div className="empty-message">
        Certificates coming soon.
      </div>
    ) : (
      <div className="certificate-grid">
        {CERTIFICATES.map((cert,index)=>(
          <CertCard cert={cert} key={index}/>
        ))}
      </div>
    )}
  </div>
</div>
  );
}

export default Certificates;

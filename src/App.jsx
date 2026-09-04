import "./App.css";
import {
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  Download,
  Menu,
  X,
  ChevronUp,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const projects = [
  {
    id: "flood",
    number: "01",
    title: "Urban Flood Intelligence",
    category: "Full-Stack · Geospatial",
    description:
      "A flood-risk intelligence platform designed to help communities understand urban flood conditions through location-based risk information and citizen reporting.",
    stack: ["Node.js", "Express", "PostgreSQL", "React", "GeoJSON"],
    status: "complete",
    featured: true,
  },
  {
    id: "hesabu",
    number: "02",
    title: "Hesabu",
    category: "Fintech · Web Application",
    description:
      "A Kenyan financial clarity tool for everyday calculations, including transaction fees, salary estimates and budgeting.",
    stack: ["React", "Next.js", "Tailwind CSS", "Node.js"],
    status: "Live",
    href: "https://pesatrack.tech",
    featured: true,
  },
  {
    id: "document-api",
    number: "03",
    title: "Document API",
    category: "Backend · API Architecture",
    description:
      "A document-generation and retrieval API concept designed to provide system-generated documents for different business processes and entities.",
    stack: ["Elixir", "Phoenix", "PostgreSQL"],
    status: "Concept",
    featured: true,
  },
  {
    id: "howold",
    number: "04",
    title: "howOld",
    category: "Experiment · PWA",
    description:
      "An experimental age and life-metrics application exploring interactive interfaces and browser-based visualisation.",
    stack: ["React", "Vite", "Three.js"],
    status: "In development",
    href: "https://how-old-kappa.vercel.app/",
    featured: false,
  },
];

const skills = [
  {
    title: "Languages",
    items: ["Java", "JavaScript", "Elixir"],
  },
  {
    title: "Backend & APIs",
    items: ["Spring Boot", "Node.js", "Express.js", "Phoenix", "REST APIs"],
  },
  {
    title: "Frontend",
    items: ["React", "Next.js", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    title: "Data & Infrastructure",
    items: ["PostgreSQL", "MySQL", "Docker", "Linux"],
  },
  {
    title: "Engineering Practices",
    items: [
      "API Design",
      "Database Design",
      "Authentication",
      "Input Validation",
      "System Design",
    ],
  },
  {
    title: "Business Analysis",
    items: [
      "Requirements Engineering",
      "Agile",
      "SSADM",
      "UML",
      "Process Modeling",
    ],
  },
];

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="section-label">
      {children}
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <article className={`project-card ${project.featured ? "featured" : ""}`}>
      <div className="project-top">
        <span className="project-number">{project.number}</span>

        <span className="project-status">
          <i />
          {project.status}
        </span>
      </div>

      <div className="project-content">
        <p className="project-category">{project.category}</p>

        <h3>{project.title}</h3>

        <p className="project-description">{project.description}</p>

        <div className="project-stack">
          {project.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>

      {project.href ? (
        <a
          className="project-link"
          href={project.href}
          target="_blank"
          rel="noopener noreferrer">
          View project
          <ArrowUpRight size={15} />
        </a>
      ) : (
        <span className="project-link muted-link">Case study coming soon</span>
      )}
    </article>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site">
      <header className="navbar">
        <div className="nav-inner">
          <a href="#home" className="brand" onClick={closeMenu}>
            SUSAN NYAWIRA
          </a>

          <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
            <a href="#home" onClick={closeMenu}>
              Home
            </a>
            <a href="#about" onClick={closeMenu}>
              About
            </a>
            <a href="#work" onClick={closeMenu}>
              Work
            </a>
            <a href="#contact" onClick={closeMenu}>
              Contact
            </a>
          </nav>

          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero section">
          <div className="hero-grid">
            <div className="hero-copy">
              {/* <Reveal>
                <div className="eyebrow">
                  <span />
                  Software Engineer
                </div>
              </Reveal> */}

              <Reveal delay={100}>
                <h1 className="hero-name">
                  <span>Susan</span>
                  <span>Nyawira</span>
                </h1>
              </Reveal>

              <Reveal delay={180}>
                <h2 className="hero-title">
                  Software engineer building backend systems, APIs and reliable
                  applications.
                </h2>
              </Reveal>

              <Reveal delay={260}>
                <p className="hero-description">
                  I enjoy understanding how systems work beneath the interface —
                  from data and APIs to authentication, validation and
                  application architecture.
                </p>
              </Reveal>

              <Reveal delay={340}>
                <div className="hero-actions">
                  <a href="#work" className="button-primary">
                    View my work
                    <ArrowUpRight size={15} />
                  </a>

                  <a
                    href="/Susan_Waithira_CV.pdf"
                    download
                    className="text-button">
                    Download CV
                    <Download size={15} />
                  </a>

                  <a href="#contact" className="text-button">
                    Get in touch
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={200}>
              <div className="profile-frame">
                <div className="profile-image-wrapper">
                  <img
                    src="/profile.jpg"
                    alt="Susan Nyawira"
                    className="profile-image"
                  />
                </div>

                <div className="profile-location">
                  <span>Based in Nairobi, Kenya</span>
                  <small>Open to hybrid opportunities</small>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section about-section">
          <div className="content-width">
            <Reveal>
              <SectionLabel>About</SectionLabel>

              <div className="section-heading-row">
                <h2 className="section-title">
                  Building with a <em>systems</em> mindset.
                </h2>

                <p className="section-intro">
                  I’m interested in the part of software that makes everything
                  else possible.
                </p>
              </div>
            </Reveal>

            <div className="about-grid">
              <Reveal delay={100}>
                <div className="about-text">
                  <p>
                    I’m a software engineering trainee with a background in
                    Computer Science, currently building web applications,
                    backend services and APIs
                  </p>

                  <p>
                    I enjoy taking a problem apart, understanding how its pieces
                    interact and turning that understanding into software that
                    is practical, maintainable and dependable.
                  </p>
                  <p>
                    My current work is centered around backend engineering,
                    APIs, databases and system architecture, while developing a
                    security-conscious approach to how applications are designed
                    and built
                  </p>
                  <p>
                    I'm also developing a strong interest in security-conscious
                    engineering, particularly authentication, input validation
                    and secure system design, with the long-term goal of
                    deepening my work in cybersecurity.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={180}>
                <div className="currently-card">
                  <span className="card-label">Currently building with</span>

                  <div className="currently-list">
                    <span>Java & Spring Boot</span>
                    <span>Elixir & Phoenix</span>
                    <span>PostgreSQL</span>
                    <span>Docker</span>
                    <span>REST APIs</span>
                    <span>Backend architecture</span>
                    <span>Secure application design</span>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={100}>
              <div className="experience">
                <div className="experience-heading">
                  <SectionLabel>Experience</SectionLabel>
                </div>

                <div className="experience-list">
                  <div className="experience-item">
                    <div className="experience-date">2026 — Present</div>
                    <div>
                      <h3>Software Engineering Trainee</h3>
                      <p>Tracom Academy</p>
                    </div>
                  </div>

                  <div className="experience-item">
                    <div className="experience-date">2025</div>
                    <div>
                      <h3>ICT Support / Operations</h3>
                      <p>CIC Insurance Group</p>
                    </div>
                  </div>

                  <div className="experience-item">
                    <div className="experience-date">2023 — 2024</div>
                    <div>
                      <h3>Coding Reviewer</h3>
                      <p>African Centre for Women in ICT</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section skills-section">
          <div className="content-width">
            <Reveal>

              <h2 className="section-title">
                Tools I use to <em>build.</em>
              </h2>
            </Reveal>

            <div className="skills-grid">
              {skills.map((group, index) => (
                <Reveal key={group.title} delay={index * 80}>
                  <div className="skill-card">
                    <span className="card-label">{group.title}</span>

                    <div className="skill-list">
                      {group.items.map((skill) => (
                        <span key={skill}>{skill}</span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="section work-section">
          <div className="content-width">
            <Reveal>
              <SectionLabel>Selected Work</SectionLabel>

              <div className="section-heading-row">
                <h2 className="section-title">
                  Things I’ve <em>built.</em>
                </h2>

                <p className="section-intro">
                  A selection of projects, experiments and systems I’ve worked
                  on while developing my engineering skills.
                </p>
              </div>
            </Reveal>

            <div className="projects-grid">
              {projects.map((project, index) => (
                <Reveal key={project.id} delay={index * 70}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="contact-inner">
            <Reveal>
              <SectionLabel>Contact</SectionLabel>

              <h2 className="contact-title">
                Let’s build something <em>useful.</em>
              </h2>

              <p className="contact-description">
                I’m interested in software engineering opportunities, backend
                development, collaborations and conversations around technology.
              </p>

              <a href="mailto:sw.nyawira@gmail.com" className="email-link">
                sw.nyawira@gmail.com
              </a>

              <div className="social-links">
                <a
                  href="https://github.com/sWaithira"
                  target="_blank"
                  rel="noopener noreferrer">
                  <Github size={17} />
                  GitHub
                </a>

                <a
                  href="https://www.linkedin.com/in/susan-nyawira-9a0606388"
                  target="_blank"
                  rel="noopener noreferrer">
                  <Linkedin size={17} />
                  LinkedIn
                </a>

                <a href="mailto:sw.nyawira@gmail.com">
                  <Mail size={17} />
                  Email
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>© 2026 Susan Nyawira</span>
        <span>Software Engineer</span>
      </footer>

      <button
        className={`back-to-top ${showTop ? "visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top">
        <ChevronUp size={17} />
      </button>
    </div>
  );
}

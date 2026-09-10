import "./App.css";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ArrowUpRight,
  ChevronUp,
  Database,
  ShieldCheck,
  Server,
  Code2,
} from "lucide-react";
import { FaJava } from "react-icons/fa";
import {
  SiSpringboot,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiElixir,
  SiPhoenixframework,
  SiNextdotjs,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiHtml5,
  SiTailwindcss,
} from "react-icons/si";
import { useEffect, useRef, useState } from "react";


const projects = [
  {
    id: "01",
    title: "Urban Flood Intelligence",
    category: "Geospatial / Full Stack",
    description:
      "A system for understanding and communicating urban flood risk across Kenyan cities.",
    status: "Near complete",
    image: "/projects/urban-flood.jpg",
    href: null,
  },
  {
    id: "02",
    title: "Hesabu",
    category: "Fintech / Utility",
    description:
      "A financial utility platform helping Kenyan users make clearer everyday money decisions.",
    status: "Live",
    image: "/projects/hesabu.jpg",
    href: "https://pesatrack.tech",
  },
  {
    id: "03",
    title: "howOld",
    category: "Interactive / Data Viz",
    description:
      "An interactive exploration of age, time and the limited weeks we get.",
    status: "In development",
    image: "/projects/howold.jpg",
    href: "https://how-old-kappa.vercel.app/",
  },
  {
    id: "04",
    title: "Document API",
    category: "Backend / API",
    description:
      "A backend service for generating and serving document-ready outputs from structured application data.",
    status: "Concept",
    image: "/projects/document-api.jpg",
    href: null,
  },
];


const technologies = [
  { name: "Java", icon: FaJava },
  { name: "Spring Boot", icon: SiSpringboot },
  { name: "JavaScript", icon: SiJavascript },
  { name: "React", icon: SiReact },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Express.js", icon: SiExpress },
  { name: "Elixir", icon: SiElixir },
  { name: "Phoenix", icon: SiPhoenixframework },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "Docker", icon: SiDocker },
  { name: "Git", icon: SiGit },
  { name: "HTML", icon: SiHtml5 },
  { name: "CSS", icon: Code2 },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "REST APIs", icon: null },
];


function Reveal({ children, delay = 0, className = "" }) {
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
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}>
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


function TechnologyCard({ name, icon: Icon }) {
  return (
    <div className="technology-card">
      <div className="technology-icon">
        {Icon ? <Icon /> : <span>API</span>}
      </div>

      <span className="technology-name">{name}</span>
    </div>
  );
}


function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className={`project-thumbnail project-thumbnail-${project.id}`}>
        <span className="thumbnail-number">{project.id}</span>

        <div className="thumbnail-mark">
          {project.id === "01" && <Database />}
          {project.id === "02" && <Code2 />}
          {project.id === "03" && <Server />}
          {project.id === "04" && <ShieldCheck />}
        </div>
      </div>

      <div className="project-body">
        <div className="project-meta">
          <span>{project.category}</span>
          <span>{project.status}</span>
        </div>

        <h3>{project.title}</h3>

        <p>{project.description}</p>

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
          <span className="project-link muted-link">
            Case study coming soon
          </span>
        )}
      </div>
    </article>
  );
}


export default function App() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="site">

      <nav className="navbar">
        <div className="nav-inner">
          <a href="#home" className="brand">
            SUSAN NYAWIRA
          </a>
        </div>
      </nav>



      <main>
        <section className="hero" id="home">
          <div className="hero-grid">
            <Reveal className="hero-copy">
              <div className="eyebrow">
                Software Engineering
              </div>

              <h1 className="hero-name">
                <span>Susan</span>
                <span>Nyawira</span>
              </h1>

              <h2 className="hero-title">
                Software engineer building backend systems, APIs and reliable
                applications.
              </h2>

              <p className="hero-description">
                I enjoy understanding how systems work beneath the interface,
                from data and APIs to authentication, validation and application
                architecture.
              </p>

              <div className="hero-actions">
                <a href="#work" className="button-primary">
                  View my work
                  <ArrowUpRight size={15} />
                </a>

                <a
                  href="/Susan_Nyawira_CV.pdf"
                  className="text-button"
                  download>
                  Download CV
                  <Download size={15} />
                </a>

                <a href="#contact" className="text-button">
                  Get in touch
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </Reveal>

            <Reveal delay={150} className="profile-frame">
              <div className="profile-image-wrapper">
                <img
                  src="/profile.jpg"
                  alt="Susan Nyawira"
                  className="profile-image"
                />
              </div>

              <div className="profile-location">
                <span>Nairobi, Kenya</span>
                <small>Software Engineering</small>
              </div>
            </Reveal>
          </div>
        </section>


        <section className="about-section section" id="about">
          <div className="content-width">
            <Reveal>
              <SectionLabel>About</SectionLabel>

              <div className="section-heading-row">
                <h2 className="section-title">
                  Building with a
                  <br />
                  <em>systems mindset.</em>
                </h2>

                <p className="section-intro">
                  I like understanding the problem first, then building software
                  that can actually hold up.
                </p>
              </div>
            </Reveal>

            <div className="about-grid">
              <Reveal delay={100} className="about-text">
                <p>
                  I'm a software engineering trainee with a background in
                  Computer Science and hands-on experience building web
                  applications, backend services and APIs.
                </p>

                <p>
                  I enjoy taking a problem apart, understanding how its pieces
                  interact, and turning that understanding into software that is
                  practical, maintainable and dependable.
                </p>

                <p>
                  My current focus is backend engineering, APIs, databases and
                  system design, while developing a security-conscious approach
                  to how applications are built.
                </p>
              </Reveal>

              <Reveal delay={200} className="experience">
                <div className="experience-heading">
                  <span>Experience</span>
                </div>

                <div className="experience-list">
                  <div className="experience-item">
                    <span className="experience-date">2026 - Present</span>

                    <div>
                      <h3>Tracom Services Limited</h3>
                      <p>Software Engineering Trainee</p>
                    </div>
                  </div>

                  <div className="experience-item">
                    <span className="experience-date">2025 - 2026</span>

                    <div>
                      <h3>CIC Insurance Group</h3>
                      <p>ICT Support Internship</p>
                    </div>
                  </div>

                  <div className="experience-item">
                    <span className="experience-date">Experience</span>

                    <div>
                      <h3>African Centre for Women in ICT</h3>
                      <p>Technology & digital experience</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>


            <Reveal className="technologies-section-inner">
              <SectionLabel>Technologies</SectionLabel>

              <h2 className="section-title technology-heading">
                Tools
              </h2>

              <div className="technology-grid">
                {technologies.map((technology) => (
                  <TechnologyCard key={technology.name} {...technology} />
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="work-section section" id="work">
          <div className="content-width">
            <Reveal>
              <SectionLabel>Selected Work</SectionLabel>

              <div className="section-heading-row work-heading">

                <p className="section-intro">
                  A selection of systems, applications and experiments I've
                  worked on.
                </p>
              </div>
            </Reveal>

            <div className="projects-grid">
              {projects.map((project, index) => (
                <Reveal key={project.id} delay={index * 80}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>


        <section className="contact-section section" id="contact">
          <div className="contact-inner">
            <Reveal>
              <SectionLabel>Contact</SectionLabel>

              <h2 className="contact-title">
                Let's build
                <br />
                <em>something useful.</em>
              </h2>

              <p className="contact-description">
                Interested in working together, discussing a project, or simply
                talking engineering? I'd love to hear from you.
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
        onClick={scrollTop}
        aria-label="Back to top">
        <ChevronUp size={18} />
      </button>
    </div>
  );
}
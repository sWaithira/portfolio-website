import "./App.css";
import { Github, Linkedin, Mail, Sun, Moon, ChevronUp } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const projects = [
  {
    id: "02",
    filename: "howOld",
    title: "howOld - Life Metrics Dashboard",
    desc: "Enter your birthdate and confront your existence. Exact age, planetary ages, generational identity with cultural context, four thousand weeks by Oliver Burkeman — all in a post-apocalyptic cyberpunk dashboard with a rotating 3D globe and live ticking numbers. Download your shareable life card.",
    stack: [
      "React 18",
      "Vite",
      "Three.js",
      "React Three Fiber",
      "Framer Motion",
      "html2canvas",
    ],
    status: "In Development",
    statusLabel: "In Development",
    type: "Interactive · Data Viz · 3D · Generative UI",
    tag: "3D",
    href: "https://how-old-kappa.vercel.app/",
  },
  {
    id: "03",
    filename: "flood-risk-system",
    title: "Urban Flood Risk System",
    desc: "Mapping and predicting urban flood risk in Kenyan cities. Security-aware architecture from line one — because infrastructure data demands it.",
    stack: ["Node.js", "Express", "PostgreSQL", "React", "GeoJSON"],
    status: "near-complete",
    statusLabel: "~85% Complete",
    type: "Full-Stack · Geospatial",
    tag: null,
  },
  {
    id: "01",
    filename: "hesabu",
    ext: ".ke",
    title: "Hesabu - Kenyan Financial Tools",
    desc: "Free utility platform for everyday Kenyan money decisions. M-Pesa fees, salary breakdowns, Fuliza costs and home fibre comparison. Built mobile-first with accurate official data from Safaricom, KRA and NCBA.",
    stack: ["Next.js", "React", "Tailwind CSS", "Vercel", "Formspree"],
    status: "live",
    statusLabel: "Live",
    type: "Frontend · Fintech · Utility",
    href: "https://pesatrack.tech",
  },
  {
    id: "04",
    filename: "creative-marketplace",
    title: "Creative Economy Marketplace",
    desc: null,
    stack: [],
    status: "upcoming",
    statusLabel: "Upcoming",
    type: "Full-Stack · Fintech",
    tag: "Upcoming",
  },
];

// ── Theme tokens ──────────────────────────────────────────────
const th = (mode) => {
  if (mode === "dark")
    return {
      bg: "#0a0812",
      bg2: "#100d1a",
      bg3: "#16112a",
      card: "#0d0a18",
      text: "#f0e6d8",
      muted: "#8a7a9a",
      accent: "#d4956a",
      accentLight: "#e8b4a0",
      purple: "#9b6fd4",
      border: "rgba(155,111,212,0.14)",
      borderHover: "rgba(212,149,106,0.45)",
      bark: "#a0673a",
      termBg: "#07050f",
      navBg: "rgba(10,8,18,0.97)",
      shadow: "rgba(0,0,0,0.55)",
      orb1: "rgba(107,63,160,0.1)",
      orb2: "rgba(196,115,122,0.08)",
      grid: "rgba(107,63,160,0.05)",
      particleColors: [
        "rgba(212,149,106,0.35)",
        "rgba(155,111,212,0.3)",
        "rgba(212,168,67,0.28)",
      ],
      peek1: "rgba(107,63,160,0.2)",
      peek1b: "rgba(107,63,160,0.22)",
      peek2: "rgba(160,103,58,0.18)",
      peek2b: "rgba(160,103,58,0.2)",
      stackBg: "rgba(107,63,160,0.12)",
      skillHoverBg: "rgba(196,115,122,0.06)",
      contactGlow: "rgba(107,63,160,0.1)",
      contactHoverBg: "rgba(212,149,106,0.08)",
      btnBg: "linear-gradient(135deg, #6b3fa0, #c4737a)",
      btnShadow: "rgba(107,63,160,0.3)",
      gradLine:
        "linear-gradient(to right, transparent, #6b3fa0, #d4956a, #6b4226, transparent)",
      outlineColor: "rgba(212,149,106,0.55)",
      commentColor: "rgba(138,122,154,0.5)",
      upcomingColor: "rgba(138,122,154,0.5)",
    };
  return {
    bg: "#0f1120",
    bg2: "#141628",
    bg3: "#1a1c32",
    card: "#131526",
    text: "#dde3f8",
    muted: "#7a84aa",
    accent: "#a78bfa",
    accentLight: "#c4b5fd",
    purple: "#818cf8",
    border: "rgba(129,140,248,0.14)",
    borderHover: "rgba(167,139,250,0.4)",
    bark: "#6366f1",
    termBg: "#0c0e1e",
    navBg: "rgba(15,17,32,0.97)",
    shadow: "rgba(0,0,20,0.55)",
    orb1: "rgba(99,102,241,0.12)",
    orb2: "rgba(129,140,248,0.08)",
    grid: "rgba(99,102,241,0.05)",
    particleColors: [
      "rgba(167,139,250,0.35)",
      "rgba(129,140,248,0.3)",
      "rgba(196,181,253,0.25)",
      "rgba(99,102,241,0.28)",
    ],
    peek1: "rgba(99,102,241,0.18)",
    peek1b: "rgba(99,102,241,0.22)",
    peek2: "rgba(129,140,248,0.14)",
    peek2b: "rgba(129,140,248,0.18)",
    stackBg: "rgba(99,102,241,0.12)",
    skillHoverBg: "rgba(167,139,250,0.07)",
    contactGlow: "rgba(99,102,241,0.1)",
    contactHoverBg: "rgba(167,139,250,0.08)",
    btnBg: "linear-gradient(135deg, #6366f1, #a78bfa)",
    btnShadow: "rgba(99,102,241,0.3)",
    gradLine:
      "linear-gradient(to right, transparent, #6366f1, #a78bfa, #818cf8, transparent)",
    outlineColor: "rgba(167,139,250,0.6)",
    commentColor: "rgba(122,132,170,0.5)",
    upcomingColor: "rgba(122,132,170,0.55)",
  };
};

// ── Typing hook ───────────────────────────────────────────────
function useTyping(text, speed = 60, startDelay = 0, trigger = true) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!trigger) return;
    setDisplayed("");
    setDone(false);
    let i = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(iv);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(iv);
    }, startDelay);
    return () => clearTimeout(t);
  }, [text, speed, startDelay, trigger]);
  return [displayed, done];
}

// Particles
function Particles({ colors }) {
  const canvasRef = useRef(null);
  const colorsRef = useRef(colors);
  colorsRef.current = colors;
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const particles = Array.from({ length: 40 }, (_, idx) => ({
      x: Math.random() * (canvas.width || 800),
      y: Math.random() * (canvas.height || 600),
      r: Math.random() * 2.2 + 0.5,
      vx: (Math.random() - 0.5) * 0.26,
      vy: (Math.random() - 0.5) * 0.26,
      ci: idx % colorsRef.current.length,
      pulse: Math.random() * Math.PI * 2,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.pulse += 0.016;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + Math.sin(p.pulse) * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = colorsRef.current[p.ci % colorsRef.current.length];
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}

// ── Project card — tap on mobile, hover on desktop ────────────
function ProjectCard({ project, mode }) {
  const [open, setOpen] = useState(false);
  const c = th(mode);

  // detect touch device
  const isTouch =
    typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

  const handleInteraction = () => {
    if (isTouch) setOpen((o) => !o);
  };

  const statusColor = {
    live: "#27c93f",
    "near-complete": "#27c93f",
    building: mode === "midnight" ? "#a78bfa" : "#d4956a",
    upcoming: mode === "midnight" ? "#818cf8" : "#9b6fd4",
  }[project.status];

  const tagStyle = {
    API:
      mode === "midnight"
        ? {
            bg: "rgba(99,102,241,0.15)",
            color: "#818cf8",
            border: "rgba(99,102,241,0.28)",
          }
        : {
            bg: "rgba(160,103,58,0.18)",
            color: "#a0673a",
            border: "rgba(160,103,58,0.28)",
          },
    Upcoming:
      mode === "midnight"
        ? {
            bg: "rgba(129,140,248,0.12)",
            color: "#a78bfa",
            border: "rgba(129,140,248,0.25)",
          }
        : {
            bg: "rgba(107,63,160,0.15)",
            color: "#9b6fd4",
            border: "rgba(107,63,160,0.25)",
          },
    "3D":
      mode === "midnight"
        ? {
            bg: "rgba(52,211,153,0.12)",
            color: "#6ee7b7",
            border: "rgba(52,211,153,0.28)",
          }
        : {
            bg: "rgba(52,211,153,0.1)",
            color: "#34d399",
            border: "rgba(52,211,153,0.25)",
          },
  }[project.tag];

  // active = open (touch) or hovered (mouse)
  const [hovered, setHovered] = useState(false);
  const active = isTouch ? open : hovered;

  return (
    <div
      style={{
        position: "relative",
        padding: "0 0.5rem",
        cursor: isTouch ? "pointer" : "default",
      }}
      onMouseEnter={() => {
        if (!isTouch) setHovered(true);
      }}
      onMouseLeave={() => {
        if (!isTouch) setHovered(false);
      }}
      onClick={handleInteraction}
    >
      {/* Peeking tabs — hidden on touch to avoid layout weirdness */}
      {!isTouch && (
        <>
          <div
            style={{
              position: "absolute",
              left: "12%",
              right: "12%",
              top: active ? "-20px" : "-5px",
              height: "26px",
              background: c.peek1,
              border: `1px solid ${c.peek1b}`,
              borderBottom: "none",
              borderRadius: "5px 5px 0 0",
              transition: "top 0.38s cubic-bezier(0.34,1.56,0.64,1)",
              zIndex: 1,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "6%",
              right: "6%",
              top: active ? "-13px" : "-2px",
              height: "22px",
              background: c.peek2,
              border: `1px solid ${c.peek2b}`,
              borderBottom: "none",
              borderRadius: "4px 4px 0 0",
              transition: "top 0.32s cubic-bezier(0.34,1.56,0.64,1) 0.04s",
              zIndex: 2,
            }}
          />
        </>
      )}

      {/* Card */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          padding: "1.25rem",
          background: active ? c.bg3 : c.card,
          border: `1px solid ${active ? c.borderHover : c.border}`,
          borderRadius: "4px",
          transition: "all 0.3s ease",
          transform: active && !isTouch ? "translateY(-5px)" : "translateY(0)",
          boxShadow: active ? `0 12px 40px ${c.shadow}` : "none",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "0.5rem",
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Filename */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                marginBottom: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill={active ? c.accent : c.purple}
                style={{ transition: "fill 0.3s", flexShrink: 0 }}
              >
                <path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z" />
              </svg>
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "0.65rem",
                  color: active ? c.accentLight : c.muted,
                  letterSpacing: "0.03em",
                  transition: "color 0.3s",
                  wordBreak: "break-all",
                }}
              >
                {project.filename}
                <span style={{ color: active ? c.accent : c.purple }}>
                  {project.ext}
                </span>
              </span>
            </div>
            {/* Title */}
            <h3
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "clamp(0.82rem, 2.5vw, 0.95rem)",
                fontWeight: "700",
                color: active ? c.text : c.muted,
                transition: "color 0.3s",
                marginBottom: "0.2rem",
                lineHeight: "1.35",
                wordBreak: "break-word",
              }}
            >
              {project.title}
            </h3>
            <span
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "0.54rem",
                color: c.muted,
                letterSpacing: "0.06em",
              }}
            >
              {project.type}
            </span>
          </div>

          {/* Tags + status — stacked right */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "0.4rem",
              flexShrink: 0,
            }}
          >
            {tagStyle && (
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "0.5rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "0.15rem 0.45rem",
                  background: tagStyle.bg,
                  color: tagStyle.color,
                  border: `1px solid ${tagStyle.border}`,
                  whiteSpace: "nowrap",
                }}
              >
                {project.tag}
              </span>
            )}
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}
            >
              <span
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: statusColor,
                  boxShadow:
                    project.status !== "upcoming"
                      ? `0 0 4px ${statusColor}`
                      : "none",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "0.5rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: statusColor,
                  whiteSpace: "nowrap",
                }}
              >
                {project.statusLabel}
              </span>
            </div>
            {/* Tap hint on mobile */}
            {isTouch && (
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "0.48rem",
                  color: c.muted,
                  letterSpacing: "0.05em",
                  opacity: 0.6,
                }}
              >
                {active ? "tap to close" : "tap to open"}
              </span>
            )}
          </div>
        </div>

        {/* Reveal content */}
        <div
          style={{
            overflow: "hidden",
            maxHeight: active ? "300px" : "0px",
            opacity: active ? 1 : 0,
            transition: "max-height 0.4s ease, opacity 0.3s ease",
          }}
        >
          <div
            style={{ height: "1px", background: c.border, margin: "0.75rem 0" }}
          />
          {project.desc ? (
            <>
              <p
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "clamp(0.65rem, 1.8vw, 0.72rem)",
                  lineHeight: "1.85",
                  color: c.muted,
                }}
              >
                {project.desc}
              </p>
              {project.stack.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.35rem",
                    marginTop: "0.75rem",
                  }}
                >
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      style={{
                        padding: "0.18rem 0.5rem",
                        fontFamily: "DM Mono, monospace",
                        fontSize: "0.54rem",
                        background: c.stackBg,
                        color: c.purple,
                        border: `1px solid ${c.border}`,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
              {project.href && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    marginTop: "1rem",
                    padding: "0.35rem 0.85rem",
                    fontFamily: "DM Mono, monospace",
                    fontSize: "0.58rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: c.accent,
                    border: `1px solid ${c.borderHover}`,
                    textDecoration: "none",
                    transition: "all 0.2s",
                    background: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = c.stackBg;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  Live ↗
                </a>
              )}
            </>
          ) : (
            <span
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "0.64rem",
                fontStyle: "italic",
                color: c.upcomingColor,
              }}
            >
              // details coming soon
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.06 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}
function Reveal({ children, delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// App
export default function App() {
  const [mode, setMode] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const contactRef = useRef(null);
  const c = th(mode);

  const [line1, line1Done] = useTyping("Susan", 80, 400);
  const [line2] = useTyping("Waithira.", 80, line1Done ? 900 : 999999);
  const [emailTyped] = useTyping(
    "sw.nyawira@gmail.com",
    55,
    300,
    contactVisible,
  );

  useEffect(() => {
    const saved = localStorage.getItem("sw-mode");
    if (saved === "dark" || saved === "midnight") setMode(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem("sw-mode", mode);
  }, [mode]);

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 40);
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setContactVisible(true);
      },
      { threshold: 0.15 },
    );
    if (contactRef.current) obs.observe(contactRef.current);
    return () => obs.disconnect();
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Stack", href: "#skills" },
    { label: "My Work", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  // Section label — NO numbers
  const SLabel = ({ label }) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        marginBottom: "1rem",
      }}
    >
      <span
        style={{
          fontFamily: "DM Mono, monospace",
          fontSize: "0.6rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: c.accent,
        }}
      >
        {label}
      </span>
      <div
        style={{ width: "48px", height: "1px", background: `${c.accent}66` }}
      />
    </div>
  );

  const STitle = ({ a, b }) => (
    <h2
      style={{
        fontFamily: "Cormorant Garamond, serif",
        fontSize: "clamp(2.2rem, 6vw, 4rem)",
        fontWeight: "300",
        color: c.text,
        lineHeight: "1.1",
        marginBottom: "2.5rem",
      }}
    >
      {a}
      <br />
      <em style={{ color: c.accent }}>{b}</em>
    </h2>
  );

  return (
    <div
      style={{
        background: c.bg,
        color: c.text,
        minHeight: "100vh",
        overflowX: "hidden",
        transition: "background 0.5s, color 0.4s",
      }}
    >
      {/* ── NAV ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrolled ? c.navBg : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? `1px solid ${c.border}` : "none",
          transition: "all 0.4s ease",
          padding: "1rem 1.5rem",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "0.62rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: c.muted,
                  textDecoration: "none",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = c.accent)}
                onMouseLeave={(e) => (e.currentTarget.style.color = c.muted)}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            {/* Available — desktop only */}
            <div
              className="hidden md:flex items-center gap-2 px-3 py-1.5"
              style={{
                border: "1px solid rgba(39,201,63,0.3)",
                background: "rgba(39,201,63,0.07)",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#27c93f",
                  boxShadow: "0 0 6px rgba(39,201,63,0.7)",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "0.56rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#27c93f",
                }}
              >
                Available
              </span>
            </div>

            {/* Mode toggle */}
            <button
              onClick={() =>
                setMode((m) => (m === "dark" ? "midnight" : "dark"))
              }
              style={{
                padding: "0.45rem",
                background:
                  mode === "dark"
                    ? "rgba(107,63,160,0.1)"
                    : "rgba(99,102,241,0.12)",
                border: `1px solid ${c.border}`,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                borderRadius: "3px",
                transition: "all 0.3s",
              }}
              aria-label="Toggle mode"
            >
              {mode === "dark" ? (
                <Moon className="w-4 h-4" style={{ color: c.accent }} />
              ) : (
                <Sun className="w-4 h-4" style={{ color: c.accent }} />
              )}
            </button>

            {/* GitHub desktop */}
            <a
              href="https://github.com/sWaithira"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2"
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: c.muted,
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = c.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = c.muted)}
            >
              <Github className="w-3.5 h-3.5" /> GitHub
            </a>

            {/* Hamburger */}
            <button
              className="flex md:hidden flex-col justify-center items-center gap-1.5"
              style={{
                width: "36px",
                height: "36px",
                background:
                  mode === "dark"
                    ? "rgba(107,63,160,0.1)"
                    : "rgba(99,102,241,0.12)",
                border: `1px solid ${c.border}`,
                cursor: "pointer",
                borderRadius: "3px",
              }}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Menu"
            >
              <span
                style={{
                  width: "15px",
                  height: "1px",
                  background: c.muted,
                  transition: "all 0.3s",
                  transform: menuOpen
                    ? "rotate(45deg) translate(2px,2px)"
                    : "none",
                }}
              />
              <span
                style={{
                  width: "15px",
                  height: "1px",
                  background: c.muted,
                  opacity: menuOpen ? 0 : 1,
                  transition: "all 0.3s",
                }}
              />
              <span
                style={{
                  width: "15px",
                  height: "1px",
                  background: c.muted,
                  transition: "all 0.3s",
                  transform: menuOpen
                    ? "rotate(-45deg) translate(2px,-2px)"
                    : "none",
                }}
              />
            </button>
          </div>
        </div>

        {scrolled && <div style={{ height: "1px", background: c.gradLine }} />}

        {/* Mobile dropdown */}
        <div
          style={{
            maxHeight: menuOpen ? "320px" : "0",
            overflow: "hidden",
            transition: "max-height 0.4s ease",
          }}
        >
          <div
            style={{
              padding: "1.25rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              borderTop: `1px solid ${c.border}`,
              marginTop: "0.75rem",
            }}
          >
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "0.7rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: c.muted,
                  textDecoration: "none",
                }}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                border: "1px solid rgba(39,201,63,0.3)",
                background: "rgba(39,201,63,0.07)",
                padding: "0.45rem 0.75rem",
                width: "fit-content",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#27c93f",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "0.56rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#27c93f",
                }}
              >
                Available
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "clamp(6rem, 10vw, 8rem) clamp(1.25rem, 5vw, 8rem) 4rem",
          position: "relative",
          overflow: "hidden",
          background: `linear-gradient(135deg, ${c.bg} 0%, ${c.bg2} 50%, ${c.bg} 100%)`,
        }}
      >
        <Particles colors={c.particleColors} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(${c.grid} 1px, transparent 1px), linear-gradient(90deg, ${c.grid} 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse at center, black 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "20%",
            right: "10%",
            width: "clamp(200px, 35vw, 350px)",
            height: "clamp(200px, 35vw, 350px)",
            borderRadius: "50%",
            background: c.orb1,
            filter: "blur(80px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            right: "25%",
            width: "clamp(150px, 25vw, 250px)",
            height: "clamp(150px, 25vw, 250px)",
            borderRadius: "50%",
            background: c.orb2,
            filter: "blur(60px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "760px",
            width: "100%",
          }}
        >
          {/* Tag */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1.75rem",
              opacity: 0,
              animation: "fadeUp 0.7s ease 0.2s forwards",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "1px",
                background: c.accent,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "clamp(0.52rem, 1.5vw, 0.62rem)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: c.accent,
              }}
            >
              Security-Minded Developer
            </span>
          </div>

          {/* Name */}
          <h1
            style={{
              fontFamily: "Syne, sans-serif",
              lineHeight: "0.92",
              marginBottom: "1.5rem",
              minHeight: "clamp(6rem, 16vw, 14rem)",
            }}
          >
            <span
              style={{
                display: "block",
                fontWeight: 900,
                fontSize: "clamp(3rem, 12vw, 7rem)",
                color: c.text,
                letterSpacing: "-0.02em",
              }}
            >
              {line1}
              <span
                style={{
                  opacity: line1Done ? 0 : 1,
                  transition: "opacity 0.1s",
                }}
              >
                |
              </span>
            </span>
            <span
              style={{
                display: "block",
                fontWeight: 900,
                fontSize: "clamp(3rem, 12vw, 7rem)",
                letterSpacing: "-0.02em",
                WebkitTextStroke: `1px ${c.outlineColor}`,
                color: "transparent",
              }}
            >
              {line2}
              <span
                style={{
                  WebkitTextStroke: "0px",
                  color: c.outlineColor,
                  opacity:
                    line1Done && line2.length < "Waithira.".length ? 1 : 0,
                  transition: "opacity 0.1s",
                }}
              >
                |
              </span>
            </span>
          </h1>

          {/* Bio */}
          <p
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "clamp(0.75rem, 2vw, 0.85rem)",
              lineHeight: "2",
              color: c.muted,
              maxWidth: "560px",
              marginBottom: "1.75rem",
              opacity: 0,
              animation: "fadeUp 0.8s ease 1.8s forwards",
            }}
          >
            I build full-stack systems with a{" "}
            <span style={{ color: c.accentLight }}>
              security-first architecture
            </span>{" "}
            mindset. I enjoy stress-testing my own assumptions and rebuilding
            until the design actually holds. Recently working on an{" "}
            <span style={{ color: c.accentLight }}>
              urban flood risk system
            </span>
            , creative economy platform and language preservation tools for
            African communities.
          </p>

          {/* Quote */}
          <div
            style={{
              borderLeft: `2px solid ${c.accent}`,
              background:
                mode === "midnight"
                  ? "rgba(167,139,250,0.05)"
                  : "rgba(212,149,106,0.05)",
              marginBottom: "2rem",
              opacity: 0,
              animation: "fadeUp 0.8s ease 2.0s forwards",
            }}
          >
            <p
              style={{
                padding: "0.75rem 1rem",
                fontFamily: "DM Mono, monospace",
                fontSize: "clamp(0.68rem, 1.8vw, 0.74rem)",
                fontStyle: "italic",
                color: c.muted,
                lineHeight: "1.8",
              }}
            >
              The first time my code worked as I intended, I understood why
              people get obsessed with building things.
            </p>
          </div>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              flexWrap: "wrap",
              opacity: 0,
              animation: "fadeUp 0.8s ease 2.2s forwards",
            }}
          >
            <a
              href="#projects"
              style={{
                padding: "0.8rem 1.75rem",
                fontFamily: "DM Mono, monospace",
                fontSize: "clamp(0.6rem, 1.5vw, 0.68rem)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                background: c.btnBg,
                color: "#f0e6f8",
                textDecoration: "none",
                boxShadow: `0 4px 20px ${c.btnShadow}`,
                transition: "transform 0.3s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-2px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              View my selected work
            </a>
            <a
              href="#contact"
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "clamp(0.6rem, 1.5vw, 0.68rem)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: c.muted,
                textDecoration: "none",
                transition: "color 0.3s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = c.accentLight)
              }
              onMouseLeave={(e) => (e.currentTarget.style.color = c.muted)}
            >
              Get in touch →
            </a>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section
        id="about"
        style={{
          padding: "clamp(3.5rem, 8vw, 7rem) clamp(1.25rem, 5vw, 8rem)",
          background: c.bg2,
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal>
            <SLabel label="About" />
            <STitle a="About" b="me" />
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "clamp(2rem, 5vw, 4rem)",
              alignItems: "start",
            }}
          >
            <Reveal delay={100}>
              <p
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "clamp(0.75rem, 2vw, 0.82rem)",
                  lineHeight: "2.1",
                  color: c.muted,
                  marginBottom: "1.25rem",
                }}
              >
                Computer Science undergraduate at{" "}
                <span style={{ color: c.accentLight }}>
                  Technical University of Mombasa
                </span>
                , on a mission to build systems that solve problems the tech
                world largely ignores.
              </p>
              <p
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "clamp(0.75rem, 2vw, 0.82rem)",
                  lineHeight: "2.1",
                  color: c.muted,
                  marginBottom: "1.25rem",
                }}
              >
                My interest in security isn't academic. It came from realising
                that every system I build will eventually meet someone trying to
                break it. I'd rather be the one who already thought of that.
              </p>
              <p
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "clamp(0.75rem, 2vw, 0.82rem)",
                  lineHeight: "2.1",
                  color: c.muted,
                }}
              >
                Long-term goal:{" "}
                <span style={{ color: c.accentLight }}>
                  specialise in cybersecurity
                </span>{" "}
                and build infrastructure that African communities can trust.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div
                style={{
                  background: c.termBg,
                  border: `1px solid ${c.border}`,
                  padding: "1.25rem",
                  overflowX: "auto",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    marginBottom: "0.75rem",
                    paddingBottom: "0.6rem",
                    borderBottom: `1px solid ${c.border}`,
                  }}
                >
                  {["#ff5f56", "#ffbd2e", "#27c93f"].map((col) => (
                    <span
                      key={col}
                      style={{
                        width: "9px",
                        height: "9px",
                        borderRadius: "50%",
                        background: col,
                        display: "inline-block",
                        flexShrink: 0,
                      }}
                    />
                  ))}
                </div>
                <div
                  style={{
                    fontFamily: "DM Mono, monospace",
                    fontSize: "clamp(0.62rem, 1.8vw, 0.72rem)",
                    lineHeight: "2.1",
                    color: c.muted,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  <div>
                    <span style={{ color: c.commentColor }}>
                      // current status
                    </span>
                  </div>
                  <div>
                    <span style={{ color: c.purple }}>const</span> susan = {"{"}
                  </div>
                  <div>
                    &nbsp;&nbsp;role:{" "}
                    <span style={{ color: c.accentLight }}>
                      "Full-stack Developer"
                    </span>
                    ,
                  </div>
                  <div>
                    &nbsp;&nbsp;focus:{" "}
                    <span style={{ color: c.accentLight }}>
                      "Security-aware architecture"
                    </span>
                    ,
                  </div>
                  <div>
                    &nbsp;&nbsp;location:{" "}
                    <span style={{ color: c.accentLight }}>
                      "Mombasa, Kenya"
                    </span>
                    ,
                  </div>
                  <div>
                    &nbsp;&nbsp;stack:{" "}
                    <span style={{ color: c.accentLight }}>
                      "Node/Express/Postgres/React"
                    </span>
                    ,
                  </div>
                  <div>
                    &nbsp;&nbsp;available:{" "}
                    <span style={{ color: "#27c93f" }}>true</span>
                  </div>
                  <div>{"}"}</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section
        id="skills"
        style={{
          padding: "clamp(3.5rem, 8vw, 7rem) clamp(1.25rem, 5vw, 8rem)",
          background: c.bg,
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal>
            <SLabel label="Stack" />
            <STitle a="Tech" b="stack" />
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1rem",
            }}
          >
            {[
              {
                title: "Backend",
                color: c.purple,
                skills: [
                  "Node.js",
                  "Express.js",
                  "REST APIs",
                  "PostgreSQL",
                  "JWT Auth",
                  "bcrypt",
                  "Middleware design",
                ],
              },
              {
                title: "Frontend",
                color: c.accent,
                skills: [
                  "React",
                  "JavaScript",
                  "Tailwind CSS",
                  "HTML5",
                  "CSS3",
                  "Responsive Design",
                  "PWA",
                ],
              },
              {
                title: "Security & Tools",
                color: c.bark,
                skills: [
                  "Security-first Design",
                  "Input Validation",
                  "Git & GitHub",
                  "Linux",
                  "Docker",
                  "VS Code",
                  "Vercel",
                ],
              },
            ].map((group, i) => (
              <Reveal key={group.title} delay={i * 80}>
                <div
                  style={{
                    padding: "1.5rem",
                    border: `1px solid ${c.border}`,
                    background: c.bg2,
                    transition: "border-color 0.3s",
                    height: "100%",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = c.borderHover)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = c.border)
                  }
                >
                  <div
                    style={{
                      fontFamily: "DM Mono, monospace",
                      fontSize: "0.58rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: group.color,
                      marginBottom: "1.25rem",
                      paddingBottom: "0.75rem",
                      borderBottom: `1px solid ${c.border}`,
                    }}
                  >
                    {group.title}
                  </div>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}
                  >
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          padding: "0.3rem 0.65rem",
                          fontFamily: "DM Mono, monospace",
                          fontSize: "clamp(0.58rem, 1.5vw, 0.64rem)",
                          color: c.muted,
                          border: `1px solid ${c.border}`,
                          transition: "all 0.2s",
                          cursor: "default",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = c.accentLight;
                          e.currentTarget.style.borderColor = c.borderHover;
                          e.currentTarget.style.background = c.skillHoverBg;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = c.muted;
                          e.currentTarget.style.borderColor = c.border;
                          e.currentTarget.style.background = "transparent";
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section
        id="projects"
        style={{
          padding: "clamp(3.5rem, 8vw, 7rem) clamp(1.25rem, 5vw, 8rem)",
          background: c.bg2,
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal>
            <SLabel label="My Work" />
            <STitle a="My" b="work" />
            <p
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "clamp(0.62rem, 1.8vw, 0.72rem)",
                color: c.muted,
                marginBottom: "2.5rem",
                marginTop: "-1.5rem",
                letterSpacing: "0.04em",
              }}
            >
              Open to feedback and collaborations.
            </p>
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "clamp(1.5rem, 4vw, 2.5rem)",
              paddingTop: "1rem",
            }}
          >
            {projects.map((project, i) => (
              <Reveal key={project.id} delay={i * 60}>
                <ProjectCard project={project} mode={mode} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section
        id="contact"
        ref={contactRef}
        style={{
          padding: "clamp(3.5rem, 8vw, 7rem) clamp(1.25rem, 5vw, 8rem)",
          background: c.bg,
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse 50% 50% at 50% 100%, ${c.contactGlow} 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          <Reveal>
            <SLabel label="Contact" />
            <STitle a="Let's build" b="something real" />
            <p
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "clamp(0.7rem, 2vw, 0.8rem)",
                lineHeight: "1.9",
                color: c.muted,
                marginBottom: "2rem",
                marginTop: "-1.5rem",
              }}
            >
              Open to internship opportunities, collaborations and connecting
              with fellow developers.
            </p>

            {/* Typing email */}
            <a
              href="mailto:sw.nyawira@gmail.com"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(1.1rem, 4vw, 2.4rem)",
                fontWeight: "300",
                color: c.text,
                textDecoration: "none",
                letterSpacing: "0.03em",
                display: "inline-block",
                transition: "color 0.3s",
                wordBreak: "break-all",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = c.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = c.text)}
            >
              {emailTyped}
              <span
                style={{
                  display: "inline-block",
                  width: "2px",
                  height: "1em",
                  background: c.accent,
                  verticalAlign: "middle",
                  marginLeft: "2px",
                  animation: "blink 1s step-end infinite",
                }}
              />
            </a>

            {/* Social icons */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "clamp(1rem, 4vw, 2rem)",
                marginTop: "2.5rem",
                flexWrap: "wrap",
              }}
            >
              {[
                {
                  icon: <Github className="w-5 h-5" />,
                  label: "GitHub",
                  href: "https://github.com/sWaithira",
                },
                {
                  icon: <Linkedin className="w-5 h-5" />,
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/in/susan-nyawira-9a0606388",
                },
                {
                  icon: <Mail className="w-5 h-5" />,
                  label: "Email",
                  href: "mailto:sw.nyawira@gmail.com",
                },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.4rem",
                    textDecoration: "none",
                    color: c.muted,
                    transition: "color 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = c.accentLight;
                    e.currentTarget.querySelector(
                      ".icon-box",
                    ).style.borderColor = c.accent;
                    e.currentTarget.querySelector(
                      ".icon-box",
                    ).style.background = c.contactHoverBg;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = c.muted;
                    e.currentTarget.querySelector(
                      ".icon-box",
                    ).style.borderColor = c.border;
                    e.currentTarget.querySelector(
                      ".icon-box",
                    ).style.background = "transparent";
                  }}
                >
                  <div
                    className="icon-box"
                    style={{
                      padding: "0.85rem",
                      border: `1px solid ${c.border}`,
                      background: "transparent",
                      transition: "all 0.3s",
                    }}
                  >
                    {link.icon}
                  </div>
                  <span
                    style={{
                      fontFamily: "DM Mono, monospace",
                      fontSize: "0.56rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          padding: "1.75rem clamp(1.25rem, 5vw, 8rem)",
          borderTop: `1px solid ${c.border}`,
          background: c.bg,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        {["© 2025 Susan Waithira", "Security-Minded Developer"].map((txt) => (
          <span
            key={txt}
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.08em",
              color: c.muted,
            }}
          >
            {txt}
          </span>
        ))}
      </footer>

      {/* ── BACK TO TOP ── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          zIndex: 50,
          width: "42px",
          height: "42px",
          background: c.btnBg,
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: showTop ? 1 : 0,
          transform: showTop ? "translateY(0)" : "translateY(16px)",
          transition: "all 0.4s ease",
          pointerEvents: showTop ? "auto" : "none",
          boxShadow: `0 4px 20px ${c.btnShadow}`,
          borderRadius: "3px",
        }}
        aria-label="Back to top"
      >
        <ChevronUp className="w-4 h-4" style={{ color: "#f0e6f8" }} />
      </button>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}

import { useState, useEffect, useRef, useCallback } from "react";

// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Journey", "Contact"];

const SKILLS = {
  Frontend: [
    { name: "React.js", level: 92 },
    { name: "Next.js", level: 88 },
    { name: "TypeScript", level: 85 },
    { name: "Tailwind CSS", level: 90 },
    { name: "Three.js", level: 75 },
  ],
  Backend: [
    { name: "Node.js", level: 85 },
    { name: "Express.js", level: 82 },
    { name: "MongoDB", level: 78 },
    { name: "PostgreSQL", level: 72 },
    { name: "REST APIs", level: 88 },
  ],
  Tools: [
    { name: "Git & GitHub", level: 90 },
    { name: "Docker", level: 68 },
    { name: "Figma", level: 80 },
    { name: "VS Code", level: 95 },
    { name: "Vercel", level: 85 },
  ],
};

const PROJECTS = [
  {
    id: 1,
    title: "NovaMind AI Dashboard",
    desc: "An AI-powered analytics platform with real-time data visualisation, natural language queries, and predictive insights for enterprise teams.",
    tech: ["React", "Python", "OpenAI", "D3.js", "FastAPI"],
    category: "AI",
    color: "#00d4ff",
    demo: "#",
    github: "#",
    icon: "🧠",
  },
  {
    id: 2,
    title: "AetherStore",
    desc: "A full-stack e-commerce ecosystem featuring AR product previews, AI recommendations, lightning-fast checkout, and an admin analytics suite.",
    tech: ["Next.js", "Stripe", "MongoDB", "Tailwind", "Three.js"],
    category: "Fullstack",
    color: "#a855f7",
    demo: "#",
    github: "#",
    icon: "🛍️",
  },
  {
    id: 3,
    title: "Orbital Chat",
    desc: "A real-time collaborative workspace with end-to-end encryption, threaded conversations, file sharing, and video calling powered by WebRTC.",
    tech: ["Socket.io", "React", "Node.js", "WebRTC", "Redis"],
    category: "Realtime",
    color: "#10b981",
    demo: "#",
    github: "#",
    icon: "💬",
  },
  {
    id: 4,
    title: "CryptoNaut Tracker",
    desc: "A sophisticated crypto portfolio manager with live market feeds, technical analysis charts, price alerts, and DeFi yield tracking.",
    tech: ["React", "WebSocket", "Chart.js", "Node.js", "CoinGecko API"],
    category: "Fintech",
    color: "#f59e0b",
    demo: "#",
    github: "#",
    icon: "📊",
  },
  {
    id: 5,
    title: "PixelForge",
    desc: "A browser-based creative suite for designers — vector editing, image manipulation, font pairing, and export to SVG/PNG/WebP in one click.",
    tech: ["Canvas API", "React", "Fabric.js", "TypeScript", "Zustand"],
    category: "Creative",
    color: "#ec4899",
    demo: "#",
    github: "#",
    icon: "🎨",
  },
  {
    id: 6,
    title: "DevPath LMS",
    desc: "An interactive learning management system with code sandboxes, progress tracking, AI code review, and gamified skill trees for developers.",
    tech: ["Next.js", "Prisma", "PostgreSQL", "Monaco Editor", "OpenAI"],
    category: "Fullstack",
    color: "#6366f1",
    demo: "#",
    github: "#",
    icon: "🚀",
  },
];

const JOURNEY = [
  {
    year: "2024",
    title: "Senior Frontend Developer",
    org: "TechVerse Labs",
    desc: "Led development of mission-critical dashboards serving 200k+ users. Mentored junior devs and architected micro-frontend systems.",
    type: "work",
  },
  {
    year: "2023",
    title: "Full-Stack Developer",
    org: "NovaBit Solutions",
    desc: "Built scalable REST APIs, React SPAs, and integrated third-party services for fintech and healthcare clients.",
    type: "work",
  },
  {
    year: "2022",
    title: "B.Tech — Computer Science",
    org: "VIT University",
    desc: "Graduated with distinction. Published a research paper on optimizing React rendering performance for large-scale applications.",
    type: "edu",
  },
  {
    year: "2021",
    title: "Open Source Contributor",
    org: "React Ecosystem",
    desc: "Contributed to 10+ open-source libraries. Reached 1k GitHub stars on a custom hook library for form state management.",
    type: "achievement",
  },
  {
    year: "2020",
    title: "Freelance Web Developer",
    org: "Self-employed",
    desc: "Delivered 30+ client projects globally. Specialised in high-conversion landing pages and e-commerce solutions.",
    type: "work",
  },
];

// ─── PARTICLE BACKGROUND ─────────────────────────────────────────────────────
function ParticleCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    const particles = Array.from({ length: 90 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.6 + 0.1,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,${p.opacity})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > W) p.dx *= -1;
        if (p.y < 0 || p.y > H) p.dy *= -1;
      }
      // draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,212,255,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

// ─── TYPING ANIMATION ────────────────────────────────────────────────────────
function TypeWriter({ phrases }) {
  const [text, setText] = useState("");
  const [ph, setPh] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const full = phrases[ph];
    const timeout = setTimeout(() => {
      if (!del) {
        if (text.length < full.length) setText(full.slice(0, text.length + 1));
        else setTimeout(() => setDel(true), 1800);
      } else {
        if (text.length > 0) setText(full.slice(0, text.length - 1));
        else { setDel(false); setPh((ph + 1) % phrases.length); }
      }
    }, del ? 45 : 90);
    return () => clearTimeout(timeout);
  }, [text, del, ph, phrases]);
  return (
    <span style={{ color: "#00d4ff" }}>
      {text}<span style={{ animation: "blink 1s infinite", color: "#00d4ff" }}>|</span>
    </span>
  );
}

// ─── SKILL BAR ───────────────────────────────────────────────────────────────
function SkillBar({ name, level, color, visible }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 13, fontFamily: "'Space Mono', monospace", color: "#cbd5e1" }}>{name}</span>
        <span style={{ fontSize: 12, color: color, fontFamily: "'Space Mono', monospace" }}>{level}%</span>
      </div>
      <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 99, height: 6, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          borderRadius: 99,
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
          width: visible ? `${level}%` : "0%",
          transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: `0 0 12px ${color}88`,
        }} />
      </div>
    </div>
  );
}

// ─── PROJECT CARD ────────────────────────────────────────────────────────────
function ProjectCard({ proj, visible }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov
          ? `linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))`
          : "rgba(255,255,255,0.03)",
        border: `1px solid ${hov ? proj.color + "55" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 20,
        padding: "28px 28px 24px",
        cursor: "pointer",
        transition: "all 0.4s ease",
        transform: hov ? "translateY(-8px)" : visible ? "translateY(0)" : "translateY(30px)",
        opacity: visible ? 1 : 0,
        backdropFilter: "blur(20px)",
        boxShadow: hov ? `0 20px 60px ${proj.color}22, 0 0 0 1px ${proj.color}33` : "0 4px 20px rgba(0,0,0,0.3)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* glow top */}
      <div style={{
        position: "absolute", top: 0, left: "20%", right: "20%", height: 2,
        background: `linear-gradient(90deg, transparent, ${proj.color}, transparent)`,
        opacity: hov ? 1 : 0, transition: "opacity 0.4s",
      }} />
      <div style={{ fontSize: 36, marginBottom: 14 }}>{proj.icon}</div>
      <h3 style={{ fontSize: 18, fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#f1f5f9", marginBottom: 10 }}>{proj.title}</h3>
      <p style={{ fontSize: 13.5, color: "#94a3b8", lineHeight: 1.7, marginBottom: 18 }}>{proj.desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 22 }}>
        {proj.tech.map(t => (
          <span key={t} style={{
            fontSize: 11, padding: "3px 10px", borderRadius: 99,
            background: `${proj.color}18`, color: proj.color,
            border: `1px solid ${proj.color}33`, fontFamily: "'Space Mono', monospace",
          }}>{t}</span>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        {[["↗ Live Demo", proj.demo], ["⌥ GitHub", proj.github]].map(([label, href]) => (
          <a key={label} href={href}
            style={{
              fontSize: 12, padding: "7px 16px", borderRadius: 99,
              background: label.includes("Live") ? proj.color : "transparent",
              color: label.includes("Live") ? "#000" : proj.color,
              border: `1px solid ${proj.color}`,
              fontFamily: "'Space Mono', monospace", fontWeight: 700,
              textDecoration: "none", transition: "all 0.2s",
            }}
          >{label}</a>
        ))}
      </div>
    </div>
  );
}

// ─── SECTION WRAPPER (intersection observer) ─────────────────────────────────
function Section({ id, children, style = {} }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <section id={id} ref={ref} style={{
      minHeight: "100vh", padding: "100px 0", position: "relative", zIndex: 1,
      opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(40px)",
      transition: "opacity 0.8s ease, transform 0.8s ease",
      ...style,
    }}>
      {children}
    </section>
  );
}

// ─── SECTION HEADING ─────────────────────────────────────────────────────────
function SectionHeading({ label, title }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 64 }}>
      <span style={{
        fontSize: 11, letterSpacing: "0.25em", color: "#00d4ff",
        fontFamily: "'Space Mono', monospace", textTransform: "uppercase",
        display: "block", marginBottom: 12,
      }}>{label}</span>
      <h2 style={{
        fontSize: "clamp(32px, 5vw, 52px)", fontFamily: "'Syne', sans-serif",
        fontWeight: 800, color: "#f1f5f9",
        background: "linear-gradient(135deg, #f1f5f9, #94a3b8)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      }}>{title}</h2>
      <div style={{ width: 60, height: 3, background: "linear-gradient(90deg, #00d4ff, #a855f7)", margin: "16px auto 0", borderRadius: 99 }} />
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [loading, setLoading] = useState(true);
  const [activeCat, setActiveCat] = useState("All");
  const [activeSkillTab, setActiveSkillTab] = useState("Frontend");
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [projVisible, setProjVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const skillRef = useRef(null);
  const projRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setSkillsVisible(true); }, { threshold: 0.2 });
    if (skillRef.current) io.observe(skillRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setProjVisible(true); }, { threshold: 0.1 });
    if (projRef.current) io.observe(projRef.current);
    return () => io.disconnect();
  }, []);

  const filteredProjects = activeCat === "All" ? PROJECTS : PROJECTS.filter(p => p.category === activeCat);
  const cats = ["All", ...new Set(PROJECTS.map(p => p.category))];

  const scroll = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setFormState({ name: "", email: "", message: "" });
  };

  // ── LOADING SCREEN ──
  if (loading) return (
    <div style={{
      position: "fixed", inset: 0, background: "#050a14",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 9999,
    }}>
      <div style={{
        width: 60, height: 60, borderRadius: "50%",
        border: "2px solid rgba(0,212,255,0.15)",
        borderTop: "2px solid #00d4ff",
        animation: "spin 1s linear infinite",
        marginBottom: 28,
      }} />
      <div style={{
        fontFamily: "'Space Mono', monospace", color: "#00d4ff",
        fontSize: 13, letterSpacing: "0.3em", animation: "pulse 1.5s ease infinite",
      }}>INITIALISING..</div>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
      `}</style>
    </div>
  );

  return (
    <div style={{ background: "#050a14", color: "#f1f5f9", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050a14; }
        ::-webkit-scrollbar-thumb { background: #00d4ff44; border-radius: 99px; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes glow { 0%,100%{box-shadow:0 0 20px #00d4ff44} 50%{box-shadow:0 0 60px #00d4ff99} }
        @keyframes slideIn { from{opacity:0;transform:translateX(-30px)} to{opacity:1;transform:none} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
        a { color: inherit; }
        input, textarea { outline: none; }
        button { cursor: pointer; border: none; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        .grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; }
        .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
        @media(max-width:768px){
          .hide-mobile{display:none!important}
          .grid-2,.grid-3{grid-template-columns:1fr}
        }
      `}</style>

      <ParticleCanvas />

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "16px 0",
        background: scrolled ? "rgba(5,10,20,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,212,255,0.08)" : "none",
        transition: "all 0.4s ease",
      }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20 }}>
            <span style={{ color: "#00d4ff" }}>ASR</span>
            <span style={{ color: "rgba(255,255,255,0.3)", margin: "0 6px" }}>·</span>
            <span style={{ fontSize: 13, color: "#64748b", fontFamily: "'Space Mono', monospace", fontWeight: 400 }}>DEV</span>
          </div>
          <div className="hide-mobile" style={{ display: "flex", gap: 36 }}>
            {NAV_LINKS.map(n => (
              <button key={n} onClick={() => scroll(n)}
                style={{ background: "none", color: "#94a3b8", fontSize: 13, fontFamily: "'Space Mono', monospace", letterSpacing: "0.05em", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "#00d4ff"}
                onMouseLeave={e => e.target.style.color = "#94a3b8"}
              >{n}</button>
            ))}
          </div>
          <button onClick={() => scroll("contact")} className="hide-mobile"
            style={{
              background: "linear-gradient(135deg, #00d4ff, #0099cc)", color: "#000",
              padding: "9px 22px", borderRadius: 99, fontSize: 12,
              fontFamily: "'Space Mono', monospace", fontWeight: 700, letterSpacing: "0.05em",
              boxShadow: "0 0 20px #00d4ff44",
            }}>HIRE ME</button>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", color: "#94a3b8", fontSize: 22 }}
            className="mobile-menu">☰</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1, padding: "120px 24px 60px" }}>
        {/* Grid overlay */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        {/* Radial glow */}
        <div style={{
          position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)",
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{ textAlign: "center", position: "relative", zIndex: 1, maxWidth: 820 }}>
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 28,
            padding: "8px 20px", borderRadius: 99,
            background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)",
            animation: "fadeUp 0.6s ease both",
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#00d4ff", animation: "glow 2s infinite", display: "block" }} />
            <span style={{ fontSize: 12, color: "#00d4ff", fontFamily: "'Space Mono', monospace", letterSpacing: "0.15em" }}>AVAILABLE FOR WORK</span>
          </div>

          <h1 style={{
            fontSize: "clamp(42px, 8vw, 86px)", fontFamily: "'Syne', sans-serif", fontWeight: 800,
            lineHeight: 1.05, marginBottom: 12, animation: "fadeUp 0.7s 0.1s ease both",
          }}>
            <span style={{ display: "block", color: "#f1f5f9" }}>Aaditya Singh</span>
            <span style={{
              display: "block",
              background: "linear-gradient(135deg, #00d4ff 0%, #a855f7 50%, #00d4ff 100%)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              animation: "shimmer 4s linear infinite",
            }}>Rawat</span>
          </h1>

          <div style={{ fontSize: "clamp(18px, 3vw, 26px)", marginBottom: 24, animation: "fadeUp 0.7s 0.2s ease both", minHeight: 42 }}>
            <TypeWriter phrases={["Creative Web Developer", "Full-Stack Engineer", "UI/UX Enthusiast", "Open Source Builder", "Digital Experience Crafter"]} />
          </div>

          <p style={{
            fontSize: 17, color: "#64748b", lineHeight: 1.8, maxWidth: 560, margin: "0 auto 40px",
            animation: "fadeUp 0.7s 0.3s ease both",
          }}>
            I craft immersive digital experiences where design meets engineering. Turning complex ideas into elegant, performant, and beautiful web realities.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", animation: "fadeUp 0.7s 0.4s ease both" }}>
            <button onClick={() => scroll("projects")} style={{
              padding: "14px 36px", borderRadius: 99, fontSize: 14,
              background: "linear-gradient(135deg, #00d4ff, #0088aa)", color: "#000",
              fontFamily: "'Space Mono', monospace", fontWeight: 700,
              boxShadow: "0 0 30px #00d4ff44", transition: "all 0.3s",
            }}
              onMouseEnter={e => { e.target.style.transform = "scale(1.05)"; e.target.style.boxShadow = "0 0 50px #00d4ff88"; }}
              onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 0 30px #00d4ff44"; }}
            >VIEW PROJECTS ↗</button>
            <button onClick={() => scroll("contact")} style={{
              padding: "14px 36px", borderRadius: 99, fontSize: 14,
              background: "transparent", color: "#f1f5f9",
              border: "1px solid rgba(255,255,255,0.15)",
              fontFamily: "'Space Mono', monospace", fontWeight: 700, transition: "all 0.3s",
            }}
              onMouseEnter={e => { e.target.style.borderColor = "#00d4ff66"; e.target.style.color = "#00d4ff"; }}
              onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.15)"; e.target.style.color = "#f1f5f9"; }}
            >CONTACT ME →</button>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 40, justifyContent: "center", marginTop: 64, animation: "fadeUp 0.7s 0.5s ease both" }}>
            {[["30+", "Projects"], ["5+", "Years Exp."], ["100%", "Passion"]].map(([n, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, fontFamily: "'Syne', sans-serif", fontWeight: 800, color: "#00d4ff" }}>{n}</div>
                <div style={{ fontSize: 12, color: "#475569", fontFamily: "'Space Mono', monospace", marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", animation: "float 2s ease infinite" }}>
          <div style={{ width: 28, height: 44, border: "1px solid rgba(0,212,255,0.3)", borderRadius: 99, display: "flex", justifyContent: "center", paddingTop: 8 }}>
            <div style={{ width: 4, height: 10, background: "#00d4ff", borderRadius: 99, animation: "float 2s ease infinite" }} />
          </div>
        </div>

        <style>{`
          @keyframes shimmer { 0%{background-position:0 0} 100%{background-position:200% 0} }
        `}</style>
      </section>

      {/* ── ABOUT ── */}
      <Section id="about">
        <div className="container">
          <SectionHeading label="// WHO AM I" title="About Me" />
          <div className="grid-2" style={{ alignItems: "center", gap: 60 }}>
            {/* Avatar / visual */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ position: "relative", animation: "float 4s ease infinite" }}>
                <div style={{
                  width: 260, height: 260, borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
                  background: "linear-gradient(135deg, #00d4ff22, #a855f722)",
                  border: "1px solid rgba(0,212,255,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 90,
                  boxShadow: "0 0 80px rgba(0,212,255,0.15), inset 0 0 40px rgba(0,212,255,0.05)",
                }}>👨‍💻</div>
                {/* decorative rings */}
                {[300, 340].map((s, i) => (
                  <div key={i} style={{
                    position: "absolute", top: "50%", left: "50%",
                    width: s, height: s, borderRadius: "50%",
                    border: `1px solid rgba(0,212,255,${0.06 - i * 0.02})`,
                    transform: "translate(-50%, -50%)",
                  }} />
                ))}
              </div>
            </div>

            {/* Text */}
            <div>
              <p style={{ fontSize: 16.5, color: "#94a3b8", lineHeight: 1.85, marginBottom: 20 }}>
                Hey! I'm <strong style={{ color: "#f1f5f9" }}>Aaditya Singh Rawat</strong>, a passionate full-stack web developer based in India with 5+ years of experience building products that live at the intersection of beautiful design and robust engineering.
              </p>
              <p style={{ fontSize: 16.5, color: "#94a3b8", lineHeight: 1.85, marginBottom: 32 }}>
                I believe the web is the most powerful canvas in existence. My mission is to craft experiences that are not just functional, but genuinely delightful — where every pixel and every millisecond of load time is intentional.
              </p>

              {[
                ["🎯", "Goal-oriented", "Building products that solve real problems at scale."],
                ["⚡", "Performance-first", "Obsessed with Core Web Vitals and smooth UX."],
                ["🌍", "Open-source advocate", "Giving back to the community that built me."],
              ].map(([icon, title, desc]) => (
                <div key={title} style={{ display: "flex", gap: 16, marginBottom: 18, padding: "14px 20px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ fontSize: 22 }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#f1f5f9", marginBottom: 3 }}>{title}</div>
                    <div style={{ fontSize: 13.5, color: "#64748b" }}>{desc}</div>
                  </div>
                </div>
              ))}

              <a href="#" download style={{
                display: "inline-flex", alignItems: "center", gap: 8, marginTop: 24,
                padding: "12px 28px", borderRadius: 99,
                background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)",
                color: "#00d4ff", fontSize: 13, fontFamily: "'Space Mono', monospace",
                textDecoration: "none", transition: "all 0.3s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(0,212,255,0.2)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(0,212,255,0.1)"}
              >⬇ DOWNLOAD RESUME</a>
            </div>
          </div>
        </div>
      </Section>

      {/* ── SKILLS ── */}
      <Section id="skills">
        <div className="container" ref={skillRef}>
          <SectionHeading label="// WHAT I KNOW" title="Skills & Technologies" />
          {/* Tabs */}
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 48, flexWrap: "wrap" }}>
            {Object.keys(SKILLS).map(tab => (
              <button key={tab} onClick={() => setActiveSkillTab(tab)} style={{
                padding: "9px 24px", borderRadius: 99, fontSize: 12,
                fontFamily: "'Space Mono', monospace", transition: "all 0.3s",
                background: activeSkillTab === tab ? "linear-gradient(135deg, #00d4ff, #0099cc)" : "rgba(255,255,255,0.05)",
                color: activeSkillTab === tab ? "#000" : "#94a3b8",
                border: activeSkillTab === tab ? "none" : "1px solid rgba(255,255,255,0.08)",
                fontWeight: 700,
              }}>{tab}</button>
            ))}
          </div>

          <div style={{ maxWidth: 760, margin: "0 auto", padding: "36px 40px", borderRadius: 24, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(20px)" }}>
            {SKILLS[activeSkillTab].map(s => (
              <SkillBar key={s.name} name={s.name} level={s.level} color="#00d4ff" visible={skillsVisible} />
            ))}
          </div>

          {/* Tech pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: 48 }}>
            {["JavaScript", "TypeScript", "Python", "React", "Next.js", "Node.js", "GraphQL", "AWS", "Redis", "Prisma", "Framer Motion", "Three.js", "Docker", "Kubernetes"].map(t => (
              <span key={t} style={{
                padding: "7px 18px", borderRadius: 99, fontSize: 12,
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                color: "#94a3b8", fontFamily: "'Space Mono', monospace",
                transition: "all 0.2s",
                cursor: "default",
              }}
                onMouseEnter={e => { e.target.style.borderColor = "#00d4ff44"; e.target.style.color = "#00d4ff"; e.target.style.background = "rgba(0,212,255,0.06)"; }}
                onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.color = "#94a3b8"; e.target.style.background = "rgba(255,255,255,0.04)"; }}
              >{t}</span>
            ))}
          </div>
        </div>
      </Section>

      {/* ── PROJECTS ── */}
      <Section id="projects">
        <div className="container" ref={projRef}>
          <SectionHeading label="// WHAT I'VE BUILT" title="Featured Projects" />

          {/* Filter */}
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 48, flexWrap: "wrap" }}>
            {cats.map(c => (
              <button key={c} onClick={() => setActiveCat(c)} style={{
                padding: "8px 20px", borderRadius: 99, fontSize: 12,
                fontFamily: "'Space Mono', monospace", transition: "all 0.3s",
                background: activeCat === c ? "rgba(168,85,247,0.2)" : "rgba(255,255,255,0.04)",
                color: activeCat === c ? "#a855f7" : "#64748b",
                border: `1px solid ${activeCat === c ? "rgba(168,85,247,0.4)" : "rgba(255,255,255,0.07)"}`,
              }}>{c}</button>
            ))}
          </div>

          <div className="grid-3">
            {filteredProjects.map((p, i) => (
              <div key={p.id} style={{ transitionDelay: `${i * 0.07}s` }}>
                <ProjectCard proj={p} visible={projVisible} />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── JOURNEY ── */}
      <Section id="journey">
        <div className="container">
          <SectionHeading label="// MY PATH" title="Journey & Experience" />
          <div style={{ maxWidth: 720, margin: "0 auto", position: "relative" }}>
            {/* Timeline line */}
            <div style={{ position: "absolute", left: 20, top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom, transparent, #00d4ff44, transparent)" }} />
            {JOURNEY.map((item, i) => (
              <div key={i} style={{
                paddingLeft: 60, paddingBottom: 48, position: "relative",
                animation: `slideIn 0.6s ${i * 0.15}s ease both`,
              }}>
                {/* Dot */}
                <div style={{
                  position: "absolute", left: 12, top: 4, width: 17, height: 17, borderRadius: "50%",
                  background: item.type === "edu" ? "#a855f7" : item.type === "achievement" ? "#f59e0b" : "#00d4ff",
                  boxShadow: `0 0 16px ${item.type === "edu" ? "#a855f7" : item.type === "achievement" ? "#f59e0b" : "#00d4ff"}88`,
                  border: "2px solid #050a14",
                }} />
                <div style={{ marginBottom: 6, display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 12, fontFamily: "'Space Mono', monospace", color: "#00d4ff", background: "rgba(0,212,255,0.1)", padding: "3px 10px", borderRadius: 99 }}>{item.year}</span>
                  <span style={{ fontSize: 11, color: "#475569", fontFamily: "'Space Mono', monospace" }}>
                    {item.type === "edu" ? "📚 EDUCATION" : item.type === "achievement" ? "🏆 ACHIEVEMENT" : "💼 WORK"}
                  </span>
                </div>
                <h3 style={{ fontSize: 18, fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#f1f5f9", marginBottom: 4 }}>{item.title}</h3>
                <div style={{ fontSize: 13, color: "#00d4ff", marginBottom: 10, fontFamily: "'Space Mono', monospace" }}>{item.org}</div>
                <p style={{ fontSize: 14.5, color: "#64748b", lineHeight: 1.75 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── CONTACT ── */}
      <Section id="contact">
        <div className="container">
          <SectionHeading label="// LET'S TALK" title="Get In Touch" />
          <div className="grid-2" style={{ gap: 60, alignItems: "start" }}>
            {/* Info */}
            <div>
              <p style={{ fontSize: 17, color: "#94a3b8", lineHeight: 1.8, marginBottom: 40 }}>
                Have a project in mind, a collaboration idea, or just want to say hi? My inbox is always open. I'll respond within 24 hours.
              </p>
              {[
                ["📧", "Email", "aaditya@example.com", "mailto:aaditya@example.com"],
                ["💼", "LinkedIn", "linkedin.com/in/aadityarawat", "https://linkedin.com"],
                ["⌥", "GitHub", "github.com/aadityarawat", "https://github.com"],
                ["🐦", "Twitter", "@aadityarawat", "https://twitter.com"],
              ].map(([icon, label, val, href]) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" style={{
                  display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", borderRadius: 14,
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                  marginBottom: 12, textDecoration: "none", transition: "all 0.3s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#00d4ff33"; e.currentTarget.style.background = "rgba(0,212,255,0.05)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                >
                  <span style={{ fontSize: 20 }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: 11, color: "#475569", fontFamily: "'Space Mono', monospace", marginBottom: 2 }}>{label}</div>
                    <div style={{ fontSize: 14, color: "#cbd5e1" }}>{val}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[["name", "Your Name", "text"], ["email", "Your Email", "email"]].map(([field, ph, type]) => (
                <input key={field} type={type} placeholder={ph} required value={formState[field]}
                  onChange={e => setFormState(s => ({ ...s, [field]: e.target.value }))}
                  style={{
                    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 12, padding: "16px 20px", color: "#f1f5f9", fontSize: 15,
                    fontFamily: "'DM Sans', sans-serif", transition: "border-color 0.3s",
                    width: "100%",
                  }}
                  onFocus={e => e.target.style.borderColor = "#00d4ff55"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                />
              ))}
              <textarea placeholder="Your Message" required rows={5} value={formState.message}
                onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                style={{
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12, padding: "16px 20px", color: "#f1f5f9", fontSize: 15,
                  fontFamily: "'DM Sans', sans-serif", resize: "vertical", transition: "border-color 0.3s",
                }}
                onFocus={e => e.target.style.borderColor = "#00d4ff55"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
              />
              <button type="submit" style={{
                padding: "15px 32px", borderRadius: 99, fontSize: 14,
                background: sent ? "linear-gradient(135deg, #10b981, #059669)" : "linear-gradient(135deg, #00d4ff, #0088aa)",
                color: "#000", fontFamily: "'Space Mono', monospace", fontWeight: 700,
                boxShadow: sent ? "0 0 30px #10b98144" : "0 0 30px #00d4ff44",
                transition: "all 0.4s",
              }}>{sent ? "✓ MESSAGE SENT!" : "SEND MESSAGE →"}</button>
            </form>
          </div>
        </div>
      </Section>

      {/* ── FOOTER ── */}
      <footer style={{
        position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "40px 24px", textAlign: "center",
      }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 22, marginBottom: 16 }}>
          <span style={{ color: "#00d4ff" }}>ASR</span>
          <span style={{ color: "rgba(255,255,255,0.2)", margin: "0 8px" }}>·</span>
          <span style={{ color: "#475569", fontSize: 14, fontFamily: "'Space Mono', monospace", fontWeight: 400 }}>AADITYA SINGH RAWAT</span>
        </div>
        <p style={{ fontSize: 12, color: "#334155", fontFamily: "'Space Mono', monospace" }}>
          © {new Date().getFullYear()} Aaditya Singh Rawat · Crafted with 💙 & precision
        </p>
      </footer>
    </div>
  );
}

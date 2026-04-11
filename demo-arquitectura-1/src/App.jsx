import { useState, useEffect, useRef, useCallback } from "react";

// ─── DATA ───────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 1,
    title: "Casa del Lago",
    category: "Residencial",
    location: "Valle de Bravo, México",
    year: "2024",
    description: "Residencia integrada al paisaje lacustre. Muros de piedra local, terrazas escalonadas y ventanales que enmarcan el agua.",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7a5a0c?w=1200&q=80",
    ],
  },
  {
    id: 2,
    title: "Mercado Central",
    category: "Comercial",
    location: "Oaxaca, México",
    year: "2023",
    description: "Rehabilitación de mercado tradicional. Estructura de acero y bóvedas de ladrillo que permiten ventilación natural y luz cenital.",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80",
    ],
  },
  {
    id: 3,
    title: "Centro Cultural del Río",
    category: "Cultural",
    location: "Guadalajara, México",
    year: "2022",
    description: "Espacio multifuncional a orillas del río. Planta libre, doble altura y fachada permeable que dialoga con el entorno fluvial.",
    images: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&q=80",
    ],
  },
  {
    id: 4,
    title: "Parque Biblioteca Norte",
    category: "Institucional",
    location: "CDMX, México",
    year: "2021",
    description: "Biblioteca pública con jardín elevado. Volúmenes de concreto aparente articulados por patios de lectura al aire libre.",
    images: [
      "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=1200&q=80",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
      "https://images.unsplash.com/photo-1448630360428-65456659616a?w=1200&q=80",
    ],
  },
  {
    id: 5,
    title: "Edificio Jacarandas",
    category: "Residencial",
    location: "Mérida, México",
    year: "2020",
    description: "Conjunto habitacional de 12 unidades. Celosías de concreto, ventilación cruzada y jardines comunitarios en cada nivel.",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
    ],
  },
  {
    id: 6,
    title: "Pabellón del Agua",
    category: "Cultural",
    location: "Puebla, México",
    year: "2019",
    description: "Pabellón efímero para bienal de arquitectura. Estructura de bambú y membranas textiles que filtran la luz natural.",
    images: [
      "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?w=1200&q=80",
      "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=1200&q=80",
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1200&q=80",
      "https://images.unsplash.com/photo-1464146072230-91cabc968266?w=1200&q=80",
    ],
  },
];

const CATEGORIES = ["Todos", "Residencial", "Comercial", "Cultural", "Institucional"];

const FONT_LINK = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500&display=swap";

// ─── COMPONENT ──────────────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroProgress, setHeroProgress] = useState(0);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [lightbox, setLightbox] = useState(null); // { projectId, imageIndex }
  const [touchStart, setTouchStart] = useState(null);
  const heroTimer = useRef(null);
  const progressTimer = useRef(null);

  const heroProjects = PROJECTS.slice(0, 4);

  // ── Font loading
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FONT_LINK;
    document.head.appendChild(link);
  }, []);

  // ── Hero slideshow
  useEffect(() => {
    const DURATION = 5000;
    const TICK = 50;
    let elapsed = 0;

    progressTimer.current = setInterval(() => {
      elapsed += TICK;
      setHeroProgress((elapsed / DURATION) * 100);
      if (elapsed >= DURATION) {
        elapsed = 0;
        setHeroIndex((i) => (i + 1) % heroProjects.length);
      }
    }, TICK);

    return () => clearInterval(progressTimer.current);
  }, [heroIndex]);

  const goToHeroSlide = (i) => {
    clearInterval(progressTimer.current);
    setHeroIndex(i);
    setHeroProgress(0);
  };

  // ── Gallery filter
  const filteredProjects = activeCategory === "Todos"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  // ── Lightbox
  const openLightbox = (projectId, imageIndex = 0) => {
    setLightbox({ projectId, imageIndex });
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightbox(null);
    document.body.style.overflow = "";
  };

  const currentLBProject = lightbox ? PROJECTS.find((p) => p.id === lightbox.projectId) : null;

  const lbNav = useCallback((dir) => {
    if (!currentLBProject) return;
    const len = currentLBProject.images.length;
    setLightbox((lb) => ({
      ...lb,
      imageIndex: (lb.imageIndex + dir + len) % len,
    }));
  }, [currentLBProject]);

  // Keyboard nav
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") lbNav(-1);
      if (e.key === "ArrowRight") lbNav(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, lbNav]);

  // Swipe
  const onTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) lbNav(diff > 0 ? 1 : -1);
    setTouchStart(null);
  };

  // ── Smooth scroll
  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{
      fontFamily: "'Space Grotesk', system-ui, sans-serif",
      fontWeight: 300,
      background: "#fafafa",
      color: "#0a0a0a",
      minHeight: "100vh",
    }}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::selection { background: #0a0a0a; color: #fafafa; }
        img { display: block; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .nav-link {
          color: #71717a;
          text-decoration: none;
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 2px;
          text-transform: uppercase;
          transition: color 0.2s;
          cursor: pointer;
          background: none;
          border: none;
          font-family: inherit;
        }
        .nav-link:hover { color: #0a0a0a; }

        .filter-btn {
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          color: #71717a;
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 400;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.2s;
        }
        .filter-btn:hover { color: #18181b; }
        .filter-btn.active {
          color: #0a0a0a;
          border-bottom-color: #0a0a0a;
          font-weight: 500;
        }

        .gallery-item {
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }
        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.35s ease;
        }
        .gallery-item:hover img { transform: scale(1.03); }
        .gallery-overlay {
          position: absolute;
          inset: 0;
          background: rgba(10,10,10,0.6);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 24px;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .gallery-item:hover .gallery-overlay { opacity: 1; }

        .lb-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #fafafa;
          font-size: 24px;
          cursor: pointer;
          padding: 16px;
          transition: opacity 0.2s;
          opacity: 0.6;
          font-family: inherit;
        }
        .lb-arrow:hover { opacity: 1; }

        .lb-thumb {
          width: 48px;
          height: 36px;
          object-fit: cover;
          opacity: 0.4;
          cursor: pointer;
          transition: opacity 0.2s;
          border: 1px solid transparent;
        }
        .lb-thumb.active { opacity: 1; border-color: #fafafa; }
        .lb-thumb:hover { opacity: 0.8; }

        .hamburger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          width: 28px;
          height: 20px;
          position: relative;
          z-index: 101;
        }
        .hamburger span {
          display: block;
          width: 100%;
          height: 1.5px;
          background: #0a0a0a;
          position: absolute;
          left: 0;
          transition: all 0.3s;
        }
        .hamburger span:nth-child(1) { top: 0; }
        .hamburger span:nth-child(2) { top: 9px; }
        .hamburger span:nth-child(3) { top: 18px; }
        .hamburger.open span:nth-child(1) { top: 9px; transform: rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { top: 9px; transform: rotate(-45deg); }

        .mobile-menu {
          display: none;
          position: fixed;
          inset: 0;
          background: #fafafa;
          z-index: 100;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 32px;
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu button {
          font-size: clamp(22px, 3vw, 34px);
          font-weight: 300;
          letter-spacing: -0.5px;
          color: #0a0a0a;
          background: none;
          border: none;
          font-family: inherit;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block; }
          .gallery-grid { grid-template-columns: 1fr !important; }
          .gallery-item:first-child { grid-row: span 1 !important; }
          .hero-content { padding: 0 24px !important; }
          .section-pad { padding-left: 24px !important; padding-right: 24px !important; }
          .stats-row { flex-wrap: wrap; gap: 24px !important; }
          .lb-arrow { display: none !important; }
          .filters-row { overflow-x: auto; flex-wrap: nowrap; }
          .filter-btn { white-space: nowrap; padding: 6px 10px; font-size: 11px; }
        }
      `}</style>

      {/* ── NAV ─────────────────────────────────── */}
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "20px 80px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgba(250,250,250,0.9)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #e4e4e7",
      }}>
        <span style={{
          fontSize: 13,
          fontWeight: 400,
          letterSpacing: 3,
          textTransform: "uppercase",
        }}>Taller de Arquitectura</span>

        <div className="desktop-nav" style={{ display: "flex", gap: 32 }}>
          {["proyectos", "estudio", "premios", "contacto"].map((s) => (
            <button key={s} className="nav-link" onClick={() => scrollTo(s)}>
              {s}
            </button>
          ))}
        </div>

        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {["proyectos", "estudio", "premios", "contacto"].map((s) => (
          <button key={s} onClick={() => scrollTo(s)}>{s}</button>
        ))}
      </div>

      {/* ── HERO SLIDESHOW ──────────────────────── */}
      <header style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
      }}>
        {heroProjects.map((p, i) => (
          <div key={p.id} style={{
            position: "absolute",
            inset: 0,
            opacity: i === heroIndex ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}>
            <img
              src={p.images[0]}
              alt={p.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(rgba(10,10,10,0.7), rgba(10,10,10,0.1), transparent)",
            }} />
          </div>
        ))}

        <div className="hero-content" style={{
          position: "absolute",
          bottom: 120,
          left: 80,
          color: "#fafafa",
          animation: "fadeIn 0.35s ease",
        }}>
          <h1 style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 300,
            letterSpacing: -1,
            lineHeight: 1.15,
            marginBottom: 8,
          }}>{heroProjects[heroIndex].title}</h1>
          <p style={{
            fontSize: 14,
            fontWeight: 400,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "rgba(250,250,250,0.6)",
          }}>{heroProjects[heroIndex].location} — {heroProjects[heroIndex].year}</p>
        </div>

        {/* Progress indicators */}
        <div style={{
          position: "absolute",
          bottom: 60,
          left: 80,
          right: 80,
          display: "flex",
          gap: 8,
        }}>
          {heroProjects.map((_, i) => (
            <button key={i} onClick={() => goToHeroSlide(i)} style={{
              flex: 1,
              height: 2,
              background: "rgba(250,250,250,0.2)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
                background: "#fafafa",
                width: i === heroIndex ? `${heroProgress}%` : i < heroIndex ? "100%" : "0%",
                transition: i === heroIndex ? "none" : "width 0.3s",
              }} />
            </button>
          ))}
        </div>
      </header>

      {/* ── ESTUDIO ─────────────────────────────── */}
      <section id="estudio" className="section-pad" style={{
        padding: "120px 80px",
        maxWidth: 900,
      }}>
        <div style={{
          fontSize: 13,
          fontWeight: 400,
          letterSpacing: 3,
          textTransform: "uppercase",
          color: "#71717a",
          marginBottom: 16,
        }}>Estudio</div>

        <blockquote style={{
          fontSize: "clamp(20px, 3vw, 30px)",
          fontWeight: 300,
          fontStyle: "italic",
          lineHeight: 1.5,
          maxWidth: 700,
          marginBottom: 24,
          color: "#0a0a0a",
        }}>
          "Cada proyecto es una respuesta específica a su contexto."
        </blockquote>

        <p style={{
          fontSize: 17,
          fontWeight: 300,
          color: "#18181b",
          lineHeight: 1.7,
          maxWidth: 680,
          marginBottom: 48,
        }}>
          Somos un estudio fundado en la convicción de que la arquitectura debe emerger del lugar, la cultura y las necesidades reales de quienes la habitan. Trabajamos con materiales locales, sistemas constructivos eficientes y un compromiso con el paisaje.
        </p>

        <div className="stats-row" style={{ display: "flex", gap: 64 }}>
          {[
            { n: "10+", l: "Años" },
            { n: "30+", l: "Proyectos" },
            { n: "5", l: "Premios" },
            { n: "3", l: "Publicaciones" },
          ].map((s) => (
            <div key={s.l}>
              <div style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                fontWeight: 300,
                letterSpacing: -1,
                lineHeight: 1.15,
              }}>{s.n}</div>
              <div style={{
                fontSize: 11,
                fontWeight: 400,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "#71717a",
                marginTop: 8,
              }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROYECTOS (GALERÍA FILTRABLE) ──────── */}
      <section id="proyectos" className="section-pad" style={{
        padding: "0 80px 120px",
        maxWidth: 1100,
      }}>
        <div style={{
          fontSize: 13,
          fontWeight: 400,
          letterSpacing: 3,
          textTransform: "uppercase",
          color: "#71717a",
          marginBottom: 16,
        }}>Proyectos</div>

        <h2 style={{
          fontSize: "clamp(22px, 3vw, 34px)",
          fontWeight: 300,
          letterSpacing: -0.5,
          marginBottom: 32,
        }}>Selección de obra</h2>

        {/* Filters */}
        <div className="filters-row" style={{
          display: "flex",
          gap: 0,
          borderBottom: "1px solid #e4e4e7",
          marginBottom: 48,
        }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >{cat}</button>
          ))}
        </div>

        {/* Grid */}
        <div className="gallery-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 12,
        }}>
          {filteredProjects.map((project, i) => (
            <div
              key={project.id}
              className="gallery-item"
              style={{
                aspectRatio: i === 0 ? undefined : "4/3",
                gridRow: i === 0 ? "span 2" : undefined,
                height: i === 0 ? "100%" : undefined,
              }}
              onClick={() => openLightbox(project.id)}
            >
              <img
                src={project.images[0]}
                alt={project.title}
                loading="lazy"
              />
              <div className="gallery-overlay">
                <span style={{
                  fontSize: 11,
                  fontWeight: 400,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "rgba(250,250,250,0.5)",
                  marginBottom: 6,
                }}>{project.category} — {project.year}</span>
                <span style={{
                  fontSize: "clamp(18px, 2.2vw, 26px)",
                  fontWeight: 300,
                  letterSpacing: -0.5,
                  color: "#fafafa",
                  marginBottom: 6,
                }}>{project.title}</span>
                <span style={{
                  fontSize: 13,
                  color: "rgba(250,250,250,0.5)",
                }}>{project.images.length} fotos</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PREMIOS ─────────────────────────────── */}
      <section id="premios" style={{
        background: "#0a0a0a",
        color: "#fafafa",
        padding: "120px 80px",
      }}>
        <div className="section-pad" style={{ maxWidth: 900 }}>
          <div style={{
            fontSize: 13,
            fontWeight: 400,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#71717a",
            marginBottom: 16,
          }}>Equipo y reconocimientos</div>

          <h2 style={{
            fontSize: "clamp(22px, 3vw, 34px)",
            fontWeight: 300,
            letterSpacing: -0.5,
            marginBottom: 32,
          }}>Arq. Nombre Apellido · Arq. Nombre Apellido</h2>

          <div style={{
            fontSize: 16,
            fontWeight: 300,
            color: "#a1a1aa",
            lineHeight: 1.7,
            maxWidth: 680,
          }}>
            {[
              "Premio Nacional de Arquitectura 2023",
              "Bienal Iberoamericana de Arquitectura — Selección Oficial 2022",
              "Architectural Review Emerging Architecture 2021",
              "Publicación en Domus, ArchDaily, Plataforma Arquitectura",
              "Mención Honorífica — Bienal de Venecia 2019",
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                marginBottom: 12,
              }}>
                <span style={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: "#71717a",
                  marginTop: 10,
                  flexShrink: 0,
                }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACTO ────────────────────────────── */}
      <section id="contacto" className="section-pad" style={{
        padding: "120px 80px",
        maxWidth: 900,
      }}>
        <div style={{
          fontSize: 13,
          fontWeight: 400,
          letterSpacing: 3,
          textTransform: "uppercase",
          color: "#71717a",
          marginBottom: 16,
        }}>Contacto</div>

        <h2 style={{
          fontSize: "clamp(22px, 3vw, 34px)",
          fontWeight: 300,
          letterSpacing: -0.5,
          marginBottom: 12,
        }}>Platiquemos sobre tu proyecto</h2>

        <p style={{
          fontSize: 17,
          fontWeight: 300,
          color: "#71717a",
          lineHeight: 1.7,
          marginBottom: 32,
          maxWidth: 480,
        }}>Escríbenos para agendar una primera conversación.</p>

        <a href="mailto:hola@tallerdearquitectura.mx" style={{
          color: "#0a0a0a",
          textDecoration: "none",
          fontSize: 13,
          fontWeight: 400,
          letterSpacing: 2,
          textTransform: "uppercase",
          borderBottom: "1px solid #0a0a0a",
          paddingBottom: 4,
        }}>hola@tallerdearquitectura.mx</a>
      </section>

      {/* ── FOOTER ──────────────────────────────── */}
      <footer className="section-pad" style={{
        borderTop: "1px solid #e4e4e7",
        padding: "32px 80px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <span style={{
          fontSize: 11,
          fontWeight: 400,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: "#71717a",
        }}>Taller de Arquitectura</span>
        <span style={{
          fontSize: 11,
          color: "#d4d4d8",
        }}>
          Sitio por{" "}
          <a href="https://ioon.mx" style={{ color: "#71717a", textDecoration: "none" }}>ioon</a>
        </span>
      </footer>

      {/* ── LIGHTBOX ────────────────────────────── */}
      {lightbox && currentLBProject && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "rgba(10,10,10,0.95)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Close */}
          <button onClick={closeLightbox} style={{
            position: "absolute",
            top: 20,
            right: 24,
            background: "none",
            border: "none",
            color: "#fafafa",
            fontSize: 18,
            cursor: "pointer",
            fontFamily: "inherit",
            opacity: 0.6,
          }}>Cerrar</button>

          {/* Main image */}
          <img
            src={currentLBProject.images[lightbox.imageIndex]}
            alt={currentLBProject.title}
            style={{
              maxWidth: "85vw",
              maxHeight: "70vh",
              objectFit: "contain",
            }}
          />

          {/* Title */}
          <div style={{
            marginTop: 16,
            textAlign: "center",
            color: "#fafafa",
          }}>
            <span style={{
              fontSize: 16,
              fontWeight: 300,
            }}>{currentLBProject.title}</span>
            <span style={{
              fontSize: 13,
              color: "#71717a",
              marginLeft: 12,
            }}>{lightbox.imageIndex + 1} / {currentLBProject.images.length}</span>
          </div>

          {/* Arrows */}
          <button className="lb-arrow" style={{ left: 16 }} onClick={() => lbNav(-1)}>←</button>
          <button className="lb-arrow" style={{ right: 16 }} onClick={() => lbNav(1)}>→</button>

          {/* Thumbnails */}
          <div style={{
            display: "flex",
            gap: 8,
            marginTop: 20,
          }}>
            {currentLBProject.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                className={`lb-thumb ${i === lightbox.imageIndex ? "active" : ""}`}
                onClick={() => setLightbox((lb) => ({ ...lb, imageIndex: i }))}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

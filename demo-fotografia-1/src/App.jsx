import { useState, useEffect, useCallback } from "react";

// ─── DATA ───────────────────────────────────────────────────────────
const PHOTOGRAPHER = {
  name: "Nombre Apellido",
  tagline: "Fotógrafo",
  location: "Ciudad, País",
  email: "hola@nombre.com",
  instagram: "@nombre",
};

const PROJECTS = [
  {
    id: 1,
    title: "Territorio Silencioso",
    year: "2024",
    category: "Paisaje",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1400&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1400&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1400&q=80",
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1400&q=80",
    ],
  },
  {
    id: 2,
    title: "Materia Gris",
    year: "2024",
    category: "Arquitectura",
    images: [
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1400&q=80",
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=80",
      "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?w=1400&q=80",
      "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=1400&q=80",
    ],
  },
  {
    id: 3,
    title: "Las Horas Largas",
    year: "2023",
    category: "Retrato",
    images: [
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1400&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1400&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1400&q=80",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1400&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1400&q=80",
    ],
  },
  {
    id: 4,
    title: "Objetos Encontrados",
    year: "2023",
    category: "Naturaleza muerta",
    images: [
      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=1400&q=80",
      "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=1400&q=80",
      "https://images.unsplash.com/photo-1526040652367-ac003a0475fe?w=1400&q=80",
    ],
  },
  {
    id: 5,
    title: "Frontera Norte",
    year: "2022",
    category: "Documental",
    images: [
      "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=1400&q=80",
      "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=1400&q=80",
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1400&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1400&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1400&q=80",
    ],
  },
  {
    id: 6,
    title: "Luz Doméstica",
    year: "2022",
    category: "Interior",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1400&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1400&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1400&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1400&q=80",
    ],
  },
  {
    id: 7,
    title: "Después del Agua",
    year: "2021",
    category: "Paisaje",
    images: [
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1400&q=80",
      "https://images.unsplash.com/photo-1414609245224-afa02bfb3fda?w=1400&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=80",
    ],
  },
  {
    id: 8,
    title: "Edificio Fantasma",
    year: "2020",
    category: "Arquitectura",
    images: [
      "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=1400&q=80",
      "https://images.unsplash.com/photo-1448630360428-65456659616a?w=1400&q=80",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&q=80",
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1400&q=80",
    ],
  },
];

const FONT_LINK = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500&display=swap";

// ─── COMPONENT ──────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("index"); // "index" | "project" | "info"
  const [hoveredId, setHoveredId] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = useState(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FONT_LINK;
    document.head.appendChild(link);
  }, []);

  // Mouse tracking for hover image
  const onMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  // Open project
  const openProject = (project) => {
    setActiveProject(project);
    setImageIndex(0);
    setView("project");
  };

  // Navigation
  const nav = useCallback((dir) => {
    if (!activeProject) return;
    const len = activeProject.images.length;
    setImageIndex((i) => (i + dir + len) % len);
  }, [activeProject]);

  // Next/prev project
  const navProject = useCallback((dir) => {
    if (!activeProject) return;
    const idx = PROJECTS.findIndex((p) => p.id === activeProject.id);
    const next = (idx + dir + PROJECTS.length) % PROJECTS.length;
    setActiveProject(PROJECTS[next]);
    setImageIndex(0);
  }, [activeProject]);

  // Keyboard
  useEffect(() => {
    const handler = (e) => {
      if (view === "project") {
        if (e.key === "Escape") { setView("index"); return; }
        if (e.key === "ArrowLeft") nav(-1);
        if (e.key === "ArrowRight") nav(1);
        if (e.key === "ArrowUp") { e.preventDefault(); navProject(-1); }
        if (e.key === "ArrowDown") { e.preventDefault(); navProject(1); }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [view, nav, navProject]);

  // Swipe
  const onTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) nav(diff > 0 ? 1 : -1);
    setTouchStart(null);
  };

  const hoveredProject = hoveredId ? PROJECTS.find((p) => p.id === hoveredId) : null;

  return (
    <div style={{
      fontFamily: "'Space Grotesk', system-ui, sans-serif",
      fontWeight: 300,
      background: "#fafafa",
      color: "#0a0a0a",
      minHeight: "100vh",
      cursor: view === "project" ? "none" : "default",
    }} onMouseMove={onMouseMove}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::selection { background: #0a0a0a; color: #fafafa; }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .project-link {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding: 10px 0;
          cursor: pointer;
          transition: opacity 0.2s;
          text-decoration: none;
          color: inherit;
          border: none;
          background: none;
          font-family: inherit;
          font-weight: inherit;
          font-size: inherit;
          width: 100%;
          text-align: left;
        }
        .project-link:hover { opacity: 1 !important; }

        .list-dimmed .project-link { opacity: 0.25; }
        .list-dimmed .project-link:hover { opacity: 1; }

        .nav-btn {
          background: none;
          border: none;
          color: #71717a;
          font-family: inherit;
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: color 0.2s;
          padding: 0;
        }
        .nav-btn:hover { color: #0a0a0a; }

        .counter {
          position: fixed;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 13px;
          color: #71717a;
          font-weight: 400;
          letter-spacing: 1px;
          z-index: 10;
          pointer-events: none;
        }

        .cursor-arrow {
          position: fixed;
          pointer-events: none;
          z-index: 100;
          font-size: 20px;
          color: #0a0a0a;
          transform: translate(-50%, -50%);
          mix-blend-mode: difference;
          color: #fafafa;
        }

        @media (max-width: 768px) {
          .index-container { padding: 80px 24px 60px !important; }
          .project-title-text { font-size: 20px !important; }
          .info-container { padding: 80px 24px !important; grid-template-columns: 1fr !important; }
          .hover-image { display: none !important; }
          .vertical-type { display: none !important; }
          .cursor-arrow { display: none !important; }
        }
      `}</style>

      {/* ── HEADER (always visible) ──────────── */}
      <header style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "20px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: view === "project" ? "transparent" : "rgba(250,250,250,0.9)",
        backdropFilter: view === "project" ? "none" : "blur(12px)",
        transition: "background 0.3s",
      }}>
        <button
          className="nav-btn"
          onClick={() => setView("index")}
          style={{
            fontSize: 13,
            letterSpacing: 3,
            color: view === "project" ? "#fafafa" : "#0a0a0a",
            mixBlendMode: view === "project" ? "difference" : "normal",
          }}
        >
          {PHOTOGRAPHER.name}
        </button>

        <div style={{ display: "flex", gap: 24 }}>
          <button
            className="nav-btn"
            onClick={() => setView("index")}
            style={{
              color: view === "index" ? "#0a0a0a" : view === "project" ? "rgba(250,250,250,0.6)" : "#71717a",
              mixBlendMode: view === "project" ? "difference" : "normal",
            }}
          >Índice</button>
          <button
            className="nav-btn"
            onClick={() => setView("info")}
            style={{
              color: view === "info" ? "#0a0a0a" : view === "project" ? "rgba(250,250,250,0.6)" : "#71717a",
              mixBlendMode: view === "project" ? "difference" : "normal",
            }}
          >Info</button>
        </div>
      </header>

      {/* ── INDEX VIEW ───────────────────────── */}
      {view === "index" && (
        <main
          className={`index-container ${hoveredId ? "list-dimmed" : ""}`}
          style={{
            padding: "100px 40px 60px",
            maxWidth: 700,
            animation: "fadeIn 0.3s ease",
            position: "relative",
            zIndex: 1,
          }}
        >
          {PROJECTS.map((project) => (
            <button
              key={project.id}
              className="project-link"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => openProject(project)}
            >
              <span className="project-title-text" style={{
                fontSize: "clamp(20px, 3vw, 28px)",
                fontWeight: 300,
                letterSpacing: -0.5,
              }}>{project.title}</span>
              <span style={{
                fontSize: 13,
                color: "#71717a",
                fontWeight: 400,
                flexShrink: 0,
                marginLeft: 24,
              }}>{project.year}</span>
            </button>
          ))}

          {/* Footer */}
          <div style={{
            marginTop: 64,
            paddingTop: 24,
            borderTop: "1px solid #e4e4e7",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <span style={{ fontSize: 13, color: "#d4d4d8" }}>
              {PROJECTS.length} proyectos
            </span>
            <span style={{ fontSize: 11, color: "#d4d4d8" }}>
              Sitio por{" "}
              <a href="https://ioon.mx" style={{ color: "#71717a", textDecoration: "none" }}>ioon</a>
            </span>
          </div>

          {/* Hover image preview */}
          {hoveredProject && (
            <div
              className="hover-image"
              style={{
                position: "fixed",
                right: 40,
                top: "50%",
                transform: "translateY(-50%)",
                width: "45vw",
                maxWidth: 600,
                aspectRatio: "3/2",
                overflow: "hidden",
                pointerEvents: "none",
                animation: "fadeIn 0.2s ease",
                zIndex: 2,
              }}
            >
              <img
                src={hoveredProject.images[0]}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          )}

          {/* Vertical typography — background layer */}
          <div
            className="vertical-type"
            style={{
              position: "fixed",
              inset: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              paddingTop: 80,
              pointerEvents: "none",
              zIndex: 3,
            }}
          >
            <div style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 6,
            }}>
              {[
                "Territorio",
                "  Materia",
                "    Frontera",
                "  Luz",
                "Silencio",
              ].map((word, i) => (
                <span key={i} style={{
                  fontSize: "clamp(60px, 10vw, 140px)",
                  fontWeight: 400,
                  letterSpacing: -3,
                  lineHeight: 0.9,
                  color: "#e4e4e7",
                  textTransform: "uppercase",
                  userSelect: "none",
                  whiteSpace: "pre",
                }}>{word}</span>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* ── PROJECT VIEW ─────────────────────── */}
      {view === "project" && activeProject && (
        <main
          style={{
            position: "fixed",
            inset: 0,
            background: "#0a0a0a",
            animation: "fadeIn 0.3s ease",
          }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Image */}
          <img
            src={activeProject.images[imageIndex]}
            alt={activeProject.title}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              padding: "72px 0 72px",
            }}
            onClick={() => nav(1)}
          />

          {/* Click zones */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "50%",
              height: "100%",
              cursor: "w-resize",
            }}
            onClick={(e) => { e.stopPropagation(); nav(-1); }}
          />
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              width: "50%",
              height: "100%",
              cursor: "e-resize",
            }}
            onClick={(e) => { e.stopPropagation(); nav(1); }}
          />

          {/* Project title + counter */}
          <div style={{
            position: "fixed",
            bottom: 28,
            left: 40,
            color: "#fafafa",
            display: "flex",
            alignItems: "baseline",
            gap: 16,
          }}>
            <span style={{
              fontSize: 14,
              fontWeight: 300,
            }}>{activeProject.title}</span>
            <span style={{
              fontSize: 12,
              color: "rgba(250,250,250,0.4)",
            }}>{activeProject.category}, {activeProject.year}</span>
          </div>

          <div className="counter" style={{ color: "rgba(250,250,250,0.4)" }}>
            {imageIndex + 1} / {activeProject.images.length}
          </div>

          {/* Close */}
          <button
            onClick={() => setView("index")}
            style={{
              position: "fixed",
              top: 20,
              right: 40,
              background: "none",
              border: "none",
              color: "rgba(250,250,250,0.5)",
              fontSize: 13,
              fontWeight: 400,
              letterSpacing: 2,
              textTransform: "uppercase",
              fontFamily: "inherit",
              cursor: "pointer",
              transition: "color 0.2s",
              zIndex: 60,
            }}
            onMouseEnter={(e) => e.target.style.color = "#fafafa"}
            onMouseLeave={(e) => e.target.style.color = "rgba(250,250,250,0.5)"}
          >Cerrar</button>

          {/* Prev/Next project arrows */}
          <div style={{
            position: "fixed",
            bottom: 28,
            right: 40,
            display: "flex",
            gap: 16,
          }}>
            <button
              onClick={() => navProject(-1)}
              style={{
                background: "none",
                border: "none",
                color: "rgba(250,250,250,0.4)",
                fontSize: 14,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => e.target.style.color = "#fafafa"}
              onMouseLeave={(e) => e.target.style.color = "rgba(250,250,250,0.4)"}
            >↑ Anterior</button>
            <button
              onClick={() => navProject(1)}
              style={{
                background: "none",
                border: "none",
                color: "rgba(250,250,250,0.4)",
                fontSize: 14,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => e.target.style.color = "#fafafa"}
              onMouseLeave={(e) => e.target.style.color = "rgba(250,250,250,0.4)"}
            >Siguiente ↓</button>
          </div>
        </main>
      )}

      {/* ── INFO VIEW ────────────────────────── */}
      {view === "info" && (
        <main
          className="info-container"
          style={{
            padding: "100px 40px 60px",
            maxWidth: 900,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
            animation: "fadeIn 0.3s ease",
          }}
        >
          <div>
            <p style={{
              fontSize: "clamp(20px, 3vw, 28px)",
              fontWeight: 300,
              letterSpacing: -0.5,
              lineHeight: 1.5,
              marginBottom: 32,
            }}>
              Fotógrafo interesado en la relación entre el espacio construido, el paisaje natural y las personas que los habitan.
            </p>
            <p style={{
              fontSize: 16,
              fontWeight: 300,
              color: "#71717a",
              lineHeight: 1.7,
              maxWidth: 480,
            }}>
              Su trabajo ha sido publicado en revistas de arquitectura, arte y cultura. Disponible para encargos editoriales, comerciales y proyectos personales.
            </p>
          </div>

          <div>
            <div style={{ marginBottom: 48 }}>
              <div style={{
                fontSize: 11,
                fontWeight: 400,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "#71717a",
                marginBottom: 12,
              }}>Contacto</div>
              <a href={`mailto:${PHOTOGRAPHER.email}`} style={{
                display: "block",
                color: "#0a0a0a",
                textDecoration: "none",
                fontSize: 16,
                fontWeight: 300,
                marginBottom: 6,
                borderBottom: "1px solid #e4e4e7",
                paddingBottom: 4,
                width: "fit-content",
              }}>{PHOTOGRAPHER.email}</a>
              <span style={{
                fontSize: 16,
                fontWeight: 300,
                color: "#71717a",
              }}>{PHOTOGRAPHER.instagram}</span>
            </div>

            <div style={{ marginBottom: 48 }}>
              <div style={{
                fontSize: 11,
                fontWeight: 400,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "#71717a",
                marginBottom: 12,
              }}>Ubicación</div>
              <span style={{
                fontSize: 16,
                fontWeight: 300,
              }}>{PHOTOGRAPHER.location}</span>
            </div>

            <div>
              <div style={{
                fontSize: 11,
                fontWeight: 400,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "#71717a",
                marginBottom: 12,
              }}>Clientes seleccionados</div>
              <p style={{
                fontSize: 15,
                fontWeight: 300,
                color: "#71717a",
                lineHeight: 1.8,
              }}>
                ArchDaily, Domus, Apartamento Magazine, Monocle, The New York Times, Nike, Aesop, Muji
              </p>
            </div>
          </div>

          {/* Footer */}
          <div style={{
            gridColumn: "1 / -1",
            paddingTop: 24,
            borderTop: "1px solid #e4e4e7",
          }}>
            <span style={{ fontSize: 11, color: "#d4d4d8" }}>
              Sitio por{" "}
              <a href="https://ioon.mx" style={{ color: "#71717a", textDecoration: "none" }}>ioon</a>
            </span>
          </div>
        </main>
      )}
    </div>
  );
}

import { useState, useEffect } from "react";

const LOGO_B64 = "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";

const INDUSTRIES = [
  {
    id: "arquitectura",
    label: "Arquitectura",
    description: "Portafolios para despachos y estudios de diseño arquitectónico.",
    demos: [
      {
        id: "demo-arquitectura-1",
        title: "Taller de Arquitectura",
        subtitle: "Portafolio con galería filtrable, lightbox y hero slideshow.",
        status: "live",
        tags: ["React", "Vite", "Responsive"],
      },
    ],
  },
  {
    id: "restaurantes",
    label: "Restaurantes",
    description: "Menús digitales, reservaciones y presencia web.",
    demos: [],
  },
  {
    id: "escuelas",
    label: "Escuelas",
    description: "Sitios institucionales con admisiones, programas y comunidad.",
    demos: [],
  },
  {
    id: "salud",
    label: "Salud",
    description: "Consultorios, clínicas y profesionales de la salud.",
    demos: [],
  },
  {
    id: "inmobiliarias",
    label: "Inmobiliarias",
    description: "Listados de propiedades con filtros y tours virtuales.",
    demos: [],
  },
  {
    id: "creativos",
    label: "Creativos",
    description: "Portafolios para fotógrafos, diseñadores y artistas.",
    demos: [],
  },
];

const FONT_LINK = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600&display=swap";

const C = {
  ink: "#fafafa",
  paper: "#0a0a0a",
  muted: "#71717a",
  accent: "#a1a1aa",
  border: "#27272a",
  highlight: "#3f3f46",
};

export default function CatalogoIoon() {
  const [activeFilter, setActiveFilter] = useState("todos");

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FONT_LINK;
    document.head.appendChild(link);
  }, []);

  const filtered = activeFilter === "todos"
    ? INDUSTRIES
    : INDUSTRIES.filter((i) => i.id === activeFilter);

  const totalLive = INDUSTRIES.reduce(
    (s, i) => s + i.demos.filter((d) => d.status === "live").length, 0
  );

  return (
    <div style={{
      fontFamily: "'Space Grotesk', system-ui, sans-serif",
      fontWeight: 300,
      background: C.paper,
      color: C.ink,
      minHeight: "100vh",
    }}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::selection { background: ${C.ink}; color: ${C.paper}; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .filter-tab {
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          color: ${C.muted};
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 400;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.2s;
        }
        .filter-tab:hover { color: ${C.accent}; }
        .filter-tab.active {
          color: ${C.ink};
          border-bottom-color: ${C.ink};
          font-weight: 500;
        }

        .demo-card {
          border: 1px solid ${C.border};
          padding: 32px;
          transition: all 0.2s;
          cursor: pointer;
        }
        .demo-card:hover { border-color: ${C.muted}; }

        .coming-block {
          border: 1px solid ${C.border};
          padding: 32px;
        }

        .tag-item {
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: ${C.muted};
        }

        .nav-link {
          color: ${C.muted};
          text-decoration: none;
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 2px;
          text-transform: uppercase;
          transition: color 0.2s;
        }
        .nav-link:hover { color: ${C.ink}; }

        .cta-link {
          color: ${C.ink};
          text-decoration: none;
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 2px;
          text-transform: uppercase;
          border-bottom: 1px solid ${C.ink};
          padding-bottom: 4px;
          transition: color 0.2s, border-color 0.2s;
        }
        .cta-link:hover { color: ${C.muted}; border-color: ${C.muted}; }

        .live-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: ${C.ink}; display: inline-block;
        }

        @media (max-width: 768px) {
          .page-section { padding-left: 24px !important; padding-right: 24px !important; }
          .hero-h1 { font-size: 32px !important; }
          .stats-row { flex-direction: column; gap: 24px !important; }
          .filters-row { flex-wrap: wrap; }
          .filter-tab { padding: 6px 10px; font-size: 11px; }
          .steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* NAV */}
      <nav className="page-section" style={{
        padding: "24px 80px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: `1px solid ${C.border}`,
      }}>
        <img
          src={`data:image/png;base64,${LOGO_B64}`}
          alt="ioon"
          style={{ height: 28, filter: "invert(1)" }}
        />
        <div style={{ display: "flex", gap: 32 }}>
          <a className="nav-link" href="#catalogo">Demos</a>
          <a className="nav-link" href="#proceso">Proceso</a>
          <a className="nav-link" href="#contacto">Contacto</a>
        </div>
      </nav>

      {/* HERO */}
      <header className="page-section" style={{
        padding: "120px 80px 100px",
        maxWidth: 900,
        animation: "fadeIn 0.35s ease",
      }}>
        <div style={{
          fontSize: 13, fontWeight: 400, letterSpacing: 3,
          textTransform: "uppercase", color: C.muted, marginBottom: 16,
        }}>
          Catálogo de demos — 2026
        </div>

        <h1 className="hero-h1" style={{
          fontSize: "clamp(32px, 5vw, 56px)",
          fontWeight: 300, letterSpacing: -1, lineHeight: 1.15,
          marginBottom: 16, maxWidth: 680,
        }}>
          Sitios web listos para personalizar y lanzar
        </h1>

        <p style={{
          fontSize: 17, fontWeight: 300, color: C.accent,
          maxWidth: 520, lineHeight: 1.7, marginBottom: 48,
        }}>
          Demos funcionales construidos por ioon. Elige una industria, ve el sitio en acción, y recibe tu versión personalizada en días.
        </p>

        <div className="stats-row" style={{ display: "flex", gap: 64 }}>
          {[
            { n: INDUSTRIES.length, l: "Industrias" },
            { n: totalLive, l: "Demo activo" },
            { n: `${INDUSTRIES.length - 1}+`, l: "Próximamente" },
          ].map((s) => (
            <div key={s.l}>
              <div style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                fontWeight: 300, letterSpacing: -1, lineHeight: 1.15,
              }}>{s.n}</div>
              <div style={{
                fontSize: 11, fontWeight: 400, letterSpacing: 2,
                textTransform: "uppercase", color: C.muted, marginTop: 8,
              }}>{s.l}</div>
            </div>
          ))}
        </div>
      </header>

      {/* CATALOG */}
      <section id="catalogo" className="page-section" style={{
        padding: "0 80px 120px", maxWidth: 900,
      }}>
        <div className="filters-row" style={{
          display: "flex", gap: 0,
          borderBottom: `1px solid ${C.border}`, marginBottom: 48,
        }}>
          <button
            className={`filter-tab ${activeFilter === "todos" ? "active" : ""}`}
            onClick={() => setActiveFilter("todos")}
          >Todos</button>
          {INDUSTRIES.map((ind) => (
            <button
              key={ind.id}
              className={`filter-tab ${activeFilter === ind.id ? "active" : ""}`}
              onClick={() => setActiveFilter(ind.id)}
            >{ind.label}</button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 64 }}>
          {filtered.map((industry) => (
            <div key={industry.id} style={{ animation: "fadeIn 0.35s ease" }}>
              <h2 style={{
                fontSize: "clamp(22px, 3vw, 34px)",
                fontWeight: 300, letterSpacing: -0.5, marginBottom: 8,
              }}>{industry.label}</h2>
              <p style={{
                fontSize: 16, fontWeight: 300, color: C.muted,
                marginBottom: 24, maxWidth: 680, lineHeight: 1.7,
              }}>{industry.description}</p>

              {industry.demos.length > 0 ? (
                industry.demos.map((demo) => (
                  <div key={demo.id} className="demo-card">
                    <div style={{
                      display: "flex", justifyContent: "space-between",
                      alignItems: "center", marginBottom: 12,
                    }}>
                      <span style={{
                        fontSize: "clamp(18px, 2.2vw, 26px)",
                        fontWeight: 300, letterSpacing: -0.5,
                      }}>{demo.title}</span>
                      <span style={{
                        display: "flex", alignItems: "center", gap: 8,
                        fontSize: 11, fontWeight: 400, letterSpacing: 2,
                        textTransform: "uppercase", color: C.muted,
                      }}>
                        <span className="live-dot" />
                        Live
                      </span>
                    </div>
                    <p style={{
                      fontSize: 16, fontWeight: 300, color: C.accent,
                      lineHeight: 1.7, marginBottom: 16, maxWidth: 680,
                    }}>{demo.subtitle}</p>
                    <div style={{ display: "flex", gap: 16 }}>
                      {demo.tags.map((t) => (
                        <span key={t} className="tag-item">{t}</span>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="coming-block">
                  <span style={{
                    fontSize: 11, fontWeight: 400, letterSpacing: 2,
                    textTransform: "uppercase", color: C.highlight,
                  }}>Próximamente</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section id="proceso" className="page-section" style={{
        borderTop: `1px solid ${C.border}`,
        padding: "100px 80px", maxWidth: 900,
      }}>
        <div style={{
          fontSize: 13, fontWeight: 400, letterSpacing: 3,
          textTransform: "uppercase", color: C.muted, marginBottom: 16,
        }}>Proceso</div>
        <h2 style={{
          fontSize: "clamp(22px, 3vw, 34px)",
          fontWeight: 300, letterSpacing: -0.5, marginBottom: 48,
        }}>Cómo funciona</h2>

        <div className="steps-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 48,
        }}>
          {[
            { n: "01", t: "Explora", d: "Navega el catálogo y elige el demo que mejor se ajuste a tu industria." },
            { n: "02", t: "Personaliza", d: "Nos envías tu contenido: textos, imágenes, colores y tipografía." },
            { n: "03", t: "Lanzamos", d: "En días tienes tu sitio web profesional, desplegado y funcionando." },
          ].map((step) => (
            <div key={step.n}>
              <div style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                fontWeight: 300, letterSpacing: -1, lineHeight: 1.15,
              }}>{step.n}</div>
              <div style={{
                fontSize: 16, fontWeight: 300, marginTop: 12, marginBottom: 8,
              }}>{step.t}</div>
              <p style={{
                fontSize: 15, fontWeight: 300, color: C.muted,
                lineHeight: 1.7, maxWidth: 280,
              }}>{step.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contacto" className="page-section" style={{
        borderTop: `1px solid ${C.border}`,
        padding: "100px 80px", maxWidth: 900,
      }}>
        <div style={{
          fontSize: 13, fontWeight: 400, letterSpacing: 3,
          textTransform: "uppercase", color: C.muted, marginBottom: 16,
        }}>Contacto</div>
        <h2 style={{
          fontSize: "clamp(22px, 3vw, 34px)",
          fontWeight: 300, letterSpacing: -0.5, marginBottom: 12,
        }}>¿Listo para tu sitio web?</h2>
        <p style={{
          fontSize: 17, fontWeight: 300, color: C.muted,
          lineHeight: 1.7, marginBottom: 32, maxWidth: 480,
        }}>Escríbenos y platiquemos sobre tu proyecto.</p>
        <a href="mailto:hola.ioon@gmail.com" className="cta-link">
          hola.ioon@gmail.com
        </a>
      </section>

      {/* FOOTER */}
      <footer className="page-section" style={{
        borderTop: `1px solid ${C.border}`,
        padding: "32px 80px",
        display: "flex", justifyContent: "space-between",
        alignItems: "center", maxWidth: 900,
      }}>
        <img
          src={`data:image/png;base64,${LOGO_B64}`}
          alt="ioon"
          style={{ height: 18, filter: "invert(1)", opacity: 0.3 }}
        />
        <span style={{
          fontSize: 11, fontWeight: 400, letterSpacing: 2,
          color: C.highlight, textTransform: "uppercase",
        }}>
          2026 — Innovación-as-a-Service
        </span>
      </footer>
    </div>
  );
}

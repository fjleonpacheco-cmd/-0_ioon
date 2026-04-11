import { useState, useEffect, useCallback, useRef } from "react";

const PROJECTS = [
  {
    id: 1,
    title: "Plaza Andaro",
    category: "Equipamiento",
    location: "Avándaro, México",
    year: "2013",
    description: "Centro comercial que entreteje arquitectura con naturaleza mediante durmientes de ferrocarril reutilizados como persianas exteriores.",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c0?w=800&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=80",
    ],
  },
  {
    id: 2,
    title: "Utopía Estrella",
    category: "Cultural",
    location: "Iztapalapa, CDMX",
    year: "2023",
    description: "Transformación de un vertedero informal en centro comunitario y cultural enfocado en educación ecológica. Holcim Gold Award 2023.",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&q=80",
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    ],
  },
  {
    id: 3,
    title: "Campus UMA",
    category: "Institucional",
    location: "Valle de Bravo, México",
    year: "2020",
    description: "Campus sustentable de la Universidad del Medio Ambiente con procesos regenerativos, en colaboración con Oscar Hagerman.",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
    ],
  },
  {
    id: 4,
    title: "Los Pinos",
    category: "Cultural",
    location: "CDMX, México",
    year: "2019",
    description: "Reprogramación de la antigua residencia presidencial de México para uso público: espacios abiertos, museo y pabellón gastronómico.",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80",
      "https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&q=80",
    ],
  },
  {
    id: 5,
    title: "Edificio Leones",
    category: "Equipamiento",
    location: "CDMX, México",
    year: "2016",
    description: "Proyecto de equipamiento urbano que articula programa público y privado en una estructura de concreto aparente.",
    images: [
      "https://images.unsplash.com/photo-1600074169098-16a54d791d0d?w=800&q=80",
      "https://images.unsplash.com/photo-1600563438938-a9a27215b59d?w=800&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&q=80",
    ],
  },
  {
    id: 6,
    title: "Casa Vecina",
    category: "Vivienda",
    location: "CDMX, México",
    year: "2015",
    description: "Intervención residencial en el centro histórico que dialoga con la arquitectura colonial existente.",
    images: [
      "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7c5a38?w=800&q=80",
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&q=80",
    ],
  },
];

const CATEGORIES = ["Todos", "Cultural", "Equipamiento", "Institucional", "Vivienda"];

const NAV_ITEMS = [
  { label: "Proyectos", id: "proyectos" },
  { label: "Estudio", id: "estudio" },
  { label: "Premios", id: "premios" },
  { label: "Contacto", id: "contacto" },
];

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

function Lightbox({ project, imageIndex, onClose, onNext, onPrev, onGoTo }) {
  const touchStart = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose, onNext, onPrev]);

  const handleTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? onNext() : onPrev(); }
    touchStart.current = null;
  };

  return (
    <div onClick={onClose}
      onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}
      style={{
        position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.92)",
        display: "flex", alignItems: "center", justifyContent: "center", animation: "fadeIn 0.3s ease",
        touchAction: "pan-y",
      }}>
      <button onClick={onClose} style={{
        position: "absolute", top: 16, right: 16, background: "none", border: "none",
        color: "#fff", fontSize: 28, cursor: "pointer", opacity: 0.7, zIndex: 10,
      }}>✕</button>
      <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="lb-arrow lb-arrow-left">←</button>
      <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="lb-arrow lb-arrow-right">→</button>
      <div onClick={(e) => e.stopPropagation()} className="lb-content">
        <img src={project.images[imageIndex]} alt={project.title} className="lb-image" style={{ pointerEvents: "none", userSelect: "none" }} />
        <div style={{ marginTop: 12, textAlign: "center" }}>
          <div style={{ color: "#fff", fontFamily: "'Roboto', sans-serif", fontSize: 18, fontWeight: 300 }}>{project.title}</div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 4 }}>
            {project.location} — {project.year} · {imageIndex + 1}/{project.images.length}
          </div>
        </div>
      </div>
      <div className="lb-thumbs">
        {project.images.map((img, i) => (
          <div key={i} onClick={(e) => { e.stopPropagation(); onGoTo(i); }} style={{
            width: 40, height: 40, borderRadius: 4, overflow: "hidden", flexShrink: 0,
            border: i === imageIndex ? "2px solid #fff" : "2px solid transparent",
            opacity: i === imageIndex ? 1 : 0.4, cursor: "pointer", transition: "all 0.2s",
          }}>
            <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const heroImages = PROJECTS.slice(0, 4).map(p => ({ url: p.images[0], title: p.title, location: p.location }));
  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % heroImages.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero">
      {heroImages.map((img, i) => (
        <div key={i} style={{ position: "absolute", inset: 0, opacity: i === current ? 1 : 0, transition: "opacity 1.2s ease" }}>
          <img src={img.url} alt={img.title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.55)" }} />
        </div>
      ))}
      <div className="hero-overlay">
        <div style={{ fontFamily: "'Roboto', sans-serif", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 12 }}>
          CANO | VERA Arquitectura
        </div>
        <div className="hero-title">{heroImages[current].title}</div>
        <div style={{ fontFamily: "'Roboto', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.6)", marginTop: 12 }}>
          {heroImages[current].location}
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 32 }}>
          {heroImages.map((_, i) => (
            <div key={i} onClick={() => setCurrent(i)} style={{
              width: i === current ? 32 : 8, height: 3,
              background: i === current ? "#fff" : "rgba(255,255,255,0.3)",
              borderRadius: 2, cursor: "pointer", transition: "all 0.4s ease",
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function HamburgerIcon({ open }) {
  const bar = { display: "block", width: 22, height: 1.5, background: "#1a1a1a", position: "absolute", left: 0, transition: "all 0.3s ease" };
  return (
    <div style={{ width: 22, height: 16, position: "relative" }}>
      <span style={{ ...bar, top: open ? 7 : 0, transform: open ? "rotate(45deg)" : "none" }} />
      <span style={{ ...bar, top: 7, opacity: open ? 0 : 1 }} />
      <span style={{ ...bar, top: open ? 7 : 14, transform: open ? "rotate(-45deg)" : "none" }} />
    </div>
  );
}

export default function CanoVeraPortfolio() {
  const [filter, setFilter] = useState("Todos");
  const [lightbox, setLightbox] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const filtered = filter === "Todos" ? PROJECTS : PROJECTS.filter(p => p.category === filter);
  const openLightbox = (projectId, imageIndex) => setLightbox({ projectId, imageIndex });
  const closeLightbox = () => setLightbox(null);
  const currentProject = lightbox ? PROJECTS.find(p => p.id === lightbox.projectId) : null;

  const nextImage = useCallback(() => {
    if (!lightbox || !currentProject) return;
    setLightbox(prev => ({ ...prev, imageIndex: (prev.imageIndex + 1) % currentProject.images.length }));
  }, [lightbox, currentProject]);

  const prevImage = useCallback(() => {
    if (!lightbox || !currentProject) return;
    setLightbox(prev => ({ ...prev, imageIndex: (prev.imageIndex - 1 + currentProject.images.length) % currentProject.images.length }));
  }, [lightbox, currentProject]);

  useEffect(() => {
    const h = () => { if (window.innerWidth > 768 && menuOpen) setMenuOpen(false); };
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <div style={{ background: "#f5f3ef", minHeight: "100vh", fontFamily: "'Roboto', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet" />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
        .project-card img { transition: transform 0.8s cubic-bezier(0.16,1,0.3,1); }
        .project-card:hover img { transform: scale(1.05); }
        .filter-btn { transition: all 0.3s ease; }
        .filter-btn:hover { color: #1a1a1a !important; }
        .hero { position: relative; width: 100%; height: 85vh; overflow: hidden; background: #0a0a0a; }
        .hero-overlay { position: absolute; bottom: 0; left: 0; right: 0; padding: 80px 48px 48px; background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%); }
        .hero-title { font-family: 'Roboto', sans-serif; font-weight: 100; color: #fff; font-size: clamp(32px,5vw,64px); line-height: 1.1; max-width: 600; transition: all 0.5s ease; }
        .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; justify-content: space-between; align-items: center; padding: 20px 48px; background: rgba(245,243,239,0.85); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(0,0,0,0.06); }
        .nav-links-desktop { display: flex; gap: 32px; }
        .nav-hamburger { display: none; cursor: pointer; background: none; border: none; padding: 4px; }
        .mobile-menu { position: fixed; inset: 0; z-index: 99; background: rgba(245,243,239,0.98); backdrop-filter: blur(20px); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 32px; animation: fadeIn 0.3s ease; }
        .mobile-menu a { font-family: 'Roboto', sans-serif; font-size: 24px; font-weight: 100; color: #1a1a1a; text-decoration: none; letter-spacing: 0.1em; }
        .lb-arrow { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: #fff; width: 44px; height: 44px; border-radius: 50%; font-size: 18px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .lb-arrow-left { left: 16px; }
        .lb-arrow-right { right: 16px; }
        .lb-content { max-width: 85vw; max-height: 80vh; animation: slideUp 0.4s ease; }
        .lb-image { max-width: 85vw; max-height: 70vh; object-fit: contain; border-radius: 4px; display: block; }
        .lb-thumbs { position: absolute; bottom: 20px; display: flex; gap: 6px; }
        .section-pad { padding: 96px 48px; }
        .stats-row { display: flex; justify-content: center; gap: 48px; margin-top: 48px; flex-wrap: wrap; }
        .grid-projects { padding: 0 48px 96px; display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 24px; max-width: 1400px; margin: 0 auto; }
        .filter-bar { padding: 0 48px 32px; display: flex; gap: 24px; justify-content: center; flex-wrap: wrap; }
        .team-section { background: #1a1a1a; padding: 80px 48px; text-align: center; }
        .contact-section { padding: 64px 48px; text-align: center; }
        @media (max-width: 768px) {
          .nav { padding: 16px 20px; }
          .nav-links-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
          .hero { height: 70vh; }
          .hero-overlay { padding: 60px 20px 32px; }
          .section-pad { padding: 64px 20px; }
          .stats-row { gap: 24px; }
          .filter-bar { padding: 0 20px 24px; gap: 12px; }
          .grid-projects { padding: 0 20px 64px; grid-template-columns: 1fr; }
          .grid-projects > div { grid-row: span 1 !important; }
          .team-section { padding: 48px 20px; }
          .contact-section { padding: 48px 20px; }
          .lb-arrow { width: 36px; height: 36px; font-size: 16px; }
          .lb-arrow-left { left: 8px; }
          .lb-arrow-right { right: 8px; }
          .lb-content { max-width: 95vw; }
          .lb-image { max-width: 95vw; max-height: 65vh; }
          .lb-thumbs > div { width: 32px !important; height: 32px !important; }
        }
        @media (max-width: 480px) {
          .hero { height: 60vh; }
          .stats-row { gap: 16px; }
          .filter-bar { gap: 8px; }
          .filter-bar button { font-size: 11px !important; }
        }
      `}</style>

      <nav className="nav">
        <div style={{ fontFamily: "'Roboto', sans-serif", fontSize: 13, fontWeight: 500, letterSpacing: "0.15em", color: "#1a1a1a", cursor: "pointer" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          CANO | VERA
        </div>
        <div className="nav-links-desktop">
          {NAV_ITEMS.map(item => (
            <a key={item.label} href={`#${item.id}`} onClick={(e) => { e.preventDefault(); scrollTo(item.id); }}
              style={{ fontFamily: "'Roboto', sans-serif", fontSize: 13, color: "#666", textDecoration: "none", letterSpacing: "0.05em" }}>
              {item.label}
            </a>
          ))}
        </div>
        <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menú">
          <HamburgerIcon open={menuOpen} />
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          {NAV_ITEMS.map(item => (
            <a key={item.label} href={`#${item.id}`} onClick={(e) => {
              e.preventDefault(); setMenuOpen(false); setTimeout(() => scrollTo(item.id), 100);
            }}>{item.label}</a>
          ))}
        </div>
      )}

      <HeroSlideshow />

      <section id="estudio" className="section-pad" style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: 24 }}>
          Taller de Arquitectura — CDMX, desde 2007
        </div>
        <p style={{ fontSize: "clamp(22px, 3vw, 36px)", color: "#1a1a1a", lineHeight: 1.4, fontWeight: 100 }}>
          "Lo específico puede transformar el todo."
        </p>
        <p style={{ fontSize: 15, color: "#777", lineHeight: 1.8, marginTop: 24, maxWidth: 640, margin: "24px auto 0" }}>
          Arquitectura con orientación social y sensibilidad al contexto, expresada en formas de escala ambiciosa. Vivienda social, proyectos institucionales, culturales e infraestructura.
        </p>
        <div className="stats-row">
          {[{ n: "17+", l: "Años" }, { n: "40+", l: "Proyectos" }, { n: "2×", l: "Bienal Venecia" }, { n: "Gold", l: "Holcim 2023" }].map(s => (
            <div key={s.l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, color: "#1a1a1a", fontWeight: 100 }}>{s.n}</div>
              <div style={{ fontSize: 11, color: "#999", letterSpacing: "0.1em", marginTop: 4, textTransform: "uppercase" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <div id="proyectos" className="filter-bar">
        {CATEGORIES.map(cat => (
          <button key={cat} className="filter-btn" onClick={() => setFilter(cat)} style={{
            background: "none", border: "none", cursor: "pointer", fontSize: 13, letterSpacing: "0.05em",
            color: filter === cat ? "#1a1a1a" : "#aaa",
            borderBottom: filter === cat ? "1.5px solid #1a1a1a" : "1.5px solid transparent", paddingBottom: 6,
          }}>{cat}</button>
        ))}
      </div>

      <section className="grid-projects">
        {filtered.map((project, pi) => (
          <div key={project.id} className="project-card"
            onMouseEnter={() => setHoveredProject(project.id)} onMouseLeave={() => setHoveredProject(null)}
            style={{ cursor: "pointer", gridRow: pi === 0 ? "span 2" : "span 1", animation: `slideUp 0.6s ease ${pi * 0.1}s both` }}
            onClick={() => openLightbox(project.id, 0)}>
            <div style={{ position: "relative", overflow: "hidden", borderRadius: 4, aspectRatio: pi === 0 ? "3/4" : "4/3", background: "#ddd" }}>
              <img src={project.images[0]} alt={project.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{
                position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)",
                opacity: hoveredProject === project.id ? 1 : 0, transition: "opacity 0.4s ease",
                display: "flex", alignItems: "flex-end", padding: 20,
              }}>
                <div>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" }}>{project.category} — {project.year}</div>
                  <div style={{ color: "#fff", fontSize: 14, marginTop: 8, lineHeight: 1.5, maxWidth: 320 }}>{project.description}</div>
                  <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 12 }}>{project.images.length} fotografías →</div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 12 }}>
              <div style={{ fontSize: 18, color: "#1a1a1a", fontWeight: 300 }}>{project.title}</div>
              <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>{project.location}</div>
            </div>
          </div>
        ))}
      </section>

      <section id="premios" className="team-section">
        <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 12 }}>Equipo</div>
        <div style={{ fontSize: "clamp(18px, 3vw, 28px)", color: "#fff", fontWeight: 100 }}>
          Juan Carlos Cano · Paloma Vera · Fermín Andrade
        </div>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", marginTop: 16, lineHeight: 1.7, maxWidth: 560, margin: "16px auto 0" }}>
          Emerging Voices 2024 — The Architectural League of New York<br />Holcim Gold Award 2023 — Latinoamérica<br />Bienal de Venecia 2016, 2018
        </div>
      </section>

      <section id="contacto" className="contact-section">
        <div style={{ fontSize: "clamp(24px, 4vw, 32px)", color: "#1a1a1a", fontWeight: 100 }}>¿Conversamos?</div>
        <a href="mailto:info@canovera.com" style={{
          display: "inline-block", marginTop: 24, padding: "14px 40px", background: "#1a1a1a", color: "#fff",
          fontSize: 13, letterSpacing: "0.1em", textDecoration: "none", borderRadius: 2,
        }}>info@canovera.com</a>
      </section>

      {lightbox && currentProject && (
        <Lightbox project={currentProject} imageIndex={lightbox.imageIndex}
          onClose={closeLightbox} onNext={nextImage} onPrev={prevImage}
          onGoTo={(i) => setLightbox(prev => ({ ...prev, imageIndex: i }))} />
      )}
    </div>
  );
}

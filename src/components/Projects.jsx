import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/content";
import SectionLabel from "./SectionLabel";

const PROJECT_PHOTOS = {
  "01": [
    { img: "portfolio\public\dogh2.jpeg", caption: "Map view & route planning" },
    { img: "portfolio\public\dogh1.jpeg", caption: "Select A Trip" },
    { img: "portfolio\public\dogh6.jpeg", caption: "Selecting Bus" },
    { img: "portfolio\public\dogh3.jpeg", caption: "Selecting Class" },
    { img: "portfolio\public\dogh4.jpeg", caption: "Payment Page" },
    { img: "portfolio\public\dogh5.jpeg", caption: "After Payment" },
    { img: "portfolio\public\dogh7.jpeg", caption: "Profile Page" },
  ],
  "02": [
    { img: "portfolio\public\dawar1.png", caption: "Homepage" },
    { img: "portfolio\public\dawar6.png", caption: "Homepage Recoloring" },
    { img: "portfolio\public\dawar2.png", caption: "Login Page" },
    { img: "portfolio\public\dawar3.png", caption: "Cars Category" },
    { img: "portfolio\public\dawar5.png", caption: "Car Selection" },
    { img: "portfolio\public\dawar7.png", caption: "Cart Option" },
    { img: "portfolio\public\dawar4.png", caption: "Checkout Page" },
  ],
  "03": [
    { img: "portfolio\public\food1.png", caption: "Food Order Panel + Admin Panel" }
  ],
};


// ─── Lightbox ──────────────────────────────────────────────────────────────
function Lightbox({ photos, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);
  const [zoomed, setZoomed] = useState(false);

  const prev = useCallback(() => {
    setZoomed(false);
    setCurrent(c => (c - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const next = useCallback(() => {
    setZoomed(false);
    setCurrent(c => (c + 1) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        background: "rgba(0,0,0,0.93)",
        backdropFilter: "blur(10px)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: "fixed", top: 24, right: 28, zIndex: 100001,
          background: "transparent", border: "1px solid #333",
          color: "#fff", width: 40, height: 40, cursor: "none",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, fontFamily: "'Share Tech Mono', monospace",
          transition: "all 0.2s",
          boxShadow: "0 0 0 transparent",
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "#50ff20"; e.currentTarget.style.boxShadow = "0 0 12px #50ff20"; e.currentTarget.style.color = "#50ff20"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "#333"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.color = "#fff"; }}
      >✕</button>

      {/* Counter */}
      <div style={{
        position: "fixed", top: 28, left: "50%", transform: "translateX(-50%)",
        fontFamily: "'Share Tech Mono', monospace", fontSize: 11,
        letterSpacing: "0.22em", color: "#555", zIndex: 100001,
      }}>
        <span style={{ color: "#50ff20", textShadow: "0 0 8px #50ff20" }}>{current + 1}</span>
        <span> / {photos.length}</span>
      </div>

      {/* Keyboard hint */}
      <div style={{
        position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)",
        fontFamily: "'Share Tech Mono', monospace", fontSize: 10,
        letterSpacing: "0.18em", color: "#333", zIndex: 100001,
        display: "flex", gap: 20, alignItems: "center",
      }}>
        <span>← → NAVIGATE</span>
        <span style={{ color: "#1e1e1e" }}>|</span>
        <span>ESC CLOSE</span>
        <span style={{ color: "#1e1e1e" }}>|</span>
        <span>CLICK IMAGE TO ZOOM</span>
      </div>

      {/* Prev arrow */}
      {photos.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          style={{
            position: "fixed", left: 20, top: "50%", transform: "translateY(-50%)",
            zIndex: 100001, background: "transparent", border: "1px solid #222",
            color: "#666", width: 44, height: 44, cursor: "none",
            fontFamily: "'Share Tech Mono', monospace", fontSize: 18,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#50ff20"; e.currentTarget.style.color = "#50ff20"; e.currentTarget.style.boxShadow = "0 0 12px #50ff20"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "#222"; e.currentTarget.style.color = "#666"; e.currentTarget.style.boxShadow = "none"; }}
        >‹</button>
      )}

      {/* Next arrow */}
      {photos.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          style={{
            position: "fixed", right: 20, top: "50%", transform: "translateY(-50%)",
            zIndex: 100001, background: "transparent", border: "1px solid #222",
            color: "#666", width: 44, height: 44, cursor: "none",
            fontFamily: "'Share Tech Mono', monospace", fontSize: 18,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#50ff20"; e.currentTarget.style.color = "#50ff20"; e.currentTarget.style.boxShadow = "0 0 12px #50ff20"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "#222"; e.currentTarget.style.color = "#666"; e.currentTarget.style.boxShadow = "none"; }}
        >›</button>
      )}

      {/* Main image */}
      <motion.div
        key={current}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={(e) => { e.stopPropagation(); setZoomed(z => !z); }}
        style={{
          position: "relative",
          maxWidth: zoomed ? "95vw" : "82vw",
          maxHeight: zoomed ? "92vh" : "78vh",
          transition: "max-width 0.4s ease, max-height 0.4s ease",
          cursor: "none",
        }}
      >
        {/* Neon corner brackets */}
        {["top-left","top-right","bottom-left","bottom-right"].map(pos => {
          const isTop = pos.includes("top"), isLeft = pos.includes("left");
          return (
            <div key={pos}>
              <div style={{ position:"absolute", [isTop?"top":"bottom"]:-1, [isLeft?"left":"right"]:-1,
                width:24, height:2, background:"#50ff20", boxShadow:"0 0 10px #50ff20", zIndex:2 }}/>
              <div style={{ position:"absolute", [isTop?"top":"bottom"]:-1, [isLeft?"left":"right"]:-1,
                width:2, height:24, background:"#50ff20", boxShadow:"0 0 10px #50ff20", zIndex:2 }}/>
            </div>
          );
        })}

        <img
          src={photos[current].src}
          alt={photos[current].caption}
          style={{
            display: "block",
            maxWidth: "100%",
            maxHeight: zoomed ? "92vh" : "78vh",
            objectFit: "contain",
            boxShadow: "0 0 60px rgba(0,0,0,0.8), 0 0 30px rgba(80,255,32,0.06)",
            border: "1px solid #1e1e1e",
            transition: "max-height 0.4s ease",
          }}
        />

        {/* Caption + zoom hint */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "28px 18px 14px",
          background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)",
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        }}>
          <span style={{
            fontFamily: "'Share Tech Mono', monospace", fontSize: 15,
            letterSpacing: "0.14em", color: "#88ff00",
          }}>{photos[current].caption}</span>
          <span style={{
            fontFamily: "'Share Tech Mono', monospace", fontSize: 10, fontWeight: 600,
            letterSpacing: "0.18em", color: zoomed ? "#50ff20" : "#ffd207",
            textShadow: zoomed ? "0 0 8px #50ff20" : "none",
            textTransform: "uppercase", transition: "all 0.3s",
          }}>{zoomed ? "[ ZOOMED ]" : "[ CLICK TO ZOOM ]"}</span>
        </div>
      </motion.div>

      {/* Thumbnail strip at bottom */}
      {photos.length > 1 && (
        <div style={{
          position: "fixed", bottom: 52, left: "50%", transform: "translateX(-50%)",
          display: "flex", gap: 8, zIndex: 100001,
        }}
          onClick={e => e.stopPropagation()}
        >
          {photos.map((ph, pi) => (
            <div
              key={pi}
              onClick={(e) => { e.stopPropagation(); setZoomed(false); setCurrent(pi); }}
              style={{
                width: 52, height: 36, flexShrink: 0, cursor: "none",
                border: current === pi ? "1px solid #50ff20" : "1px solid #222",
                boxShadow: current === pi ? "0 0 10px #50ff20" : "none",
                overflow: "hidden", transition: "all 0.25s",
                opacity: current === pi ? 1 : 0.45,
              }}
            >
              <img src={ph.src} alt={ph.caption}
                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ─── Projects section ──────────────────────────────────────────────────────
export default function Projects() {
  const [active, setActive] = useState(null);
  const [lightbox, setLightbox] = useState(null); // { photos, index }

  return (
    <>
      <section id="projects" style={{ padding: "100px 48px" }}>
        <SectionLabel>Projects</SectionLabel>
        <div style={{ borderTop: "1px solid #1e1e1e" }}>
          {projects.map((p, i) => (
            <ProjectRow
              key={i} project={p} index={i}
              isActive={active === i}
              onToggle={() => setActive(active === i ? null : i)}
              onOpenLightbox={(photos, idx) => setLightbox({ photos, index: idx })}
            />
          ))}
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            photos={lightbox.photos}
            startIndex={lightbox.index}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Project row ───────────────────────────────────────────────────────────
function ProjectRow({ project, index, isActive, onToggle, onOpenLightbox }) {
  const [hovered, setHovered] = useState(false);
  const photos = PROJECT_PHOTOS[project.num] || [];
  const [activePhoto, setActivePhoto] = useState(0);

  return (
    <motion.div data-hover
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onClick={onToggle}
      style={{
        borderBottom: "1px solid #1e1e1e", cursor: "none",
        boxShadow: hovered ? "inset 4px 0 0 #50ff20" : "inset 4px 0 0 transparent",
        transition: "box-shadow 0.4s ease",
      }}>

      <motion.div animate={{ paddingLeft: hovered ? 24 : 8 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ display: "grid", gridTemplateColumns: "56px 1fr auto", gap: 32, alignItems: "center", padding: "36px 0" }}>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 13, letterSpacing: "0.1em",
          color: hovered ? "#50ff20" : "#555", textShadow: hovered ? "0 0 10px #50ff20" : "none", transition: "all 0.3s" }}>
          {project.num}
        </span>
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 600,
              color: hovered ? "#fff" : "#ddd", transition: "color 0.3s" }}>{project.name}</h3>
            <span style={{ fontSize: 13, color: "#666666" }}>{project.subtitle}</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, letterSpacing: "0.15em",
            textTransform: "uppercase", color: "#50ff20", textShadow: "0 0 8px #50ff20, 0 0 18px rgba(80,255,32,0.4)" }}>
            {project.tag}
          </span>
          <motion.div animate={{ rotate: isActive ? 45 : 0 }} transition={{ duration: 0.3 }}
            style={{ width: 14, height: 14, position: "relative" }}>
            <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "#555" }} />
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "#555" }} />
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isActive && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ overflow: "hidden" }}>
            <div style={{ paddingLeft: 88, paddingBottom: 36, display: "flex", flexDirection: "column", gap: 20 }}>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "#888", maxWidth: 560 }}>{project.description}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {project.tech.map((t) => (
                  <span key={t} style={{
                    fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: "0.15em",
                    textTransform: "uppercase", border: "1px solid #50ff20", padding: "4px 12px",
                    color: "#50ff20", textShadow: "0 0 8px #50ff20", boxShadow: "0 0 10px rgba(80,255,32,0.2)",
                  }}>{t}</span>
                ))}
              </div>

              {/* Screenshots */}
              {photos.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
                  <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: "0.2em",
                    color: "#50ff20", textShadow: "0 0 8px #50ff20", textTransform: "uppercase" }}>
                    &gt; Screenshots
                  </span>

                  {/* Thumbnails */}
                  <div style={{ display: "flex", gap: 10 }}>
                    {photos.map((ph, pi) => (
                      <div key={pi}
                        onClick={(e) => { e.stopPropagation(); setActivePhoto(pi); }}
                        style={{
                          width: 80, height: 54, flexShrink: 0, cursor: "none",
                          border: activePhoto === pi ? "1px solid #50ff20" : "1px solid #222",
                          boxShadow: activePhoto === pi ? "0 0 10px #50ff20" : "none",
                          overflow: "hidden", transition: "all 0.3s", background: "#0d0d0d",
                        }}>
                        <img src={ph.src} alt={ph.caption}
                          style={{ width: "100%", height: "100%", objectFit: "cover",
                            filter: activePhoto === pi ? "brightness(0.9)" : "brightness(0.45) grayscale(60%)",
                            transition: "filter 0.3s" }} />
                      </div>
                    ))}
                  </div>

                  {/* Large preview — click opens lightbox */}
                  <motion.div
                    key={activePhoto}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    onClick={(e) => { e.stopPropagation(); onOpenLightbox(photos, activePhoto); }}
                    style={{
                      position: "relative", width: "100%", maxWidth: 620, height: 340,
                      border: "1px solid #1e1e1e", overflow: "hidden",
                      background: "#0a0a0a", cursor: "none",
                      boxShadow: "0 0 20px rgba(80,255,32,0.08)",
                    }}
                    whileHover="hovered"
                  >
                    <img src={photos[activePhoto].src} alt={photos[activePhoto].caption}
                      style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.85)",
                        transition: "filter 0.3s, transform 0.4s" }} />

                    {/* Hover overlay with fullscreen hint */}
                    <motion.div
                      variants={{
                        hovered: { opacity: 1 },
                        initial: { opacity: 0 },
                      }}
                      initial="initial"
                      style={{
                        position: "absolute", inset: 0,
                        background: "rgba(0,0,0,0.55)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexDirection: "column", gap: 10,
                        transition: "opacity 0.3s",
                      }}
                    >
                      {/* Expand icon */}
                      <div style={{
                        width: 48, height: 48, border: "1px solid #50ff20",
                        boxShadow: "0 0 16px #50ff20, inset 0 0 16px rgba(80,255,32,0.08)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M2 2h5M2 2v5M18 2h-5M18 2v5M2 18h5M2 18v-5M18 18h-5M18 18v-5" stroke="#50ff20" strokeWidth="1.5" strokeLinecap="square"/>
                        </svg>
                      </div>
                      <span style={{
                        fontFamily: "'Share Tech Mono', monospace", fontSize: 10,
                        letterSpacing: "0.22em", color: "#50ff20",
                        textShadow: "0 0 8px #50ff20", textTransform: "uppercase",
                      }}>FULL SCREEN</span>
                    </motion.div>

                    {/* Corner brackets */}
                    {["top-left","top-right","bottom-left","bottom-right"].map(pos => {
                      const isTop = pos.includes("top"), isLeft = pos.includes("left");
                      return (
                        <div key={pos}>
                          <div style={{ position:"absolute", [isTop?"top":"bottom"]:8, [isLeft?"left":"right"]:8,
                            width:18, height:1, background:"#50ff20", boxShadow:"0 0 6px #50ff20" }}/>
                          <div style={{ position:"absolute", [isTop?"top":"bottom"]:8, [isLeft?"left":"right"]:8,
                            width:1, height:18, background:"#50ff20", boxShadow:"0 0 6px #50ff20" }}/>
                        </div>
                      );
                    })}

                    <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"10px 14px",
                      background:"linear-gradient(to top, rgba(0,0,0,0.9), transparent)" }}>
                      <span style={{ fontFamily:"'Share Tech Mono', monospace", fontSize:11, color:"#aaa",
                        letterSpacing:"0.12em" }}>{photos[activePhoto].caption}</span>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

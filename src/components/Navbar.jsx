import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = ["About", "Skills", "Projects", "Experience", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "24px 48px",
          borderBottom: scrolled ? "1px solid #39ff1422" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          background: scrolled ? "rgba(3,3,3,0.88)" : "transparent",
          transition: "all 0.5s ease",
          boxShadow: scrolled ? "0 1px 20px rgba(57,255,20,0.06)" : "none",
        }}>
        <button data-hover onClick={() => scrollTo("hero")} style={{
          fontFamily: "'Share Tech Mono', monospace", fontSize: 13, letterSpacing: "0.25em",
          color: "#39ff14", background: "none", border: "none", cursor: "none",
          textShadow: "0 0 8px #39ff14",
        }}>3OS_</button>

        <ul style={{ display: "flex", gap: 36, listStyle: "none" }} className="nav-desktop">
          {links.map((l) => <li key={l}><NavLink label={l} onClick={() => scrollTo(l.toLowerCase())} /></li>)}
        </ul>

        <button data-hover onClick={() => setMenuOpen(!menuOpen)} className="nav-hamburger"
          style={{ background: "none", border: "none", cursor: "none", display: "none", flexDirection: "column", gap: 5, padding: 4 }}>
          {[0,1,2].map(i => (
            <motion.span key={i} style={{ display: "block", width: 22, height: 1, background: "#39ff14", boxShadow: "0 0 4px #39ff14" }}
              animate={{ rotate: menuOpen && i === 0 ? 45 : menuOpen && i === 2 ? -45 : 0,
                y: menuOpen && i === 0 ? 6 : menuOpen && i === 2 ? -6 : 0,
                opacity: menuOpen && i === 1 ? 0 : 1 }}
              transition={{ duration: 0.3 }} />
          ))}
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: "fixed", inset: 0, background: "#030303", zIndex: 400,
              display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 28 }}>
            {links.map((l, i) => (
              <motion.button key={l} data-hover
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => scrollTo(l.toLowerCase())}
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                  fontSize: "clamp(32px, 8vw, 64px)", letterSpacing: "-0.02em",
                  background: "none", border: "none", color: "white", cursor: "none" }}>
                {l}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) { .nav-desktop { display: none !important; } .nav-hamburger { display: flex !important; } }
      `}</style>
    </>
  );
}

function NavLink({ label, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button data-hover onClick={onClick}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: "none", border: "none", cursor: "none", position: "relative",
        fontFamily: "'Share Tech Mono', monospace", fontSize: 12, fontWeight: 400,
        letterSpacing: "0.18em", textTransform: "uppercase",
        color: hovered ? "#39ff14" : "#ffffff",
        textShadow: hovered ? "0 0 8px #39ff14" : "none",
        transition: "color 0.3s, text-shadow 0.3s", padding: "2px 0",
      }}>
      {label}
      <motion.span animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ position: "absolute", bottom: 0, left: 0, height: 1, background: "#39ff14",
          display: "block", boxShadow: "0 0 6px #39ff14" }} />
    </button>
  );
}

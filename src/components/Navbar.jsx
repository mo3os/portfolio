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
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "28px 48px",
          borderBottom: scrolled ? "1px solid #1e1e1e" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          background: scrolled ? "rgba(0,0,0,0.85)" : "transparent",
          transition: "all 0.5s ease",
        }}
      >
        <button
          data-hover
          onClick={() => scrollTo("hero")}
          style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
            fontSize: 13, letterSpacing: "0.25em", textTransform: "uppercase",
            color: "white", background: "none", border: "none", cursor: "none",
          }}
        >ME</button>

        <ul style={{ display: "flex", gap: 36, listStyle: "none" }} className="nav-desktop">
          {links.map((l) => (
            <li key={l}>
              <NavLink label={l} onClick={() => scrollTo(l.toLowerCase())} />
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          data-hover
          onClick={() => setMenuOpen(!menuOpen)}
          className="nav-hamburger"
          style={{
            background: "none", border: "none", cursor: "none",
            display: "none", flexDirection: "column", gap: 5, padding: 4,
          }}
          aria-label="Menu"
        >
          {[0,1,2].map(i => (
            <motion.span key={i} style={{
              display: "block", width: 22, height: 1, background: "white",
            }} animate={{ rotate: menuOpen && i === 0 ? 45 : menuOpen && i === 2 ? -45 : 0,
              y: menuOpen && i === 0 ? 6 : menuOpen && i === 2 ? -6 : 0,
              opacity: menuOpen && i === 1 ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
              background: "black", zIndex: 400, display: "flex",
              flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 32,
            }}
          >
            {links.map((l, i) => (
              <motion.button key={l} data-hover
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => scrollTo(l.toLowerCase())}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                  fontSize: "clamp(32px, 8vw, 64px)", letterSpacing: "-0.02em",
                  background: "none", border: "none", color: "white", cursor: "none",
                }}
              >{l}</motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}

function NavLink({ label, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button data-hover
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "none", border: "none", cursor: "none", position: "relative",
        fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 400,
        letterSpacing: "0.18em", textTransform: "uppercase", color: "white", padding: "2px 0",
      }}
    >
      {label}
      <motion.span
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: "absolute", bottom: 0, left: 0, height: 1,
          background: "white", display: "block",
        }}
      />
    </button>
  );
}

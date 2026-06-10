import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { personal } from "../data/content";

export default function Hero() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const photoOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const photoY = useTransform(scrollY, [0, 400], [0, -40]);
  const letters1 = personal.name.first.split("");
  const letters2 = personal.name.last.split("");

  return (
    <section id="hero" ref={ref} style={{
      height: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "center", padding: "0 48px", position: "relative", overflow: "hidden",
    }}>

      {/* PNG photo — transparent background, bottom-anchored */}
      <motion.div style={{
        position: "absolute",
        bottom: 0,
        right: "2%",
        width: "clamp(320px, 38vw, 580px)",
        height: "92%",
        opacity: photoOpacity,
        y: photoY,
        pointerEvents: "none",
        zIndex: 1,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}>
        {/* Subtle neon ground glow under feet */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "70%",
          height: 120,
          background: "radial-gradient(ellipse at center bottom, rgba(80,255,32,0.13) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Faint neon scan line on photo */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to left, transparent 0%, rgba(6,8,16,0.18) 85%, rgba(6,8,16,0.7) 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }} />

        {/* Bottom fade so feet blend into page */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "22%",
          background: "linear-gradient(to top, #060810 0%, transparent 100%)",
          zIndex: 3,
          pointerEvents: "none",
        }} />

        <img
          src="/photo.webp"
          alt="Mohamed Essam"
          style={{
            width: "100%",
            height: "90%",
            objectFit: "cover",
            objectPosition: "bottom center",
            filter: "brightness(0.92) contrast(1.05) drop-shadow(0 0 28px rgba(80,255,32,0.09)) drop-shadow(0 0 60px rgba(0,0,0,0.6))",
            position: "relative",
            zIndex: 1,
            borderRadius: "10%"
          }}
        />
      </motion.div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: "62%" }}>
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, letterSpacing: "0.22em", marginBottom: 28 }}>
          <span style={{ color: "#50ff20", textShadow: "0 0 10px #50ff20" }}>▶ </span>
          <span style={{ color: "#555" }}>SOFTWARE_ENGINEER.exe</span>
          <BlinkCursor />
        </motion.div>

        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
          fontSize: "clamp(68px, 11vw, 170px)", lineHeight: 0.88,
          letterSpacing: "-0.03em", textTransform: "uppercase",
        }}>
          <span style={{ display: "block", overflow: "hidden" }}>
            {letters1.map((l, i) => (
              <motion.span key={i} initial={{ y: "110%" }} animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.25 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "inline-block", textShadow: "0 0 22px rgba(80,255,32,0.18)" }}>
                {l}
              </motion.span>
            ))}
          </span>
          <span style={{ display: "block", overflow: "hidden" }}>
            {letters2.map((l, i) => (
              <motion.span key={i} initial={{ y: "110%" }} animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.45 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "inline-block", WebkitTextStroke: "1px rgba(255,255,255,0.8)", color: "transparent" }}>
                {l}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.div initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ height: 1, background: "linear-gradient(to right, #50ff2044, transparent)", margin: "28px 0" }} />

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ color: "#50ff20", fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase",
            textShadow: "0 0 10px #50ff20", fontFamily: "'Share Tech Mono', monospace" }}>
            &gt; On Duty
          </span>
          <span style={{ fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase", color: "#777",
            fontFamily: "'Share Tech Mono', monospace" }}>Software Engineer · Machine Learning</span>
          <span style={{ fontSize: 11, letterSpacing: "0.15em", color: "#444",
            fontFamily: "'Share Tech Mono', monospace" }}>Cairo, Egypt</span>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.8 }}
        style={{
          position: "absolute", bottom: 40, left: 48,
          display: "flex", alignItems: "center", gap: 14,
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase",
          color: "#50ff20", textShadow: "0 0 10px #50ff20",
        }}>
        <ScrollLine /> SCROLL
      </motion.div>

      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.7 }}
        style={{ position: "absolute", bottom: 42, right: 48,
          fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: "0.2em", color: "#333" }}>
        v2025.1
      </motion.span>
    </section>
  );
}

function BlinkCursor() {
  const [on, setOn] = useState(true);
  useEffect(() => { const t = setInterval(() => setOn(v => !v), 530); return () => clearInterval(t); }, []);
  return <span style={{ color: "#50ff20", textShadow: "0 0 10px #50ff20", opacity: on ? 1 : 0, transition: "opacity 0.1s" }}>_</span>;
}

function ScrollLine() {
  const [w, setW] = useState(36);
  useEffect(() => { const t = setInterval(() => setW(w => w === 36 ? 56 : 36), 900); return () => clearInterval(t); }, []);
  return <div style={{ height: 1, background: "#50ff20", width: w, transition: "width 0.9s ease",
    boxShadow: "0 0 8px #50ff20" }} />;
}

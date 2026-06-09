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
      justifyContent: "center", padding: "0 48px", position: "relative",
      borderBottom: "1px solid #1e1e1e", overflow: "hidden",
    }}>
      {/* Photo */}
      <motion.div style={{
        position: "absolute", top: 0, right: 0, width: "40%", height: "100%",
        opacity: photoOpacity, y: photoY, pointerEvents: "none", zIndex: 0,
      }}>
        <img src="/photo.webp" alt="Mohamed Essam" style={{
          width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top",
          filter: "grayscale(100%) contrast(1.05)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, #000 0%, #000 8%, rgba(0,0,0,0.3) 50%, transparent 100%), linear-gradient(to top, #000 0%, transparent 20%), linear-gradient(to bottom, #000 0%, transparent 12%)",
        }} />
      </motion.div>

      {/* Name */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "62%" }}>
        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
          fontSize: "clamp(68px, 11vw, 170px)", lineHeight: 0.88,
          letterSpacing: "-0.03em", textTransform: "uppercase",
        }}>
          <span style={{ display: "block", overflow: "hidden" }}>
            {letters1.map((l, i) => (
              <motion.span key={i} initial={{ y: "110%" }} animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ display: "inline-block" }}>
                {l}
              </motion.span>
            ))}
          </span>
          <span style={{ display: "block", overflow: "hidden" }}>
            {letters2.map((l, i) => (
              <motion.span key={i} initial={{ y: "110%" }} animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 + i * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ display: "inline-block", WebkitTextStroke: "1px white", color: "transparent" }}>
                {l}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.div initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ height: 1, background: "#1e1e1e", margin: "28px 0" }} />

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase", color: "#777" }}>
            {personal.title}
          </span>
          <span style={{ fontSize: 12, letterSpacing: "0.12em", color: "#777" }}>
            Cairo, Egypt
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        style={{
          position: "absolute", bottom: 40, left: 48,
          display: "flex", alignItems: "center", gap: 14,
          fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "#555",
        }}>
        <ScrollLine />
        Scroll
      </motion.div>

      {/* Index */}
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        style={{
          position: "absolute", bottom: 42, right: 48,
          fontSize: 10, letterSpacing: "0.2em", color: "#444",
        }}>
        2025
      </motion.span>
    </section>
  );
}

function ScrollLine() {
  const [w, setW] = useState(40);
  useEffect(() => {
    const t = setInterval(() => setW(w => w === 40 ? 60 : 40), 900);
    return () => clearInterval(t);
  }, []);
  return <div style={{ height: 1, background: "#555", width: w, transition: "width 0.9s ease" }} />;
}

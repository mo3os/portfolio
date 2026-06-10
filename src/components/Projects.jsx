import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/content";
import SectionLabel from "./SectionLabel";

export default function Projects() {
  const [active, setActive] = useState(null);

  return (
    <section id="projects" style={{ padding: "100px 48px", borderBottom: "1px solid #1e1e1e" }}>
      <SectionLabel>Projects</SectionLabel>
      <div>
        {projects.map((p, i) => (
          <ProjectRow key={i} project={p} index={i} isActive={active === i} onToggle={() => setActive(active === i ? null : i)} />
        ))}
      </div>
    </section>
  );
}

function ProjectRow({ project, index, isActive, onToggle }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      data-hover
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onToggle}
      style={{
        borderTop: index === 0 ? "1px solid #1e1e1e" : "none",
        borderBottom: "1px solid #1e1e1e",
        cursor: "none",
      }}
    >
      <motion.div
        animate={{ paddingLeft: hovered ? 24 : 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ display: "grid", gridTemplateColumns: "56px 1fr auto", gap: "32px", alignItems: "center", padding: "36px 0" }}
      >
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, letterSpacing: "0.12em", color: "#afafaf" }}>
          {project.num}
        </span>
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 600 }}>{project.name}</h3>
            <span style={{ fontSize: 14, color: "#949494", letterSpacing: "0.05em" }}>{project.subtitle}</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span style={{ fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: "#2bff00" }}>{project.tag}</span>
          <motion.div
            animate={{ rotate: isActive ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ width: 14, height: 14, position: "relative" }}
          >
            <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "#555" }} />
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "#555" }} />
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ paddingLeft: 88, paddingBottom: 36, display: "flex", flexDirection: "column", gap: 16 }}>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "#b1b1b1", maxWidth: 560 }}>{project.description}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {project.tech.map((t) => (
                  <span key={t} style={{
                    fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase",
                    border: "1px solid #2bff00", padding: "4px 12px", color: "#2bff00",
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

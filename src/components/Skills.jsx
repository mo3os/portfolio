import { useState } from "react";
import { motion } from "framer-motion";
import { skills } from "../data/content";
import SectionLabel from "./SectionLabel";
import FadeIn from "./FadeIn";

export default function Skills() {
  return (
    <section id="skills" style={{ padding: "100px 48px", borderBottom: "1px solid #1e1e1e" }}>
      <SectionLabel>Technical Skills</SectionLabel>
      <FadeIn>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          gap: 2, background: "#1e1e1e", border: "1px solid #1e1e1e",
        }}>
          {skills.map((s, i) => <SkillBlock key={i} skill={s} />)}
        </div>
      </FadeIn>
      <style>{`@media(max-width:768px){ #skills .skill-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
    </section>
  );
}

function SkillBlock({ skill }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      data-hover
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{ background: hovered ? "#111" : "#000" }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ padding: "36px 32px", cursor: "none" }}
    >
      <div style={{ fontSize: 15, letterSpacing: "0.28em", textTransform: "uppercase", color: "#1eff00", marginBottom: 18 }}>
        {skill.category}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {skill.items.map((item) => (
          <div key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <motion.span animate={{ width: hovered ? 16 : 8, background: hovered ? "#fff" : "#333" }}
              transition={{ duration: 0.4 }}
              style={{ display: "inline-block", height: 1 }} />
            <span style={{ fontSize: 15, fontWeight: 500 }}>{item}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import { skills } from "../data/content";
import SectionLabel from "./SectionLabel";
import FadeIn from "./FadeIn";

// Inline SVG skill icons (simple, clean)
const ICONS = {
  Python: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <path d="M12 2C9.5 2 8 3.3 8 5v1H5C3.3 6 2 7.3 2 9v4c0 1.7 1.3 3 3 3h1v2c0 1.7 1.3 3 3 3h6c2.5 0 4-1.3 4-3v-1h3c1.7 0 3-1.3 3-3V9c0-1.7-1.3-3-3-3h-3V5c0-1.7-1.5-3-4-3h-3z" stroke="#3776AB" strokeWidth="1.5" fill="none"/>
      <circle cx="9.5" cy="5.5" r="1" fill="#FFD43B"/>
      <circle cx="14.5" cy="18.5" r="1" fill="#3776AB"/>
    </svg>
  ),
  "C++": (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <path d="M12 2L3 7v10l9 5 9-5V7L12 2z" stroke="#00599C" strokeWidth="1.5" fill="none"/>
      <text x="6" y="15" fontSize="7" fill="#00599C" fontWeight="bold">C++</text>
    </svg>
  ),
  Java: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <path d="M9 18s-2 .5-2-1.5 3-2 3-2 2.5-.5 2.5-2.5-3-2-3-2" stroke="#ED8B00" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M8 12c0-3 4-4 4-7" stroke="#ED8B00" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M7 20s5 1 8-1" stroke="#5382A1" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M6 22s6 1.5 10-1" stroke="#5382A1" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  ),
  ReactJS: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" fill="none"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(120 12 12)"/>
      <circle cx="12" cy="12" r="2" fill="#61DAFB"/>
    </svg>
  ),
  HTML: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <path d="M3 2l1.5 17L12 21l7.5-2L21 2H3z" stroke="#E34F26" strokeWidth="1.5" fill="none"/>
      <path d="M7 7h10l-.8 9L12 17l-4.2-1L7 7z" stroke="#E34F26" strokeWidth="1" fill="none"/>
    </svg>
  ),
  CSS: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <path d="M3 2l1.5 17L12 21l7.5-2L21 2H3z" stroke="#1572B6" strokeWidth="1.5" fill="none"/>
      <path d="M8 8h8M7.5 12H16l-.5 5L12 18l-3.5-1-.3-3" stroke="#1572B6" strokeWidth="1" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  JavaScript: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="2" stroke="#F7DF1E" strokeWidth="1.5" fill="none"/>
      <path d="M8 17c.5 1 1.5 1.5 2.5 1.5s2-1 2-2.5V11" stroke="#F7DF1E" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M15 11v4.5c0 1.5-.5 2-1.5 2" stroke="#F7DF1E" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  ),
  "Node.js": (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <path d="M12 2L3 7v10l9 5 9-5V7L12 2z" stroke="#339933" strokeWidth="1.5" fill="none"/>
      <path d="M12 8v8M9 10l3-2 3 2" stroke="#339933" strokeWidth="1" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  Firebase: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <path d="M4 20L8 4l4 8 2-5 6 13H4z" stroke="#FFCA28" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
    </svg>
  ),
  SQL: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <ellipse cx="12" cy="7" rx="8" ry="3" stroke="#00758F" strokeWidth="1.5" fill="none"/>
      <path d="M4 7v5c0 1.66 3.58 3 8 3s8-1.34 8-3V7" stroke="#00758F" strokeWidth="1.5" fill="none"/>
      <path d="M4 12v5c0 1.66 3.58 3 8 3s8-1.34 8-3v-5" stroke="#00758F" strokeWidth="1.5" fill="none"/>
    </svg>
  ),
  PHP: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <ellipse cx="12" cy="12" rx="10" ry="6" stroke="#8892BF" strokeWidth="1.5" fill="none"/>
      <path d="M8 10v4M8 12h3c1 0 1.5-.5 1.5-1s-.5-1-1.5-1H8M14 10l-1 4M14 10h2c1 0 1.5.5 1.5 1s-.5 1-1.5 1h-2l-.5 2" stroke="#8892BF" strokeWidth="1" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  Flutter: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <path d="M14 2L3 13l3 3 11-11-3-3z" stroke="#54C5F8" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
      <path d="M7 16l4 4h6l-7-7-3 3z" stroke="#01579B" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
    </svg>
  ),
  "Machine Learning": (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <circle cx="12" cy="12" r="3" stroke="#FF6B6B" strokeWidth="1.5" fill="none"/>
      <circle cx="5" cy="5" r="2" stroke="#FF6B6B" strokeWidth="1" fill="none"/>
      <circle cx="19" cy="5" r="2" stroke="#FF6B6B" strokeWidth="1" fill="none"/>
      <circle cx="5" cy="19" r="2" stroke="#FF6B6B" strokeWidth="1" fill="none"/>
      <circle cx="19" cy="19" r="2" stroke="#FF6B6B" strokeWidth="1" fill="none"/>
      <path d="M7 7l3.5 3.5M16.5 7L13 10.5M7 17l3.5-3.5M16.5 17L13 13.5" stroke="#FF6B6B" strokeWidth="1" fill="none"/>
    </svg>
  ),
  "Data Visualization": (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <path d="M3 20h18M5 20V12M9 20V8M13 20V14M17 20V5" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  ),
  "Google Maps API": (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#EA4335" strokeWidth="1.5" fill="none"/>
      <circle cx="12" cy="9" r="2.5" stroke="#EA4335" strokeWidth="1" fill="none"/>
    </svg>
  ),
};

const DEFAULT_ICON = (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="3" stroke="#39ff14" strokeWidth="1.5" fill="none"/>
    <path d="M8 12h8M12 8v8" stroke="#39ff14" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export default function Skills() {
  return (
    <section id="skills" style={{ padding: "100px 48px" }}>
      <SectionLabel>Technical Skills</SectionLabel>
      <FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "#111", border: "1px solid #1a1a1a" }}>
          {skills.map((s, i) => <SkillBlock key={i} skill={s} />)}
        </div>
      </FadeIn>
      <style>{`@media(max-width:768px){ #skills > div > div { grid-template-columns: 1fr 1fr !important; } }`}</style>
    </section>
  );
}

function SkillBlock({ skill }) {
  const [hovered, setHovered] = useState(false);
  const colors = ["#39ff14", "#00e5ff", "#b026ff", "#ff6b6b", "#FFD43B", "#61DAFB"];
  const color = colors[skill.category.length % colors.length];

  return (
    <motion.div data-hover
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      animate={{ background: hovered ? "#0a0a0a" : "#030303" }}
      transition={{ duration: 0.4 }}
      style={{
        padding: "32px 28px", cursor: "none", position: "relative", overflow: "hidden",
        borderBottom: hovered ? `1px solid ${color}` : "1px solid transparent",
        transition: "border-color 0.4s ease",
        boxShadow: hovered ? `0 0 20px rgba(57,255,20,0.05), inset 0 0 20px rgba(57,255,20,0.02)` : "none",
      }}>
      {/* corner accent */}
      {hovered && <div style={{ position:"absolute", top:0, left:0, width:30, height:1, background: color, boxShadow:`0 0 8px ${color}` }}/>}
      {hovered && <div style={{ position:"absolute", top:0, left:0, width:1, height:30, background: color, boxShadow:`0 0 8px ${color}` }}/>}

      <div style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: 16,
        color: hovered ? color : "#444",
        textShadow: hovered ? `0 0 8px ${color}` : "none",
        transition: "color 0.4s, text-shadow 0.4s",
        fontFamily: "'Share Tech Mono', monospace",
      }}>{skill.category}</div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {skill.items.map((item) => (
          <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ flexShrink: 0, opacity: hovered ? 1 : 0.5, transition: "opacity 0.4s" }}>
              {ICONS[item] || DEFAULT_ICON}
            </span>
            <motion.span animate={{ width: hovered ? 14 : 6, background: hovered ? color : "#333" }}
              transition={{ duration: 0.4 }}
              style={{ display: "inline-block", height: 1 }} />
            <span style={{ fontSize: 14, fontWeight: 400, color: hovered ? "#fff" : "#aaa", transition: "color 0.4s" }}>{item}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

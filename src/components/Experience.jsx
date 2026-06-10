import { useState } from "react";
import { experience, education, certificates } from "../data/content";
import SectionLabel from "./SectionLabel";
import FadeIn from "./FadeIn";

export default function Experience() {
  return (
    <>
      <section id="experience" style={{ padding: "100px 48px" }}>
        <SectionLabel>Work Experience</SectionLabel>
        <div style={{ borderTop: "1px solid #111" }}>
          {experience.map((e, i) => <FadeIn key={i} delay={i * 0.08}><TimelineRow period={e.period} title={e.role} sub={e.company} desc={e.description} /></FadeIn>)}
        </div>
      </section>
      <section id="education" style={{ padding: "100px 48px" }}>
        <SectionLabel>Education</SectionLabel>
        <div style={{ borderTop: "1px solid #111" }}>
          {education.map((e, i) => <FadeIn key={i} delay={i * 0.08}><TimelineRow period={e.period} title={e.degree} sub={e.school} badge={e.gpa} /></FadeIn>)}
        </div>
      </section>
      <section id="certificates" style={{ padding: "100px 48px" }}>
        <SectionLabel>Certificates</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "#111", border: "1px solid #111" }}>
          {certificates.map((c, i) => <FadeIn key={i} delay={i * 0.08}><CertCard cert={c} /></FadeIn>)}
        </div>
        <style>{`@media(max-width:768px){ #certificates > div { grid-template-columns: 1fr !important; } }`}</style>
      </section>
    </>
  );
}

function TimelineRow({ period, title, sub, desc, badge }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 48, padding: "40px 0", borderBottom: "1px solid #111" }}>
      <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 12, letterSpacing: "0.1em", color: "#555", paddingTop: 4 }}>{period}</span>
      <div>
        <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 21, fontWeight: 600, marginBottom: 6 }}>{title}</h3>
        <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 12, color: "#555", marginBottom: 12 }}>{sub}</p>
        {badge && <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 12, letterSpacing: "0.1em", color: "#39ff14", border: "1px solid #39ff14", padding: "3px 12px", display: "inline-block", textShadow: "0 0 6px #39ff14", boxShadow: "0 0 8px rgba(57,255,20,0.15)" }}>GPA: {badge}</span>}
        {desc && <p style={{ fontSize: 14, lineHeight: 1.7, color: "#666", marginTop: 8 }}>{desc}</p>}
      </div>
      <style>{`@media(max-width:768px){ div[style*="200px 1fr"] { grid-template-columns: 1fr !important; gap: 12px !important; } }`}</style>
    </div>
  );
}

function CertCard({ cert }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div data-hover onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#0a0a0a" : "#030303", padding: "36px 32px",
        transition: "background 0.4s ease", cursor: "none",
        borderBottom: hovered ? "1px solid #39ff14" : "1px solid transparent",
        boxShadow: hovered ? "0 0 16px rgba(57,255,20,0.1)" : "none",
      }}>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 700, marginBottom: 10, lineHeight: 1.3, color: hovered ? "#fff" : "#ccc", transition: "color 0.3s" }}>{cert.name}</div>
      <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: "#555" }}>{cert.issuer}</div>
      {cert.hours && <div style={{ marginTop: 16, fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: hovered ? "#39ff14" : "#444", textShadow: hovered ? "0 0 6px #39ff14" : "none", transition: "all 0.4s" }}>{cert.hours}</div>}
    </div>
  );
}

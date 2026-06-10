import { experience, education, certificates } from "../data/content";
import SectionLabel from "./SectionLabel";
import FadeIn from "./FadeIn";

export default function Experience() {
  return (
    <>
      <section id="experience" style={{ padding: "100px 48px", borderBottom: "1px solid #1e1e1e" }}>
        <SectionLabel>Work Experience</SectionLabel>
        {experience.map((e, i) => (
          <FadeIn key={i} delay={i * 0.08}>
            <TimelineRow period={e.period} title={e.role} sub={e.company} desc={e.description} first={i === 0} />
          </FadeIn>
        ))}
      </section>

      <section id="education" style={{ padding: "100px 48px", borderBottom: "1px solid #1e1e1e" }}>
        <SectionLabel>Education</SectionLabel>
        {education.map((e, i) => (
          <FadeIn key={i} delay={i * 0.08}>
            <TimelineRow period={e.period} title={e.degree} sub={e.school} badge={e.gpa} first={i === 0} />
          </FadeIn>
        ))}
      </section>

      <section id="certificates" style={{ padding: "100px 48px" }}>
        <SectionLabel>Certificates</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "#1e1e1e", border: "1px solid #1e1e1e" }}>
          {certificates.map((c, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <CertCard cert={c} />
            </FadeIn>
          ))}
        </div>
        <style>{`@media(max-width:768px){ #certificates > div { grid-template-columns: 1fr !important; } }`}</style>
      </section>
    </>
  );
}

function TimelineRow({ period, title, sub, desc, badge, first }) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "200px 1fr", gap: 48,
      padding: "40px 0",
    }}>
      <span style={{ fontSize: 14, letterSpacing: "0.1em", color: "#c9c9c9", paddingTop: 4 }}>{period}</span>
      <div>
        <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 600, marginBottom: 6 }}>{title}</h3>
        <p style={{ fontSize: 14, color: "#7e7c7c", marginBottom: 12 }}>{sub}</p>
        {badge && (
          <span style={{ fontSize: 14, letterSpacing: "0.1em", color: "#48ff00", border: "1px solid #51ff00", padding: "3px 12px", display: "inline-block" }}>
            GPA: {badge}
          </span>
        )}
        {desc && <p style={{ fontSize: 14, lineHeight: 1.7, color: "#666" }}>{desc}</p>}
      </div>
      <style>{`@media(max-width:768px){ div[style*="200px 1fr"] { grid-template-columns: 1fr !important; gap: 12px !important; } }`}</style>
    </div>
  );
}

function CertCard({ cert }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      data-hover
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#0f0f0f" : "#000",
        padding: "36px 32px",
        transition: "background 0.4s ease",
        cursor: "none",
      }}
    >
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 700, marginBottom: 10, lineHeight: 1.3 }}>
        {cert.name}
      </div>
      <div style={{ fontSize: 14, color: "#8b8b8b" }}>{cert.issuer}</div>
      {cert.hours && <div style={{ marginTop: 16, fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "#51ff00" }}>{cert.hours}</div>}
    </div>
  );
}

import { useState } from "react";

import { personal } from "../data/content";
import SectionLabel from "./SectionLabel";
import FadeIn from "./FadeIn";

export default function About() {
  return (
    <section id="about" style={{ padding: "100px 48px" }}>
      <SectionLabel>About</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px" }}>
        <FadeIn>
          <p style={{ fontSize: 20, lineHeight: 1.8, fontWeight: 300, color: "#ccc" }}>
            Software Engineer with a <strong style={{ color: "white", fontWeight: 600 }}>Bachelor's in Software Engineering</strong>{" "}
            and currently pursuing a <strong style={{ color: "white", fontWeight: 600 }}>Master's in Computer Science</strong>{" "}
            at Arab Academy for Science and Technology. Experienced in frontend development and data technologies.
            Certified in <strong style={{ color: "#39ff14", fontWeight: 600, textShadow: "0 0 8px #39ff14" }}>Ethical Hacking</strong> and{" "}
            <strong style={{ color: "#39ff14", fontWeight: 600, textShadow: "0 0 8px #39ff14" }}>CCNA</strong>.
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div>
            {[
              ["Location", "Cairo, Egypt"],
              ["Email", personal.email],
              ["Phone", personal.phone],
              ["Languages", "Arabic (Native) · English (Fluent)"],
              ["Status", "Open to Work"],
            ].map(([label, val]) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", gap: 8, padding: "18px 0", borderBottom: "1px solid #111" }}>
                <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "#39ff14", textShadow: "0 0 6px #39ff14" }}>{label}</span>
                <span style={{ fontSize: 15, fontWeight: 400 }}>{val}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
      <style>{`@media(max-width:768px){ #about > div { grid-template-columns: 1fr !important; gap: 48px !important; } }`}</style>
      
    </section>
  );
}

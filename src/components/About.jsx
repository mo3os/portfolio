import { personal } from "../data/content";
import SectionLabel from "./SectionLabel";
import FadeIn from "./FadeIn";

export default function About() {
  return (
    <section id="about" style={{ padding: "100px 48px", borderBottom: "1px solid #1e1e1e" }}>
      <SectionLabel>About</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px" }}>
        <FadeIn>
          <p style={{ fontSize: 20, lineHeight: 1.7, fontWeight: 300, color: "#ccc" }}>
            Software Engineer with a <strong style={{ color: "white", fontWeight: 600 }}>Bachelor's in Software Engineering</strong>{" "}
            and currently pursuing a <strong style={{ color: "white", fontWeight: 600 }}>Master's in Computer Science</strong>{" "}
            at Arab Academy for Science and Technology. Experienced in frontend web development and data technologies.
            Certified in <strong style={{ color: "white", fontWeight: 600 }}>Ethical Hacking</strong> and{" "}
            <strong style={{ color: "white", fontWeight: 600 }}>Cisco Networking (CCNA)</strong>.
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              ["Location", "Cairo, Egypt"],
              ["Email", personal.email],
              ["Phone", personal.phone],
              ["Languages", "Arabic (Native) · English (Fluent)"],
              ["Status", "Open to Opportunities"],
            ].map(([label, val]) => (
              <div key={label} style={{
                display: "flex", flexDirection: "column", gap: 5,
                padding: "20px 0", borderBottom: "1px solid #1e1e1e",
              }}>
                <span style={{ fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "#555" }}>{label}</span>
                <span style={{ fontSize: 14, fontWeight: 400 }}>{val}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      <style>{`@media(max-width:768px){ #about > div { grid-template-columns: 1fr !important; gap: 48px !important; } }`}</style>
    </section>
  );
}

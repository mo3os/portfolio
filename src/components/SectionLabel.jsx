import { motion } from "framer-motion";

export default function SectionLabel({ children }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 14,
      marginBottom: 64, fontFamily: "'Share Tech Mono', monospace",
      fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase",
    }}>
      <span style={{ color: "#39ff14", textShadow: "0 0 8px #39ff14" }}>[ </span>
      <span style={{ color: "#d4d4d4", fontWeight: 600 }}>{children}</span>
      <span style={{ color: "#39ff14", textShadow: "0 0 8px #39ff14" }}> ]</span>
      <motion.div
        initial={{ scaleX: 0, originX: 0 }} whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ flex: 1, height: 1, background: "linear-gradient(to right, #39ff1422, transparent)" }}
      />
    </div>
  );
}

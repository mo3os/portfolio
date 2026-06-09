import { motion } from "framer-motion";

export default function SectionLabel({ children }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 16,
      marginBottom: 64, fontSize: 10, letterSpacing: "0.3em",
      textTransform: "uppercase", color: "#666",
    }}>
      {children}
      <motion.div
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ flex: 1, height: 1, background: "#1e1e1e" }}
      />
    </div>
  );
}

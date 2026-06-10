import { useState } from "react";
import { motion } from "framer-motion";
import { personal } from "../data/content";
import SectionLabel from "./SectionLabel";
import FadeIn from "./FadeIn";

const links = [
  { label: personal.email, href: `mailto:${personal.email}`, icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { label: "LinkedIn", href: personal.linkedin, icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" },
  { label: "GitHub", href: personal.github, icon: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" },
  { label: personal.phone, href: `tel:${personal.phone}`, icon: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.22 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.06 6.06l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" },
  { label: personal.phone2, href: `tel:${personal.phone2}`, icon: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.22 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.06 6.06l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" },
];

export default function Contact() {
  return (
    <section id="contact" style={{ padding: "100px 48px 80px", minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <SectionLabel>Contact</SectionLabel>
      <FadeIn>
        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "clamp(40px, 6vw, 96px)",
          fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 56,
        }}>
          Let's work<br />
          <span style={{ WebkitTextStroke: "1px #39ff14", color: "transparent",
            textShadow: "0 0 20px rgba(57,255,20,0.3), 0 0 40px rgba(57,255,20,0.15)" }}>together.</span>
        </h2>
      </FadeIn>
      <FadeIn delay={0.1}>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {links.map((l) => <ContactLink key={l.label} link={l} />)}
        </div>
      </FadeIn>
    </section>
  );
}

function ContactLink({ link }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer" data-hover
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      animate={{ background: hovered ? "#39ff14" : "#030303", color: hovered ? "#000" : "#fff" }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        display: "flex", alignItems: "center", gap: 12, padding: "18px 28px",
        border: "1px solid", borderColor: hovered ? "#39ff14" : "#1a1a1a",
        marginRight: -1, marginBottom: -1,
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase",
        cursor: "none",
        boxShadow: hovered ? "0 0 16px rgba(57,255,20,0.4)" : "none",
        transition: "border-color 0.35s, box-shadow 0.35s",
      }}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d={link.icon} />
      </svg>
      {link.label}
    </motion.a>
  );
}

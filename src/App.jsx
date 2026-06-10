import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Movies from "./components/Movies";
import Contact from "./components/Contact";
import RetroBackground from "./components/RetroBackground";

export default function App() {
  return (
    <>
      <RetroBackground />
      <Cursor />
      <Navbar />
      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Movies />
        <Contact />
      </main>
      <footer style={{
        padding: "28px 48px", borderTop: "1px solid #111",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        position: "relative", zIndex: 1,
      }}>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#333" }}>
          © 2026 Mohamed Essam
        </span>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#333" }}>
          Software Engineer — Cairo, Egypt
        </span>
      </footer>
    </>
  );
}

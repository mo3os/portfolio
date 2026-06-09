import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";

export default function App() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <footer style={{
        padding: "28px 48px",
        borderTop: "1px solid #1e1e1e",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#444" }}>
          © 2025 Mohamed Essam
        </span>
        <span style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#444" }}>
          Software Engineer — Cairo, Egypt
        </span>
      </footer>
    </>
  );
}

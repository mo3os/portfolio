import { useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";
import FadeIn from "./FadeIn";

// Add your favourite movies here — just fill in the img src
const MOVIES = [
  { title: "Ready Player One", year: "2018", genre: "Sci-Fi", img: "rp1.jpg"},
  { title: "Avengers Endgame", year: "2019", genre: "Action + Sci-Fi", img: "avgend.jpg" },
  { title: "The Shawshank Redemption", year: "1994", genre: "Drama", img: "shaw.jpg" },
  { title: "Gran Turismo", year: "2023", genre: "Sport", img: "grantu.jpg" },
  { title: "The Pursuit of Happyness", year: "2006", genre: "Drama", img: "purs.jpg" },
];



export default function Movies() {
  const trackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
  };
  const onMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - trackRef.current.offsetLeft;
    trackRef.current.scrollLeft = scrollLeft - (x - startX);
  };
  const onMouseUp = () => setIsDragging(false);

  return (
    
    <section id="movies" style={{ padding: "100px 0 100px 48px", overflow: "hidden" }}>
              <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "clamp(40px, 6vw, 96px)",
          fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 56,
        }}>
          Entertainment<br />
          <span style={{ WebkitTextStroke: "1px #ffc814", color: "transparent",
            textShadow: "0 0 20px rgba(255, 173, 20, 0.3), 0 0 40px rgba(255, 181, 20, 0.15)" }}>Area.</span>
        </h2>

      <div style={{ paddingRight: 48 }}>
        <SectionLabel>Favourite Movies</SectionLabel>
      </div>
      <FadeIn>
        <div
          ref={trackRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          style={{
            display: "flex", gap: 20, overflowX: "auto", paddingRight: 48, paddingBottom: 16,
            cursor: isDragging ? "grabbing" : "none",
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch",
          }}
          className="movies-track"
        >
          {MOVIES.map((m, i) => <MovieCard key={i} movie={m} index={i} />)}
        </div>
      </FadeIn>

      <style>{`
        .movies-track::-webkit-scrollbar { height: 3px; }
        .movies-track::-webkit-scrollbar-track { background: #0a0a0a; }
        .movies-track::-webkit-scrollbar-thumb {
          background: #ffbb00;
          box-shadow: 0 0 6px #ffd000;
          border-radius: 2px;
        }
      `}</style>
    </section>
  );
}

function MovieCard({ movie, index }) {
  const [hovered, setHovered] = useState(false);
  const hasImg = !!movie.img;

  return (
    <motion.div
      data-hover
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0, width: 200, height: 300, position: "relative",
        cursor: "none", overflow: "hidden",
        border: hovered ? "1px solid #ffc814" : "1px solid #1a1a1a",
        boxShadow: hovered
          ? "0 0 18px #ffc814, 0 0 40px rgba(255, 187, 0, 0.25), inset 0 0 20px rgba(255, 231, 20, 0.04)"
          : "none",
        transition: "border-color 0.4s ease, box-shadow 0.4s ease",
        background: "#0a0a0a",
      }}
    >
      {/* Poster */}
      {hasImg ? (
        <img src={movie.img} alt={movie.title} style={{
          width: "100%", height: "100%", objectFit: "cover",
          filter: hovered ? "grayscale(0%) brightness(0.6)" : "grayscale(60%) brightness(0.4)",
          transition: "filter 0.5s ease",
        }} />
      ) : (
        <div style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 8,
          background: "linear-gradient(135deg, #0a0a0a 0%, #111 100%)",
        }}>
          {/* Film reel placeholder */}
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="20" stroke={hovered ? "#39ff14" : "#333"} strokeWidth="1.5"
              style={{ filter: hovered ? "drop-shadow(0 0 6px #39ff14)" : "none", transition: "all 0.4s" }} />
            <circle cx="24" cy="24" r="6" stroke={hovered ? "#39ff14" : "#333"} strokeWidth="1.5"
              style={{ filter: hovered ? "drop-shadow(0 0 4px #39ff14)" : "none", transition: "all 0.4s" }} />
            {[0,60,120,180,240,300].map(a => {
              const rad = a * Math.PI / 180;
              const x1 = 24 + 9 * Math.cos(rad), y1 = 24 + 9 * Math.sin(rad);
              const x2 = 24 + 17 * Math.cos(rad), y2 = 24 + 17 * Math.sin(rad);
              return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke={hovered ? "#39ff14" : "#333"} strokeWidth="1.5"
                style={{ filter: hovered ? "drop-shadow(0 0 3px #39ff14)" : "none", transition: "all 0.4s" }} />;
            })}
          </svg>
          <span style={{
            fontFamily: "'Share Tech Mono', monospace", fontSize: 10,
            letterSpacing: "0.15em", color: hovered ? "#39ff14" : "#333",
            textShadow: hovered ? "0 0 8px #39ff14" : "none",
            transition: "all 0.4s", textTransform: "uppercase",
          }}>Add poster</span>
        </div>
      )}

      {/* Overlay info */}
      <div style={{
        position: "absolute", inset: 0,
        background: hovered
          ? "linear-gradient(to top, rgba(0,0,0,0.95) 40%, rgba(0,0,0,0.2) 100%)"
          : "linear-gradient(to top, rgba(0,0,0,0.8) 30%, transparent 100%)",
        transition: "background 0.4s ease",
        display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "16px 14px",
      }}>
        {/* Neon corner brackets */}
        {hovered && <>
          <div style={{ position:"absolute", top:8, left:8, width:16, height:1, background:"#ffc814", boxShadow:"0 0 6px #ffc814" }}/>
          <div style={{ position:"absolute", top:8, left:8, width:1, height:16, background:"#ffc814", boxShadow:"0 0 6px #ffc814" }}/>
          <div style={{ position:"absolute", top:8, right:8, width:16, height:1, background:"#ffc814", boxShadow:"0 0 6px #ffc814" }}/>
          <div style={{ position:"absolute", top:8, right:8, width:1, height:16, background:"#ffc814", boxShadow:"0 0 6px #ffc814" }}/>
          <div style={{ position:"absolute", bottom:8, left:8, width:16, height:1, background:"#ffc814", boxShadow:"0 0 6px #ffc814" }}/>
          <div style={{ position:"absolute", bottom:8, left:8, width:1, height:16, background:"#ffc814", boxShadow:"0 0 6px #ffc814" }}/>
          <div style={{ position:"absolute", bottom:8, right:8, width:16, height:1, background:"#ffc814", boxShadow:"0 0 6px #ffc814" }}/>
          <div style={{ position:"absolute", bottom:8, right:8, width:1, height:16, background:"#ffc814", boxShadow:"0 0 6px #ffc814" }}/>
        </>}

        <span style={{
          fontFamily: "'Share Tech Mono', monospace", fontSize: 9, letterSpacing: "0.2em",
          color: hovered ? "#ffc814" : "#555", textTransform: "uppercase", marginBottom: 4,
          textShadow: hovered ? "0 0 6px #ffc814" : "none", transition: "all 0.4s",
        }}>{movie.genre} · {movie.year}</span>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600,
          color: hovered ? "#fff" : "#ccc", transition: "color 0.4s",
          textShadow: hovered ? "0 0 10px rgba(255,255,255,0.4)" : "none",
        }}>{movie.title}</span>
      </div>
    </motion.div>
  );
}

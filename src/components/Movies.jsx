import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionLabel from "./SectionLabel";
import FadeIn from "./FadeIn";

const MOVIES = [
  { title: "Ready Player One", year: "2018", genre: "Sci-Fi", img: "/rp1.jpg" },
  { title: "Avengers Endgame", year: "2019", genre: "Action + Sci-Fi", img: "/avgend.jpg" },
  { title: "The Shawshank Redemption", year: "1994", genre: "Drama", img: "/shaw.jpg" },
  { title: "Gran Turismo", year: "2023", genre: "Sport", img: "/grantu.jpg" },
  { title: "The Pursuit of Happyness", year: "2006", genre: "Drama", img: "/purs.jpg" },
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
      {/* Entertainment Area heading */}
      <h2 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: "clamp(40px, 6vw, 96px)",
        fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 56,
      }}>
        Entertainment<br />
        <span style={{
          WebkitTextStroke: "1px #ffc814", color: "transparent",
          textShadow: "0 0 20px rgba(255, 173, 20, 0.35), 0 0 45px rgba(255, 181, 20, 0.18)",
        }}>Area.</span>
      </h2>

      {/* "Let's Watch" neon label */}
      <div style={{ paddingRight: 48, marginBottom: 8 }}>
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 18,
          }}
        >
          <span style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "clamp(20px, 2.8vw, 32px)",
            fontWeight: 700,
            color: "#ffc814",
            textShadow: "0 0 10px #ffc814, 0 0 25px #ffc814, 0 0 55px rgba(255,180,0,0.5), 0 0 90px rgba(255,140,0,0.25)",
            letterSpacing: "0.08em",
          }}>
            &gt; Let's Watch
          </span>
          <NeonPulse />
        </motion.div>
      </div>

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

      {/* Mini-Game Section */}
      <div style={{ paddingRight: 48, marginTop: 80 }}>

        {/* Header: joystick icon + Let's Play */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ display: "inline-flex", alignItems: "center", gap: 16, marginBottom: 8 }}
        >
          <JoystickIcon />
          <span style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "clamp(20px, 2.8vw, 32px)",
            fontWeight: 700,
            color: "#ffc814",
            textShadow: "0 0 10px #ffc814, 0 0 25px #ffc814, 0 0 55px rgba(255,180,0,0.5), 0 0 90px rgba(255,140,0,0.25)",
            letterSpacing: "0.08em",
          }}>
            &gt; Let's Play
          </span>
          <NeonPulse gold />
        </motion.div>

        {/* Gaming stats row */}
        <FadeIn>
          <GamingStatsBar />
        </FadeIn>

        {/* Favourite games shelf */}
        <FadeIn>
          <FavGames />
        </FadeIn>

        {/* Snake game */}
        <div style={{ marginTop: 48 }}>
          <div style={{ marginBottom: 12 }}>
            <SectionLabel>Snake Game — Arrow keys or WASD</SectionLabel>
          </div>
          <FadeIn>
            <SnakeGame />
          </FadeIn>
        </div>
      </div>

      <style>{`
        .movies-track::-webkit-scrollbar { height: 3px; }
        .movies-track::-webkit-scrollbar-track { background: #0a0a0a; }
        .movies-track::-webkit-scrollbar-thumb {
          background: #ffbb00;
          box-shadow: 0 0 8px #ffd000;
          border-radius: 2px;
        }
      `}</style>
    </section>
  );
}

function NeonPulse({ gold }) {
  const [on, setOn] = useState(true);
  useEffect(() => { const t = setInterval(() => setOn(v => !v), 700); return () => clearInterval(t); }, []);
  const c = gold ? "#ffc814" : "#50ff20";
  return (
    <span style={{
      display: "inline-block", width: 8, height: 8, borderRadius: "50%",
      background: c, opacity: on ? 1 : 0.2,
      boxShadow: `0 0 6px ${c}, 0 0 14px ${c}`,
      transition: "opacity 0.3s",
    }} />
  );
}

function MovieCard({ movie, index }) {
  const [hovered, setHovered] = useState(false);
  const hasImg = !!movie.img;
  return (
    <motion.div
      data-hover
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.06 }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0, width: 200, height: 300, position: "relative",
        cursor: "none", overflow: "hidden",
        border: hovered ? "1px solid #ffc814" : "1px solid #1a1a1a",
        boxShadow: hovered
          ? "0 0 18px #ffc814, 0 0 40px rgba(255,187,0,0.25), inset 0 0 20px rgba(255,231,20,0.04)"
          : "none",
        transition: "border-color 0.4s ease, box-shadow 0.4s ease",
        background: "#0a0a0a",
      }}
    >
      {hasImg ? (
        <img src={movie.img} alt={movie.title} style={{
          width: "100%", height: "100%", objectFit: "cover",
          filter: hovered ? "grayscale(0%) brightness(0.65)" : "grayscale(55%) brightness(0.35)",
          transition: "filter 0.5s ease",
        }} />
      ) : (
        <div style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 8,
          background: "linear-gradient(135deg, #0a0a0a 0%, #111 100%)",
        }}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="20" stroke={hovered ? "#50ff20" : "#333"} strokeWidth="1.5"
              style={{ filter: hovered ? "drop-shadow(0 0 6px #50ff20)" : "none", transition: "all 0.4s" }} />
            <circle cx="24" cy="24" r="6" stroke={hovered ? "#50ff20" : "#333"} strokeWidth="1.5"
              style={{ filter: hovered ? "drop-shadow(0 0 4px #50ff20)" : "none", transition: "all 0.4s" }} />
            {[0,60,120,180,240,300].map(a => {
              const rad = a * Math.PI / 180;
              return <line key={a}
                x1={24 + 9 * Math.cos(rad)} y1={24 + 9 * Math.sin(rad)}
                x2={24 + 17 * Math.cos(rad)} y2={24 + 17 * Math.sin(rad)}
                stroke={hovered ? "#50ff20" : "#333"} strokeWidth="1.5"
                style={{ filter: hovered ? "drop-shadow(0 0 3px #50ff20)" : "none", transition: "all 0.4s" }} />;
            })}
          </svg>
          <span style={{
            fontFamily: "'Share Tech Mono', monospace", fontSize: 10,
            letterSpacing: "0.15em", color: hovered ? "#50ff20" : "#333",
            textShadow: hovered ? "0 0 8px #50ff20" : "none",
            transition: "all 0.4s", textTransform: "uppercase",
          }}>Add poster</span>
        </div>
      )}
      <div style={{
        position: "absolute", inset: 0,
        background: hovered
          ? "linear-gradient(to top, rgba(0,0,0,0.95) 40%, rgba(0,0,0,0.2) 100%)"
          : "linear-gradient(to top, rgba(0,0,0,0.8) 30%, transparent 100%)",
        transition: "background 0.4s ease",
        display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "16px 14px",
      }}>
        {hovered && <>
          {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h]) => (
            <div key={v+h}>
              <div style={{ position:"absolute", [v]:8, [h]:8, width:16, height:1, background:"#ffc814", boxShadow:"0 0 8px #ffc814" }}/>
              <div style={{ position:"absolute", [v]:8, [h]:8, width:1, height:16, background:"#ffc814", boxShadow:"0 0 8px #ffc814" }}/>
            </div>
          ))}
        </>}
        <span style={{
          fontFamily: "'Share Tech Mono', monospace", fontSize: 9, letterSpacing: "0.2em",
          color: hovered ? "#ffc814" : "#555", textTransform: "uppercase", marginBottom: 4,
          textShadow: hovered ? "0 0 8px #ffc814" : "none", transition: "all 0.4s",
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

// ─── Neon Joystick SVG Icon ──────────────────────────────────────────────────
function JoystickIcon() {
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setT(v => v + 1), 60);
    return () => clearInterval(id);
  }, []);
  // Animate the stick tip in a small circle
  const angle = (t * 0.08) % (Math.PI * 2);
  const stickX = 20 + Math.cos(angle) * 4;
  const stickY = 14 + Math.sin(angle) * 4;

  return (
    <svg width="44" height="52" viewBox="0 0 40 52" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 0 8px #ffc814) drop-shadow(0 0 18px rgba(255,200,20,0.4))" }}>
      {/* Base plate */}
      <ellipse cx="20" cy="43" rx="15" ry="6" stroke="#ffc814" strokeWidth="1.4" fill="rgba(255,200,20,0.04)" />
      {/* Stick shaft */}
      <line x1="20" y1="43" x2={stickX} y2={stickY} stroke="#ffc814" strokeWidth="2.2" strokeLinecap="round" />
      {/* Ball top */}
      <circle cx={stickX} cy={stickY} r="5" fill="rgba(255,200,20,0.12)" stroke="#ffc814" strokeWidth="1.5" />
      {/* Shine on ball */}
      <circle cx={stickX - 1.5} cy={stickY - 1.5} r="1.4" fill="#ffc814" opacity="0.7" />
      {/* Base buttons */}
      <circle cx="10" cy="44" r="2.2" fill="rgba(255,200,20,0.15)" stroke="#ffc814" strokeWidth="1" />
      <circle cx="30" cy="44" r="2.2" fill="rgba(80,255,32,0.15)" stroke="#50ff20" strokeWidth="1"
        style={{ filter: "drop-shadow(0 0 4px #50ff20)" }} />
      {/* Base shadow ring */}
      <ellipse cx="20" cy="43" rx="15" ry="6" stroke="rgba(255,200,20,0.15)" strokeWidth="4" fill="none" />
    </svg>
  );
}

// ─── Gaming stats bar ────────────────────────────────────────────────────────
const GAMING_STATS = [
  { label: "GAMES PLAYED", value: "150+", icon: "🎮" },
];

function GamingStatsBar() {
  return (
    <div style={{
      display: "flex", gap: 0, marginTop: 24, marginBottom: 40,
      borderTop: "1px solid #ffc25260", borderBottom: "1px solid #1a1a1a",
      overflowX: "auto",
    }}>
      {GAMING_STATS.map((s, i) => (
        <StatCell key={i} stat={s} last={i === GAMING_STATS.length - 1} />
      ))}
      <style>{`.stats-scroll::-webkit-scrollbar{display:none}`}</style>
    </div>
  );
}

function StatCell({ stat, last }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: "1 0 140px", padding: "20px 24px",
        borderRight: last ? "none" : "1px solid #1a1a1a",
        display: "flex", flexDirection: "column", gap: 6,
        background: hovered ? "rgba(255,200,20,0.03)" : "transparent",
        transition: "background 0.3s",
        cursor: "default",
      }}
    >
      <span style={{ fontSize: 18 }}>{stat.icon}</span>
      <span style={{
        fontFamily: "'Share Tech Mono', monospace", fontSize: 17, fontWeight: 700,
        color: hovered ? "#ffc814" : "#ddd",
        textShadow: hovered ? "0 0 10px #ffc814" : "none",
        transition: "all 0.3s", letterSpacing: "0.05em",
      }}>{stat.value}</span>
      <span style={{
        fontFamily: "'Share Tech Mono', monospace", fontSize: 10,
        letterSpacing: "0.2em", color: "#e0e0e0", textTransform: "uppercase",
      }}>{stat.label}</span>
    </div>
  );
}

// ─── Favourite games shelf ───────────────────────────────────────────────────
const FAV_GAMES = [
  { title: "At Dead Of Night", genre: "Horror", year: "2020", rating: 10, color: "#ffc814"},
  { title: "GTA V", genre: "Open World", year: "2013", rating: 10, color: "#50ff20"},
  { title: "The Last Of US", genre: "Adventure", year: "2013", rating: 9, color: "#0059ff"},
  { title: "Valorant", genre: "Tactical FPS", year: "2020", rating: 9, color: "#ff4466"},
  { title: "Call Of Duty", genre: "Action", year: "2018", rating: 10, color: "#ffdcae"},
];

function FavGames() {
  const [hovered, setHovered] = useState(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <span style={{
        fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: "0.22em",
        color: "#ffc814", textShadow: "0 0 8px #ffc814", textTransform: "uppercase",
      }}>&gt; Favourite Games</span>

      <div style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 8 }}
        className="games-scroll">
        {FAV_GAMES.map((g, i) => (
          <GameCard key={i} game={g} index={i}
            isHovered={hovered === i}
            onEnter={() => setHovered(i)}
            onLeave={() => setHovered(null)} />
        ))}
      </div>

      <style>{`
        .games-scroll::-webkit-scrollbar { height: 3px; }
        .games-scroll::-webkit-scrollbar-track { background: #0a0a0a; }
        .games-scroll::-webkit-scrollbar-thumb { background: #ffc814; box-shadow: 0 0 6px #ffc814; border-radius: 2px; }
      `}</style>
    </div>
  );
}

function GameCard({ game, index, isHovered, onEnter, onLeave }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        flexShrink: 0, width: 180, padding: "20px 16px",
        border: `1px solid ${isHovered ? game.color : "#1a1a1a"}`,
        background: isHovered ? `rgba(${hexToRgb(game.color)},0.04)` : "#080808",
        boxShadow: isHovered ? `0 0 20px ${game.color}44, inset 0 0 20px ${game.color}08` : "none",
        transition: "all 0.35s ease",
        display: "flex", flexDirection: "column", gap: 10,
        cursor: "default", position: "relative", overflow: "hidden",
      }}
    >
      {/* Rank badge */}
      <div style={{
        position: "absolute", top: 10, right: 10,
        fontFamily: "'Share Tech Mono', monospace", fontSize: 8,
        letterSpacing: "0.15em", color: isHovered ? game.color : "#333",
        textShadow: isHovered ? `0 0 8px ${game.color}` : "none",
        transition: "all 0.3s",
      }}>#{index + 1}</div>

      {/* Icon */}
      <span style={{ fontSize: 28, lineHeight: 1,
        filter: isHovered ? `drop-shadow(0 0 8px ${game.color})` : "none",
        transition: "filter 0.3s" }}>{game.icon}</span>

      {/* Title */}
      <span style={{
        fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700,
        color: isHovered ? "#fff" : "#bbb", transition: "color 0.3s", lineHeight: 1.2,
      }}>{game.title}</span>

      {/* Genre + year */}
      <span style={{
        fontFamily: "'Share Tech Mono', monospace", fontSize: 9,
        letterSpacing: "0.18em", color: isHovered ? game.color : "#444",
        textShadow: isHovered ? `0 0 8px ${game.color}` : "none",
        textTransform: "uppercase", transition: "all 0.3s",
      }}>{game.genre} · {game.year}</span>

      {/* Rating stars */}
      <div style={{ display: "flex", gap: 2 }}>
        {Array.from({ length: 10 }).map((_, si) => (
          <div key={si} style={{
            width: 10, height: 3,
            background: si < game.rating ? game.color : "#1a1a1a",
            boxShadow: si < game.rating && isHovered ? `0 0 6px ${game.color}` : "none",
            transition: "all 0.3s",
          }} />
        ))}
      </div>

      {/* Description — fades in on hover */}
      <div style={{
        overflow: "hidden",
        maxHeight: isHovered ? 60 : 0,
        opacity: isHovered ? 1 : 0,
        transition: "max-height 0.4s ease, opacity 0.3s ease",
      }}>
        <span style={{
          fontFamily: "'Share Tech Mono', monospace", fontSize: 9,
          color: "#888", lineHeight: 1.6, letterSpacing: "0.05em",
        }}>{game.desc}</span>
      </div>

      {/* Bottom glow line */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
        background: isHovered ? game.color : "transparent",
        boxShadow: isHovered ? `0 0 10px ${game.color}` : "none",
        transition: "all 0.35s",
      }} />
    </motion.div>
  );
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `${r},${g},${b}`;
}

// ─── Snake Mini-Game ────────────────────────────────────────────────────────
const CELL = 20;
const COLS = 25;
const ROWS = 20;
const W = COLS * CELL;
const H = ROWS * CELL;

const randPos = (snake = []) => {
  let pos;
  do {
    pos = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
  } while (snake.some(s => s.x === pos.x && s.y === pos.y));
  return pos;
};

function SnakeGame() {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    snake: [{ x: 12, y: 10 }, { x: 11, y: 10 }, { x: 10, y: 10 }],
    dir: { x: 1, y: 0 },
    nextDir: { x: 1, y: 0 },
    food: { x: 18, y: 10 },
    powerUp: null,
    score: 0,
    highScore: 0,
    alive: false,
    started: false,
    particles: [],
    frame: 0,
    speed: 150,
  });
  const [displayScore, setDisplayScore] = useState(0);
  const [displayHigh, setDisplayHigh] = useState(0);
  const [phase, setPhase] = useState("idle"); // idle | playing | dead
  const rafRef = useRef(null);
  const lastTickRef = useRef(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const s = stateRef.current;

    ctx.clearRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = "rgba(255,255,255,0.03)";
    ctx.lineWidth = 0.5;
    for (let c = 0; c <= COLS; c++) { ctx.beginPath(); ctx.moveTo(c * CELL, 0); ctx.lineTo(c * CELL, H); ctx.stroke(); }
    for (let r = 0; r <= ROWS; r++) { ctx.beginPath(); ctx.moveTo(0, r * CELL); ctx.lineTo(W, r * CELL); ctx.stroke(); }

    // Food
    const fx = s.food.x * CELL + CELL / 2, fy = s.food.y * CELL + CELL / 2;
    const pulse = 0.7 + Math.sin(s.frame * 0.15) * 0.3;
    ctx.save();
    ctx.shadowColor = "#ffc814";
    ctx.shadowBlur = 14 * pulse;
    ctx.fillStyle = "#ffc814";
    ctx.beginPath();
    ctx.arc(fx, fy, CELL * 0.32 * pulse, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Power-up (cyan)
    if (s.powerUp) {
      const px = s.powerUp.x * CELL + CELL / 2, py = s.powerUp.y * CELL + CELL / 2;
      ctx.save();
      ctx.shadowColor = "#00e5ff";
      ctx.shadowBlur = 16;
      ctx.strokeStyle = "#00e5ff";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const ang = (i * 4 * Math.PI) / 5 - Math.PI / 2 + s.frame * 0.04;
        const r = CELL * 0.35;
        ctx.lineTo(px + r * Math.cos(ang), py + r * Math.sin(ang));
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    }

    // Snake
    s.snake.forEach((seg, i) => {
      const t = i / s.snake.length;
      const green = Math.floor(255 * (1 - t * 0.5));
      ctx.save();
      if (i === 0) {
        ctx.shadowColor = "#50ff20";
        ctx.shadowBlur = 12;
        ctx.fillStyle = "#50ff20";
      } else {
        ctx.fillStyle = `rgb(${Math.floor(20 + t * 10)},${green},${Math.floor(20 * (1 - t))})`;
      }
      const pad = i === 0 ? 1 : 2;
      ctx.fillRect(seg.x * CELL + pad, seg.y * CELL + pad, CELL - pad * 2, CELL - pad * 2);
      ctx.restore();
    });

    // Head eyes
    const h = s.snake[0];
    const eyeOffsets = s.dir.x !== 0
      ? [{ ex: CELL * 0.6 * s.dir.x, ey: -CELL * 0.2 }, { ex: CELL * 0.6 * s.dir.x, ey: CELL * 0.2 }]
      : [{ ex: -CELL * 0.2, ey: CELL * 0.6 * s.dir.y }, { ex: CELL * 0.2, ey: CELL * 0.6 * s.dir.y }];
    eyeOffsets.forEach(({ ex, ey }) => {
      ctx.beginPath();
      ctx.arc(h.x * CELL + CELL / 2 + ex, h.y * CELL + CELL / 2 + ey, 2, 0, Math.PI * 2);
      ctx.fillStyle = "#000";
      ctx.fill();
    });

    // Particles
    s.particles = s.particles.filter(p => p.life > 0);
    s.particles.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.life -= 2; p.vy += 0.1;
      ctx.save();
      ctx.globalAlpha = p.life / 100;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 6;
      ctx.fillRect(p.x, p.y, 3, 3);
      ctx.restore();
    });

    // Idle / dead overlay
    if (!s.alive) {
      ctx.fillStyle = "rgba(6,8,16,0.75)";
      ctx.fillRect(0, 0, W, H);
      ctx.save();
      ctx.textAlign = "center";
      ctx.font = "bold 14px 'Share Tech Mono', monospace";
      if (phase === "dead") {
        ctx.fillStyle = "#ff4444";
        ctx.shadowColor = "#ff4444";
        ctx.shadowBlur = 14;
        ctx.fillText("GAME OVER", W / 2, H / 2 - 22);
        ctx.font = "11px 'Share Tech Mono', monospace";
        ctx.fillStyle = "#ffc814";
        ctx.shadowColor = "#ffc814";
        ctx.fillText(`SCORE: ${s.score}   HIGH: ${s.highScore}`, W / 2, H / 2 + 2);
        ctx.fillStyle = "#50ff20";
        ctx.shadowColor = "#50ff20";
        ctx.shadowBlur = 10;
        ctx.fillText("[ SPACE / ENTER ] TO RESTART", W / 2, H / 2 + 26);
      } else {
        ctx.fillStyle = "#50ff20";
        ctx.shadowColor = "#50ff20";
        ctx.shadowBlur = 14;
        ctx.fillText("SNAKE", W / 2, H / 2 - 22);
        ctx.font = "11px 'Share Tech Mono', monospace";
        ctx.fillStyle = "#ffc814";
        ctx.shadowColor = "#ffc814";
        ctx.fillText("ARROW KEYS / WASD TO MOVE", W / 2, H / 2 + 2);
        ctx.fillStyle = "#50ff20";
        ctx.shadowColor = "#50ff20";
        ctx.shadowBlur = 10;
        ctx.fillText("[ SPACE / ENTER ] TO START", W / 2, H / 2 + 26);
      }
      ctx.restore();
    }

    s.frame++;
  }, [phase]);

  const tick = useCallback((now) => {
    const s = stateRef.current;
    if (!s.alive) { rafRef.current = requestAnimationFrame(tick); draw(); return; }

    if (now - lastTickRef.current < s.speed) {
      rafRef.current = requestAnimationFrame(tick);
      draw();
      return;
    }
    lastTickRef.current = now;

    s.dir = s.nextDir;
    const head = { x: s.snake[0].x + s.dir.x, y: s.snake[0].y + s.dir.y };

    // Wall collision
    if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) { die(); return; }
    // Self collision
    if (s.snake.some(seg => seg.x === head.x && seg.y === head.y)) { die(); return; }

    s.snake.unshift(head);

    // Eat food
    if (head.x === s.food.x && head.y === s.food.y) {
      s.score++;
      if (s.score > s.highScore) s.highScore = s.score;
      s.speed = Math.max(80, 150 - s.score * 3);
      // Particle burst
      for (let i = 0; i < 12; i++) {
        const angle = Math.random() * Math.PI * 2;
        const spd = 1 + Math.random() * 2.5;
        s.particles.push({
          x: s.food.x * CELL + CELL / 2, y: s.food.y * CELL + CELL / 2,
          vx: Math.cos(angle) * spd, vy: Math.sin(angle) * spd,
          life: 80 + Math.random() * 40,
          color: Math.random() > 0.5 ? "#ffc814" : "#50ff20",
        });
      }
      s.food = randPos(s.snake);
      // Chance to spawn power-up
      if (!s.powerUp && Math.random() < 0.3) s.powerUp = randPos(s.snake);
      setDisplayScore(s.score);
    } else if (s.powerUp && head.x === s.powerUp.x && head.y === s.powerUp.y) {
      s.score += 3;
      if (s.score > s.highScore) s.highScore = s.score;
      s.powerUp = null;
      setDisplayScore(s.score);
    } else {
      s.snake.pop();
    }

    rafRef.current = requestAnimationFrame(tick);
    draw();
  }, [draw]);

  const die = useCallback(() => {
    const s = stateRef.current;
    s.alive = false;
    setPhase("dead");
    setDisplayScore(s.score);
    setDisplayHigh(s.highScore);
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const startGame = useCallback(() => {
    const s = stateRef.current;
    s.snake = [{ x: 12, y: 10 }, { x: 11, y: 10 }, { x: 10, y: 10 }];
    s.dir = { x: 1, y: 0 };
    s.nextDir = { x: 1, y: 0 };
    s.food = randPos(s.snake);
    s.powerUp = null;
    s.score = 0;
    s.alive = true;
    s.started = true;
    s.particles = [];
    s.frame = 0;
    s.speed = 150;
    setPhase("playing");
    setDisplayScore(0);
    lastTickRef.current = 0;
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      const s = stateRef.current;
      const { dir } = s;
      if (e.code === "Space" || e.code === "Enter") {
        if (!s.alive) { startGame(); return; }
      }
      if (!s.alive) return;
      if ((e.code === "ArrowUp" || e.code === "KeyW") && dir.y === 0) s.nextDir = { x: 0, y: -1 };
      if ((e.code === "ArrowDown" || e.code === "KeyS") && dir.y === 0) s.nextDir = { x: 0, y: 1 };
      if ((e.code === "ArrowLeft" || e.code === "KeyA") && dir.x === 0) s.nextDir = { x: -1, y: 0 };
      if ((e.code === "ArrowRight" || e.code === "KeyD") && dir.x === 0) s.nextDir = { x: 1, y: 0 };
    };
    window.addEventListener("keydown", onKey);
    rafRef.current = requestAnimationFrame(tick);
    return () => { window.removeEventListener("keydown", onKey); cancelAnimationFrame(rafRef.current); };
  }, [tick, startGame]);

  // Mobile swipe
  const touchStart = useRef(null);
  const onTouchStart = (e) => { touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };
  const onTouchEnd = (e) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    const s = stateRef.current;
    if (!s.alive) { startGame(); return; }
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 20 && s.dir.x === 0) s.nextDir = { x: 1, y: 0 };
      else if (dx < -20 && s.dir.x === 0) s.nextDir = { x: -1, y: 0 };
    } else {
      if (dy > 20 && s.dir.y === 0) s.nextDir = { x: 0, y: 1 };
      else if (dy < -20 && s.dir.y === 0) s.nextDir = { x: 0, y: -1 };
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: W }}>
      {/* Score bar */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontFamily: "'Share Tech Mono', monospace", fontSize: 12, letterSpacing: "0.14em",
        padding: "6px 0",
      }}>
        <span style={{ color: "#50ff20", textShadow: "0 0 8px #50ff20" }}>SCORE: {displayScore}</span>
        <span style={{ color: "#ffc814", textShadow: "0 0 8px #ffc814" }}>HIGH: {displayHigh}</span>
        <span style={{ color: "#444", fontSize: 10 }}>● FOOD +1 &nbsp; ★ POWER-UP +3</span>
      </div>

      {/* Canvas */}
      <div style={{ position: "relative", border: "1px solid #1e1e1e", boxShadow: "0 0 20px rgba(80,255,32,0.1)" }}>
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          style={{ display: "block", background: "#060810" }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        />
      </div>

      {/* D-pad for mobile */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 6, paddingTop: 4 }}>
        {[
          { label: "↑", code: "ArrowUp" },
          { label: "↓", code: "ArrowDown" },
          { label: "←", code: "ArrowLeft" },
          { label: "→", code: "ArrowRight" },
        ].map(({ label, code }) => (
          <button key={code}
            onPointerDown={() => window.dispatchEvent(new KeyboardEvent("keydown", { code, bubbles: true }))}
            style={{
              width: 36, height: 36, background: "transparent",
              border: "1px solid #222", color: "#50ff20", fontSize: 14,
              cursor: "none", fontFamily: "'Share Tech Mono', monospace",
              boxShadow: "0 0 6px rgba(80,255,32,0.15)",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#50ff20"; e.currentTarget.style.boxShadow = "0 0 10px rgba(80,255,32,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#222"; e.currentTarget.style.boxShadow = "0 0 6px rgba(80,255,32,0.15)"; }}
          >{label}</button>
        ))}
        <button
          onPointerDown={startGame}
          style={{
            padding: "0 14px", height: 36, background: "transparent",
            border: "1px solid #ffc814", color: "#ffc814", fontSize: 10,
            cursor: "none", fontFamily: "'Share Tech Mono', monospace",
            letterSpacing: "0.12em", boxShadow: "0 0 8px rgba(255,200,20,0.2)",
          }}>
          {phase === "idle" ? "START" : "RESTART"}
        </button>
      </div>
    </div>
  );
}

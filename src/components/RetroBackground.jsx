import { useEffect, useRef } from "react";

// Floating symbols for programming + gaming
const PROG_SYMBOLS = [
  "{ }", "=>", "( )", "[ ]", "< />", "if()", "//", "&&", "||", "===",
  "npm", "git", "API", "def", "let", "const", "import", "export", "return",
  "#include", "void", "int", "class", "async", "await", "try{}", "catch",
  "SELECT", "JOIN", "push()", "map()", ".then",
];
const GAME_SYMBOLS = [
  "▲", "●", "■", "★", "♦",
  "⚔", "🎮", "👾", "🕹", "⚡",
  "PLAYER 1", "LEVEL UP", "GAME ON", "1UP",
  "HIGH SCORE", "PRESS START", "RESPAWN",
  "+100 XP", "COMBO x3", "CRITICAL HIT",
];

const ALL_SYMBOLS = [...PROG_SYMBOLS, ...GAME_SYMBOLS];

export default function RetroBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf, t = 0;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const SPACING = 46;

    // Generate floating symbols
    const floaters = Array.from({ length: 28 }, (_, i) => {
      const isProg = i < 18;
      const sym = ALL_SYMBOLS[Math.floor(Math.random() * ALL_SYMBOLS.length)];
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        sym,
        speed: 0.12 + Math.random() * 0.22,
        opacity: 0.04 + Math.random() * 0.09,
        fontSize: isProg ? 10 + Math.random() * 6 : 9 + Math.random() * 5,
        color: isProg
          ? `rgba(80,255,32,${0.06 + Math.random() * 0.1})`
          : `rgba(255,200,20,${0.05 + Math.random() * 0.09})`,
        drift: (Math.random() - 0.5) * 0.15,
      };
    });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = Math.ceil(canvas.width / SPACING) + 1;
      const rows = Math.ceil(canvas.height / SPACING) + 1;

      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          const px = x * SPACING, py = y * SPACING;
          const dx = px - canvas.width / 2, dy = py - canvas.height / 2;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const pulse = Math.sin(dist * 0.007 - t * 0.5) * 0.5 + 0.5;
          const isNeon = (x * 7 + y * 13) % 31 === 0;
          if (isNeon) {
            const a = 0.1 + pulse * 0.28;
            ctx.beginPath();
            ctx.arc(px, py, 1.4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(80,255,32,${a})`;
            ctx.shadowColor = "#50ff20";
            ctx.shadowBlur = 4;
            ctx.fill();
            ctx.shadowBlur = 0;
          } else {
            const a = 0.05 + pulse * 0.08;
            ctx.beginPath();
            ctx.arc(px, py, 0.8, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(210,210,210,${a})`;
            ctx.fill();
          }
        }
      }

      // Scan line sweep
      const scanY = (t * 38) % canvas.height;
      const grad = ctx.createLinearGradient(0, scanY - 70, 0, scanY + 70);
      grad.addColorStop(0, "transparent");
      grad.addColorStop(0.5, "rgba(80,255,32,0.032)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, scanY - 70, canvas.width, 140);

      // Floating symbols
      for (const f of floaters) {
        f.y -= f.speed;
        f.x += f.drift;
        if (f.y < -30) { f.y = canvas.height + 30; f.x = Math.random() * canvas.width; }
        if (f.x < -80) f.x = canvas.width + 80;
        if (f.x > canvas.width + 80) f.x = -80;

        ctx.save();
        ctx.globalAlpha = f.opacity + Math.sin(t * 0.5 + f.x) * 0.02;
        ctx.font = `${f.fontSize}px 'Share Tech Mono', monospace`;
        ctx.fillStyle = f.color;
        ctx.fillText(f.sym, f.x, f.y);
        ctx.restore();
      }

      t += 0.012;
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

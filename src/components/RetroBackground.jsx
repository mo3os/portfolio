import { useEffect, useRef } from "react";

const PROG_SYMBOLS = [
  "{ }", "=>", "( )", "[ ]", "</>", "if()", "//", "&&", "||", "===",
  "npm", "git", "API", "def", "let", "const", "import", "export", "return",
  "#include", "void", "int", "class", "async", "await", "try{}", "catch",
  "SELECT", "JOIN", "push()", "map()", ".then",
];
const GAME_SYMBOLS = [
  "▲", "●", "■", "★", "♦",
  "PLAYER 1", "LEVEL UP", "GAME ON", "1UP",
  "HIGH SCORE", "PRESS START", "RESPAWN",
  "+100 XP", "COMBO x3", "CRITICAL HIT",
];
const ALL_SYMBOLS = [...PROG_SYMBOLS, ...GAME_SYMBOLS];

export default function RetroBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let raf;
    let t = 0;
    let running = true;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();

    const onResize = () => setSize();
    window.addEventListener("resize", onResize);

    const SPACING = 46;

    const floaters = Array.from({ length: 30 }, (_, i) => {
      const isProg = i < 20;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        sym: ALL_SYMBOLS[Math.floor(Math.random() * ALL_SYMBOLS.length)],
        speed: 0.12 + Math.random() * 0.22,
        opacity: 0.05 + Math.random() * 0.1,
        fontSize: isProg ? 10 + Math.random() * 6 : 9 + Math.random() * 5,
        color: isProg
          ? `rgba(80,255,32,${(0.07 + Math.random() * 0.12).toFixed(2)})`
          : `rgba(255,200,20,${(0.06 + Math.random() * 0.1).toFixed(2)})`,
        drift: (Math.random() - 0.5) * 0.15,
      };
    });

    const draw = () => {
      if (!running) return;

      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);

      // Dot grid
      const cols = Math.ceil(W / SPACING) + 1;
      const rows = Math.ceil(H / SPACING) + 1;

      for (let cx = 0; cx < cols; cx++) {
        for (let cy = 0; cy < rows; cy++) {
          const px = cx * SPACING;
          const py = cy * SPACING;
          const dx = px - W / 2;
          const dy = py - H / 2;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const pulse = Math.sin(dist * 0.007 - t * 0.5) * 0.5 + 0.5;

          if ((cx * 7 + cy * 13) % 31 === 0) {
            // Neon green accent dot
            ctx.beginPath();
            ctx.arc(px, py, 1.4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(80,255,32,${(0.1 + pulse * 0.28).toFixed(2)})`;
            ctx.shadowColor = "#50ff20";
            ctx.shadowBlur = 5;
            ctx.fill();
            ctx.shadowBlur = 0;
          } else {
            // Subtle grey dot
            ctx.beginPath();
            ctx.arc(px, py, 0.8, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(200,200,200,${(0.04 + pulse * 0.07).toFixed(2)})`;
            ctx.fill();
          }
        }
      }

      // Horizontal scan sweep
      const scanY = (t * 38) % H;
      const grad = ctx.createLinearGradient(0, scanY - 70, 0, scanY + 70);
      grad.addColorStop(0, "transparent");
      grad.addColorStop(0.5, "rgba(80, 255, 32, 0.08)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, Math.max(0, scanY - 70), W, 140);

      // Floating text symbols
      ctx.save();
      for (const f of floaters) {
        f.y -= f.speed;
        f.x += f.drift;
        if (f.y < -30) {
          f.y = H + 30;
          f.x = Math.random() * W;
        }
        if (f.x < -80) f.x = W + 80;
        if (f.x > W + 80) f.x = -80;

        const alpha = Math.max(0, Math.min(1, f.opacity + Math.sin(t * 0.5 + f.x * 0.01) * 0.02));
        ctx.globalAlpha = alpha;
        ctx.font = `${f.fontSize}px 'Share Tech Mono', monospace`;
        ctx.fillStyle = f.color;
        ctx.fillText(f.sym, f.x, f.y);
      }
      ctx.restore();

      t += 0.012;
      raf = requestAnimationFrame(draw);
    };

    // Pause animation when tab is hidden — saves CPU/battery
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else {
        running = true;
        draw();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Small delay to ensure canvas is in DOM and sized
    const startTimer = setTimeout(() => {
      setSize();
      draw();
    }, 50);

    return () => {
      running = false;
      clearTimeout(startTimer);
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}

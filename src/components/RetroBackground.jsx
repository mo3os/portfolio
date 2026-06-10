import { useEffect, useRef } from "react";

export default function RetroBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf, t = 0;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const SPACING = 48;

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
          // mostly dim dots, occasional neon-tinted ones
          const isNeon = (x * 7 + y * 13) % 31 === 0;
          if (isNeon) {
            const a = (0.06 + pulse * 0.18);
            ctx.beginPath();
            ctx.arc(px, py, 1.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(57,255,20,${a})`;
            ctx.fill();
          } else {
            const a = 0.03 + pulse * 0.05;
            ctx.beginPath();
            ctx.arc(px, py, 0.7, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(200,200,200,${a})`;
            ctx.fill();
          }
        }
      }

      // Subtle horizontal scan line sweep
      const scanY = (t * 40) % canvas.height;
      const grad = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60);
      grad.addColorStop(0, "transparent");
      grad.addColorStop(0.5, "rgba(57,255,20,0.025)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, scanY - 60, canvas.width, 120);

      t += 0.012;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

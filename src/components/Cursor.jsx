import { useEffect, useRef, useState } from "react";

// Mercedes-Benz SVG logo (3-pointed star in circle)
const MercedesSVG = ({ size, glowing }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" stroke={glowing ? "#39ff14" : "rgba(255,255,255,0.9)"} strokeWidth="3"
      style={glowing ? { filter: "drop-shadow(0 0 6px #39ff14) drop-shadow(0 0 12px #39ff14)" } : {}} />
    {/* Three-pointed star */}
    <path d="M50 8 L50 50" stroke={glowing ? "#39ff14" : "rgba(255,255,255,0.9)"} strokeWidth="3" strokeLinecap="round"
      style={glowing ? { filter: "drop-shadow(0 0 4px #39ff14)" } : {}} />
    <path d="M50 50 L12 72" stroke={glowing ? "#39ff14" : "rgba(255,255,255,0.9)"} strokeWidth="3" strokeLinecap="round"
      style={glowing ? { filter: "drop-shadow(0 0 4px #39ff14)" } : {}} />
    <path d="M50 50 L88 72" stroke={glowing ? "#39ff14" : "rgba(255,255,255,0.9)"} strokeWidth="3" strokeLinecap="round"
      style={glowing ? { filter: "drop-shadow(0 0 4px #39ff14)" } : {}} />
    <circle cx="50" cy="50" r="5" fill={glowing ? "#39ff14" : "rgba(255,255,255,0.9)"}
      style={glowing ? { filter: "drop-shadow(0 0 6px #39ff14)" } : {}} />
  </svg>
);

export default function Cursor() {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const trail = useRef({ x: -100, y: -100 });
  const rotation = useRef(0);

  useEffect(() => {
    const move = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", move);

    const onEnter = () => setHovering(true);
    const onLeave = () => setHovering(false);
    const attach = () => {
      document.querySelectorAll("a, button, [data-hover]").forEach(el => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    attach();
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    let raf;
    const animate = () => {
      rotation.current += hovering ? 4 : 2;
      if (cursorRef.current) {
        const size = hovering ? 50 : 36;
        cursorRef.current.style.transform = `translate(${pos.current.x - size/2}px, ${pos.current.y - size/2}px) rotate(${rotation.current}deg)`;
        cursorRef.current.style.width = size + "px";
        cursorRef.current.style.height = size + "px";
      }
      trail.current.x += (pos.current.x - trail.current.x) * 0.1;
      trail.current.y += (pos.current.y - trail.current.y) * 0.1;
      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${trail.current.x - 3}px, ${trail.current.y - 3}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [hovering]);

  return (
    <>
      {/* Mercedes cursor */}
      <div ref={cursorRef} style={{
        position: "fixed", top: 0, left: 0, pointerEvents: "none",
        zIndex: 9999, willChange: "transform",
        transition: "width 0.3s cubic-bezier(.25,.46,.45,.94), height 0.3s cubic-bezier(.25,.46,.45,.94)",
      }}>
        <MercedesSVG size="100%" glowing={hovering} />
      </div>
      {/* Center dot trail */}
      <div ref={trailRef} style={{
        position: "fixed", top: 0, left: 0, width: 6, height: 6,
        background: hovering ? "#39ff14" : "rgba(255,255,255,0.6)",
        borderRadius: "50%", pointerEvents: "none",
        zIndex: 9998, willChange: "transform",
        boxShadow: hovering ? "0 0 8px #39ff14, 0 0 16px #39ff14" : "none",
        transition: "background 0.3s ease, box-shadow 0.3s ease",
      }} />
    </>
  );
}

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", move);

    const addHover = () => setHovering(true);
    const removeHover = () => setHovering(false);
    const targets = document.querySelectorAll("a, button, [data-hover]");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    let raf;
    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{
        position: "fixed", top: 0, left: 0, width: 8, height: 8,
        background: "white", borderRadius: "50%", pointerEvents: "none",
        zIndex: 9999, mixBlendMode: "difference", willChange: "transform"
      }} />
      <div ref={ringRef} style={{
        position: "fixed", top: 0, left: 0,
        width: hovering ? 60 : 40, height: hovering ? 60 : 40,
        border: "1px solid rgba(255,255,255,0.5)",
        borderRadius: "50%", pointerEvents: "none",
        zIndex: 9998, mixBlendMode: "difference", willChange: "transform",
        transition: "width 0.4s cubic-bezier(.25,.46,.45,.94), height 0.4s cubic-bezier(.25,.46,.45,.94), opacity 0.3s ease",
        marginLeft: hovering ? -10 : 0, marginTop: hovering ? -10 : 0,
      }} />
    </>
  );
}

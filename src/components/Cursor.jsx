import { useEffect, useRef, useState } from "react";

const INTERACTIVE = "a, button, input, textarea, [role='button']";

/**
 * Trailing dot + ring cursor that expands over interactive elements.
 * Only mounts for fine pointers; hidden entirely under reduced-motion.
 */
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const target = { x: -100, y: -100 };
    const dotPos = { ...target };
    const ringPos = { ...target };
    let hovering = false;
    let scale = 1;
    let frame = 0;

    // Lerp both toward the pointer; stop the loop once they've settled.
    const tick = () => {
      dotPos.x += (target.x - dotPos.x) * 0.6;
      dotPos.y += (target.y - dotPos.y) * 0.6;
      ringPos.x += (target.x - ringPos.x) * 0.18;
      ringPos.y += (target.y - ringPos.y) * 0.18;
      scale += ((hovering ? 1.9 : 1) - scale) * 0.2;
      dot.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%) scale(${scale})`;

      const settled =
        Math.abs(target.x - ringPos.x) < 0.1 &&
        Math.abs(target.y - ringPos.y) < 0.1 &&
        Math.abs((hovering ? 1.9 : 1) - scale) < 0.01;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const setHover = (value) => {
      hovering = value;
      ring.style.opacity = value ? "0.9" : "0.45";
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onOver = (e) => e.target.closest?.(INTERACTIVE) && setHover(true);
    const onOut = (e) => e.target.closest?.(INTERACTIVE) && setHover(false);

    tick(); // park both off-screen until the first mouse move
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[200] h-1.5 w-1.5 rounded-full bg-accent"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{ opacity: 0.45, transition: "opacity 0.3s ease" }}
        className="pointer-events-none fixed left-0 top-0 z-[200] h-8 w-8 rounded-full border border-accent"
      />
    </>
  );
}

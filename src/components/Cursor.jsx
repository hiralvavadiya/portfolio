import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

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

    const moveDot = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const moveDotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const moveRing = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const moveRingY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e) => {
      moveDot(e.clientX);
      moveDotY(e.clientY);
      moveRing(e.clientX);
      moveRingY(e.clientY);
    };

    const interactive = "a, button, input, textarea, [role='button']";
    const onOver = (e) => {
      if (e.target.closest?.(interactive)) {
        gsap.to(ring, { scale: 1.9, opacity: 0.9, duration: 0.3, ease: "power3.out" });
      }
    };
    const onOut = (e) => {
      if (e.target.closest?.(interactive)) {
        gsap.to(ring, { scale: 1, opacity: 0.45, duration: 0.3, ease: "power3.out" });
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
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
        className="pointer-events-none fixed left-0 top-0 z-[200] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{ opacity: 0.45 }}
        className="pointer-events-none fixed left-0 top-0 z-[200] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent"
      />
    </>
  );
}

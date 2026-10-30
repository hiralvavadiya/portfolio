import { useRef } from "react";

const canHover = () =>
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Wraps a single interactive child and nudges it toward the cursor on hover.
 * Disabled for coarse pointers and reduced-motion visitors.
 */
export default function Magnetic({ children, strength = 0.35, className = "" }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el || !canHover()) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
    el.style.transition = "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)";
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";
    el.style.transform = "translate3d(0, 0, 0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`inline-block ${className}`}
    >
      {children}
    </div>
  );
}

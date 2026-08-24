import { useEffect, useRef, useState } from "react";
import useInView from "../hooks/useInView";

/** Counts from 0 to `value` once scrolled into view. */
export default function CountUp({ value, suffix = "", duration = 1200 }) {
  const { ref, isVisible } = useInView({ threshold: 0.4 });
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!isVisible || started.current) return;
    started.current = true;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let frame;
    const start = performance.now();
    const tick = (now) => {
      const p = reduced ? 1 : Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * value * 10) / 10);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isVisible, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {Number.isInteger(value) ? Math.round(display) : display.toFixed(1)}
      {suffix}
    </span>
  );
}

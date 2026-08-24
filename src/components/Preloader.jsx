import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader({ onDone }) {
  const rootRef = useRef(null);
  const barRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      onDone();
      return;
    }

    const state = { v: 0 };
    const tl = gsap.timeline({ onComplete: onDone });

    tl.to(state, {
      v: 100,
      duration: 1.1,
      ease: "power2.inOut",
      onUpdate: () => setCount(Math.round(state.v)),
    })
      .to(barRef.current, { scaleX: 1, duration: 1.1, ease: "power2.inOut" }, 0)
      .to(rootRef.current, { yPercent: -100, duration: 0.7, ease: "power4.inOut" }, "+=0.15");

    return () => tl.kill();
  }, [onDone]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-bg"
    >
      <p className="display-xl text-5xl text-text sm:text-7xl">
        Hiral<span className="text-accent">.</span>
      </p>
      <div className="mt-8 h-px w-48 overflow-hidden bg-border sm:w-64">
        <div ref={barRef} className="h-full w-full origin-left scale-x-0 bg-accent" />
      </div>
      <p className="label-mono mt-4 text-faint">{count}%</p>
    </div>
  );
}

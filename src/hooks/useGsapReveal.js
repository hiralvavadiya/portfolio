import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Staggered scroll reveal for a container's direct `[data-reveal]` children.
 * Falls back to plain visibility when the visitor prefers reduced motion.
 */
export default function useGsapReveal({ stagger = 0.08, y = 34, start = "top 85%" } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = root.querySelectorAll("[data-reveal]");
    if (!targets.length) return;

    if (prefersReduced()) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger,
          scrollTrigger: { trigger: root, start, once: true },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [stagger, y, start]);

  return ref;
}

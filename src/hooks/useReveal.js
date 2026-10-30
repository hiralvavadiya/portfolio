import { useEffect, useRef } from "react";

/**
 * Staggered scroll reveal for a container's `[data-reveal]` children.
 * Pure CSS transitions driven by one IntersectionObserver — no animation library.
 */
export default function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    root.querySelectorAll("[data-reveal]").forEach((el, i) => el.style.setProperty("--i", i));
    root.classList.add("reveal-group");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          root.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return ref;
}

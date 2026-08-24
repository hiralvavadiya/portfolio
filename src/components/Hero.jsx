import { useEffect, useRef } from "react";
import gsap from "gsap";
import { profile } from "../data/portfolio";
import LiveClock from "./LiveClock";
import Magnetic from "./Magnetic";

export default function Hero({ ready }) {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!ready) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = rootRef.current?.querySelectorAll("[data-hero]");
    if (!targets?.length) return;

    if (reduced) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: 46 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power4.out", stagger: 0.09, delay: 0.15 }
      );
    }, rootRef);
    return () => ctx.revert();
  }, [ready]);

  const scrollTo = (e, sel) => {
    e.preventDefault();
    document.querySelector(sel)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative flex min-h-screen items-center overflow-hidden px-5 pt-28 pb-16 sm:px-8"
    >
      {/* gradient mesh */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-0 h-[38rem] w-[38rem] rounded-full bg-accent/12 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-accent-deep/10 blur-[120px]"
      />

      <div className="relative mx-auto w-full max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left — the statement */}
          <div className="lg:col-span-8">
            <p data-hero className="label-mono mb-8 flex items-center gap-3 text-accent">
              <span className="inline-block h-px w-10 bg-accent" />
              Full Stack Developer
            </p>

            <h1 className="display-xl text-text">
              <span data-hero className="block text-[clamp(3.2rem,13vw,10rem)]">
                HIRAL
              </span>
              <span data-hero className="block text-[clamp(3.2rem,13vw,10rem)] text-gradient">
                VAVADIYA
              </span>
            </h1>

            <p
              data-hero
              className="mt-10 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
            >
              I build <span className="text-text">real-time, full-stack systems</span> — live
              scoring platforms, booking engines with tricky availability rules, and the APIs
              underneath them.
            </p>

            <div data-hero className="mt-12 flex flex-wrap items-center gap-4">
              <Magnetic>
                <a
                  href="#projects"
                  onClick={(e) => scrollTo(e, "#projects")}
                  className="group inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 text-sm font-semibold text-[#17110c] transition-colors hover:bg-accent-strong"
                >
                  See the work
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4 transition-transform group-hover:translate-x-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0-6-6m6 6-6 6" />
                  </svg>
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={profile.resumeUrl}
                  download
                  className="inline-flex items-center gap-3 rounded-full border border-border-strong px-7 py-4 text-sm font-semibold text-text transition-colors hover:border-accent hover:text-accent"
                >
                  Résumé
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0-4-4m4 4 4-4M4 19.5h16" />
                  </svg>
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Right — live metadata rail */}
          <aside data-hero className="lg:col-span-4 lg:pt-4">
            <dl className="space-y-6 border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <div>
                <dt className="label-mono text-faint">Local time</dt>
                <dd className="mt-1.5 font-mono text-sm text-text">
                  <LiveClock />
                </dd>
              </div>
              <div>
                <dt className="label-mono text-faint">Based in</dt>
                <dd className="mt-1.5 text-sm text-text">{profile.location}</dd>
              </div>
              <div>
                <dt className="label-mono text-faint">Experience</dt>
                <dd className="mt-1.5 text-sm text-text">2+ years · Frontend → Full Stack</dd>
              </div>
              <div>
                <dt className="label-mono text-faint">Status</dt>
                <dd className="mt-1.5 flex items-center gap-2 text-sm text-text">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                  Open to opportunities
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>

      <a
        href="#about"
        onClick={(e) => scrollTo(e, "#about")}
        className="label-mono absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-faint transition-colors hover:text-accent sm:flex"
      >
        Scroll
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 animate-bounce">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0 6-6m-6 6-6-6" />
        </svg>
      </a>
    </section>
  );
}

import { profile } from "../data/portfolio";
import Reveal from "./Reveal";

export default function Hero() {
  const scrollToProjects = (e) => {
    e.preventDefault();
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-5 pt-24 sm:px-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="mx-auto max-w-6xl w-full">
        <Reveal>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {profile.location} · Open to opportunities
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-text sm:text-5xl md:text-6xl">
            Hi, I'm {profile.name.split(" ")[0]}
          </h1>
        </Reveal>

        <Reveal delay={150}>
          <h2 className="mt-3 text-2xl font-semibold text-gradient sm:text-3xl md:text-4xl font-display">
            {profile.title}
          </h2>
        </Reveal>

        <Reveal delay={220}>
          <p className="mt-6 max-w-xl text-base text-muted sm:text-lg">
            {profile.tagline}
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              onClick={scrollToProjects}
              className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-[#05070a] transition-transform hover:scale-[1.03] hover:brightness-110"
            >
              View Projects
            </a>
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-text transition-colors hover:border-accent hover:text-accent"
            >
              Download Resume
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0-4-4m4 4 4-4M4 19.5h16" />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import { profile } from "../data/portfolio";

export default function Footer() {
  const scrollTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <a
              href="#home"
              onClick={scrollTop}
              className="display-xl text-4xl text-text transition-colors hover:text-accent sm:text-5xl"
            >
              Hiral<span className="text-accent">.</span>
            </a>
            <p className="label-mono mt-4 text-faint">
              © {new Date().getFullYear()} · Built with React, Tailwind &amp; GSAP
            </p>
          </div>

          <div className="flex items-center gap-7 text-sm">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent">
              LinkedIn
            </a>
            <a href={`mailto:${profile.email}`} className="text-muted hover:text-accent">
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

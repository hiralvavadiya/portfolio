import { useEffect } from "react";
import ArchitectureDiagram from "./ArchitectureDiagram";
import BookingPlayground from "./BookingPlayground";

export default function CaseStudyModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!project) return null;
  const { caseStudy } = project;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/80 px-4 py-10 backdrop-blur-sm sm:py-16"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glow w-full max-w-3xl rounded-2xl border border-border bg-surface p-6 sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="label-mono text-accent">
              Case Study
            </p>
            <h3 id="case-study-title" className="mt-2 display-xl text-2xl text-text sm:text-2xl">
              {project.name}
            </h3>
            {project.status && (
              <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-medium text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {project.status}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="shrink-0 rounded-lg border border-border p-2 text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="mt-6 text-sm leading-relaxed text-muted sm:text-base">{caseStudy.summary}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <Section title="My Role">
          <p className="text-sm leading-relaxed text-muted">{caseStudy.role}</p>
        </Section>

        {caseStudy.interactive && (
          <Section title="The availability rule — live">
            <BookingPlayground />
          </Section>
        )}

        <Section title="Architecture">
          <BulletList items={caseStudy.architecture} />
        </Section>

        {caseStudy.interactive && (
          <Section title="Concurrency, step by step">
            <ArchitectureDiagram />
          </Section>
        )}

        <Section title="Key Decisions & Challenges">
          <BulletList items={caseStudy.highlights} />
        </Section>

        {caseStudy.whatsLeft && (
          <Section title="What's Left">
            <BulletList items={caseStudy.whatsLeft} muted />
          </Section>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-border pt-6 text-sm font-medium">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-accent hover:text-accent-strong"
            >
              Live Demo
            </a>
          )}
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted hover:text-text"
            >
              View Code on GitHub
            </a>
          ) : (
            project.note && <span className="text-xs text-muted">{project.note}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mt-6">
      <h4 className="label-mono text-accent">{title}</h4>
      <div className="mt-2.5">{children}</div>
    </div>
  );
}

function BulletList({ items, muted = false }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-muted">
          <span className={`mt-2 h-1 w-1 shrink-0 rounded-full ${muted ? "bg-muted" : "bg-accent"}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

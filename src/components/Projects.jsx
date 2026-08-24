import { projects } from "../data/portfolio";
import useGsapReveal from "../hooks/useGsapReveal";
import BookingPlayground from "./BookingPlayground";
import SectionHeading from "./SectionHeading";

function LinkRow({ project, onOpenCaseStudy }) {
  return (
    <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium">
      {project.caseStudy && (
        <button
          type="button"
          onClick={() => onOpenCaseStudy(project)}
          className="group/link inline-flex items-center gap-2 text-accent hover:text-accent-strong"
        >
          Read case study
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0-6-6m6 6-6 6" />
          </svg>
        </button>
      )}
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-accent hover:text-accent-strong"
        >
          Live demo
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H18m0 0v4.5M18 6l-8 8M6 12v6a1 1 0 0 0 1 1h6" />
          </svg>
        </a>
      )}
      {project.github ? (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-muted hover:text-text"
        >
          GitHub
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
            <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.36-3.37-1.36-.46-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.81 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
          </svg>
        </a>
      ) : (
        project.note && <span className="label-mono text-faint">{project.note}</span>
      )}
    </div>
  );
}

export default function Projects({ onOpenCaseStudy }) {
  const ref = useGsapReveal({ stagger: 0.1 });
  const [featured, ...rest] = projects;

  return (
    <section id="projects" ref={ref} className="px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="04"
          eyebrow="Projects"
          title="Selected work"
          description="Real-time systems, full-stack CRUD, booking logic and interactive frontends."
        />

        {/* Featured */}
        <article
          data-reveal
          className="hover-lift group relative overflow-hidden rounded-3xl border border-border bg-surface p-8 sm:p-12"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/10 blur-[90px] transition-opacity duration-500 group-hover:opacity-160"
          />
          <div className="relative grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3">
                <span className="label-mono text-accent">Featured</span>
                {featured.status && (
                  <span className="label-mono rounded-full border border-border-strong px-3 py-1 text-faint">
                    {featured.status}
                  </span>
                )}
              </div>
              <h3 className="display-xl mt-5 text-[clamp(1.9rem,4.5vw,3rem)] text-text">
                {featured.name}
              </h3>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
                {featured.description}
              </p>
              <LinkRow project={featured} onOpenCaseStudy={onOpenCaseStudy} />

              <div className="mt-8">
                <p className="label-mono mb-4 text-faint">Stack</p>
                <div className="flex flex-wrap gap-2">
                  {featured.tech.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border-strong px-3 py-1.5 font-mono text-[11px] text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {featured.caseStudy?.interactive && (
              <div className="lg:col-span-5">
                <BookingPlayground />
              </div>
            )}
          </div>
        </article>

        {/* Rest */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {rest.map((project) => (
            <article
              key={project.name}
              data-reveal
              className="hover-lift group flex flex-col rounded-2xl border border-border bg-surface/60 p-7 hover:border-border-strong hover:bg-surface"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="display-xl text-xl text-text sm:text-2xl">{project.name}</h3>
                {project.status && (
                  <span className="label-mono shrink-0 rounded-full border border-accent/40 px-2.5 py-1 text-accent">
                    {project.status}
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tech.map((tag) => (
                  <span key={tag} className="font-mono text-[11px] text-faint">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto">
                <LinkRow project={project} onOpenCaseStudy={onOpenCaseStudy} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

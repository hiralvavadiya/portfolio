import { experience } from "../data/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  return (
    <section id="experience" className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked"
          description="2+ years across frontend and full-stack roles, building real-time platforms and client software."
        />

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute left-[7px] top-2 bottom-2 w-px bg-border sm:left-[9px]"
          />

          <ol className="space-y-12">
            {experience.map((job, i) => (
              <Reveal key={job.company} delay={i * 120} as="li" className="relative pl-8 sm:pl-10">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-accent bg-bg sm:h-5 sm:w-5"
                />

                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-lg font-semibold text-text">
                    {job.role} <span className="text-muted">· {job.company}</span>
                  </h3>
                  <span className="text-xs font-medium uppercase tracking-wide text-accent">
                    {job.period}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted">{job.duration}</p>

                <ul className="mt-4 space-y-2">
                  {job.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm text-muted sm:text-base">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

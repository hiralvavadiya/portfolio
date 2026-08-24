import { experience } from "../data/portfolio";
import useGsapReveal from "../hooks/useGsapReveal";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  const ref = useGsapReveal({ stagger: 0.12 });

  return (
    <section id="experience" ref={ref} className="px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="03"
          eyebrow="Experience"
          title="Where I've worked"
          description="2+ years across frontend and full-stack roles, building real-time platforms and client software."
        />

        <ol className="border-t border-border">
          {experience.map((job) => (
            <li
              key={job.company}
              data-reveal
              className="group grid gap-6 border-b border-border py-10 transition-colors hover:bg-surface/40 lg:grid-cols-12 lg:gap-8 lg:px-4"
            >
              <div className="lg:col-span-3">
                <p className="label-mono text-accent">{job.period}</p>
                <p className="label-mono mt-2 text-faint">{job.duration}</p>
              </div>

              <div className="lg:col-span-9">
                <h3 className="display-xl text-2xl text-text sm:text-3xl">{job.company}</h3>
                <p className="mt-2 text-sm font-medium text-accent-strong">{job.role}</p>

                <ul className="mt-6 space-y-3">
                  {job.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-4 text-[15px] leading-relaxed text-muted">
                      <span className="mt-2.5 h-px w-5 shrink-0 bg-border-strong transition-colors group-hover:bg-accent" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

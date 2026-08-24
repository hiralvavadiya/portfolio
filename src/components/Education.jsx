import { education } from "../data/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Education() {
  return (
    <section id="education" className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Education" title="Background & training" />

        <div className="grid gap-5 sm:grid-cols-2">
          {education.map((item, i) => (
            <Reveal key={item.institution} delay={i * 100}>
              <div className="h-full rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/50">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-base font-semibold text-text">
                    {item.credential}
                  </h3>
                  <span className="text-xs font-medium uppercase tracking-wide text-accent">
                    {item.period}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted">{item.institution}</p>
                {item.detail && <p className="mt-1 text-sm text-muted">{item.detail}</p>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

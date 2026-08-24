import { education } from "../data/portfolio";
import useGsapReveal from "../hooks/useGsapReveal";
import SectionHeading from "./SectionHeading";

export default function Education() {
  const ref = useGsapReveal();

  return (
    <section id="education" ref={ref} className="px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="05" eyebrow="Education" title="Background & training" />

        <div className="border-t border-border">
          {education.map((item) => (
            <div
              key={item.institution}
              data-reveal
              className="grid gap-4 border-b border-border py-8 transition-colors hover:bg-surface/40 lg:grid-cols-12 lg:gap-8 lg:px-4"
            >
              <p className="label-mono text-accent lg:col-span-3">{item.period}</p>
              <div className="lg:col-span-9">
                <h3 className="text-lg font-semibold text-text">{item.credential}</h3>
                <p className="mt-1.5 text-sm text-muted">{item.institution}</p>
                {item.detail && <p className="mt-1 text-sm text-faint">{item.detail}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

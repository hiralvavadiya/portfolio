import { about } from "../data/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const stats = [
  { value: "2 yrs", label: "Hands-on experience" },
  { value: "1 yr", label: "MERN internship" },
  { value: "1 yr", label: "Professional role" },
];

export default function About() {
  return (
    <section id="about" className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="About" title="A little about my work" />

        <div className="grid gap-12 md:grid-cols-5">
          <Reveal delay={100} className="md:col-span-3">
            <p className="text-lg leading-relaxed text-muted">{about.paragraph}</p>
          </Reveal>

          <Reveal delay={200} className="md:col-span-2">
            <div className="grid grid-cols-3 gap-4 md:grid-cols-1">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border bg-surface px-5 py-5 text-center md:text-left"
                >
                  <p className="font-display text-2xl font-semibold text-accent">{stat.value}</p>
                  <p className="mt-1 text-sm text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

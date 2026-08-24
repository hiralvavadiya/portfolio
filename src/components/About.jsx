import { about } from "../data/portfolio";
import useGsapReveal from "../hooks/useGsapReveal";
import CountUp from "./CountUp";
import SectionHeading from "./SectionHeading";

const stats = [
  { value: 2, suffix: "+", label: "Years hands-on" },
  { value: 5, suffix: "", label: "Shipped products" },
  { value: 1, suffix: "", label: "NASA hackathon award" },
];

export default function About() {
  const ref = useGsapReveal();

  return (
    <section id="about" ref={ref} className="relative px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="01" eyebrow="About" title="What I actually do" />

        <div className="grid gap-16 lg:grid-cols-12">
          <div data-reveal className="lg:col-span-7">
            <p className="text-xl leading-relaxed text-muted sm:text-2xl">
              {about.paragraph}
            </p>
          </div>

          <div className="lg:col-span-5 lg:pl-8">
            <div className="divide-y divide-border border-y border-border">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  data-reveal
                  className="flex items-baseline justify-between gap-6 py-6"
                >
                  <span className="display-xl text-4xl text-accent sm:text-5xl">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="label-mono max-w-[9rem] text-right text-faint">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { skills } from "../data/portfolio";
import useGsapReveal from "../hooks/useGsapReveal";
import SectionHeading from "./SectionHeading";

const marqueeItems = [
  "React", "Next.js", "TypeScript", "Node.js", "Express", "MongoDB", "PostgreSQL",
  "NestJS", "WebSockets", "Socket.io", "Tailwind", "Redux", "MUI", "GSAP", "Docker",
];

export default function Skills() {
  const ref = useGsapReveal();

  return (
    <section id="skills" className="relative py-28 sm:py-36">
      {/* Full-bleed marquee */}
      <div className="relative overflow-hidden border-y border-border py-6">
        <div className="marquee-track flex w-max gap-10">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="display-xl flex shrink-0 items-center gap-10 text-3xl text-faint sm:text-4xl"
            >
              {item}
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
          ))}
        </div>
      </div>

      <div ref={ref} className="mx-auto mt-24 max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          eyebrow="Skills"
          title="The toolkit"
          description="Built over two years of shipping features end-to-end, from schema to interface."
        />

        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => (
            <div
              key={group.category}
              data-reveal
              className="group bg-bg p-7 transition-colors hover:bg-surface"
            >
              <h3 className="label-mono text-accent">{group.category}</h3>
              <ul className="mt-5 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="text-[15px] text-muted transition-colors group-hover:text-text">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

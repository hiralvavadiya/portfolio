import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-muted">{description}</p>}
    </Reveal>
  );
}

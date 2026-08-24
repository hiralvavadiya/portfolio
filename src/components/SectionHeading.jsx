export default function SectionHeading({ index, eyebrow, title, description, className = "" }) {
  return (
    <div className={`mb-16 ${className}`}>
      <div data-reveal className="mb-6 flex items-center gap-4">
        {index && <span className="label-mono text-accent">{index}</span>}
        <span className="h-px flex-1 bg-border sm:max-w-24" />
        <span className="label-mono text-faint">{eyebrow}</span>
      </div>
      <h2
        data-reveal
        className="display-xl max-w-3xl text-[clamp(2.2rem,6vw,4.25rem)] text-text"
      >
        {title}
      </h2>
      {description && (
        <p data-reveal className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

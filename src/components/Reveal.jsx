import useInView from "../hooks/useInView";

export default function Reveal({ children, delay = 0, className = "", as: Tag = "div" }) {
  const { ref, isVisible } = useInView();

  return (
    <Tag
      ref={ref}
      className={`reveal ${isVisible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

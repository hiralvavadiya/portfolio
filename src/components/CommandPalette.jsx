import { useEffect, useMemo, useRef, useState } from "react";
import { nav, profile, projects } from "../data/portfolio";

function buildCommands({ openCaseStudy }) {
  const navCommands = nav.map((item) => ({
    id: `nav-${item.href}`,
    group: "Go to",
    label: item.label,
    action: () => document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" }),
  }));

  const projectCommands = projects
    .filter((p) => p.caseStudy)
    .map((p) => ({
      id: `case-${p.name}`,
      group: "Case Studies",
      label: `Read case study — ${p.name}`,
      action: () => openCaseStudy(p),
    }));

  const actionCommands = [
    {
      id: "resume",
      group: "Actions",
      label: "Download Resume",
      action: () => {
        const a = document.createElement("a");
        a.href = profile.resumeUrl;
        a.setAttribute("download", "");
        a.click();
      },
    },
    {
      id: "email",
      group: "Actions",
      label: `Copy email (${profile.email})`,
      action: () => navigator.clipboard?.writeText(profile.email),
    },
    {
      id: "github",
      group: "Actions",
      label: "Open GitHub profile",
      action: () => window.open(profile.github, "_blank", "noopener,noreferrer"),
    },
    {
      id: "linkedin",
      group: "Actions",
      label: "Open LinkedIn profile",
      action: () => window.open(profile.linkedin, "_blank", "noopener,noreferrer"),
    },
  ];

  return [...navCommands, ...projectCommands, ...actionCommands];
}

// Mounted only while open (see App.jsx), so state starts fresh every time it opens.
export default function CommandPalette({ onClose, onOpenCaseStudy }) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);

  const commands = useMemo(() => buildCommands({ openCaseStudy: onOpenCaseStudy }), [onOpenCaseStudy]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q ? commands.filter((c) => c.label.toLowerCase().includes(q)) : commands;

    return list.map((cmd, i) => ({ ...cmd, showGroup: cmd.group !== list[i - 1]?.group }));
  }, [commands, query]);

  useEffect(() => {
    requestAnimationFrame(() => inputRef.current?.focus());
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const runCommand = (cmd) => {
    if (!cmd) return;
    cmd.action();
    onClose();
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    setActiveIndex(0);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runCommand(filtered[activeIndex]);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/80 px-4 pt-24 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glow w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-surface"
      >
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 shrink-0 text-muted">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.34-4.34M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={handleQueryChange}
            onKeyDown={handleKeyDown}
            placeholder="Jump to a section, project, or action..."
            className="w-full bg-transparent text-sm text-text outline-none placeholder:text-muted"
          />
          <kbd className="shrink-0 rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-faint">
            Esc
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-muted">No matches.</p>
          )}
          {filtered.map((cmd, index) => (
            <div key={cmd.id}>
              {cmd.showGroup && (
                <p className="mt-2 px-3 pb-1 label-mono text-faint first:mt-1">
                  {cmd.group}
                </p>
              )}
              <button
                type="button"
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => runCommand(cmd)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                  index === activeIndex ? "bg-surface-2 text-text" : "text-muted"
                }`}
              >
                {cmd.label}
                {index === activeIndex && <span className="text-accent">↵</span>}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

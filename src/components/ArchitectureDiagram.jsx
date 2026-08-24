import { useEffect, useState } from "react";

/**
 * Walks through the real request path for a booking write, one step at a time,
 * so the concurrency story is visible rather than described.
 */
const STEPS = [
  {
    id: "request",
    title: "POST /bookings",
    detail: "React form submits a validated DTO. Client already pre-checked availability — the server never trusts that.",
  },
  {
    id: "lock",
    title: "pg_advisory_xact_lock(sku)",
    detail: "Transaction opens and takes an advisory lock keyed on the outfit SKU. A second concurrent booking for the same outfit blocks here.",
  },
  {
    id: "check",
    title: "AvailabilityService.check()",
    detail: "Single source of truth: rental-window overlap, cleaning-buffer window, and fitting-date collisions in both directions.",
  },
  {
    id: "commit",
    title: "COMMIT / ROLLBACK",
    detail: "Clear → insert booking and commit, releasing the lock. Conflict → roll back with a 409 naming the conflicting booking.",
  },
];

export default function ArchitectureDiagram() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setActive((i) => (i + 1) % STEPS.length), 2600);
    return () => clearInterval(id);
  }, [playing]);

  return (
    <div className="rounded-2xl border border-border bg-bg/60 p-5 sm:p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="label-mono text-accent">Request path</p>
          <p className="mt-1.5 text-sm text-muted">
            How one booking write actually travels through the system.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="label-mono rounded-full border border-border px-3 py-1.5 text-faint transition-colors hover:border-accent hover:text-accent"
        >
          {playing ? "Pause" : "Play"}
        </button>
      </div>

      <ol className="space-y-2">
        {STEPS.map((step, i) => {
          const isActive = i === active;
          const isPast = i < active;
          return (
            <li key={step.id}>
              <button
                type="button"
                onClick={() => {
                  setActive(i);
                  setPlaying(false);
                }}
                className={`flex w-full gap-4 rounded-xl border p-4 text-left transition-all duration-500 ${
                  isActive
                    ? "border-accent/60 bg-accent/8"
                    : "border-border bg-transparent hover:border-border-strong"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[10px] transition-colors ${
                    isActive
                      ? "bg-accent text-[#17110c]"
                      : isPast
                        ? "bg-accent/25 text-accent"
                        : "bg-surface-2 text-faint"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="min-w-0">
                  <span
                    className={`block font-mono text-[13px] transition-colors ${
                      isActive ? "text-accent" : "text-text"
                    }`}
                  >
                    {step.title}
                  </span>
                  <span
                    className={`mt-1.5 block overflow-hidden text-[13px] leading-relaxed text-muted transition-all duration-500 ${
                      isActive ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    {step.detail}
                  </span>
                </span>
              </button>

              {i < STEPS.length - 1 && (
                <div className="ml-7 h-3 w-px bg-border" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

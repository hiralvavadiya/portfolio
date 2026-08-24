import { useMemo, useState } from "react";

/**
 * A client-side reproduction of the Outfit Rental System's availability rule:
 * an outfit is unavailable for its rental window AND for a cleaning-buffer
 * window afterwards, and a fitting date may not fall inside either.
 *
 * Mirrors the real AvailabilityService logic so visitors can poke at the
 * actual edge cases rather than read about them.
 */

const DAY = 86400000;
const MONTH_START = new Date(2026, 8, 1); // Sep 2026
const DAYS_IN_MONTH = 30;

const EXISTING = { start: 8, end: 12, customer: "Meera S.", fitting: 4 };

const dayLabel = (d) =>
  new Date(MONTH_START.getTime() + (d - 1) * DAY).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });

function overlaps(aStart, aEnd, bStart, bEnd) {
  return aStart <= bEnd && bStart <= aEnd;
}

export default function BookingPlayground() {
  // Defaults land on a clean booking so the happy path reads first.
  const [bufferDays, setBufferDays] = useState(2);
  const [start, setStart] = useState(18);
  const [nights, setNights] = useState(3);
  const [fitting, setFitting] = useState(16);

  const end = start + nights - 1;

  // Existing booking blocks its rental window plus the cleaning buffer after it.
  const blockedEnd = EXISTING.end + bufferDays;

  const result = useMemo(() => {
    const rentalConflict = overlaps(start, end, EXISTING.start, blockedEnd);
    const bufferOnly =
      rentalConflict && start > EXISTING.end && start <= blockedEnd;
    const fittingConflict = fitting >= EXISTING.start && fitting <= blockedEnd;
    const fittingVsNew = fitting >= start && fitting <= end;

    if (rentalConflict) {
      return {
        ok: false,
        code: bufferOnly ? "CLEANING_BUFFER" : "RENTAL_OVERLAP",
        message: bufferOnly
          ? `Rejected — outfit is in cleaning until ${dayLabel(blockedEnd)} after ${EXISTING.customer}'s rental.`
          : `Rejected — overlaps ${EXISTING.customer}'s rental (${dayLabel(EXISTING.start)}–${dayLabel(EXISTING.end)}).`,
      };
    }
    if (fittingConflict) {
      return {
        ok: false,
        code: "FITTING_COLLISION",
        message: `Rejected — fitting on ${dayLabel(fitting)} falls inside the blocked window.`,
      };
    }
    if (fittingVsNew) {
      return {
        ok: false,
        code: "FITTING_IN_RENTAL",
        message: `Rejected — fitting on ${dayLabel(fitting)} is inside this booking's own rental window.`,
      };
    }
    return {
      ok: true,
      code: "AVAILABLE",
      message: `Available — ${dayLabel(start)} to ${dayLabel(end)} is clear.`,
    };
  }, [start, end, fitting, blockedEnd]);

  const cellState = (d) => {
    if (d >= start && d <= end) return "new";
    if (d >= EXISTING.start && d <= EXISTING.end) return "booked";
    if (d > EXISTING.end && d <= blockedEnd) return "buffer";
    return "free";
  };

  const cellClass = {
    booked: "bg-accent-deep/70 text-text border-accent-deep",
    buffer: "bg-accent/15 text-accent border-accent/30 border-dashed",
    new: result.ok
      ? "bg-accent text-[#17110c] border-accent font-semibold"
      : "bg-red-500/25 text-red-300 border-red-500/50 font-semibold",
    free: "bg-surface-2/40 text-faint border-border",
  };

  return (
    <div className="rounded-2xl border border-border bg-bg/60 p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="label-mono text-accent">Try it — September 2026</p>
          <p className="mt-1.5 text-sm text-muted">
            Move the booking and watch the real conflict rules fire.
          </p>
        </div>
        <span
          className={`label-mono rounded-full border px-3 py-1.5 ${
            result.ok
              ? "border-accent/50 bg-accent/10 text-accent"
              : "border-red-500/50 bg-red-500/10 text-red-300"
          }`}
        >
          {result.code}
        </span>
      </div>

      {/* Calendar */}
      <div className="grid grid-cols-10 gap-1.5">
        {Array.from({ length: DAYS_IN_MONTH }, (_, i) => i + 1).map((d) => {
          const state = cellState(d);
          const isFitting = d === fitting;
          return (
            <div
              key={d}
              title={`${dayLabel(d)} — ${state}`}
              className={`relative flex aspect-square items-center justify-center rounded-md border font-mono text-[11px] transition-colors ${cellClass[state]}`}
            >
              {d}
              {isFitting && (
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-text font-mono text-[8px] font-bold text-bg">
                  F
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        {[
          ["bg-accent-deep/70", `Booked · ${EXISTING.customer}`],
          ["bg-accent/15 border border-dashed border-accent/40", "Cleaning buffer"],
          ["bg-accent", "Your booking"],
          ["bg-text", "F = fitting date"],
        ].map(([cls, label]) => (
          <span key={label} className="flex items-center gap-2 font-mono text-[10px] text-faint">
            <span className={`h-2.5 w-2.5 rounded-sm ${cls}`} />
            {label}
          </span>
        ))}
      </div>

      {/* Controls */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Slider
          label="Start day"
          value={start}
          min={1}
          max={DAYS_IN_MONTH - nights + 1}
          onChange={setStart}
          display={dayLabel(start)}
        />
        <Slider
          label="Nights"
          value={nights}
          min={1}
          max={7}
          onChange={(v) => {
            setNights(v);
            if (start + v - 1 > DAYS_IN_MONTH) setStart(DAYS_IN_MONTH - v + 1);
          }}
          display={`${nights} night${nights > 1 ? "s" : ""}`}
        />
        <Slider
          label="Fitting date"
          value={fitting}
          min={1}
          max={DAYS_IN_MONTH}
          onChange={setFitting}
          display={dayLabel(fitting)}
        />
        <Slider
          label="Cleaning buffer"
          value={bufferDays}
          min={0}
          max={5}
          onChange={setBufferDays}
          display={`${bufferDays} day${bufferDays === 1 ? "" : "s"}`}
        />
      </div>

      {/* Verdict */}
      <div
        className={`mt-6 rounded-xl border p-4 ${
          result.ok
            ? "border-accent/40 bg-accent/8"
            : "border-red-500/40 bg-red-500/8"
        }`}
      >
        <p className="font-mono text-[11px] text-faint">
          POST /bookings → AvailabilityService.check()
        </p>
        <p className={`mt-2 text-sm ${result.ok ? "text-accent" : "text-red-300"}`}>
          {result.message}
        </p>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-faint">
        In the real system this check runs inside a{" "}
        <code className="font-mono text-muted">pg_advisory_xact_lock</code> transaction, so two
        staff members booking the same outfit at the same moment can't both succeed.
      </p>
    </div>
  );
}

function Slider({ label, value, min, max, onChange, display }) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between">
        <span className="label-mono text-faint">{label}</span>
        <span className="font-mono text-[11px] text-text">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-[var(--color-accent)]"
      />
    </label>
  );
}

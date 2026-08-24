import { useEffect, useState } from "react";
import { nav, profile } from "../data/portfolio";

const isMac =
  typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform ?? navigator.userAgent);

export default function Navbar({ onOpenPalette }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = nav.map((item) => document.querySelector(item.href)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-border bg-bg/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="display-xl text-xl tracking-tight text-text"
        >
          Hiral<span className="text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  active === item.href.slice(1)
                    ? "bg-surface-2 text-accent"
                    : "text-muted hover:text-text"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2.5 md:flex">
          <button
            type="button"
            onClick={onOpenPalette}
            aria-label="Open command palette"
            className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.34-4.34M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" />
            </svg>
            <kbd className="font-mono text-[11px]">{isMac ? "⌘" : "Ctrl"}K</kbd>
          </button>
          <a
            href={profile.resumeUrl}
            download
            className="rounded-full bg-text px-4 py-2 text-sm font-semibold text-bg transition-colors hover:bg-accent"
          >
            Résumé
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-text md:hidden"
        >
          {open ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5h16.5M3.75 16.5h16.5" />
            </svg>
          )}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-bg/97 px-5 pb-8 pt-4 backdrop-blur-xl md:hidden">
          <ul className="flex flex-col">
            {nav.map((item, i) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`flex items-baseline gap-4 border-b border-border py-4 transition-colors ${
                    active === item.href.slice(1) ? "text-accent" : "text-muted"
                  }`}
                >
                  <span className="label-mono text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="display-xl text-2xl">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onOpenPalette();
              }}
              className="flex-1 rounded-full border border-border py-3 text-sm font-medium text-muted"
            >
              Quick search
            </button>
            <a
              href={profile.resumeUrl}
              download
              className="flex-1 rounded-full bg-accent py-3 text-center text-sm font-semibold text-[#17110c]"
            >
              Résumé
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

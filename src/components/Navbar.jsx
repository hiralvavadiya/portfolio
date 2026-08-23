import { useEffect, useState } from "react";
import { nav, profile } from "../data/portfolio";

const isMac =
  typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform ?? navigator.userAgent);

export default function Navbar({ onOpenPalette }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = nav
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-bg/85 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-5 sm:px-8 h-16">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="font-display font-semibold text-lg tracking-tight text-text"
        >
          Hiral<span className="text-accent">.</span>dev
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  active === item.href.slice(1) ? "text-accent" : "text-muted"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenPalette}
            className="inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-2 text-sm font-medium text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.34-4.34M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" />
            </svg>
            <kbd className="text-xs">{isMac ? "⌘" : "Ctrl"}K</kbd>
          </button>
          <a
            href={profile.resumeUrl}
            download
            className="inline-flex items-center rounded-full border border-border px-4 py-2 text-sm font-medium text-text hover:border-accent hover:text-accent transition-colors"
          >
            Resume
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-text"
        >
          <span className="sr-only">Toggle menu</span>
          {open ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            </svg>
          )}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-border bg-bg/95 backdrop-blur-md px-5 pb-6 pt-2">
          <ul className="flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`block rounded-lg px-3 py-3 text-base font-medium transition-colors ${
                    active === item.href.slice(1) ? "text-accent bg-surface" : "text-muted hover:text-text"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onOpenPalette();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-border px-3 py-3 text-base font-medium text-muted hover:border-accent hover:text-accent"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.34-4.34M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" />
                </svg>
                Quick Search
              </button>
            </li>
            <li className="pt-2">
              <a
                href={profile.resumeUrl}
                download
                className="block rounded-lg border border-border px-3 py-3 text-center text-base font-medium text-text hover:border-accent hover:text-accent"
              >
                Download Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

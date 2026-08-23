import { profile } from "../data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-border px-5 py-8 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} {profile.name}. Built with React &amp; Tailwind.</p>
        <div className="flex items-center gap-6">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`} className="hover:text-accent">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}

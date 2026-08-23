import { useState } from "react";
import { profile } from "../data/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const initialForm = { name: "", email: "", message: "" };

const socials = [
  { label: "Email", href: `mailto:${profile.email}`, value: profile.email },
  { label: "GitHub", href: profile.github, value: "github.com/hiralvavadiya" },
  { label: "LinkedIn", href: profile.linkedin, value: "linkedin.com/in/hiral-vavadiya" },
];

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Please enter a valid email.";
    if (!form.message.trim() || form.message.trim().length < 10) {
      next.message = "Message should be at least 10 characters.";
    }
    return next;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;

    setStatus("sent");
    setForm(initialForm);
    window.setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section id="contact" className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something together"
          description="Have a role, project, or just want to say hi? My inbox is open."
        />

        <div className="grid gap-10 md:grid-cols-5">
          <Reveal delay={100} className="md:col-span-2">
            <ul className="space-y-4">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={social.label === "Email" ? undefined : "_blank"}
                    rel={social.label === "Email" ? undefined : "noopener noreferrer"}
                    className="group flex items-center justify-between rounded-2xl border border-border bg-surface px-5 py-4 transition-colors hover:border-accent/50"
                  >
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-wide text-muted">
                        {social.label}
                      </span>
                      <span className="block text-sm font-medium text-text group-hover:text-accent">
                        {social.value}
                      </span>
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-muted group-hover:text-accent">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H18m0 0v4.5M18 6l-8 8M6 12v6a1 1 0 0 0 1 1h6" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={200} className="md:col-span-3">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-text">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text outline-none transition-colors focus:border-accent"
                  placeholder="Your name"
                />
                {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-text">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text outline-none transition-colors focus:border-accent"
                  placeholder="you@example.com"
                />
                {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-text">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full resize-none rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text outline-none transition-colors focus:border-accent"
                  placeholder="Tell me a bit about the opportunity or project..."
                />
                {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-[#05070a] transition-transform hover:scale-[1.02] hover:brightness-110"
              >
                Send Message
              </button>

              {status === "sent" && (
                <p className="text-sm text-accent">
                  Your email client should now be open with the message ready to send.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

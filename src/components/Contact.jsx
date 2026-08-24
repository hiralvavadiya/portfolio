import { useState } from "react";
import { profile } from "../data/portfolio";
import useGsapReveal from "../hooks/useGsapReveal";
import Magnetic from "./Magnetic";
import SectionHeading from "./SectionHeading";

const initialForm = { name: "", email: "", message: "" };

const socials = [
  { label: "Email", href: `mailto:${profile.email}`, value: profile.email },
  { label: "GitHub", href: profile.github, value: "github.com/hiralvavadiya" },
  { label: "LinkedIn", href: profile.linkedin, value: "linkedin.com/in/hiral-vavadiya" },
];

const fieldClass =
  "w-full border-b border-border bg-transparent px-0 py-3.5 text-[15px] text-text outline-none transition-colors placeholder:text-faint focus:border-accent";

export default function Contact() {
  const ref = useGsapReveal();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Please enter a valid email.";
    if (form.message.trim().length < 10) next.message = "Message should be at least 10 characters.";
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
    <section id="contact" ref={ref} className="px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="06"
          eyebrow="Contact"
          title="Let's build something"
          description="Have a role, a project, or a problem worth solving? My inbox is open."
        />

        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <ul className="border-t border-border">
              {socials.map((social) => (
                <li key={social.label} data-reveal>
                  <a
                    href={social.href}
                    target={social.label === "Email" ? undefined : "_blank"}
                    rel={social.label === "Email" ? undefined : "noopener noreferrer"}
                    className="group flex items-center justify-between gap-4 border-b border-border py-5 transition-colors hover:border-accent"
                  >
                    <span>
                      <span className="label-mono block text-faint">{social.label}</span>
                      <span className="mt-1.5 block text-[15px] text-text transition-colors group-hover:text-accent">
                        {social.value}
                      </span>
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 shrink-0 text-faint transition-all group-hover:translate-x-1 group-hover:text-accent">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0-6-6m6 6-6 6" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} noValidate className="space-y-7">
              <div data-reveal>
                <label htmlFor="name" className="label-mono mb-1 block text-faint">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  className={fieldClass}
                  placeholder="Your name"
                />
                {errors.name && <p className="mt-2 text-xs text-accent">{errors.name}</p>}
              </div>

              <div data-reveal>
                <label htmlFor="email" className="label-mono mb-1 block text-faint">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className={fieldClass}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="mt-2 text-xs text-accent">{errors.email}</p>}
              </div>

              <div data-reveal>
                <label htmlFor="message" className="label-mono mb-1 block text-faint">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className={`${fieldClass} resize-none`}
                  placeholder="Tell me about the role or project..."
                />
                {errors.message && <p className="mt-2 text-xs text-accent">{errors.message}</p>}
              </div>

              <div data-reveal className="pt-2">
                <Magnetic>
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-sm font-semibold text-[#17110c] transition-colors hover:bg-accent-strong"
                  >
                    Send message
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4 transition-transform group-hover:translate-x-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0-6-6m6 6-6 6" />
                    </svg>
                  </button>
                </Magnetic>
                {status === "sent" && (
                  <p className="mt-4 text-sm text-accent">
                    Your email client should now be open with the message ready to send.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

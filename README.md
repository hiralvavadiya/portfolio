# Hiral Vavadiya — Portfolio

A single-page portfolio for a Full Stack MERN Developer, built with React, Tailwind CSS and Vite.

## Getting started

```bash
npm install
npm run dev       # start local dev server
npm run build      # production build to dist/
npm run preview    # preview the production build
npm run lint        # oxlint
```

## Editing content

Almost everything on the page (name, tagline, skills, experience, projects, links) lives in
one file: **`src/data/portfolio.js`**. Edit that file and the whole site updates — no need to
touch component code for content changes.

Things you'll likely want to personalize before shipping:

- **`experience`** — replace `Company Name Pvt. Ltd.` / `Company Name` and the bullet metrics
  with your real employers and real numbers. Recruiters weight specific metrics heavily, so
  swap the placeholder `~40%` / "majority of active users" language for your actual impact.
- **`projects`** — replace the four placeholder projects with your real repos and live demo
  URLs. Keep the ones that show auth, CRUD, real-time features, or payments — that's what
  demonstrates full-stack depth.
- **`profile.resumeUrl`** — a placeholder one-page resume (`public/Hiral_Vavadiya_Resume.pdf`)
  built from the info in this prompt is wired up to the "Download Resume" buttons already.
  Replace that file with your real resume (same filename, or update `resumeUrl`).

## Contact form

The contact form validates client-side and then opens the visitor's email client via a
`mailto:` link pre-filled with their message (see `src/components/Contact.jsx`). This works
with zero backend and zero API keys, but it does require the visitor to have a mail client
configured.

To collect messages directly without opening a mail client, swap the `handleSubmit` body for
a POST to a form backend such as [Formspree](https://formspree.io) or
[EmailJS](https://www.emailjs.com/) — both have generous free tiers and a few lines of
integration.

## Deployment

This is a static Vite build, so it deploys as-is to Vercel, Netlify, GitHub Pages, or Render
static sites. On Vercel/Netlify: framework preset "Vite", build command `npm run build`,
output directory `dist`.

## Tech

React 19 · Tailwind CSS v4 · Vite · vanilla `IntersectionObserver` for scroll-reveal
animations (no animation library needed).

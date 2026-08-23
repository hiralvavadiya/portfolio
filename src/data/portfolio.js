// Central place to edit your info. Replace placeholder metrics/links with your real ones.

export const profile = {
  name: "Hiral Vavadiya",
  title: "Full Stack MERN Developer",
  tagline: "I build scalable web apps with clean UIs and solid backend architecture.",
  location: "Surat, Gujarat, India",
  email: "thisishiralvavadiya@gmail.com",
  github: "https://github.com/hiralvavadiya",
  linkedin: "https://www.linkedin.com/in/hiral-vavadiya/",
  resumeUrl: "/Hiral_Vavadiya_Resume.pdf",
};

export const about = {
  paragraph:
    "I'm a Full Stack Developer with 2 years of hands-on experience across the MERN stack — 1 year as an intern and 1 year in a professional role. I enjoy turning ambiguous requirements into clean, working software, whether that's a REST API, an authentication flow, or a polished React UI. I care about readable code, sensible architecture, and shipping features that hold up in production, and I'm always looking for the next problem worth solving.",
};

export const skills = [
  {
    category: "Frontend",
    items: ["React", "Redux", "Tailwind CSS", "HTML5", "CSS3", "JavaScript (ES6+)"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "JWT Authentication"],
  },
  {
    category: "Database",
    items: ["MongoDB", "Mongoose"],
  },
  {
    category: "Tools & Workflow",
    items: ["Git", "GitHub", "Postman", "VS Code", "Vercel", "Render", "Notion", "Linear", "Jira", "Jibble"],
  },
  {
    category: "Also Exploring",
    items: ["TypeScript", "Next.js", "Docker"],
  },
];

export const experience = [
  {
    company: "Company Name Pvt. Ltd.",
    role: "Full Stack Developer",
    duration: "1 yr · Full-time",
    period: "2025 — Present",
    bullets: [
      "Optimized key REST API endpoints (query indexing + response payload trimming), cutting average response time by ~40%.",
      "Designed and shipped a customer-facing feature end-to-end (React + Node/Express + MongoDB), adopted by the majority of active users within the first month.",
      "Implemented JWT-based authentication and role-based access control, replacing a legacy session system and reducing auth-related support tickets.",
    ],
  },
  {
    company: "Company Name (Internship)",
    role: "MERN Stack Intern",
    duration: "1 yr · Internship",
    period: "2024 — 2025",
    bullets: [
      "Built and shipped CRUD modules end-to-end using React, Express and MongoDB under senior developer guidance.",
      "Learned to write and consume REST APIs, handle async data flows, and structure a full-stack app for maintainability.",
      "Contributed bug fixes and small features to a production codebase, working with Git workflows and code review.",
    ],
  },
];

export const projects = [
  {
    name: "Outfit Rental System",
    description:
      "An enterprise-style rental management system for wedding-outfit businesses — inventory, bookings, payments and real-time availability, built as an Nx monorepo.",
    tech: [
      "NestJS",
      "TypeORM",
      "PostgreSQL",
      "React 19",
      "TanStack Router/Query",
      "MUI",
      "Nx",
      "Docker",
      "GitHub Actions",
    ],
    demo: null,
    github: null,
    note: "Private repository — happy to walk through the code live.",
    status: "In active development",
    caseStudy: {
      summary:
        "A rental-management system for a wedding-outfit business: tracking inventory across cleaning cycles, handling multi-stage bookings (fitting → rental → return), and reconciling deposits and payments per customer — without double-booking an outfit that's still at the dry cleaner.",
      role:
        "Solo full-stack build: schema design, API, and the internal admin UI, structured as an Nx monorepo so the backend and frontend share tooling and can ship independently.",
      architecture: [
        "NestJS + TypeORM + PostgreSQL backend, schema managed entirely through versioned migrations (synchronize is always off) — every migration ships with a working down().",
        "React 19 frontend on Vite, using TanStack Router for typed routing, TanStack Query for server state, and TanStack Form — MUI on top for a consistent admin UI.",
        "Domain split into four modules: Inventory (outfit catalog, media, a full audit-trail/timeline per item), Booking, Payment (transactions, refunds, deposits, a running customer ledger), and Availability.",
        "Swagger/OpenAPI generated straight from the NestJS decorators, so the API is self-documenting at /docs.",
        "Dockerized Postgres for local dev, CI on GitHub Actions running lint, typecheck and tests on every PR.",
      ],
      highlights: [
        "Availability is the hard part of this domain: an outfit can't be rebooked the moment it's returned — it needs a cleaning-buffer window first. I built a single AvailabilityService as the source of truth for conflict checks, used by both the booking guards and the inventory endpoints, so the rule lives in exactly one place.",
        "Booking creation runs the conflict check inside a pg_advisory_xact_lock transaction, so two concurrent bookings for the same outfit can't both succeed — a real race condition in a rental system, not a hypothetical one.",
        "The frontend checks availability live while a staff member fills out a booking — debounced query against the outfit's calendar, a chip that flips between \"Available\" and \"Booked: <customer>\", and it blocks submission client-side before the request even reaches the API.",
        "I keep a running status document alongside the code that separates done / in-progress / not-started, and explicitly flags which code paths (the availability conflict logic, specifically) aren't yet covered by tests — tracking risk honestly rather than assuming it away.",
      ],
      whatsLeft: [
        "No auth/authorization layer yet — it's a single-tenant admin tool for now, not multi-user.",
        "No automated tests yet for the booking/inventory/payment/availability modules — typechecking and manual verification only so far.",
        "Not deployed yet — this is a local-first build; see the repo for setup instructions.",
      ],
    },
  },
  {
    name: "TaskFlow — Team Task Manager",
    description:
      "A full-stack task management app with authentication, role-based boards, and real-time status updates for teams.",
    tech: ["React", "Redux", "Node.js", "Express", "MongoDB", "JWT", "Socket.io"],
    demo: "https://taskflow-demo.vercel.app",
    github: "https://github.com/hiralvavadiya/taskflow",
  },
  {
    name: "ShopCart — E-commerce Platform",
    description:
      "A full-stack storefront with product catalog, cart, checkout and payment integration, plus an admin panel for order management.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Stripe", "JWT"],
    demo: "https://shopcart-demo.vercel.app",
    github: "https://github.com/hiralvavadiya/shopcart",
  },
  {
    name: "DevBlog — Full Stack Blogging Platform",
    description:
      "A blogging platform with JWT auth, rich-text post editing, comments, and a REST API deployed independently from the client.",
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT", "Render"],
    demo: "https://devblog-demo.vercel.app",
    github: "https://github.com/hiralvavadiya/devblog",
  },
];

export const nav = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

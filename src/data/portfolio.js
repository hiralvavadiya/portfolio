// Central place to edit your info — the whole site reads from this file.

export const profile = {
  name: "Hiral Vavadiya",
  title: "Full Stack Developer",
  tagline: "I build scalable web apps with clean UIs and solid backend architecture.",
  location: "Surat, Gujarat, India",
  email: "thisishiralvavadiya@gmail.com",
  phone: "+91 9106833379",
  github: "https://github.com/hiralvavadiya",
  linkedin: "https://www.linkedin.com/in/hiral-vavadiya/",
  resumeUrl: "/Hiral_Vavadiya_Resume.pdf",
  openToWork: true,
};

export const about = {
  paragraph:
    "I'm a Full Stack Developer with just over 2 years of hands-on experience — a year building frontends at Serialcom Infotech, then a year and change owning features end-to-end at Theta Solutions. I've shipped real-time systems with WebSockets, REST APIs on Node and Express, and React interfaces that people actually use every day. I like problems where the domain logic is the hard part, not just the wiring, and I care about writing code that still makes sense six months later.",
};

export const skills = [
  {
    category: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "Redux",
      "JavaScript (ES6+)",
      "TypeScript",
      "Tailwind CSS",
      "Material-UI",
      "Bootstrap",
      "HTML5",
      "CSS3",
    ],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "WebSockets", "Socket.io"],
  },
  {
    category: "Database",
    items: ["MongoDB", "Mongoose", "MySQL"],
  },
  {
    category: "Tools & Workflow",
    items: ["Git", "GitHub", "VS Code", "Postman", "Notion", "Linear", "Jira", "Jibble"],
  },
  {
    category: "Also Worked With",
    items: ["Python", "C++", "C#", "GSAP", "Spline / 3D", "OOP", "Data Science"],
  },
];

export const experience = [
  {
    company: "Theta Solutions",
    role: "Full Stack Developer",
    duration: "1 yr 2 mos · Full-time · On-site",
    period: "Jun 2025 — Jul 2026",
    bullets: [
      "Owned features end-to-end across the stack — REST APIs on Node.js and Express, backed by MongoDB, through to the React interfaces built on top of them.",
      "Worked on custom software delivered to external clients, translating requirements into working features rather than picking up pre-specified tickets.",
      "Collaborated in a small team using Git workflows, code review, and Linear/Jira for tracking.",
    ],
  },
  {
    company: "Serialcom Infotech",
    role: "Frontend Developer — Internship",
    duration: "1 yr · Internship · On-site",
    period: "May 2024 — Apr 2025",
    bullets: [
      "Built SmartScorer.com, a live cricket scoring platform — real-time scoring and match management over WebSockets, with responsive UIs for live scoring, auctions, profiles and admin match control.",
      "Implemented role-based login and dynamic content updates across the platform, using Next.js, React and MUI.",
      "Built IDO PDF, a PDF editor and converter supporting images (JPG/PNG/TIFF), text and Word documents to PDF and back — focused on cross-browser compatibility and performance.",
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
      interactive: true,
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
        "Not deployed yet — this is a local-first build.",
      ],
    },
  },
  {
    name: "Student Application Portal",
    description:
      "A full-stack admissions portal with application form submission, document upload, and a dashboard that updates in real time as new applications arrive.",
    tech: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB", "REST API"],
    demo: null,
    github: "https://github.com/hiralvavadiya/student-application-portal",
  },
  {
    name: "Device Tracker — Live Location",
    description:
      "Real-time device tracking with live location updates and dynamic map markers, pushed over Socket.io rather than polled.",
    tech: ["Node.js", "Express", "Socket.io", "REST API"],
    demo: null,
    github: "https://github.com/hiralvavadiya/device-tracker",
  },
  {
    name: "3D Solar System",
    description:
      "An interactive 3D solar system built for the NASA Space Apps Challenge — winner of the Best Use of Science award.",
    tech: ["TypeScript", "Spline", "3D Models", "Git"],
    demo: null,
    github: null,
    note: "NASA Space Apps Challenge · Best Use of Science Award",
    status: "Award winner",
  },
  {
    name: "Significo Clone — Healthcare Website",
    description:
      "A polished healthcare marketing site with GSAP animations and Locomotive Scroll, built to practise motion design and smooth-scroll interaction.",
    tech: ["HTML", "Tailwind CSS", "JavaScript", "GSAP", "Locomotive Scroll"],
    demo: null,
    github: "https://github.com/hiralvavadiya/significo-clone",
  },
];

export const education = [
  {
    institution: "Shree Ram Krishna Institute of Computer Education and Applied Science",
    credential: "Bachelor of Science — Computer Science",
    detail: "Sarvajanik College of Engineering & Technology · Surat, Gujarat · SGPA 8.40",
    period: "Jul 2022 — Jul 2025",
  },
  {
    institution: "Creative Digital Multimedia Institute",
    credential: "Full-Stack Developer (MERN) — Certification",
    detail: "Hands-on MERN stack training",
    period: "Mar 2023 — Mar 2024",
  },
];

export const nav = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

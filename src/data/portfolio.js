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
    name: "ChatSphere — Real-Time Chat App",
    description:
      "A real-time messaging app with private and group rooms, typing indicators, and online-status presence.",
    tech: ["React", "Node.js", "Express", "Socket.io", "MongoDB"],
    demo: "https://chatsphere-demo.vercel.app",
    github: "https://github.com/hiralvavadiya/chatsphere",
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

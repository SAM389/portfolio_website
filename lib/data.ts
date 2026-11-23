// ─────────────────────────────────────────────────────────────
//  Everything on the portfolio comes from this file.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Belim Safwan Khan",
  role: "Full-Stack Engineer · Gen AI",
  tagline:
    "Full-stack engineer building Gen AI into products people actually use: Next.js, PostgreSQL, real-time and LLMs.",
  location: "Ahmedabad, India",
  availability: "Open to relocation & remote",
  timeZone: "Asia/Kolkata",
  email: "safwan918273645@gmail.com",
  openToWork: true,
  now: "Building VeriCode",
  bio: {
    short:
      "Full-stack engineer shipping Gen AI products: web apps, LLM features and AI agent tooling.",
    long: [
      "I'm a full-stack software engineer who builds Gen AI into products people actually use. I take a feature from the database to the UI, wire in an LLM where it saves someone time, and then check that it really works.",
      "At Swastho, a live multi-role healthcare platform, I own the Next.js/React frontend, the PostgreSQL/Supabase backend, auth, RBAC and real-time workflows. I also built its Gemini-powered features: an AI prescription assistant that drafts prescriptions for doctors to review, and a symptom summarizer that briefs them before each consultation.",
      "On the AI-tooling side I built VeriCode, which stops AI coding agents from shipping made-up packages and versions. It plugs into Claude Code and other agents as an MCP server and an Agent Skill, checks facts against PyPI instead of asking another model, and caught 10 out of 10 planted errors with zero false alarms on its benchmark.",
      "I'm strongest in TypeScript, React, Next.js, Node.js, Python and PostgreSQL. I've also shipped cross-platform Flutter apps such as Split Trip, with offline-first sync and 100% unit-test coverage of its core logic.",
      "B.Tech in Computer Science & Engineering, Karnavati University (2022 – 2026). Based in Ahmedabad, India, open to relocation and remote work.",
    ],
  },
  stats: [
    { value: "15+", label: "Postgres tables" },
    { value: "2", label: "Gemini AI features" },
    { value: "10/10", label: "AI errors caught" },
  ],
};

export type Social = {
  label: string;
  handle: string;
  href: string;
  icon: "github" | "linkedin" | "x";
};

const allSocials: Social[] = [
  { label: "GitHub", handle: "SAM389", href: "https://github.com/SAM389", icon: "github" },
  {
    label: "LinkedIn",
    handle: "in/safwan-khan-002806204",
    href: "https://www.linkedin.com/in/safwan-khan-002806204",
    icon: "linkedin",
  },
  { label: "X", handle: "@Safwan24438702", href: "https://x.com/Safwan24438702", icon: "x" },
];

// Links with an empty href are hidden.
export const socials = allSocials.filter((s) => s.href);

export const skillGroups: { title: string; skills: string[] }[] = [
  {
    // Each one is backed by a project: Swastho (Gemini features) and VeriCode (Python, MCP server, Agent Skill).
    // Keep five short keys per group: the home tile fits one row each at 1280px wide.
    title: "Gen AI",
    skills: ["Gemini API", "Python", "MCP", "Agent Skills", "Prompt design"],
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Flutter"],
  },
  {
    title: "Backend & DevOps",
    skills: ["Node.js", "PostgreSQL", "Supabase", "Docker", "GitHub Actions"],
  },
];

export const featured = {
  name: "swastho.in",
  href: "https://swastho.in",
  myRole: "Full-Stack Engineer",
  period: "May 2026 – Present",
  tagline: "A clinic companion for patients, doctors and clinics.",
  summary:
    "Book a slot at a nearby clinic, watch the token queue move on your phone instead of a waiting-room bench, and keep every prescription, bill and report in one place.",
  audiences: ["Patients", "Doctors", "Clinics"],
  why: "At most neighbourhood clinics you take a paper token and wait on a bench with no idea how long it will take, and the doctor sees you without knowing why you came. Afterwards the prescription, the bill and the reports end up as loose paper that's gone by the next visit. I built Swastho so the wait happens at home, the doctor is briefed before you walk in, and your history stays with you.",
  solved: [
    "Patients book a slot and watch their queue position live, so they leave home on time instead of waiting in the clinic.",
    "Doctors get a symptom summary before each consultation and an AI-drafted prescription they review and edit.",
    "Clinics run walk-ins and booked patients in one live queue, and generate and settle bills in the same place.",
    "Prescriptions, bills and reports stay together behind one personal QR code, across visits and clinics.",
  ],
  highlights: [
    "Role-specific Next.js, React and TypeScript apps for patients, doctors and clinics, deployed with Docker and GitHub Actions CI/CD.",
    "PostgreSQL/Supabase backend with 15+ relational tables, RBAC, Row-Level Security across 12+ tables and RPC-based authorization.",
    "Appointment scheduling, automated booking slots and a real-time queue, with 28 notification types over FCM/APNs, Twilio SMS, WhatsApp and email.",
    "Gemini-powered AI prescription assistant and a symptom summarizer that briefs doctors before each consultation.",
  ],
  steps: [
    { title: "Book", text: "Pick a clinic, a doctor and a time. Your token arrives instantly." },
    { title: "Track", text: "Your place in the queue updates live, so you leave home on time." },
    { title: "Carry", text: "Prescriptions, bills and reports live behind one personal QR." },
  ],
  roles: [
    {
      title: "For patients",
      points: [
        "Book with a doctor at a clinic nearby",
        "Watch the queue position move in real time",
        "Prescriptions, bills and reports in one QR",
      ],
    },
    {
      title: "For doctors",
      points: [
        "A weekly schedule per associated clinic",
        "Run the queue: start, defer, complete",
        "AI-drafted prescriptions, then edit them",
      ],
    },
    {
      title: "For clinics",
      points: [
        "Invite doctors and manage the roster",
        "Book walk-ins against the live queue",
        "Generate, finalise and settle bills",
      ],
    },
  ],
  stack: [
    "Next.js",
    "React",
    "TypeScript",
    "PostgreSQL",
    "Supabase",
    "RLS & RBAC",
    "Docker",
    "GitHub Actions",
    "Gemini",
    "Twilio",
    "FCM/APNs",
  ],
};

export type Metric = { value: string; label: string };

export type Project = {
  name: string;
  /** Shown first on /projects, side by side with the featured product. */
  spotlight?: boolean;
  tagline?: string;
  blurb: string;
  tags: string[];
  /** GitHub repository. */
  href?: string;
  /** A live demo, if there is one. */
  live?: { label: string; href: string };
  period?: string;
  /** Why I built it: the problem, in a paragraph. */
  why?: string;
  /** What it solves, one point each. */
  solved?: string[];
  /** Headline numbers. */
  metrics?: Metric[];
  /** How it's built. */
  highlights?: string[];
};

export const projects: Project[] = [
  {
    name: "VeriCode",
    spotlight: true,
    tagline: "AI writes the code. VeriCode checks the facts.",
    blurb:
      "Stops AI coding agents from shipping made-up packages and versions. Checked against PyPI, never an LLM.",
    tags: ["Python", "MCP", "PyPI", "Pyodide"],
    href: "https://github.com/SAM389/veri_code",
    live: { label: "Try it live", href: "https://veri-code.web.app/" },
    period: "Nov 2026",
    why: "AI coding agents sometimes import packages or pin versions that don't exist. In a study of 576,000 code samples from 16 models, at least 5.2% of packages suggested by commercial models (21.7% for open-source ones) were made up. Attackers register those invented names on PyPI with malware inside and wait for someone to pip install them, which is called slopsquatting. I wanted a check the agent runs on itself, right after it edits code, that answers with facts instead of another model's guess.",
    solved: [
      "Catches made-up packages, typos of real ones (\"Did you mean 'requests'?\") and versions that were never released, before anything is installed.",
      "Returns one verdict (PASS, WARN or BLOCK) with the file, the line and a fix hint, so the agent repairs its own code and checks again.",
      "Flags risky lookalikes (brand new, low downloads, one release) and packages that are imported but not declared.",
      "Private by default: only package names leave the machine, never the code, and it never installs anything.",
    ],
    metrics: [
      { value: "10/10", label: "planted errors caught" },
      { value: "0/10", label: "false alarms on clean code" },
      { value: "0.46s", label: "median check, cold" },
      { value: "138", label: "automated tests" },
      { value: "0.015s", label: "median check, cached" },
      { value: "~200", label: "import→package mappings" },
    ],
    highlights: [
      "Extract → resolve → look up → judge pipeline: Python's own ast parser and tomllib read imports, requirements*.txt and pyproject.toml (Poetry and dependency groups included).",
      "Resolves names that differ between import and install (cv2 → opencv-python, PIL → Pillow) and skips the standard library, local modules and try/except ImportError.",
      "Parallel PyPI JSON lookups cached for 24 hours; fails open with WARN if PyPI is unreachable, so it never raises a false BLOCK.",
      "Ships as a CLI (CI-friendly exit codes, --diff mode, JSON output), an MCP server for Claude Code and other agents, and an Agent Skill.",
      "A browser playground runs the same checker client-side with Pyodide, so pasted code never leaves the page.",
      "20-case benchmark against live PyPI plus an offline pytest suite, linted with ruff and run in GitHub Actions CI.",
    ],
  },
  {
    name: "Split Trip",
    blurb: "Offline-first expense splitting for group trips, with real-time sync.",
    tags: ["Flutter", "Firebase", "Riverpod"],
    href: "https://github.com/SAM389/split-trip",
    period: "Jan 2026",
    why: "On group trips one person pays for the cab, another for dinner, someone else in a different currency, and by the end nobody knows who owes whom. Most of it happens with patchy signal, so a splitter that needs a connection to save an expense gets abandoned halfway through the trip.",
    solved: [
      "Everyone on the trip sees the same expenses and balances, synced in real time across devices.",
      "Expenses can be added offline and sync on their own when the phone is back online.",
      "Settle-up suggests the fewest payments needed to clear every balance, instead of everyone paying everyone.",
      "Mixed currencies are converted to one base currency, and the trip exports to a PDF report.",
    ],
    metrics: [
      { value: "3", label: "split modes" },
      { value: "45", label: "unit tests on models" },
      { value: "2", label: "sign-in methods" },
    ],
    highlights: [
      "Clean architecture: models, repositories (Firestore and Storage), services and Riverpod providers, with GoRouter navigation.",
      "Equal, percentage and custom-amount splits, with per-expense notes and categories.",
      "Greedy cash-flow minimisation: net balances in the base currency, then the largest debtor is matched with the largest creditor until everyone is settled.",
      "Google and anonymous sign-in, with Firebase Security Rules protecting each trip's data.",
      "Category breakdowns with fl_chart and a shareable PDF export.",
    ],
  },
  {
    name: "The Diamond Story",
    blurb:
      "A desktop ERP for diamond cutting: rough lots, splits, process tracking, ledger and encrypted backups.",
    tags: ["Flutter", "SQLite", "Windows", "AES"],
    href: "https://github.com/SAM389/the_diamond_story",
    period: "Mar – May 2026",
    why: "A diamond-cutting business buys rough stones in lots, splits each lot into several diamonds and sends them out to different parties for cutting, polishing and grading, while money moves between suppliers, workers and customers. Keeping that in registers and spreadsheets makes it hard to know where a stone is, what it cost and who still has to be paid. The work also happens on an office PC with no reliable internet, so the data has to live on the machine and still travel safely.",
    solved: [
      "Traces every diamond from its rough lot through each process to the sale, with its status always up to date.",
      "Keeps suppliers, workers and customers in one ledger: purchases, sales, payments and expenses.",
      "Works fully offline on a Windows PC, installed with a one-click setup.",
      "Moves data from the office PC to a home laptop on a pendrive as a password-encrypted backup, restored exactly as it was.",
    ],
    metrics: [
      { value: "11", label: "SQLite tables" },
      { value: "256-bit", label: "AES encrypted backups" },
      { value: "100%", label: "offline, local-first" },
    ],
    highlights: [
      "Lot splitting: a rough lot such as LOT-001 is split into LOT-001A, LOT-001B and so on, each tracked on its own.",
      "Business rules enforced in the app: one active process per diamond, and weight after a process can never exceed the original.",
      "Backup exports every table to CSV, zips it and encrypts it with AES-256 (key derived from the password, random IV per file); restore reverses it.",
      "App password stored only as a hash, with a dashboard of KPIs, donut charts and PDF sale invoices.",
      "Repository and provider layers over sqflite, with the same code running in the browser on SQLite WASM; packaged with an Inno Setup installer.",
    ],
  },
  {
    name: "Django Blog Platform",
    blurb: "A full-stack blog with auth, ownership-based permissions, comments, likes and bookmarks.",
    tags: ["Django 5", "Python", "SQLite", "Bootstrap"],
    href: "https://github.com/SAM389/django-blog-platform",
    period: "Jan 2026",
    why: "I built this to learn how a server-rendered web app works end to end with Django: modelling data with the ORM, handling accounts and passwords properly, and making sure people can only change what they own. A blog is small enough to finish but touches all of those pieces.",
    solved: [
      "Readers can sign up, log in and reset a forgotten password by email.",
      "Writers publish posts with images, and only the author can edit or delete their own post.",
      "Readers comment on, like and bookmark posts, and browse by category or by author.",
      "Uploaded profile pictures are resized on save, so large images don't slow the site down.",
    ],
    metrics: [
      { value: "4", label: "categories" },
      { value: "6", label: "posts per page" },
      { value: "300px", label: "auto-resized avatars" },
    ],
    highlights: [
      "Class-based views with LoginRequiredMixin and UserPassesTestMixin guarding create, update and delete.",
      "Post, Comment and Profile models, with many-to-many relations for likes and bookmarks.",
      "A post_save signal creates each user's profile; Pillow thumbnails avatars down to 300×300.",
      "Gmail SMTP password reset, secrets kept in .env, and forms styled with Crispy Forms and Bootstrap 4.",
    ],
  },
  {
    name: "This portfolio",
    blurb: "A single-screen pixel bento with a pixel bat that flies when you poke it.",
    tags: ["Next.js 16", "Tailwind v4"],
  },
];

export const initials = profile.name
  .split(/\s+/)
  .filter(Boolean)
  .map((part) => part[0]?.toUpperCase())
  .join("");

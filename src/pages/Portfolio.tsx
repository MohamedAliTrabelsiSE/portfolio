import React, { useEffect, useMemo, useState } from "react";
import { portfolioData as data } from "../data/portfolioData";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ChevronDown,
  MapPin,
  Sun,
  Moon,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(() => "dark");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    const system = window.matchMedia?.("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    const initial = stored ?? system;
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  useEffect(() => {
    const mql = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!mql) return;
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        const next = e.matches ? "dark" : "light";
        setTheme(next);
        document.documentElement.classList.toggle("dark", next === "dark");
      }
    };
    mql.addEventListener?.("change", handler);
    return () => mql.removeEventListener?.("change", handler);
  }, []);

  const toggle = () => {
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      localStorage.setItem("theme", next);
      return next;
    });
  };

  return { theme, toggle };
}

function ThemeToggleButton({
  theme,
  onToggle,
}: {
  theme: "light" | "dark";
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="inline-flex items-center justify-center size-9 rounded-lg border border-line bg-raised text-ink hover:border-mint/40 dark:text-paper transition"
      aria-label="Toggle theme"
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

const SECTION_IDS = [
  "about",
  "craft",
  "work",
  "experience",
  "education",
  "contact",
] as const;

function useScrollSpy(ids: readonly string[], rootMargin = "-50% 0px -45% 0px") {
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (entry) => entry.isIntersecting && setActiveId(entry.target.id)
        ),
      { rootMargin }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids, rootMargin]);
  return activeId;
}

const smoothScrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const label = (id: string) =>
  ({
    about: "About",
    craft: "Craft",
    work: "Work",
    experience: "Experience",
    education: "Education",
    contact: "Contact",
  })[id] ?? id;

function ResumeButton({
  className,
  dropUp = false,
}: {
  className: string;
  dropUp?: boolean;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target?.closest("[data-resume-chooser]")) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div className="relative" data-resume-chooser>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={className}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <Download size={18} /> Resume
      </button>
      {open && (
        <div
          role="menu"
          className={`absolute left-0 z-20 min-w-[11rem] rounded-xl border border-line bg-white p-1 shadow-xl dark:bg-card ${
            dropUp ? "bottom-full mb-2" : "mt-2"
          }`}
        >
          <a
            role="menuitem"
            href="/resume-en.pdf?v=real"
            download="CV_Mohamed_Ali_Trabelsi_EN.pdf"
            className="block rounded-lg px-3 py-2 text-sm hover:bg-raised"
            onClick={() => setOpen(false)}
          >
            English
          </a>
          <a
            role="menuitem"
            href="/resume-fr.pdf?v=real"
            download="CV_Mohamed_Ali_Trabelsi_FR.pdf"
            className="block rounded-lg px-3 py-2 text-sm hover:bg-raised"
            onClick={() => setOpen(false)}
          >
            Français
          </a>
        </div>
      )}
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-3 py-1 text-xs rounded-full border border-line bg-raised text-ink dark:text-paper">
      {children}
    </span>
  );
}

function FlowBox({
  kicker,
  title,
  accent = false,
}: {
  kicker: string;
  title: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border px-3 py-3 text-center min-w-0 ${
        accent
          ? "border-mint/40 bg-mint/10"
          : "border-line bg-raised"
      }`}
    >
      <div className="text-[10px] uppercase tracking-[0.16em] text-mist">
        {kicker}
      </div>
      <div className="mt-1 text-sm font-semibold text-ink dark:text-paper">
        {title}
      </div>
    </div>
  );
}

function Architecture() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-mint-dim dark:text-mint font-semibold">
          Runtime
        </p>
        <p className="mt-1 text-sm text-mist">
          Clients to gateway to services. Models sit on the queue, not in every
          controller.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-[1fr,1fr,1fr,1fr] items-stretch">
          <FlowBox kicker="Clients" title="Web / Mobile" />
          <FlowBox kicker="Edge" title="Gateway / BFF" />
          <div className="grid gap-2">
            <FlowBox kicker="Identity" title="IAM" />
            <FlowBox kicker="Core" title="Domain services" />
            <FlowBox kicker="Workers" title="Jobs / notify / LLM" accent />
          </div>
          <FlowBox kicker="Data" title="SQL / Document" accent />
        </div>
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-mint-dim dark:text-mint font-semibold">
          Delivery
        </p>
        <p className="mt-1 text-sm text-mist">
          PR checks, then promote. Recette before prod. Secrets stay out of git.
        </p>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-3">
          <FlowBox kicker="PR" title="lint / tests" />
          <FlowBox kicker="CI" title="E2E / build" />
          <FlowBox kicker="Image" title="Docker" />
          <FlowBox kicker="Recette" title="gated promote" />
          <FlowBox kicker="Prod" title="web / API / mobile" accent />
        </div>
      </div>
    </div>
  );
}

export default function PortfolioDevX() {
  const { theme, toggle } = useTheme();
  const activeId = useScrollSpy(SECTION_IDS);
  const fade = useMemo(
    () => ({
      hidden: { opacity: 0, y: 16 },
      show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
    }),
    []
  );

  return (
    <div className="min-h-screen bg-paper text-ink dark:bg-ink dark:text-paper">
      <div
        aria-hidden
        className="fixed inset-0 -z-10 opacity-0 dark:opacity-100 transition-opacity bg-glow"
      />

      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-line bg-paper/80 pt-[env(safe-area-inset-top)] backdrop-blur dark:bg-ink/70">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 md:h-16">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex min-w-0 items-center gap-2.5"
            aria-label="Go to top"
          >
            <img
              src="/anime-avatar.png"
              alt=""
              className="size-8 shrink-0 rounded-full object-cover ring-2 ring-line md:size-9"
            />
            <span className="truncate font-semibold tracking-tight">
              {data.name}
            </span>
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {SECTION_IDS.map((id) => (
              <button
                key={id}
                onClick={() => smoothScrollTo(id)}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  activeId === id
                    ? "text-mint-dim dark:text-mint"
                    : "text-mist hover:text-ink dark:hover:text-paper"
                }`}
                aria-current={activeId === id ? "true" : undefined}
              >
                {label(id)}
              </button>
            ))}
            <ThemeToggleButton theme={theme} onToggle={toggle} />
          </div>
        </div>
      </nav>

      <header className="pt-24 md:pt-28">
        <div className="mx-auto max-w-6xl px-4">
          <motion.section
            variants={fade}
            initial="hidden"
            animate="show"
            className="relative grid md:grid-cols-[1.2fr,1fr] gap-6 rounded-3xl border border-line bg-white p-6 md:p-10 shadow-2xl dark:bg-card"
          >
            <div className="absolute left-0 top-6 bottom-6 w-1 rounded-full bg-mint hidden md:block" />
            <div className="flex flex-col justify-center md:pl-4">
              <p className="text-[11px] uppercase tracking-[0.22em] text-mint-dim dark:text-mint font-semibold">
                {data.title}
              </p>
              <h1 className="mt-2 text-3xl md:text-5xl font-extrabold leading-tight">
                Nice to meet you, I&apos;m{" "}
                <span className="text-ink dark:text-white">
                  {data.name.split(" ").slice(0, 2).join(" ")}
                </span>
              </h1>
              <p className="mt-3 text-mist max-w-prose">{data.tagline}</p>
              <p className="mt-2 text-sm text-mist inline-flex items-center gap-1">
                <MapPin size={14} /> {data.location}
              </p>
              <p className="mt-4 text-ink/80 dark:text-paper/80 max-w-2xl">
                {data.profile}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {["Product UI", "APIs", "Distributed systems", "Delivery"].map(
                  (chip) => (
                    <Pill key={chip}>{chip}</Pill>
                  )
                )}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={data.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-line bg-raised px-4 py-2 text-sm hover:border-mint/40"
                >
                  <Github size={18} /> GitHub
                </a>
                <a
                  href={data.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-line bg-raised px-4 py-2 text-sm hover:border-mint/40"
                >
                  <Linkedin size={18} /> LinkedIn
                </a>
                <button
                  onClick={() => smoothScrollTo("work")}
                  className="inline-flex items-center gap-2 rounded-xl bg-mint px-4 py-2 text-sm font-semibold text-ink hover:opacity-90"
                >
                  <ChevronDown size={18} /> View work
                </button>
                <ResumeButton className="inline-flex items-center gap-2 rounded-xl bg-ink text-paper px-4 py-2 text-sm font-semibold hover:opacity-90 dark:bg-paper dark:text-ink" />
              </div>
            </div>

            <div className="relative grid place-items-center">
              <div className="size-64 md:size-80 rounded-full border border-line shadow-xl overflow-hidden bg-[#f4ead4]">
                <img
                  src="/anime-avatar.png"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </motion.section>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 space-y-10">
        <motion.section
          id="about"
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="rounded-3xl border border-line bg-white p-6 md:p-8 dark:bg-card"
        >
          <h2 className="text-xl md:text-2xl font-bold mb-2">About</h2>
          <p className="text-ink/80 dark:text-paper/80 max-w-3xl">
            {data.profile}
          </p>
          <p className="mt-4 text-sm text-mist">{data.lookingFor}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {data.languages.map((lang) => (
              <Pill key={lang.label}>
                {lang.label} · {lang.level}
              </Pill>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="craft"
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="rounded-3xl border border-line bg-white p-6 md:p-8 dark:bg-card">
            <h2 className="text-xl md:text-2xl font-bold mb-6">
              How I design software
            </h2>
            <Architecture />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-line bg-white p-6 dark:bg-card">
              <h3 className="font-semibold text-lg">Interface</h3>
              <p className="mt-2 text-sm text-mist">
                UI is a system: tokens, composition, states — not a pile of
                screens.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-ink/80 dark:text-paper/80">
                <li>Design system across web and mobile</li>
                <li>Small presentational pieces assembled into features</li>
                <li>Data and side effects stay out of visual components</li>
                <li>Loading, empty, error, success are designed, not leftover</li>
                <li>Motion for feedback and hierarchy — never decoration</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-line bg-white p-6 dark:bg-card">
              <h3 className="font-semibold text-lg">Platform</h3>
              <p className="mt-2 text-sm text-mist">
                The backend should stay readable after the product ships.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-ink/80 dark:text-paper/80">
                <li>Controller → application → domain → persistence</li>
                <li>One gateway; services stay internal</li>
                <li>IAM is its own context</li>
                <li>Queues for jobs, notifications, and model calls</li>
                <li>CI on PR, image, recette, then prod — not laptop-to-prod</li>
                <li>LLM as a worker: auth at the edge, timeouts, fallbacks</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {data.skillGroups.map((group) => (
              <div
                key={group.title}
                className="rounded-3xl border border-line bg-white p-6 dark:bg-card"
              >
                <h3 className="font-semibold text-lg mb-3">{group.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <Pill key={skill}>{skill}</Pill>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="work"
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h2 className="text-xl md:text-2xl font-bold mb-2">Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {data.projects.map((project) => (
              <article
                key={project.name}
                className="relative rounded-3xl border border-line bg-white p-6 overflow-hidden dark:bg-card"
              >
                <div
                  aria-hidden
                  className="absolute -inset-1 rounded-3xl opacity-0 dark:opacity-100 bg-[radial-gradient(70%_60%_at_100%_0%,rgba(110,231,183,0.12),transparent)]"
                />
                <div className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-lg">{project.name}</h3>
                      <p className="text-sm text-mist mt-1">{project.summary}</p>
                    </div>
                    {project.period && (
                      <span className="text-xs text-mist whitespace-nowrap">
                        {project.period}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-ink/80 dark:text-paper/80">
                    {project.description}
                  </p>
                  <ul className="mt-4 space-y-1.5 text-sm text-ink/80 dark:text-paper/80">
                    {project.highlights.map((item) => (
                      <li key={item} className="flex gap-2">
                        <ArrowRight
                          size={14}
                          className="mt-1 shrink-0 text-mint-dim dark:text-mint"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <Pill key={tech}>{tech}</Pill>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="experience"
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="rounded-3xl border border-line bg-white p-6 md:p-8 dark:bg-card"
        >
          <h2 className="text-xl md:text-2xl font-bold mb-4">Experience</h2>
          <div className="grid gap-6">
            {data.experience.map((exp) => (
              <div
                key={`${exp.company}-${exp.period}`}
                className="rounded-2xl border border-line bg-raised p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold">
                    {exp.role}{" "}
                    <span className="text-mist">@ {exp.company}</span>
                  </h3>
                  <span className="text-xs text-mist whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>
                <p className="text-xs text-mist">{exp.location}</p>
                <ul className="list-disc pl-5 mt-3 text-sm text-ink/80 dark:text-paper/80 space-y-1">
                  {exp.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="education"
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="rounded-3xl border border-line bg-white p-6 md:p-8 dark:bg-card"
        >
          <h2 className="text-xl md:text-2xl font-bold mb-4">Education</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {data.education.map((ed) => (
              <div
                key={ed.school}
                className="rounded-2xl border border-line bg-raised p-5"
              >
                <h3 className="font-semibold">{ed.school}</h3>
                <p className="text-sm text-ink/80 dark:text-paper/80">
                  {ed.degree}
                </p>
                <p className="text-xs text-mist">
                  {ed.period} · {ed.location}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="contact"
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="rounded-3xl border border-line bg-white p-6 md:p-8 dark:bg-card"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold">Get in touch</h2>
              <p className="text-mist mt-1">{data.lookingFor}</p>
              <div className="mt-3 text-sm">
                <a
                  className="underline decoration-mint hover:text-mint-dim dark:hover:text-mint"
                  href={`mailto:${data.email}`}
                >
                  {data.email}
                </a>
                <div className="text-mist mt-1">
                  {data.phone} · {data.location}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={data.socials.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-raised px-4 py-2 text-sm hover:border-mint/40"
              >
                <Github size={18} /> GitHub
              </a>
              <a
                href={data.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-raised px-4 py-2 text-sm hover:border-mint/40"
              >
                <Linkedin size={18} /> LinkedIn
              </a>
              <ResumeButton
                dropUp
                className="inline-flex items-center gap-2 rounded-xl bg-ink text-paper px-4 py-2 text-sm font-semibold hover:opacity-90 dark:bg-paper dark:text-ink"
              />
              <a
                href={`mailto:${data.email}`}
                className="inline-flex items-center gap-2 rounded-xl bg-mint px-4 py-2 text-sm font-semibold text-ink hover:opacity-90"
              >
                <Mail size={18} /> Email me
              </a>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="mx-auto max-w-6xl border-t border-line px-4 py-8 pb-24 text-xs text-mist md:pb-8">
        © {new Date().getFullYear()} {data.name}. Design and architecture, same
        job.
      </footer>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
        <div className="no-scrollbar pointer-events-auto mx-auto flex max-w-full items-center justify-between gap-0.5 overflow-x-auto rounded-full border border-line bg-paper/90 px-1.5 py-1.5 text-ink backdrop-blur dark:bg-ink/80 dark:text-paper">
          {SECTION_IDS.map((id) => (
            <button
              key={id}
              onClick={() => smoothScrollTo(id)}
              className={`shrink-0 whitespace-nowrap rounded-full px-2 py-1 text-[11px] ${
                activeId === id
                  ? "bg-mint/20 text-mint-dim dark:text-mint"
                  : "text-inherit"
              }`}
            >
              {id === "experience"
                ? "Exp"
                : id === "education"
                  ? "Edu"
                  : label(id)}
            </button>
          ))}
          <ThemeToggleButton theme={theme} onToggle={toggle} />
        </div>
      </div>
    </div>
  );
}

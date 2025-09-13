"use client";
import React, { useEffect, useMemo, useState } from "react";
import { portfolioData as data } from "../data/portfolioData";
import MediaGallery from "../components/MediaGallery";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  Code,
  Database,
  Wrench,
  ChevronDown,
  MapPin,
  Sun,
  Moon,
} from "lucide-react";
import { motion } from "framer-motion";

/* ============================
   Theme (light/dark)
============================ */
function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(() => "dark");

  // Init from localStorage or system preference
  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    const mql = window.matchMedia?.("(prefers-color-scheme: dark)");
    const system = mql?.matches ? "dark" : "light";
    const initial = stored ?? system;
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  // Follow OS changes only if the user didn't set a manual choice
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
      className="ml-2 inline-flex items-center justify-center size-9 rounded-lg
                 border border-black/10 bg-gray-100 text-gray-800 hover:bg-gray-200
                 dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:bg-white/10 transition"
      aria-label="Toggle theme"
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

/* ============================
   Scroll helpers
============================ */
const SECTION_IDS = [
  "about",
  "skills",
  "experience",
  "education",
  "projects",
  "contact",
] as const;

function useScrollSpy(
  ids: readonly string[],
  rootMargin = "-50% 0px -45% 0px"
) {
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

/* ============================
   Component
============================ */
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

  const projectCount = Array.isArray(data.projects) ? data.projects.length : 0;
  const internshipCount = Array.isArray(data.experience)
    ? data.experience.filter((e: any) => /(intern)/i.test(e.role)).length
    : 0;

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-[#0d1117] dark:text-gray-100">
      {/* Subtle background glows (dark only) */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10 opacity-0 dark:opacity-100 transition-opacity
        bg-[radial-gradient(60%_40%_at_80%_10%,rgba(56,189,248,0.12),transparent_70%),radial-gradient(50%_40%_at_0%_20%,rgba(99,102,241,0.12),transparent_60%)]"
      />

      {/* Top nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-black/10 bg-white/70 backdrop-blur
                      dark:border-white/10 dark:bg-[#0d1117]/60">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="relative inline-flex items-center justify-center"
              aria-label="Go to top"
            >
              <img
                src="/anime.png"
                alt="Avatar"
                className="size-9 rounded-full ring-2 ring-black/10 dark:ring-white/10 object-cover shadow-md"
              />
            </button>
            <span className="font-semibold tracking-tight text-gray-900 dark:text-gray-100">
              {data.name}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {SECTION_IDS.map((id) => (
              <button
                key={id}
                onClick={() => smoothScrollTo(id)}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  activeId === id
                    ? "text-indigo-600 dark:text-indigo-300"
                    : "text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
                }`}
                aria-current={activeId === id ? "true" : undefined}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
            <ThemeToggleButton theme={theme} onToggle={toggle} />
          </div>
        </div>
      </nav>

      {/* Hero – two-column card */}
      <header className="pt-24 md:pt-28">
        <div className="mx-auto max-w-6xl px-4">
          <motion.section
            variants={fade}
            initial="hidden"
            animate="show"
            className="relative grid md:grid-cols-[1.2fr,1fr] gap-6 rounded-3xl
                       bg-white border border-black/10 p-6 md:p-10 shadow-2xl
                       dark:bg-[#0f141b] dark:border-white/10"
          >
            {/* Left: text */}
            <div className="flex flex-col justify-center">
              <p className="text-sm uppercase tracking-wider text-indigo-700/80 dark:text-indigo-300/90">
                Developer Portfolio
              </p>
              <h1 className="mt-2 text-3xl md:text-5xl font-extrabold leading-tight">
                Nice to meet you, I'm{" "}
                <span className="text-gray-900 dark:text-white">
                  {data.name.split(" ")[0]}
                </span>
              </h1>
              <p className="mt-3 text-gray-700 dark:text-gray-300 max-w-prose">
                {data.title} ·{" "}
                <span className="inline-flex items-center gap-1">
                  <MapPin size={14} /> {data.location}
                </span>
              </p>
              <p className="mt-4 text-gray-700 dark:text-gray-300 max-w-2xl">
                {data.profile}
              </p>

              {/* Stats */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-gray-50 border border-black/10 p-4 dark:bg-black/20 dark:border-white/10">
                  <div className="text-2xl font-bold">{projectCount}+</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Projects delivered
                  </div>
                </div>
                <div className="rounded-2xl bg-gray-50 border border-black/10 p-4 dark:bg-black/20 dark:border-white/10">
                  <div className="text-2xl font-bold">{internshipCount}+</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Internships
                  </div>
                </div>
                <div className="rounded-2xl bg-gray-50 border border-black/10 p-4 dark:bg-black/20 dark:border-white/10">
                  <div className="text-2xl font-bold">
                    {data.skills?.length ?? 0}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Tech skills
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={data.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm
                             bg-gray-100 border-black/10 text-gray-900 hover:bg-gray-200
                             dark:bg-white/5 dark:border-white/10 dark:text-gray-200 dark:hover:bg-white/10"
                >
                  <Github size={18} /> GitHub
                </a>
                <a
                  href={data.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm
                             bg-gray-100 border-black/10 text-gray-900 hover:bg-gray-200
                             dark:bg-white/5 dark:border-white/10 dark:text-gray-200 dark:hover:bg-white/10"
                >
                  <Linkedin size={18} /> LinkedIn
                </a>
                <button
                  onClick={() => smoothScrollTo("projects")}
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                >
                  <ChevronDown size={18} /> View Projects
                </button>
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-xl bg-black text-white px-4 py-2 text-sm font-semibold hover:opacity-90
                             dark:bg-white dark:text-black"
                >
                  <Download size={18} /> Resume
                </a>
              </div>
            </div>

            {/* Right: portrait */}
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-8 rounded-[2.5rem] opacity-0 dark:opacity-100
                           bg-[radial-gradient(100%_60%_at_50%_35%,rgba(99,102,241,.25),transparent)] transition-opacity"
              />
              <div className="relative mx-auto grid place-items-center">
                <div className="size-64 md:size-80 rounded-full border border-black/10 dark:border-white/10 shadow-xl overflow-hidden grid place-items-center bg-gradient-to-b from-black/5 to-black/10 dark:from-white/5 dark:to-black/20">
                  <img
                    src="/anime.png"
                    alt="Avatar"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-6xl px-4 py-12 space-y-10">
        {/* About */}
        <motion.section
          id="about"
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="rounded-3xl bg-white border border-black/10 p-6 md:p-8 dark:bg-[#0f141b] dark:border-white/10"
        >
          <h2 className="text-xl md:text-2xl font-bold mb-2">About me</h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl">
            {data.profile}
          </p>
        </motion.section>

        {/* Skills */}
        <motion.section
          id="skills"
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6"
        >
          {[
            {
              title: "Frontend",
              icon: <Code size={18} />,
              skills: [
                "React",
                "React Native",
                "Next.js",
                "Angular",
                "SwiftUI",
                "Flutter",
                "FlutterFlow",
                "JavaFX",
              ],
            },
            {
              title: "Backend",
              icon: <Code size={18} />,
              skills: ["Node.js", "Express.js", "NestJS", "Spring Boot", "Symfony"],
            },
            {
              title: "Databases",
              icon: <Database size={18} />,
              skills: ["PostgreSQL", "MongoDB", "MySQL", "Firebase"],
            },
            {
              title: "Tools & Other",
              icon: <Wrench size={18} />,
              skills: [
                "Git & GitHub",
                "REST APIs",
                "Auth (OAuth/JWT)",
                "Agile",
                "StarUML",
              ],
            },
          ].map((group, i) => (
            <div
              key={i}
              className="rounded-3xl bg-white border border-black/10 p-6 dark:bg-[#0f141b] dark:border-white/10"
            >
              <h3 className="flex items-center gap-2 font-semibold text-lg mb-3">
                {group.icon} {group.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((s, j) => (
                  <span
                    key={j}
                    className="px-3 py-1 text-xs rounded-full
                               bg-gray-100 border border-black/10 text-gray-900
                               dark:bg-white/5 dark:border-white/10 dark:text-gray-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.section>

        {/* Experience */}
        <motion.section
          id="experience"
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="rounded-3xl bg-white border border-black/10 p-6 md:p-8 dark:bg-[#0f141b] dark:border-white/10"
        >
          <h2 className="text-xl md:text-2xl font-bold mb-4">Experience</h2>
          <div className="grid gap-6">
            {data.experience.map((exp: any, i: number) => (
              <div
                key={i}
                className="rounded-2xl bg-gray-50 border border-black/10 p-5 dark:bg-black/20 dark:border-white/10"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold">
                    {exp.role}{" "}
                    <span className="text-gray-500 dark:text-gray-400">
                      @ {exp.company}
                    </span>
                  </h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {exp.location}
                </p>
                <ul className="list-disc pl-5 mt-3 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  {exp.bullets.map((b: string, j: number) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Education */}
        <motion.section
          id="education"
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="rounded-3xl bg-white border border-black/10 p-6 md:p-8 dark:bg-[#0f141b] dark:border-white/10"
        >
          <h2 className="text-xl md:text-2xl font-bold mb-4">Education</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {data.education.map((ed: any, i: number) => (
              <div
                key={i}
                className="rounded-2xl bg-gray-50 border border-black/10 p-5 dark:bg-black/20 dark:border-white/10"
              >
                <h3 className="font-semibold">{ed.school}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {ed.degree}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {ed.period} · {ed.location}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Projects */}
        <motion.section
          id="projects"
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h2 className="text-xl md:text-2xl font-bold mb-4">Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {data.projects.map((p: any, i: number) => (
              <div
                key={i}
                className="relative rounded-3xl bg-white border border-black/10 p-6 overflow-hidden dark:bg-[#0f141b] dark:border-white/10"
              >
                <div
                  aria-hidden
                  className="absolute -inset-1 rounded-3xl opacity-0 dark:opacity-100
                             bg-[radial-gradient(70%_60%_at_100%_0%,rgba(99,102,241,0.15),transparent)] transition-opacity"
                />
                <div className="relative z-[1]">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-lg">{p.name}</h3>
                    {p.period && (
                      <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {p.period}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                    {p.description}
                  </p>
                  {p.images?.length || p.videos?.length ? (
                    <div className="mt-4">
                      <MediaGallery images={p.images} videos={p.videos} />
                    </div>
                  ) : (
                    <div className="mt-4 h-28 rounded-xl grid place-items-center text-xs
                                    text-gray-500 bg-gray-100 border border-black/10
                                    dark:text-gray-400 dark:bg-black/20 dark:border-white/10">
                      No media provided
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Contact */}
        <motion.section
          id="contact"
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="rounded-3xl bg-white border border-black/10 p-6 md:p-8 dark:bg-[#0f141b] dark:border-white/10"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold">Get in touch</h2>
              <p className="text-gray-700 dark:text-gray-300 mt-1">
                Prefer email? I usually reply within 24h.
              </p>
              <div className="mt-3 text-sm text-gray-800 dark:text-gray-200">
                <a
                  className="underline decoration-indigo-500 hover:text-indigo-600 dark:decoration-indigo-400 dark:hover:text-indigo-300"
                  href={`mailto:${data.email}`}
                >
                  {data.email}
                </a>
                <div className="text-gray-600 dark:text-gray-400 mt-1">
                  {data.phone} · {data.location}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={data.socials.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm
                           bg-gray-100 border-black/10 text-gray-900 hover:bg-gray-200
                           dark:bg-white/5 dark:border-white/10 dark:text-gray-200 dark:hover:bg-white/10"
              >
                <Github size={18} /> GitHub
              </a>
              <a
                href={data.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm
                           bg-gray-100 border-black/10 text-gray-900 hover:bg-gray-200
                           dark:bg-white/5 dark:border-white/10 dark:text-gray-200 dark:hover:bg-white/10"
              >
                <Linkedin size={18} /> LinkedIn
              </a>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 rounded-xl bg-black text-white px-4 py-2 text-sm font-semibold hover:opacity-90
                           dark:bg-white dark:text-black"
              >
                <Download size={18} /> Resume
              </a>
              <a
                href={`mailto:${data.email}`}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
              >
                <Mail size={18} /> Email me
              </a>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-4 py-8 text-xs text-gray-600 border-t border-black/10 dark:text-gray-400 dark:border-white/10">
        © {new Date().getFullYear()} {data.name}. Built with ❤️ using React & Tailwind.
      </footer>

      {/* Mobile bottom nav (with toggle) */}
      <div className="md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-1 rounded-full border border-black/10 bg-white/80 text-gray-800 backdrop-blur px-2 py-2
                        dark:border-white/10 dark:bg-black/60 dark:text-gray-300">
          {SECTION_IDS.map((id) => (
            <button
              key={id}
              onClick={() => smoothScrollTo(id)}
              className={`px-3 py-1 text-xs rounded-full ${
                activeId === id
                  ? "bg-black/10 text-gray-900 dark:bg-white/10 dark:text-indigo-300"
                  : "text-inherit"
              }`}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
          <ThemeToggleButton theme={theme} onToggle={toggle} />
        </div>
      </div>
    </div>
  );
}

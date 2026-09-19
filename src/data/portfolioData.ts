export type Experience = {
  role: string
  company: string
  period: string
  location: string
  bullets: string[]
}

export type Project = {
  name: string
  period?: string
  summary: string
  description: string
  stack: string[]
  highlights: string[]
}

export type SkillGroup = {
  title: string
  skills: string[]
}

export const portfolioData = {
  name: "Mohamed Ali Trabelsi",
  title: "Fullstack Engineer",
  tagline: "I design product interfaces and the systems behind them.",
  location: "Tunis, Tunisia",
  email: "trabelsi.mohamedali@esprit.tn",
  phone: "+216 28 751 504",
  socials: {
    github: "https://github.com/MohamedAliTrabelsiSE",
    linkedin: "https://linkedin.com/in/mohamedalitrabelsi",
  },

  profile:
    "Fullstack engineer working on production web, mobile, and APIs. I treat UI as a system — tokens, composition, loading and error states — and hold the backend to the same bar: gateway, IAM, services, queues, then data. Models sit on the queue as workers, with auth at the edge, timeouts, and fallbacks. I ship through CI, not from a laptop: PR checks, image, recette, then prod.",

  lookingFor:
    "Fullstack seats where design and architecture are the same job.",

  experience: [
    {
      role: "Full Stack Engineer",
      company: "IT Strategix",
      period: "Sep 2024 – present",
      location: "Tunis, Tunisia",
      bullets: [
        "Designed and developed backend services and REST APIs using NestJS and TypeScript for web and mobile application modules.",
        "Built full-stack features across React Native applications and backend services, integrating PostgreSQL and MongoDB.",
        "Improved API and application performance, reducing response times by 35%.",
        "Contributed to application architecture, testing, CI/CD and production deployment across multiple projects.",
      ],
    },
    {
      role: "Full Stack Developer Intern",
      company: "NAXXUM GROUP",
      period: "Jun 2025 – Jul 2025",
      location: "Tunis, Tunisia",
      bullets: [
        "Optimized an educational platform using Node.js, Express, React and MongoDB.",
        "Enhanced recommendation features through AI-powered suggestions.",
      ],
    },
    {
      role: "Full Stack Developer Intern",
      company: "NAXXUM GROUP",
      period: "Jul 2024 – Aug 2024",
      location: "Tunis, Tunisia",
      bullets: [
        "Built and maintained features for an online teaching platform with React, Node.js, Express and MongoDB.",
        "Implemented real-time student monitoring and strengthened application reliability.",
      ],
    },
    {
      role: "End-of-Studies Intern",
      company: "SIGA",
      period: "Feb 2023 – Jun 2023",
      location: "Tunis, Tunisia",
      bullets: [
        "Designed and developed a task-tracking web application using Spring Boot, Angular and PostgreSQL.",
        "Built REST APIs and user management modules that improved internal coordination.",
      ],
    },
  ] satisfies Experience[],

  education: [
    {
      school: "ESPRIT",
      degree: "Engineering Degree in Software Engineering",
      period: "2023 – 2026",
      location: "Tunis, Tunisia",
    },
    {
      school: "Faculty of Sciences of Tunis (FST)",
      degree: "Bachelor Degree in Computer Science",
      period: "Sep 2020 – Jun 2023",
      location: "Tunis, Tunisia",
    },
  ],

  projects: [
    {
      name: "Applied AI platform",
      period: "Jun 2024 – present",
      summary: "IT Strategix — first release in development, clients already waiting.",
      description:
        "Serious product work, not a lab demo. The model is a worker, not the app. Clients hit one gateway. IAM is its own context. Domain stays internal. Jobs, notifications, and LLM calls go on the broker.",
      stack: ["NestJS", "TypeScript", "RabbitMQ", "MongoDB", "Docker", "Mobile"],
      highlights: [
        "API gateway / BFF in front of services",
        "Dedicated IAM — tokens, not auth mixed into every feature",
        "LLM behind the queue — timeouts and fallbacks",
      ],
    },
    {
      name: "Tutoring platform",
      period: "2025 – 2026",
      summary: "Web + mobile + API. Design system on the client, recette before prod.",
      description:
        "Coordination product for tutors, students, and staff. Same care from the screen to the pipeline: a token-based UI, a NestJS API, Playwright on recette, then a promoted image. AI drafts session reports; a human reviews them.",
      stack: [
        "React",
        "TypeScript",
        "NestJS",
        "PostgreSQL",
        "Firebase",
        "Playwright",
        "GitHub Actions",
      ],
      highlights: [
        "Design system — tokens, composition, states",
        "PR → CI → image → recette → prod",
        "STT + LLM as a worker, not inside every controller",
      ],
    },
    {
      name: "Pawlink",
      period: "2024",
      summary: "Flutter client on Java microservices — gateway and IAM first.",
      description:
        "Pet-care product split into bounded services. The Flutter app talks to a gateway. Identity lives in a dedicated IAM service. Account and domain stay behind it.",
      stack: ["Flutter", "Java", "API Gateway", "IAM", "Microservices"],
      highlights: [
        "Gateway as the only public entry",
        "IAM as its own service",
        "Account and domain services stay internal",
      ],
    },
    {
      name: "PrimeProf",
      period: "Jan 2025 – May 2025",
      summary: "AI tutoring mobile app — matching students with teachers.",
      description:
        "Flutter + NestJS + PostgreSQL. LLAMA personalizes tutoring and matches learners with teachers. Early mobile + API work with a model behind the service.",
      stack: ["Flutter", "NestJS", "PostgreSQL", "LLAMA"],
      highlights: [
        "Personalized tutoring flows",
        "Student–teacher matching",
        "Mobile-first interface",
      ],
    },
    {
      name: "GainUp",
      period: "2024",
      summary: "iOS fitness coach — Gemini and Mistral behind the API.",
      description:
        "SwiftUI client, NestJS API, MongoDB. Models generate training and nutrition plans from user goals. The interesting part was treating the model as a feature behind the API, not as the product.",
      stack: ["SwiftUI", "NestJS", "MongoDB", "Gemini", "Mistral"],
      highlights: [
        "Adaptive workout and nutrition plans",
        "Model calls isolated in the API",
        "Beginner-friendly product UI",
      ],
    },
  ] satisfies Project[],

  skillGroups: [
    {
      title: "Interface",
      skills: [
        "TypeScript",
        "React",
        "Flutter",
        "SwiftUI",
        "Design systems",
        "Composition",
        "Motion",
      ],
    },
    {
      title: "Platform",
      skills: [
        "NestJS",
        "Node.js",
        "Java",
        "REST",
        "API gateway",
        "IAM",
        "RabbitMQ",
      ],
    },
    {
      title: "Data",
      skills: ["PostgreSQL", "MongoDB", "MySQL", "Firebase", "Repository / migrations"],
    },
    {
      title: "Delivery",
      skills: [
        "Docker",
        "GitHub Actions",
        "Playwright",
        "Recette → prod",
        "Git",
        "Agile",
      ],
    },
  ] satisfies SkillGroup[],

  languages: [
    { label: "Arabic", level: "Native" },
    { label: "English", level: "C1 — professional working proficiency" },
    { label: "French", level: "B2 — professional working proficiency" },
  ],

  community: [
    "Tunisian Red Crescent",
    "Engineers Spark FST",
    "IEEE SC Chapter, FST Student Branch",
    "Hult Prize Tunisia",
  ],
}

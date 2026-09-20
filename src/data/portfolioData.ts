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
    "Fullstack engineer working on production web, mobile, and APIs. I treat UI as a system: tokens, composition, loading and error states. The backend gets the same bar: gateway, IAM, services, queues, then data. Models sit on the queue as workers, with auth at the edge, timeouts, and fallbacks. I ship through CI, not from a laptop: PR checks, image, recette, then prod.",

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
      name: "Smart delivery mobile app",
      summary: "Logistics SaaS: three roles, live tracking, AI voice assistant.",
      description:
        "Cross-platform delivery product on microservices. One codebase for the three roles, real-time tracking and QR-code handover. A voice assistant in Tunisian Darija sits behind the API. Shipped with DigitalOcean and Expo EAS.",
      stack: [
        "NestJS",
        "React Native",
        "Expo",
        "RabbitMQ",
        "Supabase",
        "MongoDB",
        "Google Maps",
        "OpenAI Realtime",
        "DigitalOcean",
      ],
      highlights: [
        "Three roles in a single React Native / Expo codebase",
        "Real-time tracking and QR-code delivery",
        "Darija voice assistant on the OpenAI Realtime model",
      ],
    },
    {
      name: "AI-powered education platform",
      summary: "Mobile tutoring. LLaMA matches students with teachers.",
      description:
        "Expo and NestJS education app on PostgreSQL. LLaMA personalizes tutoring and matches learners with teachers from their needs. The model stays behind the API.",
      stack: [
        "Expo",
        "React Native",
        "NestJS",
        "PostgreSQL",
        "TypeScript",
        "LLaMA",
      ],
      highlights: [
        "Personalized tutoring flows",
        "Automatic student–teacher matching",
        "Mobile client on Expo, API on NestJS",
      ],
    },
    {
      name: "AI-powered fitness coaching app",
      summary: "Beginner iOS coach. Gemini and Mistral sit behind the API.",
      description:
        "Swift client, NestJS API, MongoDB. Models generate training programs from user goals. The interesting part is treating the model as a feature behind the service, not as the product.",
      stack: ["Swift", "NestJS", "MongoDB", "Gemini", "Mistral AI"],
      highlights: [
        "Custom training plans from user goals",
        "Gemini and Mistral isolated in the API",
        "Beginner-friendly mobile interface",
      ],
    },
    {
      name: "Travel & social activity platform",
      summary: "Trips, companions, and shared activities. Full-stack.",
      description:
        "Platform for travelers to organize trips, share activities, find companions, and connect by destination and interests. Angular on the client, NestJS and PostgreSQL behind a REST API.",
      stack: ["Express", "NestJS", "PostgreSQL", "TypeScript", "REST API"],
      highlights: [
        "Trip planning and shared activities",
        "Companion matching by destination and interests",
        "Full-stack Angular + NestJS",
      ],
    },
  ] satisfies Project[],

  skillGroups: [
    {
      title: "Interface",
      skills: [
        "TypeScript",
        "React",
        "React Native",
        "Expo",
        "Express",
        "Swift",
        "Design systems",
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
    { label: "English", level: "C1, professional working proficiency" },
    { label: "French", level: "B2, professional working proficiency" },
  ],

  community: [
    "Tunisian Red Crescent",
    "Engineers Spark FST",
    "IEEE SC Chapter, FST Student Branch",
    "Hult Prize Tunisia",
  ],
}

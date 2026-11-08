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
  url?: string
  demoUrl?: string
}

export type SkillGroup = {
  title: string
  skills: string[]
}

export const portfolioData = {
  name: "Mohamed Ali Trabelsi",
  title: "Backend Engineer",
  tagline:
    "I build REST APIs and services on PostgreSQL and MongoDB for web and mobile products.",
  location: "Tunis, Tunisia",
  email: "trabelsi.mohamedali.dev@gmail.com",
  phone: "+216 28 751 504",
  socials: {
    github: "https://github.com/MohamedAliTrabelsiSE",
    linkedin: "https://linkedin.com/in/mohamedalitrabelsi",
  },

  profile:
    "Backend engineer with two years in industry, working mostly in TypeScript and NestJS. I build REST APIs and services on PostgreSQL and MongoDB for web and mobile products. I have also worked with RabbitMQ microservices, real-time features and LLM integrations.",

  lookingFor: "Looking for a backend role in Europe.",

  experience: [
    {
      role: "Full-Stack Engineer",
      company: "IT Strategix",
      period: "Sep 2024 – present",
      location: "Tunis, Tunisia",
      bullets: [
        "Build and maintain REST APIs and backend services in NestJS and TypeScript for web and mobile products, on PostgreSQL and MongoDB.",
        "Cut API response times by 35%.",
        "One of two backend engineers on the team, with the team lead. I deliver 2–3 tickets a day, depending on complexity, in 2–3 week sprints.",
        "Take part in architecture decisions and production deployments across several client projects (details confidential).",
        "Write Jest tests and maintain CI/CD pipelines in GitHub Actions.",
        "Build features on the React Native (Expo) apps that use these APIs.",
      ],
    },
    {
      role: "Full-Stack Developer Intern",
      company: "NAXXUM GROUP",
      period: "Jul – Aug 2024 and Jun – Jul 2025",
      location: "Tunis, Tunisia",
      bullets: [
        "Built backend services and responsive interfaces for an online teaching platform, including real-time student monitoring.",
        "Worked on backend scalability and frontend performance of an educational platform, and added AI-powered recommendations.",
      ],
    },
    {
      role: "End-of-Studies Intern",
      company: "SIGA",
      period: "Feb – Jun 2023",
      location: "Tunis, Tunisia",
      bullets: [
        "Built a task-tracking web application with Spring Boot, Angular and PostgreSQL.",
        "Wrote the REST APIs and the user management module used by internal teams.",
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
      period: "2020 – 2023",
      location: "Tunis, Tunisia",
    },
  ],

  projects: [
    {
      name: "Realtime voice agent",
      summary: "AI voice receptionist. Speech-to-speech booking over WebSocket.",
      description:
        "NestJS backend that streams microphone audio to the OpenAI Realtime API. The model books, finds, and cancels appointments through typed tools. Mock mode runs the full stack offline without an API key.",
      url: "https://github.com/MohamedAliTrabelsiSE/realtime-voice-agent",
      stack: [
        "NestJS",
        "TypeScript",
        "OpenAI Realtime",
        "WebSocket",
        "Zod",
        "Jest",
        "Docker",
      ],
      highlights: [
        "Low-latency speech-to-speech loop with barge-in",
        "Function calling with Zod schemas and structured errors",
        "Session tokens, browser test lab, CI, and e2e tests",
      ],
    },
    {
      name: "Delivery route tracker",
      summary: "Courier map on a phone with live tracking and no Google Maps key.",
      description:
        "Expo app and NestJS API for a driver tour and a customer tracking code. Routing and geocoding use OSRM and Nominatim on OpenStreetMap. A WebSocket stream moves the driver, updates the ETA, and redraws the road still left.",
      url: "https://github.com/MohamedAliTrabelsiSE/delivery-route-tracker",
      stack: [
        "NestJS",
        "Expo",
        "React Native",
        "TypeScript",
        "WebSocket",
        "OSRM",
        "OpenStreetMap",
      ],
      highlights: [
        "Live tracking with ETA, geofences, and turn-by-turn",
        "Route optimize, reverse, and recalculate on the driver tour",
        "Shared geo package, mock providers, and Playwright e2e",
      ],
    },
    {
      name: "Smart delivery mobile app (CONFIRMIA)",
      summary: "Capstone, pre-production, confidential. Logistics app with three roles, live tracking and an AI voice assistant.",
      description:
        "Microservices backend in NestJS. Services talk through RabbitMQ; data is in Supabase and MongoDB. Deployed to pre-production on DigitalOcean; mobile builds with Expo EAS.",
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
        "Real-time tracking with Google Maps and QR-code delivery confirmation",
        "Voice assistant in Tunisian Arabic (Darija) on the OpenAI Realtime model",
      ],
    },
    {
      name: "GoTogether",
      summary: "Group travel planner. Groups, trips, expenses, chat, and a community feed.",
      description:
        "Friends create travel groups, plan trips together, split expenses, chat, and share tips in a community feed. The live demo lets you sign in as a sample traveler with no sign-up.",
      demoUrl: "https://gotogether-green.vercel.app/",
      stack: [
        "Next.js",
        "React",
        "Tailwind CSS",
        "MongoDB",
        "JWT",
        "Socket.io",
      ],
      highlights: [
        "Groups with invites and roles, trips with itinerary on a map",
        "Expense splitting, group and trip chat, community posts",
        "JWT sessions, email verification, password reset, and TOTP 2FA",
      ],
    },
    {
      name: "AI-powered education platform",
      summary: "Mobile tutoring app where LLaMA matches students with teachers.",
      description:
        "Expo app and NestJS API on PostgreSQL. LLaMA personalizes tutoring and matches learners with teachers from their needs; the model stays behind the API.",
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
      summary: "Beginner iOS coach with Gemini and Mistral behind the API.",
      description:
        "Swift client, NestJS API and MongoDB. Gemini and Mistral generate training programs from user goals and are isolated in the API.",
      stack: ["Swift", "NestJS", "MongoDB", "Gemini", "Mistral AI"],
      highlights: [
        "Custom training plans from user goals",
        "Gemini and Mistral isolated in the API",
        "Beginner-friendly mobile interface",
      ],
    },
  ] satisfies Project[],

  skillGroups: [
    {
      title: "Backend",
      skills: [
        "TypeScript",
        "NestJS",
        "Node.js",
        "Express",
        "REST APIs",
        "Microservices",
        "RabbitMQ",
        "WebSocket",
        "JWT",
      ],
    },
    {
      title: "Frontend and mobile",
      skills: [
        "React",
        "React Native",
        "Expo",
        "Next.js",
        "Tailwind CSS",
        "Angular",
      ],
    },
    {
      title: "Data",
      skills: ["PostgreSQL", "MongoDB", "Supabase"],
    },
    {
      title: "DevOps and testing",
      skills: [
        "Docker",
        "GitHub Actions",
        "CI/CD",
        "DigitalOcean",
        "Vercel",
        "Jest",
        "Playwright",
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
    "IEEE Student Branch, FST",
    "Hult Prize, ESSEC Tunis",
  ],
}

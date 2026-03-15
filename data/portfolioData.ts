export const navLinks = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export const socialLinks = [
  { name: "GitHub", href: "https://github.com/fildha-p", icon: "github" },
  { name: "LinkedIn", href: "https://linkedin.com/in/fathima-fildha", icon: "linkedin" },
];

export const heroData = {
  headline: ["Building", "with", "Python.", "Thinking", "with", "AI.", "Designing", "with", "React."],
  subheadline:
    "Full Stack Developer crafting modern web applications with Django, React, and Generative AI. I build scalable backend systems, responsive interfaces, and intelligent tools powered by LLMs.",
};

export const aboutData = {
  copy: [
    "I'm a Full Stack Developer from Kerala with a strong foundation in Django, React, and modern web architecture. My work focuses on building scalable web applications that combine clean backend logic with intuitive user experiences.",
    "Recently, I've been exploring Generative AI — experimenting with AI agents, OpenAI APIs, and structured LLM applications to build intelligent tools.",
    "I enjoy turning ideas into working products, solving real problems through code, and continuously learning new technologies that push development forward.",
  ],
  stats: [
    { label: "Projects", value: "5+" },
    { label: "Education", value: "B.Tech CSE" },
    { label: "Focus", value: "GenAI Explorer" },
  ],
};

export const skillsData = [
  {
    category: "Frontend",
    items: ["ReactJS", "JavaScript", "Redux", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    category: "Backend",
    items: ["Django", "Python", "REST APIs", "Authentication", "CRUD"],
  },
  {
    category: "Database",
    items: ["MySQL"],
  },
  {
    category: "AI/GenAI",
    items: ["Prompt Engineering", "AI Agents", "OpenAI API", "Structured LLM Applications"],
  },
  {
    category: "Data",
    items: ["NumPy", "Pandas", "Matplotlib"],
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "VS Code", "n8n"],
  },
];

export const projectsData = [
  {
    id: 1,
    title: "SkillMap",
    description:
      "Role readiness assessment platform that evaluates user skills and maps them to career roles. Includes dynamic dashboards, scoring systems, and secure session-based authentication.",
    tags: ["Django", "MySQL", "HTML", "CSS", "JavaScript"],
    links: { view: "#", github: "https://github.com/fildha-p" },
  },
  {
    id: 2,
    title: "My Wedding Planner",
    description:
      "A responsive event planning web app that helps couples manage budgets, vendors, and event tasks in one place. State persistence ensures smooth planning across sessions.",
    tags: ["React", "Redux Persist", "Tailwind CSS"],
    links: { view: "#", github: "https://github.com/fildha-p" },
  },
  {
    id: 3,
    title: "Community Complaint & Issue Reporting System",
    description:
      "A community management platform enabling residents to submit, track, and resolve local issues efficiently. Built with structured CRUD workflows and MySQL backend.",
    tags: ["Python", "MySQL"],
    links: { view: "#", github: "https://github.com/fildha-p" },
  },
  {
    id: 4,
    title: "AI Agent Explorer",
    description:
      "An experimental AI application demonstrating agent-based workflows using OpenAI APIs. Can generate recipes, perform web research, and execute tool-based actions through structured prompts.",
    tags: ["Python", "OpenAI API", "Pydantic", "Streamlit"],
    links: { view: "#", github: "https://github.com/fildha-p" },
  },
  {
    id: 5,
    title: "Election Vote Percentage Calculator",
    description:
      "A data analysis tool that processes election data and visualizes vote distributions. Supports statistical analysis with dynamic bar and pie chart generation.",
    tags: ["Python", "NumPy", "Pandas", "Matplotlib"],
    links: { view: "#", github: "https://github.com/fildha-p" },
  },
];

export const experienceData = [
  {
    id: 1,
    role: "Python Django Full Stack Developer Intern",
    company: "HACA Calicut",
    period: "Sep 2025 — Mar 2026",
    bullets: [
      "Developed backend features using Django and REST APIs",
      "Built responsive UI components using React",
      "Implemented CRUD workflows and authentication systems",
      "Integrated AI-assisted automation into development workflows",
    ],
  },
];

export const contactData = {
  headline: "Let's Build Something Meaningful",
  subtext:
    "Whether it's a web application, an AI-powered tool, or an idea worth building — I'm always open to collaborating and learning.",
  email: "fathfildhap@gmail.com",
};

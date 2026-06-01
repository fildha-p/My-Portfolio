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
    "Full Stack Developer with production experience building and deploying web applications using Django, React, PostgreSQL, and AWS. Exploring Generative AI through OpenAI API, prompt engineering, and AI-powered applications.",
};

export const aboutData = {
  copy: [
    "I'm a Full Stack Developer from Kerala with hands-on production experience building and deploying web applications using Django, React, MySQL, and PostgreSQL. I've worked on live deployments on AWS and integrated third-party services including Razorpay and Zoho.",
    "I'm actively exploring Generative AI — working with OpenAI APIs, prompt engineering, image generation, and AI-powered application development using Streamlit.",
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
    items: ["MySQL", "PostgreSQL"],
  },
  {
    category: "AI/GenAI",
    items: ["Prompt Engineering", "OpenAI API", "Image Generation", "Streamlit", "Structured LLM Applications"],
  },
  {
    category: "Data",
    items: ["NumPy", "Pandas", "Matplotlib"],
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "AWS", "Razorpay", "Zoho", "VS Code", "n8n"],
  },
];

export const projectsData = [
  {
    id: 1,
    title: "SkillMap",
    description:
      "Role-based skill assessment web application that helps users evaluate readiness for specific tech roles. Features dynamic dashboards, readiness scores, skill progression tracking, and secure session-based authentication.",
    tags: ["Django", "MySQL", "JavaScript", "HTML", "CSS"],
    links: { view: "#", github: "https://github.com/fildha-p/SkillMap.git" },
  },
  {
    id: 2,
    title: "AI Data Analyst",
    description:
      "Streamlit application that lets users upload CSV files, explore datasets, and generate AI-powered business insights. Features automatic column detection, summary statistics, data visualizations, and a natural language Q&A interface powered by OpenAI API.",
    tags: ["Python", "Streamlit", "OpenAI API", "Pandas", "Matplotlib"],
    links: { view: "#", github: "https://github.com/fildha-p/Ai-data-analyst.git" },
  },
  {
    id: 3,
    title: "Wedding/Party Theme Generator",
    description:
      "Multi-step AI-powered Streamlit app that generates complete event branding from user inputs. Chains multiple OpenAI API calls to produce theme title, tagline, invitation text, decoration ideas, color palette, and AI-designed invitation card visuals.",
    tags: ["Python", "Streamlit", "OpenAI API", "Image Generation"],
    links: { view: "#", github: "https://github.com/fildha-p/Wedding-Party-Theme-Generator.git" },
  },
  {
    id: 4,
    title: "Branding Assistant",
    description:
      "Streamlit app that generates brand names, slogans, and AI-designed logos from a business idea. Uses OpenAI API for creative brand naming and integrates AI image generation to produce logo designs based on brand concept and style.",
    tags: ["Python", "Streamlit", "OpenAI API", "Image Generation"],
    links: { view: "#", github: "https://github.com/fildha-p/branding-assistant.git" },
  },
  {
    id: 5,
    title: "My Wedding Planner",
    description:
      "Responsive event planning web app that helps couples manage budgets, vendors, and event tasks in one place. Built with Redux Persist for state persistence across sessions, form validation, and budget tracking.",
    tags: ["React", "Redux Persist", "Tailwind CSS"],
    links: { view: "https://my-portfolio-qein.vercel.app/", github: "https://github.com/fildha-p/My-Wedding-Planner.git" },
  },
];

export const experienceData = [
  {
    id: 1,
    role: "Software Developer",
    company: "Void Vector Ventures LLP, Calicut",
    period: "Mar 2026 – Present",
    bullets: [
      "Built and deployed the company website using Django, Python, and PostgreSQL, hosted on AWS.",
      "Integrated Razorpay payment gateway and Zoho CRM tools into the platform.",
      "Contributing to software development, device integration, and product development workflows.",
      "Gaining hands-on experience in both hardware and software systems in a fast-paced product environment.",
    ],
  },
  {
    id: 2,
    role: "Python Full Stack Development + GenAI Intern",
    company: "HACA, Calicut",
    period: "Sep 2025 – Mar 2026",
    bullets: [
      "Built full stack web application features using Django, React, and MySQL.",
      "Developed backend modules, CRUD workflows, and data management features for web applications.",
      "Integrated frontend components with backend services and authentication-based access flows.",
      "Worked on AI-assisted workflow automation and gained hands-on exposure to Generative AI development tasks.",
    ],
  },
];

export const contactData = {
  headline: "Let's Build Something Meaningful",
  subtext:
    "Whether it's a web application, an AI-powered tool, or an idea worth building — I'm always open to collaborating and learning.",
  email: "fathfildhap@gmail.com",
};

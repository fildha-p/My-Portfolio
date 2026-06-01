"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const brain = {
  greeting:
    "Hi there! I'm Fildha's portfolio assistant. Ask me about her skills, projects, education, experience, AI learning, or contact details.",

  fallback:
    "I'm not sure about that from the portfolio data. Try asking about skills, projects, education, experience, AI learning, or contact details.",

  faq: [
    {
      patterns: [
        "what are her skills",
        "skills",
        "technical skills",
        "what skills does she have",
      ],
      response:
        "Fathima's core skills include Python, Django, React, JavaScript, Tailwind CSS, REST APIs, MySQL, PostgreSQL, Streamlit, OpenAI API, Prompt Engineering, Image Generation, NumPy, Pandas, Matplotlib, Git, GitHub, AWS, Razorpay, and Zoho.",
    },
    {
      patterns: [
        "react",
        "does she know react",
        "frontend",
        "javascript",
        "tailwind",
      ],
      response:
        "Yes, Fathima works with React, JavaScript, HTML, CSS, and Tailwind CSS. She uses React for frontend development and has built responsive web applications with modern UI workflows.",
    },
    {
      patterns: ["python", "django", "backend", "rest api", "fastapi"],
      response:
        "Yes, Fathima has strong backend skills in Python, Django, REST APIs, authentication, CRUD workflows, MySQL, and PostgreSQL. She has also deployed Django applications on AWS.",
    },
    {
      patterns: ["ai", "genai", "openai", "prompt engineering", "streamlit"],
      response:
        "Fathima has worked with OpenAI API, Prompt Engineering, AI image generation, structured LLM applications, and Streamlit-based AI apps including AI Data Analyst, Wedding/Party Theme Generator, and Branding Assistant.",
    },
    {
      patterns: [
        "what is her education",
        "education",
        "degree",
        "college",
        "university",
      ],
      response:
        "Fathima completed a Bachelor of Technology in Computer Science Engineering from APJ Abdul Kalam Technological University, Kerala, from 2021 to 2025.",
    },
    {
      patterns: ["experience", "internship", "work experience", "haca"],
      response:
        "Fathima is a Software Developer at Void Vector Ventures LLP, Calicut from March 2026 to present. She previously worked as a Python Full Stack Development plus Generative AI Intern at HACA, Calicut from September 2025 to March 2026.",
    },
    {
      patterns: [
        "projects",
        "what projects",
        "portfolio projects",
        "built",
      ],
      response:
        "Some of Fathima's featured projects include SkillMap, AI Data Analyst, Wedding/Party Theme Generator, Branding Assistant, and My Wedding Planner.",
    },
    {
      patterns: ["skillmap"],
      response:
        "SkillMap is a role-based skill assessment platform built using Django, MySQL, JavaScript, HTML, and CSS. It helps users evaluate readiness for tech roles through dashboards, readiness scores, skill progression, and session-based authentication.",
    },
    {
      patterns: ["wedding", "wedding planner", "event generator"],
      response:
        "Fathima built My Wedding Planner using React, Redux Persist, and Tailwind CSS. She also built a Wedding/Party Theme Generator using Streamlit and OpenAI API to generate theme titles, taglines, invitation text, decoration ideas, color palettes, and invitation card visuals.",
    },
    {
      patterns: ["ai data analyst", "data analyst", "csv", "data analysis"],
      response:
        "AI Data Analyst is a Streamlit app where users can upload CSV files, explore datasets, view statistics and visualizations, and ask natural language questions powered by OpenAI API.",
    },
    {
      patterns: ["branding", "branding assistant", "logo"],
      response:
        "Branding Assistant is a Streamlit app that generates brand names, slogans, and AI-designed logos from a business idea using OpenAI API and image generation.",
    },
    {
      patterns: ["void vector", "software developer", "aws", "razorpay", "zoho"],
      response:
        "At Void Vector Ventures LLP, Fathima built and deployed the company website using Django, Python, PostgreSQL, and AWS, and integrated Razorpay payment gateway and Zoho CRM tools.",
    },
    {
      patterns: [
        "is she learning ai",
        "currently learning",
        "learning ai",
        "image generation",
      ],
      response:
        "Yes, Fathima is actively exploring Generative AI through OpenAI API, prompt engineering, image generation, Streamlit, and AI-powered application development.",
    },
    {
      patterns: ["contact", "email", "github", "linkedin", "hire"],
      response:
        "You can contact Fathima at fathfildhap@gmail.com. Her phone number is +91 9778731576, GitHub is github.com/fildha-p, and LinkedIn is linkedin.com/in/fathima-fildha.",
    },
  ],
};

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
}

const generateResponse = (input: string) => {
  const query = input.toLowerCase().trim();

  for (const item of brain.faq) {
    if (item.patterns.some((pattern) => query.includes(pattern))) {
      return item.response;
    }
  }

  return brain.fallback;
};

export default function AITerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", sender: "ai", text: brain.greeting },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    const hasSeenAssistant = sessionStorage.getItem("seenPortfolioAssistant");

    if (!hasSeenAssistant) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("seenPortfolioAssistant", "true");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue.trim();

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: userText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: generateResponse(userText),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 flex h-[450px] w-[320px] flex-col overflow-hidden rounded-2xl border border-[rgba(209,131,169,0.3)] bg-[rgba(11,15,25,0.95)] font-jetbrains-mono shadow-[0_10px_40px_rgba(209,131,169,0.2)] backdrop-blur-xl md:w-[380px]"
          >
            <div className="flex items-center justify-between border-b border-[rgba(209,131,169,0.2)] bg-[rgba(15,10,18,0.8)] px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D183A9] opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-[#D183A9]"></span>
                </div>
                <span className="text-sm font-bold text-[#F3C8DD]">
                  Ask Fildha AI
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#71557A] transition-colors hover:text-[#D183A9]"
                title="Close Terminal"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div
              ref={scrollRef}
              className="scrollbar-thin scrollbar-thumb-[rgba(209,131,169,0.3)] scrollbar-track-transparent flex flex-1 flex-col gap-4 overflow-y-auto p-4"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex max-w-[85%] flex-col ${
                    msg.sender === "user"
                      ? "self-end items-end"
                      : "self-start items-start"
                  }`}
                >
                  <span className="mb-1 text-[10px] font-bold text-[#71557A]">
                    {msg.sender === "user" ? "YOU" : "ASSISTANT"}
                  </span>
                  <div
                    className={`rounded-xl px-3 py-2 text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "rounded-tr-none border border-[#D183A9]/30 bg-[#D183A9]/20 text-[#F3C8DD]"
                        : "rounded-tl-none border border-[rgba(113,85,122,0.3)] bg-[rgba(15,10,18,0.6)] text-[var(--color-text-body)]"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="self-start flex max-w-[85%] flex-col items-start">
                  <span className="mb-1 text-[10px] font-bold text-[#71557A]">
                    ASSISTANT
                  </span>
                  <div className="flex items-center gap-1 rounded-xl rounded-tl-none border border-[rgba(113,85,122,0.3)] bg-[rgba(15,10,18,0.6)] px-4 py-3">
                    <div
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#D183A9]"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#D183A9]"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#D183A9]"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex gap-2 border-t border-[rgba(209,131,169,0.2)] bg-[rgba(15,10,18,0.8)] p-3"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about my skills..."
                className="flex-1 rounded-lg border border-[rgba(113,85,122,0.4)] bg-[rgba(11,15,25,0.6)] px-3 py-2 text-sm text-[#F3C8DD] placeholder-[#71557A] transition-colors focus:border-[#D183A9] focus:outline-none"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="flex shrink-0 items-center justify-center rounded-lg bg-[#D183A9] p-2 text-white transition-colors hover:bg-[#a8627f] disabled:cursor-not-allowed disabled:opacity-50"
                title="Send Message"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <div className="mb-2 rounded-full bg-[#D183A9]/20 px-4 py-2 text-s text-[#F3C8DD] shadow-md backdrop-blur-md animate-bounce">
          Ask me anything
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex h-16 w-16 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-[#D183A9]/50 bg-[rgba(15,10,18,0.9)] text-[#D183A9] shadow-[0_0_20px_rgba(209,131,169,0.3)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-[#D183A9] hover:shadow-[0_0_30px_rgba(209,131,169,0.6)] active:scale-95"
      >
        <div className="absolute inset-0 bg-[#D183A9]/10 transition-colors group-hover:bg-[#D183A9]/20" />
        {isOpen ? (
          <svg
            className="relative z-10 h-7 w-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="relative z-10 h-7 w-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}

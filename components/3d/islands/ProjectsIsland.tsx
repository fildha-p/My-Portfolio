import { Html } from "@react-three/drei";
import { useNavigation } from "../../context/NavigationContext";
import Island from "../Island";
import { useState } from "react";

const PROJECTS = [
  { 
    title: "SkillMap", 
    desc: "Role readiness assessment platform that evaluates user skills and maps them to career roles. Includes dynamic dashboards, scoring systems, and secure session-based authentication.", 
    tags: ["Django", "MySQL", "HTML", "CSS", "JavaScript"],
    github: "https://github.com/fildha-p",
    liveDemo: null 
  },
  { 
    title: "My Wedding Planner", 
    desc: "A responsive event planning web app that helps manage budgets, vendors, and event tasks. State persistence ensures smooth planning across sessions.", 
    tags: ["React", "Redux Persist", "Tailwind CSS"],
    github: "https://github.com/fildha-p",
    liveDemo: "https://my-wedding-planner-five.vercel.app/" 
  },
  { 
    title: "Community Complaint & Issue Reporting", 
    desc: "A community management platform enabling residents to submit, track, and resolve local issues. Built with CRUD workflows and MySQL backend.",
    tags: ["Python", "MySQL"],
    github: "https://github.com/fildha-p",
    liveDemo: null 
  },
  { 
    title: "AI Agent Explorer", 
    desc: "An experimental AI application demonstrating agent-based workflows using OpenAI APIs. Generates recipes, performs web research, and executes tool-based actions.",
    tags: ["Python", "OpenAI API", "Pydantic", "Streamlit"],
    github: "https://github.com/fildha-p",
    liveDemo: null 
  },
  { 
    title: "Election Vote Percentage Calculator", 
    desc: "A data analysis tool that processes election data and visualizes vote distributions with dynamic bar and pie chart generation.",
    tags: ["Python", "NumPy", "Pandas", "Matplotlib"],
    github: "https://github.com/fildha-p",
    liveDemo: null 
  }
];

export default function ProjectsIsland({ position }: { position: [number, number, number] }) {
  const { activeIsland } = useNavigation();
  const isActive = activeIsland === 3;
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProject = () => setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
  const prevProject = () => setCurrentIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);

  const activeProject = PROJECTS[currentIndex];

  return (
    <Island id={3} dimensions={[22, 0.6, 16]} position={position} color="#150f16" glowColor="#D183A9" scale={1.2}>
      
      <Html 
        position={[0, 5, 0]} 
        transform 
        center
        occlude="blending"
        className={`pointer-events-auto transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="flex flex-col gap-6 text-center select-none bg-[rgba(26,17,24,0.92)] p-[32px] rounded-[16px] border border-[rgba(209,131,169,0.3)] backdrop-blur-[20px] w-[600px] max-w-[700px]">
          <h2 className="font-playfair text-[2rem] font-bold text-[#F3C8DD]" style={{ textShadow: "0 0 10px rgba(209, 131, 169, 0.4)" }}>
            Featured Projects
          </h2>
          
          {/* Active Project Card */}
          <div className="flex flex-col gap-4 text-left bg-[#0B0F19] p-8 rounded-[16px] border border-[var(--color-jacarta)] relative min-h-[300px] justify-center">
            
            {/* Arrows */}
            <button onClick={prevProject} className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-jacarta)]/50 text-[#F3C8DD] hover:bg-[#D183A9] hover:text-[#1a1118] transition-colors z-10 cursor-pointer text-xl">
              ←
            </button>
            <button onClick={nextProject} className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-jacarta)]/50 text-[#F3C8DD] hover:bg-[#D183A9] hover:text-[#1a1118] transition-colors z-10 cursor-pointer text-xl">
              →
            </button>

            <div className="px-10 flex flex-col gap-4">
              <h3 className="font-playfair text-[#D183A9] font-bold text-[1.8rem] leading-tight mt-2">{activeProject.title}</h3>
              <p className="font-inter text-[var(--color-text-body)] text-[16px] leading-[1.7] min-h-[82px]">{activeProject.desc}</p>
              
              <div className="flex flex-wrap gap-2 mt-1">
                {activeProject.tags.map((tag, i) => (
                  <span key={i} className="text-[14px] text-[var(--color-text-body)] bg-[rgba(209,131,169,0.1)] border border-[rgba(209,131,169,0.4)] px-[16px] py-[6px] rounded-[20px]">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 mt-6">
                {activeProject.liveDemo && (
                  <a href={activeProject.liveDemo} target="_blank" rel="noreferrer" className="px-[24px] py-[10px] bg-gradient-to-r from-[#D183A9] to-[#71557A] text-white rounded-[50px] font-jetbrains-mono text-[14px] font-bold hover:shadow-[0_0_15px_rgba(209,131,169,0.5)] cursor-pointer text-center transition-shadow">
                    Live Demo ↗
                  </a>
                )}
                <a href={activeProject.github} target="_blank" rel="noreferrer" className="px-[24px] py-[10px] bg-transparent border-2 border-[#D183A9] text-[#F3C8DD] rounded-[50px] font-jetbrains-mono text-[14px] font-bold hover:bg-[rgba(209,131,169,0.2)] transition-colors cursor-pointer text-center">
                  GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Carousel Dots */}
          <div className="flex justify-center gap-3 mt-2">
            {PROJECTS.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-colors duration-300 ${currentIndex === idx ? 'bg-[#D183A9] scale-125 shadow-[0_0_10px_rgba(209,131,169,0.5)]' : 'bg-[#3A345B] hover:bg-[#71557A]'}`}
                aria-label={`Go to project ${idx + 1}`}
              />
            ))}
          </div>
          
        </div>
      </Html>
    </Island>
  );
}

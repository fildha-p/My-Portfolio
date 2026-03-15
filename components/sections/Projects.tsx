"use client";
import { useState, useRef, MouseEvent } from "react";

const PROJECTS = [
  { 
    title: "SkillMap", 
    desc: "Role readiness assessment platform that evaluates user skills and maps them to career roles. Includes dynamic dashboards, scoring systems, and secure session-based authentication.", 
    tags: ["Django", "MySQL", "HTML", "CSS", "JavaScript"],
    github: "https://github.com/fildha-p",
    liveDemo: null,
    image: "/images/skillmap.png"
  },
  { 
    title: "My Wedding Planner", 
    desc: "A responsive event planning web app that helps manage budgets, vendors, and event tasks. State persistence ensures smooth planning across sessions.", 
    tags: ["React", "Redux Persist", "Tailwind CSS"],
    github: "https://github.com/fildha-p",
    liveDemo: "https://my-wedding-planner-five.vercel.app/",
    image: "/images/wedding-planner.png"
  },
  { 
    title: "Community Complaint & Issue Reporting", 
    desc: "A community management platform enabling residents to submit, track, and resolve local issues. Built with CRUD workflows and MySQL backend.",
    tags: ["Python", "MySQL"],
    github: "https://github.com/fildha-p",
    liveDemo: null,
    image: "/images/complaint-system.png"
  },
  { 
    title: "AI Agent Explorer", 
    desc: "An experimental AI application demonstrating agent-based workflows using OpenAI APIs. Generates recipes, performs web research, and executes tool-based actions.",
    tags: ["Python", "OpenAI API", "Pydantic", "Streamlit"],
    github: "https://github.com/fildha-p",
    liveDemo: null,
    image: "/images/ai-agent-explorer.png"
  },
  { 
    title: "Election Vote Percentage Calculator", 
    desc: "A data analysis tool that processes election data and visualizes vote distributions with dynamic bar and pie chart generation.",
    tags: ["Python", "NumPy", "Pandas", "Matplotlib"],
    github: "https://github.com/fildha-p",
    liveDemo: null,
    image: "/images/election-calculator.png"
  }
];

function ProjectCard({ proj }: { proj: typeof PROJECTS[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Max rotation 8 degrees for a subtle lift
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div style={{ perspective: "1200px" }} className="h-full">
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="flex flex-col h-full bg-[#1a1118]/90 backdrop-blur-2xl rounded-[20px] border border-[rgba(209,131,169,0.2)] overflow-hidden shadow-lg group relative"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${isHovered ? 1.02 : 1}) translateZ(${isHovered ? '10px' : '0px'})`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out, box-shadow 0.5s ease-out',
          transformStyle: "preserve-3d",
          boxShadow: isHovered ? "0 30px 50px rgba(0,0,0,0.6)" : "0 10px 30px rgba(209,131,169,0.15)"
        }}
      >
        
        {/* Dynamic Highlight tied to mouse position */}
        <div 
          className="absolute inset-0 z-30 pointer-events-none transition-opacity duration-300 mix-blend-overlay"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle 400px at ${rotate.y * 3 + 50}% ${-rotate.x * 3 + 50}%, rgba(209,131,169,0.15) 0%, transparent 80%)`
          }}
        />

        {/* Card Image Header */}
        <div className="h-48 w-full relative overflow-hidden bg-[#1b1220] border-b border-[rgba(209,131,169,0.1)] group-hover:border-[rgba(209,131,169,0.4)] transition-colors duration-500">
          <div className="absolute inset-0 shadow-[inset_0_0_0_rgba(209,131,169,0)] group-hover:shadow-[inset_0_0_20px_rgba(209,131,169,0.3)] rounded-t-[20px] transition-shadow duration-500 z-10 pointer-events-none" />
          
          <img 
            src={proj.image} 
            alt={proj.title} 
            className="w-full h-full object-cover rounded-t-[20px] transition-all duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100 mix-blend-lighten"
          />
        </div>

        {/* Card Body */}
        <div className="p-8 flex flex-col flex-grow gap-4 relative z-20">
          <h3 className="font-playfair text-[#D183A9] font-bold text-2xl leading-tight group-hover:text-[#F3C8DD] transition-colors" style={{ transform: isHovered ? "translateZ(30px)" : "translateZ(0px)", transition: "transform 0.3s" }}>
            {proj.title}
          </h3>
          <p className="font-inter text-[var(--color-text-body)] text-[15px] leading-relaxed flex-grow">
            {proj.desc}
          </p>
          
          <div className="flex flex-wrap gap-2 mt-2" style={{ transform: isHovered ? "translateZ(20px)" : "translateZ(0px)", transition: "transform 0.3s" }}>
            {proj.tags.map((tag, i) => (
              <span key={i} className="font-jetbrains-mono text-[11px] text-[#71557A] bg-[#0B0F19] border border-[#3A345B] px-[12px] py-[4px] rounded-md tracking-wide">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-4 mt-6 pt-6 border-t border-[rgba(209,131,169,0.1)]" style={{ transform: isHovered ? "translateZ(40px)" : "translateZ(0px)", transition: "transform 0.3s" }}>
            {proj.liveDemo && (
              <a href={proj.liveDemo} target="_blank" rel="noreferrer" className="flex-1 py-2.5 bg-[#D183A9]/10 text-[#D183A9] hover:bg-[#D183A9] hover:text-white rounded-full font-jetbrains-mono text-[13px] font-bold transition-colors text-center cursor-pointer border border-[#D183A9]/50 hover:border-transparent">
                Live Demo ↗
              </a>
            )}
            <a href={proj.github} target="_blank" rel="noreferrer" className="flex-1 py-2.5 bg-transparent border border-[#71557A] text-[#F3C8DD] rounded-full font-jetbrains-mono text-[13px] font-bold hover:bg-[#71557A]/20 transition-colors text-center cursor-pointer">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

import { motion, Variants } from "framer-motion";

export default function Projects() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="projects" className="w-full py-24 relative z-10 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4"
        >
          <div className="h-px bg-gradient-to-l from-[#D183A9] to-transparent flex-grow mr-4 opacity-50" />
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#F3C8DD]">
            Featured Projects
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {PROJECTS.map((proj, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <ProjectCard proj={proj} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { projectsData } from "@/data/portfolioData";
import { ArrowRight, ExternalLink } from "lucide-react";
import React, { useRef, useState } from "react";

interface ProjectData {
  id: number;
  title: string;
  description: string;
  tags: string[];
  links: {
    github: string;
    view?: string;
  };
}

interface ProjectCardProps {
  project: ProjectData;
  idx?: number;
  isEven: boolean;
  isAIAgent: boolean;
}

function ProjectCard({ project, isEven, isAIAgent }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const { left, top, width, height } = card.getBoundingClientRect();
    
    // Rotation Calculation
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;
    
    const maxRotateX = 5;
    const maxRotateY = 8;
    const rotateYVal = ((mouseX / width) * 2 - 1) * maxRotateY;
    const rotateXVal = -((mouseY / height) * 2 - 1) * maxRotateX;

    setRotateX(rotateXVal);
    setRotateY(rotateYVal);

    // Glare Calculation
    setGlarePosition({
      x: (mouseX / width) * 100,
      y: (mouseY / height) * 100,
      opacity: 0.15
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePosition({ x: 50, y: 50, opacity: 0 });
  };

  // Target overrides based on index/id for live demo
  const liveDemoLink = project.id === 2 ? "https://my-wedding-planner-five.vercel.app/" : null;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? 80 : -80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative group block overflow-visible preserve-3d"
      style={{ perspective: "1500px" }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: rotateX === 0 && rotateY === 0 ? "transform 0.5s ease-out, box-shadow 0.5s ease-out" : "box-shadow 0.1s ease-out",
          boxShadow: rotateX || rotateY ? "0 25px 50px -12px rgba(209, 131, 169, 0.25)" : "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
        }}
        className="relative z-10 w-full glass-card p-[1px] rounded-3xl overflow-hidden preserve-3d"
      >
        {/* Dynamic Glare Effect */}
        <div 
          className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300 rounded-3xl"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(209,131,169,${glarePosition.opacity}), transparent 40%)`
          }}
        />

        {/* Special gradient animated border wrapper for project 4 */}
        {isAIAgent && (
          <div className="absolute inset-0 bg-gradient-to-r from-middle-purple via-queen-pink to-middle-purple bg-[length:200%_auto] animate-[gradient_3s_linear_infinite] opacity-50 z-0" />
        )}

        <div className={`relative z-10 w-full h-full rounded-[23px] bg-surface p-10 md:p-16 flex flex-col md:flex-row items-center gap-10 overflow-hidden transition-colors duration-500 group-hover:bg-[#2e1d2a] ${isAIAgent ? 'bg-[#2a1a27]' : ''}`}>
          
          {/* Watermark Number */}
          <span className="absolute -left-4 -top-8 text-[12rem] md:text-[18rem] font-playfair font-black text-white/[0.03] select-none pointer-events-none z-0 tracking-tighter leading-none">
            0{project.id}
          </span>

          <div className="flex-1 w-full relative z-10" style={{ transform: "translateZ(30px)" }}>
            <div className="flex items-center gap-4 mb-4">
              <h3 className="text-3xl md:text-5xl font-bold font-playfair text-queen-pink tracking-tight drop-shadow-sm">
                {project.title}
              </h3>
              {isAIAgent && (
                <div className="flex items-center gap-2 px-3 py-1 bg-middle-purple/10 border border-middle-purple/40 rounded-full font-jetbrains-mono text-queen-pink text-xs font-bold uppercase tracking-widest relative overflow-hidden">
                  <span className="absolute inset-0 bg-middle-purple/20 animate-pulse pointer-events-none" />
                  AI
                </div>
              )}
            </div>
            
            <p className="text-text-body text-lg md:text-xl mb-8 leading-relaxed max-w-3xl font-light">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-8 md:mb-0">
              {project.tags.map((tag: string, tagIdx: number) => (
                <span
                  key={tagIdx}
                  className="px-4 py-1.5 bg-old-lavender/10 border border-old-lavender/30 rounded-full text-xs font-jetbrains-mono text-queen-pink"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Buttons Area */}
          <div className="relative z-10 shrink-0 self-start md:self-center mt-4 md:mt-0 flex flex-col sm:flex-row gap-4 w-full md:w-auto" style={{ transform: "translateZ(40px)" }}>
            
            {/* Live Demo Button */}
            {liveDemoLink ? (
              <a
                href={liveDemoLink}
                target="_blank"
                rel="noreferrer"
                className="flex-1 md:flex-none shrink-0 group/demo relative px-6 py-4 bg-gradient-accent text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(209,131,169,0.5)] flex items-center justify-center gap-2"
              >
                <span className="font-jetbrains-mono text-sm tracking-wider uppercase">Live Demo</span>
                <ExternalLink size={18} className="transform group-hover/demo:translate-x-1 group-hover/demo:-translate-y-1 transition-transform" />
              </a>
            ) : (
              <div className="flex-1 md:flex-none shrink-0 px-6 py-4 bg-jacarta/30 border border-old-lavender/20 text-white/40 rounded-xl font-medium cursor-not-allowed flex items-center justify-center gap-2">
                <span className="font-jetbrains-mono text-sm tracking-wider uppercase">Live Demo</span>
              </div>
            )}

            {/* GitHub Button */}
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="flex-none shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-xl border border-middle-purple/30 flex items-center justify-center transition-all duration-500 hover:border-queen-pink hover:bg-middle-purple/20 group/git"
            >
              <ArrowRight className="text-queen-pink transition-transform duration-500 group-hover/git:-rotate-45" size={24} />
            </a>
            
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6 md:px-12 relative overflow-hidden bg-base-dark">
      <div className="max-w-6xl mx-auto cursor-default">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-24"
        >
          <div className="font-jetbrains-mono text-old-lavender mb-2 tracking-wider text-sm">
            SELECTED_WORK
          </div>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-queen-pink">
            Featured Projects
          </h2>
        </motion.div>

        <div className="space-y-16">
          {projectsData.map((project, idx) => (
            <ProjectCard 
              key={project.id}
              project={project}
              idx={idx}
              isEven={idx % 2 === 0}
              isAIAgent={project.id === 4}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

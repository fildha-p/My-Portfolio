"use client";
import { useState, useRef, MouseEvent } from "react";
import { motion } from "framer-motion";

export default function About() {
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
    
    // Max rotation 12 degrees
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const codeString = `const fathima = {
  role: "Full Stack Developer",
  stack: ["Django", "React", "Python"],
  exploring: ["AI Agents", "LLMs", "OpenAI"],
  status: "open_to_opportunities",
  location: "Kerala, India 🌴"
};`;

  return (
    <section id="about" className="w-full py-24 relative z-10 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        
        {/* Left: Text */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 flex flex-col gap-6"
        >
          <div className="flex items-center gap-4">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#F3C8DD]">
              About Me
            </h2>
            <div className="h-px bg-gradient-to-r from-[#D183A9] to-transparent flex-grow ml-4 opacity-50" />
          </div>
          
          <h3 className="font-jetbrains-mono text-[14px] text-[#71557A] font-bold tracking-widest uppercase">
            // The Journey
          </h3>
          
          <div className="font-inter text-[var(--color-text-body)] text-lg leading-relaxed flex flex-col gap-4">
            <p>
              I'm a Full Stack Developer from Kerala with a strong foundation in Django, React, and modern web architecture. My work focuses on building scalable web applications that combine clean backend logic with intuitive user experiences.
            </p>
            <p>
              Recently, I've been heavily exploring Generative AI — experimenting with AI agents, OpenAI APIs, and structured LLM applications to build intelligent data tools. My approach bridges the gap between raw data sets and elegant frontend visualization.
            </p>
          </div>

          <div className="flex flex-wrap gap-8 mt-6">
            <div className="flex flex-col">
              <span className="font-playfair text-4xl text-[#D183A9] font-bold">5+</span>
              <span className="font-jetbrains-mono text-xs text-[var(--color-text-muted)] mt-1 uppercase tracking-wider">Completed Projects</span>
            </div>
            <div className="flex flex-col">
              <span className="font-playfair text-4xl text-[#D183A9] font-bold">B.Tech</span>
              <span className="font-jetbrains-mono text-xs text-[var(--color-text-muted)] mt-1 uppercase tracking-wider">Computer Science</span>
            </div>
            <div className="flex flex-col">
              <span className="font-playfair text-4xl text-[#D183A9] font-bold">GenAI</span>
              <span className="font-jetbrains-mono text-xs text-[var(--color-text-muted)] mt-1 uppercase tracking-wider">Explorer Track</span>
            </div>
          </div>
        </motion.div>

        {/* Right: Code Block with 3D Tilt */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex-1 w-full lg:max-w-lg" 
          style={{ perspective: "1200px" }}
        >
          <div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{ 
              transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${isHovered ? 1.02 : 1})`,
              transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
              transformStyle: "preserve-3d"
            }}
            className="bg-[rgba(11,15,25,0.8)] backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-[rgba(209,131,169,0.2)] shadow-[0_20px_40px_rgba(0,0,0,0.5)] relative group cursor-crosshair"
          >
            
            {/* Window Controls */}
            <div className="flex gap-2 mb-6" style={{ transform: "translateZ(30px)" }}>
              <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
              <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
            </div>

            <pre 
              className="font-jetbrains-mono text-[14px] md:text-[15px] leading-loose text-[#F3C8DD] overflow-x-auto"
              style={{ transform: "translateZ(40px)" }}
            >
              <code>{codeString}</code>
            </pre>

            {/* Subtle interactive glow effect behind card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#D183A9]/30 to-[#71557A]/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-1000 -z-10" />
            
            {/* Inner dynamic highlight */}
            <div 
              className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"
              style={{
                background: `radial-gradient(circle at ${rotate.y * 5 + 50}% ${-rotate.x * 5 + 50}%, rgba(255,255,255,0.15) 0%, transparent 60%)`
              }}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}

"use client";
import { motion } from "framer-motion";

export default function Experience() {
  return (
    <section id="experience" className="w-full py-24 relative z-10 px-6 bg-[rgba(15,10,18,0.3)] overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-16">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#F3C8DD]">
            Professional Timeline
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#D183A9] to-transparent rounded-full mt-2" />
        </motion.div>

        <div className="w-full max-w-4xl relative">
          {/* Vertical Line */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-6 md:left-1/2 top-0 w-px bg-gradient-to-b from-[#D183A9]/50 via-[#71557A]/50 to-transparent -translate-x-1/2" 
          />
          
          <div className="flex flex-col gap-16 w-full">
            
            {/* Experience Item */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative flex flex-col md:flex-row items-start md:items-center justify-between w-full group"
            >
              {/* Timeline Dot */}
              <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-[#D183A9] border-[4px] border-[#1a1118] -translate-x-1/2 mt-6 md:mt-0 shadow-[0_0_15px_rgba(209,131,169,0.8)] z-10 transition-transform group-hover:scale-125" />
              
              {/* Left Side (Empty on Desktop for timeline alignment) */}
              <div className="hidden md:block md:w-[45%]" />
              
              {/* Content Box */}
              <div className="w-full md:w-[45%] pl-16 md:pl-0 bg-[rgba(11,15,25,0.7)] backdrop-blur-md p-8 rounded-2xl border border-[rgba(209,131,169,0.2)] hover:border-[#D183A9]/50 transition-colors shadow-lg relative">
                <span className="absolute -top-4 right-8 bg-[#3A345B] text-[#D183A9] px-4 py-1 rounded-full text-xs font-jetbrains-mono font-bold border border-[#71557A]">
                  Sep 2025 — Mar 2026
                </span>
                
                <h3 className="font-jetbrains-mono font-bold text-xl text-[#D183A9] mb-1">
                  HACA Calicut
                </h3>
                <h4 className="font-inter text-md text-[#F3C8DD] mb-1 font-medium">
                  Python Django Full Stack Developer Intern
                </h4>
                <p className="font-jetbrains-mono text-sm text-[#71557A] mb-4">
                  Generative AI Track
                </p>
                
                <ul className="font-inter text-sm md:text-[15px] leading-[1.7] text-[var(--color-text-body)] list-disc pl-4 space-y-2 marker:text-[#D183A9]">
                  <li>Built full stack web application features using Django, React, and MySQL.</li>
                  <li>Developed backend modules, CRUD workflows, and robust data management features.</li>
                  <li>Integrated complex frontend components with secure backend services and authentication flows.</li>
                  <li>Worked directly on AI-assisted workflow automation and Generative AI development tasks.</li>
                </ul>
              </div>
            </motion.div>

            {/* Education Item */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="relative flex flex-col md:flex-row-reverse items-start md:items-center justify-between w-full group"
            >
              {/* Timeline Dot */}
              <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-[#3A345B] border-[4px] border-[#1a1118] -translate-x-1/2 mt-6 md:mt-0 z-10 transition-transform group-hover:bg-[#D183A9] group-hover:scale-125" />
              
              {/* Left Side (Empty on Desktop for timeline alignment) */}
              <div className="hidden md:block md:w-[45%]" />
              
              {/* Content Box */}
              <div className="w-full md:w-[45%] pl-16 md:pl-0 pr-0 md:pr-0 bg-[rgba(11,15,25,0.4)] backdrop-blur-md p-8 rounded-2xl border border-[rgba(113,85,122,0.3)] hover:border-[#71557A]/80 transition-colors text-left md:text-right relative">
                <span className="absolute -top-4 left-16 md:left-auto md:right-8 bg-[#1a1118] text-[#71557A] px-4 py-1 rounded-full text-xs font-jetbrains-mono font-bold border border-[#3A345B]">
                  2021 — 2025
                </span>
                
                <h3 className="font-jetbrains-mono font-bold text-lg text-[#F3C8DD] mb-2 leading-tight">
                  APJ Abdul Kalam Technological University
                </h3>
                <h4 className="font-inter text-md text-[#D183A9] font-medium">
                  B.Tech in Computer Science Engineering
                </h4>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}

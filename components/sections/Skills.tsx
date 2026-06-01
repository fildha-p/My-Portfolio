"use client";
import { motion, Variants } from "framer-motion";
import SkillBouncer from "../ui/SkillBouncer";
import { skillsData } from "@/data/portfolioData";

export default function Skills() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section id="skills" className="w-full py-24 relative z-10 px-6 bg-[rgba(15,10,18,0.3)] overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#F3C8DD]">
            Core Competencies
          </h2>
          <p className="font-inter text-[var(--color-text-body)] max-w-2xl text-lg">
            A comprehensive overview of the technologies and tools I use to build scalable, full-stack intelligence applications.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4"
        >
          {skillsData.map((skill, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className="flex flex-col gap-6 bg-[rgba(11,15,25,0.6)] backdrop-blur-md p-6 rounded-2xl border border-[rgba(209,131,169,0.15)] hover:border-[#D183A9]/40 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-[#D183A9]/50 group-hover:w-12 transition-all" />
                <h3 className="font-jetbrains-mono text-[#D183A9] text-[13px] font-bold tracking-widest uppercase leading-snug">
                  {skill.category}
                </h3>
              </div>
              
              <SkillBouncer skills={skill.items} />
              
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

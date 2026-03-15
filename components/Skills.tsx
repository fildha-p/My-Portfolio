"use client";

import { motion, Variants } from "framer-motion";
import { skillsData } from "@/data/portfolioData";

export default function Skills() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const categoryVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut", staggerChildren: 0.05 } },
  };

  const pillVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const proficiencies: Record<string, number> = {
    Frontend: 85,
    Backend: 80,
    "AI/GenAI": 65,
    Data: 70,
    Tools: 90,
    Database: 75,
  };

  return (
    <section className="py-32 px-6 md:px-12 relative overflow-hidden bg-jacarta/20 bg-grid-pattern border-t border-middle-purple/10">
      
      {/* Background Depth Orbs */}
      <motion.div
        animate={{ y: [0, -40, 0], x: [0, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-old-lavender/30 rounded-full blur-[100px] -z-10 pointer-events-none"
      />
      
      {/* Heavy Jacarta tint overlay */}
      <div className="absolute inset-0 bg-[#3A345B]/60 mix-blend-multiply -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20"
        >
          <div className="font-jetbrains-mono text-old-lavender mb-2 tracking-wider text-sm">
            EXPERTISE
          </div>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-queen-pink">
            Technologies I Work With
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20"
        >
          {skillsData.map((category, idx) => (
            <motion.div key={idx} variants={categoryVariants} className="flex flex-col group">
              
              <div className="flex justify-between items-end mb-4 border-b border-old-lavender/20 pb-4 relative">
                <h3 className="text-xl font-bold font-playfair italic text-white tracking-wide">
                  {category.category}
                </h3>
                <span className="font-jetbrains-mono text-middle-purple text-sm">{proficiencies[category.category] || 80}%</span>
                
                {/* Progress Bar Track */}
                <div className="absolute -bottom-[1px] left-0 w-full h-[1px] bg-white/5" />
                {/* Progress Bar Fill */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${proficiencies[category.category] || 80}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                  className="absolute -bottom-[1px] left-0 h-[1px] bg-gradient-to-r from-old-lavender to-queen-pink shadow-[0_0_10px_rgba(243,200,221,0.6)]"
                />
              </div>

              {/* Skill Pills Container - applying perspective for 3D child pops */}
              <div className="flex flex-wrap gap-3 mt-4" style={{ perspective: "1000px" }}>
                {category.items.map((item, itemIdx) => (
                  <motion.div
                    key={itemIdx}
                    variants={pillVariants}
                    style={{ transformStyle: "preserve-3d" }}
                    whileHover={{ 
                      translateZ: 10, 
                      scale: 1.1,
                      borderColor: "#D183A9",
                      backgroundColor: "rgba(75, 21, 53, 0.4)",
                      boxShadow: "0 0 20px rgba(209,131,169,0.4)"
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="px-4 py-2 bg-surface border border-old-lavender/40 rounded-full text-sm font-medium text-text-body cursor-default transition-colors duration-300 transform-gpu"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

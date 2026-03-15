"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { experienceData } from "@/data/portfolioData";

export default function Experience() {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start center", "end center"],
  });

  return (
    <section id="experience" className="py-32 px-6 md:px-12 bg-jacarta relative overflow-hidden border-t border-old-lavender/20">
      
      {/* Background Depth Orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-brown-chocolate/40 rounded-full blur-[120px] -z-10 pointer-events-none"
      />

      <div className="max-w-4xl mx-auto z-10 relative" ref={scrollRef}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-24"
        >
          <div className="font-jetbrains-mono text-queen-pink mb-2 tracking-wider text-sm">
            EXPERIENCE
          </div>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-queen-pink">
            Professional Timeline
          </h2>
        </motion.div>

        <div className="relative">
          {/* Animated Timeline Path behind dots */}
          <div className="absolute left-[34px] md:left-[39px] top-6 bottom-6 w-[2px] bg-middle-purple/10" />
          <motion.div 
            style={{ scaleY: scrollYProgress }} 
            className="absolute left-[34px] md:left-[39px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-queen-pink to-middle-purple origin-top shadow-[0_0_15px_rgba(243,200,221,0.6)]"
          />

          <div className="space-y-24">
            {experienceData.map((exp) => (
              <motion.div 
                key={exp.id} 
                className="relative flex items-start group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
              >
                {/* Timeline Dot Setup */}
                <div className="shrink-0 w-20 flex justify-center pt-2 relative z-10">
                  <div className="w-5 h-5 bg-base-dark border-2 border-old-lavender rounded-full group-hover:border-queen-pink transition-colors duration-500 relative">
                    <motion.div
                      className="absolute inset-[2px] bg-queen-pink rounded-full"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    />
                    <div className="absolute inset-0 rounded-full bg-queen-pink/50 blur-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>

                <div className="flex-1 ml-4 md:ml-8 mt-1">
                  <div className="mb-6">
                    <h3 className="text-3xl md:text-4xl font-bold font-playfair text-white mb-2 tracking-wide">
                      {exp.role}
                    </h3>
                    <div className="font-jetbrains-mono text-queen-pink text-sm tracking-wider uppercase flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <span>{exp.company}</span>
                      <span className="hidden sm:inline text-white/20">|</span>
                      <span className="text-old-lavender">{exp.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-4">
                    {exp.bullets.map((bullet, bIdx) => (
                      <motion.li 
                        key={bIdx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.3 + (bIdx * 0.1) }}
                        className="flex items-start text-text-body/90 text-lg leading-relaxed font-light"
                      >
                        <span className="text-middle-purple font-jetbrains-mono mr-4 mt-1 opacity-80">
                          {">"}
                        </span>
                        {bullet}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

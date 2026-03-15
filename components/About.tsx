"use client";

import { motion, Variants } from "framer-motion";
import { aboutData } from "@/data/portfolioData";

const codeContent = `const fathima = {
  role: "Full Stack Developer",
  stack: ["Django", "React", "Python"],
  exploring: ["AI Agents", "LLMs", "OpenAI"],
  status: "open_to_opportunities",
  location: "Kerala, India 🌴"
};`;

export default function About() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const lineVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const codeCharVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <section id="about" className="py-32 px-6 md:px-12 relative overflow-hidden bg-gradient-alt">
      
      {/* Background Depth Orbs */}
      <motion.div
        animate={{ y: [0, 50, 0], x: [0, -40, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-jacarta/40 rounded-full blur-[120px] -z-10 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Side */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="flex flex-col z-10"
          >
            <motion.div variants={lineVariants} className="font-jetbrains-mono text-queen-pink mb-6 tracking-wider text-sm">
              ABOUT_ME
            </motion.div>

            <div className="space-y-6 text-lg text-text-muted leading-relaxed mb-12">
              {aboutData.copy.map((paragraph, idx) => (
                <motion.p key={idx} variants={lineVariants}>
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {aboutData.stats.map((stat, idx) => (
                <motion.div key={idx} variants={lineVariants} className="flex flex-col border-l-2 border-middle-purple/30 pl-4">
                  <div className="text-3xl font-bold font-playfair text-queen-pink mb-1 tracking-tight">
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 + idx * 0.2 }}
                    >
                      {stat.value}
                    </motion.span>
                  </div>
                  <div className="text-xs font-jetbrains-mono text-old-lavender uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: 3D Code Block */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative h-full min-h-[400px] w-full flex items-center justify-center lg:justify-end preserve-3d group"
            style={{ perspective: "1000px" }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-middle-purple/10 rounded-full blur-[100px] -z-10" />
            
            <motion.div 
               className="w-full max-w-lg glass-card p-6 md:p-8 border border-middle-purple/30 shadow-[0_0_50px_rgba(209,131,169,0.1)] rounded-xl relative overflow-hidden transition-all duration-700 ease-out"
               style={{ transform: "rotateY(-5deg)" }}
               whileHover={{ rotateY: 0, scale: 1.02, boxShadow: "0 0 60px rgba(209,131,169,0.25)" }}
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-middle-purple to-queen-pink opacity-50" />
              
              <div className="flex items-center gap-2 mb-6 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-3 h-3 rounded-full bg-red-400 shadow-[0_0_5px_rgba(248,113,113,0.5)]" />
                <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_5px_rgba(250,204,21,0.5)]" />
                <div className="w-3 h-3 rounded-full bg-green-400 shadow-[0_0_5px_rgba(74,222,128,0.5)]" />
              </div>

              <motion.pre
                variants={{ visible: { transition: { staggerChildren: 0.015 } } }}
                className="font-jetbrains-mono text-sm md:text-base text-text-body whitespace-pre-wrap leading-relaxed"
              >
                {Array.from(codeContent).map((char, i) => {
                  let colorClass = "text-text-body";
                  if (char === "{" || char === "}" || char === "[" || char === "]") colorClass = "text-queen-pink";
                  if (char === ":" || char === "=") colorClass = "text-middle-purple";
                  if (char === '"') colorClass = "text-old-lavender opacity-90";
                  
                  return (
                    <motion.span key={i} variants={codeCharVariants} className={colorClass}>
                      {char}
                    </motion.span>
                  );
                })}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-2 h-5 bg-queen-pink ml-1 align-middle"
                />
              </motion.pre>
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}

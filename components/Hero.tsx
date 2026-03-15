"use client";

import { motion, Variants } from "framer-motion";
import { heroData } from "@/data/portfolioData";
import Image from "next/image";
import { useState, useRef } from "react";

export default function Hero() {
  const words = heroData.headline;
  const subheadlineChars = Array.from(heroData.subheadline);

  const wordVariants: Variants = {
    hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { delay: i * 0.15, duration: 0.8, ease: "easeOut" },
    }),
  };

  const charVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // 3D Tilt Logic
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const { left, top, width, height } = card.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Max rotation 8 degrees
    const rX = -(mouseY / (height / 2)) * 8;
    const rY = (mouseX / (width / 2)) * 8;
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center px-6 md:px-12 overflow-hidden bg-gradient-hero">
      
      {/* 3D Depth Orbs Background */}
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 right-10 w-[300px] h-[300px] bg-middle-purple/30 rounded-full blur-[80px] -z-10 pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 40, 0], x: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-jacarta/50 rounded-full blur-[100px] -z-10 pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-old-lavender/40 rounded-full blur-[60px] -z-10 pointer-events-none"
      />
      
      {/* Very subtle noise overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%220.08%22/%3E%3C/svg%3E')] pointer-events-none mix-blend-overlay -z-0" />

      <div className="max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center pt-20">
        
        {/* Left Content */}
        <div className="flex flex-col items-start text-left xl:pt-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-jetbrains-mono text-sm text-middle-purple mb-4 opacity-80"
          >
            Hi, I'm
          </motion.div>

          {/* NAME */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="text-[clamp(3rem,6vw,5rem)] font-bold font-playfair leading-[1.1] mb-4 text-queen-pink tracking-tight"
            style={{ textShadow: "0 0 40px rgba(209,131,169,0.5)" }}
          >
            Fathima Fildha
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-jetbrains-mono text-xs sm:text-sm text-old-lavender mb-8 tracking-widest uppercase border-l-2 border-middle-purple pl-4"
          >
            <span className="text-queen-pink">✦</span> Full Stack Developer <span className="text-middle-purple/50">·</span> Django <span className="text-middle-purple/50">·</span> React <span className="text-middle-purple/50">·</span> AI
          </motion.div>

          {/* Headline / Tagline */}
          <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-bold font-playfair leading-[1.3] mb-6 tracking-tight flex flex-wrap text-text-body">
            {words.map((word, i) => (
              <motion.span
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                key={i}
                className="inline-block mr-[1.5vw] mb-1"
              >
                {word}
              </motion.span>
            ))}
          </h2>

          <motion.div
             initial="hidden"
             animate="visible"
             variants={{ visible: { transition: { staggerChildren: 0.015, delayChildren: words.length * 0.1 + 0.6 } } }}
             className="text-base md:text-lg text-text-muted mb-10 max-w-xl leading-relaxed min-h-[4rem] flex flex-wrap whitespace-pre-wrap font-light"
          >
            {subheadlineChars.map((char, i) => (
              <motion.span key={i} variants={charVariants}>{char}</motion.span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: words.length * 0.1 + 1.0, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-5"
          >
            <a
              href="#projects"
              className="group relative px-6 py-3 bg-gradient-accent text-white rounded-full font-medium transition-all duration-500 transform hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(209,131,169,0.7)] hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10 font-jetbrains-mono uppercase text-sm tracking-wider">View My Work</span>
            </a>
            <a
              href="https://github.com/fildha-p"
              target="_blank"
              rel="noreferrer"
              className="group relative px-6 py-3 border border-middle-purple rounded-full font-medium text-white overflow-hidden transition-all duration-300"
            >
              <div className="absolute inset-0 bg-middle-purple/20 w-0 group-hover:w-full transition-all duration-500 ease-out z-0" />
              <span className="relative z-10 font-jetbrains-mono uppercase text-sm tracking-wider group-hover:text-queen-pink transition-colors">Explore GitHub</span>
            </a>
          </motion.div>
        </div>

        {/* Right Content: 3D Photo Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          className="relative lg:ml-auto w-full max-w-[400px] mx-auto hidden lg:block preserve-3d -mt-10 xl:-mt-20"
          style={{ perspective: "1000px" }}
        >
          {/* Subtle Pink Glow behind the card */}
          <div className="absolute inset-0 bg-middle-purple/40 blur-[80px] rounded-full scale-110 -z-10 animate-pulse" />

          {/* Floating Animation Wrapper */}
          <div className="animate-[float_6s_ease-in-out_infinite] preserve-3d">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                transition: rotateX === 0 && rotateY === 0 ? "transform 0.5s ease-out" : "none"
              }}
              className="relative w-full aspect-[4/5] rounded-[24px] overflow-hidden border-2 border-middle-purple/40 shadow-[0_0_40px_rgba(209,131,169,0.3)] bg-gradient-accent p-1"
            >
              <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-base-dark">
                <Image 
                  src="/profile.jpg" 
                  alt="Fathima Fildha P" 
                  fill
                  className="object-cover object-top opacity-90 transition-opacity duration-300 hover:opacity-100"
                  priority
                />
                
                {/* Internal glass sheen / glare effect */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(${135 + rotateX * 2}deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.5) 100%)`
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

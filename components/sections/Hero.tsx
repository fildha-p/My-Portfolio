"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, Float } from "@react-three/drei";
import { useRef, useState, useEffect, MouseEvent } from "react";
import * as THREE from "three";

import { motion, AnimatePresence } from "framer-motion";
import { heroData } from "@/data/portfolioData";

function HeroShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <Icosahedron ref={meshRef} args={[1, 0]} scale={2.5}>
        <meshStandardMaterial color="#D183A9" wireframe transparent opacity={0.3} emissive="#D183A9" emissiveIntensity={0.8} />
      </Icosahedron>
    </Float>
  );
}

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPhotoHovered, setIsPhotoHovered] = useState(false);
  const photoRef = useRef<HTMLDivElement>(null);
  const [photoRotate, setPhotoRotate] = useState({ x: 0, y: 0 });
  const [showPulse, setShowPulse] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowPulse(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  const handlePhotoMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!photoRef.current) return;
    const rect = photoRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    
    setPhotoRotate({ x: rotateX, y: rotateY });
  };

  const handlePhotoMouseLeave = () => {
    setPhotoRotate({ x: 0, y: 0 });
    setIsPhotoHovered(false);
  };

  return (
    <section id="hero" className="w-full min-h-screen flex items-center justify-center pt-24 pb-12 relative z-10 px-6 overflow-hidden">
      <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        
        {/* Left Side: Text */}
        <motion.div 
          className="flex flex-col gap-4 flex-grow z-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
        >
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="font-jetbrains-mono text-[14px] text-[var(--color-accent-primary)] tracking-wider"
          >
            Hi, I'm
          </motion.p>
          <motion.h1 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="font-playfair text-5xl md:text-7xl leading-tight font-bold text-[#F3C8DD]" 
            style={{ textShadow: "0 0 20px rgba(209, 131, 169, 0.3)" }}
          >
            Fathima Fildha
          </motion.h1>
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="font-inter text-[#D183A9] text-lg md:text-xl font-medium tracking-wide mt-2"
          >
            ✦ Full Stack Developer · Django · React · AI
          </motion.p>
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="font-inter text-[var(--color-text-body)] text-lg max-w-xl mt-4 leading-relaxed"
          >
            {heroData.subheadline}
          </motion.p>
          
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
            <a 
              href="#projects"
              className="px-8 py-3.5 bg-[#D183A9] text-white rounded-full font-jetbrains-mono text-[14px] font-bold hover:bg-[#a8627f] transition-all shadow-lg hover:shadow-[0_0_20px_rgba(209,131,169,0.5)] text-center cursor-pointer"
            >
              View My Work
            </a>
            <a 
              href="https://github.com/fildha-p" 
              target="_blank" 
              rel="noreferrer"
              className="px-8 py-3.5 bg-transparent border-2 border-[#D183A9] text-[#F3C8DD] rounded-full font-jetbrains-mono text-[14px] font-bold hover:bg-[rgba(209,131,169,0.1)] transition-colors text-center cursor-pointer"
            >
              Explore GitHub
            </a>
          </motion.div>
        </motion.div>
        
        {/* Right Side: Photo with 3D Canvas */}
        <div className="shrink-0 relative z-20 flex flex-col items-center gap-3">
          <div 
            className="relative flex justify-center items-center w-[300px] h-[360px] md:w-[350px] md:h-[450px]"
            style={{ perspective: "1000px" }}
          >
          {/* Absolutely positioned small 3D Canvas behind the image */}
          <div className="absolute inset-0 z-0 pointer-events-none -left-12 -top-12 scale-150 opacity-60">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} color="#F3C8DD" />
              <HeroShape />
            </Canvas>
          </div>

          <div 
            ref={photoRef}
            onMouseMove={handlePhotoMouseMove}
            onMouseEnter={() => setIsPhotoHovered(true)}
            onMouseLeave={handlePhotoMouseLeave}
            onClick={() => setIsModalOpen(true)}
            title="Click to view profile"
            aria-label="View profile card"
            className="relative cursor-pointer group w-full h-full flex justify-center items-center"
            style={{ 
              transform: `rotateX(${photoRotate.x}deg) rotateY(${photoRotate.y}deg) scale(${isPhotoHovered ? 1.05 : 1})`,
              transition: isPhotoHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
              transformStyle: "preserve-3d"
            }}
          >
            {/* Interactive inner glow on hover */}
            <div 
              className="absolute inset-0 z-30 pointer-events-none transition-opacity duration-300 mix-blend-overlay rounded-[24px]"
              style={{
                opacity: isPhotoHovered ? 1 : 0,
                background: `radial-gradient(circle 200px at ${photoRotate.y * 5 + 50}% ${-photoRotate.x * 5 + 50}%, rgba(255,255,255,0.2) 0%, transparent 80%)`
              }}
            />

            {/* One-time pulse ring on load */}
            {showPulse && (
              <div className="absolute inset-0 z-10 pointer-events-none rounded-[24px]"
                style={{
                  animation: 'pulsePink 1.4s ease-out infinite',
                  border: '2px solid rgba(209,131,169,0.5)',
                  borderRadius: '24px',
                }}
              />
            )}

            {/* Decorative ring */}
            <div className="absolute inset-4 border border-[#D183A9]/30 rounded-[28px] rotate-6 scale-105 transition-transform duration-700 group-hover:rotate-12 group-hover:border-[#D183A9]/60 group-hover:scale-110 z-10 pointer-events-none" />
            
            <img 
              src="/profile.jpg" 
              alt="Fathima Fildha" 
              className="w-[280px] h-[340px] md:w-[320px] md:h-[400px] object-cover object-top rounded-[24px] border-2 border-[rgba(209,131,169,0.4)] shadow-[0_0_40px_rgba(209,131,169,0.15)] group-hover:shadow-[0_20px_50px_rgba(209,131,169,0.4)] block relative z-20 transition-shadow duration-500"
              style={{ transform: "translateZ(20px)" }} // Pop the image out from the frame slightly
            />

            {/* Hover overlay label */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
              <div 
                className="px-4 py-1.5 rounded-full border border-[#D183A9]/60 bg-[rgba(11,15,25,0.75)] backdrop-blur-sm font-jetbrains-mono text-xs text-[#D183A9] tracking-widest whitespace-nowrap transition-all duration-300"
                style={{ 
                  opacity: isPhotoHovered ? 1 : 0,
                  transform: isPhotoHovered ? 'translateY(0px)' : 'translateY(6px)'
                }}
              >
                ✦ View Profile
              </div>
            </div>
          </div>
          </div>

          {/* Permanent click hint below photo */}
          <motion.p
            className="font-jetbrains-mono text-xs text-[#71557A] tracking-widest flex items-center gap-1.5 select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            <span>👆</span>
            <span>click to know more</span>
          </motion.p>
        </div>
      </div>

      {/* Glassmorphic ID Card Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          >
            {/* Blurry Backdrop */}
            <div 
              className="absolute inset-0 bg-[#0B0F19]/60 backdrop-blur-xl cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            />
            
            {/* Modal Card */}
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 10, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-sm bg-[rgba(15,10,18,0.85)] border border-[rgba(209,131,169,0.3)] shadow-[0_0_80px_rgba(209,131,169,0.2)] rounded-3xl p-8 flex flex-col items-center z-10 overflow-hidden"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-[#71557A] hover:text-[#D183A9] transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>

              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#3A345B] shadow-[0_0_30px_rgba(209,131,169,0.3)] mb-6 mt-4 ring-2 ring-[#D183A9]/50 ring-offset-4 ring-offset-[rgba(15,10,18,0.85)]">
                <img src="/profile.jpg" alt="Fathima" className="w-full h-full object-cover object-top" />
              </div>
              
              <p className="font-jetbrains-mono text-[#71557A] text-xs tracking-[0.2em] uppercase mb-3">✦ Profile</p>
              <h3 className="font-playfair text-2xl font-bold text-[#F3C8DD] mb-1">Fathima Fildha</h3>
              <p className="font-inter text-[#D183A9] text-sm font-medium mb-6 uppercase tracking-widest">Full Stack Developer</p>
              
              <div className="w-full flex flex-col gap-3 font-jetbrains-mono text-sm text-[var(--color-text-body)]">
                <div className="flex justify-between border-b border-[#3A345B]/50 pb-2">
                  <span className="text-[#71557A]">Location:</span>
                  <span className="text-[#F3C8DD]">Malappuram, Kerala, India</span>
                </div>
                <div className="flex justify-between border-b border-[#3A345B]/50 pb-2">
                  <span className="text-[#71557A]">Status:</span>
                  <span className="text-green-400">Open to Work</span>
                </div>
                <div className="flex justify-between border-b border-[#3A345B]/50 pb-2">
                  <span className="text-[#71557A]">Focus:</span>
                  <span className="text-[#F3C8DD] text-right ml-4">Django, React, PostgreSQL, GenAI</span>
                </div>
              </div>

              <a 
                href="/resume.pdf" 
                download="Fathima_Fildha_P.pdf"
                className="mt-8 w-full py-3 bg-[rgba(209,131,169,0.1)] hover:bg-[#D183A9] text-[#D183A9] hover:text-white border border-[#D183A9]/50 hover:border-transparent rounded-xl font-jetbrains-mono text-sm font-bold transition-all text-center flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Download Resume
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

"use client";

import { Suspense } from "react";
import Head from "next/head";
import ThreeBackground from "@/components/3d/ThreeBackground";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

// Fallback loader while 3D background initializes
function BackgroundFallback() {
  return (
    <div className="fixed inset-0 z-0 bg-[#0B0F19] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-t-2 border-[#D183A9] animate-spin" />
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-[#0B0F19] min-h-screen text-[var(--color-text-body)] font-inter overflow-x-hidden relative selection:bg-[#D183A9]/30">
      <Head>
        <title>Fathima Fildha | Full Stack Developer</title>
        <meta name="description" content="Portfolio of Fathima Fildha P, Full Stack Developer and AI Enthusiast." />
      </Head>

      {/* Global subtle 3D background */}
      <Suspense fallback={<BackgroundFallback />}>
        <ThreeBackground />
      </Suspense>

      {/* Simple Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[rgba(11,15,25,0.8)] backdrop-blur-md border-b border-[#3A345B]/50 transition-all py-4 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="font-playfair font-bold text-xl text-[#F3C8DD] tracking-wide cursor-pointer hover:text-[#D183A9] transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            FP.
          </div>
          <nav className="hidden md:flex flex-wrap items-center gap-6 font-jetbrains-mono text-[13px] font-medium">
            <a href="#about" className="text-[#71557A] hover:text-[#D183A9] transition-colors">About</a>
            <a href="#skills" className="text-[#71557A] hover:text-[#D183A9] transition-colors">Skills</a>
            <a href="#projects" className="text-[#71557A] hover:text-[#D183A9] transition-colors">Projects</a>
            <a href="#experience" className="text-[#71557A] hover:text-[#D183A9] transition-colors">Experience</a>
            <a href="#contact" className="ml-2 px-6 py-2 bg-[#D183A9]/10 border border-[#D183A9]/50 text-[#D183A9] rounded-full hover:bg-[#D183A9] hover:text-white transition-all cursor-pointer shadow-[0_0_10px_rgba(209,131,169,0.1)] hover:shadow-[0_0_15px_rgba(209,131,169,0.4)]">
              Let's Talk
            </a>
          </nav>
        </div>
      </header>

      {/* Standard Scrolling Main Content */}
      <main className="relative z-10 flex flex-col w-full antialiased pt-16">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { navLinks, socialLinks } from "@/data/portfolioData";
import { Github, Linkedin, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Scroll Progress Bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-middle-purple to-queen-pink origin-left z-[60]"
      />

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "glass py-4 shadow-xl shadow-base-dark/20" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
        <a href="#" className="text-2xl font-playfair font-bold text-queen-pink tracking-tighter">
          FF
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-text-muted hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="w-[1px] h-6 bg-white/10" />
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="text-text-muted hover:text-accent-cyan transition-colors duration-200"
                aria-label={social.name}
              >
                {social.icon === "github" ? <Github size={20} /> : <Linkedin size={20} />}
              </a>
            ))}
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-text-main"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass absolute top-full left-0 w-full flex flex-col items-center py-6 gap-6"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-text-main hover:text-accent-purple transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="flex gap-6 mt-4">
              {socialLinks.map((social) => {
                const Icon = social.icon === "github" ? Github : Linkedin;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-text-muted hover:text-queen-pink transition-colors px-1"
                  >
                    <Icon size={24} />
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}

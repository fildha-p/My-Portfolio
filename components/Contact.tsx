"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { contactData, socialLinks } from "@/data/portfolioData";

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Use mailto action as requested since backend isn't mapped
    window.location.href = `mailto:${contactData.email}?subject=New Message from ${formState.name}&body=${formState.message}%0D%0A%0D%0AFrom: ${formState.email}`;
  };

  return (
    <section id="contact" className="pt-32 pb-48 px-6 md:px-12 bg-gradient-contact relative overflow-hidden flex flex-col items-center justify-center">
      
      <div className="max-w-4xl mx-auto z-10 w-full relative">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-queen-pink/20 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" />

        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-queen-pink tracking-tight drop-shadow-sm"
          >
            Let&apos;s Build Something Meaningful
          </motion.h2>
        </div>

        {/* Contact Form Container (Reference Image 2 style) */}
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="max-w-2xl mx-auto glass-card p-8 md:p-12 shadow-[0_20px_60px_rgba(75,21,53,0.3)] border-old-lavender/30"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-jetbrains-mono text-sm tracking-wider text-queen-pink uppercase">Name</label>
              <input 
                id="name"
                type="text" 
                required
                value={formState.name}
                onChange={e => setFormState({...formState, name: e.target.value})}
                className="w-full bg-base-dark/50 border border-old-lavender/30 rounded-xl px-4 py-3 text-text-body focus:outline-none focus:border-queen-pink focus:ring-1 focus:ring-queen-pink transition-all font-inter"
                placeholder="John Doe"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-jetbrains-mono text-sm tracking-wider text-queen-pink uppercase">Email</label>
              <input 
                id="email"
                type="email" 
                required
                value={formState.email}
                onChange={e => setFormState({...formState, email: e.target.value})}
                className="w-full bg-base-dark/50 border border-old-lavender/30 rounded-xl px-4 py-3 text-text-body focus:outline-none focus:border-queen-pink focus:ring-1 focus:ring-queen-pink transition-all font-inter"
                placeholder="john@example.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="font-jetbrains-mono text-sm tracking-wider text-queen-pink uppercase">Message</label>
              <textarea 
                id="message"
                required
                rows={5}
                value={formState.message}
                onChange={e => setFormState({...formState, message: e.target.value})}
                className="w-full bg-base-dark/50 border border-old-lavender/30 rounded-xl px-4 py-3 text-text-body focus:outline-none focus:border-queen-pink focus:ring-1 focus:ring-queen-pink transition-all font-inter resize-none"
                placeholder="Hello Fathima, I'd like to discuss a project..."
              />
            </div>

            <button 
              type="submit"
              className="mt-4 w-full bg-gradient-accent text-white font-playfair font-bold text-xl py-4 rounded-xl shadow-[0_0_20px_rgba(209,131,169,0.3)] hover:shadow-[0_0_30px_rgba(209,131,169,0.5)] hover:-translate-y-1 transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-20 pt-10 border-t border-old-lavender/30 flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-16 font-jetbrains-mono text-sm"
        >
          <a
            href={`mailto:${contactData.email}`}
            className="group relative text-queen-pink/70 hover:text-queen-pink transition-colors py-2 flex items-center gap-3 overflow-hidden"
          >
            <span className="text-xl">📧</span>
            <span className="relative z-10">{contactData.email}</span>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-queen-pink -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
          </a>
          
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="group relative text-queen-pink/70 hover:text-queen-pink transition-colors py-2 flex items-center gap-3 overflow-hidden"
            >
              <span className="text-xl">
                {social.icon === "github" ? "🐙" : "💼"}
              </span>
              <span className="relative z-10">{social.href.replace("https://", "")}</span>
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-middle-purple -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

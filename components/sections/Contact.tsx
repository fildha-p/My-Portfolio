"use client";
import { useState, useRef } from "react";
import emailjs from '@emailjs/browser';
import { contactData } from "@/data/portfolioData";

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;
    
    setLoading(true);
    setError(false);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setLoading(false);
      setError(true);
      return;
    }

    try {
      await emailjs.sendForm(serviceId, templateId, form.current, {
        publicKey,
      });

      setSubmitted(true);
      form.current.reset();
      setTimeout(() => setSubmitted(false), 3000);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="w-full py-24 relative z-10 px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-12">
        
        <div className="text-center">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#F3C8DD]">
            {contactData.headline}
          </h2>
          <p className="font-jetbrains-mono text-[14px] text-[#D183A9] mt-4 tracking-widest uppercase">
            {contactData.subtext}
          </p>
        </div>

        <div className="w-full max-w-xl bg-[rgba(26,17,24,0.8)] p-8 md:p-12 rounded-[24px] border border-[rgba(209,131,169,0.2)] shadow-2xl relative overflow-hidden backdrop-blur-xl">
          
          {submitted && (
            <div className="absolute inset-0 bg-[#D183A9]/20 backdrop-blur-lg z-20 flex flex-col items-center justify-center transition-all">
              <div className="w-16 h-16 bg-[#a8627f] rounded-full flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(209,131,169,0.5)]">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="font-playfair text-3xl text-white font-bold drop-shadow-lg">Message Sent!</span>
            </div>
          )}

          {error && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-500/80 text-white px-6 py-2 rounded-full font-jetbrains-mono text-sm z-30 shadow-lg backdrop-blur-md">
              Failed to send message. Please try again or email directly.
            </div>
          )}
          
          <form ref={form} className="flex flex-col gap-5 relative z-10" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-5">
              <input 
                type="text" 
                name="user_name"
                placeholder="Name" 
                required
                className="w-full bg-[#0B0F19] text-[#F3C8DD] px-5 py-4 rounded-xl border border-[#3A345B] focus:border-[#D183A9] outline-none font-inter text-[15px] transition-colors placeholder:text-[#71557A]"
              />
              <input 
                type="email" 
                name="user_email"
                placeholder="Email" 
                required
                className="w-full bg-[#0B0F19] text-[#F3C8DD] px-5 py-4 rounded-xl border border-[#3A345B] focus:border-[#D183A9] outline-none font-inter text-[15px] transition-colors placeholder:text-[#71557A]"
              />
            </div>
            
            <textarea 
              name="message"
              placeholder="Your Message..." 
              rows={5}
              required
              className="w-full bg-[#0B0F19] text-[#F3C8DD] px-5 py-4 rounded-xl border border-[#3A345B] focus:border-[#D183A9] outline-none font-inter text-[15px] transition-colors resize-none placeholder:text-[#71557A]"
            />
            
            <button 
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-[#a8627f] text-white py-4 rounded-xl font-jetbrains-mono font-bold text-[15px] tracking-wide shadow-[0_4px_15px_rgba(209,131,169,0.3)] hover:shadow-[0_4px_25px_rgba(209,131,169,0.6)] hover:bg-[#D183A9] hover:-translate-y-0.5 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? "Sending Transmission..." : "Send Message"}
            </button>
          </form>

        </div>

        {/* Footer Links & Copyright */}
        <div className="w-full flex flex-col items-center mt-8 gap-8">
          <div className="flex gap-8">
            <a href="https://linkedin.com/in/fathima-fildha" target="_blank" rel="noreferrer" className="text-[#71557A] hover:text-[#F3C8DD] md:text-lg font-semibold transition-colors cursor-pointer flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              LinkedIn
            </a>
            <a href="https://github.com/fildha-p" target="_blank" rel="noreferrer" className="text-[#71557A] hover:text-[#F3C8DD] md:text-lg font-semibold transition-colors cursor-pointer flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </a>
            <a href="mailto:fathfildhap@gmail.com" className="text-[#71557A] hover:text-[#F3C8DD] md:text-lg font-semibold transition-colors cursor-pointer flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              Email
            </a>
          </div>

          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#71557A] to-transparent mt-4 opacity-50" />
          
          <p className="font-jetbrains-mono text-xs text-[#71557A] tracking-wider mb-8">
            © 2026 Fathima Fildha P · Built with React & Three.js 🌸
          </p>
        </div>

      </div>
    </section>
  );
}

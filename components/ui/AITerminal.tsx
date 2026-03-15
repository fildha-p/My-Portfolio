"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Pre-trained mock database about Fathima
const brain = {
  greetings: ["Hi there! I'm an AI assistant trained on Fathima Fildha's resume. Ask me anything about her skills, experience, or projects!"],
  fallback: "I'm not exactly sure about that based on my training data. Feel free to contact Fathima directly at fathfildhap@gmail.com!",
  keywords: [
    {
      match: ["django", "python", "backend"],
      response: "Fathima has strong backend skills using Python and Django. She recently interned at HACA Calicut as a Full Stack Django Developer where she built CRUD workflows and integrated backend services!"
    },
    {
      match: ["react", "frontend", "css", "tailwind"],
      response: "Yes! Fathima builds dynamic frontends using React, Tailwind CSS, JavaScript, and Redux. She built this entire portfolio using Next.js and React physics libraries!"
    },
    {
      match: ["genai", "ai", "llm", "prompt", "chatgpt"],
      response: "GenAI is her current focus! Fathima is skilled in Prompt Engineering, Structured LLM Apps, and working with the OpenAI API. She's currently expanding her knowledge into Langchain, RAG, and Vector Databases."
    },
    {
      match: ["database", "sql", "mysql"],
      response: "Fathima primarily uses MySQL for her relational database management and backend architectures."
    },
    {
      match: ["projects", "built", "work"],
      response: "Fathima has built several impressive projects! Some highlights include 'SafeSphere' (a comprehensive women's safety app), 'LegalLens' (an AI-powered legal document analyzer), and 'InclusiLearn' (an adaptive learning platform). Check the Projects section for links!"
    },
    {
      match: ["contact", "email", "hire", "job"],
      response: "You can reach Fathima directly at fathfildhap@gmail.com, or check out her GitHub at github.com/fildha-p. She's currently open to work!"
    },
    {
      match: ["education", "degree", "university", "college"],
      response: "Fathima is graduating in 2025 with a B.Tech in Computer Science Engineering from APJ Abdul Kalam Technological University."
    }
  ]
};

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
}

export default function AITerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", sender: "ai", text: brain.greetings[0] }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const generateResponse = (input: string) => {
    const query = input.toLowerCase();
    
    // Simple keyword matching search
    let matchedResponse = brain.fallback;
    for (const rule of brain.keywords) {
      if (rule.match.some(keyword => query.includes(keyword))) {
        matchedResponse = rule.response;
        break;
      }
    }

    return matchedResponse;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: "user", text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const responseText = generateResponse(userMsg.text);
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: "ai", text: responseText }]);
      setIsTyping(false);
    }, 800 + Math.random() * 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[320px] md:w-[380px] h-[450px] bg-[rgba(11,15,25,0.95)] backdrop-blur-xl border border-[rgba(209,131,169,0.3)] shadow-[0_10px_40px_rgba(209,131,169,0.2)] rounded-2xl flex flex-col overflow-hidden font-jetbrains-mono"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[rgba(15,10,18,0.8)] border-b border-[rgba(209,131,169,0.2)]">
              <div className="flex items-center gap-3">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D183A9] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D183A9]"></span>
                </div>
                <span className="text-sm font-bold text-[#F3C8DD]">Ask Fildha AI</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-[#71557A] hover:text-[#D183A9] transition-colors"
                title="Close Terminal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-[rgba(209,131,169,0.3)] scrollbar-track-transparent">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex flex-col max-w-[85%] ${msg.sender === "user" ? "self-end items-end" : "self-start items-start"}`}
                >
                  <span className="text-[10px] text-[#71557A] mb-1 font-bold">
                    {msg.sender === "user" ? "GUEST" : "SYSTEM"}
                  </span>
                  <div 
                    className={`px-3 py-2 rounded-xl text-sm leading-relaxed ${
                      msg.sender === "user" 
                        ? "bg-[#D183A9]/20 text-[#F3C8DD] border border-[#D183A9]/30 rounded-tr-none" 
                        : "bg-[rgba(15,10,18,0.6)] text-[var(--color-text-body)] border border-[rgba(113,85,122,0.3)] rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="self-start max-w-[85%] flex flex-col items-start">
                   <span className="text-[10px] text-[#71557A] mb-1 font-bold">SYSTEM</span>
                   <div className="px-4 py-3 bg-[rgba(15,10,18,0.6)] border border-[rgba(113,85,122,0.3)] rounded-xl rounded-tl-none flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D183A9] animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D183A9] animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D183A9] animate-bounce" style={{ animationDelay: "300ms" }} />
                   </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-3 bg-[rgba(15,10,18,0.8)] border-t border-[rgba(209,131,169,0.2)] flex gap-2">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about my skills..."
                className="flex-1 bg-[rgba(11,15,25,0.6)] border border-[rgba(113,85,122,0.4)] rounded-lg px-3 py-2 text-sm text-[#F3C8DD] placeholder-[#71557A] focus:outline-none focus:border-[#D183A9] transition-colors"
                disabled={isTyping}
              />
              <button 
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="bg-[#D183A9] text-white p-2 rounded-lg hover:bg-[#a8627f] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center shrink-0"
                title="Send Message"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[rgba(15,10,18,0.9)] border-2 border-[#D183A9]/50 hover:border-[#D183A9] shadow-[0_0_20px_rgba(209,131,169,0.3)] hover:shadow-[0_0_30px_rgba(209,131,169,0.6)] rounded-full flex items-center justify-center text-[#D183A9] transition-all group overflow-hidden"
      >
        <div className="absolute inset-0 bg-[#D183A9]/10 group-hover:bg-[#D183A9]/20 transition-colors" />
        {isOpen ? (
          <svg className="w-6 h-6 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg className="w-6 h-6 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
        )}
      </button>
    </div>
  );
}

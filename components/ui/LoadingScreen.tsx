"use client";

import { motion } from "framer-motion";

export function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[10000] bg-[#060910] flex flex-col items-center justify-center origin-top"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="font-playfair text-6xl text-[#F3C8DD] mb-8 tracking-widest"
        style={{ textShadow: "0 0 20px rgba(209, 131, 169, 0.6)" }}
      >
        FF
      </motion.div>
      
      <div className="w-64 h-1 bg-[#1a1118] rounded-full overflow-hidden mb-4 relative">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-[#D183A9]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="font-jetbrains-mono text-[#D183A9] tracking-widest animate-pulse text-sm"
      >
        <span>Initializing World...</span>
      </motion.div>
    </motion.div>
  );
}

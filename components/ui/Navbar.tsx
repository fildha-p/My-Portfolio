"use client";

import { useNavigation, ISLANDS } from "../context/NavigationContext";
import { motion } from "framer-motion";

export function Navbar() {
  const { activeIsland, setTargetIsland } = useNavigation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-6 lg:px-12 py-6 flex items-center justify-between pointer-events-auto">
      <div className="font-playfair text-3xl font-bold text-[var(--color-queen-pink)] cursor-default" style={{ textShadow: "0 0 10px rgba(209, 131, 169, 0.4)" }}>
        FF
      </div>
      
      <div className="hidden md:flex items-center gap-8 glass px-8 py-3 rounded-full">
        {ISLANDS.map((island) => (
          <button
            key={island.id}
            onClick={() => setTargetIsland(island.id)}
            className={`font-jetbrains-mono text-sm transition-all duration-300 relative cursor-pointer ${
              activeIsland === island.id ? "text-[var(--color-accent-primary)]" : "text-[var(--color-text-muted)] hover:text-[var(--color-queen-pink)]"
            }`}
          >
            {island.name}
            {activeIsland === island.id && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[var(--color-accent-primary)] rounded-full"
                style={{ boxShadow: "0 0 8px rgba(209, 131, 169, 0.6)" }}
              />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}

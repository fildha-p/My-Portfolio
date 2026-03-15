"use client";

import { useNavigation, ISLANDS } from "../context/NavigationContext";
import { motion } from "framer-motion";

export function IslandNav() {
  const { activeIsland, setTargetIsland } = useNavigation();

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col gap-4 pointer-events-auto">
      {ISLANDS.map((island) => (
        <button
          key={island.id}
          onClick={() => setTargetIsland(island.id)}
          className="group flex flex-row items-center justify-end gap-3 w-32 cursor-pointer"
        >
          <span className={`font-jetbrains-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ${
            activeIsland === island.id ? "text-[var(--color-accent-primary)]" : "text-[var(--color-text-muted)]"
          }`}>
            {island.name}
          </span>
          <div className="relative flex items-center justify-center w-4 h-4">
            <div 
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeIsland === island.id 
                  ? "bg-[var(--color-accent-primary)]" 
                  : "bg-[var(--color-jacarta)] group-hover:bg-[var(--color-old-lavender)]"
              }`}
              style={{
                boxShadow: activeIsland === island.id ? "0 0 10px rgba(209,131,169,0.8)" : "none"
              }}
            />
            {activeIsland === island.id && (
              <motion.div
                className="absolute inset-0 rounded-full border border-[var(--color-accent-primary)]"
                animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            )}
          </div>
        </button>
      ))}
    </div>
  );
}

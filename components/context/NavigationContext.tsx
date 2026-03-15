"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface NavigationContextType {
  activeIsland: number;
  setActiveIsland: (idx: number) => void;
  targetIsland: number | null;
  setTargetIsland: (idx: number | null) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [activeIsland, setActiveIsland] = useState(0);
  const [targetIsland, setTargetIsland] = useState<number | null>(null);

  return (
    <NavigationContext.Provider value={{ activeIsland, setActiveIsland, targetIsland, setTargetIsland }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) throw new Error("useNavigation must be used within NavigationProvider");
  return context;
}

export const ISLANDS = [
  { id: 0, name: "Home" },
  { id: 1, name: "About" },
  { id: 2, name: "Skills" },
  { id: 3, name: "Projects" },
  { id: 4, name: "Experience" },
  { id: 5, name: "Contact" },
];

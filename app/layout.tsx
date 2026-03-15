import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fathima Fildha P — Full Stack Developer | Django, React, Generative AI",
  description: "Portfolio of Fathima Fildha P, a Full Stack Developer specializing in Django, React, and Generative AI.",
};

import AITerminal from "@/components/ui/AITerminal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable} antialiased bg-base-dark text-text-body min-h-screen flex flex-col`}
      >
        <div className="film-grain" />
        {children}
        <AITerminal />
      </body>
    </html>
  );
}

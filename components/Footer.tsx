import { Github, Linkedin } from "lucide-react";
import { socialLinks } from "@/data/portfolioData";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brown-chocolate py-12 px-6 border-t border-old-lavender/20 relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex flex-col items-center md:items-start opacity-80">
          <p className="font-playfair text-queen-pink text-lg mb-1">
            © {currentYear} Fathima Fildha P
          </p>
          <p className="font-inter text-text-body text-sm font-light">
            Built with React, curiosity, and a lot of coffee. ☕
          </p>
        </div>

        <div className="flex items-center gap-6">
          {socialLinks.map((social) => {
            const Icon = social.icon === "github" ? Github : Linkedin;
            return (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="text-text-muted hover:text-queen-pink transition-colors duration-300 hover:-translate-y-1 transform"
                aria-label={social.name}
              >
                <Icon size={22} />
              </a>
            );
          })}
        </div>

      </div>
    </footer>
  );
}

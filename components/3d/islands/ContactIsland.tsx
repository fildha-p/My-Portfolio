import { Html } from "@react-three/drei";
import { useNavigation } from "../../context/NavigationContext";
import Island from "../Island";
import { useState } from "react";

export default function ContactIsland({ position }: { position: [number, number, number] }) {
  const { activeIsland } = useNavigation();
  const isActive = activeIsland === 5;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <Island id={5} dimensions={[14, 0.6, 10]} position={position} color="#211019" glowColor="#ff4d94" scale={0.8}>
      
      {/* HTML Overlay */}
      <Html 
        position={[0, 4, 0]} 
        transform 
        center
        occlude="blending"
        className={`pointer-events-auto transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="bg-[rgba(26,17,24,0.92)] p-[32px] rounded-[16px] border border-[rgba(209,131,169,0.3)] backdrop-blur-[20px] text-left select-none relative overflow-hidden min-w-[500px] max-w-[700px]">
          
          {submitted && (
            <div className="absolute inset-0 bg-[#D183A9]/20 backdrop-blur-md z-10 flex items-center justify-center">
              <span className="font-playfair text-[2rem] text-white font-bold drop-shadow-lg">Message Sent!</span>
            </div>
          )}

          <h2 className="font-playfair text-[2rem] font-bold text-[#F3C8DD] mb-2">
            Let's Build Something Meaningful
          </h2>
          <p className="font-jetbrains-mono text-[14px] text-[#D183A9] mb-6">Ready to collaborate?</p>
          
          <form className="flex flex-col gap-4 relative z-0" onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Name" 
              required
              className="w-full bg-[#0B0F19] text-[#F3C8DD] px-5 py-4 rounded-xl border border-[#3A345B] focus:border-[#D183A9] outline-none font-inter text-[16px] transition-colors"
            />
            <input 
              type="email" 
              placeholder="Email" 
              required
              className="w-full bg-[#0B0F19] text-[#F3C8DD] px-5 py-4 rounded-xl border border-[#3A345B] focus:border-[#D183A9] outline-none font-inter text-[16px] transition-colors"
            />
            <textarea 
              placeholder="Message" 
              rows={4}
              required
              className="w-full bg-[#0B0F19] text-[#F3C8DD] px-5 py-4 rounded-xl border border-[#3A345B] focus:border-[#D183A9] outline-none font-inter text-[16px] transition-colors resize-none"
            />
            <button 
              type="submit"
              className="w-full mt-2 bg-[#a8627f] text-white py-4 rounded-[50px] font-jetbrains-mono font-bold text-[14px] shadow-[0_4px_15px_rgba(209,131,169,0.3)] hover:shadow-[0_4px_25px_rgba(209,131,169,0.6)] hover:bg-[#D183A9] cursor-pointer transition-all"
            >
              Send Message
            </button>
          </form>

          <div className="flex justify-center gap-6 mt-8">
            <a href="https://linkedin.com/in/fathima-fildha" target="_blank" rel="noreferrer" className="text-[#71557A] hover:text-[#D183A9] text-[16px] font-semibold transition-colors cursor-pointer">LinkedIn</a>
            <a href="https://github.com/fildha-p" target="_blank" rel="noreferrer" className="text-[#71557A] hover:text-[#D183A9] text-[16px] font-semibold transition-colors cursor-pointer">GitHub</a>
            <a href="mailto:fathfildhap@gmail.com" className="text-[#71557A] hover:text-[#D183A9] text-[16px] font-semibold transition-colors cursor-pointer">Email</a>
          </div>

          <div className="mt-8 text-center border-t border-[rgba(209,131,169,0.2)] pt-4">
            <p className="font-inter text-[11px] text-[#71557A]">
              © 2026 Fathima Fildha P · Built with React & Three.js 🌸
            </p>
          </div>
        </div>
      </Html>

      {/* Particle Burst on Submit */}
      {submitted && (
        <group position={[0, 4, 0]}>
          {[...Array(20)].map((_, i) => (
            <mesh 
              key={i} 
              position={[(Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 2]}
            >
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshBasicMaterial color="#ff4d94" />
            </mesh>
          ))}
        </group>
      )}
    </Island>
  );
}

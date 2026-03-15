import { Html, Float, Text } from "@react-three/drei";
import { useNavigation } from "../../context/NavigationContext";
import * as THREE from "three";
import Island from "../Island";

export default function HeroIsland({ position }: { position: [number, number, number] }) {
  const { activeIsland } = useNavigation();
  const isActive = activeIsland === 0;

  return (
    <Island id={0} dimensions={[20, 0.6, 14]} position={position} color="#1a1118" glowColor="#D183A9">
      
      {/* 2D HTML Content overlay */}
      <Html 
        position={[0, 4, 0]} 
        transform 
        center
        occlude="blending"
        className={`pointer-events-auto transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="flex flex-row items-center gap-12 text-left select-none bg-[rgba(26,17,24,0.92)] p-8 rounded-[16px] border border-[rgba(209,131,169,0.3)] backdrop-blur-[20px] min-w-[600px] max-w-[700px]">
          <div className="flex flex-col gap-2 flex-grow">
            <p className="font-jetbrains-mono text-[13px] text-[var(--color-accent-primary)] tracking-wider">
              Hi, I'm
            </p>
            <h1 className="font-playfair text-[2.5rem] leading-tight font-bold text-[var(--color-queen-pink)]" style={{ textShadow: "0 0 15px rgba(209, 131, 169, 0.4)" }}>
              Fathima Fildha
            </h1>
            <p className="font-inter text-[var(--color-queen-pink)] text-[16px] font-medium tracking-wide mt-2">
              ✦ Full Stack Developer · Django · React · AI
            </p>
            <p className="text-[var(--color-text-muted)] text-[16px] mt-2 leading-[1.7]">
              Building with Python. Thinking with AI. Designing with React.
            </p>
            
            <div className="flex gap-4 mt-6">
              <button 
                onClick={() => {
                  const navEvent = new CustomEvent('navigate-island', { detail: 3 });
                  window.dispatchEvent(navEvent);
                }}
                className="px-[28px] py-[12px] bg-[#D183A9] text-white rounded-[50px] font-jetbrains-mono text-xs font-bold hover:bg-[#a8627f] transition-colors shadow-[0_0_15px_rgba(209,131,169,0.5)] cursor-pointer"
              >
                View My Work
              </button>
              <button 
                onClick={() => window.open("https://github.com/fildha-p", "_blank")}
                className="px-[28px] py-[12px] bg-transparent border-2 border-[#D183A9] text-[#F3C8DD] rounded-[50px] font-jetbrains-mono text-xs font-bold hover:bg-[rgba(209,131,169,0.2)] transition-colors cursor-pointer"
              >
                Explore GitHub
              </button>
            </div>
          </div>
          
          {/* Profile Photo right side HTML */}
          <div className="shrink-0 flex items-center justify-center">
            <img 
              src="/profile.jpg" 
              alt="Profile" 
              className="w-[220px] h-[270px] object-cover object-top rounded-[20px] border-2 border-[rgba(209,131,169,0.5)] block"
            />
          </div>
        </div>
      </Html>

      {/* 3D Extras */}
      <group position={[-6, 4, -2]}>
        <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
          <Text fontSize={0.8} color="#D183A9" characters="</>">
            {"</>"}
          </Text>
        </Float>
      </group>
    </Island>
  );
}

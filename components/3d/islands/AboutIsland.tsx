import { Html, Float, Sphere } from "@react-three/drei";
import { useNavigation } from "../../context/NavigationContext";
import Island from "../Island";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { aboutData } from "@/data/portfolioData";

export default function AboutIsland({ position }: { position: [number, number, number] }) {
  const { activeIsland } = useNavigation();
  const isActive = activeIsland === 1;

  const codeString = `const fathima = {
  role: "Full Stack Developer",
  stack: ["Django", "React", "PostgreSQL", "AWS"],
  exploring: ["OpenAI API", "Streamlit", "Image Generation"],
  status: "open_to_opportunities",
  location: "Kerala, India 🌴"
};`;

  const orbitRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <Island id={1} dimensions={[16, 0.6, 12]} position={position} color="#15121b" glowColor="#71557A" scale={0.9}>
      
      {/* HTML Content Overlay */}
      <Html 
        position={[0, 4, 0]} 
        transform 
        center
        occlude="blending"
        className={`pointer-events-auto transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="flex flex-col gap-4 text-left select-none bg-[rgba(26,17,24,0.92)] p-8 rounded-[16px] border border-[rgba(209,131,169,0.3)] backdrop-blur-[20px] min-w-[500px] max-w-[700px]">
          <h2 className="font-jetbrains-mono text-[13px] text-[var(--color-old-lavender)] font-bold tracking-widest">
            // ABOUT_ME
          </h2>
          <p className="font-inter text-[var(--color-text-body)] text-[16px] leading-[1.7]">
            I'm a Full Stack Developer from Kerala with a strong foundation in Django, React, and modern web architecture. My work focuses on building scalable web applications that combine clean backend logic with intuitive user experiences.
            <br/><br/>
            Recently, I've been exploring Generative AI — experimenting with AI agents, OpenAI APIs, and structured LLM applications to build intelligent tools.
          </p>
          
          <div className="bg-[#0B0F19] p-4 rounded-lg font-jetbrains-mono text-[13px] text-[#D183A9] border border-[var(--color-jacarta)] mt-2">
            <pre className="whitespace-pre-wrap"><code>{codeString}</code></pre>
          </div>
          
          <div className="flex gap-4 mt-4 justify-between">
            <div className="text-center">
              <span className="block font-playfair text-2xl text-[var(--color-queen-pink)]">5+</span>
              <span className="font-jetbrains-mono text-[10px] text-[var(--color-text-muted)]">Projects</span>
            </div>
            <div className="text-center">
              <span className="block font-playfair text-2xl text-[var(--color-queen-pink)]">B.Tech</span>
              <span className="font-jetbrains-mono text-[10px] text-[var(--color-text-muted)]">CSE</span>
            </div>
            <div className="text-center">
              <span className="block font-playfair text-2xl text-[var(--color-queen-pink)]">GenAI</span>
              <span className="font-jetbrains-mono text-[10px] text-[var(--color-text-muted)]">Explorer</span>
            </div>
          </div>
        </div>
      </Html>

      {/* 3D Extras: Simple Glowing Orb */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <group position={[4, 2, 0]}>
          <Sphere args={[0.5, 32, 32]}>
            <meshStandardMaterial color="#D183A9" emissive="#D183A9" emissiveIntensity={1} />
          </Sphere>
          <pointLight color="#D183A9" intensity={2} distance={5} />
        </group>
      </Float>

      {/* Orbiting Skill spheres */}
      <group position={[3.5, 2.5, -2]} ref={orbitRef}>
        <group position={[1.5, 0, 0]}>
          <Sphere args={[0.2, 16, 16]}>
            <meshStandardMaterial color="#61DAFB" emissive="#61DAFB" emissiveIntensity={0.5} />
          </Sphere>
        </group>
        <group position={[-1.5, 0, 0]}>
          <Sphere args={[0.2, 16, 16]}>
            <meshStandardMaterial color="#092E20" emissive="#44B78B" emissiveIntensity={0.5} />
          </Sphere>
        </group>
        <group position={[0, 1.5, 0]}>
          <Sphere args={[0.2, 16, 16]}>
            <meshStandardMaterial color="#306998" emissive="#FFE873" emissiveIntensity={0.5} />
          </Sphere>
        </group>
      </group>

    </Island>
  );
}

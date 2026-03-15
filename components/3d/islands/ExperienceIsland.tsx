import { Html } from "@react-three/drei";
import { useNavigation } from "../../context/NavigationContext";
import Island from "../Island";
import { useMemo } from "react";
import * as THREE from "three";

export default function ExperienceIsland({ position }: { position: [number, number, number] }) {
  const { activeIsland } = useNavigation();
  const isActive = activeIsland === 4;

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(1, 1, 0.5),
      new THREE.Vector3(-1, 2.5, 0),
      new THREE.Vector3(0.5, 4, -0.5),
      new THREE.Vector3(-0.5, 5, 0),
    ]);
  }, []);

  return (
    <Island id={4} dimensions={[14, 0.6, 10]} position={position} color="#1b1220" glowColor="#71557A" scale={0.9}>
      
      <Html 
        position={[0, 4, 0]} 
        transform 
        center
        occlude="blending"
        className={`pointer-events-auto transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="flex flex-col gap-6 text-left select-none bg-[rgba(26,17,24,0.92)] p-[32px] rounded-[16px] border border-[rgba(209,131,169,0.3)] backdrop-blur-[20px] min-w-[500px] max-w-[700px]">
          <h2 className="font-playfair text-[2rem] font-bold text-[#F3C8DD] mb-2">
            Professional Timeline
          </h2>
          
          <div className="relative border-l-2 border-[#71557A] pl-6 flex flex-col gap-10">
            {/* Experience */}
            <div className="relative">
              <div className="absolute w-4 h-4 bg-[#D183A9] rounded-full -left-[33px] top-1 shadow-[0_0_10px_rgba(209,131,169,0.8)]" />
              <h3 className="font-jetbrains-mono font-bold text-[1.2rem] text-[#D183A9]">HACA Calicut</h3>
              <span className="font-jetbrains-mono text-[14px] text-[#F3C8DD] block mt-1">Python Django Full Stack Developer Intern</span>
              <span className="font-jetbrains-mono text-[13px] text-[#71557A] block mb-3">Generative AI Track · Sep 2025 — Mar 2026</span>
              <ul className="font-inter text-[15px] leading-[1.7] text-[var(--color-text-body)] list-disc pl-4 space-y-2">
                <li>Built full stack web application features using Django, React, and MySQL</li>
                <li>Developed backend modules, CRUD workflows, and data management features</li>
                <li>Integrated frontend components with backend services and authentication flows</li>
                <li>Worked on AI-assisted workflow automation and Generative AI development tasks</li>
              </ul>
            </div>

            {/* Education */}
            <div className="relative">
              <div className="absolute w-4 h-4 bg-[#3A345B] rounded-full -left-[33px] top-1" />
              <h3 className="font-jetbrains-mono font-bold text-[1.2rem] text-[#F3C8DD]">APJ Abdul Kalam Technological University</h3>
              <span className="font-jetbrains-mono text-[14px] text-[#D183A9] block mt-1">B.Tech in Computer Science Engineering</span>
              <span className="font-jetbrains-mono text-[13px] text-[#71557A] block mb-2">2021 — 2025</span>
            </div>
          </div>
        </div>
      </Html>

      {/* 3D Extras: Glowing timeline tube */}
      <group position={[3.5, 0.5, -2]}>
        <mesh>
          <tubeGeometry args={[curve, 64, 0.08, 8, false]} />
          <meshBasicMaterial name="timelineTube" color="#71557A" transparent opacity={0.6} />
        </mesh>
        
        {/* Nodes along the tube */}
        <mesh position={[1, 1, 0.5]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial color="#D183A9" />
        </mesh>
        <mesh position={[-1, 2.5, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial color="#F3C8DD" />
        </mesh>
        <mesh position={[0.5, 4, -0.5]}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshBasicMaterial color="#D183A9" />
          <pointLight color="#D183A9" intensity={0.5} distance={3} />
        </mesh>
      </group>
    </Island>
  );
}

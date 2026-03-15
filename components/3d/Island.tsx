import { ReactNode, useRef } from "react";
import { Html, Float } from "@react-three/drei";
import { useNavigation } from "../context/NavigationContext";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface IslandProps {
  id: number;
  position: [number, number, number];
  color?: string;
  glowColor?: string;
  scale?: number;
  dimensions?: [number, number, number];
  children?: ReactNode;
}

export default function Island({
  id,
  position,
  color = "#1a1118",
  glowColor = "#D183A9",
  scale = 1,
  dimensions = [12, 0.5, 8],
  children
}: IslandProps) {
  const { activeIsland } = useNavigation();
  const groupRef = useRef<THREE.Group>(null);
  const isActive = activeIsland === id;
  const currentOpacity = useRef(isActive ? 1 : 0.08);

  useFrame((state, delta) => {
    const target = isActive ? 1 : 0.08;
    // We explicitly calculate this so we can apply it to children if needed
    currentOpacity.current = THREE.MathUtils.lerp(currentOpacity.current, target, delta * 3);
    
    if (groupRef.current) {
      groupRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          // If it's the glow ring or something specifically semi-transparent, we scale it
          const mat = child.material as THREE.Material;
          mat.transparent = true;
          
          if (mat.name === 'glowRing') {
            mat.opacity = currentOpacity.current * 0.4;
          } else if (mat.name === 'particle' || mat.name === 'timelineTube') {
            mat.opacity = currentOpacity.current * 0.6;
          } else {
            // General meshes
            mat.opacity = currentOpacity.current;
          }
        }
      });
    }
  });

  return (
    <group position={position} scale={scale} ref={groupRef}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5} floatingRange={[-0.2, 0.2]}>
        
        {/* Main Platform using BoxGeometry to support custom dimensions */}
        <mesh receiveShadow castShadow>
          <boxGeometry args={dimensions} />
          <meshStandardMaterial color={color} roughness={0.7} metalness={0.2} transparent />
        </mesh>
        
        {/* Glowing Edge Border - plain geometry under the platform */}
        <mesh position={[0, -dimensions[1]/2 + 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[dimensions[0] + 0.6, dimensions[2] + 0.6]} />
          <meshBasicMaterial name="glowRing" color={glowColor} transparent opacity={0.4} side={2} />
        </mesh>

        {/* Dynamic lights based on active state */}
        <pointLight position={[0, -2, 0]} color={glowColor} intensity={isActive ? 2.5 : 0} distance={20} />
        <pointLight position={[0, 3, 0]} color={color} intensity={isActive ? 0.5 : 0} distance={15} />

        {/* Content specific to this island */}
        {children}
        
      </Float>
    </group>
  );
}

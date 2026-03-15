import { Stars, Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { ISLAND_POSITIONS } from "./CameraController";

export default function SpaceEnvironment() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particlesCount = 700;
  const positions = useMemo(() => {
    const coords = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      coords[i * 3] = (Math.random() - 0.5) * 250; // x spread out more since islands are further
      coords[i * 3 + 1] = (Math.random() - 0.5) * 100; // y
      coords[i * 3 + 2] = (Math.random() - 0.5) * 200; // z
    }
    return coords;
  }, [particlesCount]);

  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.01;
      particlesRef.current.rotation.x += delta * 0.005;
    }
  });

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(ISLAND_POSITIONS, false, "chordal", 0.5);
  }, []);

  const pathPoints = useMemo(() => curve.getPoints(500), [curve]);

  return (
    <group>
      <Stars radius={250} depth={150} count={3500} factor={4} saturation={0.8} fade speed={1} />

      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.15} color="#D183A9" transparent opacity={0.6} sizeAttenuation />
      </points>

      <Line
        points={pathPoints}
        color="#D183A9"
        opacity={0.15}
        transparent
        lineWidth={1}
        dashed
        dashScale={20}
        dashSize={1}
        gapSize={0.5}
      />
    </group>
  );
}

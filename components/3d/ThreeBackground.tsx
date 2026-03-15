"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, Icosahedron, Torus } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useRef } from "react";
import * as THREE from "three";

// A slowly rotating abstract shape to add depth
function FloatingShape({ position, rotation, scale, color, type }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.05;
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2} position={position}>
      <mesh ref={meshRef} rotation={rotation} scale={scale}>
        {type === 'icosahedron' ? <icosahedronGeometry args={[1, 0]} /> : <torusGeometry args={[1, 0.2, 16, 50]} />}
        <meshStandardMaterial color={color} wireframe transparent opacity={0.15} emissive={color} emissiveIntensity={0.5} />
      </mesh>
    </Float>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <color attach="background" args={["#0B0F19"]} />
        <ambientLight intensity={0.5} />
        
        {/* Subtle, slow-moving stars to give depth without distraction */}
        <Stars 
          radius={50} 
          depth={50} 
          count={3000} 
          factor={3} 
          saturation={0.5} 
          fade 
          speed={0.5} 
        />
        
        {/* Background Floating Geometries */}
        <FloatingShape type="icosahedron" position={[-8, 4, -15]} rotation={[0.5, 0.5, 0]} scale={2.5} color="#D183A9" />
        <FloatingShape type="torus" position={[10, -5, -20]} rotation={[-0.5, 0.5, 0]} scale={3} color="#71557A" />
        <FloatingShape type="icosahedron" position={[5, 8, -25]} rotation={[0.2, 0.8, 0]} scale={4} color="#3A345B" />
        <FloatingShape type="torus" position={[-12, -8, -10]} rotation={[1, 0.5, 0]} scale={2} color="#D183A9" />

        {/* Adds a slight magical pink tint to the fog/distance */}
        <fog attach="fog" args={["#0B0F19", 10, 40]} />

        {/* Post-processing Bloom for emissive glow */}
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={1.5} />
        </EffectComposer>
      </Canvas>
      
      {/* 2D Overlay Vignette to darken edges for text readability */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(11,15,25,0.85)_100%)]" />
    </div>
  );
}

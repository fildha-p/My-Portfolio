"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function CyberGrid() {
  const gridRef = useRef<THREE.Group>(null);
  const clockRef = useRef(new THREE.Clock());

  // Create a custom grid geometry that we can animate like a wave
  const { positions, colors } = useMemo(() => {
    const size = 60;
    const divisions = 60;
    const step = size / divisions;
    const halfSize = size / 2;

    const vertices = [];
    const colors = [];
    const color = new THREE.Color("#D183A9");

    for (let i = 0, j = 0, k = -halfSize; i <= divisions; i++, k += step) {
      // Horizontal lines
      vertices.push(-halfSize, 0, k, halfSize, 0, k);
      colors.push(color.r, color.g, color.b, color.r, color.g, color.b);
      // Vertical lines
      vertices.push(k, 0, -halfSize, k, 0, halfSize);
      colors.push(color.r, color.g, color.b, color.r, color.g, color.b);
    }

    return {
      positions: new Float32Array(vertices),
      colors: new Float32Array(colors)
    };
  }, []);

  const geometryRef = useRef<THREE.BufferGeometry>(null);

  useFrame((state) => {
    if (!geometryRef.current) return;
    const time = state.clock.getElapsedTime();
    const positions = geometryRef.current.attributes.position.array as Float32Array;
    
    // Animate the Y position (index + 1) to create a gentle rolling wave
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const z = positions[i + 2];
      
      // Calculate a wave height based on X, Z coordinates and Time
      // The wave travels forward (z) and slightly sideways (x)
      positions[i + 1] = Math.sin(x * 0.2 + time) * Math.cos(z * 0.2 + time * 0.8) * 1.5;
    }
    
    // Tell ThreeJS the geometry has changed so it re-renders
    geometryRef.current.attributes.position.needsUpdate = true;
    
    // Slowly move the entire grid backwards to simulate forward movement
    if (gridRef.current) {
      gridRef.current.position.z = (time * 2) % 1; // Loop the movement so we never run out of grid
    }
  });

  return (
    <group ref={gridRef} position={[0, -2, 0]}>
      <lineSegments>
        <bufferGeometry ref={geometryRef}>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.15} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  );
}

export default function ThreeBackgroundGrid() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 2, 8], fov: 60 }}>
        {/* Dark ambient fog fading to the background color */}
        <fog attach="fog" args={["#0B0F19", 2, 15]} />
        <ambientLight intensity={0.5} />
        
        <CyberGrid />

        {/* Post-processing Bloom for the grid lines */}
        <EffectComposer disableNormalPass>
          <Bloom
            luminanceThreshold={0}
            luminanceSmoothing={1}
            intensity={1.5}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
      
      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0B0F19_100%)] opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/80 via-transparent to-[#0B0F19]/90" />
    </div>
  );
}

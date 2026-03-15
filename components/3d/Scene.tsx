"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

import SpaceEnvironment from "./SpaceEnvironment";
import CameraController from "./CameraController";

// Import Island Overlays
import HeroIsland from "./islands/HeroIsland";
import AboutIsland from "./islands/AboutIsland";
import SkillsIsland from "./islands/SkillsIsland";
import ProjectsIsland from "./islands/ProjectsIsland";
import ExperienceIsland from "./islands/ExperienceIsland";
import ContactIsland from "./islands/ContactIsland";

export default function Scene({ onLoaded }: { onLoaded?: () => void }) {
  return (
    <div className="fixed inset-0 w-[100vw] h-[100vh] z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 55 }}
        gl={{ powerPreference: "high-performance", antialias: false }} // postprocessing handles AA better sometimes, or we trade it for performance

      >
        <Suspense fallback={null}>
          
          {/* Lighting */}
          <ambientLight intensity={0.3} color="#1a0a1a" />
          <directionalLight position={[10, 20, 10]} intensity={0.5} color="#F3C8DD" />
          
          {/* Environment */}
          <SpaceEnvironment />
          
          {/* Logic */}
          <CameraController />

          {/* Islands - React Three Fiber event bubbling needs an interactable layer.
              Since the canvas wrapper has pointer-events-none, we rely on the HTML overlays from Drei 
              to catch native DOM events. 
          */}
          <HeroIsland position={[0, 0, 0]} />
          <AboutIsland position={[60, -8, -20]} />
          <SkillsIsland position={[-55, -15, -45]} />
          <ProjectsIsland position={[70, -22, -70]} />
          <ExperienceIsland position={[-40, -30, -95]} />
          <ContactIsland position={[20, -38, -120]} />

          {/* Post Processing for Cinematic Glow */}
          <EffectComposer>
            <Bloom 
              luminanceThreshold={0.3} 
              luminanceSmoothing={0.9} 
              intensity={1.5} 
            />
            <Vignette darkness={0.4} />
          </EffectComposer>

        </Suspense>
      </Canvas>
    </div>
  );
}

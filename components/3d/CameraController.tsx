import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useNavigation, ISLANDS } from "../context/NavigationContext";
import gsap from "gsap";

export const ISLAND_POSITIONS = [
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(60, -8, -20),
  new THREE.Vector3(-55, -15, -45),
  new THREE.Vector3(70, -22, -70),
  new THREE.Vector3(-40, -30, -95),
  new THREE.Vector3(20, -38, -120),
];

export default function CameraController() {
  const { activeIsland, setActiveIsland, targetIsland, setTargetIsland } = useNavigation();
  const { camera } = useThree();
  const isAnimating = useRef(false);

  // Wheel navigation with debounce
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    // Check if the user is scrolling on a scrollable element inside an Html overlay
    const handleWheel = (e: WheelEvent) => {
      // Don't intercept if scrolling inside a specific container (like an About text box)
      const target = e.target as HTMLElement;
      if (target.closest('.scrollable-overlay')) return;

      if (isAnimating.current) return;
      if (Math.abs(e.deltaY) < 30) return;

      if (e.deltaY > 0 && activeIsland < ISLANDS.length - 1) {
        setTargetIsland(activeIsland + 1);
        isAnimating.current = true;
      } else if (e.deltaY < 0 && activeIsland > 0) {
        setTargetIsland(activeIsland - 1);
        isAnimating.current = true;
      }
      
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        isAnimating.current = false;
      }, 1500); // lock out wheel events during transition
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(timeout);
    };
  }, [activeIsland, setTargetIsland]);

  // Handle camera flight
  useEffect(() => {
    if (targetIsland !== null && targetIsland !== activeIsland) {
      const targetPos = ISLAND_POSITIONS[targetIsland];
      const camTargetPos = targetPos.clone().add(new THREE.Vector3(0, 2, 14));

      isAnimating.current = true;

      // Animate position
      gsap.to(camera.position, {
        x: camTargetPos.x,
        y: camTargetPos.y,
        z: camTargetPos.z,
        duration: 1.5,
        ease: "power3.inOut",
        onComplete: () => {
          setActiveIsland(targetIsland);
          setTargetIsland(null);
          // Allow settling before next scroll
          setTimeout(() => { isAnimating.current = false; }, 200);
        }
      });
      
      // Animate lookAt through a dummy object proxy
      const dummy = { t: 0 };
      const startLookAt = ISLAND_POSITIONS[activeIsland].clone();
      
      gsap.to(dummy, {
        t: 1,
        duration: 1.5,
        ease: "power3.inOut",
        onUpdate: () => {
          const currentLookAt = new THREE.Vector3().lerpVectors(startLookAt, targetPos, dummy.t);
          camera.lookAt(currentLookAt);
        }
      });
    }
  }, [targetIsland, activeIsland, camera, setActiveIsland, setTargetIsland]);

  // Idle sway
  useFrame((state) => {
    if (targetIsland === null && !isAnimating.current) {
      const currentIslandPos = ISLAND_POSITIONS[activeIsland];
      const baseCamPos = currentIslandPos.clone().add(new THREE.Vector3(0, 2, 14));
      const swayX = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      const swayY = Math.cos(state.clock.elapsedTime * 0.4) * 0.3;
      
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, baseCamPos.x + swayX, 0.05);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, baseCamPos.y + swayY, 0.05);
      camera.lookAt(currentIslandPos);
    }
  });

  return null;
}

"use client";
import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

interface SkillBouncerProps {
  skills: string[];
}

export default function SkillBouncer({ skills }: SkillBouncerProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [elements, setElements] = useState<{ id: number; text: string }[]>([]);
  const elementsRef = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    if (!sceneRef.current) return;

    const engine = Matter.Engine.create();
    engine.gravity.y = 0.6; // Slight downward gravity so they settle gracefully
    
    const renderWidth = sceneRef.current.clientWidth;
    const renderHeight = 220; // Fixed min height for the physics inner world
    
    // Bounds to prevent falling out
    const wallOptions = { 
      isStatic: true, 
      render: { visible: false },
      restitution: 0.8,
      friction: 0
    };
    
    // Create soft invisible walls surrounding the container
    const ground = Matter.Bodies.rectangle(renderWidth / 2, renderHeight + 25, renderWidth + 100, 50, wallOptions);
    const ceiling = Matter.Bodies.rectangle(renderWidth / 2, -25, renderWidth + 100, 50, wallOptions);
    const leftWall = Matter.Bodies.rectangle(-25, renderHeight / 2, 50, renderHeight + 100, wallOptions);
    const rightWall = Matter.Bodies.rectangle(renderWidth + 25, renderHeight / 2, 50, renderHeight + 100, wallOptions);

    Matter.World.add(engine.world, [ground, ceiling, leftWall, rightWall]);

    // Create a bounding box body for each skill text
    const newElements: { id: number; text: string }[] = [];
    const bodies: Matter.Body[] = [];

    skills.forEach((skill, i) => {
      // Approximate sizes based on text character count
      const pxWidth = skill.length * 8 + 32; 
      const pxHeight = 36;
      
      const x = Math.random() * (renderWidth - pxWidth) + pxWidth / 2;
      const y = Math.random() * (renderHeight / 2) + 20;

      const body = Matter.Bodies.rectangle(x, y, pxWidth, pxHeight, {
        chamfer: { radius: pxHeight / 2 }, // Pill shape
        restitution: 0.7, // Bouncy!
        friction: 0.05,
        frictionAir: 0.015,
        density: 0.05,
        render: { visible: false } // We don't use Matter's renderer
      });

      // Scatter them around on load
      Matter.Body.applyForce(body, body.position, {
        x: (Math.random() - 0.5) * 0.15,
        y: (Math.random() - 0.5) * 0.15
      });

      bodies.push(body);
      newElements.push({ id: body.id, text: skill });
    });

    Matter.World.add(engine.world, bodies);
    setElements(newElements);

    // Mouse interaction mapped directly to the relative container
    const mouse = Matter.Mouse.create(sceneRef.current);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2, // Spring-like drag feeling
        render: { visible: false }
      }
    });

    // Prevent matter mouse from aggressively hijacking the main browser scroll wheel
    const anyMouse = mouse as any;
    if (anyMouse.mousewheel) {
      mouse.element.removeEventListener("mousewheel", anyMouse.mousewheel);
      mouse.element.removeEventListener("DOMMouseScroll", anyMouse.mousewheel);
    }

    Matter.World.add(engine.world, mouseConstraint);

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    let animationFrameId: number;

    const updateDOM = () => {
      bodies.forEach(body => {
        const el = elementsRef.current[body.id];
        if (el) {
          // Keep DOM element synced perfectly with physics tick
          const x = body.position.x - el.offsetWidth / 2;
          const y = body.position.y - el.offsetHeight / 2;
          const angle = body.angle;
          
          el.style.transform = `translate(${x}px, ${y}px) rotate(${angle}rad)`;
        }
      });
      animationFrameId = requestAnimationFrame(updateDOM);
    };
    
    updateDOM();

    // Prevent items passing through walls aggressively on resize
    const handleResize = () => {
       if (!sceneRef.current) return;
       const newWidth = sceneRef.current.clientWidth;
       Matter.Body.setPosition(rightWall, { x: newWidth + 25, y: renderHeight / 2 });
       Matter.Body.setPosition(ground, { x: newWidth / 2, y: renderHeight + 25 });
       Matter.Body.setPosition(ceiling, { x: newWidth / 2, y: -25 });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      Matter.Runner.stop(runner);
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);
    };
  }, [skills]);

  return (
    <div 
      ref={sceneRef} 
      className="relative w-full h-[220px] overflow-hidden rounded-xl bg-[rgba(15,10,18,0.2)] border border-[rgba(209,131,169,0.1)] shadow-inner cursor-grab active:cursor-grabbing"
    >
      {elements.map((el) => (
        <div
          key={el.id}
          ref={(node) => { if (node) elementsRef.current[el.id] = node; }}
          className="absolute top-0 left-0 flex items-center justify-center font-inter text-[13.5px] font-medium text-[#F3C8DD] bg-[rgba(11,15,25,0.85)] border-[1.5px] border-[rgba(209,131,169,0.5)] px-4 py-1.5 rounded-full backdrop-blur-md shadow-[0_4px_12px_rgba(209,131,169,0.25)] whitespace-nowrap select-none pointer-events-none"
          style={{ willChange: "transform" }}
        >
          {el.text}
        </div>
      ))}
      
      {/* Decorative interactive hint */}
      <div className="absolute bottom-3 left-0 w-full text-center pointer-events-none opacity-40">
        <span className="font-jetbrains-mono text-[10px] text-[#D183A9] tracking-widest uppercase bg-[#0B0F19] px-3 py-1 rounded-md bg-opacity-80">
          [ Drag & Toss to interact ]
        </span>
      </div>
    </div>
  );
}

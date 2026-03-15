import { Html } from "@react-three/drei";
import { useNavigation } from "../../context/NavigationContext";
import Island from "../Island";

export default function SkillsIsland({ position }: { position: [number, number, number] }) {
  const { activeIsland } = useNavigation();
  const isActive = activeIsland === 2;

  const skills = [
    { category: "Frontend", items: ["ReactJS", "JavaScript", "Redux", "Tailwind CSS", "HTML", "CSS"] },
    { category: "Backend", items: ["Django", "Python", "REST APIs", "Authentication", "CRUD"] },
    { category: "Database", items: ["MySQL"] },
    { category: "AI/GenAI", items: ["Prompt Engineering", "AI Agents", "OpenAI API", "Structured LLM"] },
    { category: "Data", items: ["NumPy", "Pandas", "Matplotlib"] },
    { category: "Tools", items: ["Git", "GitHub", "VS Code", "n8n"] },
  ];

  return (
    <Island id={2} dimensions={[18, 0.6, 14]} position={position} color="#1a1118" glowColor="#D183A9" scale={1.1}>
      
      <Html 
        position={[0, 4, 0]} 
        transform 
        center
        occlude="blending"
        className={`pointer-events-auto transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="flex flex-col gap-6 text-center select-none bg-[rgba(26,17,24,0.92)] p-[32px] rounded-[20px] border border-[rgba(209,131,169,0.3)] backdrop-blur-[20px] min-w-[600px]">
          
          <div className="grid grid-cols-2 gap-x-12 gap-y-8">
            {skills.map((skill, idx) => (
              <div key={idx} className="flex flex-col gap-3 text-left">
                <h3 className="font-jetbrains-mono text-[#D183A9] text-[11px] uppercase tracking-widest">{skill.category}</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {skill.items.map((item, i) => (
                    <span 
                      key={i} 
                      className="text-[13px] text-[#F3C8DD] bg-[rgba(209,131,169,0.1)] border border-[rgba(209,131,169,0.4)] px-[14px] py-[6px] rounded-[20px] m-[1px]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Html>

    </Island>
  );
}

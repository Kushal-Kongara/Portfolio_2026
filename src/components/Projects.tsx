"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/constants";
import Image from "next/image";
import { FiArrowUpRight, FiGithub, FiX, FiPlus } from "react-icons/fi";
import {
  SiReact, SiNextdotjs, SiThreedotjs, SiFramer, SiGreensock,
  SiOpenai, SiTailwindcss, SiPrisma, SiNodedotjs,
  SiRedis, SiPostgresql, SiPython, SiFastapi, SiHuggingface
} from "react-icons/si";

const getTechIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes("react")) return <SiReact />;
  if (n.includes("next")) return <SiNextdotjs />;
  if (n.includes("three")) return <SiThreedotjs />;
  if (n.includes("framer")) return <SiFramer />;
  if (n.includes("gsap") || n.includes("green")) return <SiGreensock />;
  if (n.includes("openai")) return <SiOpenai />;
  if (n.includes("tailwind")) return <SiTailwindcss />;
  if (n.includes("prisma")) return <SiPrisma />;
  if (n.includes("node")) return <SiNodedotjs />;
  if (n.includes("redis")) return <SiRedis />;
  if (n.includes("postgres")) return <SiPostgresql />;
  if (n.includes("python")) return <SiPython />;
  if (n.includes("fastapi")) return <SiFastapi />;
  if (n.includes("hugging")) return <SiHuggingface />;
  return null;
};

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

function ProjectCard({
  project,
  index,
  isExpanded,
  onToggle,
}: ProjectCardProps) {
  const num = String(index + 1).padStart(2, "0");
  
  // Dynamic project colors: Orange, Green, Blue
  const colors = ["#ff9d00", "#10b981", "#3b82f6"];
  const accentColor = colors[index % colors.length];

  return (
    <motion.div
      layout
      onClick={onToggle}
      className={`relative w-full bg-white border-[2.5px] border-black transition-all duration-300 ${isExpanded ? 'z-50 lg:col-span-4 sm:col-span-2' : 'z-10 col-span-1'}`}
      style={{ 
        boxShadow: isExpanded ? "12px 12px 0px #000" : "6px 6px 0px #000",
        cursor: "pointer"
      }}
      whileHover={{ y: -6, boxShadow: "14px 14px 0px #000" }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {/* OS-Style Window Header (Dynamic Color) */}
      <div className="flex items-center justify-between px-4 py-2 border-b-[2.5px] border-black" style={{ backgroundColor: accentColor }}>
        <div className="flex items-center gap-3">
            <span className="font-bold text-[10px] tracking-tight text-black flex items-center gap-2 uppercase">
                <span className="w-2.5 h-2.5 bg-white border border-black rounded-xs" />
                PROJECT_INFO_{num}
            </span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 border border-black bg-white flex items-center justify-center font-bold text-[10px] text-black">_</div>
          <div className="w-4 h-4 border border-black bg-white flex items-center justify-center">
            <div className="w-2 h-2 border border-black" />
          </div>
          <div 
            className={`w-4 h-4 border border-black flex items-center justify-center font-bold text-[9px] ${isExpanded ? 'bg-red-400 text-white' : 'bg-white text-black'}`}
          >
            ✕
          </div>
        </div>
      </div>

      {/* Internal Content Area */}
      <motion.div
        layout
        className="relative overflow-hidden bg-neutral-100 border-b-[2.5px] border-black"
        style={{ height: isExpanded ? "min(420px, 55vw)" : "min(180px, 35vw)" }}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-all duration-500"
            draggable={false}
          />
        ) : (
          <div className="w-full h-full bg-neutral-100" />
        )}
        
        {/* Technical Metadata Badge */}
        <div className="absolute bottom-3 left-3 bg-white border border-black px-2 py-0.5 font-bold text-[9px] uppercase tracking-widest text-black shadow-[3px_3px_0px_#000]">
           REF_{index * 12 + 400}
        </div>
      </motion.div>

      {/* Project Title Row */}
      <div className="px-5 py-4 flex justify-between items-center bg-white">
        <h3
          className="font-black uppercase leading-none text-black tracking-tight"
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
            letterSpacing: "-0.02em"
          }}
        >
          {project.title}
        </h3>
        {!isExpanded && <div className="text-black font-black text-xs">[ OPEN ]</div>}
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden bg-white"
          >
            <div className="p-8 space-y-6 border-t-[2.5px] border-black max-w-5xl mx-auto">
              {/* Vibrant Impact Description */}
              <div className="bg-[#ffff00] border-[2.5px] border-black p-6 shadow-[6px_6px_0px_#000]">
                <p className="text-black text-sm md:text-base leading-relaxed font-black uppercase tracking-tight italic">
                    {project.impact}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-black text-white px-4 py-2 text-[10px] font-bold tracking-widest uppercase border border-black text-center">
                   OUTPUT: {project.metric}
                </div>
                <div className="flex-1 h-[2px] bg-black" />
              </div>

              {/* Colorful Tech Stack */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tech.map((t) => (
                  <div
                    key={t}
                    className="flex items-center gap-2 px-4 py-2 bg-white border-[2px] border-black text-[10px] font-black uppercase tracking-tight text-black shadow-[3px_3px_0px_rgba(0,0,0,0.1)] hover:shadow-none transition-all"
                  >
                    <span className="text-[12px]">{getTechIcon(t)}</span>
                    {t}
                  </div>
                ))}
              </div>

              {/* Neo-Brutalist Buttons */}
              <div className="flex flex-wrap gap-3 pt-6">
                {project.link !== "#" && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-3 px-4 sm:px-8 py-3 sm:py-4 bg-black text-white text-[11px] font-bold uppercase tracking-widest transition-all border-[2.5px] border-black shadow-[8px_8px_0px_#000] hover:shadow-none translate-y-0 active:translate-y-[2px]"
                  >
                    LAUNCH_EXPERIENCE <FiArrowUpRight size={16} strokeWidth={3} />
                  </a>
                )}
                {project.code !== "#" && (
                  <a
                    href={project.code}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-3 px-4 sm:px-8 py-3 sm:py-4 text-black text-[11px] font-bold uppercase tracking-widest transition-all border-[2.5px] border-black shadow-[8px_8px_0px_#000] hover:shadow-none translate-y-0 active:translate-y-[2px]"
                    style={{ backgroundColor: accentColor }}
                  >
                    GET_SOURCE_CODE <FiGithub size={16} strokeWidth={3} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Projects() {
  const displayProjects = projects.slice(0, 4);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div id="projects" className="w-full bg-[#edf2ff] relative overflow-hidden py-24 border-t-[3px] border-black pb-48">
      {/* Subtle Linear Technical Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
        <svg width="100%" height="100%">
          <pattern
            id="technicalGrid"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke="black"
              strokeWidth="2"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#technicalGrid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header Section (Colorful/Massive) */}
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-24 gap-12 border-b-[3px] border-black pb-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 bg-white border-[2.5px] border-black px-4 py-1 shadow-[4px_4px_0px_#000]">
                <span className="w-2 h-2 bg-red-500 animate-pulse" />
                <p className="text-black text-[11px] font-black tracking-[0.4em] uppercase">
                    SYSTEM.LOG / PROJECTS
                </p>
            </div>
            <h2
              className="text-black font-black uppercase leading-none tracking-tighter"
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "clamp(3.5rem, 10vw, 6rem)",
                letterSpacing: "-0.06em"
              }}
            >
              SELECTED <br />
              <span className="text-[#3b82f6]">PROJECTS</span>
            </h2>
          </div>
          
          <div className="flex flex-col gap-6 max-w-sm pt-4">
            <div className="h-[3px] w-20 bg-black" />
            <p className="text-black text-sm font-black uppercase leading-relaxed tracking-tight bg-white border-[2.5px] border-black p-4 shadow-[6px_6px_0px_#000]">
               Curating high-impact digital experiences through rigorous engineering and aesthetic precision.
            </p>
          </div>
        </div>

        {/* Project Grid - 4 Columns and Focused Expansion */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-10">
          {displayProjects.map((project, i) => (
            <ProjectCard
              key={i}
              project={project}
              index={i}
              isExpanded={expandedId === i}
              onToggle={() => toggleExpand(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

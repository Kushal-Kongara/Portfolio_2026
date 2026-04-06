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

  return (
    <motion.div
      layout
      onClick={onToggle}
      className={`relative w-full bg-white border-[3px] border-black transition-all duration-300 ${isExpanded ? 'z-50' : 'z-10'}`}
      style={{ 
        boxShadow: isExpanded ? "12px 12px 0px #ff5500" : "8px 8px 0px #ff5500",
        cursor: "pointer"
      }}
      whileHover={{ y: -4, boxShadow: "12px 12px 0px #ff5500" }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Card header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b-[2px] border-black">
        <span
          className="font-black text-xs tracking-widest text-black/40"
          style={{ fontFamily: "monospace" }}
        >
          {num}
        </span>
        {isExpanded ? (
          <button
            onClick={(e) => { e.stopPropagation(); onToggle(); }}
            className="w-5 h-5 bg-black text-white flex items-center justify-center hover:bg-[#ff5500] transition-colors"
          >
            <FiX size={10} strokeWidth={3} />
          </button>
        ) : (
          <FiPlus size={12} className="text-black/30" />
        )}
      </div>

      {/* Image container */}
      <motion.div
        layout
        className="relative w-full overflow-hidden bg-neutral-100"
        style={{ height: isExpanded ? "220px" : "180px" }}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            draggable={false}
          />
        ) : (
          <div className="w-full h-full bg-neutral-200" />
        )}
      </motion.div>

      {/* Title row */}
      <div className="px-4 pt-3 pb-2">
        <h3
          className="font-black uppercase leading-none text-black tracking-tighter"
          style={{
            fontFamily: "Impact, system-ui, sans-serif",
            fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
          }}
        >
          {project.title}
        </h3>
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "circOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-5 space-y-4 border-t-[2px] border-black/10 pt-4">
              {/* Impact */}
              <p className="text-black/70 text-xs md:text-sm leading-relaxed font-medium">
                {project.impact}
              </p>

              {/* Metric */}
              <div className="inline-flex items-center gap-1.5 bg-black text-white px-3 py-1.5 text-[10px] font-black tracking-widest uppercase">
                <span className="text-[#ff5500]">↑</span>
                {project.metric}
              </div>

              {/* Tech pills */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <div
                    key={t}
                    className="flex items-center gap-1.5 px-2.5 py-1 border border-black/20 text-[10px] font-black uppercase tracking-wider text-black/60"
                  >
                    <span className="text-[11px]">{getTechIcon(t)}</span>
                    {t}
                  </div>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-3 pt-2">
                {project.link !== "#" && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 px-4 py-2 bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#ff5500] transition-all hover:scale-105"
                  >
                    Live Site <FiArrowUpRight size={12} strokeWidth={3} />
                  </a>
                )}
                {project.code !== "#" && (
                  <a
                    href={project.code}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 px-4 py-2 border-[2px] border-black text-black text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all hover:scale-105"
                  >
                    Code <FiGithub size={12} strokeWidth={3} />
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
    <div id="projects" className="w-full bg-[#0f0f0f] relative overflow-hidden py-24">
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <p className="text-[#ff5500] text-[10px] font-black tracking-[0.5em] uppercase font-mono">
              Selected Work
            </p>
            <h2
              className="text-white font-black uppercase leading-[0.8] tracking-tighter"
              style={{
                fontFamily: "Impact, system-ui, sans-serif",
                fontSize: "clamp(3.5rem, 10vw, 8rem)",
              }}
            >
              PROJECTS
            </h2>
          </div>
          
          <div className="flex items-center gap-4 text-white/30 text-[10px] font-black uppercase tracking-widest font-mono border-l-2 border-[#ff5500] pl-6 h-fit py-2">
            Click project cards to reveal details
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
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

        {/* Bottom indicator */}
        <div className="mt-20 flex justify-center">
            <div className="h-[2px] w-24 bg-white/10 relative overflow-hidden">
                <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="absolute inset-0 bg-[#ff5500]" 
                />
            </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/constants";
import Image from "next/image";
import { FiArrowUpRight, FiGithub, FiX, FiMove } from "react-icons/fi";
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

// Initial scatter positions (x offset, y offset from board origin, rotation)
const INITIAL_POSITIONS = [
  { x: 40,  y: 50,  rotate: -3 },
  { x: 380, y: 20,  rotate:  2.5 },
  { x: 160, y: 310, rotate: -1.5 },
  { x: 560, y: 260, rotate:  3.5 },
];

function DraggableCard({
  project,
  index,
  boardRef,
  expandedId,
  setExpandedId,
}: {
  project: typeof projects[0];
  index: number;
  boardRef: React.RefObject<HTMLDivElement | null>;
  expandedId: number | null;
  setExpandedId: (id: number | null) => void;
}) {
  const num = String(index + 1).padStart(2, "0");
  const init = INITIAL_POSITIONS[index];
  const x = useMotionValue(init.x);
  const y = useMotionValue(init.y);
  const isExpanded = expandedId === index;

  // Track drag distance to distinguish click vs drag
  const dragStartPos = useRef({ x: 0, y: 0 });
  const didDrag = useRef(false);

  const handleDragStart = () => {
    dragStartPos.current = { x: x.get(), y: y.get() };
    didDrag.current = false;
  };

  const handleDrag = () => {
    const dx = Math.abs(x.get() - dragStartPos.current.x);
    const dy = Math.abs(y.get() - dragStartPos.current.y);
    if (dx > 5 || dy > 5) didDrag.current = true;
  };

  const handleClick = () => {
    if (didDrag.current) return;
    setExpandedId(isExpanded ? null : index);
  };

  return (
    <motion.div
      drag
      dragConstraints={boardRef}
      dragElastic={0.08}
      dragTransition={{ bounceStiffness: 400, bounceDamping: 30 }}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onClick={handleClick}
      style={{
        x,
        y,
        rotate: init.rotate,
        position: "absolute",
        zIndex: isExpanded ? 50 : 10,
        cursor: isExpanded ? "default" : "grab",
      }}
      whileDrag={{
        scale: 1.04,
        rotate: 0,
        zIndex: 60,
        cursor: "grabbing",
        boxShadow: "14px 14px 0px #ff5500",
      }}
      animate={isExpanded ? { scale: 1.02, rotate: 0 } : { scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="w-[260px] md:w-[300px] bg-white border-[3px] border-black select-none"
      style2={{ boxShadow: "8px 8px 0px #ff5500" }}
    >
      <div style={{ boxShadow: isExpanded ? "14px 14px 0px #ff5500" : "8px 8px 0px #ff5500" }}>
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
              onClick={(e) => { e.stopPropagation(); setExpandedId(null); }}
              className="w-5 h-5 bg-black text-white flex items-center justify-center hover:bg-[#ff5500] transition-colors"
            >
              <FiX size={10} strokeWidth={3} />
            </button>
          ) : (
            <FiMove size={12} className="text-black/30" />
          )}
        </div>

        {/* Image */}
        <div
          className="relative w-full overflow-hidden bg-neutral-100"
          style={{ height: isExpanded ? "140px" : "180px", transition: "height 0.3s ease" }}
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
        </div>

        {/* Title row */}
        <div className="px-4 pt-3 pb-2">
          <h3
            className="font-black uppercase leading-none text-black tracking-tighter"
            style={{
              fontFamily: "Impact, system-ui, sans-serif",
              fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
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
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 space-y-3 border-t-[2px] border-black/10 pt-3">
                {/* Impact */}
                <p className="text-black/70 text-[11px] leading-relaxed font-medium">
                  {project.impact}
                </p>

                {/* Metric */}
                <div className="inline-flex items-center gap-1.5 bg-black text-white px-2 py-1 text-[9px] font-black tracking-widest uppercase">
                  <span className="text-[#ff5500]">↑</span>
                  {project.metric}
                </div>

                {/* Tech pills */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <div
                      key={t}
                      className="flex items-center gap-1 px-2 py-0.5 border border-black/20 text-[9px] font-black uppercase tracking-wider text-black/60"
                    >
                      <span className="text-[10px]">{getTechIcon(t)}</span>
                      {t}
                    </div>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-2 pt-1">
                  {project.link !== "#" && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1 px-3 py-1.5 bg-black text-white text-[9px] font-black uppercase tracking-widest hover:bg-[#ff5500] transition-colors"
                    >
                      Live <FiArrowUpRight size={10} strokeWidth={3} />
                    </a>
                  )}
                  {project.code !== "#" && (
                    <a
                      href={project.code}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1 px-3 py-1.5 border-[2px] border-black text-black text-[9px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
                    >
                      Code <FiGithub size={10} strokeWidth={3} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const displayProjects = projects.slice(0, 4);
  const boardRef = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div id="projects" className="w-full bg-[#0f0f0f] relative overflow-hidden" style={{ minHeight: "860px" }}>
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.18]"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Header */}
      <div className="relative z-10 px-8 md:px-14 pt-14 pb-6 flex items-end justify-between">
        <div>
          <p className="text-white/30 text-[10px] font-black tracking-[0.4em] uppercase font-mono mb-2">
            Selected Work
          </p>
          <h2
            className="text-white font-black uppercase leading-none"
            style={{
              fontFamily: "Impact, system-ui, sans-serif",
              fontSize: "clamp(3rem, 7vw, 6rem)",
              WebkitTextStroke: "1px rgba(255,255,255,0.15)",
            }}
          >
            PROJECTS
          </h2>
        </div>
        <p className="text-white/20 text-[10px] font-mono tracking-widest uppercase hidden md:block self-end pb-2">
          drag to rearrange · click to expand
        </p>
      </div>

      {/* Drag board */}
      <div
        ref={boardRef}
        className="relative hidden md:block"
        style={{ height: "660px", width: "100%" }}
      >
        {displayProjects.map((project, i) => (
          <DraggableCard
            key={i}
            project={project}
            index={i}
            boardRef={boardRef}
            expandedId={expandedId}
            setExpandedId={setExpandedId}
          />
        ))}
      </div>

      {/* Mobile fallback — stacked vertical list */}
      <div className="md:hidden px-6 pb-12 space-y-6">
        {displayProjects.map((project, i) => {
          const num = String(i + 1).padStart(2, "0");
          return (
            <div key={i} className="bg-white border-[3px] border-black" style={{ boxShadow: "6px 6px 0px #ff5500" }}>
              <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b-[2px] border-black">
                <span className="font-black text-xs tracking-widest text-black/40 font-mono">{num}</span>
              </div>
              <div className="relative w-full h-[200px] bg-neutral-100">
                {project.image && (
                  <Image src={project.image} alt={project.title} fill className="object-cover" />
                )}
              </div>
              <div className="px-4 pt-3 pb-2">
                <h3
                  className="font-black uppercase leading-none text-black tracking-tighter text-2xl"
                  style={{ fontFamily: "Impact, system-ui, sans-serif" }}
                >
                  {project.title}
                </h3>
              </div>
              <div className="px-4 pb-4 space-y-3 border-t-[2px] border-black/10 pt-3">
                <p className="text-black/70 text-xs leading-relaxed">{project.impact}</p>
                <div className="inline-flex items-center gap-1.5 bg-black text-white px-2 py-1 text-[9px] font-black tracking-widest uppercase">
                  <span className="text-[#ff5500]">↑</span>
                  {project.metric}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <div key={t} className="flex items-center gap-1 px-2 py-0.5 border border-black/20 text-[9px] font-black uppercase tracking-wider text-black/60">
                      <span className="text-[10px]">{getTechIcon(t)}</span>
                      {t}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 pt-1">
                  {project.link !== "#" && (
                    <a href={project.link} target="_blank" rel="noreferrer"
                      className="flex items-center gap-1 px-3 py-1.5 bg-black text-white text-[9px] font-black uppercase tracking-widest">
                      Live <FiArrowUpRight size={10} />
                    </a>
                  )}
                  {project.code !== "#" && (
                    <a href={project.code} target="_blank" rel="noreferrer"
                      className="flex items-center gap-1 px-3 py-1.5 border-[2px] border-black text-black text-[9px] font-black uppercase tracking-widest">
                      Code <FiGithub size={10} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

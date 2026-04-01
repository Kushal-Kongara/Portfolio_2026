"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/constants";
import Image from "next/image";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { 
  SiReact, SiNextdotjs, SiThreedotjs, SiFramer, SiGreensock, 
  SiOpenai, SiTailwindcss, SiPrisma, SiNodedotjs, 
  SiRedis, SiPostgresql, SiPython, SiFastapi, SiHuggingface 
} from "react-icons/si";

const THEME_COLORS = [
  { bg: "#fde047", text: "#000000", accent: "#000000" }, // Neon Yellow
  { bg: "#3b82f6", text: "#ffffff", accent: "#fde047" }, // Electric Blue
  { bg: "#2dd4bf", text: "#000000", accent: "#000000" }, // Vivid Teal
  { bg: "#a855f7", text: "#ffffff", accent: "#ffffff" }, // Electric Purple
];

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

const ProjectSection = ({ project, index }: { project: any; index: number }) => {
  const colors = THEME_COLORS[index % THEME_COLORS.length];
  const isAlt = index % 2 !== 0;

  return (
    <section 
      style={{ 
        backgroundColor: colors.bg,
        clipPath: index === 0 
          ? "polygon(0 0, 100% 0, 100% 98%, 0 100%)" 
          : index === projects.length - 1
            ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" // Flat bottom for the last project
            : "polygon(0 2%, 100% 0, 100% 98%, 0 100%)"
      }}
      className={`relative py-14 md:py-20 px-6 overflow-hidden ${index !== 0 ? "-mt-6 md:-mt-8" : ""}`}
    >
      {/* Background Index Number */}
      <span 
        style={{ color: colors.text, opacity: 0.1 }}
        className={`absolute text-[12rem] md:text-[18rem] font-black pointer-events-none select-none z-0 ${isAlt ? "left-5" : "right-5"}`}
      >
        {index + 1}
      </span>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center relative z-10">
        
        {/* INFO COLUMN */}
        <motion.div 
          initial={{ opacity: 0, x: isAlt ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className={`flex flex-col ${isAlt ? "md:order-2" : "md:order-1"}`}
        >
          <div className="mb-6">
            <span className="text-xl md:text-3xl font-black uppercase tracking-[0.3em] opacity-30 block mb-1" style={{ color: colors.text }}>PROJECTS</span>
            <h3 className="text-4xl md:text-6xl lg:text-7xl font-black text-black uppercase tracking-tighter leading-none [font-family:Impact,sans-serif]" style={{ color: colors.text, transform: "scaleY(1.1)" }}>
              {project.title}
            </h3>
          </div>
          
          <div className="max-w-md">
            <p className="text-xl md:text-2xl font-bold leading-tight mb-8" style={{ color: colors.text, opacity: 0.9 }}>
              {project.impact}
            </p>
            
            <div className="flex flex-col gap-2 mb-8">
              <span className="text-xs font-black uppercase tracking-[0.2em] opacity-60" style={{ color: colors.text }}>Impact Metric</span>
              <p className="text-3xl md:text-4xl font-black tracking-tight" style={{ color: colors.text }}>
                {project.metric}
              </p>
            </div>

            {/* Tech Icons Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t: string) => (
                <div key={t} className="flex items-center gap-2 px-3 py-1.5 border-2 rounded-lg transition-transform hover:scale-105" style={{ borderColor: colors.text, color: colors.text }}>
                  <span className="text-lg">{getTechIcon(t)}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* IMAGE COLUMN */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className={`relative ${isAlt ? "md:order-1" : "md:order-2"}`}
        >
          {/* Picture Box */}
          <div 
            className="relative aspect-video rounded-3xl overflow-hidden shadow-[20px_20px_60px_rgba(0,0,0,0.2)] border-b-8 group"
            style={{ 
              borderColor: colors.text,
              perspective: "1000px",
              transform: isAlt ? "rotateY(8deg) scale(0.98)" : "rotateY(-8deg) scale(0.98)"
            }}
          >
            {project.image ? (
              <Image 
                src={project.image} 
                alt={project.title} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-black/10 flex items-center justify-center">
                <span className="text-black/20 font-black italic">PREVIEW</span>
              </div>
            )}
            
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
              {project.link !== "#" && (
                <a href={project.link} target="_blank" className="p-4 bg-white rounded-full hover:scale-110 transition-transform">
                  <FiArrowUpRight className="text-2xl text-black" />
                </a>
              )}
              {project.code !== "#" && (
                <a href={project.code} target="_blank" className="p-4 bg-white rounded-full hover:scale-110 transition-transform">
                  <FiGithub className="text-2xl text-black" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default function Projects() {
  const displayProjects = projects.slice(0, 4);

  return (
    <div className="w-full bg-white relative">
      {/* Massive Section Header */}
      <div className="w-full pt-24 pb-12 px-6 text-center">
        <motion.h2 
          initial={{ opacity: 0, scale: 1.2 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-[15vw] md:text-[12vw] font-black text-black uppercase tracking-tighter leading-none [font-family:Impact,sans-serif]"
          style={{ transform: "scaleY(1.1)" }}
        >
          PROJECTS
        </motion.h2>
        <div className="h-4 w-32 bg-black mx-auto mt-4 rounded-full" />
      </div>

      <div className="flex flex-col">
        {displayProjects.map((project, i) => (
          <ProjectSection key={i} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}

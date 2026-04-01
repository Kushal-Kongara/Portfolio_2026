"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/constants";
import Image from "next/image";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";

const THEME_COLORS = [
  { bg: "#fde047", text: "#000000", accent: "#000000" }, // Neon Yellow
  { bg: "#3b82f6", text: "#ffffff", accent: "#fde047" }, // Electric Blue
  { bg: "#2dd4bf", text: "#000000", accent: "#000000" }, // Vivid Teal
  { bg: "#a855f7", text: "#ffffff", accent: "#ffffff" }, // Electric Purple
];


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
            ? "polygon(0 2%, 100% 0, 100% 100%, 0 100%)"
            : "polygon(0 2%, 100% 0, 100% 98%, 0 100%)"
      }}
      className={`relative py-12 md:py-16 px-6 overflow-hidden ${index !== 0 ? "-mt-4 md:-mt-6" : ""}`}
    >
      {/* Background Index Number - Even smaller */}
      <span 
        style={{ color: colors.text, opacity: 0.1 }}
        className={`absolute text-[10rem] md:text-[14rem] font-black pointer-events-none select-none z-0 ${isAlt ? "left-2" : "right-2"}`}
      >
        {index + 1}
      </span>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center relative z-10">
        
        {/* INFO COLUMN */}
        <motion.div 
          initial={{ opacity: 0, x: isAlt ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className={`flex flex-col ${isAlt ? "md:order-2" : "md:order-1"}`}
        >
          <div className="mb-4">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 block mb-1" style={{ color: colors.text }}>PROJECTS</span>
            <h3 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tighter leading-none [font-family:Impact,sans-serif]" style={{ color: colors.text, transform: "scaleY(1.1)" }}>
              {project.title}
            </h3>
          </div>
            <p className="text-lg md:text-xl font-bold leading-tight mb-6" style={{ color: colors.text }}>
              {project.impact}
            </p>
            
            <div className="flex flex-col gap-2 mb-6">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60" style={{ color: colors.text }}>Performance</span>
              <p className="text-2xl font-black tracking-tight" style={{ color: colors.text }}>
                {project.metric}
              </p>
            </div>

            {/* Subtle Tech Chips */}
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t: string) => (
                <span key={t} className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 border" style={{ borderColor: colors.text, color: colors.text }}>
                  {t}
                </span>
              ))}
            </div>
        </motion.div>

        {/* IMAGE COLUMN */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className={`relative ${isAlt ? "md:order-1" : "md:order-2"}`}
        >
          {/* Picture Box - Tighter Isometric Framed */}
          <div 
            className="relative aspect-video rounded-2xl overflow-hidden shadow-[15px_15px_40px_rgba(0,0,0,0.15)] border-b-4 group"
            style={{ 
              borderColor: colors.text,
              perspective: "1000px",
              transform: isAlt ? "rotateY(5deg) scale(0.95)" : "rotateY(-5deg) scale(0.95)"
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
              <div className="w-full h-full bg-black/5 flex items-center justify-center">
                <span className="text-black/10 font-black italic text-xs uppercase">Preview</span>
              </div>
            )}
            
            {/* Quick Actions overlay */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
              {project.link !== "#" && (
                <a href={project.link} target="_blank" className="p-3 bg-white rounded-full hover:scale-110 transition-transform">
                  <FiArrowUpRight className="text-xl text-black" />
                </a>
              )}
              {project.code !== "#" && (
                <a href={project.code} target="_blank" className="p-3 bg-white rounded-full hover:scale-110 transition-transform">
                  <FiGithub className="text-xl text-black" />
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
      <div className="flex flex-col">
        {displayProjects.map((project, i) => (
          <ProjectSection key={i} project={project} index={i} />
        ))}
      </div>
      
      {/* Footer Divider */}
      <div className="h-10 bg-white" />
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { projects } from "@/lib/constants";

const GRADIENTS = [
  "from-[#3b82f6] to-[#60a5fa]", // Blue
  "from-[#ef4444] to-[#f87171]", // Red
  "from-[#10b981] to-[#34d399]", // Emerald
  "from-[#8b5cf6] to-[#a78bfa]"  // Purple
];

function ProjectFolder({ project, index }: { project: any; index: number }) {
  const gradient = GRADIENTS[index % GRADIENTS.length];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Expo-like smooth easing
        delay: index * 0.1
      }}
      className="relative w-full max-w-[280px] mx-auto aspect-square rounded-[2rem] overflow-hidden bg-[#1c1c1e] shadow-[0_15px_40px_rgba(0,0,0,0.2)] group border-[6px] border-[#18181a] cursor-pointer"
    >
      {/* Background colored gradient or Image */}
      {project.image ? (
        <div className="absolute inset-x-0 top-0 h-[65%] transition-transform duration-700 ease-out group-hover:scale-105 overflow-hidden bg-[#242424]">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-90" />
        </div>
      ) : (
        <div className={`absolute inset-x-0 top-0 h-[65%] bg-gradient-to-br ${gradient} opacity-90 transition-transform duration-700 ease-out group-hover:scale-105`} />
      )}


      {/* Dark Folder Flap */}
      <div
        className="absolute inset-0 bg-[#28282a] z-20 flex flex-col justify-between transition-colors duration-300"
        style={{
          clipPath: 'polygon(0 38%, 35% 38%, 45% 48%, 100% 48%, 100% 100%, 0 100%)',
          boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)'
        }}
      >
        {/* Folder Content */}
        <div className="pt-[50%] px-5 pb-4 flex flex-col justify-between h-full">
          <div>
            <h3 className="text-white text-lg font-bold tracking-tight mb-2">{project.title}</h3>
            <p className="text-[#98989f] text-xs leading-relaxed line-clamp-4">{project.description}</p>
          </div>

          {/* Quick Action Links */}
          <div className="flex flex-row gap-2 mt-auto pb-1 z-30">
            {project.code && (
              <a
                href={project.code}
                target="_blank"
                rel="noreferrer"
                className="px-2 py-1.5 rounded-full bg-white/10 flex items-center gap-1.5 hover:bg-white/20 text-white/90 hover:text-white transition-all shadow-sm relative backdrop-blur-sm"
                title="View Source Code"
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.137-.013-1.043-.015-1.92-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                <span className="text-[10px] uppercase font-bold tracking-wider">GitHub</span>
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="px-2 py-1.5 rounded-full bg-white/10 flex items-center gap-1.5 hover:bg-white/20 text-white/90 hover:text-white transition-all shadow-sm relative backdrop-blur-sm"
                title="Visit Live Site"
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                <span className="text-[10px] uppercase font-bold tracking-wider">Live</span>
              </a>
            )}
          </div>
        </div>

        {/* Footer info showing "files" */}
        <div className="px-5 pb-5 flex items-center gap-2 text-[#98989f] text-xs">
          <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          <span className="opacity-90 tracking-wide font-medium">1 Project</span>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <div className="w-full bg-[#0992C2]" id="projects">
      <SectionWrapper className="py-20 md:py-32">
        <motion.h2
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-[10vw] md:text-[3.5rem] lg:text-[4.5rem] font-black text-black uppercase tracking-tighter leading-none mb-8 md:mb-12 mt-8 text-left origin-left"
          style={{
            fontFamily: "Impact, system-ui, sans-serif",
            transform: "scaleY(1.2)",
            WebkitTextStroke: "2px black"
          }}
        >
          PROJECTS
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-[1400px] mx-auto justify-items-center w-full px-4 lg:px-8">
          {projects.map((project, i) => (
            <ProjectFolder key={project.title} project={project} index={i} />
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}

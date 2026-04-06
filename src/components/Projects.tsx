"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects } from "@/lib/constants";
import Image from "next/image";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import {
  SiReact, SiNextdotjs, SiThreedotjs, SiFramer, SiGreensock,
  SiOpenai, SiTailwindcss, SiPrisma, SiNodedotjs,
  SiRedis, SiPostgresql, SiPython, SiFastapi, SiHuggingface
} from "react-icons/si";

// Accent color per project (used for title + number highlight)
const ACCENTS = ["#fde047", "#60a5fa", "#2dd4bf", "#c084fc"];

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

const ProjectSlide = ({ project, index, total }: { project: any; index: number; total: number }) => {
  const ref = useRef<HTMLElement>(null);
  const accent = ACCENTS[index % ACCENTS.length];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Image parallax — moves slower than scroll
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  // Content fades out as you scroll away
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], [0, -40]);

  const num = String(index + 1).padStart(2, "0");

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden flex items-end"
    >
      {/* Full-bleed parallax image */}
      <motion.div
        className="absolute inset-0 scale-[1.15] origin-center"
        style={{ y: imageY }}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
        ) : (
          <div className="w-full h-full bg-neutral-900" />
        )}
      </motion.div>

      {/* Gradient overlay — dark at bottom, accent tint at top */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.15) 100%)`,
        }}
      />
      {/* Subtle accent color bleed from bottom-left */}
      <div
        className="absolute bottom-0 left-0 w-[40%] h-[30%] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at bottom left, ${accent}22 0%, transparent 70%)`,
        }}
      />

      {/* Project number — top right, huge and faded */}
      <motion.div
        className="absolute top-8 right-8 md:top-12 md:right-12 select-none pointer-events-none"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <span
          className="font-black leading-none"
          style={{
            fontFamily: "Impact, system-ui, sans-serif",
            fontSize: "clamp(5rem, 12vw, 10rem)",
            color: accent,
            opacity: 0.15,
          }}
        >
          {num}
        </span>
      </motion.div>

      {/* Project counter top-left */}
      <motion.div
        className="absolute top-8 left-8 md:top-12 md:left-12 flex items-center gap-3"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-white/40 text-[10px] font-black tracking-[0.3em] uppercase">
          {num} / {String(total).padStart(2, "0")}
        </span>
        {/* Thin accent line */}
        <div className="w-12 h-[2px]" style={{ backgroundColor: accent }} />
        <span className="text-white/40 text-[10px] font-black tracking-[0.3em] uppercase">
          Projects
        </span>
      </motion.div>

      {/* Main content — pinned to bottom */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 w-full px-8 md:px-16 pb-12 md:pb-16"
      >
        <div className="max-w-5xl">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white/50 text-[10px] font-black tracking-[0.4em] uppercase mb-3"
          >
            Selected Work
          </motion.p>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-black uppercase leading-none mb-4"
            style={{
              fontFamily: "Impact, system-ui, sans-serif",
              fontSize: "clamp(3rem, 9vw, 8rem)",
              color: accent,
              transform: "scaleY(1.1)",
            }}
          >
            {project.title}
          </motion.h2>

          {/* Impact + metric row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-8 mb-6"
          >
            <p className="text-white/80 text-base md:text-lg font-medium leading-snug max-w-md">
              {project.impact}
            </p>
            <div className="shrink-0 border-l-2 pl-6 hidden sm:block" style={{ borderColor: accent }}>
              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Impact</p>
              <p className="text-white font-black text-lg md:text-xl leading-tight">{project.metric}</p>
            </div>
          </motion.div>

          {/* Bottom row — tech + links */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-wrap items-center gap-3"
          >
            {/* Tech pills */}
            {project.tech.map((t: string) => (
              <div
                key={t}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-white/70 text-[10px] font-black uppercase tracking-widest"
                style={{ borderColor: "rgba(255,255,255,0.15)" }}
              >
                <span className="text-sm">{getTechIcon(t)}</span>
                {t}
              </div>
            ))}

            {/* Divider */}
            <div className="w-px h-6 bg-white/20 mx-1 hidden sm:block" />

            {/* Links */}
            {project.link !== "#" && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full font-black text-[11px] uppercase tracking-widest transition-all hover:scale-105"
                style={{ backgroundColor: accent, color: "#000" }}
              >
                Live <FiArrowUpRight />
              </a>
            )}
            {project.code !== "#" && (
              <a
                href={project.code}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full border font-black text-[11px] uppercase tracking-widest text-white hover:bg-white/10 transition-all border-white/30"
              >
                Code <FiGithub />
              </a>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default function Projects() {
  const displayProjects = projects.slice(0, 4);

  return (
    <div id="projects" className="w-full">
      {displayProjects.map((project, i) => (
        <ProjectSlide key={i} project={project} index={i} total={displayProjects.length} />
      ))}
    </div>
  );
}

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { projects } from "@/lib/constants";
import Image from "next/image";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import {
  SiReact, SiNextdotjs, SiThreedotjs, SiFramer, SiGreensock,
  SiOpenai, SiTailwindcss, SiPrisma, SiNodedotjs,
  SiRedis, SiPostgresql, SiPython, SiFastapi, SiHuggingface
} from "react-icons/si";

const THEME_COLORS = [
  { bg: "#fde047", text: "#000000", accent: "#000000" },
  { bg: "#3b82f6", text: "#ffffff", accent: "#fde047" },
  { bg: "#2dd4bf", text: "#000000", accent: "#000000" },
  { bg: "#a855f7", text: "#ffffff", accent: "#ffffff" },
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
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll progress for this specific section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 95%", "center 45%"],
  });

  // Smooth spring on the raw scroll value
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  // Image: drops from above, scales down, fades in
  const imageY = useTransform(smooth, [0, 1], [-120, 0]);
  const imageScale = useTransform(smooth, [0, 1], [1.18, 1]);
  const imageOpacity = useTransform(smooth, [0, 0.35], [0, 1]);
  const imageRotate = useTransform(smooth, [0, 1], [isAlt ? 4 : -4, 0]);

  // Info: slides in from side
  const infoX = useTransform(smooth, [0.1, 0.9], [isAlt ? 70 : -70, 0]);
  const infoOpacity = useTransform(smooth, [0.15, 0.75], [0, 1]);

  // Big background number: scales in
  const numScale = useTransform(smooth, [0, 1], [1.4, 1]);
  const numOpacity = useTransform(smooth, [0, 0.5], [0, 0.08]);

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: colors.bg,
        clipPath: index === 0
          ? "polygon(0 0, 100% 0, 100% 98%, 0 100%)"
          : index === projects.length - 1
          ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
          : "polygon(0 2%, 100% 0, 100% 98%, 0 100%)",
      }}
      className={`relative py-14 md:py-20 px-6 overflow-hidden ${index !== 0 ? "-mt-6 md:-mt-8" : ""}`}
    >
      {/* Background Index Number */}
      <motion.span
        style={{ scale: numScale, opacity: numOpacity, color: colors.text }}
        className={`absolute text-[12rem] md:text-[18rem] font-black pointer-events-none select-none z-0 top-1/2 -translate-y-1/2 ${isAlt ? "left-5" : "right-5"}`}
      >
        {index + 1}
      </motion.span>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center relative z-10">

        {/* INFO COLUMN */}
        <motion.div
          style={{ opacity: infoOpacity, x: infoX }}
          className={`flex flex-col ${isAlt ? "md:order-2" : "md:order-1"}`}
        >
          <div className="mb-6">
            <span
              className="text-xl md:text-3xl font-black uppercase tracking-[0.3em] opacity-30 block mb-1"
              style={{ color: colors.text }}
            >
              PROJECTS
            </span>
            <h3
              className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none"
              style={{ color: colors.text, fontFamily: "Impact, sans-serif", transform: "scaleY(1.1)" }}
            >
              {project.title}
            </h3>
          </div>

          <div className="max-w-md">
            <p
              className="text-xl md:text-2xl font-bold leading-tight mb-8"
              style={{ color: colors.text, opacity: 0.9 }}
            >
              {project.impact}
            </p>

            <div className="flex flex-col gap-2 mb-8">
              <span
                className="text-xs font-black uppercase tracking-[0.2em] opacity-60"
                style={{ color: colors.text }}
              >
                Impact Metric
              </span>
              <p
                className="text-3xl md:text-4xl font-black tracking-tight"
                style={{ color: colors.text }}
              >
                {project.metric}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tech.map((t: string) => (
                <div
                  key={t}
                  className="flex items-center gap-2 px-3 py-1.5 border-2 rounded-lg transition-transform hover:scale-105"
                  style={{ borderColor: colors.text, color: colors.text }}
                >
                  <span className="text-lg">{getTechIcon(t)}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* IMAGE COLUMN — scroll-driven drop */}
        <motion.div
          style={{
            y: imageY,
            scale: imageScale,
            opacity: imageOpacity,
            rotate: imageRotate,
          }}
          className={`relative ${isAlt ? "md:order-1" : "md:order-2"}`}
        >
          <div
            className="relative aspect-video rounded-3xl overflow-hidden shadow-[20px_20px_60px_rgba(0,0,0,0.25)] border-b-8 group"
            style={{ borderColor: colors.text }}
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
                <span className="text-black/20 font-black italic text-2xl">PREVIEW</span>
              </div>
            )}

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
              {project.link !== "#" && (
                <a
                  href={project.link}
                  target="_blank"
                  className="p-4 bg-white rounded-full hover:scale-110 transition-transform"
                >
                  <FiArrowUpRight className="text-2xl text-black" />
                </a>
              )}
              {project.code !== "#" && (
                <a
                  href={project.code}
                  target="_blank"
                  className="p-4 bg-white rounded-full hover:scale-110 transition-transform"
                >
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
    <div id="projects" className="w-full relative">
      <div className="flex flex-col">
        {displayProjects.map((project, i) => (
          <ProjectSection key={i} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}

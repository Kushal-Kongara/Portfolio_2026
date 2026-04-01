"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/constants";
import Image from "next/image";
import SectionWrapper from "./SectionWrapper";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";

const ProjectRow = ({ project, index }: { project: any; index: number }) => {
  const isAlt = index % 2 !== 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center mb-20 md:mb-32`}
    >
      {/* Image Column */}
      <div className={`relative aspect-[16/10] rounded-3xl overflow-hidden group shadow-2xl shadow-gray-200 border-8 border-white ${isAlt ? 'md:order-2' : 'md:order-1'}`}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Overlay Hover Links */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
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

      {/* Info Column */}
      <div className={`flex flex-col gap-6 ${isAlt ? 'md:order-1' : 'md:order-2'}`}>
        <div>
          <h3 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tighter leading-none mb-4 [font-family:Impact,sans-serif]">
            {project.title}
          </h3>
          <p className="text-xl font-bold text-gray-500 leading-tight">
            {project.impact}
          </p>
        </div>

        {/* Highlighted Metric */}
        <div className="py-4 border-y-2 border-gray-100">
           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 block mb-1">Key Result</span>
           <p className="text-2xl font-black text-blue-600 tracking-tight">
             {project.metric}
           </p>
        </div>

        {/* Subtle Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t: string) => (
            <span key={t} className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-3 py-1 bg-gray-50 rounded-full border border-gray-100">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  return (
    <section id="projects" className="w-full bg-white relative py-20">
      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar Heading */}
          <div className="lg:col-span-1 lg:sticky lg:top-32 h-fit">
            <h2 
              className="text-6xl md:text-7xl font-black text-black uppercase tracking-tighter leading-[0.8] [font-family:Impact,sans-serif] origin-left"
              style={{ transform: "scaleY(1.2)" }}
            >
              PROJECTS
            </h2>
            <div className="h-1.5 w-16 bg-black mt-6 hidden lg:block" />
          </div>

          {/* Projects List */}
          <div className="lg:col-span-3">
            {projects.map((project, i) => (
              <ProjectRow key={project.title} project={project} index={i} />
            ))}
          </div>
        </div>
      </SectionWrapper>
      
      {/* Footer Divider */}
      <div className="h-px w-full bg-gray-100 max-w-7xl mx-auto mt-20" />
    </section>
  );
}

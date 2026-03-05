"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import {
    SiReact, SiJavascript, SiTypescript, SiTailwindcss,
    SiNodedotjs, SiNextdotjs, SiPostgresql, SiMongodb,
    SiAnthropic, SiOpenai, SiDocker, SiKubernetes, SiGithubactions
} from "react-icons/si";
import { HiCode } from "react-icons/hi";
import { FaRobot, FaCoffee } from "react-icons/fa";

const SquigglyArrow = ({ type = 1, className = "" }: { type?: 1 | 2 | 3, className?: string }) => {
    if (type === 1) return (
        <svg viewBox="0 0 100 40" fill="none" className={className}>
            <path d="M5,10 Q30,5 50,20 T95,15" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" strokeLinecap="round" fill="none" />
            <path d="M92,12 L95,15 L90,18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
        </svg>
    );
    return (
        <svg viewBox="0 0 100 40" fill="none" className={className}>
            <path d="M5,30 Q40,10 95,20" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" strokeLinecap="round" fill="none" />
            <path d="M90,15 L95,20 L88,25" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
        </svg>
    );
};

const Highlighter = ({ children, color = "#dcfce7", className = "" }: { children: React.ReactNode, color?: string, className?: string }) => (
    <span className={`relative inline-block px-1.5 ${className}`}>
        <span
            className="absolute inset-x-0 bottom-0.5 h-[75%] -rotate-1 rounded-sm opacity-40 z-0"
            style={{ backgroundColor: color }}
        />
        <span className="relative z-10">{children}</span>
    </span>
);

export default function TechStack() {
    const tools = [
        { name: "React", icon: <SiReact className="text-[#61DAFB]" />, desc: "ui logic", color: "#e9d5ff", rotate: "-3deg", yOffset: "-8px" },
        { name: "JS", icon: <SiJavascript className="text-[#F7DF1E]" />, desc: "logic", color: "#bae6fd", rotate: "2deg", yOffset: "12px" },
        { name: "TS", icon: <SiTypescript className="text-[#3178C6]" />, desc: "safety", color: "#fecaca", rotate: "-2deg", yOffset: "-4px" },
        { name: "Tailwind", icon: <SiTailwindcss className="text-[#06B6D4]" />, desc: "style", color: "#99f6e4", rotate: "4deg", yOffset: "8px" },
        { name: "Node.js", icon: <SiNodedotjs className="text-[#339933]" />, desc: "server", color: "#fed7aa", rotate: "-4deg", yOffset: "-10px" },
        { name: "Next.js", icon: <SiNextdotjs className="text-black" />, desc: "fullstack", color: "#bae6fd", rotate: "1deg", yOffset: "6px" },
        { name: "Postgres", icon: <SiPostgresql className="text-[#4169E1]" />, desc: "db", color: "#ccfbf1", rotate: "-2deg", yOffset: "4px" },
        { name: "Docker", icon: <SiDocker className="text-[#2496ED]" />, desc: "devops", color: "#d1fae5", rotate: "3deg", yOffset: "-6px" },
        { name: "K8s", icon: <SiKubernetes className="text-[#326CE5]" />, desc: "scale", color: "#e0f2fe", rotate: "-1deg", yOffset: "10px" },
        { name: "CI/CD", icon: <SiGithubactions className="text-black" />, desc: "auto", color: "#ede9fe", rotate: "2deg", yOffset: "-3px" },
    ];

    return (
        <div className="w-full relative overflow-hidden bg-[#fdfdfd] font-caveat text-slate-700 py-6 md:py-8">
            {/* Soft Paper Texture Background */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />

            {/* Graph Paper Grid */}
            <div
                className="absolute inset-0 z-0 opacity-10"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #aaa 1px, transparent 1px),
                        linear-gradient(to bottom, #aaa 1px, transparent 1px)
                    `,
                    backgroundSize: '24px 24px'
                }}
            />

            <SectionWrapper id="tech-stack" className="relative z-10 px-4">
                <div className="max-w-6xl mx-auto">

                    {/* Premium Header */}
                    <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-6 border-b-2 border-slate-100 pb-4">
                        <div className="flex flex-col items-center md:items-start">
                            <motion.h2
                                initial={{ opacity: 0, y: -10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="text-6xl md:text-7xl font-bold tracking-tight text-slate-900"
                            >
                                <span className="relative inline-block rotate-[-1deg] text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600">
                                    My Tech
                                    <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-green-400/40 to-transparent rounded-full" />
                                </span>
                                <span className="relative inline-block ml-3 rotate-[1deg] text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-900">
                                    Stack
                                    <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-purple-400/40 to-transparent rounded-full" />
                                </span>
                            </motion.h2>
                            <p className="text-2xl md:text-3xl mt-2 opacity-40 italic font-medium">{"// precision & creativity intertwined"}</p>
                        </div>

                        <div className="hidden lg:flex items-center gap-6">
                            <motion.div
                                animate={{ rotate: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 4 }}
                                className="border-2 border-dashed border-red-200 p-4 rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl shadow-red-500/5 rotate-[-2deg]"
                            >
                                <p className="text-xl font-bold text-red-500 flex items-center gap-2">
                                    AI Inside <span className="text-2xl">🤖</span>
                                </p>
                            </motion.div>
                            <FaCoffee className="text-4xl text-slate-200 animate-pulse" />
                        </div>
                    </div>

                    {/* Horizontal Scattered Layout with Premium Icons */}
                    <div className="flex flex-wrap justify-center gap-x-14 gap-y-12 py-4 relative">
                        {tools.map((tool, idx) => (
                            <motion.div
                                key={tool.name}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20,
                                    delay: idx * 0.04
                                }}
                                whileHover={{ scale: 1.1, y: -5 }}
                                className="relative flex flex-col items-center group cursor-pointer"
                                style={{
                                    rotate: tool.rotate,
                                    transform: `translateY(${tool.yOffset})`
                                }}
                            >
                                <div className="relative">
                                    {/* Icon Container with Glassmorphism & High-End Shadows */}
                                    <div className="relative z-20 w-20 h-20 md:w-24 md:h-24 bg-white/90 backdrop-blur-md rounded-[2rem] flex items-center justify-center text-4xl md:text-5xl 
                                                    border border-white/40 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)] 
                                                    group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.25)] 
                                                    transition-all duration-300">
                                        <div className="relative z-10 drop-shadow-sm group-hover:drop-shadow-md transition-all">
                                            {tool.icon}
                                        </div>

                                        {/* Subtle Inner Glow */}
                                        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />

                                        {/* Clean Die-Cut Label */}
                                        <div className="absolute -bottom-1 -right-1 bg-slate-900 text-white text-[11px] font-black px-2 py-0.5 rounded-lg uppercase tracking-wider shadow-lg transform rotate-3">
                                            {tool.name}
                                        </div>
                                    </div>

                                    {/* Decorative Sketch Elements for that Premium Doodle feel */}
                                    {idx % 4 === 0 && (
                                        <SquigglyArrow className="absolute -left-14 -top-6 w-14 h-10 opacity-10 rotate-12 transition-opacity group-hover:opacity-30" />
                                    )}
                                </div>

                                {/* Refined Handwritten Desc */}
                                <div className="mt-5 text-center">
                                    <Highlighter color={tool.color} className="text-xl md:text-2xl font-bold tracking-tight text-slate-800 transition-colors group-hover:text-black">
                                        {tool.desc}
                                    </Highlighter>
                                </div>
                            </motion.div>
                        ))}

                        {/* Premium AI Status Bubble */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="flex items-center gap-5 border border-slate-200/50 px-8 py-5 rounded-full bg-white/40 backdrop-blur-xl shadow-2xl shadow-slate-200/20 self-center mt-6 transition-all hover:bg-white/60"
                        >
                            <div className="flex gap-4">
                                <SiAnthropic className="text-3xl text-[#D97757] hover:scale-110 transition-transform" />
                                <FaRobot className="text-3xl text-purple-500 hover:scale-110 transition-transform" />
                                <SiOpenai className="text-3xl text-black hover:scale-110 transition-transform" />
                            </div>
                            <div className="flex flex-col border-l border-slate-200 pl-5">
                                <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">active</span>
                                <span className="text-lg font-bold text-slate-800 leading-none">AI Agents</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Premium Metadata Footer */}
                    <div className="mt-8 pt-4 border-t border-slate-100 flex justify-between items-center opacity-20 text-base md:text-lg font-medium italic">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span>[ sync.complete // scattered_v3 ]</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span>p.02 / universe</span>
                            <div className="flex h-1 w-20 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full w-2/3 bg-slate-300 rounded-full" />
                            </div>
                        </div>
                    </div>

                </div>
            </SectionWrapper>
        </div>
    );
}

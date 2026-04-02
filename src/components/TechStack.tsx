"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import {
    SiReact, SiJavascript, SiTypescript, SiTailwindcss,
    SiNodedotjs, SiNextdotjs, SiPostgresql, SiMongodb,
    SiOpenai, SiDocker, SiGithubactions,
    SiPython, SiMeta,
    SiHtml5, SiCss, SiRedux, SiExpress, SiGraphql, SiMysql, SiFirebase, SiVercel, SiGithub, SiFigma, SiPostman, SiJira
} from "react-icons/si";
import { HiCode } from "react-icons/hi";
import { FaRobot, FaAws } from "react-icons/fa";

const crosswordWords = [
    // Frontend (Horizontal emphasis)
    { r: 2, c: 1, dir: "h", word: "JAVASCRIPT", num: 1, color: "#F7DF1E", category: "frontend", icon: <SiJavascript /> },
    { r: 0, c: 6, dir: "v", word: "TYPESCRIPT", num: 2, color: "#3178C6", category: "frontend", icon: <SiTypescript /> },
    { r: 2, c: 12, dir: "h", word: "REACT", num: 3, color: "#61DAFB", category: "frontend", icon: <SiReact /> },
    { r: 4, c: 9, dir: "h", word: "NEXTJS", num: 4, color: "#FFFFFF", category: "frontend", icon: <SiNextdotjs /> },
    { r: 0, c: 19, dir: "v", word: "HTML5", num: 5, color: "#E34F26", category: "frontend", icon: <SiHtml5 /> },
    { r: 2, c: 17, dir: "v", word: "CSS3", num: 6, color: "#1572B6", category: "frontend", icon: <SiCss /> },
    { r: 6, c: 5, dir: "h", word: "TAILWIND", num: 7, color: "#06B6D4", category: "frontend", icon: <SiTailwindcss /> },
    { r: 4, c: 3, dir: "v", word: "REDUX", num: 8, color: "#764ABC", category: "frontend", icon: <SiRedux /> },

    // Backend
    { r: 8, c: 1, dir: "h", word: "NODEJS", num: 9, color: "#339933", category: "backend", icon: <SiNodedotjs /> },
    { r: 6, c: 4, dir: "v", word: "EXPRESS", num: 10, color: "#FFFFFF", category: "backend", icon: <SiExpress /> },
    { r: 10, c: 3, dir: "h", word: "RESTAPIS", num: 11, color: "#008080", category: "backend", icon: <HiCode /> },
    { r: 9, c: 12, dir: "v", word: "GRAPHQL", num: 12, color: "#E10098", category: "backend", icon: <SiGraphql /> },

    // Databases
    { r: 12, c: 0, dir: "h", word: "MONGODB", num: 13, color: "#47A248", category: "db", icon: <SiMongodb /> },
    { r: 8, c: 15, dir: "v", word: "POSTGRESQL", num: 14, color: "#4169E1", category: "db", icon: <SiPostgresql /> },
    { r: 12, c: 10, dir: "h", word: "MYSQL", num: 15, color: "#4479A1", category: "db", icon: <SiMysql /> },
    { r: 7, c: 22, dir: "v", word: "FIREBASE", num: 16, color: "#FFCA28", category: "db", icon: <SiFirebase /> },

    // Cloud / DevOps
    { r: 0, c: 25, dir: "h", word: "AWS", num: 17, color: "#FF9900", category: "cloud", icon: <FaAws /> },
    { r: 12, c: 24, dir: "h", word: "VERCEL", num: 18, color: "#FFFFFF", category: "cloud", icon: <SiVercel /> },
    { r: 10, c: 20, dir: "h", word: "DOCKER", num: 19, color: "#2496ED", category: "cloud", icon: <SiDocker /> },
    { r: 2, c: 28, dir: "v", word: "GITHUBACTIONS", num: 20, color: "#2088FF", category: "cloud", icon: <SiGithubactions /> },
    { r: 4, c: 31, dir: "v", word: "CICD", num: 21, color: "#FFFFFF", category: "cloud", icon: <HiCode /> },

    // AI
    { r: 5, c: 25, dir: "v", word: "OPENAI", num: 22, color: "#412991", category: "ai", icon: <SiOpenai /> },
    { r: 4, c: 23, dir: "h", word: "LLM", num: 23, color: "#8E75C2", category: "ai", icon: <FaRobot /> },
    { r: 7, c: 26, dir: "h", word: "RAG", num: 24, color: "#3B82F6", category: "ai", icon: <SiMeta /> },
    { r: 8, c: 30, dir: "v", word: "PROMPT", num: 25, color: "#D4AF37", category: "ai", icon: <FaRobot /> },
    { r: 0, c: 14, dir: "v", word: "PYTHON", num: 26, color: "#3776AB", category: "ai", icon: <SiPython /> },

    // Tools
    { r: 1, c: 11, dir: "h", word: "GITHUB", num: 27, color: "#FFFFFF", category: "tools", icon: <SiGithub /> },
    { r: 9, c: 7, dir: "v", word: "FIGMA", num: 28, color: "#F24E1E", category: "tools", icon: <SiFigma /> },
    { r: 0, c: 0, dir: "v", word: "POSTMAN", num: 29, color: "#FF6C37", category: "tools", icon: <SiPostman /> },
    { r: 10, c: 14, dir: "h", word: "JIRA", num: 30, color: "#0052CC", category: "tools", icon: <SiJira /> },
];

export default function TechStack() {
    const [hoveredWord, setHoveredWord] = useState<number | null>(null);

    const ROWS = 16;
    const COLS = 32;

    const grid: ({ char: string, num?: number, color: string, icon?: React.ReactNode, category?: string } | null)[][] =
        Array.from({ length: ROWS }, () => Array(COLS).fill(null));

    crosswordWords.forEach(({ r, c, dir, word, num, color, icon, category }) => {
        for (let i = 0; i < word.length; i++) {
            const currR = dir === "v" ? r + i : r;
            const currC = dir === "h" ? c + i : c;
            if (currR < ROWS && currC < COLS) {
                const existing = grid[currR][currC];
                grid[currR][currC] = {
                    char: word[i],
                    num: (i === 0 || existing?.num) ? (existing?.num || num) : undefined,
                    color: color,
                    icon: (i === 0 || existing?.icon) ? (existing?.icon || icon) : undefined,
                    category: category
                };
            }
        }
    });

    const getGlowColor = (num: number | undefined) => {
        if (!num) return "rgba(255,255,255,0.1)";
        const word = crosswordWords.find(w => w.num === num);
        return word ? word.color : "rgba(255,255,255,0.1)";
    };

    return (
        <div id="tech-stack" className="w-full bg-[#0B0B0C] font-sans text-white py-24 md:py-32 relative overflow-hidden selection:bg-white/20 selection:text-white">
            {/* VIBRANT Aesthetic Radiance background (Enhanced Northern Lights) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] pointer-events-none opacity-30">
                <div className="absolute top-1/8 left-1/4 w-[600px] h-[600px] bg-blue-600/20 blur-[130px] rounded-full animate-pulse" />
                <div className="absolute bottom-1/8 right-1/4 w-[700px] h-[700px] bg-purple-600/20 blur-[160px] rounded-full animate-pulse [animation-delay:2s]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-teal-500/15 blur-[220px] rounded-full" />
                <div className="absolute top-1/3 right-1/3 w-[400px] h-[400px] bg-orange-500/10 blur-[100px] rounded-full animate-pulse [animation-delay:1.5s]" />
            </div>

            <SectionWrapper id="tech-stack-inner" className="max-w-[1400px] px-8 md:px-20 mx-auto relative z-10 flex flex-col items-center">

                {/* Header - Minimalist & Premium */}
                <div className="mb-24 w-full text-center">
                    <div className="inline-block group">
                        <div className="text-[10px] font-black uppercase tracking-[0.8em] text-white/30 mb-4 flex items-center justify-center gap-4 group-hover:text-white/50 transition-colors">
                            <span className="w-12 h-[1px] bg-white/10 group-hover:bg-blue-500/30 transition-all" />
                            Aesthetic Archive // v2.6
                            <span className="w-12 h-[1px] bg-white/10 group-hover:bg-purple-500/30 transition-all" />
                        </div>
                        <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none [font-family:Impact,sans-serif]" style={{ transform: "scaleY(1.1)" }}>
                            TECH <span className="text-white/20 animate-pulse">#STACK</span>
                        </h2>
                    </div>
                </div>

                {/* The Horizontally Aligned VIBRANT Grid */}
                <div className="relative w-full flex justify-center mb-24 transition-all duration-700">
                    <div
                        className="grid border border-white/5 bg-[#121214]/90 backdrop-blur-md rounded-2xl p-4 md:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.05)]"
                        style={{
                            gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
                            width: '100%',
                            maxWidth: '1250px',
                            aspectRatio: `${COLS} / ${ROWS}`
                        }}
                    >
                        {grid.map((row, rIdx) => (
                            row.map((cell, cIdx) => {
                                const isCurrentHovered = hoveredWord && crosswordWords.find(w => w.num === hoveredWord)?.word.split('').some((_, i) => {
                                    const w = crosswordWords.find(w => w.num === hoveredWord);
                                    if (!w) return false;
                                    const curR = w.dir === "v" ? w.r + i : w.r;
                                    const curC = w.dir === "h" ? w.c + i : w.c;
                                    return curR === rIdx && curC === cIdx;
                                });

                                return (
                                    <div
                                        key={`${rIdx}-${cIdx}`}
                                        className={`relative border-[0.5px] border-white/[0.04] flex items-center justify-center transition-all duration-500 rounded-[5px] md:rounded-[8px]
                                                   ${cell ? 'group/cell bg-white/[0.04] shadow-[0_1px_0_rgba(255,255,255,0.05)]' : 'bg-transparent'}
                                                   ${isCurrentHovered ? 'z-30 scale-[1.12] md:scale-[1.15] bg-white/[0.15] ring-2 ring-white/20' : ''}`}
                                        style={isCurrentHovered ? { 
                                            boxShadow: `0 0 40px ${getGlowColor(hoveredWord)}40, inset 0 1px 2px rgba(255,255,255,0.2)`,
                                            backgroundColor: `${getGlowColor(hoveredWord)}15`
                                        } : cell ? {
                                            backgroundColor: `${cell.color}08`,
                                            borderColor: `${cell.color}15`
                                        } : {}}
                                    >
                                        {cell ? (
                                            <>
                                                <span
                                                    className="text-[2.2vw] md:text-[14px] font-bold tracking-tighter select-none transition-all duration-300"
                                                    style={{ 
                                                        color: isCurrentHovered ? '#FFFFFF' : cell.color, 
                                                        fontSize: 'clamp(7px, 1.2vw, 16px)',
                                                        textShadow: `0 0 8px ${cell.color}40`
                                                    }}
                                                >
                                                    {cell.char}
                                                </span>
                                                {cell.num && (
                                                    <span className="absolute top-0.5 right-0.5 md:right-1.5 text-[0.9vw] md:text-[7px] font-black leading-none text-white/20" style={{ fontSize: 'clamp(3px, 0.5vw, 8px)' }}>
                                                        {cell.num}
                                                    </span>
                                                )}
                                            </>
                                        ) : null}
                                    </div>
                                );
                            })
                        ))}
                    </div>
                </div>

                {/* Aesthetic VIBRANT Icon Vault */}
                <div className="w-full">
                    <div className="text-[10px] font-black uppercase tracking-[0.5em] mb-16 text-white/20 text-center flex items-center justify-center gap-8">
                        <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-white/10" />
                        Aesthetic Technical Recognition Vault
                        <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-white/10" />
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 md:gap-10">
                        {crosswordWords.map((word, idx) => (
                            <motion.div
                                key={`vault-${idx}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: idx * 0.015 }}
                                viewport={{ once: true }}
                                className="group relative"
                                onMouseEnter={() => setHoveredWord(word.num)}
                                onMouseLeave={() => setHoveredWord(null)}
                            >
                                <div 
                                    className="p-4 md:p-7 bg-[#161618]/70 backdrop-blur-xl border border-white/5 rounded-[22px] transition-all duration-500 group-hover:-translate-y-3 group-hover:border-white/30 shadow-[0_15px_35px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.05)] group-hover:shadow-[0_25px_60px_rgba(0,0,0,0.7),0_0_40px_rgba(255,255,255,0.05)] cursor-pointer overflow-hidden relative"
                                >
                                    {/* Subtle background colored glow on hover */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ backgroundColor: word.color }} />
                                    
                                    <div className="text-3xl md:text-5xl text-white/30 transition-all duration-300 group-hover:scale-110 relative z-10" style={{ color: hoveredWord === word.num ? word.color : undefined }}>
                                      <span className={hoveredWord === word.num ? 'drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]' : ''}>{word.icon}</span>
                                    </div>
                                </div>
                                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform group-hover:-translate-y-2">
                                    <span className="text-[9px] font-black uppercase tracking-[0.3em] transition-colors" style={{ color: word.color }}>
                                      {word.word}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </SectionWrapper>
        </div>
    );
}

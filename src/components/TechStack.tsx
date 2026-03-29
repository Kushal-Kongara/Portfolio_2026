"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import {
    SiReact, SiJavascript, SiTypescript, SiTailwindcss,
    SiNodedotjs, SiNextdotjs, SiPostgresql, SiMongodb,
    SiAnthropic, SiOpenai, SiDocker, SiGithubactions,
    SiPython, SiCplusplus, SiRedis, SiGooglecloud, SiMeta,
    SiHtml5, SiCss, SiRedux, SiExpress, SiGraphql, SiMysql, SiFirebase, SiVercel, SiGithub, SiFigma, SiPostman, SiJira
} from "react-icons/si";
import { HiCode } from "react-icons/hi";
import { FaRobot, FaCoffee, FaAws, FaDatabase } from "react-icons/fa";

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
    const [hoveredWord, setHoveredWord] = useState<number | null>(null);

    // Definining the crossword grid data with colors
    const crosswordWords = [
        // Frontend
        { r: 2, c: 1, dir: "h", word: "JAVASCRIPT", num: 1, color: "#F7DF1E", icon: <SiJavascript /> },
        { r: 0, c: 6, dir: "v", word: "TYPESCRIPT", num: 2, color: "#3178C6", icon: <SiTypescript /> },
        { r: 4, c: 4, dir: "h", word: "REACT", num: 3, color: "#61DAFB", icon: <SiReact /> },
        { r: 0, c: 10, dir: "v", word: "NEXTJS", num: 4, color: "#000000", icon: <SiNextdotjs /> },
        { r: 7, c: 10, dir: "h", word: "HTML5", num: 5, color: "#E34F26", icon: <SiHtml5 /> },
        { r: 6, c: 13, dir: "v", word: "CSS3", num: 6, color: "#1572B6", icon: <SiCss /> },
        { r: 9, c: 3, dir: "h", word: "TAILWIND", num: 7, color: "#06B6D4", icon: <SiTailwindcss /> },
        { r: 8, c: 1, dir: "v", word: "REDUX", num: 8, color: "#764ABC", icon: <SiRedux /> },

        // Backend
        { r: 12, c: 1, dir: "h", word: "NODEJS", num: 9, color: "#339933", icon: <SiNodedotjs /> },
        { r: 11, c: 4, dir: "v", word: "EXPRESS", num: 10, color: "#444444", icon: <SiExpress /> },
        { r: 15, c: 4, dir: "h", word: "RESTAPIS", num: 11, color: "#008080", icon: <HiCode /> },
        { r: 14, c: 10, dir: "v", word: "GRAPHQL", num: 12, color: "#E10098", icon: <SiGraphql /> },

        // Databases
        { r: 18, c: 0, dir: "h", word: "MONGODB", num: 13, color: "#47A248", icon: <SiMongodb /> },
        { r: 17, c: 5, dir: "v", word: "POSTGRESQL", num: 14, color: "#4169E1", icon: <SiPostgresql /> },
        { r: 21, c: 2, dir: "h", word: "MYSQL", num: 15, color: "#4479A1", icon: <SiMysql /> },
        { r: 19, c: 12, dir: "v", word: "FIREBASE", num: 16, color: "#FFCA28", icon: <SiFirebase /> },

        // Cloud / DevOps
        { r: 0, c: 15, dir: "h", word: "AWS", num: 17, color: "#FF9900", icon: <FaAws /> },
        { r: 24, c: 1, dir: "h", word: "VERCEL", num: 18, color: "#000000", icon: <SiVercel /> },
        { r: 23, c: 10, dir: "h", word: "DOCKER", num: 19, color: "#2496ED", icon: <SiDocker /> },
        { r: 4, c: 17, dir: "v", word: "GITHUBACTIONS", num: 20, color: "#2088FF", icon: <SiGithubactions /> },
        { r: 18, c: 16, dir: "v", word: "CICD", num: 21, color: "#6D6E71", icon: <HiCode /> },

        // AI
        { r: 10, c: 15, dir: "v", word: "OPENAI", num: 22, color: "#412991", icon: <SiOpenai /> },
        { r: 12, c: 14, dir: "h", word: "LLM", num: 23, color: "#8E75C2", icon: <FaRobot /> },
        { r: 15, c: 13, dir: "h", word: "RAG", num: 24, color: "#3B82F6", icon: <SiMeta /> },
        { r: 7, c: 0, dir: "v", word: "PROMPT", num: 25, color: "#D4AF37", icon: <FaRobot /> },
        { r: 1, c: 18, dir: "v", word: "PYTHON", num: 26, color: "#3776AB", icon: <SiPython /> },

        // Tools
        { r: 3, c: 12, dir: "h", word: "GITHUB", num: 27, color: "#181717", icon: <SiGithub /> },
        { r: 13, c: 7, dir: "v", word: "FIGMA", num: 28, color: "#F24E1E", icon: <SiFigma /> },
        { r: 19, c: 2, dir: "v", word: "POSTMAN", num: 29, color: "#FF6C37", icon: <SiPostman /> },
        { r: 21, c: 8, dir: "h", word: "JIRA", num: 30, color: "#0052CC", icon: <SiJira /> },
    ];

    const ROWS = 26;
    const COLS = 20;

    // Create the grid
    const grid: ({ char: string, num?: number, color: string, icon?: React.ReactNode } | null)[][] =
        Array.from({ length: ROWS }, () => Array(COLS).fill(null));

    crosswordWords.forEach(({ r, c, dir, word, num, color, icon }) => {
        for (let i = 0; i < word.length; i++) {
            const currR = dir === "v" ? r + i : r;
            const currC = dir === "h" ? c + i : c;

            if (currR < ROWS && currC < COLS) {
                const existing = grid[currR][currC];
                grid[currR][currC] = {
                    char: word[i],
                    num: (i === 0 || existing?.num) ? (existing?.num || num) : undefined,
                    color: color, // Words take precedence or can blend, here we just set
                    icon: (i === 0 || existing?.icon) ? (existing?.icon || icon) : undefined
                };
            }
        }
    });

    const scatteredIcons = [
        { r: 0, c: 0, icon: <SiJavascript /> },
        { r: 5, c: 2, icon: <SiTypescript /> },
        { r: 2, c: 14, icon: <SiReact /> },
        { r: 11, c: 0, icon: <SiNodedotjs /> },
        { r: 15, c: 10, icon: <SiOpenai /> },
        { r: 20, c: 15, icon: <FaAws /> },
        { r: 25, c: 8, icon: <SiFigma /> },
        { r: 1, c: 16, icon: <SiVercel /> },
        { r: 22, c: 0, icon: <SiDocker /> },
    ];

    return (
        <div className="w-full bg-[#FAFAF5] font-mono text-black py-12 md:py-16 border-y-4 border-black selection:bg-black selection:text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />

            <SectionWrapper id="tech-stack" className="max-w-5xl mx-auto px-4 relative z-10">

                {/* Header */}
                <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-8 border-b-4 border-black pb-6">
                    <div className="flex flex-col gap-2">
                        <div className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30">Technical Archive // 2026</div>
                        <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                            TECH <span className="text-[#a0a0a0]">#STACK</span>
                        </h2>
                    </div>
                    <div className="text-right max-w-xs text-[9px] font-bold leading-relaxed opacity-40 uppercase tracking-[0.15em]">
                        Exact Implementation Ledger <br />
                        Categorical Core Competencies <br />
                        Kushal Kongara // Engineering
                    </div>
                </div>

                {/* Grid & Side Clues Container */}
                <div className="flex flex-col lg:flex-row items-stretch justify-center gap-12 xl:gap-20">

                    {/* Left Clues (1-15) */}
                    <div className="flex flex-col gap-4 w-full lg:w-56 xl:w-72 pt-4">
                        <div className="text-[11px] font-black uppercase tracking-[0.3em] mb-4 border-b-2 border-black pb-2 opacity-30">Clues // H-V 01-15</div>
                        <div className="flex flex-col gap-5">
                            {crosswordWords.slice(0, 15).map((word) => (
                                <motion.div
                                    key={word.num}
                                    onMouseEnter={() => setHoveredWord(word.num)}
                                    onMouseLeave={() => setHoveredWord(null)}
                                    whileHover={{ x: 5 }}
                                    className={`flex items-center gap-4 group cursor-help border-b border-black/5 pb-1 transition-all ${hoveredWord && hoveredWord !== word.num ? 'opacity-20 blur-[0.5px]' : 'opacity-100'}`}
                                >
                                    <div className="bg-black text-white text-[10px] font-black px-2 py-1 min-w-[28px] text-center shrink-0">
                                        {word.num}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[11px] font-black uppercase tracking-tighter group-hover:underline leading-none">
                                            {word.word}
                                        </span>
                                        <div className="flex items-center gap-2 mt-2">
                                            <div className="text-2xl transition-transform duration-300 group-hover:translate-x-1" style={{ color: word.color }}>
                                                {word.icon}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* The Grid (Center) */}
                    <div className="relative flex justify-center flex-1 w-full lg:min-w-[600px] xl:min-w-[800px]">
                        <div
                            className="grid border-[3px] border-black bg-black shadow-[30px_30px_0px_rgba(0,0,0,0.06)] h-fit"
                            style={{
                                gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
                                width: '100%',
                                aspectRatio: `${COLS} / ${ROWS}`
                            }}
                        >
                            {grid.map((row, rIdx) => (
                                row.map((cell, cIdx) => {
                                    const scattered = scatteredIcons.find(si => si.r === rIdx && si.c === cIdx);
                                    return (
                                        <div
                                            key={`${rIdx}-${cIdx}`}
                                            className={`relative border-[1px] border-black flex items-center justify-center transition-all duration-300 group
                                                       ${cell ? 'bg-white' : 'bg-black'}
                                                       ${(hoveredWord && crosswordWords.find(w => w.num === hoveredWord)?.word.split('').some((_, i) => {
                                                            const w = crosswordWords.find(w => w.num === hoveredWord);
                                                            if (!w) return false;
                                                            const curR = w.dir === "v" ? w.r + i : w.r;
                                                            const curC = w.dir === "h" ? w.c + i : w.c;
                                                            return curR === rIdx && curC === cIdx;
                                                        })) ? 'z-30 scale-105 bg-black' : ''}`}
                                        >
                                            {cell ? (
                                                <>
                                                    <span
                                                        className="text-xs sm:text-xl md:text-2xl font-black uppercase select-none tracking-tighter group-hover:text-white"
                                                        style={{ color: cell.color }}
                                                    >
                                                        {cell.char}
                                                    </span>
                                                    {cell.num && (
                                                        <span className="absolute top-0.5 left-0.5 text-[6px] md:text-[8px] font-black leading-none group-hover:text-white/30">
                                                            {cell.num}
                                                        </span>
                                                    )}
                                                </>
                                            ) : scattered ? (
                                                <div className="text-xl md:text-3xl opacity-10 group-hover:opacity-100 group-hover:scale-125 transition-all text-white">
                                                    {scattered.icon}
                                                </div>
                                            ) : null}
                                        </div>
                                    );
                                })
                            ))}
                        </div>
                    </div>

                    {/* Right Clues (16-30) */}
                    <div className="flex flex-col gap-4 w-full lg:w-56 xl:w-72 pt-4">
                        <div className="text-[11px] font-black uppercase tracking-[0.3em] mb-4 border-b-2 border-black pb-2 opacity-30 text-right">Data // H-V 16-30</div>
                        <div className="flex flex-col gap-5">
                            {crosswordWords.slice(15).map((word) => (
                                <motion.div
                                    key={word.num}
                                    onMouseEnter={() => setHoveredWord(word.num)}
                                    onMouseLeave={() => setHoveredWord(null)}
                                    whileHover={{ x: -5 }}
                                    className={`flex items-center gap-4 group cursor-help justify-end text-right border-b border-black/5 pb-1 transition-all ${hoveredWord && hoveredWord !== word.num ? 'opacity-20 blur-[0.5px]' : 'opacity-100'}`}
                                >
                                    <div className="flex flex-col items-end order-1">
                                        <span className="text-[11px] font-black uppercase tracking-tighter group-hover:underline leading-none">
                                            {word.word}
                                        </span>
                                        <div className="flex items-center gap-2 mt-2 justify-end">
                                            <div className="text-2xl transition-transform duration-300 group-hover:-translate-x-1" style={{ color: word.color }}>
                                                {word.icon}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-black text-white text-[10px] font-black px-2 py-1 min-w-[28px] text-center shrink-0 order-2">
                                        {word.num}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Label label (Absolute positioned) */}
                <div className="absolute left-8 top-[40%] h-fit hidden 2xl:flex flex-col justify-center pointer-events-none opacity-5">
                    <div className="rotate-[-90deg] font-black text-[80px] leading-none uppercase tracking-[0.5em] whitespace-nowrap">
                        INVENTORY v.26
                    </div>
                </div>

            </SectionWrapper>
        </div>
    );
}

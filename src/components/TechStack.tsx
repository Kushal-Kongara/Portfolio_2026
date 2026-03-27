"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import {
    SiReact, SiJavascript, SiTypescript, SiTailwindcss,
    SiNodedotjs, SiNextdotjs, SiPostgresql, SiMongodb,
    SiAnthropic, SiOpenai, SiDocker, SiGithubactions,
    SiPython, SiCplusplus, SiRedis, SiGooglecloud, SiMeta
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
    // Definining the crossword grid data
    // Format: [row, col, direction, word, clueNumber, icon]
    const crosswordWords = [
        { r: 2, c: 2, dir: "h", word: "TYPESCRIPT", num: 1, icon: <SiTypescript /> },
        { r: 2, c: 11, dir: "v", word: "TAILWIND", num: 2, icon: <SiTailwindcss /> },
        { r: 4, c: 5, dir: "h", word: "NODEJS", num: 3, icon: <SiNodedotjs /> },
        { r: 0, c: 6, dir: "v", word: "NEXTJS", num: 4, icon: <SiNextdotjs /> },
        { r: 7, c: 1, dir: "h", word: "JAVASCRIPT", num: 5, icon: <SiJavascript /> },
        { r: 6, c: 4, dir: "v", word: "REACT", num: 6, icon: <SiReact /> },
        { r: 10, c: 4, dir: "h", word: "DOCKER", num: 7, icon: <SiDocker /> },
        { r: 9, c: 7, dir: "v", word: "PYTHON", num: 8, icon: <SiPython /> },
        { r: 12, c: 1, dir: "h", word: "POSTGRESQL", num: 9, icon: <SiPostgresql /> },
        { r: 11, c: 10, dir: "v", word: "AWS", num: 10, icon: <FaAws /> },
        { r: 14, c: 7, dir: "h", word: "REDIS", num: 11, icon: <SiRedis /> },
        { r: 13, c: 13, dir: "v", word: "MONGODB", num: 12, icon: <SiMongodb /> },
        { r: 3, c: 14, dir: "v", word: "GPT4O", num: 13, icon: <SiOpenai /> },
        { r: 16, c: 2, dir: "h", word: "CLAUDE", num: 14, icon: <SiAnthropic /> },
        { r: 17, c: 10, dir: "h", word: "LLAMA", num: 15, icon: <SiMeta /> },
    ];

    const ROWS = 20;
    const COLS = 16;

    // Create the empty grid
    const grid: ({ char: string, num?: number, icon?: React.ReactNode } | null)[][] = 
        Array.from({ length: ROWS }, () => Array(COLS).fill(null));

    // Fill the grid
    crosswordWords.forEach(({ r, c, dir, word, num, icon }) => {
        for (let i = 0; i < word.length; i++) {
            const currR = dir === "v" ? r + i : r;
            const currC = dir === "h" ? c + i : c;
            
            if (currR < ROWS && currC < COLS) {
                const existing = grid[currR][currC];
                grid[currR][currC] = {
                    char: word[i],
                    num: i === 0 ? num : (existing?.num || undefined),
                    icon: i === 0 ? icon : (existing?.icon || undefined)
                };
            }
        }
    });

    // Scattered icons to place in empty spots
    const scatteredIcons = [
        { r: 0, c: 0, icon: <SiTypescript className="text-blue-600" /> },
        { r: 4, c: 1, icon: <SiReact className="text-cyan-400" /> },
        { r: 1, c: 14, icon: <SiNextdotjs className="text-white" /> },
        { r: 8, c: 13, icon: <SiNodedotjs className="text-green-500" /> },
        { r: 11, c: 2, icon: <SiTailwindcss className="text-cyan-500" /> },
        { r: 5, c: 8, icon: <SiPostgresql className="text-blue-400" /> },
        { r: 15, c: 15, icon: <FaAws className="text-orange-400" /> },
        { r: 9, c: 1, icon: <SiDocker className="text-blue-500" /> },
        { r: 18, c: 6, icon: <SiPython className="text-yellow-400" /> },
        { r: 19, c: 14, icon: <SiRedis className="text-red-500" /> },
        { r: 0, c: 10, icon: <SiOpenai className="text-white" /> },
        { r: 15, c: 0, icon: <SiAnthropic className="text-orange-200" /> },
    ];

    return (
        <div className="w-full bg-[#FAFAF5] font-mono text-black py-24 border-y-4 border-black selection:bg-black selection:text-white relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />

            <SectionWrapper id="tech-stack" className="max-w-7xl mx-auto px-4 relative z-10">
                
                {/* Crossword Header */}
                <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-8">
                    <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 opacity-30">Inventory // Archive 2026</div>
                        <h2 className="text-7xl md:text-8xl font-black uppercase tracking-tighter leading-none">
                            MY TECH <span className="inline-block px-4 bg-black text-white ml-2">STACK</span>
                        </h2>
                        <div className="mt-4 h-1 w-24 bg-black" />
                    </div>
                    <div className="text-right max-w-xs text-[9px] font-bold leading-relaxed opacity-40 uppercase tracking-[0.2em]">
                        A concrete visualization of <br />
                        Engineering Capabilities & Tools <br />
                        Compiled by Kushal Kongara
                    </div>
                </div>

                {/* The Crossword Grid */}
                <div className="relative flex justify-center">
                    <div 
                        className="grid border-[3px] border-black bg-black shadow-[20px_20px_0px_rgba(0,0,0,0.05)]"
                        style={{ 
                            gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
                            width: '100%',
                            maxWidth: '960px',
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
                                                   ${cell ? 'bg-white text-black hover:bg-black hover:text-white cursor-help' : 'bg-black'}`}
                                    >
                                        {cell ? (
                                            <>
                                                {/* Letter */}
                                                <span className="text-xl md:text-3xl font-black uppercase select-none tracking-tighter">
                                                    {cell.char}
                                                </span>

                                                {/* Clue Number */}
                                                {cell.num && (
                                                    <span className="absolute top-1 left-1 text-[8px] md:text-[10px] font-black leading-none group-hover:text-white/40 transition-colors">
                                                        {cell.num}
                                                    </span>
                                                )}
                                            </>
                                        ) : scattered ? (
                                            /* Scattered Icon in empty space */
                                            <div className="text-xl md:text-3xl opacity-20 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500">
                                                {scattered.icon}
                                            </div>
                                        ) : null}
                                    </div>
                                );
                            })
                        ))}
                    </div>

                    {/* Left vertical label */}
                    <div className="absolute -left-12 top-0 h-full hidden xl:flex flex-col justify-center gap-20 pointer-events-none">
                        <div className="rotate-[-90deg] font-black text-xs uppercase tracking-[0.5em] whitespace-nowrap opacity-10">
                            TECHNICAL INVENTORY ———— #01
                        </div>
                    </div>
                </div>

                {/* Bottom Clues / Legend */}
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 border-t-2 border-black pt-10">
                    {crosswordWords.map((word) => (
                        <motion.div 
                            key={word.num}
                            whileHover={{ x: 5 }}
                            className="flex flex-col gap-1 cursor-default group"
                        >
                            <div className="flex items-center gap-2">
                                <span className="bg-black text-white text-[10px] font-bold px-1.5 py-0.5 leading-none">
                                    {word.num}
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-tighter group-hover:underline">
                                    {word.word}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-xl opacity-20 group-hover:opacity-100 transition-all">
                                {word.icon}
                                <div className="h-px flex-1 bg-black/10" />
                            </div>
                        </motion.div>
                    ))}
                </div>

            </SectionWrapper>
        </div>
    );
}

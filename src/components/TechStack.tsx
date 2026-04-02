"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const crosswordWords = [
    // Frontend
    { r: 2, c: 1, dir: "h", word: "JAVASCRIPT", num: 1, color: "#F7DF1E", icon: <SiJavascript /> },
    { r: 0, c: 6, dir: "v", word: "TYPESCRIPT", num: 2, color: "#3178C6", icon: <SiTypescript /> },
    { r: 4, c: 4, dir: "h", word: "REACT", num: 3, color: "#61DAFB", icon: <SiReact /> },
    { r: 0, c: 10, dir: "v", word: "NEXTJS", num: 4, color: "#111111", icon: <SiNextdotjs /> },
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

export default function TechStack() {
    const [hoveredWord, setHoveredWord] = useState<number | null>(null);

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
                    color: color,
                    icon: (i === 0 || existing?.icon) ? (existing?.icon || icon) : undefined
                };
            }
        }
    });

    return (
        <div className="w-full bg-[#FAFAF5] font-mono text-black py-16 md:py-24 border-y-4 border-black relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />

            <SectionWrapper id="tech-stack" className="max-w-6xl px-6 md:px-12 mx-auto relative z-10 flex flex-col items-center">

                {/* Header - Centered */}
                <div className="mb-16 w-full text-center border-b-4 border-black pb-8">
                    <div className="text-[10px] font-black uppercase tracking-[0.6em] opacity-30 mb-2">Technical Archive // v2.6</div>
                    <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none [font-family:Impact,sans-serif]" style={{ transform: "scaleY(1.1)" }}>
                        TECH <span className="text-[#a0a0a0]">#STACK</span>
                    </h2>
                </div>

                {/* The Grid (Now centered and major focus) */}
                <div className="relative w-full flex justify-center mb-16">
                    <div
                        className="grid border-[3px] border-black bg-black shadow-[25px_25px_0px_rgba(0,0,0,0.08)] h-fit"
                        style={{
                            gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
                            width: '100%',
                            maxWidth: '750px',
                            aspectRatio: `${COLS} / ${ROWS}`
                        }}
                    >
                        {grid.map((row, rIdx) => (
                            row.map((cell, cIdx) => (
                                <div
                                    key={`${rIdx}-${cIdx}`}
                                    className={`relative border-[0.5px] border-black/20 flex items-center justify-center transition-all duration-300
                                               ${cell ? 'bg-white' : 'bg-black'}
                                               ${(hoveredWord && crosswordWords.find(w => w.num === hoveredWord)?.word.split('').some((_, i) => {
                                                    const w = crosswordWords.find(w => w.num === hoveredWord);
                                                    if (!w) return false;
                                                    const curR = w.dir === "v" ? w.r + i : w.r;
                                                    const curC = w.dir === "h" ? w.c + i : w.c;
                                                    return curR === rIdx && curC === cIdx;
                                                })) ? 'z-30 scale-[1.03] bg-black ring-1 ring-white/50' : ''}`}
                                >
                                    {cell ? (
                                        <>
                                            <span
                                                className="text-[3vw] md:text-[14px] font-black uppercase select-none tracking-tighter"
                                                style={{ color: cell.color, fontSize: 'clamp(8px, 1.2vw, 18px)' }}
                                            >
                                                {cell.char}
                                            </span>
                                            {cell.num && (
                                                <span className="absolute top-0.5 left-0.5 text-[1.5vw] md:text-[8px] font-black leading-none text-black/40" style={{ fontSize: 'clamp(4px, 0.6vw, 9px)' }}>
                                                    {cell.num}
                                                </span>
                                            )}
                                        </>
                                    ) : null}
                                </div>
                            ))
                        ))}
                    </div>
                </div>


                {/* New Icon Vault - Under the clues */}
                <div className="w-full">
                    <div className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 opacity-30 text-center">Brand Recognition // Iconic Showcase</div>
                    <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                        {crosswordWords.map((word, idx) => (
                            <motion.div
                                key={`vault-${idx}`}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.02 }}
                                viewport={{ once: true }}
                                className="group relative"
                                onMouseEnter={() => setHoveredWord(word.num)}
                                onMouseLeave={() => setHoveredWord(null)}
                            >
                                <div 
                                    className="p-3 md:p-5 bg-white border-4 border-black shadow-[8px_8px_0px_#000] rounded-xl transition-all duration-300 group-hover:-translate-y-2 group-hover:-translate-x-1 group-hover:shadow-[14px_14px_0px_#000] cursor-pointer"
                                    style={{ color: word.color }}
                                >
                                    <div className="text-3xl md:text-4xl text-black">
                                      {/* Using a clone to handle color better */}
                                      <span style={{ color: word.color }}>{word.icon}</span>
                                    </div>
                                </div>
                                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[8px] font-black uppercase tracking-widest bg-black text-white px-2 py-0.5 pointer-events-none">
                                    {word.word}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </SectionWrapper>
        </div>
    );
}

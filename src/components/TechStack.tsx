"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import {
    SiReact, SiJavascript, SiTypescript, SiTailwindcss,
    SiNodedotjs, SiNextdotjs, SiPostgresql, SiGraphql, 
    SiMysql, SiDocker, SiRedux, SiGithub, SiPostman, 
    SiKubernetes, SiLangchain
} from "react-icons/si";
import { HiCode } from "react-icons/hi";
import { FaRobot, FaAws } from "react-icons/fa";

const crosswordWords = [
    { r: 2, c: 5, word: "JAVASCRIPT", dir: "h", num: 1, icon: <SiJavascript />, color: "#F7DF1E" },
    { r: 0, c: 9, word: "POSTGRESQL", dir: "v", num: 2, icon: <SiPostgresql />, color: "#4169E1" },
    { r: 9, c: 3, word: "GRAPHQL", dir: "h", num: 3, icon: <SiGraphql />, color: "#E10098" },
    { r: 2, c: 14, word: "TYPESCRIPT", dir: "v", num: 4, icon: <SiTypescript />, color: "#3178C6" },
    { r: 8, c: 14, word: "REACT", dir: "h", num: 5, icon: <SiReact />, color: "#61DAFB" },
    { r: 5, c: 18, word: "NEXT", dir: "v", num: 6, icon: <SiNextdotjs />, color: "#000000" },
    { r: 5, c: 18, word: "TAILWIND", dir: "h", num: 7, icon: <SiTailwindcss />, color: "#06B6D4" },
    { r: 5, c: 25, word: "DOCKER", dir: "v", num: 8, icon: <SiDocker />, color: "#2496ED" },
    { r: 6, c: 24, word: "NODE", dir: "h", num: 9, icon: <SiNodedotjs />, color: "#339933" },
    { r: 5, c: 27, word: "REDUX", dir: "v", num: 10, icon: <SiRedux />, color: "#764ABC" },
    { r: 9, c: 18, word: "KUBERNETES", dir: "h", num: 11, icon: <SiKubernetes />, color: "#326CE5" },
    { r: 0, c: 22, word: "POSTMAN", dir: "v", num: 12, icon: <SiPostman />, color: "#FF6C37" },
    { r: 1, c: 26, word: "AWS", dir: "h", num: 13, icon: <FaAws />, color: "#FF9900" },
    { r: 0, c: 20, word: "MYSQL", dir: "h", num: 14, icon: <SiMysql />, color: "#4479A1" },
    { r: 5, c: 3, word: "RESTAPI", dir: "h", num: 15, icon: <HiCode />, color: "#ff5500" },
    { r: 13, c: 7, word: "LANGRAPH", dir: "h", num: 16, icon: <SiLangchain />, color: "#00A67E" },
    { r: 6, c: 8, word: "RAG", dir: "v", num: 17, icon: <FaRobot />, color: "#7B2FBE" },
    { r: 1, c: 4, word: "GITHUB", dir: "v", num: 18, icon: <SiGithub />, color: "#24292E" },
];

export default function TechStack() {
    const [hoveredWord, setHoveredWord] = useState<number | null>(null);

    const ROWS = 16;
    const COLS = 32;

    const grid: ({ char: string, num?: number, color: string, icon?: React.ReactNode, category?: string } | null)[][] =
        Array.from({ length: ROWS }, () => Array(COLS).fill(null));

    crosswordWords.forEach(({ r, c, dir, word, num, color, icon }) => {
        const capsWord = word.toUpperCase();
        for (let i = 0; i < capsWord.length; i++) {
            const currR = dir === "v" ? r + i : r;
            const currC = dir === "h" ? c + i : c;
            if (currR < ROWS && currC < COLS) {
                const existing = grid[currR][currC];
                grid[currR][currC] = {
                    char: capsWord[i],
                    num: (i === 0 || existing?.num) ? (existing?.num || num) : undefined,
                    color: color,
                    icon: (i === 0 || existing?.icon) ? (existing?.icon || icon) : undefined
                };
            }
        }
    });

    const CrossedCircle = () => (
        <div className="w-2/3 h-2/3 border border-black/20 rounded-full relative flex items-center justify-center opacity-30">
            <div className="absolute w-[1px] h-full bg-black/20 rotate-45" />
            <div className="absolute w-[1px] h-full bg-black/20 -rotate-45" />
        </div>
    );

    return (
        <div id="tech-stack" className="w-full bg-[#EAEAEA] font-mono text-black pb-24 md:pb-32 relative overflow-hidden selection:bg-black selection:text-white">
            {/* Pronounced grain/paper texture */}
            <div className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/concrete-wall-2.png')]" />
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />

            <SectionWrapper id="tech-stack-inner" className="max-w-[1450px] px-4 md:px-12 mx-auto relative z-10 flex flex-col items-center">
                
                {/* PILOT Style Header elements */}
                <div className="hidden md:flex w-full justify-between items-center mb-12 px-10">
                    <div className="text-[14px] font-bold tracking-widest flex items-center gap-4 uppercase">
                        <span className="w-2 h-2 border border-black rounded-full" />
                        Technical Archive
                    </div>
                    <div className="flex items-center gap-12 font-bold tracking-tighter text-sm">
                        <span>#2026.V1</span>
                        <div className="w-10 h-[2px] bg-black" />
                    </div>
                </div>

                {/* Mobile-only heading */}
                <div className="block md:hidden text-center mb-8 px-4">
                  <h2 className="text-4xl font-black uppercase tracking-tighter" style={{ fontFamily: 'Impact, sans-serif' }}>TECH STACK.</h2>
                  <p className="text-xs font-bold tracking-widest text-black/50 mt-2 uppercase">Technical Archive / 2026</p>
                </div>

                <div className="hidden md:flex relative w-full items-start justify-center gap-8 md:gap-16">
                    
                    {/* Vertical Title (simplify style) */}
                    <div className="h-full flex flex-col justify-start pt-12">
                        <div 
                            className="text-[4rem] md:text-[6.5rem] lg:text-[7.5rem] font-bold tracking-tighter leading-none whitespace-nowrap rotate-180 selection:bg-white selection:text-black"
                            style={{ 
                                writingMode: 'vertical-rl',
                                textOrientation: 'mixed',
                                fontFamily: 'Impact, sans-serif'
                            }}
                        >
                            TECH STACK.
                        </div>
                    </div>

                    {/* The Grid */}
                    <div className="flex-1 max-w-[1100px]">
                        <div
                            className="grid border-[2px] border-black bg-black p-[2px] shadow-[15px_15px_0px_rgba(0,0,0,1)]"
                            style={{
                                gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
                                width: '100%',
                                aspectRatio: `${COLS} / ${ROWS}`
                            }}
                        >
                            {grid.map((row, rIdx) => (
                                row.map((cell, cIdx) => {
                                    const isCurrentHovered = hoveredWord && crosswordWords.find(w => w.num === hoveredWord)?.word.toUpperCase().split('').some((_, i) => {
                                        const w = crosswordWords.find(w => w.num === hoveredWord);
                                        if (!w) return false;
                                        const curR = w.dir === "v" ? w.r + i : w.r;
                                        const curC = w.dir === "h" ? w.c + i : w.c;
                                        return curR === rIdx && curC === cIdx;
                                    });

                                    // Add some decorative crossed circles in empty spots
                                    const isDecorative = !cell && (rIdx % 5 === 0 && cIdx % 8 === 0 || (rIdx === 0 && cIdx === 0) || (rIdx === 0 && cIdx === COLS-1));

                                    return (
                                        <div
                                            key={`${rIdx}-${cIdx}`}
                                            className={`relative border-[0.5px] border-black/10 flex items-center justify-center transition-all duration-300
                                                       ${cell ? 'bg-white' : 'bg-black'}
                                                       ${isCurrentHovered ? 'z-30 scale-[1.05] shadow-xl' : ''}`}
                                            onMouseEnter={() => cell?.num && setHoveredWord(cell.num)}
                                            onMouseLeave={() => setHoveredWord(null)}
                                        >
                                            {cell ? (
                                                <>
                                                    <span
                                                        className="text-[1.8vw] md:text-[18px] font-black tracking-tighter select-none"
                                                        style={{ color: '#000000' }}
                                                    >
                                                        {cell.char}
                                                    </span>
                                                    {cell.num && (
                                                        <span className="absolute top-[1px] left-[2px] text-[0.8vw] md:text-[8px] font-black leading-none text-black">
                                                            {cell.num}
                                                        </span>
                                                    )}
                                                    {isCurrentHovered && cell.icon && (
                                                        <div className="absolute inset-0 bg-black/5 flex items-center justify-center pointer-events-none">
                                                            <div className="scale-[1.5] opacity-10 blur-[1px]">
                                                                {cell.icon}
                                                            </div>
                                                        </div>
                                                    )}
                                                </>
                                            ) : isDecorative ? (
                                                <CrossedCircle />
                                            ) : null}
                                        </div>
                                    );
                                })
                            ))}
                        </div>

                        {/* PILOT style footer annotation */}
                        <div className="w-full flex justify-end gap-12 mt-12 font-mono text-[10px] md:text-[12px] opacity-70">
                            <div className="max-w-[200px]">
                                <span className="font-bold block mb-1">PILOT #1</span>
                                An Anthology of Professional Technologies curated for Modern Web Architecture, 2026.
                            </div>
                            <div className="w-24 h-[1px] bg-black self-end" />
                        </div>
                    </div>
                </div>

                {/* Simplified Icon Vault (styled for B&W) */}
                <div className="w-full mt-8 md:mt-32 border-t-2 border-black pt-12 md:pt-16">
                    <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                        {crosswordWords.map((word, idx) => (
                            <motion.div
                                key={`vault-${idx}`}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.3, delay: idx * 0.05 }}
                                viewport={{ once: true }}
                                className="flex flex-col items-center gap-2 group cursor-crosshair"
                                onMouseEnter={() => setHoveredWord(word.num)}
                                onMouseLeave={() => setHoveredWord(null)}
                            >
                                <div
                                    className="p-3 md:p-5 border-2 border-black bg-white transition-all duration-300 shadow-[4px_4px_0px_rgba(0,0,0,1)] group-hover:-translate-y-1 group-hover:shadow-[8px_8px_0px_rgba(0,0,0,1)]"
                                    style={hoveredWord === word.num ? { backgroundColor: `${word.color}22`, borderColor: word.color } : {}}
                                >
                                    <div className="text-2xl md:text-4xl transition-all duration-300" style={{ color: word.color }}>
                                      {word.icon}
                                    </div>
                                </div>
                                <div className="text-center">
                                    <span className="text-[8px] font-black uppercase tracking-[0.1em]">
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

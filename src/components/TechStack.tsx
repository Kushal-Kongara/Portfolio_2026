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
    const techCategories = [
        {
            title: "Languages",
            items: [
                { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" />, desc: "typed logic", color: "#bae6fd", rotate: "-2deg" },
                { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E]" />, desc: "scripting", color: "#fef08a", rotate: "1deg" },
                { name: "SQL", icon: <SiPostgresql className="text-[#4169E1]" />, desc: "data query", color: "#ccfbf1", rotate: "-3deg" },
                { name: "Python", icon: <SiPython className="text-[#3776AB]" />, desc: "automation", color: "#99f6e4", rotate: "2deg" },
                { name: "C++", icon: <SiCplusplus className="text-[#00599C]" />, desc: "performance", color: "#e0f2fe", rotate: "-1deg" },
            ]
        },
        {
            title: "Frontend & Web",
            items: [
                { name: "React", icon: <SiReact className="text-[#61DAFB]" />, desc: "interactive", color: "#e9d5ff", rotate: "3deg" },
                { name: "Next.js", icon: <SiNextdotjs className="text-black" />, desc: "app arch", color: "#bae6fd", rotate: "-2deg" },
                { name: "Tailwind", icon: <SiTailwindcss className="text-[#06B6D4]" />, desc: "utility css", color: "#99f6e4", rotate: "1deg" },
            ]
        },
        {
            title: "Backend & Databases",
            items: [
                { name: "Node.js", icon: <SiNodedotjs className="text-[#339933]" />, desc: "runtime", color: "#fed7aa", rotate: "2deg" },
                { name: "Redis", icon: <SiRedis className="text-[#DC382D]" />, desc: "caching", color: "#fee2e2", rotate: "-2deg" },
                { name: "PostgreSQL", icon: <SiPostgresql className="text-[#4169E1]" />, desc: "relational", color: "#ccfbf1", rotate: "1deg" },
                { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" />, desc: "no-sql", color: "#dcfce7", rotate: "-1deg" },
                { name: "DynamoDB", icon: <FaDatabase className="text-[#4053D6]" />, desc: "serverless db", color: "#ede9fe", rotate: "2deg" },
            ]
        },
        {
            title: "Cloud & DevOps",
            items: [
                { name: "AWS", icon: <FaAws className="text-[#FF9900]" />, desc: "infrastructure", color: "#ffedd5", rotate: "-2deg" },
                { name: "Docker", icon: <SiDocker className="text-[#2496ED]" />, desc: "containers", color: "#d1fae5", rotate: "3deg" },
                { name: "CI/CD", icon: <SiGithubactions className="text-black" />, desc: "pipelines", color: "#f1f5f9", rotate: "-1deg" },
            ]
        },
        {
            title: "AI & LLM Integration",
            items: [
                { name: "GPT-4o/5", icon: <SiOpenai className="text-black" />, desc: "reasoning", color: "#ede9fe", rotate: "1deg" },
                { name: "Claude 4.1", icon: <SiAnthropic className="text-[#D97757]" />, desc: "creativity", color: "#ffedd5", rotate: "-2deg" },
                { name: "Gemini 2.5", icon: <SiGooglecloud className="text-[#4285F4]" />, desc: "multimodal", color: "#e0f2fe", rotate: "2deg" },
                { name: "Llama 3", icon: <SiMeta className="text-[#0668E1]" />, desc: "open source", color: "#d1fae5", rotate: "-1deg" },
                { name: "Vapi", icon: <FaRobot className="text-[#ff5500]" />, desc: "voice agents", color: "#fee2e2", rotate: "3deg" },
            ]
        }
    ];

    return (
        <div className="w-full relative overflow-hidden bg-[#fdfdfd] font-caveat text-slate-700 py-12 md:py-20">
            {/* Soft Paper Texture Background */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />

            {/* Graph Paper Grid */}
            <div
                className="absolute inset-0 z-0 opacity-[0.05]"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #aaa 1px, transparent 1px),
                        linear-gradient(to bottom, #aaa 1px, transparent 1px)
                    `,
                    backgroundSize: '32px 32px'
                }}
            />

            <SectionWrapper id="tech-stack" className="relative z-10 px-4">
                <div className="max-w-7xl mx-auto">

                    {/* Premium Header */}
                    <div className="mb-20 flex flex-col md:flex-row items-center justify-between gap-6 border-b-2 border-slate-100 pb-8">
                        <div className="flex flex-col items-center md:items-start text-center md:text-left">
                            <motion.h2
                                initial={{ opacity: 0, y: -20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="text-7xl md:text-9xl font-bold tracking-tighter text-slate-900"
                            >
                                <span className="relative inline-block rotate-[-1deg] text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600">
                                    Tech
                                    <span className="absolute -bottom-1 left-0 w-full h-2 bg-green-400/30 rounded-full" />
                                </span>
                                <span className="relative inline-block ml-4 rotate-[1deg] text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-900">
                                    Stack
                                    <span className="absolute -bottom-1 left-0 w-full h-2 bg-purple-400/30 rounded-full" />
                                </span>
                            </motion.h2>
                            <p className="text-3xl md:text-4xl mt-4 opacity-40 italic font-medium">{"// building future with precision"}</p>
                        </div>

                        <div className="hidden lg:flex items-center gap-6">
                            <motion.div
                                animate={{ rotate: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 4 }}
                                className="border-2 border-dashed border-red-200 p-6 rounded-[2.5rem] bg-white/80 backdrop-blur-sm shadow-xl shadow-red-500/5 rotate-[-2deg]"
                            >
                                <p className="text-2xl font-bold text-red-500 flex items-center gap-3">
                                    AI Native <span className="text-3xl">🤖</span>
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    {/* Bento Grid Layout for Categories */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 lg:gap-16">
                        {techCategories.map((category, catIdx) => (
                            <motion.div 
                                key={category.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: catIdx * 0.1 }}
                                className={`flex flex-col p-8 rounded-[3rem] bg-white/40 border border-slate-100 shadow-sm relative overflow-hidden ${category.title === "AI & LLM Integration" ? "md:col-span-2" : ""}`}
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
                                    <HiCode className="text-9xl rotate-12" />
                                </div>

                                <div className="flex items-center gap-4 mb-10">
                                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-[0.2em] text-slate-400">
                                        {category.title}
                                    </h3>
                                    <div className="h-[2px] flex-1 bg-slate-100/50 rounded-full" />
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
                                    {category.items.map((tool, idx) => (
                                        <motion.div
                                            key={tool.name}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 150,
                                                damping: 15,
                                                delay: (catIdx * 0.1) + (idx * 0.05),
                                            }}
                                            whileHover={{ scale: 1.1, y: -5 }}
                                            className="relative flex flex-col items-center group cursor-pointer"
                                            style={{ rotate: tool.rotate }}
                                        >
                                            <div className="relative">
                                                {/* Icon Container (Slightly smaller) */}
                                                <div className="relative z-20 w-20 h-20 md:w-24 md:h-24 bg-white rounded-[2rem] flex items-center justify-center text-3xl md:text-4xl 
                                                                border-2 border-slate-50 shadow-[0_10px_25px_-10px_rgba(0,0,0,0.08)] 
                                                                group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] 
                                                                group-hover:border-slate-100 transition-all duration-300">
                                                    <div className="relative z-10 transition-all filter group-hover:drop-shadow-lg">
                                                        {tool.icon}
                                                    </div>
                                                    
                                                    {/* Label overlay (more compact) */}
                                                    <div className="absolute -bottom-1 -right-1 bg-slate-900 text-white text-[9px] font-black px-2 py-0.5 rounded-lg uppercase tracking-widest shadow-lg transform rotate-6 border border-white/20">
                                                        {tool.name}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Desc Text (more compact) */}
                                            <div className="mt-4 text-center">
                                                <Highlighter color={tool.color} className="text-base md:text-lg font-bold tracking-tight text-slate-700">
                                                    {tool.desc}
                                                </Highlighter>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Metadata Footer */}
                    <div className="mt-24 pt-10 border-t-2 border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6 opacity-30 text-lg md:text-xl font-medium italic">
                        <div className="flex items-center gap-4">
                            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                            <span>[ core_infrastructure // ready ]</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <span>engineering_ledger.v2</span>
                            <div className="flex h-1.5 w-32 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full w-4/5 bg-slate-300 rounded-full" />
                            </div>
                        </div>
                    </div>

                </div>
            </SectionWrapper>
        </div>
    );
}

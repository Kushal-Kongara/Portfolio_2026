"use client";

import { motion } from "framer-motion";
import { experiences } from "@/lib/constants";
import { FaGraduationCap, FaPlaneDeparture, FaBriefcase, FaCode, FaBuilding } from "react-icons/fa";

const CARD_THEMES = [
  { bg: "bg-[#839705]", tag: "bg-white text-[#839705]" },
  { bg: "bg-[#008BFF]", tag: "bg-white text-[#008BFF]" },
  { bg: "bg-[#DA4848]", tag: "bg-white text-[#DA4848]" },
  { bg: "bg-[#6CA651]", tag: "bg-white text-[#6CA651]" },
];

const getIcon = (company: string) => {
  const c = company.toLowerCase();
  if (c.includes("university")) return <FaGraduationCap />;
  if (c.includes("moved")) return <FaPlaneDeparture />;
  if (c.includes("l&t") || c.includes("finance")) return <FaBuilding />;
  if (c.includes("cyber")) return <FaCode />;
  return <FaBriefcase />;
};

// --- SVG Landscapes ---
const Bush = ({ className, color = "#2ecc71" }: { className?: string, color?: string }) => (
  <svg viewBox="0 0 100 60" className={`drop-shadow-md ${className}`} fill={color}>
    <circle cx="30" cy="30" r="25" />
    <circle cx="50" cy="20" r="20" />
    <circle cx="70" cy="30" r="25" />
    <rect x="25" y="30" width="50" height="25" />
  </svg>
);

const PineTree = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 120" className={`drop-shadow-md ${className}`} fill="none">
    <rect x={45} y={90} width={10} height={30} fill="#7f8c8d" />
    <path d="M20 90 L50 40 L80 90 Z" fill="#27ae60" />
    <path d="M30 60 L50 20 L70 60 Z" fill="#2ecc71" />
    <path d="M40 30 L50 0 L60 30 Z" fill="#27ae60" />
  </svg>
);

const House = ({ className, color = "#3498db" }: { className?: string, color?: string }) => (
  <svg viewBox="0 0 100 100" className={`drop-shadow-lg ${className}`} fill="none">
    <rect x={20} y={50} width={60} height={50} fill="#ffffff" />
    <path d="M10 50 L50 10 L90 50 Z" fill={color} />
    <rect x={40} y={70} width={20} height={30} fill="#34495e" />
    <rect x={30} y={60} width={10} height={10} fill="#ecf0f1" />
    <rect x={60} y={60} width={10} height={10} fill="#ecf0f1" />
  </svg>
);

const Cloud = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 50" className={`drop-shadow-sm ${className}`} fill="#ffffff">
    <circle cx="30" cy="30" r="15" />
    <circle cx="50" cy="20" r="20" />
    <circle cx="70" cy="25" r="15" />
    <rect x="30" y="20" width="40" height="25" />
  </svg>
);

const Charminar = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 120 120" className={`drop-shadow-2xl ${className}`} fill="none">
    {/* Main Block */}
    <rect x={20} y={60} width={80} height={40} fill="#f39c12" />
    {/* Arch */}
    <path d="M40 100 V 75 A 20 20 0 0 1 80 75 V 100 Z" fill="#FAF7F2" />
    {/* 4 Pillars */}
    <rect x={15} y={10} width={15} height={90} fill="#e67e22" />
    <rect x={90} y={10} width={15} height={90} fill="#e67e22" />
    {/* Balconies */}
    <rect x={10} y={50} width={100} height={5} fill="#d35400" />
    <rect x={10} y={35} width={100} height={5} fill="#d35400" />
    {/* Domes */}
    <path d="M 12.5 10 Q 22.5 -10 32.5 10 Z" fill="#d35400" />
    <path d="M 87.5 10 Q 97.5 -10 107.5 10 Z" fill="#d35400" />
  </svg>
);

const GoldenGate = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 100" className={`drop-shadow-xl ${className}`} fill="none">
    {/* Cables */}
    <path d="M 0 80 Q 50 30 100 80 T 200 80" stroke="#d35400" strokeWidth={4} fill="none" />
    <path d="M 0 82 L 200 82" stroke="#e74c3c" strokeWidth={8} />
    {/* Towers */}
    <rect x={40} y={15} width={12} height={85} fill="#c0392b" />
    <rect x={148} y={15} width={12} height={85} fill="#c0392b" />
    {/* Crossbeams */}
    <path d="M42 30 L50 30 M42 45 L50 45 M150 30 L158 30 M150 45 L158 45" stroke="#FAF7F2" strokeWidth={2} />
  </svg>
);

const CitySkyline = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 100" className={`drop-shadow-lg ${className}`} fill="#bdc3c7">
    <rect x={10} y={40} width={30} height={60} fill="#95a5a6" />
    <rect x={45} y={10} width={40} height={90} fill="#7f8c8d" />
    <rect x={90} y={50} width={35} height={50} fill="#bdc3c7" />
    <rect x={130} y={30} width={25} height={70} fill="#95a5a6" />
    <rect x={160} y={60} width={30} height={40} fill="#7f8c8d" />
  </svg>
);

const Factory = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 120 100" className={`drop-shadow-lg ${className}`} fill="none">
    {/* Main buildings */}
    <rect x={10} y={50} width={40} height={50} fill="#e67e22" />
    <rect x={50} y={40} width={30} height={60} fill="#d35400" />
    <rect x={80} y={60} width={30} height={40} fill="#e67e22" />
    {/* Roofs */}
    <path d="M10 50 L30 30 L50 50 Z" fill="#c0392b" />
    {/* Smokestacks */}
    <rect x={60} y={10} width={10} height={40} fill="#95a5a6" />
    <rect x={90} y={30} width={10} height={30} fill="#95a5a6" />
    {/* Windows */}
    <rect x={20} y={65} width={10} height={10} fill="#FAF7F2" opacity={0.5} />
    <rect x={60} y={55} width={10} height={10} fill="#FAF7F2" opacity={0.5} />
  </svg>
);

// Helper for placing custom decorations above each card
const getDecor = (company: string) => {
  const c = company.toLowerCase();

  if (c.includes("dispatchtrack")) {
    return (
      <>
        <Charminar className="absolute w-28 -right-4 -top-20 z-0 drop-shadow-xl" />
        <Bush className="absolute w-12 -right-8 top-10" color="#1abc9c" />
      </>
    );
  }
  if (c.includes("university")) {
    return (
      <GoldenGate className="absolute w-40 -right-12 -top-16 z-0 drop-shadow-xl" />
    );
  }
  if (c.includes("moved")) {
    return (
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute text-5xl right-4 -top-12 z-0"
      >
        ✈️
      </motion.div>
    );
  }
  if (c.includes("l&t")) {
    return (
      <>
        <CitySkyline className="absolute w-36 -right-6 -top-16 z-0 drop-shadow-lg" />
        <Bush className="absolute w-16 -left-6 -top-4 z-0" color="#2ecc71" />
      </>
    );
  }
  if (c.includes("cyber")) {
    return (
      <>
        <House className="absolute w-20 right-8 -top-16 z-0 drop-shadow-xl" color="#3498db" />
        <PineTree className="absolute w-12 -right-4 -top-8 z-0" />
      </>
    );
  }
  return (
    <>
      <Factory className="absolute w-24 right-4 -top-16 z-0 drop-shadow-xl" />
      <Cloud className="absolute w-16 left-8 -top-12 opacity-70" />
    </>
  );
};

export default function Experience() {
  // Chronological order: oldest at index 0, newest at end.
  const journey = [...experiences].reverse();

  return (
    <section id="experience" className="relative w-full bg-[#FAF7F2] py-24 overflow-hidden font-sans">
      {/* Background Texture for Premium Look */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/cream-paper.png')` }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Title */}
        <div className="text-center mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-[#2d3436] tracking-tighter uppercase inline-block relative"
          >
            My Journey
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-2 bg-[#e74c3c] rounded-full" />
          </motion.h2>
          <p className="mt-6 text-lg text-slate-500 font-medium italic">{"A timeline of growth, miles traveled, and code shipped."}</p>
        </div>

        {/* The Grid Roadmap */}
        <div className="relative max-w-6xl mx-auto pb-20">

          {/* ROAD BACKGROUND (Desktop) - winds through the two rows */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
            {/* Top row straight road */}
            <div className="absolute top-[20%] left-0 right-[15%] h-[40px] bg-[#1e272e] rounded-l-full shadow-lg border-y-4 border-[#1e272e]">
              <div className="w-full h-full border-b-[4px] border-dashed border-white opacity-80 -translate-y-[2px]" />
            </div>
            {/* Right Curve */}
            <div className="absolute top-[20%] right-[5%] w-[20%] h-[55%] border-[40px] border-l-0 border-[#1e272e] rounded-r-[100px] shadow-lg">
              <div className="absolute inset-0 border-[4px] border-l-0 border-dashed border-white opacity-80 left-[18px] top-[16px] bottom-[16px] right-[16px] rounded-r-[80px]" />
            </div>
            {/* Bottom row straight road */}
            <div className="absolute top-[65%] right-[15%] left-0 h-[40px] bg-[#1e272e] shadow-lg border-y-4 border-[#1e272e]">
              <div className="w-full h-full border-b-[4px] border-dashed border-white opacity-80 -translate-y-[2px]" />
            </div>
            {/* Left Curve to NOW terminal */}
            <div className="absolute top-[65%] left-0 w-[15%] h-[35%] border-[40px] border-r-0 border-b-0 border-[#1e272e] rounded-tl-[100px] shadow-lg">
              <div className="absolute inset-0 border-[4px] border-r-0 border-b-0 border-dashed border-white opacity-80 right-[18px] top-[16px] bottom-[16px] left-[16px] rounded-tl-[80px]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 lg:gap-y-32">
            {journey.map((exp, idx) => {
              const theme = CARD_THEMES[idx % CARD_THEMES.length];

              // Only take first bullet and limit to ~20 words so blocks are small
              const rawText = exp.bullets[0] || exp.role;
              const shortText = rawText.split(' ').slice(0, 20).join(' ') + (rawText.split(' ').length > 20 ? '...' : '');

              return (
                <div key={idx} className="relative flex flex-col z-10 w-[90%] mx-auto lg:w-full">
                  {/* Decorative Elements Peeking from top */}
                  <div className="absolute inset-0 pointer-events-none z-0">
                    {getDecor(exp.company)}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className={`h-full min-h-[280px] ${theme.bg} p-5 md:p-6 rounded-[1.5rem] shadow-xl relative z-10 group transition-transform duration-300 hover:-translate-y-2 border-2 border-black/10 flex flex-col`}
                  >
                    {/* Node Icon on top left */}
                    <div className="absolute -top-6 -left-4 w-12 h-12 bg-[#1e272e] rounded-full border-[3px] border-[#FAF7F2] shadow-lg flex items-center justify-center text-xl text-white">
                      {getIcon(exp.company)}
                    </div>

                    {/* Date Tag */}
                    <div className={`mt-2 self-start px-3 py-1 rounded-full ${theme.tag} font-black text-[10px] tracking-[0.1em] uppercase shadow-sm mb-3`}>
                      {exp.period.split("·")[0].trim()}
                    </div>

                    <h3 className="text-xl md:text-2xl font-black text-white leading-tight mb-1 uppercase tracking-tight">
                      {exp.company}
                    </h3>
                    <h4 className="text-sm font-bold text-white/95 mb-4 uppercase tracking-wide">
                      {exp.role}
                    </h4>

                    <div className="text-white font-medium space-y-3 mb-6 text-[13px] leading-relaxed opacity-95 flex-grow">
                      <p>{shortText}</p>
                    </div>

                    {/* Skills / Tech */}
                    {exp.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-auto">
                        {exp.skills.slice(0, 3).map(skill => (
                          <span key={skill} className="bg-black/20 text-white border border-white/10 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider backdrop-blur-sm shadow-inner truncate">
                            {skill}
                          </span>
                        ))}
                        {exp.skills.length > 3 && (
                          <span className="bg-black/20 text-white border border-white/10 px-2 py-1 rounded-full text-[9px] font-black backdrop-blur-sm shadow-inner">
                            +{exp.skills.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Terminal NOW marker */}
          <div className="absolute -bottom-8 left-0 hidden lg:flex w-16 h-16 bg-[#e74c3c] rounded-full shadow-2xl items-center justify-center text-white text-sm font-black uppercase tracking-widest border-[6px] border-[#FAF7F2] z-20">
            NOW
          </div>        </div>

      </div>
    </section>
  );
}
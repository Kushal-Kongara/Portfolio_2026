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

// Helper for placing standard or custom decorations based on experience name/index
const getDecor = (company: string, isEven: boolean) => {
  // If isEven, the content is on the LEFT side, so the empty space we decorate is on the RIGHT.
  // The center road is to the LEFT of this empty space.
  // We position items relative to the empty 1/2 screen.

  const nearRoad = 'left-4 md:left-12';
  const midSpace = 'left-1/2 -translate-x-1/2';
  const farEdge = 'right-4 md:right-16';

  const c = company.toLowerCase();

  // Hyderabad models
  if (c.includes("dispatchtrack")) {
    return (
      <>
        <Charminar className={`absolute w-32 md:w-48 bottom-12 ${nearRoad}`} />
        <Bush className={`absolute w-16 md:w-20 bottom-8 ${midSpace}`} color="#1abc9c" />
        <House className={`absolute w-20 md:w-24 bottom-16 ${farEdge}`} color="#e74c3c" />
      </>
    )
  }
  // US / San Francisco models
  if (c.includes("university")) {
    return (
      <>
        <GoldenGate className={`absolute w-48 md:w-64 bottom-24 ${nearRoad}`} />
        <PineTree className={`absolute w-12 md:w-16 bottom-16 ${midSpace}`} />
        <PineTree className={`absolute w-10 md:w-12 bottom-12 ${farEdge}`} />
      </>
    )
  }
  // Transition Models
  if (c.includes("moved")) {
    return (
      <>
        <Cloud className="absolute w-20 md:w-28 left-4 md:left-16 top-10 opacity-80" />
        <Cloud className="absolute w-24 md:w-32 right-10 top-24 opacity-60" />
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute text-5xl md:text-6xl ${midSpace} top-1/2 -translate-y-1/2`}
        >
          ✈️
        </motion.div>
      </>
    )
  }
  // Mumbai models
  if (c.includes("l&t")) {
    return (
      <>
        <CitySkyline className={`absolute w-40 md:w-56 bottom-16 ${nearRoad}`} />
        <Bush className={`absolute w-16 md:w-24 bottom-10 ${farEdge}`} color="#2ecc71" />
      </>
    )
  }
  // San Jose (Modern tech hub)
  if (c.includes("cyber")) {
    return (
      <>
        <House className={`absolute w-24 md:w-32 bottom-20 ${nearRoad}`} color="#3498db" />
        <PineTree className={`absolute w-16 md:w-20 bottom-12 ${midSpace}`} />
        <PineTree className={`absolute w-12 md:w-16 bottom-8 right-24`} />
      </>
    )
  }
  // Medford / Remote Tech Setup
  return (
    <>
      <Factory className={`absolute w-24 md:w-32 bottom-16 ${nearRoad}`} />
      <Bush className={`absolute w-12 md:w-16 bottom-10 ${midSpace}`} color="#27ae60" />
      <Cloud className={`absolute w-20 md:w-28 right-10 top-16 opacity-70`} />
    </>
  )
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
        <div className="text-center mb-32">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-[#2d3436] tracking-tighter uppercase inline-block relative"
          >
            My Journey
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-2 bg-[#e74c3c] rounded-full" />
          </motion.h2>
          <p className="mt-8 text-xl text-slate-500 font-medium italic">{"A timeline of growth, miles traveled, and code shipped."}</p>
        </div>

        {/* The Roadmap */}
        <div className="relative">

          {/* Mobile Straight Road */}
          <div className="absolute left-[36px] md:hidden top-0 bottom-0 w-[8px] bg-[#1e272e] rounded-full overflow-hidden">
            {/* Dashed line inside */}
            <div className="absolute left-1/2 w-0 h-full border-l-[2px] border-dashed border-white opacity-80" />
          </div>

          <div className="flex flex-col">
            {journey.map((exp, idx) => {
              const isEven = idx % 2 === 0; // Curve on Right or Left
              const isLast = idx === journey.length - 1;
              const theme = CARD_THEMES[idx % CARD_THEMES.length];

              return (
                <div key={idx} className="relative flex flex-col md:flex-row items-center min-h-[450px]">

                  {/* Desktop Winding Road Segment */}
                  {!isLast && (
                    <div className={`hidden md:block absolute w-[50%] h-full top-[50%] z-0 ${isEven ? 'right-[50%]' : 'left-[50%]'}`}>
                      {/* Black asphalt road */}
                      <div
                        className={`absolute w-full h-full border-[60px] border-[#1e272e] shadow-lg ${isEven ? "border-l-0 rounded-r-[150px] left-0" : "border-r-0 rounded-l-[150px] right-0"
                          }`}
                      />
                      {/* White dashed centerline */}
                      <div
                        className={`absolute border-[4px] border-dashed border-white opacity-80 ${isEven
                          ? "border-l-0 rounded-r-[120px] left-0 top-[30px] bottom-[30px] right-[30px]"
                          : "border-r-0 rounded-l-[120px] right-0 top-[30px] bottom-[30px] left-[30px]"
                          }`}
                      />
                    </div>
                  )}

                  {/* Node icon for Mobile */}
                  <div className="md:hidden absolute left-[20px] top-8 w-[40px] h-[40px] rounded-full bg-[#1e272e] text-white flex items-center justify-center text-xl z-20 shadow-xl border-2 border-[#FAF7F2]">
                    {getIcon(exp.company)}
                  </div>

                  {/* Content Container (Card) */}
                  <div className={`w-full md:w-1/2 flex relative z-10 py-12 md:py-0 ${isEven ? 'md:justify-end md:pr-16' : 'md:order-2 md:justify-start md:pl-16'}`}>

                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className={`ml-20 md:ml-0 ${theme.bg} p-6 md:p-8 rounded-[2xl] shadow-2xl w-full max-w-lg relative group transition-transform duration-300 hover:-translate-y-2 border-2 border-black/10`}
                    >
                      {/* Node icon for Desktop */}
                      <div className={`hidden md:flex absolute top-1/2 -translate-y-1/2 w-16 h-16 bg-[#1e272e] rounded-full border-[4px] border-[#FAF7F2] shadow-xl items-center justify-center text-2xl text-white ${isEven ? '-right-[88px]' : '-left-[88px]'}`}>
                        {getIcon(exp.company)}
                      </div>

                      {/* Date Tag */}
                      <div className={`inline-block px-4 py-1.5 rounded-full ${theme.tag} font-black text-[13px] tracking-[0.1em] uppercase shadow-sm mb-5`}>
                        {exp.period.split("·")[0].trim()}
                      </div>

                      <h3 className="text-3xl md:text-4xl font-black text-white leading-tight mb-2 uppercase tracking-tight">
                        {exp.company}
                      </h3>
                      <h4 className={`text-xl font-bold text-white/95 mb-5 uppercase tracking-wide`}>
                        {exp.role}
                      </h4>

                      <div className="text-white font-bold space-y-3 mb-8 text-[15px] leading-relaxed opacity-95">
                        {exp.bullets.slice(0, 2).map((bullet, i) => (
                          <p key={i}>{bullet}</p>
                        ))}
                      </div>

                      {/* Skills / Tech */}
                      {exp.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.slice(0, 4).map(skill => (
                            <span key={skill} className="bg-black/20 text-white border border-white/10 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider backdrop-blur-sm shadow-inner">
                              {skill}
                            </span>
                          ))}
                          {exp.skills.length > 4 && (
                            <span className="bg-black/20 text-white border border-white/10 px-3 py-1.5 rounded-full text-xs font-black backdrop-blur-sm shadow-inner">
                              +{exp.skills.length - 4}
                            </span>
                          )}
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* Landscape Decor space (Desktop) */}
                  <div className={`hidden md:block w-1/2 relative h-full min-h-[450px] pointer-events-none ${isEven ? 'md:order-2' : ''}`}>
                    {getDecor(exp.company, isEven)}
                  </div>

                </div>
              );
            })}
          </div>

          {/* Start/End Terminals below the last item (desktop) */}
          <div className="hidden md:flex absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-20 h-20 bg-[#e74c3c] rounded-full shadow-2xl items-center justify-center text-white text-xl font-black uppercase tracking-widest border-[8px] border-[#FAF7F2] z-20">
            NOW
          </div>
        </div>

      </div>
    </section>
  );
}
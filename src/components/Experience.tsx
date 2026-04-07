"use client";

import { motion, useMotionValue, useTransform, useSpring, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { experiences } from "@/lib/constants";
import {
  FiArrowUpRight,
  FiClock,
  FiCode,
  FiDatabase,
  FiGlobe,
  FiLayers,
  FiLayout,
  FiServer,
  FiZap,
  FiTrendingUp
} from "react-icons/fi";
import { SiReact, SiNextdotjs, SiNodedotjs, SiTypescript, SiTailwindcss, SiPostgresql, SiDocker, SiGithubactions, SiFlutter } from "react-icons/si";
import { FaAws } from "react-icons/fa";

const CountUp = ({ to, suffix = "", delay = 0 }: { to: number; suffix?: string; delay?: number }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = to;
      if (start === end) return;

      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setTimeout(() => {
        const handle = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(handle);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
        return () => clearInterval(handle);
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [to, isInView, delay]);

  return <span ref={nodeRef}>{count}{suffix}</span>;
};

const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, perspective: 1000, transformStyle: "preserve-3d" }}
      className={`relative ${className}`}
    >
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
};

export default function Experience() {
  const skillIcons = [
    { icon: <SiReact />, color: "text-[#61DAFB]" },
    { icon: <SiNextdotjs />, color: "text-[#000000]" },
    { icon: <SiTypescript />, color: "text-[#3178C6]" },
    { icon: <SiNodedotjs />, color: "text-[#339933]" },
    { icon: <SiTailwindcss />, color: "text-[#06B6D4]" },
    { icon: <SiPostgresql />, color: "text-[#4169E1]" },
    { icon: <FaAws />, color: "text-[#FF9900]" },
    { icon: <SiDocker />, color: "text-[#2496ED]" },
    { icon: <SiGithubactions />, color: "text-[#2088FF]" },
    { icon: <SiFlutter />, color: "text-[#02569B]" },
    { icon: <FiDatabase />, color: "text-[#555555]" },
    { icon: <FiGlobe />, color: "text-[#22C55E]" },
  ];

  return (
    <section id="experience" className="relative w-full bg-white py-24 overflow-hidden border-y-[3px] border-black">
      {/* Technical Grid Backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]">
        <svg width="100%" height="100%">
          <pattern id="experienceGrid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="black" strokeWidth="2" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#experienceGrid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title Header (Systemic Style) */}
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-16 gap-12 border-b-[3px] border-black pb-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 bg-white border-[2.5px] border-black px-4 py-1 shadow-[4px_4px_0px_#000]">
                <span className="w-2 h-2 bg-[#0ea5e9] animate-pulse" />
                <p className="text-black text-[11px] font-black tracking-[0.4em] uppercase">
                    SYSTEM.LOG / EXPERIENCE
                </p>
            </div>
            <h2 className="text-black font-black uppercase leading-[0.8] tracking-tighter"
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "clamp(3.5rem, 10vw, 6rem)",
                letterSpacing: "-0.06em"
              }}
            >
              EXPERIENCE <br />
              <span className="text-[#0ea5e9]">HIGHLIGHTS</span>
            </h2>
          </div>
          <p className="text-black max-w-sm font-black uppercase text-xs border-l-4 border-black pl-6 pt-4 leading-relaxed bg-[#ffff00] p-4 shadow-[6px_6px_0px_#000] italic">
            Measuring engineering impact through systemic growth, architecture, and professional leadership across multiple tech environments.
          </p>
        </div>

        {/* Chronological Timeline (Primary Horizontal View) */}
        <div className="mb-32 relative">
          <div className="flex items-center gap-4 mb-20 px-6 max-w-7xl mx-auto">
            <div className="h-[2px] w-12 bg-black" />
            <h3 className="text-xl font-black text-black tracking-tighter uppercase">CAREER_CHRONICLE</h3>
            <div className="h-[2px] flex-1 bg-black/10" />
            <span className="text-[10px] font-black text-black/30 tracking-[0.3em]">HORIZONTAL_TIMELINE_LOG</span>
          </div>

          {/* Timeline Backbone */}
          <div className="absolute left-0 right-0 h-[4px] bg-black/10 top-[55%] -translate-y-1/2 z-0 hidden md:block" />

          {/* Mobile scroll hint */}
          <p className="block md:hidden text-xs text-black/30 font-black tracking-widest text-center mb-4 uppercase">← Scroll →</p>

          {/* Horizontal Scroll Container */}
          <div className="overflow-x-auto pb-12 pt-4 px-6 no-scrollbar relative z-10">
            <div className="flex gap-6 md:gap-10 min-w-max md:px-12">
                {experiences
                .filter(exp => ["Oatmeal AI", "Saayam", "DispatchTrack"].includes(exp.company))
                .map((exp, i) => {
                    const colors = ["bg-[#ff007f]", "bg-[#0ea5e9]", "bg-[#facc15]"];
                    const bgColor = colors[i % colors.length];
                    
                    return (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2, type: "spring", stiffness: 100 }}
                        className="relative w-[280px] sm:w-[320px] md:w-[400px] flex-shrink-0"
                    >
                        {/* Vertical Connector Dot */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-[3px] border-black rounded-full z-20 hidden md:block" />

                        {/* Content Card */}
                        <div className={`${bgColor} border-[4px] border-black p-8 shadow-[12px_12px_0px_#000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all group relative overflow-hidden h-full`}>
                            <div className="flex justify-between items-start mb-6">
                            <div className="bg-black text-white px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em]">
                                {exp.period}
                            </div>
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 bg-black/20 rounded-xs" />
                                <div className="w-2.5 h-2.5 bg-black/20 rounded-xs" />
                            </div>
                            </div>
                            
                            <h4 className={`text-4xl font-black uppercase tracking-tighter leading-none mb-2 ${i === 2 ? 'text-black' : 'text-white'}`}>
                                {exp.company}
                            </h4>
                            <p className={`${i === 2 ? 'text-black/60' : 'text-white/70'} font-black text-[10px] uppercase tracking-[0.1em] mb-8 bg-black/5 inline-block px-2 py-0.5`}>
                                {exp.role}
                            </p>
                            
                            <div className="flex flex-wrap gap-2 mt-auto">
                            {exp.skills.slice(0, 5).map((skill, j) => (
                                <span key={j} className={`text-[9px] font-black border-[2px] px-2 py-1 uppercase tracking-wider ${i === 2 ? 'text-black/60 border-black/10' : 'text-white/60 border-white/20'}`}>
                                {skill}
                                </span>
                            ))}
                            </div>

                            {/* Abstract background detail */}
                            <div className={`absolute -bottom-6 -right-6 text-9xl font-black opacity-10 select-none pointer-events-none rotate-12 ${i === 2 ? 'text-black' : 'text-white'}`}>
                                {i + 1}
                            </div>
                        </div>
                    </motion.div>
                    );
                })}
            </div>
          </div>
        </div>

        {/* Bento Grid (Secondary Highlights) */}
        <div className="flex items-center gap-4 mb-16 px-4">
          <div className="h-[2px] w-12 bg-black" />
          <h3 className="text-xl font-black text-black tracking-tighter uppercase">IMPACT_METRICS</h3>
          <div className="h-[2px] flex-1 bg-black/10" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 md:auto-rows-[180px]">

          {/* Tenure Window */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="md:col-span-1 md:row-span-2 bg-[#1e3a8a] border-[3px] border-black shadow-[8px_8px_0px_#000] flex flex-col group overflow-hidden"
          >
            <div className="bg-[#1a1a1a] px-4 py-2 border-b-[3px] border-black flex justify-between items-center">
               <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                 <span className="w-2.5 h-2.5 bg-white border border-black rounded-xs" /> TENURE_RECORD
               </span>
               <div className="flex gap-1">
                 <div className="w-3 h-3 bg-white border border-black rounded-full" />
                 <div className="w-3 h-3 bg-white border border-black rounded-full" />
               </div>
            </div>
            <div className="p-10 flex flex-col justify-center flex-1 relative">
              <h3 className="text-8xl font-black text-white leading-none tracking-tighter mb-4">
                <CountUp to={5} suffix="+" />
              </h3>
              <p className="text-white text-xl font-black leading-tight uppercase italic tracking-tighter">Years of Building <br />Software At Scale.</p>
              <FiClock className="absolute top-1/2 right-4 -translate-y-1/2 text-white/5 text-9xl font-black select-none pointer-events-none rotate-12" />
            </div>
          </motion.div>

          {/* Optimization Metric Window */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 md:row-span-1 bg-white border-[3px] border-black shadow-[8px_8px_0px_#000] flex flex-col group overflow-hidden"
          >
            <div className="bg-[#1a1a1a] px-4 py-2 border-b-[3px] border-black text-[10px] font-black text-neutral-400 uppercase tracking-widest flex items-center gap-2">
               <span className="w-2.5 h-2.5 bg-emerald-500 rounded-xs" /> OATMEAL_AI_RESULT_01
            </div>
            <div className="p-8 flex items-center justify-between gap-8 h-full bg-[#ccff00]">
              <div className="space-y-2">
                <h3 className="text-6xl font-black text-black tracking-tighter leading-none">
                  <CountUp to={45} suffix="%" delay={0.2} />
                </h3>
                <p className="text-black font-black text-lg uppercase tracking-tighter italic">Faster Load Times Post-Architectural Audit</p>
              </div>
              <div className="hidden lg:flex flex-col gap-3">
                <div className="bg-black text-[#ccff00] px-4 py-2 text-[10px] font-black uppercase border-[2px] border-black shadow-[4px_4px_0px_#000]">MIGRATION_STABLE</div>
                <div className="bg-white text-black px-4 py-2 text-[10px] font-black uppercase border-[2px] border-black shadow-[4px_4px_0px_#000]">CORE_VITAL_AUDIT</div>
              </div>
            </div>
          </motion.div>

          {/* Efficiency Metric Window */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-1 md:row-span-1 bg-[#0ea5e9] border-[3px] border-black shadow-[8px_8px_0px_#000] flex flex-col group overflow-hidden"
          >
             <div className="bg-[#1a1a1a] px-4 py-2 border-b-[3px] border-black text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                DISPATCHTRACK_METRIC_34
             </div>
             <div className="p-8 flex flex-col justify-between h-full">
                <h3 className="text-4xl font-black text-white tracking-tighter leading-none mb-1 shadow-black/20">
                  <CountUp to={25} suffix="%" delay={0.4} />
                </h3>
                <p className="text-white/90 font-black text-xs uppercase leading-tight italic tracking-tighter">Infrastructure Efficiency Boosted Via API Refactor.</p>
             </div>
          </motion.div>

          {/* Scale Detail Window */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 md:row-span-1 bg-white border-[3px] border-black shadow-[8px_8px_0px_#000] flex flex-col overflow-hidden"
          >
            <div className="bg-[#1a1a1a] px-4 py-2 border-b-[3px] border-black text-[10px] font-black text-neutral-400 uppercase tracking-widest flex items-center gap-2">
               <span className="w-2.5 h-2.5 bg-[#f59e0b] rounded-xs" /> SCALE_DISTRIBUTION
            </div>
            <div className="p-8 flex items-center justify-between gap-6 h-full bg-[#f0f9ff]">
              <div>
                <h3 className="text-4xl font-black text-black tracking-tighter leading-none mb-1">
                  <CountUp to={5} suffix="K+" delay={0.5} />
                </h3>
                <p className="text-black font-black text-xs uppercase italic tracking-tighter">Daily Requests Handled at L&T Finance</p>
              </div>
              <div className="bg-white border-[2.5px] border-black p-4 shadow-[4px_4px_0px_#000]">
                <div className="flex gap-1 mb-2">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className={`h-3 w-1.5 ${i < 4 ? 'bg-black' : 'bg-black/10'}`} />
                  ))}
                </div>
                <div className="text-[10px] font-black text-black">99.9% UPTIME</div>
              </div>
            </div>
          </motion.div>

          {/* UI Optimization Window */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="md:col-span-1 md:row-span-1 bg-[#f59e0b] border-[3px] border-black shadow-[8px_8px_0px_#000] flex flex-col group overflow-hidden"
          >
             <div className="bg-[#1a1a1a] px-4 py-2 border-b-[3px] border-black text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                SAAYAM_UX_DATA_09
             </div>
             <div className="p-8 flex flex-col justify-between h-full text-black">
                <h3 className="text-4xl font-black tracking-tighter leading-none mb-1">
                  <CountUp to={30} suffix="%" delay={0.5} />
                </h3>
                <p className="text-black/80 font-black text-xs uppercase leading-tight italic tracking-tighter">UI Engagement Increase Through System Overhaul.</p>
             </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

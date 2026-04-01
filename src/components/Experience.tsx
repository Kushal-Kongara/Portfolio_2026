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
  // Highlights derived from constants
  const highlights = [
    {
      title: "Years of Engineering Excellence",
      value: "5+",
      subvalue: "Professional Experience",
      bgColor: "bg-[#1e3a8a]", // Deep Navy
      textColor: "text-white",
      span: "md:col-span-1 md:row-span-2",
      icon: <FiClock className="text-4xl opacity-20 absolute top-4 right-4" />,
    },
    {
      title: "Performance Impact",
      value: "45%",
      subvalue: "Faster Page-Load Times at Oatmeal AI",
      bgColor: "bg-white",
      textColor: "text-slate-900",
      span: "md:col-span-2 md:row-span-1",
      border: "border-2 border-slate-100",
      icon: <FiZap className="text-blue-500" />,
      detail: "+ Architected scalable Next.js systems",
    },
    {
      title: "Scale & Reliability",
      value: "5K+",
      subvalue: "Daily Requests Handled at L&T Finance",
      bgColor: "bg-[#0ea5e9]", // Bright Blue
      textColor: "text-white",
      span: "md:col-span-1 md:row-span-1",
      icon: <FiServer />,
    },
    {
      title: "Scalability Growth",
      value: "30%",
      subvalue: "Improvement in Platform Scalability @ CIS",
      bgColor: "bg-[#f59e0b]", // Amber/Yellow
      textColor: "text-black",
      span: "md:col-span-1 md:row-span-1",
      icon: <FiTrendingUp />,
    },
    {
      title: "Uptime Standard",
      value: "99%",
      subvalue: "Consistent Uptime for Logistics Operations",
      bgColor: "bg-[#8b5cf6]", // Lavender/Purple
      textColor: "text-white",
      span: "md:col-span-1 md:row-span-1",
      icon: <FiArrowUpRight />,
    },
  ];

  const skillIcons = [
    { icon: <SiReact />, color: "bg-blue-500/10 text-blue-500" },
    { icon: <SiNextdotjs />, color: "bg-black/10 text-black" },
    { icon: <SiTypescript />, color: "bg-blue-600/10 text-blue-600" },
    { icon: <SiNodedotjs />, color: "bg-green-600/10 text-green-600" },
    { icon: <SiTailwindcss />, color: "bg-cyan-500/10 text-cyan-500" },
    { icon: <SiPostgresql />, color: "bg-blue-800/10 text-blue-800" },
    { icon: <FaAws />, color: "bg-orange-500/10 text-orange-500" },
    { icon: <SiDocker />, color: "bg-blue-400/10 text-blue-400" },
    { icon: <SiGithubactions />, color: "bg-slate-800/10 text-slate-800" },
    { icon: <SiFlutter />, color: "bg-cyan-400/10 text-cyan-400" },
    { icon: <FiDatabase />, color: "bg-indigo-500/10 text-indigo-500" },
    { icon: <FiGlobe />, color: "bg-emerald-500/10 text-emerald-500" },
  ];

  return (
    <section id="experience" className="relative w-full bg-[#f8fafc] py-24 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Title Header - Infographic Style */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex flex-col md:flex-row md:items-end gap-4"
          >
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-[#1e3a8a] leading-[0.8] uppercase">
              Experience <br />
              <span className="text-[#0ea5e9]">Highlights</span>
            </h2>
            <div className="h-px flex-1 bg-slate-200 mb-4 hidden md:block" />
            <p className="text-slate-500 max-w-xs font-medium text-sm border-l-4 border-[#f59e0b] pl-4">
              Measurable impact and engineering leadership across 6 years of full-stack expertise.
            </p>
          </motion.div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[160px] md:auto-rows-[180px]">

          {/* Main Experience Card */}
          <TiltCard className="md:col-span-1 md:row-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="w-full h-full bg-[#1e3a8a] rounded-[2rem] p-8 relative flex flex-col justify-end overflow-hidden group shadow-2xl shadow-blue-900/20"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
              <FiClock className="text-white/10 text-[12rem] absolute -top-10 -right-10 rotate-12" />

              <div className="relative z-10" style={{ transform: "translateZ(50px)" }}>
                <span className="text-white/60 font-bold uppercase tracking-widest text-xs mb-2 block">Career Tenure</span>
                <h3 className="text-6xl font-black text-white leading-none tracking-tighter mb-2">
                  <CountUp to={5} suffix="+" />
                </h3>
                <p className="text-white text-xl font-bold leading-tight">Years of building production-grade software.</p>
              </div>
            </motion.div>
          </TiltCard>

          {/* Performance Card */}
          <TiltCard className="md:col-span-2 md:row-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="w-full h-full bg-white rounded-[2rem] p-8 border-2 border-slate-100 flex items-center justify-between group overflow-hidden relative"
            >
              <div className="relative z-10" style={{ transform: "translateZ(40px)" }}>
                <span className="text-blue-600 font-black uppercase tracking-widest text-xs mb-2 block flex items-center gap-2">
                  <FiZap /> Optimization Result
                </span>
                <h3 className="text-5xl font-black text-slate-900 tracking-tighter leading-none mb-1">
                  <CountUp to={45} suffix="%" delay={0.2} />
                </h3>
                <p className="text-slate-500 font-bold text-lg">Page-load reduction at Oatmeal AI</p>
              </div>
              <div className="hidden lg:flex flex-col gap-2 relative z-10">
                <div className="bg-slate-50 px-4 py-2 rounded-full text-xs font-bold text-slate-700 border border-slate-200">React.js Migration</div>
                <div className="bg-slate-50 px-4 py-2 rounded-full text-xs font-bold text-slate-700 border border-slate-200">System Architecture</div>
              </div>
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, backgroundSize: '16px 16px' }}
              />
            </motion.div>
          </TiltCard>

          {/* Tech/Skills Grid Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1 md:row-span-2 bg-[#f1f5f9] rounded-[2rem] p-6 flex flex-col"
          >
            <span className="text-slate-400 font-black uppercase tracking-widest text-xs mb-4 block text-center">Core Tech Stack</span>
            <div className="grid grid-cols-3 gap-3 flex-1">
              {skillIcons.map((skill, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`flex items-center justify-center text-3xl rounded-2xl ${skill.color} aspect-square shadow-sm transition-all`}
                >
                  {skill.icon}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Scale Metric 1 */}
          <TiltCard className="md:col-span-1 md:row-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="w-full h-full bg-[#0ea5e9] rounded-[2rem] p-6 relative overflow-hidden flex flex-col justify-between group"
            >
              <FiServer className="text-white/20 text-7xl absolute -bottom-4 -right-4 rotate-12 group-hover:rotate-0 transition-transform" />
              <span className="text-white/80 font-black uppercase tracking-widest text-[10px] block">Scale reached</span>
              <div className="relative z-10" style={{ transform: "translateZ(35px)" }}>
                <h3 className="text-4xl font-black text-white tracking-tighter leading-none mb-1">
                  <CountUp to={25} suffix="%" delay={0.4} />
                </h3>
                <p className="text-white font-bold text-sm leading-tight opacity-90">Efficiency boost at DispatchTrack</p>
              </div>
            </motion.div>
          </TiltCard>

          {/* Scale Metric 2 */}
          <TiltCard className="md:col-span-1 md:row-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="w-full h-full bg-[#f59e0b] rounded-[2rem] p-6 relative overflow-hidden flex flex-col justify-between group"
            >
              <FiTrendingUp className="text-black/10 text-7xl absolute -bottom-4 -right-4 -rotate-12 group-hover:rotate-0 transition-transform" />
              <span className="text-black/60 font-black uppercase tracking-widest text-[10px] block">Tech Growth</span>
              <div className="relative z-10" style={{ transform: "translateZ(35px)" }}>
                <h3 className="text-4xl font-black text-black tracking-tighter leading-none mb-1">
                  <CountUp to={30} suffix="%" delay={0.5} />
                </h3>
                <p className="text-black font-bold text-sm leading-tight opacity-90">UI efficiency at Saayam</p>
              </div>
            </motion.div>
          </TiltCard>

          {/* Career Timeline Proportional Bar (Contribution Graph Style) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="md:col-span-3 lg:col-span-4 bg-white rounded-[2rem] p-8 border-2 border-slate-100 flex flex-col gap-8 mb-12"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="flex-shrink-0">
                <h4 className="text-slate-400 font-black uppercase tracking-widest text-xs mb-1">{"Career Timeline"}</h4>
                <div className="h-1 w-12 bg-blue-600 rounded-full" />
              </div>
              <div className="flex items-center gap-1.5 overflow-hidden">
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Scale</span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-2.5 h-2.5 rounded-sm bg-slate-100" />
                  ))}
                </div>
              </div>
            </div>

            {/* The multi-dense contribution-style grid */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-1 md:gap-1.5 justify-center md:justify-start">
                {[
                  ...Array(72).fill({ name: "DispatchTrack", color: "#0ea5e9" }),
                  ...Array(72).fill({ name: "SFBU (Masters)", color: "#8b5cf6" }),
                  ...Array(15).fill({ name: "Saayam", color: "#f59e0b" }),
                  ...Array(66).fill({ name: "Oatmeal AI", color: "#10b981" })
                ].map((month, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.002 * i, duration: 0.15 }}
                    style={{ backgroundColor: month.color }}
                    className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-[2px] shadow-sm cursor-help hover:brightness-110 active:scale-95 transition-all"
                    title={month.name}
                  />
                ))}
              </div>
              <div className="flex justify-between items-center text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] px-1">
                <span>Dec 2020</span>
                <span className="h-px flex-1 mx-4 bg-slate-100" />
                <span>Present</span>
              </div>
            </div>

            {/* Legend / Timeline Labels */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { name: "DispatchTrack", color: "#0ea5e9", year: "2020-22" },
                { name: "S.F. Bay Univ.", color: "#8b5cf6", year: "2023-24" },
                { name: "Saayam", color: "#f59e0b", year: "2024" },
                { name: "Oatmeal AI", color: "#10b981", year: "2024-Present" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[10px] font-black text-slate-800 uppercase tracking-tighter whitespace-nowrap">{item.name}</span>
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] pl-5">{item.year}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Footer quote like the bottom text in Image 1 */}
        <div className="mt-12 text-center">
          <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4">
          </p>
        </div>
      </div>
    </section>
  );
}
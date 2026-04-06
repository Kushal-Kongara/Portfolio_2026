"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiCode, FiClock } from "react-icons/fi";

interface WakaData {
  configured: boolean;
  totalHours?: number;
  dailyAvgHours?: number;
  topLanguage?: string;
  topProject?: string;
}

export default function WakaTimeBar() {
  const [data, setData] = useState<WakaData | null>(null);

  useEffect(() => {
    fetch("/api/wakatime")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  if (!data || !data.configured) return null;

  const stats = [
    { label: "This week", value: `${data.totalHours}h coded`, icon: <FiClock className="text-[#f97316]" /> },
    { label: "Daily avg", value: `${data.dailyAvgHours}h/day`, icon: <FiCode className="text-[#f97316]" /> },
    { label: "Top language", value: data.topLanguage ?? "—", icon: <span className="text-[#f97316] text-xs font-black">{`</>`}</span> },
    { label: "Top project", value: data.topProject ?? "—", icon: <span className="text-[#f97316] text-xs">📁</span> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white border-2 border-slate-100 rounded-[2rem] p-6 md:p-8 shadow-sm"
    >
      <div className="flex items-center gap-2 mb-5">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Coding Activity</span>
        <span className="text-slate-200 text-xs">·</span>
        <span className="text-[10px] font-black text-[#f97316] uppercase tracking-widest flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] animate-pulse inline-block" />
          via WakaTime · Last 7 days
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="flex flex-col gap-1"
          >
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase tracking-widest font-black">
              {s.icon}
              {s.label}
            </div>
            <p className="text-slate-900 font-black text-base md:text-lg leading-none">{s.value}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiGitCommit } from "react-icons/fi";

interface GitEvent {
  repo: string;
  message: string;
  date: string;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function GitHubActivity() {
  const [events, setEvents] = useState<GitEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then((d) => {
        setEvents(d.events ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-[#0d1117] rounded-[2rem] p-6 md:p-8 border border-white/5 font-mono"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <FiGithub className="text-white text-lg" />
        <span className="text-white font-black text-xs uppercase tracking-widest">Live GitHub Activity</span>
        <span className="ml-auto flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400 text-[10px] font-bold uppercase tracking-widest">Kushal-Kongara</span>
        </span>
      </div>

      {/* Events */}
      <div className="flex flex-col gap-3">
        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-3 items-start animate-pulse">
              <div className="w-3 h-3 rounded-full bg-white/10 mt-1 shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div className="h-2.5 bg-white/10 rounded w-3/4" />
                <div className="h-2 bg-white/5 rounded w-1/2" />
              </div>
            </div>
          ))}

        {!loading && events.length === 0 && (
          <p className="text-white/30 text-xs">No recent push events found.</p>
        )}

        {!loading &&
          events.map((ev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex gap-3 items-start group"
            >
              <FiGitCommit className="text-[#f97316] mt-0.5 shrink-0 text-sm" />
              <div className="flex-1 min-w-0">
                <p className="text-white/80 text-[11px] leading-snug truncate group-hover:text-white transition-colors">
                  {ev.message}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[#f97316]/70 text-[10px]">{ev.repo}</span>
                  <span className="text-white/20 text-[9px]">·</span>
                  <span className="text-white/30 text-[10px]">{timeAgo(ev.date)}</span>
                </div>
              </div>
            </motion.div>
          ))}
      </div>

      {/* Footer link */}
      <a
        href="https://github.com/Kushal-Kongara"
        target="_blank"
        rel="noreferrer"
        className="mt-5 flex items-center gap-1.5 text-[10px] font-black text-white/30 uppercase tracking-widest hover:text-[#f97316] transition-colors"
      >
        View all on GitHub
        <span>→</span>
      </a>
    </motion.div>
  );
}

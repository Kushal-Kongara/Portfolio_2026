"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface SpotifyData {
  configured: boolean;
  isPlaying?: boolean;
  title?: string;
  artist?: string;
  albumArt?: string;
  songUrl?: string;
}

export default function SpotifyWidget() {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [expanded, setExpanded] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchData = () => {
    fetch("/api/spotify")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  };

  useEffect(() => {
    fetchData();
    intervalRef.current = setInterval(fetchData, 30000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  if (!data || !data.configured || (!data.title && !data.isPlaying)) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <AnimatePresence mode="wait">
        {!expanded ? (
          /* Collapsed pill */
          <motion.button
            key="pill"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setExpanded(true)}
            className="flex items-center gap-2.5 bg-[#111111] text-white px-4 py-2.5 rounded-full border-2 border-white/10 shadow-2xl hover:border-[#1DB954]/50 transition-all group max-w-[220px]"
          >
            {/* Spotify bars / pulse */}
            <div className="flex items-end gap-[2px] shrink-0">
              {[1, 0.5, 0.8].map((h, i) => (
                <motion.span
                  key={i}
                  className="w-[3px] bg-[#1DB954] rounded-full"
                  animate={data.isPlaying ? { scaleY: [h, 1, h * 0.4, 1, h] } : { scaleY: 0.3 }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
                  style={{ height: 14, transformOrigin: "bottom" }}
                />
              ))}
            </div>

            <div className="min-w-0 text-left">
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-black leading-none mb-0.5">
                {data.isPlaying ? "Now Playing" : "Last Played"}
              </p>
              <p className="text-[11px] font-bold truncate leading-none">{data.title}</p>
            </div>
          </motion.button>
        ) : (
          /* Expanded card */
          <motion.div
            key="card"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="bg-[#111111] border border-white/10 rounded-2xl shadow-2xl p-4 w-64"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">
                {data.isPlaying ? "🎵 Now Playing" : "⏸ Last Played"}
              </span>
              <button
                onClick={() => setExpanded(false)}
                className="text-white/30 hover:text-white text-xs transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="flex gap-3 items-center">
              {data.albumArt && (
                <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 shadow-lg">
                  <Image src={data.albumArt} alt={data.title ?? ""} fill className="object-cover" />
                </div>
              )}
              <div className="min-w-0">
                <a
                  href={data.songUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white font-bold text-sm leading-tight hover:text-[#1DB954] transition-colors line-clamp-2 block"
                >
                  {data.title}
                </a>
                <p className="text-white/50 text-xs mt-0.5 truncate">{data.artist}</p>
              </div>
            </div>

            {/* Spotify bars */}
            {data.isPlaying && (
              <div className="flex items-end gap-[3px] mt-3 justify-center">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.span
                    key={i}
                    className="w-[3px] bg-[#1DB954] rounded-full"
                    animate={{ scaleY: [Math.random(), 1, Math.random() * 0.3, 1] }}
                    transition={{ duration: 0.8 + Math.random() * 0.8, repeat: Infinity, delay: i * 0.05 }}
                    style={{ height: 20, transformOrigin: "bottom" }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

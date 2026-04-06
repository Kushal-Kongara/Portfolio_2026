"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Cinematic wipe — black curtain rises, shows name, reveals page */}
      <motion.div
        className="fixed inset-0 z-[9998] bg-[#0a0a0a] flex flex-col items-center justify-center pointer-events-none overflow-hidden"
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
      >
        {/* Horizontal scan lines for film feel */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 3px)", backgroundSize: "100% 3px" }}
        />

        {/* Corner marks — like a film frame */}
        {[
          "top-6 left-6 border-t-2 border-l-2",
          "top-6 right-6 border-t-2 border-r-2",
          "bottom-6 left-6 border-b-2 border-l-2",
          "bottom-6 right-6 border-b-2 border-r-2",
        ].map((cls, i) => (
          <div key={i} className={`absolute w-8 h-8 border-white/20 ${cls}`} />
        ))}

        {/* Center content — name reveal */}
        <motion.div
          className="text-center relative z-10"
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: [0, 1, 1, 0], letterSpacing: ["0.5em", "0.15em", "0.15em", "0.5em"] }}
          transition={{ duration: 0.9, times: [0, 0.2, 0.7, 1] }}
        >
          <p className="text-white/30 text-[10px] font-black tracking-[0.6em] uppercase mb-4">
            Portfolio
          </p>
          <h1
            className="text-[#ff5500] text-[clamp(3rem,10vw,7rem)] font-black leading-none"
            style={{ fontFamily: "Impact, system-ui, sans-serif" }}
          >
            KUSHAL
          </h1>
          <h2
            className="text-white text-[clamp(1rem,3vw,2rem)] font-black tracking-[0.4em] uppercase mt-1"
            style={{ fontFamily: "Impact, system-ui, sans-serif" }}
          >
            KONGARA
          </h2>
        </motion.div>

        {/* Bottom loading bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-[3px] bg-[#ff5500]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.5, ease: "linear" }}
        />
      </motion.div>

      {/* Page content fades in after curtain lifts */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.9 }}
      >
        {children}
      </motion.div>
    </>
  );
}

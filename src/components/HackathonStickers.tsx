"use client";

import { motion } from "framer-motion";

export const GitHubSticker = () => (
  <motion.div
    animate={{ rotate: [0, 5, -5, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    className="w-full h-full flex items-center justify-center p-4 bg-[#24292e] text-white rounded-2xl relative overflow-hidden"
  >
    <div className="absolute top-2 right-2 text-[8px] font-mono opacity-50 uppercase tracking-widest">
      STAMPED 2026
    </div>
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 24 24" className="w-12 h-12 fill-current">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
      <span className="text-sm font-black uppercase tracking-tighter text-center leading-none">
        GITHUB<br />HACKATHON<br />WINNER
      </span>
    </div>
  </motion.div>
);

export const AWSSticker = () => (
  <motion.div
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    className="w-full h-full flex flex-col items-center justify-center p-6 bg-[#FF9900] text-black rounded-2xl relative"
  >
    <div className="absolute top-2 left-2 text-[6px] font-black border border-black px-1 rounded">BUILDER</div>
    <div className="text-3xl font-black italic tracking-tighter mb-1 select-none">AWS</div>
    <div className="text-[10px] font-black border-t-2 border-black pt-1 uppercase tracking-widest text-center">
      Certified<br />Innovator
    </div>
  </motion.div>
);

export const StampedBadge = () => (
  <motion.div
    animate={{ rotate: -5, scale: [1, 1.05, 1] }}
    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
    className="w-full h-full flex items-center justify-center p-4 bg-[#DE1A58] text-white rounded-full relative shadow-lg"
  >
    <div className="absolute inset-2 border-2 border-dashed border-white/30 rounded-full" />
    <span className="text-xl font-black italic tracking-tighter uppercase text-center leading-tight [font-family:Impact,sans-serif]">
      STAMPED<br />BY KUSHAL
    </span>
  </motion.div>
);



export const SaveSticker = () => (
  <motion.div
    animate={{
      y: [0, -5, 0],
      rotate: [0, 1, -1, 0]
    }}
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    className="w-full h-full flex items-center justify-center p-2"
  >
    <div className="w-[85%] aspect-square bg-[#A7F3D0] border-[3px] border-black rounded-xl p-2 flex flex-col relative shadow-[6px_6px_0px_#000]">
      {/* Floppy Top Window */}
      <div className="w-[70%] h-[35%] bg-white border-[3px] border-black ml-auto mr-1 rounded-sm relative">
        <div className="absolute right-2 top-1 bottom-1 w-4 bg-black rounded-sm" />
      </div>

      {/* Floppy Label */}
      <div className="mt-auto mb-2 w-full h-[40%] bg-white border-[3px] border-black flex flex-col items-center justify-center p-1 text-center">
        <span className="text-[7px] font-black leading-tight uppercase text-black">DON'T<br />FORGET TO</span>
        <span className="text-xs font-black uppercase text-black [font-family:Impact,sans-serif]">SAVE!</span>
      </div>
    </div>
  </motion.div>
);

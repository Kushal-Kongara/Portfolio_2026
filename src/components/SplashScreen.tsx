"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["Hello", "Bonjour", "నమస్కారం", "Ciao", "こんにちは", "Hola", "Merhaba", "Olá"];

const DURATIONS = words.map((_, i) =>
  i === 0 ? 1100 : i === words.length - 1 ? 900 : 230
);

export default function SplashScreen({ onDone }: { onDone: () => void }) {
  const [index, setIndex] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (index === words.length - 1) {
      const t = setTimeout(() => setExiting(true), DURATIONS[index]);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setIndex((p) => p + 1), DURATIONS[index]);
    return () => clearTimeout(t);
  }, [index, onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] bg-[#0c0c0c] overflow-hidden"
      animate={exiting ? { y: "-100%" } : { y: 0 }}
      transition={
        exiting
          ? { duration: 0.9, ease: [0.76, 0, 0.24, 1], onComplete: onDone }
          : {}
      }
    >
      {/* Subtle noise grain */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Centered word */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="overflow-hidden"
            initial={false}
          >
            <motion.span
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%",   opacity: 1 }}
              exit={{    y: "-100%", opacity: 0 }}
              transition={{
                y:       { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.3,  ease: "easeOut" },
              }}
              className="block text-white font-bold select-none"
              style={{
                fontSize: "clamp(3rem, 6.5vw, 5.5rem)",
                fontFamily: "var(--font-dm-sans), sans-serif",
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
              }}
            >
              {words[index]}
            </motion.span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom line that fills like a progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-white/20"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: DURATIONS.reduce((a, b) => a + b, 0) / 1000, ease: "linear" }}
      />
    </motion.div>
  );
}

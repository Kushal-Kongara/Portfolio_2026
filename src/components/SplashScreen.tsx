"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["Hello", "Bonjour", "నమస్కారం", "Ciao", "こんにちは", "Hola", "Merhaba", "Olá"];

const DURATIONS = words.map((_, i) =>
  i === 0 ? 1000 : i === words.length - 1 ? 800 : 260
);

export default function SplashScreen({ onDone }: { onDone: () => void }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index === words.length - 1) {
      const t = setTimeout(onDone, DURATIONS[index]);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setIndex((p) => p + 1), DURATIONS[index]);
    return () => clearTimeout(t);
  }, [index, onDone]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-white overflow-hidden"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0,  filter: "blur(0px)"  }}
          exit={{    opacity: 0, y: -30, filter: "blur(10px)" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute text-black font-bold select-none"
          style={{
            fontSize: "clamp(2.8rem, 6vw, 5rem)",
            fontFamily: "var(--font-dm-sans), sans-serif",
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
}

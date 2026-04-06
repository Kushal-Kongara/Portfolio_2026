"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["Hello", "Bonjour", "Ciao", "Olá", "やあ", "Hallå", "Hola"];

export default function SplashScreen({ onDone }: { onDone: () => void }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index === words.length - 1) {
      const timer = setTimeout(onDone, 900);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(
      () => setIndex((p) => p + 1),
      index === 0 ? 900 : 180
    );
    return () => clearTimeout(timer);
  }, [index, onDone]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-white"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="text-black font-bold tracking-tight select-none"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontFamily: "var(--font-dm-sans), sans-serif",
            letterSpacing: "-0.02em",
          }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = [
  { text: "Hello",         lang: "English"    },
  { text: "Bonjour",       lang: "French"     },
  { text: "నమస్కారం",     lang: "Telugu"     },
  { text: "Ciao",          lang: "Italian"    },
  { text: "こんにちは",    lang: "Japanese"   },
  { text: "Hola",          lang: "Spanish"    },
  { text: "Merhaba",       lang: "Turkish"    },
  { text: "Olá",           lang: "Portuguese" },
];

// First word longer, rest quick, last word held before exit
const DURATIONS = words.map((_, i) =>
  i === 0 ? 1100 : i === words.length - 1 ? 900 : 220
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
      exit={{
        opacity: 0,
        transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
      }}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-white gap-3"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20, filter: "blur(12px)", scale: 0.97 }}
          animate={{ opacity: 1, y: 0,  filter: "blur(0px)",  scale: 1    }}
          exit={{    opacity: 0, y: -20, filter: "blur(12px)", scale: 0.97 }}
          transition={{
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="flex flex-col items-center gap-2"
        >
          <span
            className="text-black font-bold tracking-tight select-none leading-none"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              fontFamily: "var(--font-dm-sans), sans-serif",
              letterSpacing: "-0.03em",
            }}
          >
            {words[index].text}
          </span>
          <span
            className="text-black/25 font-medium select-none"
            style={{
              fontSize: "clamp(0.6rem, 1vw, 0.75rem)",
              fontFamily: "var(--font-dm-sans), sans-serif",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            {words[index].lang}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Progress dots */}
      <div className="absolute bottom-10 flex gap-1.5 items-center">
        {words.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              width:            i === index ? 20 : 4,
              backgroundColor:  i === index ? "#000000" : "#d1d5db",
              opacity:          i < index   ? 0.3       : 1,
            }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="h-[3px] rounded-full"
          />
        ))}
      </div>
    </motion.div>
  );
}

"use client";

import { useScroll, useSpring, motion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-[#ff5500] origin-left z-[9999] pointer-events-none"
      style={{ scaleX }}
    />
  );
}

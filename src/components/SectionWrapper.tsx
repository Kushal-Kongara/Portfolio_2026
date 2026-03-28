"use client";

import { motion } from "framer-motion";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function SectionWrapper({
  children,
  className = "",
  id,
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Premium easing (Ease Out Expo)
        delay: 0.1
      }}
      className={`max-w-6xl mx-auto px-6 py-12 md:py-20 ${className}`}
    >
      {children}
    </motion.section>
  );
}

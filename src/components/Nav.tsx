"use client";

import { motion } from "framer-motion";
import { navLinks } from "@/lib/constants";

export default function Nav() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-black/5"
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#hero"
          className="text-black font-bold text-lg tracking-tight hover:text-orange-base transition-colors flex items-center gap-2.5"
        >
          Portfolio
          <span className="flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
            Open to work
          </span>
        </a>
        <ul className="flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-black font-medium text-sm hover:text-orange-base transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}

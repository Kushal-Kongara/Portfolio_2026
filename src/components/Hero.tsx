"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function Hero() {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="hero"
      className="relative w-full h-[100svh] min-h-[600px] bg-white overflow-hidden flex flex-col justify-between pt-10 pb-16 px-6 lg:px-12 selection:bg-[#ff5500] selection:text-white"
    >

      {/* Giant Background Text & Sub Titles */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none select-none overflow-hidden pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-between w-full max-w-[85%] md:max-w-[75%] lg:max-w-[65%] z-20 relative text-[#ff5500] font-black tracking-widest text-[10px] sm:text-xs md:text-sm lg:text-base uppercase mb-2 md:mb-6"
        >
          <span>Software Engineer</span>
          <span>Full Stack Developer</span>
          <span>AI Engineer</span>
        </motion.div>

        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-[30vw] md:text-[32vw] font-black text-[#ff5500] leading-none tracking-tighter"
          style={{
            fontFamily: "Impact, system-ui, sans-serif",
            transform: "scaleY(1.3)",
            WebkitTextStroke: "2px #ff5500"
          }}
        >
          KUSHAL
        </motion.h1>
      </div>

      {/* Interactive Speech Bubble */}
      <motion.div
        initial={{ scale: 0, rotate: 10 }}
        animate={{ scale: 1, rotate: -5 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.8 }}
        className="absolute top-[28%] right-[8%] md:right-[15%] lg:right-[22%] z-30"
      >
        <div className="bg-white border-[3px] border-black text-black font-black px-6 py-2 md:px-8 md:py-3 rounded-full text-lg md:text-2xl shadow-[4px_4px_0px_#000] relative cursor-pointer hover:scale-110 transition-transform">
          Developer
          {/* Bubble tail */}
          <div className="absolute -bottom-[14px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[14px] border-t-black">
            <div className="absolute -top-[17px] -left-[6px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] border-t-white" />
          </div>
        </div>
      </motion.div>

      {/* Hero Graphic / Characters Placeholder */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        className="absolute bottom-0 right-0 z-20 w-full md:w-[80%] lg:w-[60%] h-[80%] pointer-events-none flex items-end justify-end md:pr-4 lg:pr-8"
      >
        <div className="relative w-full h-full">
          {!imgError && (
            <Image
              src="/hero-characters.png"
              alt="Hero Characters"
              fill
              className="object-contain object-right-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
              onError={() => setImgError(true)}
              priority
            />
          )}
          {imgError && (
            <div className="absolute bottom-10 right-10 flex flex-col items-end gap-2 text-right">
              <div className="bg-black text-white px-4 py-2 font-mono text-xs rounded shadow-lg pointer-events-auto">
                PLACEHOLDER: Add your character graphic here
              </div>
              <code className="bg-white text-black border border-black/20 px-2 py-1 text-[10px] rounded shadow pointer-events-auto">public/hero-characters.png</code>
            </div>
          )}
        </div>
      </motion.div>

      {/* Bottom Text */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative z-20 w-full max-w-7xl mx-auto flex items-end h-full"
      >
        <p className="max-w-[280px] md:max-w-md text-[#ff5500] text-[10px] md:text-xs leading-relaxed font-bold tracking-wide">
          The founder has always believed that "everyone should learn to be happy and happy". There are many disappointments in life, but living in the present should enjoy the present instead of being overwhelmed by pessimism.
        </p>
      </motion.div>
    </section>
  );
}

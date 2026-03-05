"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import SectionWrapper from "./SectionWrapper";
import { about, events, photoStories, type PhotoStory } from "@/lib/constants";

function MomentCard({ story, className = "" }: { story: PhotoStory; className?: string }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      className={`group relative overflow-hidden bg-gray-200 cursor-pointer shadow-sm hover:shadow-xl transition-all w-full h-full ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      {!imgError && (
        <Image
          src={story.image}
          alt={story.imageAlt}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={() => setImgError(true)}
        />
      )}

      {/* Dark gradient overlay that animates in on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out flex flex-col justify-end p-6 md:p-8">
        <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <h4 className="text-2xl font-bold text-white mb-3 tracking-tight">{story.title}</h4>
          <p className="text-slate-200 text-sm md:text-base leading-relaxed">{story.context}</p>
        </div>
      </div>

      {imgError && (
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <span className="text-gray-500 text-sm text-center">
            Add photo to <code className="bg-gray-300 px-1 rounded mx-1">public{story.image}</code>
          </span>
        </div>
      )}
    </motion.div>
  );
}

function IDBadge() {
  const [imgError, setImgError] = useState(false);
  const badgeRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: badgeRef,
    offset: ["start end", "end start"]
  });

  // Smoothly sway and translate the lanyard badge as you scroll down
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-12, 0, 12]);
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <motion.div
      ref={badgeRef}
      style={{ rotate, y }}
      className="relative flex flex-col items-center select-none w-full max-w-[320px] mx-auto lg:mx-0 pt-6 origin-top"
    >
      {/* Lanyard strap */}
      <div className="absolute -top-12 w-14 h-32 md:h-40 bg-[#ff5500] z-0 origin-top"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.4) 10px, rgba(255,255,255,0.4) 20px)",
          boxShadow: "inset 0 0 10px rgba(0,0,0,0.1), 2px 0 10px rgba(0,0,0,0.1)"
        }}
      />

      {/* Metal Clip */}
      <div className="absolute top-12 md:top-20 z-10 w-12 h-20 flex flex-col items-center">
        <svg viewBox="0 0 100 150" className="w-full h-full drop-shadow-md text-slate-400 fill-current">
          <path d="M 25,0 L 75,0 C 85,0 90,10 90,20 L 75,50 L 60,50 L 60,80 C 60,95 55,100 50,100 C 45,100 40,95 40,80 L 40,50 L 25,50 L 10,20 C 10,10 15,0 25,0 Z" />
          <path d="M 50,100 L 50,130" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
          <path d="M 40,140 Q 50,160 60,140" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
        </svg>
      </div>

      <motion.div
        className="w-full aspect-[1/1.58] bg-[#111] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-6 pb-8 flex flex-col items-center border border-gray-800 z-20 relative overflow-hidden mt-20"
        initial={{ rotate: -5, y: 50, opacity: 0 }}
        whileInView={{ rotate: [-5, 3, -1, 0, -2], y: 0, opacity: 1 }}
        transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
        viewport={{ once: true }}
      >
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'20\\' height=\\'20\\' viewBox=\\'0 0 20 20\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'1\\' fill-rule=\\'evenodd\\'%3E%3Ccircle cx=\\'3\\' cy=\\'3\\' r=\\'1\\'/%3E%3Ccircle cx=\\'13\\' cy=\\'13\\' r=\\'1\\'/%3E%3C/g%3E%3C/svg%3E')" }} />

        {/* Top punch hole */}
        <div className="w-16 h-3 bg-white rounded-full mb-6 shadow-inner border border-gray-200/50" />

        {/* Title / Agency Name */}
        <div className="text-center mb-6 relative z-10 w-full">
          <h3 className="text-[#ff5500] font-serif italic text-3xl md:text-3xl leading-none">Creative<br /><span className="text-4xl md:text-4xl ml-4">Studio</span></h3>
        </div>

        <div className="w-[60%] aspect-[3/4] bg-[#222] rounded-xl overflow-hidden relative mb-6 shadow-inner border-[3px] border-[#333] z-10 group">
          {!imgError && (
            <Image
              src="/profile.jpg"
              alt="Profile photo"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          )}
          {imgError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-[#222]">
              <span className="text-gray-500 text-xs text-center font-mono">ADD PHOTO</span>
              <span className="text-gray-500 text-[10px] text-center font-mono mt-1 px-2 py-1 bg-black rounded">public/profile.jpg</span>
            </div>
          )}
        </div>

        <div className="text-center font-bold text-white text-lg uppercase tracking-[0.2em] mb-1 z-10">KUSHAL K.</div>
        <div className="text-center text-gray-400 font-medium text-sm mb-6 z-10">Full Stack Developer</div>

        {/* Barcode */}
        <div className="w-full h-10 opacity-80 z-10 flex"
          style={{
            backgroundImage: "repeating-linear-gradient(to right, #ff5500, #ff5500 3px, transparent 3px, transparent 6px, #ff5500 6px, #ff5500 8px, transparent 8px, transparent 14px, #ff5500 14px, #ff5500 18px, transparent 18px, transparent 24px, #ff5500 24px, #ff5500 25px, transparent 25px, transparent 30px)"
          }}
        />
      </motion.div>
    </motion.div >
  );
}


export default function About() {
  return (
    <>
      <div
        className="w-full relative"
        style={{
          backgroundColor: "#3A9AFF",
          backgroundImage: "url('/about-pattern.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "220px 220px"
        }}
      >
        <SectionWrapper id="about" className="py-8 lg:py-10 flex flex-col justify-center">
          {/* Intro */}
          <motion.h2
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-[12vw] md:text-[5rem] lg:text-[6.5rem] font-black text-black uppercase tracking-tighter leading-none mb-4 md:mb-6 mt-4 text-left origin-left"
            style={{
              fontFamily: "Impact, system-ui, sans-serif",
              transform: "scaleY(1.2)",
              WebkitTextStroke: "2px black"
            }}
          >
            ABOUT ME
          </motion.h2>

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center justify-between mb-4">
            {/* Left: ID Badge container */}
            <div className="w-full lg:w-[45%] flex justify-center lg:justify-center">
              <IDBadge />
            </div>

            {/* Right: Intro Text inside Retro Window */}
            <motion.div
              initial={{ opacity: 0, rotate: -2, y: 20 }}
              whileInView={{ opacity: 1, rotate: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
              className="w-full lg:w-[55%] bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-300 flex flex-col"
            >
              {/* Window Top Bar */}
              <div className="w-full bg-[#0cae67] border-b-[3px] border-black px-3 py-2 flex justify-end items-center gap-2">
                <div className="w-6 h-6 bg-white border-[2px] border-black flex items-center justify-center font-bold text-black text-xs leading-none pt-1 cursor-default hover:bg-gray-100 transition-colors">_</div>
                <div className="w-6 h-6 bg-white border-[2px] border-black flex items-center justify-center font-bold text-black text-[10px] cursor-default hover:bg-gray-100 transition-colors">□</div>
                <div className="w-6 h-6 bg-white border-[2px] border-black flex items-center justify-center font-bold text-black text-sm leading-none cursor-default hover:bg-gray-100 transition-colors">×</div>
              </div>

              {/* Window Content */}
              <div className="p-6 md:p-8 space-y-6">
                {about.intro.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-black text-lg md:text-xl leading-relaxed font-medium"
                  >
                    {paragraph.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
                      part.startsWith("**") && part.endsWith("**") ? (
                        <span key={j} className="text-[#ff5500] font-black">
                          {part.slice(2, -2)}
                        </span>
                      ) : (
                        part
                      )
                    )}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>
        </SectionWrapper>
      </div>

      <div className="w-full bg-[#F2B50B]">
        <SectionWrapper id="events" className="min-h-screen flex flex-col justify-center">
          {/* Events & Hackathons */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between gap-4 mb-8 md:mb-12 mt-16"
          >
            <h2
              className="text-[12vw] md:text-[5rem] lg:text-[6.5rem] font-black text-[#DE1A58] uppercase tracking-tighter leading-none text-left origin-left"
              style={{
                fontFamily: "Impact, system-ui, sans-serif",
                transform: "scaleY(1.2)",
                WebkitTextStroke: "2px #DE1A58"
              }}
            >
              EVENTS & HACKATHONS
            </h2>
            <div className="hidden md:block relative w-[160px] h-[120px] lg:w-[220px] lg:h-[160px]">
              <Image
                src="/hackathon-character.png"
                alt="Developer illustration"
                fill
                className="object-contain drop-shadow-[0_14px_35px_rgba(0,0,0,0.35)]"
                priority
              />
            </div>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full md:h-[400px] lg:h-[500px]">
            {/* Left Half */}
            <div className="flex-1 flex flex-col gap-2 md:gap-4">
              {photoStories[0] && (
                <MomentCard story={photoStories[0]} className="h-[300px] md:h-auto md:flex-[55] rounded-xl" />
              )}
              <div className="h-[150px] md:h-auto md:flex-[45] flex flex-row gap-2 md:gap-4">
                {photoStories[1] && <MomentCard story={photoStories[1]} className="flex-1 rounded-xl" />}
                {photoStories[2] && <MomentCard story={photoStories[2]} className="flex-1 rounded-xl" />}
              </div>
            </div>

            {/* Right Half */}
            <div className="flex-1 flex flex-col gap-2 md:gap-4">
              <div className="h-[150px] md:h-auto md:flex-[35] flex flex-row gap-2 md:gap-4">
                {photoStories[3] && <MomentCard story={photoStories[3]} className="flex-1 rounded-xl" />}
                {photoStories[4] && <MomentCard story={photoStories[4]} className="flex-1 rounded-xl" />}
              </div>
              <div className="h-[300px] md:h-auto md:flex-[65] flex flex-row gap-2 md:gap-4">
                {photoStories[5] && <MomentCard story={photoStories[5]} className="flex-1 rounded-xl" />}
                {photoStories[6] && <MomentCard story={photoStories[6]} className="flex-1 rounded-xl" />}
              </div>
            </div>
          </div>
        </SectionWrapper>
      </div>
    </>
  );
}

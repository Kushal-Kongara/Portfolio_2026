"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import SectionWrapper from "./SectionWrapper";
import { about, events, photoStories, type PhotoStory } from "@/lib/constants";

function MomentCard({ story, className = "", delay = 0 }: { story: PhotoStory; className?: string; delay?: number }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      className={`group relative overflow-hidden bg-gray-200 cursor-pointer shadow-sm hover:shadow-xl transition-all w-full h-full ${className}`}
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
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

function BadgeCreativeStudio({ imgError, setImgError }: { imgError: boolean; setImgError: (v: boolean) => void }) {
  return (
    <div className="w-full h-full p-5 pb-6 flex flex-col items-center relative">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'20\\' height=\\'20\\' viewBox=\\'0 0 20 20\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'%23000000\\' fill-opacity=\\'1\\' fill-rule=\\'evenodd\\'%3E%3Ccircle cx=\\'3\\' cy=\\'3\\' r=\\'1\\'/%3E%3Ccircle cx=\\'13\\' cy=\\'13\\' r=\\'1\\'/%3E%3C/g%3E%3C/svg%3E')" }} />

      {/* Top punch hole */}
      <div className="w-16 h-3 bg-gray-100 rounded-full mb-6 shadow-inner border border-gray-300" />

      {/* Title / Agency Name */}
      <div className="text-center mb-4 relative z-10 w-full">
        <h3 className="text-[#ff5500] font-serif italic text-2xl md:text-2xl leading-none">Creative<br /><span className="text-3xl md:text-3xl ml-4">Studio</span></h3>
      </div>

      <div className="w-[60%] aspect-[3/4] bg-gray-200 rounded-xl overflow-hidden relative mb-4 shadow-inner border-[3px] border-gray-300 z-10 group">
        {!imgError && (
          <Image
            src="/profile.jpg"
            alt="Profile photo"
            fill
            className="object-cover"
            onError={() => setImgError(true)}
          />
        )}
        {imgError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gray-200">
            <span className="text-gray-500 text-xs text-center font-mono">PHOTO</span>
          </div>
        )}
      </div>

      <div className="text-center font-bold text-black text-base uppercase tracking-[0.2em] mb-1 z-10 font-[Impact]">KUSHAL K.</div>
      <div className="text-center text-gray-500 font-medium text-[10px] mb-4 z-10 uppercase tracking-widest">Full Stack Developer</div>

      {/* Barcode */}
      <div className="w-full h-8 opacity-80 z-10 flex"
        style={{
          backgroundImage: "repeating-linear-gradient(to right, #ff5500, #ff5500 3px, transparent 3px, transparent 6px, #ff5500 6px, #ff5500 8px, transparent 8px, transparent 14px, #ff5500 14px, #ff5500 18px, transparent 18px, transparent 24px, #ff5500 24px, #ff5500 25px, transparent 25px, transparent 30px)"
        }}
      />
    </div>
  );
}

function BadgeTylerLicense() {
  return (
    <div className="w-full h-full bg-[#fdf5e6] p-4 flex flex-col border-[2px] border-black relative overflow-hidden font-mono text-[10px] text-black">
      {/* Star border */}
      <div className="absolute inset-1 border-2 border-dotted border-black/20 pointer-events-none" />

      <div className="flex justify-between items-start mb-2 px-1 relative">
        <div className="uppercase font-bold text-[8px] leading-tight">Travel Stamps: 2021-Present</div>
        <div className="text-right uppercase font-bold text-[8px] leading-tight">Permanent License<br />Of Travel</div>
      </div>

      <div className="h-[2px] w-full bg-black/10 mb-4" />

      <div className="flex gap-4">
        <div className="w-[45%] aspect-[3/4] border-2 border-black bg-gray-300 relative overflow-hidden grayscale">
          <Image src="/profile.jpg" alt="Profile" fill className="object-cover" />
          <div className="absolute bottom-0 w-full bg-black/40 text-white text-[6px] text-center py-0.5">AUTH. TRAVELER</div>
        </div>

        <div className="flex-1 space-y-1.5 pt-1 uppercase">
          <div><span className="text-[7px] text-gray-500">Issued to:</span><br /><span className="font-bold border-b border-black/40 inline-block w-full">Kushal Kongara</span></div>
          <div><span className="text-[7px] text-gray-500">Date of Birth:</span><br /><span className="font-bold border-b border-black/40 inline-block w-full">02 / 10 / 1998</span></div>
          <div><span className="text-[7px] text-gray-500">Place of Issue:</span><br /><span className="font-bold border-b border-black/40 inline-block w-full">San Francisco, CA</span></div>
          <div className="mt-4 pt-1 border-t border-black/20 text-[8px] font-black italic text-center">CALL ME IF YOU GET LOST</div>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 right-4 h-12 flex items-center justify-center">
        <div className="text-[#DE1A58] text-4xl font-black rotate-[-12deg] opacity-40 select-none">IGOR</div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full border-2 border-[#DE1A58]/30 flex items-center justify-center text-[8px] text-[#DE1A58]/50 font-black rotate-12">LICENSED</div>
        </div>
      </div>
    </div>
  );
}

function BadgeNoIdeaClub() {
  return (
    <div className="w-full h-full bg-[#FAEB31] p-5 flex flex-col items-center relative overflow-hidden text-black font-sans">
      <div className="w-full flex justify-between items-baseline mb-4">
        <h4 className="font-black text-sm tracking-tight">No Idea Creative Club™</h4>
        <span className="text-[8px] font-mono">№ NIDC202611</span>
      </div>

      <div className="w-full flex gap-5 mb-4">
        <div className="w-32 aspect-square relative bg-white border-2 border-black overflow-hidden rotate-[-2deg]">
          <Image src="/profile.jpg" alt="Profile" fill className="object-cover grayscale hover:grayscale-0 transition-all" />
          {/* Yellow glasses sketch over eyes? Simple SVG */}
          <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-[80%] h-[20%] border-2 border-[#FAEB31] rounded-full flex gap-4 pointer-events-none">
            <div className="flex-1 border-2 border-[#FAEB31] rounded-full" />
            <div className="flex-1 border-2 border-[#FAEB31] rounded-full" />
          </div>
        </div>

        <div className="flex-1 text-[9px] uppercase font-bold space-y-1.5 pt-1">
          <div className="border-b border-black pb-0.5">Name: <span className="font-mono text-xs">Kushal</span></div>
          <div className="border-b border-black pb-0.5">DOB: <span className="font-mono text-xs">1998</span></div>
          <div className="border-b border-black pb-0.5">Issue: <span className="font-mono text-xs">SF, CA</span></div>
          <div className="border-b border-black pb-0.5">Role: <span className="font-mono text-xs text-[#DE1A58]">Genius</span></div>
        </div>
      </div>

      <div className="w-full flex items-end justify-between mt-auto">
        <div className="text-[7px] leading-tight max-w-[120px] font-medium italic">
          "This document grants full permission to explore ideas, create with purpose, and enjoy the process."
        </div>
        <div className="relative">
          <span className="font-serif italic text-xl">No Idea</span>
          <div className="absolute -top-1 -right-3 w-12 h-12 border-2 border-[#0cae67] rounded-full flex items-center justify-center rotate-[25deg] text-[8px] font-black text-[#0cae67] opacity-60">STAMPED</div>
        </div>
      </div>

      <div className="w-full h-4 mt-4 bg-black flex items-center justify-center p-1">
        <div className="w-full h-full bg-white flex" style={{ backgroundImage: "repeating-linear-gradient(to right, black, black 1px, transparent 1px, transparent 3px)" }} />
      </div>
    </div>
  );
}

function BadgeMarcJacobsISIC() {
  return (
    <div className="w-full h-full bg-[#E0F2F1] p-3 flex flex-col border border-gray-400 relative overflow-hidden font-sans text-black">
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-[#009688] flex flex-col justify-between items-center py-4 text-[6px] text-white font-bold tracking-[0.2em]">
        <div className="rotate-90 origin-center whitespace-nowrap">CARD NO: 061118</div>
        <div className="w-[1px] h-20 bg-white/30" />
        <div className="rotate-90 origin-center whitespace-nowrap">ISIC - 2026</div>
      </div>

      <div className="pl-10 h-full flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div className="text-[7px] font-black uppercase leading-tight text-[#009688]">International Student<br />Identity Card</div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-[#009688]/20 flex items-center justify-center text-[5px] font-bold italic">ISIC</div>
          </div>
        </div>

        <div className="flex gap-3 mb-2">
          <div className="w-20 aspect-[2/3] bg-gray-200 border border-black/10 relative overflow-hidden">
            <Image src="/profile.jpg" alt="Profile" fill className="object-cover sepia-[0.3]" />
          </div>
          <div className="flex-1 space-y-1.5 uppercase font-bold text-[8px]">
            <div><span className="text-[6px] text-gray-400 block tracking-tighter">Surname</span>KONGARA</div>
            <div><span className="text-[6px] text-gray-400 block tracking-tighter">First Names</span>KUSHAL</div>
            <div><span className="text-[6px] text-gray-400 block tracking-tighter">Born</span>02 / 10 / 1998</div>
            <div><span className="text-[6px] text-gray-400 block tracking-tighter">Nationality</span>INDIA</div>
          </div>
        </div>

        <div className="mt-auto flex justify-between items-end border-t border-dotted border-black/20 pt-2">
          <div className="text-[10px] font-serif italic opacity-70">Parsons School</div>
          <div className="bg-[#009688] text-white px-2 py-0.5 text-[7px] rounded-sm font-black italic">STUDENT</div>
        </div>
      </div>
    </div>
  );
}

function BadgeHeronPreston() {
  return (
    <div className="w-full h-full bg-[#eeeeee] p-6 flex flex-col relative overflow-hidden font-sans border-2 border-black">
      <div className="flex justify-between items-start mb-8">
        <div className="w-8 h-8 bg-[#ff5500] rounded-sm flex items-center justify-center text-white font-black text-xs">HP</div>
        <div className="text-right flex flex-col items-end">
          <span className="text-[8px] font-black uppercase tracking-widest">Pass Card</span>
          <span className="text-[6px] font-mono opacity-50">USA202675-HP</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <div className="flex gap-6">
          <div className="w-20 aspect-square bg-[#ff5500]/10 border border-black/5 relative overflow-hidden rounded-full">
            <Image src="/profile.jpg" alt="Profile" fill className="object-cover mix-blend-multiply opacity-80" />
            <div className="absolute inset-0 border-[3px] border-black/10 rounded-full" />
          </div>
          <div className="flex flex-col justify-center space-y-1 uppercase">
            <div className="text-[8px] text-[#ff5500] font-black tracking-tight underline italic">Brand: Heron Preston</div>
            <div className="text-[8px] font-black">Season: SS2026</div>
            <div className="text-[8px] font-black">Style: DEV_FULL_STACK</div>
          </div>
        </div>

        <div className="mt-auto space-y-3">
          <div className="flex items-center gap-2">
            <div className="bg-black text-white px-2 py-0.5 text-[8px] font-black tracking-widest uppercase">* LOOK *</div>
            <div className="flex-1 h-[1px] bg-black/20" />
          </div>
          <div className="w-full h-10 border-2 border-black flex items-center justify-between px-2 overflow-hidden bg-white">
            <div className="flex h-full" style={{ backgroundImage: "repeating-linear-gradient(to right, black, black 1px, transparent 1px, transparent 4px)" }}>
              <div className="w-12" />
            </div>
            <span className="text-[10px] font-black font-mono">2026 - 3 - 12</span>
          </div>
        </div>
      </div>

      {/* Decorative vertical text on right */}
      <div className="absolute right-1 top-1/2 -translate-y-1/2 rotate-90 origin-bottom-right uppercase text-[6px] font-black tracking-[0.3em] opacity-20 whitespace-nowrap">
        /// HYPOTHETICAL VISUAL ADV 00 ///
      </div>
    </div>
  );
}

function IDBadge() {
  const [imgError, setImgError] = useState(false);
  const badgeRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);

  const { scrollYProgress } = useScroll({
    target: badgeRef,
    offset: ["start end", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-12, 0, 12]);
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const glitchSequence = async () => {
      setIsGlitching(true);
      // Fast random switches hitting all multiverse cards
      for (let i = 0; i < 20; i++) {
        setVariant(Math.floor(Math.random() * 5)); // Increased to 5 variants
        await new Promise(r => setTimeout(r, 50 + Math.random() * 100));
      }
      setVariant(0); // Return to baseline
      setIsGlitching(false);
    };

    const unsubscribe = scrollYProgress.on("change", (v) => {
      // Trigger glitch near the start of the section view
      if (v > 0.1 && v < 0.2 && !isGlitching && variant === 0) {
        glitchSequence();
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, isGlitching, variant]);

  // Multiverse render logic
  const renderVariant = () => {
    switch (variant) {
      case 1: return <BadgeTylerLicense />;
      case 2: return <BadgeNoIdeaClub />;
      case 3: return <BadgeMarcJacobsISIC />;
      case 4: return <BadgeHeronPreston />;
      default: return <BadgeCreativeStudio imgError={imgError} setImgError={setImgError} />;
    }
  };

  return (
    <motion.div
      ref={badgeRef}
      style={{ rotate, y }}
      className={`relative flex flex-col items-center select-none w-full max-w-[280px] mx-auto lg:mx-0 pt-6 origin-top ${isGlitching ? 'filter-glitch' : ''}`}
    >
      <style jsx global>{`
        @keyframes glitch-skew {
          0% { transform: skew(0deg); }
          20% { transform: skew(-2deg); }
          40% { transform: skew(3deg); }
          60% { transform: skew(-3deg); }
          80% { transform: skew(1deg); }
          100% { transform: skew(0deg); }
        }
        .filter-glitch {
          animation: glitch-skew 0.2s infinite linear alternate-reverse;
          position: relative;
        }
        .filter-glitch::before,
        .filter-glitch::after {
          content: "";
          position: absolute;
          inset: 0;
          background: inherit;
          z-index: 50;
          opacity: 0.5;
          mix-blend-mode: color-dodge;
          pointer-events: none;
        }
        .filter-glitch::before {
          color: red;
          left: 2px;
          text-shadow: 2px 0 red;
          clip-path: rect(10px, 9999px, 50px, 0);
          animation: glitch-anim-1 0.4s infinite linear alternate-reverse;
        }
        .filter-glitch::after {
          color: blue;
          left: -2px;
          text-shadow: -2px 0 blue;
          clip-path: rect(80px, 9999px, 120px, 0);
          animation: glitch-anim-2 0.3s infinite linear alternate-reverse;
        }
        @keyframes glitch-anim-1 {
          0% { clip-path: inset(10% 0 80% 0); transform: translate(-5px); }
          20% { clip-path: inset(40% 0 20% 0); transform: translate(5px); }
          40% { clip-path: inset(60% 0 10% 0); transform: translate(-5px); }
          60% { clip-path: inset(10% 0 10% 0); transform: translate(5px); }
          80% { clip-path: inset(80% 0 10% 0); transform: translate(-5px); }
          100% { clip-path: inset(10% 0 40% 0); transform: translate(5px); }
        }
        @keyframes glitch-anim-2 {
          0% { clip-path: inset(30% 0 20% 0); transform: translate(5px); }
          20% { clip-path: inset(10% 0 60% 0); transform: translate(-5px); }
          40% { clip-path: inset(50% 0 30% 0); transform: translate(5px); }
          60% { clip-path: inset(80% 0 10% 0); transform: translate(-5px); }
          80% { clip-path: inset(20% 0 50% 0); transform: translate(5px); }
          100% { clip-path: inset(60% 0 20% 0); transform: translate(-5px); }
        }
      `}</style>

      {/* Lanyard strap */}
      <div className="absolute -top-12 w-10 h-24 md:h-32 bg-[#ff5500] z-0 origin-top"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.4) 10px, rgba(255,255,255,0.4) 20px)",
          boxShadow: "inset 0 0 10px rgba(0,0,0,0.1), 2px 0 10px rgba(0,0,0,0.1)"
        }}
      />

      {/* Metal Clip */}
      <div className="absolute top-12 md:top-16 z-10 w-10 h-16 flex flex-col items-center">
        <svg viewBox="0 0 100 150" className="w-full h-full drop-shadow-md text-slate-400 fill-current">
          <path d="M 25,0 L 75,0 C 85,0 90,10 90,20 L 75,50 L 60,50 L 60,80 C 60,95 55,100 50,100 C 45,100 40,95 40,80 L 40,50 L 25,50 L 10,20 C 10,10 15,0 25,0 Z" />
          <path d="M 50,100 L 50,130" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
          <path d="M 40,140 Q 50,160 60,140" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
        </svg>
      </div>

      <motion.div
        className="w-full aspect-[1/1.58] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-gray-200 z-20 relative overflow-hidden mt-16"
        initial={{ rotate: -5, y: 50, opacity: 0 }}
        whileInView={{ rotate: [-5, 3, -1, 0, -2], y: 0, opacity: 1 }}
        transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
        viewport={{ once: true }}
      >
        {renderVariant()}
      </motion.div>
    </motion.div >
  );
}


export default function About() {
  return (
    <>
      <div
        className="w-full min-h-screen flex flex-col relative bg-white"
        style={{
          backgroundImage: "url('/about-bg-nature.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <SectionWrapper id="about" className="flex-1 flex flex-col justify-center py-20">
          {/* Intro */}
          <motion.h2
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-[12vw] md:text-[5rem] lg:text-[6.5rem] font-black text-white uppercase tracking-tighter leading-none mb-4 md:mb-6 mt-4 text-left origin-left drop-shadow-lg"
            style={{
              fontFamily: "Impact, system-ui, sans-serif",
              transform: "scaleY(1.2)",
              WebkitTextStroke: "2px white"
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
              <div className="p-5 md:p-6 space-y-4">
                {about.intro.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-black text-base md:text-lg leading-relaxed font-medium"
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

      <div className="w-full bg-[#F2B50B] min-h-screen flex flex-col">
        <SectionWrapper id="events" className="flex-1 flex flex-col justify-center py-20">
          {/* Events & Hackathons */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-8 md:mb-12 mt-16"
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
          </motion.div>

          <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full md:h-[400px] lg:h-[500px]">
            {/* Left Half */}
            <div className="flex-1 flex flex-col gap-2 md:gap-4">
              {photoStories[0] && (
                <MomentCard story={photoStories[0]} delay={0.1} className="h-[300px] md:h-auto md:flex-[55] rounded-xl" />
              )}
              <div className="h-[150px] md:h-auto md:flex-[45] flex flex-row gap-2 md:gap-4">
                {photoStories[1] && <MomentCard story={photoStories[1]} delay={0.2} className="flex-1 rounded-xl" />}
                {photoStories[2] && <MomentCard story={photoStories[2]} delay={0.3} className="flex-1 rounded-xl" />}
              </div>
            </div>

            {/* Right Half */}
            <div className="flex-1 flex flex-col gap-2 md:gap-4">
              <div className="h-[150px] md:h-auto md:flex-[35] flex flex-row gap-2 md:gap-4">
                {photoStories[3] && <MomentCard story={photoStories[3]} delay={0.4} className="flex-1 rounded-xl" />}
                {photoStories[4] && <MomentCard story={photoStories[4]} delay={0.5} className="flex-1 rounded-xl" />}
              </div>
              <div className="h-[300px] md:h-auto md:flex-[65] flex flex-row gap-2 md:gap-4">
                {photoStories[5] && <MomentCard story={photoStories[5]} delay={0.6} className="flex-1 rounded-xl" />}
                {photoStories[6] && <MomentCard story={photoStories[6]} delay={0.7} className="flex-1 rounded-xl" />}
              </div>
            </div>
          </div>
        </SectionWrapper>
      </div>
    </>
  );
}

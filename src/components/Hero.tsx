"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import Vapi from "@vapi-ai/web";

export default function Hero() {
  const [imgError, setImgError] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const vapiRef = useRef<any>(null);

  useEffect(() => {
    vapiRef.current = new Vapi("5e00c6e3-fb53-423d-9c61-125dfd4ca769");

    vapiRef.current.on("call-start", () => {
      setIsCallActive(true);
      setIsLoading(false);
    });

    vapiRef.current.on("call-end", () => {
      setIsCallActive(false);
      setIsLoading(false);
    });

    vapiRef.current.on("error", (e: any) => {
      console.error(e);
      setIsCallActive(false);
      setIsLoading(false);
    });

    return () => {
      if (vapiRef.current) {
        vapiRef.current.stop();
      }
    };
  }, []);

  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      if (!hasScrolled) setHasScrolled(true);
    } else {
      if (hasScrolled) setHasScrolled(false);
    }
  });

  const toggleCall = async () => {
    if (isLoading) return;

    if (isCallActive) {
      setIsLoading(true);
      vapiRef.current?.stop();
    } else {
      setIsLoading(true);
      try {
        await vapiRef.current?.start("b5df2867-8970-46d9-bb7f-5c97ef0b192a");
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    }
  };


  return (
    <section
      id="hero"
      className="relative w-full h-[100svh] min-h-[600px] bg-white overflow-hidden flex flex-col justify-between pt-10 pb-16 px-6 lg:px-12 selection:bg-[#ff5500] selection:text-white"
    >
      {/* SVG Filter for Pencil Sketch Effect */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <filter id="pencil-sketch">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

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

      {/* Interactive Speech Bubble container (Clickable to start AI agent) */}
      <motion.div
        initial={{ scale: 0, rotate: 10 }}
        animate={{ scale: 1, rotate: -5 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.8 }}
        className="absolute top-[35%] right-[2%] md:right-[3%] lg:right-[5%] z-40 pointer-events-auto"
      >
        <button
          onClick={toggleCall}
          className={`bg-white border-[3px] border-black p-3 md:p-4 rounded-2xl text-xs font-black shadow-[4px_4px_0px_#000] relative cursor-pointer hover:scale-105 transition-transform max-w-[150px] md:max-w-[170px] hover:bg-gray-50 flex items-center justify-center text-center leading-snug ${isCallActive ? "text-green-600 border-green-600" : isLoading ? "text-orange-500" : "text-black"
            }`}
        >
          {isLoading ? "Connecting..." : isCallActive ? "Stop AI Agent" : hasScrolled ? "Hey.... don't scroll. Talk to me." : "Click on me to Activate the voice agent."}

          {/* Bubble tail pointing left towards character */}
          <div className={`absolute top-1/2 -left-[14px] -translate-y-1/2 w-0 h-0 border-y-[10px] border-y-transparent border-r-[14px] ${isCallActive ? 'border-r-green-600' : 'border-r-black'}`}>
            <div className={`absolute -top-[6px] -right-[13px] w-0 h-0 border-y-[6px] border-y-transparent border-r-[10px] border-r-white hover:border-r-gray-50`} />
          </div>
        </button>
      </motion.div>

      {/* Hero Graphic / Characters */}
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
              <code className="bg-white text-black border border-black/20 px-2 py-1 text-[10px] rounded shadow pointer-events-auto">
                public/hero-characters.png
              </code>
            </div>
          )}
        </div>
      </motion.div>

      {/* Bottom Text and Socials */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative z-20 w-full max-w-7xl mx-auto flex flex-col justify-end h-full pointer-events-none"
      >
        <div className="flex flex-col sm:flex-row sm:items-center items-start gap-12 lg:gap-32 pointer-events-auto w-full">
          <p className="max-w-[280px] md:max-w-md text-[#ff5500] text-2xl md:text-3xl leading-relaxed font-bold tracking-tight font-caveat">
            {"\"Nothing in life is truly easy or hard only familiar or unfamiliar.\""}
          </p>

          {/* Bold Colorful Pencil Art Social Icons */}
          <div className="flex gap-5 shrink-0 ml-auto sm:ml-0">
            {[
              { Icon: FiLinkedin, href: "https://www.linkedin.com/in/kushalkongara/", label: "LinkedIn", color: "#0A66C2" },
              { Icon: FiGithub, href: "https://github.com/Kushal-Kongara", label: "GitHub", color: "#333333" },
              { Icon: FiInstagram, href: "https://www.instagram.com/kushal_kongara/", label: "Instagram", color: "#E4405F" },
            ].map(({ Icon, href, label, color }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                initial={{ rotate: Math.random() * 8 - 4 }}
                whileHover={{
                  scale: 1.15,
                  rotate: [null, -10, 10, -5, 5, 0],
                  transition: { duration: 0.4 }
                }}
                whileTap={{ scale: 0.95 }}
                className="relative group flex items-center justify-center w-12 h-12 md:w-14 md:h-14 border-[3px] bg-white/20 hover:bg-white transition-colors shadow-sm cursor-pointer"
                style={{
                  color: color,
                  borderColor: color,
                  filter: "url(#pencil-sketch)",
                  borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px", // sketchy irregular box
                }}
              >
                <Icon className="w-6 h-6 md:w-7 md:h-7 stroke-[2.5]" style={{ filter: "url(#pencil-sketch)" }} />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

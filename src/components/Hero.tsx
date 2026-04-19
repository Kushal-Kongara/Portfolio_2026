"use client";
/* eslint-disable react/no-unescaped-entities */

import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import Vapi from "@vapi-ai/web";
import { getCalApi } from "@calcom/embed-react";
import { useAudio } from "@/context/AudioContext";

const COOLDOWN_MS = 3 * 60 * 1000; // 3 minutes
const COOLDOWN_KEY = "vapi_cooldown_until";

export default function Hero() {
  const { isCallActive, setIsCallActive, volumeLevel, setVolumeLevel } = useAudio();
  const [imgError, setImgError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cooldownLeft, setCooldownLeft] = useState(0); // seconds remaining
  const vapiRef = useRef<Vapi | null>(null);
  const cooldownIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Easter egg state
  const [easterEgg, setEasterEgg] = useState<'idle' | 'poke' | null>(null);
  const pokeCountRef = useRef(0);
  const pokeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const easterEggTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Idle detection — reset on any interaction
  useEffect(() => {
    const resetIdle = () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (easterEgg === 'idle') setEasterEgg(null);
      idleTimerRef.current = setTimeout(() => {
        setEasterEgg('idle');
      }, 20000);
    };

    resetIdle();
    window.addEventListener('mousemove', resetIdle);
    window.addEventListener('keydown', resetIdle);
    window.addEventListener('mousedown', resetIdle);
    window.addEventListener('scroll', resetIdle);
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      window.removeEventListener('mousemove', resetIdle);
      window.removeEventListener('keydown', resetIdle);
      window.removeEventListener('mousedown', resetIdle);
      window.removeEventListener('scroll', resetIdle);
    };
  }, [easterEgg]);

  // Auto-dismiss easter eggs after 4s
  const triggerEasterEgg = (type: 'idle' | 'poke') => {
    setEasterEgg(type);
    if (easterEggTimerRef.current) clearTimeout(easterEggTimerRef.current);
    easterEggTimerRef.current = setTimeout(() => setEasterEgg(null), 4000);
  };

  // Poke handler — 3 clicks within 1.5s triggers easter egg
  const handleCharacterClick = () => {
    pokeCountRef.current += 1;
    if (pokeTimerRef.current) clearTimeout(pokeTimerRef.current);
    if (pokeCountRef.current >= 3) {
      pokeCountRef.current = 0;
      triggerEasterEgg('poke');
    } else {
      pokeTimerRef.current = setTimeout(() => {
        pokeCountRef.current = 0;
      }, 1500);
    }
  };

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        styles: { branding: { brandColor: "#ff5500" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  const startCooldownTimer = (until: number) => {
    if (cooldownIntervalRef.current) clearInterval(cooldownIntervalRef.current);
    const tick = () => {
      const remaining = Math.ceil((until - Date.now()) / 1000);
      if (remaining <= 0) {
        setCooldownLeft(0);
        if (cooldownIntervalRef.current) clearInterval(cooldownIntervalRef.current);
      } else {
        setCooldownLeft(remaining);
      }
    };
    tick();
    cooldownIntervalRef.current = setInterval(tick, 1000);
  };

  useEffect(() => {
    const stored = localStorage.getItem(COOLDOWN_KEY);
    if (stored) {
      const until = parseInt(stored, 10);
      if (until > Date.now()) startCooldownTimer(until);
      else localStorage.removeItem(COOLDOWN_KEY);
    }
    return () => {
      if (cooldownIntervalRef.current) clearInterval(cooldownIntervalRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY!);

    vapiRef.current.on("call-start", () => {
      setIsCallActive(true);
      setIsLoading(false);
    });

    vapiRef.current.on("call-end", () => {
      setIsCallActive(false);
      setIsLoading(false);
      const until = Date.now() + COOLDOWN_MS;
      localStorage.setItem(COOLDOWN_KEY, String(until));
      startCooldownTimer(until);
    });

    vapiRef.current.on("error", () => {
      setIsCallActive(false);
      setIsLoading(false);
    });

    vapiRef.current.on("volume-level", (level: number) => {
      setVolumeLevel(level);
    });

    vapiRef.current.on("call-end", () => {
      setVolumeLevel(0);
    });

    return () => {
      if (vapiRef.current) {
        vapiRef.current.stop();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (isLoading || cooldownLeft > 0) return;

    if (isCallActive) {
      setIsLoading(true);
      vapiRef.current?.stop();
    } else {
      setIsLoading(true);
      try {
        await vapiRef.current?.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!);
      } catch {
        setIsLoading(false);
      }
    }
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms for various elements
  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const textScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const charY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const charOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  const bubbleY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const bubbleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const socialY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  // Mouse parallax for hero character
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const mouseCharX = useSpring(rawMouseX, { stiffness: 60, damping: 20 });
  const mouseCharY = useSpring(rawMouseY, { stiffness: 60, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rawMouseX.set(((e.clientX - cx) / rect.width) * 22);
    rawMouseY.set(((e.clientY - cy) / rect.height) * 12);
  };

  const handleMouseLeave = () => {
    rawMouseX.set(0);
    rawMouseY.set(0);
  };
  const socialOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[100svh] min-h-[560px] bg-white overflow-hidden flex flex-col justify-between pt-10 pb-16 px-6 lg:px-12 selection:bg-[#ff5500] selection:text-white"
    >
      {/* SVG Filter for Pencil Sketch Effect */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <filter id="pencil-sketch">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Giant Background Text & Sub Titles */}
      <motion.div
        style={{ y: textY, scale: textScale, opacity: textOpacity }}
        className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none select-none overflow-hidden pb-12"
      >
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
      </motion.div>

      {/* Interactive Speech Bubble container (Clickable to start AI agent) */}
      {/* Easter egg bubble — idle */}
      <AnimatePresence>
        {easterEgg === 'idle' && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute bottom-[38%] right-[2%] md:right-[3%] lg:right-[12%] z-50 pointer-events-none hidden sm:block"
          >
            <div className="bg-white border-[3px] border-black shadow-[4px_4px_0px_#000] px-4 py-3 text-xs font-black text-black max-w-[160px] text-center leading-snug rounded-xl">
              Hey… you still there? 👋
              <div className="absolute bottom-[-14px] left-1/2 -translate-x-1/2 w-0 h-0 border-x-[10px] border-x-transparent border-t-[14px] border-t-black" />
              <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-0 h-0 border-x-[7px] border-x-transparent border-t-[10px] border-t-white" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Easter egg bubble — poke */}
      <AnimatePresence>
        {easterEgg === 'poke' && (
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -8 }}
            animate={{ scale: 1, opacity: 1, rotate: -4 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className="absolute bottom-[42%] right-[2%] md:right-[3%] lg:right-[10%] z-50 pointer-events-none hidden sm:block"
          >
            <div className="bg-[#ff5500] border-[3px] border-black shadow-[4px_4px_0px_#000] px-4 py-3 text-xs font-black text-white max-w-[160px] text-center leading-snug rounded-xl">
              Okay okay, stop! 😤
              <div className="absolute bottom-[-14px] left-1/2 -translate-x-1/2 w-0 h-0 border-x-[10px] border-x-transparent border-t-[14px] border-t-black" />
              <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-0 h-0 border-x-[7px] border-x-transparent border-t-[10px] border-t-[#ff5500]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0, rotate: 10 }}
        animate={{ scale: 1, rotate: -5 }}
        style={{ y: bubbleY, opacity: bubbleOpacity }}
        transition={{ type: "spring", stiffness: 200, delay: 0.8 }}
        className="absolute top-[28%] md:top-[35%] right-[2%] md:right-[3%] lg:right-[5%] z-40 pointer-events-auto"
      >
        <button
          onClick={toggleCall}
          disabled={cooldownLeft > 0}
          aria-label={isCallActive ? "Stop AI voice agent" : "Start AI voice agent"}
          className={`p-2 md:p-4 rounded-2xl text-[10px] md:text-xs font-black relative transition-all duration-300 max-w-[120px] md:max-w-[170px] flex items-center justify-center text-center leading-snug border-[3px]
            ${cooldownLeft > 0 ? "bg-gray-100 text-gray-400 border-gray-300 shadow-[4px_4px_0px_#ccc] cursor-not-allowed" :
              isCallActive ? "bg-white text-green-600 border-green-600 shadow-[4px_4px_0px_#16a34a] cursor-pointer hover:scale-105" :
              isLoading ? "bg-white text-orange-500 border-black shadow-[4px_4px_0px_#000] cursor-pointer" :
                hasScrolled ? "bg-black text-white border-white shadow-[4px_4px_0px_#fff] cursor-pointer hover:scale-105" :
                  "bg-white text-black border-black shadow-[4px_4px_0px_#000] hover:bg-gray-50 cursor-pointer hover:scale-105"
            }`}
        >
          {cooldownLeft > 0
            ? `Cooldown: ${Math.floor(cooldownLeft / 60)}:${String(cooldownLeft % 60).padStart(2, "0")}`
            : isLoading ? "Connecting..."
            : isCallActive ? "Stop AI Agent"
            : hasScrolled ? `Hey.... don't scroll. Talk to me.`
            : "Click on me to Activate the voice agent."}

          {/* Bubble tail pointing left towards character */}
          <div className={`absolute top-1/2 -left-[14px] -translate-y-1/2 w-0 h-0 border-y-[10px] border-y-transparent border-r-[14px] transition-colors duration-300
            ${isCallActive ? 'border-r-green-600' : (hasScrolled ? 'border-r-white' : 'border-r-black')}`}>
            <div className={`absolute -top-[6px] -right-[13px] w-0 h-0 border-y-[6px] border-y-transparent border-r-[10px] transition-colors duration-300
              ${hasScrolled && !isCallActive ? 'border-r-black' : 'border-r-white'}`} />
          </div>
        </button>
      </motion.div>

      {/* Hero Graphic / Characters */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={easterEgg === 'poke'
          ? { y: 0, opacity: 1, x: [0, -10, 12, -8, 6, -4, 0], rotate: [0, -3, 3, -2, 2, 0] }
          : { y: 0, opacity: 1 }
        }
        style={{ 
          y: charY, 
          opacity: charOpacity, 
          x: mouseCharX, 
          rotateY: mouseCharX, 
          rotateX: mouseCharY,
          filter: isCallActive ? `drop-shadow(0 0 ${20 + volumeLevel * 60}px rgba(255, 85, 0, ${0.4 + volumeLevel}))` : 'none'
        }}
        transition={{ 
          duration: easterEgg === 'poke' ? 0.5 : 0.8, 
          delay: easterEgg === 'poke' ? 0 : 0.5, 
          ease: "easeOut",
          filter: { type: "spring", stiffness: 300, damping: 20 }
        }}
        onClick={handleCharacterClick}
        className="absolute bottom-0 right-0 z-20 w-full md:w-[80%] lg:w-[60%] h-[80%] pointer-events-auto flex items-end justify-end md:pr-4 lg:pr-8 cursor-pointer opacity-20 sm:opacity-50 md:opacity-100"
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
        style={{ y: socialY, opacity: socialOpacity }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative z-20 w-full max-w-7xl mx-auto flex flex-col justify-end h-full pointer-events-none"
      >
        <div className="flex flex-col sm:flex-row sm:items-center items-start gap-6 sm:gap-12 lg:gap-32 pointer-events-auto w-full">
          <p className="max-w-[240px] sm:max-w-[280px] md:max-w-md text-[#ff5500] text-xl sm:text-2xl md:text-3xl leading-relaxed font-bold tracking-tight font-caveat">
            &quot;Nothing in life is truly easy or hard only familiar or unfamiliar.&quot;
          </p>

          {/* Bold Colorful Pencil Art Social Icons */}
          <div className="flex items-center gap-3 sm:gap-5 shrink-0 ml-auto sm:ml-0">
            {/* Book a Call pill */}
            <motion.button
              data-cal-namespace="30min"
              data-cal-link="kushalkongara/30min"
              data-cal-config='{"layout":"month_view"}'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#ff5500] text-white text-[10px] font-black tracking-widest px-4 py-2 border-[3px] border-black shadow-[3px_3px_0px_#000] hover:shadow-[1px_1px_0px_#000] transition-all duration-200 uppercase cursor-pointer"
              style={{ borderRadius: `255px 15px 225px 15px/15px 225px 15px 255px` }}
            >
              Book a Call
            </motion.button>
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
                  filter: `url(#pencil-sketch)`,
                  borderRadius: `255px 15px 225px 15px/15px 225px 15px 255px`, // sketchy irregular box
                }}
              >
                <Icon className="w-6 h-6 md:w-7 md:h-7 stroke-[2.5]" style={{ filter: `url(#pencil-sketch)` }} />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

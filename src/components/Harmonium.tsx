"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

// Configuration for common Harmonium notes
const NOTES: { [key: string]: number } = {
  "C4": 261.63,
  "Db4": 277.18,
  "D4": 293.66,
  "Eb4": 311.13,
  "E4": 329.63,
  "F4": 349.23,
  "Gb4": 369.99,
  "G4": 392.00,
  "Ab4": 415.30,
  "A4": 440.00,
  "Bb4": 466.16,
  "B4": 493.88,
  "C5": 523.25,
};

const KEY_MAPPINGS: { [key: string]: string } = {
  "a": "C4",
  "w": "Db4",
  "s": "D4",
  "e": "Eb4",
  "d": "E4",
  "f": "F4",
  "t": "Gb4",
  "g": "G4",
  "y": "Ab4",
  "h": "A4",
  "u": "Bb4",
  "j": "B4",
  "k": "C5",
};

interface Voice {
  osc1: OscillatorNode;
  osc2: OscillatorNode;
  gainNode: GainNode;
  filterNode: BiquadFilterNode;
}

export default function Harmonium() {
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const [bellowsIntensity, setBellowsIntensity] = useState(0); // 0 to 1
  const [isLidSyncActive, setIsLidSyncActive] = useState(false);
  const audioCtx = useRef<AudioContext | null>(null);
  const voices = useRef<Map<string, Voice>>(new Map());
  const masterGain = useRef<GainNode | null>(null);
  const bellowsRef = useRef<HTMLDivElement>(null);

  // Initialize Audio Context on first interaction
  const initAudio = async () => {
    if (audioCtx.current) {
      if (audioCtx.current.state === 'suspended') {
        await audioCtx.current.resume();
      }
      return;
    }
    
    const Ctx = window.AudioContext || (window as any).webkitAudioContext;
    if (!Ctx) return;
    
    audioCtx.current = new Ctx();
    masterGain.current = audioCtx.current.createGain();
    masterGain.current.connect(audioCtx.current.destination);
    masterGain.current.gain.value = 0;
    
    console.log("Audio Context Initialized");
  };

  const playNote = useCallback(async (note: string) => {
    await initAudio();
    if (!audioCtx.current || !masterGain.current) return;
    if (voices.current.has(note)) return;

    const freq = NOTES[note];
    const osc1 = audioCtx.current.createOscillator();
    const osc2 = audioCtx.current.createOscillator();
    const voiceGain = audioCtx.current.createGain();
    const filter = audioCtx.current.createBiquadFilter();

    // Harmonium-like rich reed sound
    osc1.type = "sawtooth";
    osc1.frequency.setValueAtTime(freq, audioCtx.current.currentTime);
    
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(freq * 1.01, audioCtx.current.currentTime); // Slight detune

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(2000, audioCtx.current.currentTime);
    filter.Q.setValueAtTime(1, audioCtx.current.currentTime);

    voiceGain.gain.setValueAtTime(0, audioCtx.current.currentTime);
    voiceGain.gain.linearRampToValueAtTime(0.3, audioCtx.current.currentTime + 0.05);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(voiceGain);
    voiceGain.connect(masterGain.current);

    osc1.start();
    osc2.start();

    voices.current.set(note, { osc1, osc2, gainNode: voiceGain, filterNode: filter });
    setActiveKeys(new Set(Array.from(voices.current.keys())));
  }, []);

  const stopNote = useCallback((note: string) => {
    const voice = voices.current.get(note);
    if (voice && audioCtx.current) {
      voice.gainNode.gain.cancelScheduledValues(audioCtx.current.currentTime);
      voice.gainNode.gain.linearRampToValueAtTime(0, audioCtx.current.currentTime + 0.1);
      setTimeout(() => {
        voice.osc1.stop();
        voice.osc2.stop();
        voices.current.delete(note);
        setActiveKeys(new Set(Array.from(voices.current.keys())));
      }, 150);
    }
  }, []);

  // Update master volume based on bellows intensity
  useEffect(() => {
    const ctx = audioCtx.current;
    if (masterGain.current && ctx) {
      // Audio logic: louder when bellows move
      const targetGain = bellowsIntensity * 0.8;
      masterGain.current.gain.setTargetAtTime(targetGain, ctx.currentTime, 0.05);

      // Adjust tone based on air pressure
      voices.current.forEach(voice => {
        voice.filterNode.frequency.setTargetAtTime(800 + bellowsIntensity * 4000, ctx.currentTime, 0.1);
      });
    }
  }, [bellowsIntensity]);

  // Handle Keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const note = KEY_MAPPINGS[e.key.toLowerCase()];
      if (note) playNote(note);
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      const note = KEY_MAPPINGS[e.key.toLowerCase()];
      if (note) stopNote(note);
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [playNote, stopNote]);

  // Handle Laptop Lid / Device Orientation
  const toggleLidSync = async () => {
    await initAudio(); // Interactions start here

    if (isLidSyncActive) {
      setIsLidSyncActive(false);
      return;
    }

    // Attempt 1: WebHID for actual MacBook Lid Angle
    if (typeof navigator !== "undefined" && "hid" in navigator) {
      try {
        console.log("Requesting HID devices...");
        const devices = await (navigator as any).hid.requestDevice({
          filters: [
            { vendorId: 0x05ac, usagePage: 0xff00, usage: 0x0c }, // Standard Lid Angle
            { vendorId: 0x05ac, productId: 0x8102 }, // Alternative PID
          ]
        });
        
        if (devices.length > 0) {
          const device = devices[0];
          await device.open();
          device.oninputreport = (event: any) => {
            const { data } = event;
            const angle = data.getUint16(0, true) / 100 || 0;
            const intensity = Math.min(Math.max(angle / 130, 0), 1);
            setBellowsIntensity(intensity);
          };
          setIsLidSyncActive(true);
          return;
        }
      } catch (err) {
        console.warn("WebHID not available or denied:", err);
        alert("Lid Sensor connection failed or not supported. Using motion/mouse fallback.");
      }
    }

    // Attempt 2: DeviceOrientation Permission
    if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        if (permission === "granted") {
          setIsLidSyncActive(true);
        }
      } catch (err) {
        console.error("Orientation permission denied:", err);
      }
    } else {
      setIsLidSyncActive(true);
    }
  };

  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (!isLidSyncActive) return;
      const tilt = Math.abs(e.beta || 0);
      const intensity = Math.min(Math.max((tilt - 15) / 60, 0), 1);
      setBellowsIntensity(intensity);
    };

    window.addEventListener("deviceorientation", handleOrientation);
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, [isLidSyncActive]);

  // Mouse fallback for Bellows
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isLidSyncActive) return;
    initAudio(); // Initialize on mouse move too
    if (bellowsRef.current) {
      const rect = bellowsRef.current.getBoundingClientRect();
      const relativeY = Math.min(Math.max((e.clientY - rect.top) / rect.height, 0), 1);
      setBellowsIntensity(1 - relativeY);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="w-full max-w-2xl bg-[#4E342E] p-6 md:p-10 rounded-[2.5rem] border-[8px] border-[#3E2723] shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative flex flex-col gap-6"
    >
      <div className="flex justify-between items-center px-2 border-b-2 border-white/5 pb-6">
        <div className="flex flex-col">
          <h4 className="text-[#D7CCC8] font-black uppercase tracking-widest text-xl">Kushal Harmoniums</h4>
          <p className="text-[#D7CCC8]/40 text-[9px] uppercase tracking-widest leading-none mt-1">Fine Quality • Est 2026</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
             onClick={toggleLidSync}
             className={`px-4 py-1.5 rounded-full text-[9px] uppercase font-black tracking-widest border-2 transition-all ${isLidSyncActive ? 'bg-[#ff5500] border-[#ff5500] text-white' : 'bg-transparent border-[#D7CCC8]/20 text-[#D7CCC8]/60 hover:border-[#D7CCC8]/40'}`}
          >
            {isLidSyncActive ? "LID SYNC ACTIVE" : "Sync Lid Angle"}
          </button>
        </div>
      </div>

      {/* Bellows Visualizer */}
      <div 
        ref={bellowsRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => !isLidSyncActive && setBellowsIntensity(0)}
        className="w-full h-36 bg-[#1A1A1A] rounded-2xl relative overflow-hidden cursor-ns-resize shadow-inner group"
      >
        <div className="absolute inset-0 flex flex-col justify-around py-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-full h-[1px] bg-white/5" />
          ))}
        </div>
        
        <motion.div 
          animate={{ height: `${bellowsIntensity * 100}%` }}
          className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#795548] to-[#4E342E] flex flex-col items-center justify-start overflow-hidden pt-4"
          transition={{ type: "spring", damping: 15, stiffness: 80 }}
        >
          <div className="w-full h-full opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg, #000, #000 20px, transparent 20px, transparent 40px)" }} />
          <div className="absolute top-2 w-1/3 h-1 bg-white/20 rounded-full" />
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[11px] font-black text-[#D7CCC8]/20 uppercase tracking-[0.4em] pointer-events-none select-none">
                {isLidSyncActive ? `SENSING ANGLE: ${Math.round(bellowsIntensity * 100)}%` : "Drag Up to Pump Air"}
            </span>
        </div>
      </div>

      {/* The Keyboard */}
      <div className="flex justify-center bg-[#263238] p-5 rounded-3xl border-4 border-black/40 shadow-inner">
        <div className="flex relative items-start gap-1 h-52 px-1">
          {Object.keys(NOTES).map((note, index) => {
            const isBlack = note.includes("b");
            const isActive = activeKeys.has(note);
            
            return (
              <motion.div
                key={note}
                onMouseDown={() => playNote(note)}
                onMouseUp={() => stopNote(note)}
                onMouseLeave={() => stopNote(note)}
                whileTap={{ scale: 0.97 }}
                className={`
                  relative cursor-pointer select-none
                  ${isBlack 
                    ? `w-8 h-32 bg-[#212121] z-30 -mx-4.5 rounded-b-md border-x-2 border-b-6 border-black shadow-[2px_4px_10px_rgba(0,0,0,0.5)] ${isActive ? 'translate-y-1 bg-[#424242]' : ''}` 
                    : `w-12 h-48 bg-[#FAFAFA] z-20 rounded-b-xl border-x-2 border-b-[10px] border-[#E0E0E0] shadow-[0_4px_0_#9E9E9E] ${isActive ? 'translate-y-2 bg-[#F5F5F5] border-b-2 shadow-none' : ''}`
                  }
                `}
              >
                {!isBlack && (
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-20 pointer-events-none">
                    <span className="text-[12px] font-black text-black leading-none">{Object.keys(KEY_MAPPINGS).find(k => KEY_MAPPINGS[k] === note)?.toUpperCase()}</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="text-center px-4">
        <p className="text-[#D7CCC8]/30 font-bold uppercase text-[10px] tracking-widest leading-relaxed">
           <span className="text-[#ff5500]">Crucial:</span> HOLD KEY (A—K) while moving lid/mouse
        </p>
      </div>
    </motion.div>
  );
}

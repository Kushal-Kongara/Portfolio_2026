"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import LifeWeeks from "@/components/LifeWeeks";
import { FaStar, FaAsterisk, FaCircle, FaPlus } from "react-icons/fa";

// Component for a "Sticker" element
const Sticker = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    whileHover={{ scale: 1.1, rotate: [-5, 5, -5] }}
    className={`absolute z-20 cursor-pointer shadow-lg ${className}`}
  >
    {children}
  </motion.div>
);

export default function GameZonePage() {
  return (
    <main className="min-h-screen bg-[#111111] text-[#FDFBF7] font-sans selection:bg-[#ff5500] selection:text-white overflow-x-hidden relative">
      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Top Header Labels */}
      <div className="w-full px-8 py-6 flex justify-between items-center border-b border-white/10 uppercase font-black tracking-widest text-[10px] md:text-xs">
        <span>KUSHAL KONGARA</span>
        <span className="opacity-50">SAIGON VIBES</span>
        <span>PRESENTS THE GAME ZONE</span>
      </div>

      <div className="max-w-7xl mx-auto p-6 md:p-12 pb-32">
        {/* The Bento Grid of Posters */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-6 auto-rows-[minmax(200px,auto)]">
          
          {/* 1. MAIN POSTER: TANOSHII PARK Style (The Life Weeks Trigger) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-4 lg:col-span-4 lg:row-span-3 bg-[#1e40af] rounded-[2.5rem] p-8 relative overflow-hidden flex flex-col justify-between group shadow-2xl border-2 border-white/5"
          >
            <div className="absolute top-0 right-0 p-8">
              <FaAsterisk className="text-[#FDFBF7]/20 text-6xl animate-spin-slow" />
            </div>
            
            <div className="relative z-10 flex flex-col gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80">KUSHAL X TECHNO</span>
              <h2 className="text-6xl md:text-7xl font-black uppercase leading-[0.85] tracking-tighter">
                LIFE<br/>WEEKS<br/>ZONE
              </h2>
            </div>

            <div className="relative z-10 mt-12 bg-[#FDFBF7] text-black rounded-3xl overflow-hidden border-4 border-black shadow-[8px_8px_0px_#000] rotate-[-2deg] group-hover:rotate-0 transition-transform duration-500">
               <LifeWeeks />
            </div>

            <div className="mt-8 flex justify-between items-end">
              <div className="text-[10px] font-black uppercase tracking-widest">
                4:00 PM<br/>Sunday 16.07.23
              </div>
              <Sticker className="relative rotate-12 -mr-4 -mb-4 bg-[#8b5cf6] text-white p-4 rounded-full border-4 border-black">
                <FaAsterisk className="text-2xl" />
              </Sticker>
            </div>
          </motion.div>

          {/* 2. HIPHOP NIGHT Style (Red Poster) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 lg:col-span-5 lg:row-span-2 bg-[#dc2626] rounded-[2.5rem] p-8 relative overflow-hidden group shadow-xl border-2 border-white/5"
          >
             <div className="flex justify-between items-start mb-8">
               <FaAsterisk className="text-black text-xl" />
               <div className="text-right text-[10px] font-black uppercase tracking-widest leading-none">
                 HIPHOP NEVA DIE<br/><span className="opacity-60">KUSHAL IN YOUR MIND</span>
               </div>
             </div>

             <div className="relative z-10">
               <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-4 italic">
                 DUMMY<br/>NIGHT
               </h3>
               <div className="text-7xl font-black opacity-30 absolute right-0 bottom-0 pr-4">25</div>
             </div>

             <div className="absolute bottom-8 left-8">
                <div className="w-12 h-12 border-4 border-black flex items-center justify-center rounded-lg rotate-12 bg-white text-black font-black">?</div>
             </div>
          </motion.div>

          {/* 3. BEER BONG Style (Yellow Poster) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 lg:col-span-3 lg:row-span-4 bg-[#facc15] text-black rounded-[2.5rem] p-8 relative overflow-hidden group shadow-xl border-4 border-black"
          >
            <div className="flex justify-between items-start mb-8">
              <span className="text-[10px] font-black uppercase tracking-widest">Every Saturday</span>
              <div className="flex gap-1 text-black">
                <FaAsterisk /><FaAsterisk /><FaAsterisk />
              </div>
            </div>

            <h3 className="text-7xl font-black uppercase leading-[0.8] tracking-tighter mb-12">
              BEER<br/>BONG
            </h3>

            <div className="mb-12 flex flex-col gap-2">
               <span className="text-xs font-black uppercase tracking-widest">Ping</span>
               <span className="text-xs font-black uppercase tracking-widest">Or</span>
               <span className="text-xs font-black uppercase tracking-widest">Drink?</span>
            </div>

            <div className="flex flex-col gap-4">
              <div className="text-[10px] font-black uppercase tracking-widest opacity-60">
                 10 Million VND<br/>Winning Prize
              </div>
              <div className="text-[10px] font-black uppercase leading-tight tracking-tighter">
                 BÉ BÉ BỒNG BỘNG BÔNG BÔNG BỒNG<br/>BÁN 60 CÀNH BÔNG
              </div>
            </div>

            <Sticker className="bottom-12 right-0 translate-x-1/2 bg-white p-6 rounded-full border-4 border-black text-black">
               <div className="flex flex-col items-center">
                 <div className="flex gap-2 mb-1">
                   {[...Array(2)].map((_, i) => <div key={i} className="w-2 h-2 bg-black rounded-full" />)}
                 </div>
                 <div className="w-4 h-2 border-b-2 border-black rounded-full" />
               </div>
            </Sticker>
          </motion.div>

          {/* 4. THURSDAY FUNNY Style (Teal Poster) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 lg:col-span-4 lg:row-span-2 bg-[#2dd4bf] text-black rounded-[2.5rem] p-8 relative overflow-hidden group shadow-xl border-2 border-black"
          >
             <h3 className="text-5xl font-black uppercase tracking-tighter leading-none mb-4">
                thursday<br/>funny
             </h3>
             <div className="text-[9px] font-black uppercase tracking-widest opacity-80 leading-tight">
                FREE XX COCKTAIL SET<br/>OR FREE 1 FREIXENET<br/>FOR GROUPS FROM 4 PEOPLES
             </div>
             
             <div className="absolute right-0 bottom-0 p-4">
                <FaAsterisk className="text-4xl opacity-20" />
             </div>
          </motion.div>

          {/* 5. BORN BONG Style (Small Cream/Stone Poster) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="md:col-span-1 lg:col-span-2 lg:row-span-2 bg-[#FDFBF7] text-black rounded-[2.5rem] p-6 relative overflow-hidden group border-4 border-black shadow-[8px_8px_0px_#000]"
          >
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-4">
              BORN<br/>BONG
            </h3>
            <div className="absolute top-2 right-2">
               <FaAsterisk className="text-[#8b5cf6]" />
            </div>
            <div className="text-xs font-black uppercase tracking-tighter opacity-70">
              GIA 60 CÀNH
            </div>
          </motion.div>

          {/* 6. LADIES NIGHT Style (Wide Purple Poster) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="md:col-span-2 lg:col-span-3 lg:row-span-2 bg-[#8b5cf6] rounded-[2.5rem] p-8 relative overflow-hidden group shadow-xl border-2 border-white/5 flex flex-col justify-between"
          >
             <div className="flex justify-between mb-4">
               <h3 className="text-2xl font-black uppercase tracking-[0.2em]">LADIES NIGHT</h3>
               <span className="text-[10px] font-black uppercase opacity-60">SUNDAY NIGHT</span>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] font-black uppercase tracking-widest opacity-80 leading-tight">FREE 1 FREIXENET SPARKLING FOR GROUPS 4 GIRLS</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] font-black uppercase tracking-widest opacity-80 leading-tight">NAILS BOX & SURPRISE GAME</span>
                </div>
             </div>
          </motion.div>

        </div>

        {/* Footer Labels */}
        <div className="mt-24 border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black tracking-[0.3em] uppercase opacity-60">
           <div className="flex gap-4">
             <FaAsterisk /><FaAsterisk /><FaAsterisk />
           </div>
           <div>HOTLINE: 085 700 1199</div>
           <div>21-23 HO TUNG MAU, DISTRICT 1, HCMC</div>
        </div>

        {/* Floating Back Button */}
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.1, x: -5 }}
            className="fixed bottom-12 left-12 z-[200] bg-[#ff5500] text-white px-8 py-4 rounded-full border-4 border-black font-black uppercase tracking-widest shadow-[8px_8px_0px_#000] cursor-pointer"
          >
            ← BACK HOME
          </motion.div>
        </Link>
      </div>
    </main>
  );
}

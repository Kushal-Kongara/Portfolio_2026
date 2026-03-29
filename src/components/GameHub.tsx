"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCpu, FiAlertTriangle, FiInfo } from "react-icons/fi";
import SectionWrapper from "./SectionWrapper";
import ProductionIncidentGame from "./ProductionIncidentGame";
import LifeWeeks from "./LifeWeeks";

interface GameLauncherPopupProps {
    title: string;
    warningText: string;
    onOpen: () => void;
    accentColor?: string;
    icon: React.ReactNode;
}

function GameLauncherPopup({ title, warningText, onOpen, accentColor = "#ff4444", icon }: GameLauncherPopupProps) {
    return (
        <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="flex flex-col items-center group"
        >
            {/* The Popup Window */}
            <div className="relative w-[300px] md:w-[340px] bg-[#FDFBF7] border-[4px] border-black shadow-[12px_12px_0px_rgba(0,0,0,0.2)] overflow-hidden rounded-sm">
                {/* Header Bar */}
                <div className="bg-[#ff4444] border-b-[4px] border-black p-3 flex justify-between items-center bg-stripes-white/10">
                    <span className="text-white font-black uppercase tracking-tighter text-sm md:text-base" style={{ fontFamily: 'Impact, sans-serif' }}>
                        {title}
                    </span>
                    <div className="w-5 h-5 bg-white border-2 border-black flex items-center justify-center cursor-pointer hover:bg-red-200 transition-colors">
                        <FiX className="text-black text-xs" />
                    </div>
                </div>

                {/* Body */}
                <div className="p-6 md:p-8 flex flex-col items-center text-center">
                    <div className="mb-4 text-4xl text-black">
                        {icon}
                    </div>
                    
                    <p className="text-black font-black uppercase text-[10px] md:text-[11px] tracking-widest leading-relaxed mb-8 border-2 border-black/5 p-3 rounded bg-black/5 italic">
                        {warningText}
                    </p>

                    <div className="flex gap-3 w-full">
                        <button 
                            onClick={onOpen}
                            className="flex-1 bg-[#ff4444] text-white font-black py-3 rounded-md border-[3px] border-black shadow-[4px_4px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all uppercase tracking-tighter text-sm"
                        >
                            Open
                        </button>
                        <button className="flex-1 bg-white text-black font-black py-3 rounded-md border-[3px] border-black shadow-[4px_4px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all uppercase tracking-tighter text-sm">
                            Later
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Shadow on the grass */}
            <div className="mt-4 w-32 h-2 bg-black/10 rounded-full blur-sm group-hover:w-40 transition-all" />
        </motion.div>
    );
}

export default function GameHub() {
    const [activeGame, setActiveGame] = useState<'survive' | 'lifeweeks' | null>(null);

    return (
        <section 
            className="relative w-full h-[650px] md:h-[800px] overflow-hidden bg-center flex flex-col pt-12 md:pt-16"
            style={{ 
                backgroundImage: "url('/game-hub-bg.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center bottom'
            }}
        >
            <SectionWrapper className="relative z-10 w-full mb-0 flex flex-col md:flex-row md:items-start md:justify-between gap-4 px-10">
                <motion.h2
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-[12vw] md:text-[3rem] lg:text-[4rem] font-black text-white uppercase tracking-tighter leading-none text-left origin-left drop-shadow-lg"
                    style={{
                        fontFamily: "Impact, system-ui, sans-serif",
                        transform: "scaleY(1.2)",
                        WebkitTextStroke: "2px white"
                    }}
                >
                    GAME ZONE
                </motion.h2>

                {/* Retro HUD Overlay - Positioned to the right for better alignment */}
                <div className="hidden md:block">
                    <div className="inline-flex items-center gap-3 bg-black/40 backdrop-blur-sm border border-white/20 px-6 py-2 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                        <FiCpu className="text-green-500 animate-pulse" />
                        <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Game Hub v1.2.0</span>
                    </div>
                </div>
            </SectionWrapper>

            {/* Launchers Grid - Positioned higher up for the shorter section */}
            <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 flex flex-col md:flex-row items-center md:items-end gap-10 md:gap-14 px-6 w-full max-w-6xl justify-center scale-90 md:scale-95">
                
                {/* Survive CLI Popup */}
                <GameLauncherPopup 
                    title="PRODUCTION INCIDENT"
                    warningText="WARNING: CRITICAL SYSTEM ERROR DETECTED. IMMEDIATE INTERVENTION REQUIRED TO PREVENT FULL DATA LOSS!"
                    icon={<FiAlertTriangle className="text-red-600" />}
                    onOpen={() => setActiveGame('survive')}
                />

                {/* Life Weeks Popup */}
                <GameLauncherPopup 
                    title="EXISTENTIAL CHECK"
                    warningText="NOTICE: TIME IS SLIPPING AWAY. WOULD YOU LIKE TO CALCULATE YOUR REMAINING MORTALITY DOTS?"
                    icon={<FiInfo className="text-blue-600" />}
                    onOpen={() => setActiveGame('lifeweeks')}
                />
            </div>

            {/* Game Overlay Modal */}
            <AnimatePresence>
                {activeGame && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8"
                        style={{ 
                            backgroundImage: "url('/game-overlay-bg.png')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        <motion.div 
                            initial={{ scale: 0.95, y: 10 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 10 }}
                            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto custom-scrollbar"
                        >
                            {/* Close Button */}
                            <button 
                                onClick={() => setActiveGame(null)}
                                className="fixed top-6 right-6 p-4 bg-[#EF4444] hover:bg-[#DC2626] text-white rounded-xl border-b-[6px] border-black/20 hover:border-b-[2px] hover:translate-y-[4px] transition-all z-[1010] shadow-[0_10px_20px_rgba(239,68,68,0.3)] flex items-center justify-center border-2 border-black"
                            >
                                <FiX size={28} strokeWidth={4} />
                            </button>

                            <div className="py-12">
                                {activeGame === 'survive' ? (
                                    <ProductionIncidentGame />
                                ) : (
                                    <div className="bg-[#FDFBF7] rounded-[3rem] border-[10px] border-black py-4">
                                        <LifeWeeks />
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
                .bg-stripes-white {
                    background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.1) 75%, transparent 75%, transparent);
                    background-size: 20px 20px;
                }
            `}</style>
        </section>
    );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiTerminal, FiX, FiCpu } from "react-icons/fi";
import ProductionIncidentGame from "./ProductionIncidentGame";

export default function GameHub() {
    const [activeGame, setActiveGame] = useState<string | null>(null);

    return (
        <section 
            className="relative w-full h-[500px] md:h-[700px] overflow-hidden bg-center"
            style={{ 
                backgroundImage: "url('/game-hub-bg.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            {/* Retro HUD Overlay */}
            <div className="absolute top-8 left-8 z-10">
                <div className="flex items-center gap-3 bg-black/40 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                    <FiCpu className="text-green-500 animate-pulse" />
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Game Hub v1.0.4</span>
                </div>
            </div>

            {/* Launchers Grid - Positioned on the 'grass' line */}
            <div className="absolute bottom-[35%] left-1/2 -translate-x-1/2 flex items-end gap-12 md:gap-24 px-6 w-full max-w-4xl justify-center scale-75 md:scale-100">
                
                {/* Survive Incident Launcher */}
                <motion.div 
                    className="group relative flex flex-col items-center"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                >
                    {/* Tooltip */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                        <div className="bg-black text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded border border-white/20 whitespace-nowrap shadow-2xl">
                            Survive Incident
                        </div>
                        <div className="w-2 h-2 bg-black border-r border-b border-white/20 rotate-45 mx-auto -mt-1" />
                    </div>

                    <button
                        onClick={() => setActiveGame('survive')}
                        className="relative w-16 h-16 md:w-20 md:h-20 bg-black rounded-2xl border-[3px] border-white/10 group-hover:border-white/40 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden hover:scale-110 active:scale-95 group-hover:rotate-3"
                    >
                        {/* Scanline Effect */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-10 pointer-events-none bg-[length:100%_2px,3px_100%]" />
                        <FiTerminal className="text-green-500 text-3xl md:text-4xl group-hover:scale-110 transition-transform" />
                    </button>
                    
                    <div className="mt-4 w-12 h-1.5 bg-black/20 rounded-full blur-sm group-hover:w-16 transition-all" />
                </motion.div>

                {/* Placeholder Launcher 1 */}
                <div className="opacity-40 grayscale flex flex-col items-center cursor-not-allowed">
                     <div className="w-16 h-16 md:w-20 md:h-20 bg-black/40 rounded-2xl border-[3px] border-white/5 flex items-center justify-center">
                        <span className="text-white/20 font-black text-xs">?</span>
                     </div>
                     <div className="mt-4 w-12 h-1.5 bg-black/10 rounded-full blur-sm" />
                </div>

                {/* Placeholder Launcher 2 */}
                <div className="hidden md:flex opacity-40 grayscale flex-col items-center cursor-not-allowed">
                     <div className="w-16 h-16 md:w-20 md:h-20 bg-black/40 rounded-2xl border-[3px] border-white/5 flex items-center justify-center">
                        <span className="text-white/20 font-black text-xs">?</span>
                     </div>
                     <div className="mt-4 w-12 h-1.5 bg-black/10 rounded-full blur-sm" />
                </div>
            </div>

            {/* Game Overlay Modal */}
            <AnimatePresence>
                {activeGame === 'survive' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto custom-scrollbar"
                        >
                            {/* Close Button */}
                            <button 
                                onClick={() => setActiveGame(null)}
                                className="fixed top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all hover:rotate-90 z-[1010]"
                            >
                                <FiX size={24} />
                            </button>

                            <div className="py-12">
                                <ProductionIncidentGame />
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
            `}</style>
        </section>
    );
}

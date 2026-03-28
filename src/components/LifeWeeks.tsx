"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiClock, FiActivity, FiSettings, FiRotateCcw } from "react-icons/fi";

const TOTAL_YEARS = 80;
const WEEKS_IN_YEAR = 52;
const TOTAL_WEEKS = TOTAL_YEARS * WEEKS_IN_YEAR;

export default function LifeWeeks() {
    const [step, setStep] = useState<'teaser' | 'input' | 'result'>('teaser');
    const [ageInput, setAgeInput] = useState<string>("");
    const [weeksLived, setWeeksLived] = useState<number>(0);

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();
        const age = parseFloat(ageInput);
        if (isNaN(age) || age < 0) return;

        setWeeksLived(Math.floor(age * WEEKS_IN_YEAR));
        setStep('result');
    };

    const grid = useMemo(() => {
        if (step !== 'result') return null;

        return Array.from({ length: TOTAL_WEEKS }).map((_, i) => (
            <div
                key={i}
                className={`w-[4.5px] h-[4.5px] md:w-[6px] md:h-[6px] rounded-[1px] transition-colors duration-500 ${i < weeksLived ? 'bg-[#0F172A] opacity-80' : 'bg-gray-200'
                    } ${i === weeksLived ? 'bg-[#F97316] animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.8)]' : ''}`}
                title={i === weeksLived ? "Current Week" : `Week ${i + 1}`}
            />
        ));
    }, [weeksLived, step]);

    return (
        <div className="w-full flex items-center justify-center py-4">
            <div className="w-full max-w-2xl bg-[#0F172A] p-1.5 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] border-[4px] border-black/20">
                {/* Header / Tabs */}
                <div className="flex items-center gap-1 mb-1 px-1">
                    <div className={`px-6 py-3 rounded-t-2xl font-black text-xs md:text-sm tracking-tighter uppercase transition-colors ${step === 'result' ? 'bg-[#3B82F6]' : 'bg-[#F97316]'} text-white shadow-[0_-4px_0_rgba(0,0,0,0.2)_inset]`}>
                        {step === 'result' ? 'Reality' : 'Check'}
                    </div>
                    <div className="px-6 py-3 rounded-t-2xl bg-[#1E293B] text-gray-400 font-black text-xs md:text-sm tracking-tighter uppercase hidden sm:block">
                        Projection
                    </div>
                    <div className="px-6 py-3 rounded-t-2xl bg-[#1E293B] text-gray-400 font-black text-xs md:text-sm tracking-tighter uppercase hidden sm:block">
                        History
                    </div>
                    <div className="ml-auto flex gap-2 pr-4">
                        <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-2xl p-6 md:p-10 border-[6px] border-[#0F172A]">
                    <AnimatePresence mode="wait">
                        {step === 'teaser' && (
                            <motion.div
                                key="teaser"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex flex-col items-center text-center"
                            >
                                <div className="flex gap-8 items-center mb-8 flex-col md:flex-row text-left">
                                    <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-100 rounded-3xl border-2 border-black/5 flex items-center justify-center overflow-hidden flex-shrink-0">
                                        <img src="/pixel-time-sage.png" alt="Time Sage" className="w-full h-full object-contain pixelatedScale scale-110" />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-black text-[#0F172A] uppercase tracking-tighter leading-none mb-4">Mortal Check</h2>
                                        <p className="text-gray-500 font-bold text-sm leading-relaxed mb-6 max-w-xs">
                                            "Greetings, traveler. Would you like to witness the progression of your existence in a single visual grid?"
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setStep('input')}
                                    className="w-full max-w-sm bg-[#F97316] text-white font-black py-4 rounded-xl border-b-[6px] border-black/20 hover:border-b-[2px] hover:translate-y-[4px] transition-all uppercase tracking-widest text-sm shadow-[0_10px_20px_rgba(249,115,22,0.3)]"
                                >
                                    Reveal My Reality
                                </button>
                            </motion.div>
                        )}

                        {step === 'input' && (
                            <motion.div
                                key="input"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="flex flex-col items-center text-center"
                            >
                                <div className="flex gap-8 items-center mb-10 flex-col md:flex-row text-left w-full">
                                    <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded-2xl border-2 border-black/5 flex items-center justify-center overflow-hidden flex-shrink-0">
                                        <img src="/pixel-time-sage.png" alt="Time Sage" className="w-full h-full object-contain pixelatedScale" />
                                    </div>
                                    <div className="flex-1">
                                         <h3 className="text-xl font-black text-[#0F172A] uppercase tracking-tighter mb-4">Enter Current Age</h3>
                                         <form onSubmit={handleCalculate} className="space-y-4">
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    step="0.1"
                                                    autoFocus
                                                    value={ageInput}
                                                    onChange={(e) => setAgeInput(e.target.value)}
                                                    placeholder="24.5"
                                                    className="w-full bg-gray-100 border-[3px] border-black p-4 text-3xl font-black text-center focus:outline-none focus:bg-white rounded-xl placeholder-gray-300"
                                                    required
                                                />
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase text-gray-400 tracking-widest pointer-events-none">Years</div>
                                            </div>
                                            <div className="flex gap-3">
                                                <button
                                                    type="submit"
                                                    className="flex-1 bg-[#22C55E] text-white font-black py-4 rounded-xl border-b-[6px] border-black/20 hover:border-b-[2px] hover:translate-y-[4px] transition-all uppercase tracking-widest text-xs"
                                                >
                                                    Calculate
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setStep('teaser')}
                                                    className="px-6 bg-[#EF4444] text-white font-black py-4 rounded-xl border-b-[6px] border-black/20 hover:border-b-[2px] hover:translate-y-[4px] transition-all uppercase tracking-widest text-xs"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                         </form>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 'result' && (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col"
                            >
                                <div className="flex flex-col md:flex-row gap-6 items-center mb-8 border-b-2 border-dashed border-gray-200 pb-8">
                                    <div className="w-20 h-20 md:w-28 md:h-28 bg-[#F8FAFC] rounded-2xl border-2 border-black/5 flex-shrink-0 overflow-hidden">
                                         <img src="/pixel-time-sage.png" alt="Time Sage" className="w-full h-full object-contain pixelatedScale scale-125" />
                                    </div>
                                    <div className="flex-1 text-center md:text-left">
                                        <h3 className="text-2xl font-black text-[#0F172A] uppercase tracking-tighter leading-none mb-4">Your Mortal Grid</h3>
                                        <div className="flex gap-6 justify-center md:justify-start">
                                            <div className="flex flex-col">
                                                <span className="text-2xl font-black text-[#0F172A]">{weeksLived}</span>
                                                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Weeks Spent</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-2xl font-black text-[#3B82F6]">{TOTAL_WEEKS - weeksLived}</span>
                                                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Remaining</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => setStep('input')}
                                        className="bg-[#1E293B] text-white p-3 rounded-lg hover:bg-black transition-colors"
                                        title="Change Age"
                                    >
                                        <FiRotateCcw size={18} />
                                    </button>
                                </div>

                                <div className="bg-[#F8FAFC] border-[3px] border-black/10 p-3 md:p-6 rounded-2xl shadow-inner mb-6">
                                    <div className="grid grid-cols-[repeat(52,minmax(0,1fr))] gap-[2px] md:gap-[4px] max-h-[35vh] overflow-y-auto pr-2 custom-scrollbar-retro">
                                        {grid}
                                    </div>
                                </div>
                                <p className="text-center text-[9px] font-black uppercase text-gray-300 tracking-[0.3em]">
                                    One dot = One Week • Survival Duration: 80 Years
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <style jsx>{`
                .pixelatedScale {
                    image-rendering: pixelated;
                    image-rendering: -moz-crisp-edges;
                    image-rendering: crisp-edges;
                }
                .custom-scrollbar-retro::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar-retro::-webkit-scrollbar-track {
                    background: #f1f5f9;
                    border-radius: 10px;
                }
                .custom-scrollbar-retro::-webkit-scrollbar-thumb {
                    background: #0f172a;
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
}

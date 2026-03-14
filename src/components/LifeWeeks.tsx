"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
                className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-[1px] transition-colors duration-500 ${i < weeksLived ? 'bg-black opacity-80' : 'bg-gray-200'
                    } ${i === weeksLived ? 'bg-[#ff5500] animate-pulse border border-black/20' : ''}`}
                title={i === weeksLived ? "Current Week" : `Week ${i + 1}`}
            />
        ));
    }, [weeksLived, step]);

    return (
        <div className="w-full flex flex-col items-center justify-center py-10 px-4 min-h-[400px]">
            <AnimatePresence mode="wait">
                {step === 'teaser' && (
                    <motion.button
                        key="teaser"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        onClick={() => setStep('input')}
                        className="group relative cursor-pointer"
                    >
                        <div className="absolute inset-0 bg-black rounded-2xl translate-x-1 translate-y-1 transition-transform group-hover:translate-x-2 group-hover:translate-y-2" />
                        <div className="relative bg-[#ff5500] border-[3px] border-black px-8 py-6 rounded-2xl text-white font-black text-xl md:text-3xl uppercase tracking-tighter shadow-xl">
                            Want to see how many weeks left in your life?
                        </div>
                    </motion.button>
                )}

                {step === 'input' && (
                    <motion.div
                        key="input"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white border-[3px] border-black p-8 rounded-2xl shadow-[8px_8px_0px_#000] w-full max-w-md"
                    >
                        <h3 className="text-2xl font-black uppercase tracking-tighter mb-6 text-black">Enter Your Age</h3>
                        <form onSubmit={handleCalculate} className="space-y-6">
                            <input
                                type="number"
                                step="0.1"
                                autoFocus
                                value={ageInput}
                                onChange={(e) => setAgeInput(e.target.value)}
                                placeholder="e.g. 25"
                                className="w-full bg-gray-50 border-2 border-black p-4 text-2xl font-black text-center focus:outline-none focus:ring-4 ring-[#ff5500]/20 rounded-xl"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-[#ff5500] text-white font-black py-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all uppercase tracking-widest text-sm"
                            >
                                Calculate Reality
                            </button>
                            <button
                                type="button"
                                onClick={() => setStep('teaser')}
                                className="w-full text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-black transition-colors"
                            >
                                Go Back
                            </button>
                        </form>
                    </motion.div>
                )}

                {step === 'result' && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full max-w-4xl"
                    >
                        <div className="mb-10 text-center">
                            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-black mb-2">
                                YOUR LIFE IN WEEKS
                            </h3>
                            <p className="text-[#ff5500] font-black uppercase tracking-widest text-xs md:text-sm">
                                Each dot represents one week of an 80-year life.
                            </p>

                            <div className="flex justify-center gap-12 mt-6">
                                <div className="flex flex-col items-center">
                                    <span className="text-3xl font-black text-black">{weeksLived}</span>
                                    <span className="text-[10px] uppercase font-bold text-gray-400">Weeks Spent</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-3xl font-black text-[#ff5500]">{TOTAL_WEEKS - weeksLived}</span>
                                    <span className="text-[10px] uppercase font-bold text-gray-400">Weeks Remaining</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border-2 border-black p-4 md:p-8 rounded-3xl shadow-[10px_10px_0px_rgba(0,0,0,0.05)]">
                            <div className="grid grid-cols-[repeat(52,minmax(0,1fr))] gap-1 md:gap-1.5 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                                {grid}
                            </div>
                        </div>

                        <div className="mt-12 flex justify-center">
                            <button
                                onClick={() => setStep('input')}
                                className="bg-black text-white text-xs font-black px-8 py-3 rounded-full hover:scale-105 transition-transform uppercase tracking-widest"
                            >
                                Change Age
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #000;
          border-radius: 10px;
        }
      `}</style>
        </div>
    );
}

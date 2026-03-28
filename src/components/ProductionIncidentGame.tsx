"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiAlertTriangle, FiCheckCircle, FiRotateCcw, FiPlay, FiAward } from "react-icons/fi";

type Choice = {
    text: string;
    score: number;
    feedback: string;
};

type Scenario = {
    id: number;
    title: string;
    description: string;
    choices: Choice[];
};

const SCENARIOS: Scenario[] = [
    {
        id: 1,
        title: "The Alert",
        description: "It's 2 AM. PagerDuty is screaming. 99% of requests are failing with 5xx errors. What's your first move?",
        choices: [
            { text: "Check Logs", score: 15, feedback: "Smart. You spotted a bad config change immediately." },
            { text: "Restart", score: 5, feedback: "The 'Turn it off and on again' approach. Temporary fix, but the root cause remains." },
            { text: "Status Page", score: 10, feedback: "Communication is key, but the site is still down!" }
        ]
    },
    {
        id: 2,
        title: "The Connection Pool",
        description: "Logs show 'Connection pool exhausted'. The database is gasping for air. How do you recover?",
        choices: [
            { text: "Kill Queries", score: 20, feedback: "Exactly. A rogue analytics query was blocking everything." },
            { text: "Double Pool", score: 5, feedback: "You just shifted the bottleneck to the DB CPU. Now it's melting." },
            { text: "Scale DB", score: 10, feedback: "Brute force works, but it cost the company $5k in 5 minutes." }
        ]
    },
    {
        id: 3,
        title: "The Traffic Spike",
        description: "A viral tweet sent 100k users to the site in 60 seconds. CPU usage is at 100%. What's the plan?",
        choices: [
            { text: "Edge Cache", score: 20, feedback: "Perfection. Most requests don't even need to hit origin now." },
            { text: "Scale Out", score: 15, feedback: "Classic horizontal scaling. It works, but your wallet is crying." },
            { text: "Maint-Mode", score: 5, feedback: "Safe, but you just missed the biggest marketing moment of the year." }
        ]
    },
    {
        id: 4,
        title: "The Zero-Day",
        description: "A security researcher reported an RCE vulnerability in your main API. Action?",
        choices: [
            { text: "Patch Now", score: 20, feedback: "Crisis averted. You moved fast and stayed secure." },
            { text: "Disable API", score: 15, feedback: "Drastic but effective. Better a broken feature than a stolen DB." },
            { text: "Legal Team", score: 5, feedback: "They're awake now, but the hackers are already in the S3 bucket." }
        ]
    }
];

const getRole = (score: number) => {
    if (score >= 70) return { title: "The Calm Debugger", desc: "You are the person everyone wants in the room when 'sh*t hits the fan'." };
    if (score >= 50) return { title: "The Senior Firefighter", desc: "You know your way around a terminal and usually save the day." };
    if (score >= 30) return { title: "The Panic Deployer", desc: "You fixed it, but your coworkers are still afraid to look at history." };
    return { title: "The Junior Intern", desc: "It was a rough first day. Maybe stay away from 'sudo' for a while." };
};

export default function ProductionIncidentGame() {
    const [gameState, setGameState] = useState<'intro' | 'playing' | 'feedback' | 'result'>('intro');
    const [scenarioIndex, setScenarioIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [lastFeedback, setLastFeedback] = useState("");

    const startGame = () => {
        setScore(0);
        setScenarioIndex(0);
        setGameState('playing');
    };

    const handleChoice = (choice: Choice) => {
        setScore(prev => prev + choice.score);
        setLastFeedback(choice.feedback);
        setGameState('feedback');
    };

    const nextScenario = () => {
        if (scenarioIndex < SCENARIOS.length - 1) {
            setScenarioIndex(prev => prev + 1);
            setGameState('playing');
        } else {
            setGameState('result');
        }
    };

    return (
        <div className="w-full flex items-center justify-center py-4">
            <div className="w-full max-w-2xl bg-[#0F172A] p-1.5 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] border-[4px] border-black/20">
                {/* Header / Tabs */}
                <div className="flex items-center gap-1 mb-1 px-1">
                    <div className={`px-6 py-3 rounded-t-2xl font-black text-xs md:text-sm tracking-tighter uppercase transition-colors ${gameState === 'playing' ? 'bg-[#F97316] text-white shadow-[0_-4px_0_rgba(0,0,0,0.2)_inset]' : 'bg-[#1E293B] text-gray-400 hover:text-white cursor-pointer'}`}>
                        Incident
                    </div>
                    <div className="px-6 py-3 rounded-t-2xl bg-[#1E293B] text-gray-400 font-black text-xs md:text-sm tracking-tighter uppercase hidden sm:block">
                        Team
                    </div>
                    <div className="px-6 py-3 rounded-t-2xl bg-[#1E293B] text-gray-400 font-black text-xs md:text-sm tracking-tighter uppercase hidden sm:block">
                        Integrations
                    </div>
                    <div className="ml-auto w-10 h-10 flex items-center justify-center text-white/40">
                        <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="20" height="2" fill="currentColor"/>
                            <rect y="6" width="20" height="2" fill="currentColor"/>
                            <rect y="12" width="20" height="2" fill="currentColor"/>
                        </svg>
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-2xl p-6 md:p-10 border-[6px] border-[#0F172A]">
                    <AnimatePresence mode="wait">
                        {gameState === 'intro' && (
                            <motion.div
                                key="intro"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex flex-col items-center text-center"
                            >
                                <div className="flex gap-8 items-center mb-8 flex-col md:flex-row">
                                     <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-100 rounded-2xl border-2 border-black/5 flex items-center justify-center overflow-hidden">
                                        <img src="/pixel-engineer.png" alt="Engineer" className="w-full h-full object-contain pixelatedScale" />
                                     </div>
                                     <div className="text-left max-w-sm">
                                        <h2 className="text-3xl font-black text-[#0F172A] uppercase tracking-tighter leading-none mb-4">Survive cli</h2>
                                        <p className="text-gray-500 font-bold text-sm leading-relaxed mb-6">
                                            A critical production incident has been detected. As the on-call engineer, your decisions will determine the system's fate.
                                        </p>
                                     </div>
                                </div>
                                <button
                                    onClick={startGame}
                                    className="w-full max-w-sm bg-[#F97316] text-white font-black py-4 rounded-xl border-b-[6px] border-black/20 hover:border-b-[2px] hover:translate-y-[4px] transition-all uppercase tracking-widest text-sm shadow-[0_10px_20px_rgba(249,115,22,0.3)]"
                                >
                                    Start Incident Analysis
                                </button>
                            </motion.div>
                        )}

                        {gameState === 'playing' && (
                            <motion.div
                                key={`scenario-${scenarioIndex}`}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <div className="flex gap-6 md:gap-10 mb-8 items-start flex-col md:flex-row">
                                    <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-xl border-2 border-black/5 flex-shrink-0">
                                        <img src="/pixel-engineer.png" alt="Engineer" className="w-full h-full object-contain pixelatedScale scale-110" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-[10px] font-black uppercase text-[#F97316] mb-2 tracking-widest">
                                            Scenario {scenarioIndex + 1} / {SCENARIOS.length}
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-black text-[#0F172A] uppercase tracking-tighter mb-4 leading-tight">
                                            {SCENARIOS[scenarioIndex].title}
                                        </h3>
                                        <div className="bg-gray-50 border-2 border-black/5 p-4 md:p-6 rounded-xl relative">
                                            <p className="text-gray-600 text-sm md:text-base font-bold leading-relaxed italic">
                                                "{SCENARIOS[scenarioIndex].description}"
                                            </p>
                                            <div className="absolute -left-2 top-6 w-4 h-4 bg-gray-50 rotate-45 border-l-2 border-b-2 border-black/5" />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t-2 border-dashed border-gray-200">
                                    {SCENARIOS[scenarioIndex].choices.map((choice, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleChoice(choice)}
                                            className={`py-4 rounded-xl font-black text-white uppercase tracking-tighter text-xs md:text-sm border-b-[6px] border-black/20 hover:border-b-[2px] hover:translate-y-[4px] transition-all shadow-lg
                                                ${i === 0 ? 'bg-[#22C55E]' : i === 1 ? 'bg-[#3B82F6]' : 'bg-[#EF4444]'}`}
                                        >
                                            {choice.text}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {gameState === 'feedback' && (
                            <motion.div
                                key="feedback"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center text-center"
                            >
                                <div className="flex gap-8 items-center mb-10 flex-col md:flex-row">
                                    <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-xl border-2 border-black/5 flex-shrink-0 animate-bounce">
                                        <img src="/pixel-engineer.png" alt="Engineer" className="w-full h-full object-contain pixelatedScale" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-2xl font-black text-[#0F172A] uppercase tracking-tighter mb-2">Systems Analysis</h3>
                                        <p className="text-gray-500 font-bold text-lg leading-relaxed italic border-l-4 border-[#22C55E] pl-6 bg-gray-50 py-4 rounded-r-xl pr-6">
                                            "{lastFeedback}"
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={nextScenario}
                                    className="w-full max-w-xs bg-[#3B82F6] text-white font-black py-4 rounded-xl border-b-[6px] border-black/20 hover:border-b-[2px] hover:translate-y-[4px] transition-all uppercase tracking-widest text-sm"
                                >
                                    Continue Mission
                                </button>
                            </motion.div>
                        )}

                        {gameState === 'result' && (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center text-center"
                            >
                                <div className="w-full flex flex-col md:flex-row gap-10 items-center justify-center mb-10">
                                    <div className="w-32 h-32 md:w-48 md:h-48 bg-[#F8FAFC] rounded-3xl border-4 border-black/5 flex items-center justify-center p-4 relative">
                                        <img src="/pixel-engineer.png" alt="Engineer" className="w-full h-full object-contain pixelatedScale" />
                                        <div className="absolute -bottom-4 right-0 bg-[#F97316] text-white p-3 rounded-xl border-[3px] border-black shadow-[4px_4px_0_rgba(0,0,0,0.1)]">
                                            <FiAward size={24} />
                                        </div>
                                    </div>
                                    
                                    <div className="text-left flex-1">
                                        <div className="text-[10px] font-black text-[#F97316] uppercase tracking-[0.4em] mb-2">Shift Report</div>
                                        <h3 className="text-4xl md:text-5xl font-black text-[#0F172A] uppercase tracking-tighter leading-none mb-4">
                                            {getRole(score).title}
                                        </h3>
                                        <p className="text-gray-500 font-bold text-sm md:text-md leading-relaxed mb-6">
                                            {getRole(score).desc}
                                        </p>
                                        <div className="bg-[#F1F5F9] border-2 border-black/5 p-4 rounded-xl flex items-center justify-between">
                                            <span className="font-black text-gray-400 uppercase text-xs">Reliability Score</span>
                                            <span className="text-3xl font-black text-[#0F172A]">{score}</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={startGame}
                                    className="w-full max-w-sm bg-[#EF4444] text-white font-black py-4 rounded-xl border-b-[6px] border-black/20 hover:border-b-[2px] hover:translate-y-[4px] transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-3"
                                >
                                    <FiRotateCcw className="text-lg" /> New Deployment Shift
                                </button>
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
            `}</style>
        </div>
    );
}

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
            { text: "Check recent deployment logs", score: 15, feedback: "Smart. You spotted a bad config change immediately." },
            { text: "Restart all production servers", score: 5, feedback: "The 'Turn it off and on again' approach. Temporary fix, but the root cause remains." },
            { text: "Post a status update", score: 10, feedback: "Communication is key, but the site is still down!" }
        ]
    },
    {
        id: 2,
        title: "The Connection Pool",
        description: "Logs show 'Connection pool exhausted'. The database is gasping for air. How do you recover?",
        choices: [
            { text: "Kill long-running queries", score: 20, feedback: "Exactly. A rogue analytics query was blocking everything." },
            { text: "Double the pool size", score: 5, feedback: "You just shifted the bottleneck to the DB CPU. Now it's melting." },
            { text: "Scale the DB vertically", score: 10, feedback: "Brute force works, but it cost the company $5k in 5 minutes." }
        ]
    },
    {
        id: 3,
        title: "The Traffic Spike",
        description: "A viral tweet sent 100k users to the site in 60 seconds. CPU usage is at 100%. What's the plan?",
        choices: [
            { text: "Enable edge caching", score: 20, feedback: "Perfection. Most requests don't even need to hit origin now." },
            { text: "Spin up 20 more nodes", score: 15, feedback: "Classic horizontal scaling. It works, but your wallet is crying." },
            { text: "Enable maintenance mode", score: 5, feedback: "Safe, but you just missed the biggest marketing moment of the year." }
        ]
    },
    {
        id: 4,
        title: "The Zero-Day",
        description: "A security researcher reported an RCE vulnerability in your main API. Action?",
        choices: [
            { text: "Apply patch & redeploy", score: 20, feedback: "Crisis averted. You moved fast and stayed secure." },
            { text: "Disable the endpoint", score: 15, feedback: "Drastic but effective. Better a broken feature than a stolen DB." },
            { text: "Email the legal team", score: 5, feedback: "They're awake now, but the hackers are already in the S3 bucket." }
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
        <div className="w-full flex flex-col items-center justify-center py-10 px-4 min-h-[400px]">
            <AnimatePresence mode="wait">
                {gameState === 'intro' && (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                        className="bg-[#111111] border-[4px] border-black p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] max-w-md w-full text-center"
                    >
                        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-red-500/20">
                            <FiAlertTriangle className="text-red-500 text-3xl" />
                        </div>
                        <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Survive CLI</h2>
                        <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-8">Production Incident Simulator</p>
                        
                        <button
                            onClick={startGame}
                            className="w-full bg-white text-black font-black py-4 rounded-2xl hover:scale-105 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2 group"
                        >
                            <FiPlay className="group-hover:fill-current" /> Initialize Recovery
                        </button>
                    </motion.div>
                )}

                {gameState === 'playing' && (
                    <motion.div
                        key={`scenario-${scenarioIndex}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-[#111111] border-[4px] border-black p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] max-w-lg w-full"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20 animate-pulse">
                                Incident #00{SCENARIOS[scenarioIndex].id}
                            </span>
                            <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">
                                {scenarioIndex + 1} / {SCENARIOS.length}
                            </span>
                        </div>

                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4 leading-tight">
                            {SCENARIOS[scenarioIndex].title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-10 font-medium">
                            {SCENARIOS[scenarioIndex].description}
                        </p>

                        <div className="space-y-3">
                            {SCENARIOS[scenarioIndex].choices.map((choice, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleChoice(choice)}
                                    className="w-full text-left bg-white/5 hover:bg-white/10 text-white p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all font-bold text-sm tracking-tight"
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
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-[#111111] border-[4px] border-black p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] max-w-md w-full text-center"
                    >
                        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-green-500/20">
                            <FiCheckCircle className="text-green-500 text-2xl" />
                        </div>
                        <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-4">Action Taken</h3>
                        <p className="text-gray-400 text-sm mb-10 font-medium leading-relaxed italic">
                            "{lastFeedback}"
                        </p>
                        
                        <button
                            onClick={nextScenario}
                            className="w-full bg-white text-black font-black py-4 rounded-2xl hover:scale-105 transition-all uppercase tracking-widest text-xs"
                        >
                            Next Challenge
                        </button>
                    </motion.div>
                )}

                {gameState === 'result' && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="bg-[#111111] border-[4px] border-black p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] max-w-md w-full text-center"
                    >
                        <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-yellow-500/20">
                            <FiAward className="text-yellow-500 text-3xl" />
                        </div>
                        <h2 className="text-sm font-black text-yellow-500 uppercase tracking-[0.4em] mb-4">Post-Mortem Result</h2>
                        <h3 className="text-4xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
                            {getRole(score).title}
                        </h3>
                        <p className="text-gray-400 text-sm font-medium mb-12 leading-relaxed">
                            {getRole(score).desc}
                        </p>
                        
                        <div className="mb-12">
                            <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Final Reliability Score</div>
                            <div className="text-5xl font-black text-white">{score}</div>
                        </div>

                        <button
                            onClick={startGame}
                            className="w-full bg-white text-black font-black py-4 rounded-2xl hover:scale-105 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2 group"
                        >
                            <FiRotateCcw className="group-hover:rotate-180 transition-transform duration-500" /> New Shift
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

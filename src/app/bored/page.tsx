"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SectionWrapper from "@/components/SectionWrapper";
import LifeWeeks from "@/components/LifeWeeks";
import TravelBoard from "@/components/TravelBoard";
import Harmonium from "@/components/Harmonium";
import { motion, AnimatePresence } from "framer-motion";

export default function BoredPage() {
    const [activeGame, setActiveGame] = useState<"weeks" | "harmonium" | null>(null);
    const [movieImages, setMovieImages] = useState<string[]>([]);

    useEffect(() => {
        // Since we are now in a Client Component, we provide the static list of movie images
        // directly. This ensures the page is fast and doesn't require server-side FS reads
        // for content that is essentially static assets.
        const movies = [
            "13b.jpg", "3Idiots.jpg", "500daysOfSummer.jpg", "Batman.jpg", "BeautifulMind.jpg",
            "Boys.jpg", "BreakingBad.jpg", "CatchMeIfYouCan.jpg", "Dalapathi.jpg", "DeadPoetSociety .jpg",
            "Deadpool.jpg", "ESSM.jpg", "ForestGump.jpg", "GoodWillHunting.jpg", "Her.jpg",
            "HowToLooseAGuy.jpg", "Johnwick.jpg", "LalaLand.jpg", "Limitless.jpg", "MrNobody.jpg",
            "NottingHill.jpg", "October.jpg", "Oye.jpg", "PK.jpg", "Predestination.jpg",
            "Prestige.jpg", "ReadyPlayerOne.jpg", "Rush.jpg", "Shawshank.jpg", "ShutterIsland.jpg",
            "SixthSense.jpg", "SocialNetwork.jpg", "Swades.jpg", "Termina;.jpg", "Tumbbad.jpg",
            "VanillaSky.jpg", "ZNMD.jpg", "dark.jpg", "fightClub.jpg", "inception.jpg"
        ].map(file => `/movies/${file}`);
        setMovieImages(movies);
    }, []);

    return (
        <main className="min-h-screen flex flex-col pt-24 text-black selection:bg-[#ff5500] selection:text-white bg-[#FDFBF7] overflow-x-hidden">
            {/* Basic Nav */}
            <nav className="fixed top-0 left-0 w-full p-6 z-[100] flex justify-between items-center bg-[#FDFBF7]/80 backdrop-blur-md border-b-2 border-black overflow-hidden">
                <Link href="/" className="font-black text-xl tracking-tighter uppercase hover:text-[#ff5500] transition-colors">
                    ← Back to Portfolio
                </Link>
                <div className="flex gap-4 md:gap-8 text-[9px] md:text-[10px] font-black uppercase tracking-widest opacity-60 overflow-x-auto">
                   <a href="#gamezone" className="hover:text-black whitespace-nowrap">Game Zone</a>
                   <a href="#about" className="hover:text-black whitespace-nowrap">Movies</a>
                   <a href="#travel" className="hover:text-black whitespace-nowrap">Travel</a>
                </div>
            </nav>

            {/* PARTITION 1: GAME ZONE */}
            <section 
                id="gamezone"
                className="relative min-h-[95vh] flex flex-col justify-center bg-cover bg-center overflow-hidden border-b-[3px] border-black"
                style={{ backgroundImage: `url('/gamezone-bg.jpg')` }}
            >
                <SectionWrapper className="relative z-10 py-12 md:py-20 text-center flex flex-col items-center">
                    <h1
                        className="text-7xl md:text-9xl font-black uppercase tracking-tighter mb-4 text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
                        style={{ fontFamily: 'Impact, sans-serif' }}
                    >
                        GAME ZONE
                    </h1>

                    <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
                        <AnimatePresence mode="wait">
                            {!activeGame && (
                                <motion.div 
                                    key="selection"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="flex flex-col md:flex-row gap-8 items-center justify-center mt-12"
                                >
                                    {/* Option 1: Life Weeks */}
                                    <button 
                                        onClick={() => setActiveGame("weeks")}
                                        className="group relative bg-[#FDFBF7] text-black px-10 py-12 rounded-[3.5rem] border-[4px] border-black transition-all hover:scale-105 hover:bg-white shadow-[8px_8px_0px_#000]"
                                    >
                                        <span className="font-black text-2xl uppercase tracking-tighter block mb-2">Weeks Left</span>
                                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Calculate Reality</span>
                                    </button>

                                    <div className="text-white font-black text-2xl italic opacity-50">OR</div>

                                    {/* Option 2: Harmonium */}
                                    <button 
                                        onClick={() => setActiveGame("harmonium")}
                                        className="group relative bg-[#4E342E] text-[#D7CCC8] px-10 py-12 rounded-[3.5rem] border-[4px] border-[#3E2723] transition-all hover:scale-105 hover:bg-[#5D4037] shadow-[8px_8px_0px_#000]"
                                    >
                                        <span className="font-black text-2xl uppercase tracking-tighter block mb-2">Play Harmonium</span>
                                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Lid Angle Sensitive</span>
                                    </button>
                                </motion.div>
                            )}

                            {activeGame === "weeks" && (
                                <motion.div key="weeks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
                                    <LifeWeeks />
                                    <button onClick={() => setActiveGame(null)} className="mt-4 text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white underline">Back to Games</button>
                                </motion.div>
                            )}

                            {activeGame === "harmonium" && (
                                <motion.div key="harmonium" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
                                    <Harmonium />
                                    <button onClick={() => setActiveGame(null)} className="mt-8 text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white underline">Back to Games</button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </SectionWrapper>
            </section>

            <section 
                id="about" 
                className="w-full py-32 overflow-hidden border-b-[3px] border-black bg-cover bg-center transition-all duration-1000 relative"
                style={{ backgroundImage: `url('/movies-bg.jpg')` }}
            >
                {/* Darker overlay for better text contrast against the stickers */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

                <div className="flex flex-col w-full relative z-10"> {/* Bypassing SectionWrapper for true full-width */}
                    <h2
                        className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-20 text-center text-white px-8 max-w-6xl mx-auto drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
                        style={{ fontFamily: 'Impact, sans-serif' }}
                    >
                        MORE ABOUT ME
                    </h2>

                    <div className="flex flex-col w-full text-center">
                        <h3 className="text-3xl md:text-5xl font-black tracking-tight mb-16 text-white uppercase tracking-[0.2em] px-8 max-w-6xl mx-auto drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                            Movies I like
                        </h3>

                        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-10 xl:grid-cols-10 gap-0 w-full mb-12 border-y-4 border-black/20">
                            {movieImages.slice(0, 40).map((src, i) => (
                                <div key={i} className="w-full aspect-[2/3] overflow-hidden border-black/30 border-[0.5px] hover:z-50 hover:scale-110 transition-all duration-500 group cursor-pointer shadow-2xl">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={src} alt={`Movie Poster ${i + 1}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* PARTITION: TRAVEL SOUVENIRS */}
            <section id="travel" className="w-full bg-[#FAFAF5] py-32 overflow-hidden border-b-[3px] border-black">
                <SectionWrapper className="flex flex-col items-center">
                    <h2
                        className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-20 text-center text-black"
                        style={{ fontFamily: 'Impact, sans-serif' }}
                    >
                        TRAVEL BOARD
                    </h2>

                    <TravelBoard />
                    
                    <p className="mt-12 text-black/40 font-black uppercase tracking-widest text-xs">
                        Drag the souvenirs around • More memories coming soon
                    </p>
                </SectionWrapper>
            </section>
        </main>
    );
}

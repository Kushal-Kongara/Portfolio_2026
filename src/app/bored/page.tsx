"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SectionWrapper from "@/components/SectionWrapper";
import LifeWeeks from "@/components/LifeWeeks";
import TravelBoard from "@/components/TravelBoard";
import { motion } from "framer-motion";

export default function BoredPage() {
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
                        <LifeWeeks />
                    </div>
                </SectionWrapper>
            </section>

            <section 
                id="about" 
                className="w-full py-32 overflow-hidden border-b-[3px] border-black bg-black transition-all duration-1000 relative"
            >
                {/* Clean black background for Movies section */}

                <div className="flex flex-col w-full relative z-10"> {/* Bypassing SectionWrapper for true full-width */}
                    <h2
                        className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-10 text-center text-white px-8 max-w-4xl mx-auto drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
                        style={{ fontFamily: 'Impact, sans-serif' }}
                    >
                        MORE ABOUT ME
                    </h2>

                    <div className="flex flex-col w-full text-center">
                        <h3 className="text-xl md:text-2xl font-black tracking-tight mb-10 text-white uppercase tracking-[0.2em] px-8 max-w-4xl mx-auto drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                            Movies I like
                        </h3>

                        <div className="grid grid-cols-6 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-15 gap-0 w-full mb-12 border-y-4 border-white/10">
                            {movieImages.slice(0, 40).map((src, i) => (
                                <div key={i} className="w-full aspect-[2/3] overflow-hidden border-white/10 border-[0.5px] hover:z-50 hover:scale-110 transition-all duration-500 group cursor-pointer shadow-2xl">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={src} alt={`Movie Poster ${i + 1}`} className="w-full h-full object-cover transition-all duration-700" />
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

import Link from "next/link";
import SectionWrapper from "@/components/SectionWrapper";
import fs from 'fs';
import path from 'path';
import LifeWeeks from "@/components/LifeWeeks";
import TravelBoard from "@/components/TravelBoard";
import MovieMarquee from "@/components/MovieMarquee";

export default function BoredPage() {
    // Dynamically read uploaded images from public/movies
    const moviesDirectory = path.join(process.cwd(), 'public/movies');
    let movieImages: string[] = [];
    try {
        if (fs.existsSync(moviesDirectory)) {
            movieImages = fs.readdirSync(moviesDirectory)
                .filter(file => /\.(jpg|jpeg|png|gif|webp|avif)$/i.test(file))
                .map(file => `/movies/${file}`);
        }
    } catch (e) {
        console.error("Error reading movies directory:", e);
    }

    // Split for two marquee rows
    const firstRow = movieImages.slice(0, Math.ceil(movieImages.length / 2));
    const secondRow = movieImages.slice(Math.ceil(movieImages.length / 2));

    return (
        <main className="min-h-screen flex flex-col pt-24 text-black selection:bg-[#ff5500] selection:text-white bg-[#FDFBF7]">
            {/* Basic Nav */}
            <nav className="fixed top-0 left-0 w-full p-6 z-[100] flex justify-between items-center bg-[#FDFBF7]/80 backdrop-blur-md border-b-2 border-black">
                <Link href="/" className="font-black text-xl tracking-tighter uppercase hover:text-[#ff5500] transition-colors">
                    ← Back to Portfolio
                </Link>
                <div className="flex gap-4 md:gap-8 text-[9px] md:text-[10px] font-black uppercase tracking-widest opacity-60 overflow-x-auto">
                   <a href="#gamezone" className="hover:text-black whitespace-nowrap">Game Zone</a>
                   <a href="#about" className="hover:text-black whitespace-nowrap">Movies</a>
                   <a href="#travel" className="hover:text-black whitespace-nowrap">Travel</a>
                   <a href="#collection" className="hover:text-black whitespace-nowrap">Collection</a>
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

                    <div className="w-full max-w-4xl mx-auto flex justify-center">
                        <div className="relative p-4">
                            <div className="relative z-20">
                                <LifeWeeks />
                            </div>
                        </div>
                    </div>
                </SectionWrapper>
            </section>

            {/* PARTITION 2: MORE ABOUT ME (Movies - Left/Right Marquee) */}
            <section id="about" className="w-full bg-[#FDFBF7] py-32 overflow-hidden border-b-[3px] border-black">
                <SectionWrapper className="flex flex-col">
                    <h2
                        className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-20 text-center text-black"
                        style={{ fontFamily: 'Impact, sans-serif' }}
                    >
                        MORE ABOUT ME
                    </h2>

                    <div className="flex flex-col w-full text-center">
                        <h3 className="text-3xl md:text-5xl font-black tracking-tight mb-20 text-black flex items-center justify-center gap-6">
                            <span className="w-12 h-1 bg-black hidden md:block" />
                            Movies I like
                            <span className="w-12 h-1 bg-black hidden md:block" />
                        </h3>

                        {/* Edge-to-Edge Marquees */}
                        <div className="flex flex-col gap-1 md:gap-4 -mt-10 overflow-hidden">
                            <MovieMarquee images={firstRow.length > 0 ? firstRow : ["/movies/placeholder1.jpg"]} direction="left" speed={35} />
                            <MovieMarquee images={secondRow.length > 0 ? secondRow : ["/movies/placeholder2.jpg"]} direction="right" speed={45} />
                        </div>
                    </div>
                </SectionWrapper>
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

            {/* PARTITION 3: THE COLLECTION */}
            <section id="collection" className="w-full bg-[#F5F5F0] py-32 overflow-hidden">
                <SectionWrapper className="flex flex-col items-center">
                    <h2
                        className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-20 text-center text-black"
                        style={{ fontFamily: 'Impact, sans-serif' }}
                    >
                        THE COLLECTION
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto w-full px-4">
                        <div className="group border-[4px] border-black p-10 rounded-[2.5rem] bg-[#E5F4FF] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-300 shadow-[10px_10px_0px_#000] flex flex-col items-center text-center h-full">
                            <div className="w-20 h-20 bg-white border-2 border-black rounded-full mb-8 flex items-center justify-center text-4xl shadow-[4px_4px_0px_#000] group-hover:animate-bounce">🌐</div>
                            <h3 className="text-3xl font-black uppercase tracking-tight mb-4 text-black italic">Links</h3>
                            <p className="text-slate-700 font-bold text-lg leading-relaxed opacity-70">A collection of cool websites and digital rabbit holes.</p>
                        </div>

                        <div className="group border-[4px] border-black p-10 rounded-[2.5rem] bg-[#E5FFE9] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-300 shadow-[10px_10px_0px_#000] flex flex-col items-center text-center h-full">
                            <div className="w-20 h-20 bg-white border-2 border-black rounded-full mb-8 flex items-center justify-center text-4xl shadow-[4px_4px_0px_#000] group-hover:rotate-12 transition-transform">✈️</div>
                            <h3 className="text-3xl font-black uppercase tracking-tight mb-4 text-black italic">Travel</h3>
                            <p className="text-slate-700 font-bold text-lg leading-relaxed opacity-70">Memories, favorite destinations, and bucket list spots.</p>
                        </div>

                        <div className="group border-[4px] border-black p-10 rounded-[2.5rem] bg-[#FFF5E5] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-300 shadow-[10px_10px_0px_#000] flex flex-col items-center text-center h-full">
                            <div className="w-20 h-20 bg-white border-2 border-black rounded-full mb-8 flex items-center justify-center text-4xl shadow-[4px_4px_0px_#000] group-hover:scale-110 transition-transform">💡</div>
                            <h3 className="text-3xl font-black uppercase tracking-tight mb-4 text-black italic">Inspiration</h3>
                            <p className="text-slate-700 font-bold text-lg leading-relaxed opacity-70">Thinkers and creators whose work I truly admire.</p>
                        </div>
                    </div>
                </SectionWrapper>
            </section>
        </main>
    );
}

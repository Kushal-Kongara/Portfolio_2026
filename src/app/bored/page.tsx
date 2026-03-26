import Link from "next/link";
import SectionWrapper from "@/components/SectionWrapper";
import fs from 'fs';
import path from 'path';
import LifeWeeks from "@/components/LifeWeeks";

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

    return (
        <main 
            className="min-h-screen flex flex-col pt-24 text-black bg-fixed bg-cover bg-center"
            style={{ backgroundImage: `url('/gamezone-bg.jpg')` }}
        >
            <div className="fixed inset-0 bg-white/30 backdrop-blur-[2px] pointer-events-none" />

            {/* Basic Nav for the new page */}
            <nav className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center bg-white/70 backdrop-blur-xl border-b-2 border-black/10">
                <Link href="/" className="font-black text-xl tracking-tighter uppercase hover:text-[#ff5500] transition-colors drop-shadow-sm">
                    ← Back to Portfolio
                </Link>
            </nav>

            <SectionWrapper className="flex-1 flex flex-col pt-10 pb-10 text-center relative z-10">
                <h1
                    className="text-7xl md:text-9xl font-black uppercase tracking-tighter mb-6 text-black drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
                    style={{ fontFamily: 'Impact, sans-serif' }}
                >
                    GAME ZONE
                </h1>

                <div className="w-full max-w-5xl mx-auto py-12">
                    <LifeWeeks />
                </div>
            </SectionWrapper>

            {/* MORE ABOUT ME SECTION */}
            <div className="w-full bg-white/40 backdrop-blur-3xl border-t-[3px] border-black/10 py-24 overflow-hidden relative z-10">
                <SectionWrapper className="flex flex-col">
                    <h2
                        className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-16 text-center text-black"
                        style={{ fontFamily: 'Impact, sans-serif' }}
                    >
                        MORE ABOUT ME
                    </h2>

                    {/* Movies I Like */}
                    <div className="mb-24 flex flex-col w-full text-left max-w-6xl mx-auto">
                        <h3 className="text-3xl md:text-5xl font-black tracking-tight mb-8 text-black">
                            Movies I like
                        </h3>

                        {/* Grid Wall */}
                        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-4 w-full">
                            {movieImages.slice(0, 40).map((src, i) => (
                                <div key={i} className="w-full aspect-[2/3] overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={src} alt={`Movie Poster ${i + 1}`} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Other Sections */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto w-full">
                        {/* Interesting website links */}
                        <div className="border-4 border-black p-8 md:p-10 rounded-2xl bg-[#E5F4FF] hover:-translate-y-2 transition-transform duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-white border-2 border-black rounded-full mb-6 flex items-center justify-center text-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">🌐</div>
                            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-4 text-black">Interesting Links</h3>
                            <p className="text-gray-800 font-medium text-lg leading-relaxed">Coming soon: A collection of cool websites, resources, and digital rabbit holes.</p>
                        </div>

                        {/* Places I visited */}
                        <div className="border-4 border-black p-8 md:p-10 rounded-2xl bg-[#E5FFE9] hover:-translate-y-2 transition-transform duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-white border-2 border-black rounded-full mb-6 flex items-center justify-center text-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">✈️</div>
                            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-4 text-black">Places I Visited</h3>
                            <p className="text-gray-800 font-medium text-lg leading-relaxed">Coming soon: Travel memories, favorite destinations, and bucket list spots.</p>
                        </div>

                        {/* People who inspire me */}
                        <div className="border-4 border-black p-8 md:p-10 rounded-2xl bg-[#FFF5E5] hover:-translate-y-2 transition-transform duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center text-center lg:col-span-1 md:col-span-2">
                            <div className="w-16 h-16 bg-white border-2 border-black rounded-full mb-6 flex items-center justify-center text-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">💡</div>
                            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-4 text-black">People Who Inspire Me</h3>
                            <p className="text-gray-800 font-medium text-lg leading-relaxed">Coming soon: Thinkers, creators, and individuals whose work I truly admire.</p>
                        </div>
                    </div>
                </SectionWrapper>
            </div>
        </main>
    );
}

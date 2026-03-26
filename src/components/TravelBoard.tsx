"use client";

import { motion } from "framer-motion";

const souvenirs = [
    { name: "Eiffel Pin", emoji: "📍", color: "#FEE2E2", rotate: -5 },
    { name: "Tokyo Magnet", emoji: "🗼", color: "#FEF3C7", rotate: 8 },
    { name: "New York Mug", emoji: "☕", color: "#D1FAE5", rotate: -3 },
    { name: "London Ticket", emoji: "🎟️", color: "#DBEAFE", rotate: 12 },
    { name: "Swiss Key", emoji: "🔑", color: "#F3E8FF", rotate: -9 },
    { name: "Bali Shell", emoji: "🐚", color: "#FFEDD5", rotate: 6 },
    { name: "Rome Coin", emoji: "🪙", color: "#F1F5F9", rotate: -15 },
    { name: "Osaka Mask", emoji: "🎭", color: "#E0F2FE", rotate: 10 },
];

export default function TravelBoard() {
    return (
        <div className="relative w-full max-w-5xl bg-[#8B4513]/10 border-[6px] border-[#5D2E0A] p-12 md:p-20 rounded-lg shadow-inner min-h-[600px] flex flex-wrap justify-center items-start gap-12 bg-[radial-gradient(#5D2E0A_1px,_transparent_1px)] bg-[size:30px_30px]">
            <div className="absolute top-4 left-4 bg-[#5D2E0A] text-white px-4 py-1 text-xs font-black uppercase rounded shadow-md">Pinned Memories</div>
            
            {souvenirs.map((item, i) => (
                <motion.div
                    key={i}
                    drag
                    dragConstraints={{ top: -100, left: -100, right: 100, bottom: 100 }}
                    whileHover={{ scale: 1.1, rotate: 0, zIndex: 50 }}
                    initial={{ rotate: item.rotate, opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative cursor-grab active:cursor-grabbing"
                    style={{ zIndex: i }}
                >
                    {/* Pin Head */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-red-600 rounded-full border-2 border-black/20 shadow-md z-10" />
                    
                    <div 
                        className="w-32 h-40 md:w-40 md:h-52 p-4 flex flex-col items-center justify-between border-2 border-black shadow-lg rounded-sm"
                        style={{ backgroundColor: item.color }}
                    >
                        <div className="text-5xl md:text-7xl mt-4 select-none">{item.emoji}</div>
                        <div className="w-full border-t border-black/10 pt-2 text-center pointer-events-none">
                            <span className="text-[10px] md:text-xs font-black uppercase tracking-tighter opacity-40">{item.name}</span>
                        </div>
                    </div>
                </motion.div>
            ))}

            <div className="absolute bottom-8 right-8 text-black opacity-[0.03] text-8xl md:text-[12rem] font-black uppercase tracking-tighter pointer-events-none select-none">
                VOYAGE
            </div>
        </div>
    );
}

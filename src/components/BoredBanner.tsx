"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BoredBanner() {
    const [clicked, setClicked] = useState(false);
    const router = useRouter();
    const text = clicked ? "ENTERING GAME ZONE..." : "CLICK ON ME IF BORED";

    const handleBoredClick = () => {
        if (clicked) return;
        setClicked(true);
        setTimeout(() => {
            router.push("/bored");
        }, 1000);
    };

    return (
        <div
            className={`w-full ${clicked ? 'bg-[#ff5500]' : 'bg-[#0cae67]'} hover:brightness-110 border-y-[3px] border-black overflow-hidden flex cursor-pointer select-none transition-all duration-300 relative z-10`}
            onClick={handleBoredClick}
        >
            <motion.div
                className="flex whitespace-nowrap py-2.5 items-center"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: clicked ? 3 : 25, // speeds up when clicked!
                }}
            >
                {[...Array(30)].map((_, i) => (
                    <div key={i} className="flex items-center gap-6 px-3">
                        <span className={`text-black font-black italic text-sm md:text-base tracking-[0.2em] uppercase ${clicked ? 'scale-110' : ''} transition-transform`}>
                            {text}
                        </span>
                        <span className="text-black text-sm md:text-base">✱</span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

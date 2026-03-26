"use client";

import { motion } from "framer-motion";

interface MovieMarqueeProps {
    images: string[];
    direction?: "left" | "right";
    speed?: number;
}

export default function MovieMarquee({ images, direction = "left", speed = 40 }: MovieMarqueeProps) {
    if (images.length === 0) return null;
    
    // Duplicate images to create a seamless loop
    const duplicatedImages = [...images, ...images, ...images];

    return (
        <div className="relative w-screen overflow-hidden py-4 -mx-[50vw] left-1/2">
            <motion.div
                className="flex gap-4 w-max px-4"
                animate={{
                    x: direction === "left" ? [0, -1000] : [-1000, 0],
                }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: speed,
                        ease: "linear",
                    },
                }}
            >
                {duplicatedImages.map((src, i) => (
                    <div 
                        key={i} 
                        className="w-40 md:w-52 aspect-[2/3] overflow-hidden rounded-xl border-2 border-black/10 hover:border-black transition-all group cursor-pointer relative"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                            src={src} 
                            alt={`Movie Poster ${i + 1}`} 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

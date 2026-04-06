"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

const SKETCHY_RADIUS = "255px 15px 225px 15px/15px 225px 15px 255px";
const TRAIL_LENGTH = 6;

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

export default function CustomCursor() {
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const trailIdRef = useRef(0);
  const lastTrailUpdate = useRef(0);

  // Inner dot — instant follow
  const dotX = useSpring(0, { stiffness: 1000, damping: 50 });
  const dotY = useSpring(0, { stiffness: 1000, damping: 50 });

  // Outer ring — spring lag
  const ringX = useSpring(0, { stiffness: 150, damping: 15 });
  const ringY = useSpring(0, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;

      if (!isVisible) setIsVisible(true);

      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);

      // Throttle trail updates to ~60fps
      const now = Date.now();
      if (now - lastTrailUpdate.current > 16) {
        lastTrailUpdate.current = now;
        setTrail((prev) => {
          const next = [
            { x: e.clientX, y: e.clientY, id: trailIdRef.current++ },
            ...prev,
          ].slice(0, TRAIL_LENGTH);
          return next;
        });
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], input, textarea, select, label");
      setIsHovering(!!interactive);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [dotX, dotY, ringX, ringY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Trail blobs */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed pointer-events-none z-[9998]"
          style={{
            left: point.x - 3,
            top: point.y - 3,
            width: 6,
            height: 6,
            backgroundColor: "#ff5500",
            borderRadius: SKETCHY_RADIUS,
            opacity: (1 - index / TRAIL_LENGTH) * 0.45,
            transform: `scale(${1 - index * 0.12})`,
            transition: "opacity 0.1s ease",
          }}
        />
      ))}

      {/* Outer ring */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovering ? 56 : 36,
          height: isHovering ? 56 : 36,
          backgroundColor: isHovering ? "#ff5500" : "transparent",
          border: "3px solid black",
          borderRadius: SKETCHY_RADIUS,
          transition: "width 0.2s ease, height 0.2s ease, background-color 0.15s ease",
          mixBlendMode: isHovering ? "normal" : "normal",
        }}
      />

      {/* Inner dot */}
      {!isHovering && (
        <motion.div
          className="fixed pointer-events-none z-[9999]"
          style={{
            x: dotX,
            y: dotY,
            translateX: "-50%",
            translateY: "-50%",
            width: 10,
            height: 10,
            backgroundColor: "#ff5500",
            border: "2px solid black",
            borderRadius: SKETCHY_RADIUS,
          }}
        />
      )}
    </>
  );
}

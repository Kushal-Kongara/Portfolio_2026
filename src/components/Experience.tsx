"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { experiences, type ExperienceItem } from "@/lib/constants";

const BAND_THEMES = [
  {
    bg: "bg-white",
    title: "text-black",
    text: "text-slate-900",
    accent: "bg-slate-100 text-black",
  },
  {
    bg: "bg-slate-50",
    title: "text-black",
    text: "text-slate-900",
    accent: "bg-white text-black",
  },
] as const;

function ExperienceCard({
  exp,
  index,
  total,
  theme,
}: {
  exp: ExperienceItem;
  index: number;
  total: number;
  theme: (typeof BAND_THEMES)[number];
}) {
  const illustrationRight = index % 2 === 0;

  // The very last element has no bottom clip, leaving it straight.
  const isLast = index === total - 1;
  const clipPathStyle = isLast
    ? "none"
    : index % 2 === 0
      ? "polygon(0 0, 100% 0, 100% calc(100% - 5vw), 0 100%)"
      : "polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 5vw))";

  const marginTop = index === 0 ? "0" : "-5vw";
  const zIndex = total - index; // Ensure earlier sections render on top

  return (
    <div
      className={`w-full relative ${theme.bg}`}
      style={{
        clipPath: clipPathStyle,
        marginTop: marginTop,
        zIndex: zIndex,
      }}
    >
      <div className={`max-w-7xl mx-auto px-6 pt-[calc(3vw+2rem)] md:pt-[calc(3vw+3rem)] pb-[calc(3vw+2rem)] md:pb-[calc(3vw+4rem)]`}>
        <div
          className={`grid gap-8 md:gap-16 items-center ${illustrationRight ? "md:grid-cols-[1fr_auto]" : "md:grid-cols-[auto_1fr]"
            }`}
        >
          {/* Text block: number—title + paragraphs */}
          <div className={`${illustrationRight ? "" : "md:order-2"}`}>
            <h3 className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-3 mb-3">
              <span className={`text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.9] ${theme.title}`}>
                {exp.company}
              </span>
            </h3>

            <div className={`mt-6 ${theme.text}`}>
              <p className="text-xl md:text-2xl font-bold mb-1 opacity-90">{exp.role}</p>
              <p className="text-base md:text-lg font-medium opacity-80 mb-8">
                {exp.period} · {exp.location}
              </p>

              {exp.skills.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {exp.skills.map(skill => (
                    <span
                      key={skill}
                      className={`px-3 py-1 text-sm font-bold uppercase tracking-wide rounded-full border-2 border-current opacity-80`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Illustration block */}
          <div className={`flex justify-center ${illustrationRight ? "md:justify-end" : "md:order-1 md:justify-start"}`}>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: index * 0.5 }}
              className={`relative w-40 h-40 md:w-56 md:h-56 rounded-[2rem] flex items-center justify-center text-[4rem] md:text-[6rem] font-black shadow-[12px_12px_0px_rgba(0,0,0,0.2)] border-4 border-black/5 ${theme.accent}`}
            >
              {exp.logo ? (
                <div className="relative w-full h-full rounded-[2.25rem] overflow-hidden bg-white/95">
                  <Image src={exp.logo} alt="" fill className="object-contain p-6" />
                </div>
              ) : (
                <span aria-hidden>{exp.company.charAt(0)}</span>
              )}

              {/* Fun decorative sparkles/shapes around the logo */}
              <motion.div
                className="absolute -top-6 -right-6 w-12 h-12 bg-slate-200 rounded-full border-4 border-black/10 shadow-lg"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-8 h-8 bg-white rounded-md border-4 border-black/10 shadow-lg"
                animate={{ rotate: [0, -45, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-0 relative overflow-hidden bg-white pt-10 md:pt-16">
      {/* Optional Top Heading - could just visually rely on the numbers, but keeping an anchor for semantic reasons */}
      <div className="max-w-7xl mx-auto px-6 pb-4">
        <motion.h2
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-[12vw] md:text-[5rem] lg:text-[6.5rem] font-black text-black uppercase tracking-tighter leading-none mb-8 md:mb-12 mt-8 text-left origin-left"
          style={{
            fontFamily: "Impact, system-ui, sans-serif",
            transform: "scaleY(1.2)",
            WebkitTextStroke: "2px black"
          }}
        >
          EXPERIENCE
        </motion.h2>
      </div>

      <div className="flex flex-col w-full">
        {experiences.map((exp, i) => (
          <ExperienceCard
            key={exp.company}
            exp={exp}
            index={i}
            total={experiences.length}
            theme={BAND_THEMES[i % BAND_THEMES.length]}
          />
        ))}
      </div>
    </section>
  );
}
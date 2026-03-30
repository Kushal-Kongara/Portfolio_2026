"use client";

import React from 'react';

interface SectionWrapperProps {
  id?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
  sectionRef?: React.RefObject<HTMLDivElement>;
}

export default function SectionWrapper({ 
  id,
  title, 
  children, 
  className = '', 
  sectionRef 
}: SectionWrapperProps) {
  const generatedId = title ? title.toLowerCase().replace(/\s+/g, '-') : undefined;
  const sectionId = id || generatedId;

  return (
    <section 
      id={sectionId} 
      ref={sectionRef as any}
      className="relative w-full overflow-hidden"
    >
      <div className={`mx-auto relative z-10 h-full flex flex-col items-center justify-center p-4 md:p-8 lg:p-12 ${className}`}>
        {/* Section Header */}
        {title && (
          <div className="mb-8 text-center w-full">
            <div className="inline-block relative">
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-white uppercase select-none relative z-10 [font-family:Impact,sans-serif] scale-y-125">
                {title}
              </h2>
              {/* Glitch Shadow Effect */}
              <div className="absolute top-1 left-1 w-full h-full text-rose-500 opacity-30 blur-[2px] font-extrabold text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter [font-family:Impact,sans-serif] scale-y-125 -z-10 translate-x-1 translate-y-1">
                {title}
              </div>
              <div className="absolute -bottom-1 left-0 w-full h-[3px] bg-white transform -skew-x-12"></div>
            </div>
          </div>
        )}

        {/* Content container */}
        <div className="w-full h-full">
          {children}
        </div>
      </div>
    </section>
  );
}

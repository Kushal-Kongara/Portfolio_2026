"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="relative w-full bg-[#151515] text-[#f4f4f0] py-10 md:py-16 flex justify-center border-t border-black/10 overflow-hidden">
      {/* Transparent Background Image */}
      <div
        className="absolute inset-0 z-0 pointer-events-none bg-cover bg-center opacity-[0.25]"
        style={{
          backgroundImage: "url('/contact-bg.jpg')"
        }}
      />

      <div className="relative z-10 w-full max-w-[1400px] px-6 md:px-12 lg:px-20">

        {/* The extremely large heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[14vw] md:text-[8rem] lg:text-[10rem] font-black text-black uppercase tracking-tighter leading-none mb-10 pb-4 text-left origin-left"
          style={{
            fontFamily: "Impact, system-ui, sans-serif",
            transform: "scaleY(1.2)",
            WebkitTextStroke: "2px black"
          }}
        >
          CONTACT
        </motion.h1>

        {/* The two-column grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] lg:grid-cols-[1fr_2fr] gap-12 md:gap-8">

          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex flex-col gap-6 md:gap-8 text-sm font-mono text-[#a3a3a3]"
          >
            <div>
              <a href="mailto:email@example.com" className="hover:text-white transition-colors">email@example.com</a>
            </div>
            <div>
              <a href="tel:+15555555555" className="hover:text-white transition-colors">(555) 555-5555</a>
            </div>
            <div className="leading-relaxed">
              123 Demo Street<br />
              New York, NY 12345
            </div>
          </motion.div>

          {/* Right Column - minimalist Form */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-full max-w-xl lg:max-w-2xl"
          >
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>

              {/* Name fields block */}
              <div>
                <p className="text-[#f4f4f0] mb-6 text-sm font-semibold tracking-wide">Name (required)</p>
                <div className="flex flex-col sm:flex-row gap-8 sm:gap-6">
                  <div className="flex-1 flex flex-col gap-3">
                    <label htmlFor="firstName" className="text-[#a3a3a3] text-xs font-mono tracking-tight">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full bg-transparent border-b border-[#444] pb-2 text-[#f4f4f0] focus:outline-none focus:border-white transition-colors"
                      required
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-3">
                    <label htmlFor="lastName" className="text-[#a3a3a3] text-xs font-mono tracking-tight">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full bg-transparent border-b border-[#444] pb-2 text-[#f4f4f0] focus:outline-none focus:border-white transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Email field */}
              <div className="flex flex-col gap-3">
                <label htmlFor="email" className="text-[#a3a3a3] text-xs font-mono tracking-tight">Email (required)</label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-transparent border-b border-[#444] pb-2 text-[#f4f4f0] focus:outline-none focus:border-white transition-colors"
                  required
                />
              </div>

              {/* Message field */}
              <div className="flex flex-col gap-3">
                <label htmlFor="message" className="text-[#a3a3a3] text-xs font-mono tracking-tight">Message (required)</label>
                <textarea
                  id="message"
                  rows={1}
                  className="w-full bg-transparent border-b border-[#444] pb-2 text-[#f4f4f0] focus:outline-none focus:border-white transition-colors resize-none"
                  required
                ></textarea>
              </div>

              {/* Submit button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-white text-black text-xs font-bold tracking-widest px-8 py-3 hover:bg-[#e0e0e0] transition-colors"
                >
                  SUBMIT
                </button>
              </div>

            </form>
          </motion.div>

        </div>

        {/* Footer integrated inside the contact section */}
        <footer className="mt-12 md:mt-16 pt-6 border-t border-[#333] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#a3a3a3]">
          <p>© {new Date().getFullYear()} Kushal Kongara. All rights reserved.</p>
          <nav className="flex gap-6">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          </nav>
        </footer>
      </div>
    </section>
  );
}

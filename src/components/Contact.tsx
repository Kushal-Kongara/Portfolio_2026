"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="relative w-full bg-[#dfff00] text-black py-8 md:py-10 flex justify-center border-t border-black/10 overflow-hidden">
      <div className="relative z-10 w-full max-w-[1400px] px-6 md:px-12 lg:px-20">

        {/* The extremely large heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[10vw] md:text-[5rem] lg:text-[6.5rem] font-black text-black tracking-tighter leading-none mb-6 pb-2 text-left font-sans"
        >
          Contact me.
        </motion.h1>

        {/* The two-column grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] lg:grid-cols-[1fr_2fr] gap-8 md:gap-6">

          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex flex-col gap-4 md:gap-6 text-sm font-sans font-bold text-black"
          >
            <div>
              <a href="mailto:email@example.com" className="hover:opacity-70 transition-opacity">email@example.com</a>
            </div>
            <div>
              <a href="tel:+15555555555" className="hover:opacity-70 transition-opacity">(555) 555-5555</a>
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
            <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>

              {/* Name fields block */}
              <div>
                <p className="text-black mb-4 text-sm font-bold tracking-wide">Name (required)</p>
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-4">
                  <div className="flex-1 flex flex-col gap-3">
                    <label htmlFor="firstName" className="text-black text-xs font-bold tracking-tight uppercase font-sans">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full bg-transparent border-b-2 border-black/20 pb-2 text-black font-semibold focus:outline-none focus:border-black transition-colors"
                      required
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-3">
                    <label htmlFor="lastName" className="text-black text-xs font-bold tracking-tight uppercase font-sans">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full bg-transparent border-b-2 border-black/20 pb-2 text-black font-semibold focus:outline-none focus:border-black transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Email field */}
              <div className="flex flex-col gap-3">
                <label htmlFor="email" className="text-black text-xs font-bold tracking-tight uppercase font-sans">Email (required)</label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-transparent border-b-2 border-black/20 pb-2 text-black font-semibold focus:outline-none focus:border-black transition-colors"
                  required
                />
              </div>

              {/* Message field */}
              <div className="flex flex-col gap-3">
                <label htmlFor="message" className="text-black text-xs font-bold tracking-tight uppercase font-sans">Message (required)</label>
                <textarea
                  id="message"
                  rows={1}
                  className="w-full bg-transparent border-b-2 border-black/20 pb-2 text-black font-semibold focus:outline-none focus:border-black transition-colors resize-none"
                  required
                ></textarea>
              </div>

              {/* Submit button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-black text-[#dfff00] text-sm font-sans font-bold tracking-widest px-8 py-4 hover:opacity-80 transition-opacity uppercase rounded-full"
                >
                  Submit
                </button>
              </div>

            </form>
          </motion.div>

        </div>

        {/* Footer integrated inside the contact section */}
        <footer className="mt-8 md:mt-10 pt-4 border-t-2 border-black/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans font-bold text-black uppercase tracking-wide">
          <p>© {new Date().getFullYear()} Kushal Kongara. All rights reserved.</p>
          <nav className="flex gap-6">
            <a href="#about" className="hover:opacity-70 transition-opacity">About</a>
            <a href="#experience" className="hover:opacity-70 transition-opacity">Experience</a>
            <a href="#projects" className="hover:opacity-70 transition-opacity">Projects</a>
          </nav>
        </footer>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="relative w-full bg-[#111111] text-[#FFC107] py-16 flex justify-center border-t-8 border-[#111111] overflow-hidden font-sans">
      <div className="relative z-10 w-full max-w-4xl px-8">

        {/* The heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-6xl md:text-8xl font-black text-[#FFC107] tracking-tight leading-none mb-12 text-center uppercase"
          style={{ fontFamily: "Impact, system-ui, sans-serif" }}
        >
          CONTACT
        </motion.h1>

        {/* The two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col gap-6 text-sm font-bold"
          >
            <div>
              <p className="text-[#FFC107]/50 text-xs uppercase mb-1 tracking-widest">Email</p>
              <a href="mailto:email@example.com" className="hover:opacity-70 transition-opacity text-lg">email@example.com</a>
            </div>
            <div>
              <p className="text-[#FFC107]/50 text-xs uppercase mb-1 tracking-widest">Phone</p>
              <a href="tel:+15555555555" className="hover:opacity-70 transition-opacity text-lg">(555) 555-5555</a>
            </div>
            <div>
              <p className="text-[#FFC107]/50 text-xs uppercase mb-1 tracking-widest">Location</p>
              <div className="leading-relaxed text-lg">
                123 Demo Street<br />
                New York, NY 12345
              </div>
            </div>
          </motion.div>

          {/* Right Column - minimalist Form */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-full"
          >
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>

              {/* Name fields block */}
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1 flex flex-col gap-2">
                  <label htmlFor="firstName" className="text-[#FFC107]/70 text-[10px] font-black tracking-widest uppercase">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full bg-transparent border-b-2 border-[#FFC107]/30 pb-2 text-[#FFC107] font-semibold focus:outline-none focus:border-[#FFC107] transition-colors"
                    required
                  />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <label htmlFor="lastName" className="text-[#FFC107]/70 text-[10px] font-black tracking-widest uppercase">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full bg-transparent border-b-2 border-[#FFC107]/30 pb-2 text-[#FFC107] font-semibold focus:outline-none focus:border-[#FFC107] transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Email field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-[#FFC107]/70 text-[10px] font-black tracking-widest uppercase">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-transparent border-b-2 border-[#FFC107]/30 pb-2 text-[#FFC107] font-semibold focus:outline-none focus:border-[#FFC107] transition-colors"
                  required
                />
              </div>

              {/* Message field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-[#FFC107]/70 text-[10px] font-black tracking-widest uppercase">Message</label>
                <textarea
                  id="message"
                  rows={2}
                  className="w-full bg-transparent border-b-2 border-[#FFC107]/30 pb-2 text-[#FFC107] font-semibold focus:outline-none focus:border-[#FFC107] transition-colors resize-none"
                  required
                ></textarea>
              </div>

              {/* Submit button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="bg-[#FFC107] text-[#111111] text-xs font-black tracking-widest px-8 py-3 hover:scale-105 transition-transform uppercase rounded-full w-full sm:w-auto"
                >
                  Send Message
                </button>
              </div>

            </form>
          </motion.div>

        </div>

        {/* Footer integrated inside the contact section */}
        <footer className="mt-16 pt-6 border-t border-[#FFC107]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-black text-[#FFC107]/50 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Kushal Kongara.</p>
          <nav className="flex gap-6">
            <a href="#about" className="hover:text-[#FFC107] transition-colors">About</a>
            <a href="#experience" className="hover:text-[#FFC107] transition-colors">Experience</a>
            <a href="#projects" className="hover:text-[#FFC107] transition-colors">Projects</a>
          </nav>
        </footer>
      </div>
    </section>
  );
}

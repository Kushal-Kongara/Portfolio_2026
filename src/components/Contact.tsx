"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: "" });

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.current) return;

    setIsSending(true);
    setStatus({ type: null, message: "" });

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS credentials missing. Please check your .env.local file.");
      setStatus({ type: 'error', message: "EmailJS configuration missing. Please check .env.local." });
      setIsSending(false);
      return;
    }

    emailjs.sendForm(
      serviceId,
      templateId,
      form.current,
      publicKey
    )
      .then((result) => {
        console.log(result.text);
        setStatus({ type: 'success', message: "Message sent! I'll get back to you soon." });
        form.current?.reset();
      }, (error) => {
        console.log(error.text);
        setStatus({ type: 'error', message: "Oops! Something went wrong. Please try again." });
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <section id="contact" className="relative w-full bg-[#111111] text-[#FFC107] py-16 flex justify-center border-t-8 border-[#111111] overflow-hidden font-sans">
      <div className="relative z-10 w-full max-w-3xl px-8">

        {/* The heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-black text-[#FFC107] tracking-tight leading-none mb-12 text-center uppercase"
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
              <a href="mailto:kkushal2509@gmail.com" className="hover:opacity-70 transition-opacity text-lg">kkushal2509@gmail.com</a>
            </div>
            <div>
              <p className="text-[#FFC107]/50 text-xs uppercase mb-1 tracking-widest">Phone</p>
              <a href="tel:+15555555555" className="hover:opacity-70 transition-opacity text-lg">(659) 253-0511</a>
            </div>
            <div>
              <p className="text-[#FFC107]/50 text-xs uppercase mb-1 tracking-widest">San Jose, California</p>
              <div className="leading-relaxed text-lg">
                San Jose<br />
                California, USA
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
            <form ref={form} className="flex flex-col gap-6" onSubmit={sendEmail}>

              {/* Name fields block */}
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1 flex flex-col gap-2">
                  <label htmlFor="firstName" className="text-[#FFC107]/70 text-[10px] font-black tracking-widest uppercase">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full bg-transparent border-b-2 border-[#FFC107]/30 pb-2 text-[#FFC107] font-semibold focus:outline-none focus:border-[#FFC107] transition-colors"
                    required
                  />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <label htmlFor="lastName" className="text-[#FFC107]/70 text-[10px] font-black tracking-widest uppercase">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
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
                  name="user_email"
                  className="w-full bg-transparent border-b-2 border-[#FFC107]/30 pb-2 text-[#FFC107] font-semibold focus:outline-none focus:border-[#FFC107] transition-colors"
                  required
                />
              </div>

              {/* Message field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-[#FFC107]/70 text-[10px] font-black tracking-widest uppercase">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={2}
                  className="w-full bg-transparent border-b-2 border-[#FFC107]/30 pb-2 text-[#FFC107] font-semibold focus:outline-none focus:border-[#FFC107] transition-colors resize-none"
                  required
                ></textarea>
              </div>

              {/* Status Message */}
              {status.type && (
                <p className={`text-[10px] font-black tracking-widest uppercase ${status.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                  {status.message}
                </p>
              )}

              {/* Submit button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSending}
                  className={`bg-[#FFC107] text-[#111111] text-xs font-black tracking-widest px-8 py-3 transition-all uppercase rounded-full w-full sm:w-auto ${isSending ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                >
                  {isSending ? 'Sending...' : 'Send Message'}
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

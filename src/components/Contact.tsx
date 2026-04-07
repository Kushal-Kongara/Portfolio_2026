"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { getCalApi } from "@calcom/embed-react";

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: "" });

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        styles: { branding: { brandColor: "#FFC107" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

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
    <section id="contact" className="relative w-full bg-[#111111] text-[#ffff00] py-12 flex justify-center border-t-8 border-[#111111] overflow-hidden font-sans">
      <div className="relative z-10 w-full max-w-3xl px-4">

        {/* The heading (Unified Typography - Smaller) */}
        <div className="text-center mb-8 space-y-4">
          <h2
            className="text-white font-black uppercase leading-none tracking-tighter"
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "clamp(2.5rem, 8vw, 4rem)",
              letterSpacing: "-0.06em"
            }}
          >
            GET IN <span className="text-[#ffff00]">TOUCH</span>
          </h2>
        </div>

        {/* The original two-column layout - Compact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col gap-6 text-sm font-bold"
          >
            <div className="space-y-1">
              <p className="text-[#ffff00]/50 text-[10px] uppercase tracking-widest font-black">Email_Channel</p>
              <a href="mailto:kkushal2509@gmail.com" className="hover:text-white transition-colors text-lg tracking-tight">kkushal2509@gmail.com</a>
            </div>
            <div className="space-y-1">
              <p className="text-[#ffff00]/50 text-[10px] uppercase tracking-widest font-black">Voice_Channel</p>
              <a href="tel:+16592530511" className="hover:text-white transition-colors text-lg tracking-tight">(659) 253-0511</a>
            </div>
            <div className="space-y-1">
              <p className="text-[#ffff00]/50 text-[10px] uppercase tracking-widest font-black">Geo_Location</p>
              <div className="text-lg tracking-tight text-neutral-300">
                San Jose, CA, USA
              </div>
            </div>

            {/* Cal.com Schedule Button (Neo-Brutalist Style) */}
            <div className="pt-2">
              <p className="text-[#ffff00]/50 text-[10px] uppercase mb-4 tracking-widest font-black">Prefer a direct sync?</p>
              <button
                data-cal-namespace="30min"
                data-cal-link="kushalkongara/30min"
                data-cal-config='{"layout":"month_view"}'
                className="bg-[#ffff00] text-black text-[11px] font-black tracking-widest px-8 py-3 border-[2px] border-black shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all uppercase w-full sm:w-auto"
              >
                Schedule_a_Call
              </button>
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

              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1 flex flex-col gap-2">
                  <label htmlFor="firstName" className="text-[#ffff00]/70 text-[9px] font-black tracking-widest uppercase italic">_First_Name</label>
                  <input
                    type="text" id="firstName" name="firstName" required
                    className="w-full bg-transparent border-b-2 border-[#ffff00]/20 pb-2 text-white text-base font-semibold focus:outline-none focus:border-[#ffff00] transition-colors"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <label htmlFor="lastName" className="text-[#ffff00]/70 text-[9px] font-black tracking-widest uppercase italic">_Last_Name</label>
                  <input
                    type="text" id="lastName" name="lastName" required
                    className="w-full bg-transparent border-b-2 border-[#ffff00]/20 pb-2 text-white text-base font-semibold focus:outline-none focus:border-[#ffff00] transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-[#ffff00]/70 text-[9px] font-black tracking-widest uppercase italic">_Email_Addr</label>
                <input
                  type="email" id="email" name="user_email" required
                  className="w-full bg-transparent border-b-2 border-[#ffff00]/20 pb-2 text-white text-base font-semibold focus:outline-none focus:border-[#ffff00] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-[#ffff00]/70 text-[9px] font-black tracking-widest uppercase italic">_Message_Prompt</label>
                <textarea
                  id="message" name="message" rows={2} required
                  className="w-full bg-transparent border-b-2 border-[#ffff00]/20 pb-2 text-white text-base font-semibold focus:outline-none focus:border-[#ffff00] transition-colors resize-none"
                />
              </div>

              {status.type && (
                <p className={`text-[10px] font-black tracking-widest uppercase ${status.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                  STATUS: {status.message}
                </p>
              )}

              <div className="pt-2">
                <button
                  type="submit" disabled={isSending}
                  className="bg-white text-black text-[11px] font-black tracking-widest px-10 py-4 border-[2.5px] border-black shadow-[8px_8px_0px_#ffff00] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all uppercase w-full sm:w-auto disabled:opacity-50"
                >
                  {isSending ? 'Sending...' : 'Transmit_Message'}
                </button>
              </div>

            </form>
          </motion.div>

        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-black text-[#ffff00]/40 uppercase tracking-[0.3em]">
          <p suppressHydrationWarning>© {new Date().getFullYear()} KUSHAL_KONGARA // SYSTEM_LOG</p>
          <nav className="flex gap-8">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          </nav>
        </footer>
      </div>
    </section>
  );
}

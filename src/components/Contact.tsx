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
    <section id="contact" className="relative w-full bg-white py-24 overflow-hidden border-t-[3px] border-black">
      {/* Subtle Linear Technical Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
        <svg width="100%" height="100%">
          <pattern id="contactGrid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="black" strokeWidth="2" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#contactGrid)" />
        </svg>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        {/* Main System Window Frame */}
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="bg-white border-[3px] border-black shadow-[12px_12px_0px_#000] flex flex-col overflow-hidden"
        >
          {/* Window Header */}
          <div className="bg-[#1a1a1a] px-6 py-4 border-b-[3px] border-black flex justify-between items-center">
            <span className="text-[11px] font-black text-neutral-300 uppercase tracking-[0.4em] flex items-center gap-3">
              <span className="w-3 h-3 bg-green-500 animate-pulse border border-black" />
              SYSTEM.LOG / CONTACT_PROTOCOL
            </span>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-[2px] border-white/20" />
              <div className="w-5 h-5 border-[2px] border-white/20" />
            </div>
          </div>

          <div className="p-8 md:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:items-start">
              
              {/* Left Column: Title & Info */}
              <div className="space-y-12">
                <div className="space-y-6">
                  <h2
                    className="text-black font-black uppercase leading-none tracking-tighter"
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "clamp(3.5rem, 10vw, 6rem)",
                      letterSpacing: "-0.06em"
                    }}
                  >
                    GET IN <br />
                    <span className="text-[#10b981]">TOUCH</span>
                  </h2>
                  <div className="h-[4px] w-24 bg-[#10b981]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
                  {[
                    { label: "Email_Channel", value: "kkushal2509@gmail.com", href: "mailto:kkushal2509@gmail.com" },
                    { label: "Voice_Channel", value: "(659) 253-0511", href: "tel:+16592530511" },
                    { label: "Geo_Location", value: "San Jose, CA, USA", href: "#" }
                  ].map((item, i) => (
                    <div key={i} className="space-y-2 group">
                       <p className="text-black/40 text-[10px] font-black uppercase tracking-[0.3em]">{item.label}</p>
                       <a 
                         href={item.href}
                         className="text-black font-black text-xl uppercase tracking-tighter group-hover:text-[#10b981] transition-colors inline-block"
                       >
                         {item.value}
                       </a>
                    </div>
                  ))}
                </div>

                {/* Cal.com Scheduling Window */}
                <div className="pt-8">
                  <div className="bg-[#f0f9ff] border-[2.5px] border-black p-8 shadow-[6px_6px_0px_#000] rotate-[-1deg]">
                    <p className="text-black font-black text-sm uppercase tracking-tight mb-6 italic">Need to bridge communication gap quickly? Schedule a direct sync below.</p>
                    <button
                      data-cal-namespace="30min"
                      data-cal-link="kushalkongara/30min"
                      data-cal-config='{"layout":"month_view"}'
                      className="w-full bg-[#10b981] text-black text-[12px] font-black tracking-widest px-8 py-4 border-[2.5px] border-black shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all uppercase"
                    >
                      INITIALIZE_SYNC (CAL.COM)
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Message Form */}
              <div className="bg-neutral-50 border-[3px] border-black p-8 md:p-12 shadow-[8px_8px_0px_#000] rotate-1">
                <form ref={form} className="space-y-8" onSubmit={sendEmail}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-black text-[10px] font-black uppercase tracking-widest">_FIRST_NAME</label>
                       <input
                         type="text" name="firstName" required
                         className="w-full bg-white border-[2.5px] border-black p-4 text-black font-bold focus:outline-none focus:bg-[#f0f9ff] transition-all"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-black text-[10px] font-black uppercase tracking-widest">_LAST_NAME</label>
                       <input
                         type="text" name="lastName" required
                         className="w-full bg-white border-[2.5px] border-black p-4 text-black font-bold focus:outline-none focus:bg-[#f0f9ff] transition-all"
                       />
                    </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-black text-[10px] font-black uppercase tracking-widest">_EMAIL_ADDR</label>
                     <input
                       type="email" name="user_email" required
                       className="w-full bg-white border-[2.5px] border-black p-4 text-black font-bold focus:outline-none focus:bg-[#f0f9ff] transition-all"
                     />
                  </div>

                  <div className="space-y-2">
                     <label className="text-black text-[10px] font-black uppercase tracking-widest">_PROMPT_MSG</label>
                     <textarea
                       name="message" required rows={4}
                       className="w-full bg-white border-[2.5px] border-black p-4 text-black font-bold focus:outline-none focus:bg-[#f0f9ff] transition-all resize-none"
                     />
                  </div>

                  {status.type && (
                    <div className="bg-black text-white p-4 text-[10px] font-black uppercase tracking-widest text-center">
                       STATUS: {status.message}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full bg-black text-white text-[12px] font-black tracking-widest px-8 py-5 shadow-[8px_8px_0px_#10b981] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all uppercase disabled:opacity-50"
                  >
                    {isSending ? "UPLOADING_MSG..." : "TRANSMIT_DATA"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="mt-20 pt-12 border-t-[3px] border-black flex flex-col md:flex-row items-center justify-between gap-8 text-[11px] font-black text-black uppercase tracking-[0.3em]">
          <p className="bg-[#ccff00] px-4 py-1 border-[2px] border-black shadow-[4px_4px_0px_#000]">© {new Date().getFullYear()} KUSHAL_KONGARA // SYSTEM_LOG</p>
          <nav className="flex gap-8">
            <a href="#about" className="hover:text-[#10b981] transition-colors">ABOUT</a>
            <a href="#experience" className="hover:text-[#10b981] transition-colors">EXPERIENCE</a>
            <a href="#projects" className="hover:text-[#10b981] transition-colors">PROJECTS</a>
          </nav>
        </footer>
      </div>
    </section>
  );
}

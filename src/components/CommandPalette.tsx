"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiHome, FiUser, FiBriefcase, FiCode, FiMail, FiGithub, FiLinkedin, FiCalendar, FiFileText } from "react-icons/fi";

const commands = [
  { label: "Home", icon: FiHome, href: "/#hero", type: "nav" },
  { label: "About", icon: FiUser, href: "/#about", type: "nav" },
  { label: "Experience", icon: FiBriefcase, href: "/#experience", type: "nav" },
  { label: "Projects", icon: FiCode, href: "/#projects", type: "nav" },
  { label: "Contact", icon: FiMail, href: "/#contact", type: "nav" },
  { label: "GitHub", icon: FiGithub, href: "https://github.com/Kushal-Kongara", type: "link" },
  { label: "LinkedIn", icon: FiLinkedin, href: "https://www.linkedin.com/in/kushalkongara/", type: "link" },
  { label: "Book a Call", icon: FiCalendar, href: "https://cal.com/kushalkongara/30min", type: "link" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (e.key === "/" && !open) {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelected(0);
    }
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, filtered.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    }
    if (e.key === "Enter" && filtered[selected]) {
      navigate(filtered[selected]);
    }
  };

  const navigate = (cmd: (typeof commands)[0]) => {
    setOpen(false);
    if (cmd.type === "link") {
      window.open(cmd.href, "_blank");
    } else {
      window.location.href = cmd.href;
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9990]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />

          {/* Palette */}
          <motion.div
            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[9991] w-full max-w-lg px-4"
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <div className="bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
              {/* Search bar */}
              <div className="flex items-center gap-3 px-4 py-3 border-b-[3px] border-black">
                <span className="text-[#ff5500] font-black text-sm">/</span>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a command..."
                  className="flex-1 bg-transparent text-black font-medium text-sm outline-none placeholder:text-black/30"
                />
                <kbd className="text-[9px] font-black text-black/30 border border-black/20 px-1.5 py-0.5 rounded">ESC</kbd>
              </div>

              {/* Results */}
              <div className="max-h-72 overflow-y-auto">
                {filtered.length === 0 && (
                  <p className="px-4 py-6 text-sm text-black/30 font-medium text-center">No commands found</p>
                )}
                {filtered.map((cmd, i) => (
                  <button
                    key={cmd.label}
                    onClick={() => navigate(cmd)}
                    onMouseEnter={() => setSelected(i)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-b border-black/5 last:border-0 ${
                      selected === i ? "bg-[#ff5500] text-white" : "text-black hover:bg-black/5"
                    }`}
                  >
                    <cmd.icon className={`text-base shrink-0 ${selected === i ? "text-white" : "text-[#ff5500]"}`} />
                    <span className="font-black text-sm uppercase tracking-wide">{cmd.label}</span>
                    <span className={`ml-auto text-[9px] font-black uppercase tracking-widest ${selected === i ? "text-white/60" : "text-black/25"}`}>
                      {cmd.type === "link" ? "↗ open" : "→ go"}
                    </span>
                  </button>
                ))}
              </div>

              {/* Footer */}
              <div className="px-4 py-2 bg-black/5 border-t-[3px] border-black flex items-center gap-4">
                <span className="text-[9px] font-black text-black/40 uppercase tracking-widest">↑↓ Navigate</span>
                <span className="text-[9px] font-black text-black/40 uppercase tracking-widest">↵ Select</span>
                <span className="ml-auto text-[9px] font-black text-[#ff5500] uppercase tracking-widest">Press / to open</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

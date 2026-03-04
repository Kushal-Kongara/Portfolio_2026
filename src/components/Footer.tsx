"use client";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-black text-sm">© {new Date().getFullYear()} Portfolio. All rights reserved.</p>
        <nav className="flex gap-6">
          <a
            href="#about"
            className="text-black text-sm hover:text-orange-base transition-colors"
          >
            About
          </a>
          <a
            href="#contact"
            className="text-black text-sm hover:text-orange-base transition-colors"
          >
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}

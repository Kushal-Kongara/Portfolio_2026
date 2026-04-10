# 🎨 Portfolio 2026: A Digital Multiverse

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-blue?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-purple?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vapi AI](https://img.shields.io/badge/AI_Agent-Vapi-orange?style=for-the-badge)](https://vapi.ai/)

**Portfolio 2026** is more than just a resume—it's an interactive digital experience that pushes the boundaries of web aesthetics and technical integration. Combining **Neo-Brutalist** design with **Sketch-style** irregularity and **3D motion systems**, this project serves as a showcase of modern full-stack capabilities, AI integration, and creative front-end engineering.

---

## 🌟 Vision & Design Philosophy

The project is built on the concept of **"Digital Tactility"**. Every element feels physical, reactive, and alive.

### Core Design Pillars:
- **Sketch Aesthetics**: Custom SVG displacement filters give UI elements a hand-drawn, irregular "shaky" border that reacts to interaction.
- **Narrative Motion**: Context-aware animations using Framer Motion that guide the user through a personal and professional story.
- **Neo-Brutalist High Contrast**: Bold black-and-white layouts inspired by "PILOT" and "simplify" design systems, balanced with vibrant accent colors.

---

## 🚀 Key Features & Technical Showcases

### 🎙️ 1. Talking AI Hero (Digital Twin)
The landing page features a live **Voice AI Agent** built with `Vapi.ai`.
- **Interactivity**: Visitors can engage in real-time voice conversations with a digital version of me.
- **Tech Stack**: Integrated via `@vapi-ai/web`, utilizing low-latency STT, LLM reasoning, and TTS for seamless flow.

### 🆔 2. Multiverse ID Badge (3D Motion Lanyard)
The **About** section features a physics-based 3D lanyard ID badge that sways as you scroll.
- **Dynamic Glitch**: As the user scrolls, the badge triggers "multiverse glitches," transforming between 5 distinct visual styles:
    - *Creative Studio*: Minimalist Agency vibes.
    - *Tyler License*: Inspired by "Call Me If You Get Lost."
    - *No Idea Club*: Neo-Brutalist yellow aesthetic.
    - *ISIC Card*: Retro International Student identity.
    - *Heron Preston*: High-fashion industrial utility.
- **Implementation**: `framer-motion`'s `useScroll` and `useTransform` paired with complex CSS glitch layers.

### 🧩 3. PILOT Tech Crossword
A redesign of the standard "Skills" section into an interactive, high-contrast **Technical Archive**.
- **Interactive Grid**: A B&W crossword layout where hovering over tech icons highlights their corresponding words in the grid.
- **Visuals**: Styled with grainy paper textures, pinstripe patterns, and "PILOT" style vertical typography.

### 🧬 4. Professional DNA Grid
A structured breakdown of my core technical roles:
- **Architect**: Focus on system leads and scalable infrastructure.
- **Product**: Prioritizing "User First" design and experience.
- **AI Agent**: Engineering LLM-driven systems and autonomous workflows.

### 🕹️ 5. Interactive Game Hub (The Bored Zone)
A dedicated space at `/bored` featuring interactive experiments and mini-games.
- **Production Incident Game**: A high-stakes interactive simulator where users must "save production" from incoming bugs.
- **Travel Board & Movie Wall**: Dynamic galleries showcasing life beyond the terminal.

### 🎵 6. Real-time Live Sync
The portfolio stays alive with real-time data integrations:
- **Spotify Live**: Displays current playback status with live album art and track details.
- **WakaTime Metrics**: Real-time coding statistics and productivity trends.
- **GitHub Activity**: Live contribution graph and recent repository activity.

### 📅 7. Direct Sync Booking
Integrated with `Cal.com` for immediate scheduling.
- **Minimalist Flow**: A "Schedule_a_Call" link that opens a native month-view modal for direct professional syncs.

---

## 🛠️ Built With

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | Next.js 14 (App Router), TypeScript, React |
| **Styling** | Tailwind CSS, CSS Modules (for custom filters), Lucide React |
| **Animation** | Framer Motion (Scroll-linked physics, SVG path morphing) |
| **AI/Logic** | Vapi.ai (Voice), EmailJS (Communication) |
| **Integrations** | Cal.com, Spotify API, WakaTime API, GitHub API |
| **Performance** | Next-Image Optimization, Lucide Icons |

---

## 💻 Local Development

1. **Clone & Install**:
   ```bash
   git clone https://github.com/Kushal-Kongara/Portfolio_2026.git
   cd Portfolio_2026
   npm install
   ```

2. **Environment Configuration**:
   Create a `.env.local` to enable all live features:
   ```env
   # AI Agent
   NEXT_PUBLIC_VAPI_PUBLIC_KEY=your_key
   NEXT_PUBLIC_VAPI_ASSISTANT_ID=your_id

   # Contact & Booking
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
   ```

3. **Run**:
   ```bash
   npm run dev
   ```

---

## 🤝 Contact & Network

- **LinkedIn**: [Kushal Kongara](https://www.linkedin.com/in/kushalkongara/)
- **GitHub**: [@Kushal-Kongara](https://github.com/Kushal-Kongara)
- **Instagram**: [@kushal_kongara](https://www.instagram.com/kushal_kongara/)

*Developed with ❤️ and a lot of caffeine | © 2026 Kushal Kongara*
*Designed & Developed with ❤️ by Kushal Kongara.*

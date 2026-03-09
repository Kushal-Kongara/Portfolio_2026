# 🎨 Portfolio 2026

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-blue?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-purple?style=for-the-badge&logo=framer)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)

A modern, high-aesthetic, and interactive portfolio designed for the future. This project showcases a unique blend of professional experience, technical expertise, and creative design using a **"Sketch-style"** and **"Folder-based"** UI architecture. It even includes a dedicated **"Game Zone"** for playful experimentation.

---

## 🌟 Vision & Design Philosophy

The **Portfolio 2026** isn't just a resume; it's an immersive digital experience. The design philosophy centers on **"Digital Tactility"**—combining the raw, nostalgic feel of sketches and folders with cutting-edge web technologies like Voice AI and complex motion systems.

### Core Design Pillars:
- **Sketch Aesthetics**: Custom SVG filters that give the entire UI a hand-drawn, "pencil-sketch" vibe.
- **Narrative Motion**: Every scroll tells a story, with elements reacting naturally to the user's journey.
- **AI-First Interaction**: Moving beyond text and clicks by integrating a real-time voice conversational agent.

---

## 🚀 Key Features & Technical Deep Dive

### 🎙️ 1. Talking AI Agent (Vapi.ai)
The Hero section features a live **Voice AI Agent**. Built with `Vapi.ai`, it allows visitors to talk directly to a digital twin of the developer.
- **Tech**: Integrated via `@vapi-ai/web`.
- **Logic**: Real-time STT (Speech-to-Text), LLM processing, and TTS (Text-to-Speech) for a seamless conversational flow.

### 🖼️ 2. The Sketch Filter System
A global SVG filter is applied to various UI elements (icons, badges) to create an irregular, hand-drawn displacement effect.
- **Implementation**: Custom `<feTurbulence>` and `<feDisplacementMap>` filters.
- **Visuals**: Social icons with "shaky" borders and randomized rotation.

### 🆔 3. Interactive 3D/Motion Lanyard
In the **About** section, a lanyard ID badge sways and moves as the user scrolls, creating a sense of physical weight.
- **Tech**: Framer Motion's `useScroll` and `useTransform`.
- **Aesthetic**: A mix of a "Creative Studio" ID card and a retro "Windows" window for biological details.

### 📂 4. Folder-Based Resume System
The **Experience** and **Projects** sections use a "Folder" metaphor.
- **Experience**: "Lined-paper Folders" decorated with location-based landmarks (like the Charminar or Golden Gate Bridge).
- **Projects**: Dark-themed folders using CSS `clip-path` to simulate a realistic opening flap.

### 🛠️ 5. Tech Stack Graph
A scattered "Graph Paper" layout for the tech stack, using **Glassmorphism** and handwritten highlighter effects to emphasize skills.

---

### 🕹️ 6. Game Zone / Bored Section
A hidden interactive space at `/bored` for experiments, interesting links, and travel memories.
- **Dynamic Content**: Uses `fs` to dynamically read and display a "Movie Wall" from the public directory.
- **Interactive Banner**: A high-speed scrolling banner that invites users to explore more about the developer's personal interests.

---

## 🛠️ Built With

| Category | Technology |
| :--- | :--- |
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router) |
| **Animation** | [Framer Motion](https://www.framer.com/motion/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **AI** | [Vapi.ai](https://vapi.ai/) |
| **3D Rendering** | [Three.js](https://threejs.org/) / React Three Fiber |
| **Icons** | Lucide React, React Icons |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |

---

## 💻 Local Development

Follow these steps to get the project running on your local machine:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Kushal-Kongara/Portfolio_2026.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**: (Optional if using private AI keys)
   Create a `.env.local` file and add your Vapi keys:
   ```env
   NEXT_PUBLIC_VAPI_PUBLIC_KEY=your_key_here
   NEXT_PUBLIC_VAPI_ASSISTANT_ID=your_id_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open the browser**:
   Navigate to `http://localhost:3000` to see the result.

---

## � Deployment

The project is optimized for deployment on **Vercel**:

```bash
npm run build
```

---

## 🤝 Contributing & Contact

I'm always open to talking about code, design, or the future of web development!

- **LinkedIn**: [Kushal Kongara](https://www.linkedin.com/in/kushalkongara/)
- **GitHub**: [@Kushal-Kongara](https://github.com/Kushal-Kongara)
- **Instagram**: [@kushal_kongara](https://www.instagram.com/kushal_kongara/)

*Designed & Developed with ❤️ by Kushal Kongara.*

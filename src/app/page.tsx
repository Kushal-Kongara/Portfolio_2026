import Hero from "@/components/Hero";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Nav from "@/components/Nav";
import GameHub from "@/components/GameHub";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Experience />
        
        {/* Interactive Game Hub */}
        <GameHub />

        <Projects />
        <Contact />
      </main>
    </>
  );
}

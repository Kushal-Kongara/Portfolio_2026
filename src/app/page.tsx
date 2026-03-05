import Hero from "@/components/Hero";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Nav from "@/components/Nav";
import BoredBanner from "@/components/BoredBanner";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Experience />
        <Projects />
        <BoredBanner />
        <Contact />
      </main>
    </>
  );
}

import Hero from "@/components/Hero";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Nav from "@/components/Nav";
import BoredBanner from "@/components/BoredBanner";
import ProductionIncidentGame from "@/components/ProductionIncidentGame";
import SectionWrapper from "@/components/SectionWrapper";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Experience />
        
        {/* Interactive Game Section */}
        <div className="bg-black py-16 md:py-24 border-y-4 border-black">
          <SectionWrapper className="flex flex-col items-center">
            <h2 
              className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-10 text-center"
              style={{ fontFamily: 'Impact, system-ui, sans-serif' }}
            >
              SURVIVE THE INCIDENT
            </h2>
            <ProductionIncidentGame />
          </SectionWrapper>
        </div>

        <Projects />
        <BoredBanner />
        <Contact />
      </main>
    </>
  );
}

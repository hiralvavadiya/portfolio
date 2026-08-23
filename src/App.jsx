import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CaseStudyModal from "./components/CaseStudyModal";
import CommandPalette from "./components/CommandPalette";

export default function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e) => {
      const isModK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      if (isModK) {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <Navbar onOpenPalette={() => setPaletteOpen(true)} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects onOpenCaseStudy={setActiveProject} />
        <Contact />
      </main>
      <Footer />

      {activeProject && (
        <CaseStudyModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
      {paletteOpen && (
        <CommandPalette
          onClose={() => setPaletteOpen(false)}
          onOpenCaseStudy={setActiveProject}
        />
      )}
    </>
  );
}

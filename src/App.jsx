import { useCallback, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CaseStudyModal from "./components/CaseStudyModal";
import CommandPalette from "./components/CommandPalette";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";

export default function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const finishLoading = useCallback(() => setLoading(false), []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <div className="grain">
      {loading && <Preloader onDone={finishLoading} />}
      <Cursor />

      <Navbar onOpenPalette={() => setPaletteOpen(true)} />
      <main>
        <Hero ready={!loading} />
        <About />
        <Skills />
        <Experience />
        <Projects onOpenCaseStudy={setActiveProject} />
        <Education />
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
    </div>
  );
}

import { lazy, Suspense, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";

// Only needed after an interaction, so keep them out of the initial bundle.
const CaseStudyModal = lazy(() => import("./components/CaseStudyModal"));
const CommandPalette = lazy(() => import("./components/CommandPalette"));

export default function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [paletteOpen, setPaletteOpen] = useState(false);

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

  return (
    <div className="grain">
      <Cursor />

      <Navbar onOpenPalette={() => setPaletteOpen(true)} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects onOpenCaseStudy={setActiveProject} />
        <Education />
        <Contact />
      </main>
      <Footer />

      <Suspense fallback={null}>
        {activeProject && (
          <CaseStudyModal project={activeProject} onClose={() => setActiveProject(null)} />
        )}
        {paletteOpen && (
          <CommandPalette
            onClose={() => setPaletteOpen(false)}
            onOpenCaseStudy={setActiveProject}
          />
        )}
      </Suspense>
    </div>
  );
}

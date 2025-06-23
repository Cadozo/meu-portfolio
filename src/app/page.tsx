import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import Hero from './components/Hero';
import SkillsSection from "./components/SkillsSection";



export default function Home() {
  return (
    <>
      <Hero />
      <main className="flex flex-col gap-24 px-6 py-16">
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
      </main>
    </>
  );
}
import * as React from "react";
import Head from "next/head";
import { Sidebar } from "../components/Sidebar";
import { MobileNavbar } from "../components/MobileNavbar";
import { Hero } from "../components/Hero";
import { ExperienceSection } from "../components/ExperienceSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { SkillsSection } from "../components/SkillsSection";
import { EducationCertificationsSection } from "../components/EducationCertificationsSection";
import { ArcadeSection } from "../components/ArcadeSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { AiCopilotModal } from "../components/AiCopilotModal";
import { TerminalDrawer } from "../components/TerminalDrawer";
import { PORTFOLIO_DATA } from "../data/portfolioData";

export default function Home() {
  const [activeSection, setActiveSection] = React.useState("experience");
  const [isAiModalOpen, setIsAiModalOpen] = React.useState(false);

  // Section Refs for scrollspy
  const experienceRef = React.useRef(null);
  const projectsRef = React.useRef(null);
  const skillsRef = React.useRef(null);
  const educationRef = React.useRef(null);
  const arcadeRef = React.useRef(null);
  const contactRef = React.useRef(null);

  // Scrollspy observer matching reference site
  React.useEffect(() => {
    const sectionIds = [
      "experience",
      "projects",
      "skills",
      "education",
      "arcade",
      "contact",
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>{PORTFOLIO_DATA.about.name} | Data Engineering Analyst</title>
        <meta
          name="description"
          content="Portfolio of Padmapiyush Pathak — Data Engineering Analyst specializing in Azure Medallion Lakehouses, Real-Time Streaming (Kafka/Spark), Databricks, and Cloud Automation."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={`${PORTFOLIO_DATA.about.name} | Portfolio`} />
        <meta
          property="og:description"
          content="Data Engineering Analyst specializing in Azure Lakehouses, PySpark, and Kafka Streaming."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
        {/* Desktop View (>= 768px): Fixed Sidebar + Scrollable Content */}
        <div className="hidden md:flex justify-center">
          <Sidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            onAskAIClick={() => setIsAiModalOpen(true)}
          />

          <main className="ml-64 w-[calc(100vw-16rem)] max-w-4xl px-8 lg:px-14 py-12">
            <Hero />
            <div id="experience" ref={experienceRef}>
              <ExperienceSection />
            </div>
            <div id="projects" ref={projectsRef}>
              <ProjectsSection />
            </div>
            <div id="skills" ref={skillsRef}>
              <SkillsSection />
            </div>
            <div id="education" ref={educationRef}>
              <EducationCertificationsSection />
            </div>
            <div id="arcade" ref={arcadeRef}>
              <ArcadeSection />
            </div>
            <div id="contact" ref={contactRef}>
              <ContactSection />
            </div>
            <Footer />
          </main>
        </div>

        {/* Mobile View (< 768px): Sticky Header + Single Stream */}
        <div className="md:hidden w-full">
          <MobileNavbar
            activeSection={activeSection}
            onSectionClick={setActiveSection}
            onAskAIClick={() => setIsAiModalOpen(true)}
          />

          <main className="pt-20 px-4 sm:px-6 pb-12 max-w-xl mx-auto">
            <Hero />
            <div id="experience_mobile" ref={experienceRef}>
              <ExperienceSection />
            </div>
            <div id="projects_mobile" ref={projectsRef}>
              <ProjectsSection />
            </div>
            <div id="skills_mobile" ref={skillsRef}>
              <SkillsSection />
            </div>
            <div id="education_mobile" ref={educationRef}>
              <EducationCertificationsSection />
            </div>
            <div id="arcade_mobile" ref={arcadeRef}>
              <ArcadeSection />
            </div>
            <div id="contact_mobile" ref={contactRef}>
              <ContactSection />
            </div>
            <Footer />
          </main>
        </div>

        {/* Interactive AI Data Copilot Modal */}
        <AiCopilotModal
          isOpen={isAiModalOpen}
          onClose={() => setIsAiModalOpen(false)}
        />

        {/* Floating Nostalgic Terminal Drawer */}
        <TerminalDrawer />
      </div>
    </>
  );
}

import * as React from "react";
import Head from "next/head";
import { Sidebar } from "../components/Sidebar";
import { MobileNavbar } from "../components/MobileNavbar";
import { Hero } from "../components/Hero";
import { ExperienceSection } from "../components/ExperienceSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { AwardsTestimonialsSection } from "../components/AwardsTestimonialsSection";
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
  const awardsRef = React.useRef(null);
  const skillsRef = React.useRef(null);
  const educationRef = React.useRef(null);
  const arcadeRef = React.useRef(null);
  const contactRef = React.useRef(null);

  // Scrollspy observer matching reference site
  React.useEffect(() => {
    const sectionIds = [
      "experience",
      "projects",
      "awards",
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

  const metaTitle = `${PORTFOLIO_DATA.about.name} | Google Certified Data Analyst`;
  const metaDescription =
    "Full-cycle Data Analyst commanding 10M+ daily ETL pipelines down to executive Power BI dashboards. 95% reporting automation, 12% A/B testing cost reduction, and IDEMIA Spot & Shining Star Awardee.";
  const siteUrl = "https://padmapiyush.github.io";
  const ogImageUrl = `${siteUrl}/og-image.png`;

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={siteUrl} />

        {/* OpenGraph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Padmapiyush Pathak - Google Certified Data Analyst Portfolio" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={siteUrl} />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={ogImageUrl} />

        {/* Additional SEO Keywords */}
        <meta
          name="keywords"
          content="Data Analyst, Power BI, SQL, Python, Azure Data Factory, Databricks, PySpark, ETL, Tableau, A/B Testing, Dashboard Automation, IDEMIA, Padmapiyush Pathak"
        />
        <meta name="author" content="Padmapiyush Pathak" />
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
            <div id="awards" ref={awardsRef}>
              <AwardsTestimonialsSection />
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
            <div id="awards_mobile" ref={awardsRef}>
              <AwardsTestimonialsSection />
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

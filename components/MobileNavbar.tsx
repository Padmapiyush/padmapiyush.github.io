import * as React from "react";
import {
  Briefcase,
  FolderGit2,
  Cpu,
  GraduationCap,
  Gamepad2,
  Bot,
  Menu,
  X,
  Download,
  Mail,
  Trophy,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { Button } from "./ui/Button";
import { ThemeToggle } from "./ThemeToggle";
import { PORTFOLIO_DATA } from "../data/portfolioData";

interface MobileNavbarProps {
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
  onAskAIClick: () => void;
}

export function MobileNavbar({
  activeSection,
  onSectionClick,
  onAskAIClick,
}: MobileNavbarProps) {
  const { about, contact } = PORTFOLIO_DATA;
  const [menuOpen, setMenuOpen] = React.useState(false);

  const navItems = [
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "projects", label: "Projects", icon: FolderGit2 },
    { id: "awards", label: "Honors & Proof", icon: Trophy },
    { id: "skills", label: "Skills", icon: Cpu },
    { id: "education", label: "Education & Certs", icon: GraduationCap },
    { id: "arcade", label: "Arcade", icon: Gamepad2 },
  ];

  const handleNavClick = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id) || document.getElementById(`${id}_mobile`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      onSectionClick(id);
    }
  };

  return (
    <header className="mobile-nav fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border paper-texture">
      <div className="flex items-center justify-between px-4 py-2.5">
        {/* Monogram Brand */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2"
        >
          <div className="h-8 w-8 rounded-md bg-secondary border border-border flex items-center justify-center font-bold tracking-tight text-sm text-foreground">
            {about.initials}
          </div>
          <span className="font-semibold text-sm text-foreground">
            {about.preferredName}
          </span>
        </a>

        {/* Quick Actions */}
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleNavClick("experience")}
            title="Experience"
          >
            <Briefcase
              className={`h-4 w-4 ${
                activeSection === "experience" ? "text-accent" : ""
              }`}
            />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleNavClick("projects")}
            title="Projects"
          >
            <FolderGit2
              className={`h-4 w-4 ${
                activeSection === "projects" ? "text-accent" : ""
              }`}
            />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleNavClick("awards")}
            title="Honors"
          >
            <Trophy
              className={`h-4 w-4 ${
                activeSection === "awards" ? "text-accent" : ""
              }`}
            />
          </Button>

          {/* AI Trigger */}
          <Button
            variant="default"
            size="icon"
            className="h-8 w-8 bg-secondary text-secondary-foreground border-2 border-accent animate-ring-pulse-border hover:bg-accent hover:text-accent-foreground"
            onClick={onAskAIClick}
            title="Ask Data Copilot"
          >
            <Bot className="h-4 w-4 text-accent" />
          </Button>

          <ThemeToggle className="h-8 w-8" />

          {/* Hamburger toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 ml-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Expanded Mobile Drawer */}
      {menuOpen && (
        <div className="px-4 py-4 border-t border-border bg-card paper-texture space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "secondary" : "outline"}
                  className="justify-start text-xs h-9"
                  onClick={() => handleNavClick(item.id)}
                >
                  <Icon className="h-3.5 w-3.5 mr-2 text-accent" />
                  {item.label}
                </Button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-border/60 flex items-center justify-between">
            <div className="flex gap-2">
              <a href={`mailto:${contact.email}`}>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Mail className="h-4 w-4" />
                </Button>
              </a>
              <a href={contact.github} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <GithubIcon className="h-4 w-4" />
                </Button>
              </a>
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <LinkedinIcon className="h-4 w-4" />
                </Button>
              </a>
            </div>
            <a
              href="/Padmapiyush_Pathak_Resume.pdf"
              download="Padmapiyush_Pathak_Data_Analyst_Resume.pdf"
              className="inline-block"
            >
              <Button variant="secondary" size="sm" className="text-xs gap-1.5 font-semibold">
                <Download className="h-3.5 w-3.5 text-accent" />
                Resume PDF
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

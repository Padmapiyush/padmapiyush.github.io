import * as React from "react";
import {
  Briefcase,
  FolderGit2,
  Cpu,
  GraduationCap,
  Gamepad2,
  Mail,
  FileText,
  Bot,
  Share2,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { Button } from "./ui/Button";
import { ThemeToggle } from "./ThemeToggle";
import { PORTFOLIO_DATA } from "../data/portfolioData";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
  onAskAIClick: () => void;
}

export function Sidebar({
  activeSection,
  onSectionChange,
  onAskAIClick,
}: SidebarProps) {
  const { about, contact } = PORTFOLIO_DATA;

  const navItems = [
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "projects", label: "Projects", icon: FolderGit2 },
    { id: "skills", label: "Skills", icon: Cpu },
    { id: "education", label: "Education & Certs", icon: GraduationCap },
    { id: "arcade", label: "Interactive Arcade", icon: Gamepad2 },
  ];

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
      onSectionChange(id);
    }
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-border bg-card paper-texture flex flex-col justify-between z-30 select-none">
      {/* Top Branding & Socials */}
      <div className="p-6 border-b border-border/40">
        <div className="flex items-center justify-between mb-4">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              onSectionChange("");
            }}
            className="group flex items-center gap-2"
          >
            <div className="h-10 w-10 rounded-lg bg-secondary border border-border flex items-center justify-center font-bold tracking-tight text-xl text-foreground group-hover:border-accent transition-colors">
              {about.initials}
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground leading-tight">
                {about.preferredName}
              </div>
              <div className="text-xs text-muted-foreground font-mono">
                data-eng:~$
              </div>
            </div>
          </a>
          <ThemeToggle />
        </div>

        {/* Quick Icon Links */}
        <div className="flex items-center gap-2 pt-2">
          <a
            href={`mailto:${contact.email}`}
            title="Email Padmapiyush"
            aria-label="Email"
          >
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Mail className="h-4 w-4" />
            </Button>
          </a>
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Profile"
            aria-label="GitHub"
          >
            <Button variant="outline" size="icon" className="h-8 w-8">
              <GithubIcon className="h-4 w-4" />
            </Button>
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            aria-label="LinkedIn"
          >
            <Button variant="outline" size="icon" className="h-8 w-8">
              <LinkedinIcon className="h-4 w-4" />
            </Button>
          </a>
          <a
            href={contact.linkedinPosts}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Articles & Posts"
            aria-label="Posts"
          >
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Share2 className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>

      {/* Middle Navigation */}
      <nav className="px-4 py-4 space-y-1.5 overflow-y-auto">
        <div className="px-2 pb-2 text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
          Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <Button
              key={item.id}
              variant={isActive ? "secondary" : "ghost"}
              className={`w-full justify-start text-sm transition-all duration-150 ${
                isActive
                  ? "bg-secondary text-secondary-foreground font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
              }`}
              onClick={() => handleNavClick(item.id)}
            >
              <Icon
                className={`h-4 w-4 mr-2.5 transition-colors ${
                  isActive ? "text-accent" : "text-muted-foreground"
                }`}
              />
              <span>{item.label}</span>
            </Button>
          );
        })}
      </nav>

      {/* Bottom Actions: AI Copilot & Resume */}
      <div className="p-4 border-t border-border/40 space-y-2 bg-card/60 backdrop-blur-xs">
        {/* Pulsing AI Assistant Button matching reference */}
        <Button
          variant="default"
          className="w-full justify-start bg-secondary text-secondary-foreground border-2 border-accent animate-ring-pulse-border hover:bg-accent hover:text-accent-foreground font-medium text-xs py-2 shadow-xs"
          onClick={onAskAIClick}
          title="Chat with Padmapiyush's Data Engineering Assistant"
        >
          <Bot className="h-4 w-4 mr-2 text-accent" />
          <span className="font-semibold tracking-wide">Data Copilot (AI)</span>
          <span className="ml-auto text-[10px] bg-accent/20 text-accent font-mono px-1.5 py-0.5 rounded-full">
            Chat
          </span>
        </Button>

        {/* Resume Link */}
        <a
          href={contact.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full"
        >
          <Button
            variant="outline"
            className="w-full justify-start text-xs text-muted-foreground hover:text-foreground"
          >
            <FileText className="h-3.5 w-3.5 mr-2" />
            <span>Download Resume</span>
          </Button>
        </a>
      </div>
    </aside>
  );
}

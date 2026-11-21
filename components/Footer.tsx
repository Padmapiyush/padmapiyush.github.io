import * as React from "react";
import { ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { PORTFOLIO_DATA } from "../data/portfolioData";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { about, contact } = PORTFOLIO_DATA;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-12 py-8 border-t border-border text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-1.5">
        <span>© {currentYear}</span>
        <span className="font-semibold text-foreground">{about.name}</span>
        <span>— All rights reserved.</span>
      </div>

      <div className="flex items-center gap-4">
        <a
          href={contact.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground inline-flex items-center gap-1 transition-colors"
        >
          <GithubIcon className="h-3.5 w-3.5" />
          <span>GitHub</span>
        </a>

        <a
          href={contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground inline-flex items-center gap-1 transition-colors"
        >
          <LinkedinIcon className="h-3.5 w-3.5" />
          <span>LinkedIn</span>
        </a>

        <button
          onClick={scrollToTop}
          className="hover:text-foreground inline-flex items-center gap-1 transition-colors cursor-pointer"
          title="Back to Top"
        >
          <ArrowUp className="h-3.5 w-3.5 text-accent" />
          <span>Top</span>
        </button>
      </div>
    </footer>
  );
}

import * as React from "react";
import {
  FileText,
  Mail,
  MapPin,
  Building2,
  Sparkles,
  ArrowDown,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { Button } from "./ui/Button";
import { PORTFOLIO_DATA } from "../data/portfolioData";

export function Hero() {
  const { about, contact } = PORTFOLIO_DATA;

  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="mb-16 pt-2">
      {/* Status Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-mono mb-4 border border-border">
        <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
        <span>Open for Data Engineering & Cloud Collaboration</span>
      </div>

      {/* Greeting & Name */}
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-1">
        Hi 👋, I'm
      </h1>
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-foreground tracking-tight leading-tight mb-4">
        {about.name}
      </h2>

      {/* Role and Meta */}
      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-1.5 font-medium text-foreground">
          <Building2 className="h-4 w-4 text-accent" />
          <span>{about.role} at <b className="text-foreground">{about.currentCompany}</b></span>
        </div>
        <span className="text-border">•</span>
        <div className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5 text-accent" />
          <span>{about.location}</span>
        </div>
      </div>

      {/* Elevator Pitch */}
      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 font-normal">
        {about.elevator}
      </p>

      {/* Call to Actions & Social Row */}
      <div className="flex flex-wrap items-center gap-3 mb-12">
        <a
          href={contact.resume}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="default" size="default" className="gap-2 font-medium">
            <FileText className="h-4 w-4" />
            Resume
          </Button>
        </a>

        <Button
          variant="secondary"
          size="default"
          onClick={scrollToProjects}
          className="gap-2 font-medium"
        >
          <span>Explore Projects</span>
          <ArrowDown className="h-4 w-4 text-accent" />
        </Button>

        <div className="h-6 w-px bg-border mx-1 hidden sm:block" />

        <div className="flex items-center gap-2">
          <a
            href={`mailto:${contact.email}`}
            title="Email Padmapiyush"
            aria-label="Email"
          >
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Mail className="h-4 w-4" />
            </Button>
          </a>
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            aria-label="GitHub"
          >
            <Button variant="outline" size="icon" className="h-9 w-9">
              <GithubIcon className="h-4 w-4" />
            </Button>
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            aria-label="LinkedIn"
          >
            <Button variant="outline" size="icon" className="h-9 w-9">
              <LinkedinIcon className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>

      {/* About Me Section */}
      <div className="border-t border-border pt-8">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-accent" />
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            About Me
          </h3>
        </div>

        <div className="space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
          {about.bio.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Focus Areas Quick Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
          <div className="p-3.5 rounded-lg border border-border bg-card paper-texture">
            <div className="text-xs font-mono uppercase text-accent font-semibold mb-1">
              Architecture
            </div>
            <div className="text-sm font-medium text-foreground">
              Azure Medallion Lakehouse & Delta Lake ACID Storage
            </div>
          </div>
          <div className="p-3.5 rounded-lg border border-border bg-card paper-texture">
            <div className="text-xs font-mono uppercase text-accent font-semibold mb-1">
              Pipelines
            </div>
            <div className="text-sm font-medium text-foreground">
              Distributed PySpark Batch & Kafka Structured Streaming
            </div>
          </div>
          <div className="p-3.5 rounded-lg border border-border bg-card paper-texture">
            <div className="text-xs font-mono uppercase text-accent font-semibold mb-1">
              DevOps & IaC
            </div>
            <div className="text-sm font-medium text-foreground">
              Terraform Cloud Provisioning & GitHub Actions CI/CD
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

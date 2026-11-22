import * as React from "react";
import {
  FileText,
  Mail,
  MapPin,
  Building2,
  Sparkles,
  ArrowDown,
  Globe,
  Award,
  Download,
  ExternalLink,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { ImpactCalculator } from "./ImpactCalculator";
import { PORTFOLIO_DATA } from "../data/portfolioData";

export function Hero() {
  const { about, contact, metrics, awards } = PORTFOLIO_DATA;

  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="mb-16 pt-2">
      {/* Top Badges: Hiring & Relocation Signals */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-mono border border-border">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          <span className="font-semibold text-accent">Google Certified Data Analyst</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-mono border border-accent/30 font-medium">
          <Globe className="h-3.5 w-3.5" />
          <span>Open to International Relocation</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-mono border border-border">
          <Award className="h-3.5 w-3.5 text-accent" />
          <span>Spot & Shining Star Awardee</span>
        </div>
      </div>

      {/* Greeting & Name */}
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-1">
        Hi 👋, I'm
      </h1>
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-foreground tracking-tight leading-tight mb-3">
        {about.name}
      </h2>

      {/* Role and Meta */}
      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-1.5 font-medium text-foreground">
          <Building2 className="h-4 w-4 text-accent" />
          <span>
            <b>Data Analyst</b> at <b className="text-foreground">{about.currentCompany}</b>
          </span>
        </div>
        <span className="text-border">•</span>
        <div className="flex items-center gap-1 font-mono text-xs sm:text-sm">
          <MapPin className="h-3.5 w-3.5 text-accent" />
          <span>{about.location}</span>
        </div>
      </div>

      {/* The Unicorn Analyst Pitch */}
      <p className="text-base sm:text-lg text-foreground font-medium leading-relaxed mb-3">
        I'm a Data Analyst with two years of experience turning raw, messy data into dashboards, insights, and decisions businesses actually use.
      </p>

      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 font-normal">
        <strong className="text-foreground font-semibold">What sets me apart:</strong> I don't just analyze data — I understand how it's built from the ground up. Having engineered ETL/ELT pipelines processing <span className="text-accent font-semibold">10M+ records daily</span> across Azure Data Factory, Databricks (PySpark), and SQL Server, I trace data quality issues directly back to their origin rather than just flagging anomalies on a chart.
      </p>

      {/* CTA Buttons: 1-Click Native PDF Download + Drive link + Social Row */}
      <div className="flex flex-wrap items-center gap-3 mb-10">
        <div className="inline-flex items-center rounded-md border border-border bg-card p-0.5 shadow-sm">
          <a
            href="/Padmapiyush_Pathak_Resume.pdf"
            download="Padmapiyush_Pathak_Data_Analyst_Resume.pdf"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-primary-foreground bg-primary rounded-md hover:bg-primary/90 transition-colors"
            title="Download resume PDF directly to your device"
          >
            <Download className="h-4 w-4 text-accent" />
            <span>Download Resume PDF</span>
          </a>
          <a
            href={contact.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-2 text-xs font-mono text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors flex items-center gap-1"
            title="Open in Google Drive"
          >
            <span>Drive</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <Button
          variant="secondary"
          size="default"
          onClick={scrollToProjects}
          className="gap-2 font-medium"
        >
          <span>Explore Impact & Dashboards</span>
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

      {/* Quantifiable Impact Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {metrics.map((metric, idx) => (
          <Card
            key={idx}
            className="p-4 paper-texture border-border bg-card hover:border-accent/60 transition-all duration-200"
          >
            <div className="text-2xl sm:text-3xl font-extrabold text-accent font-mono tracking-tight leading-none mb-1">
              {metric.value}
            </div>
            <div className="text-xs sm:text-sm font-bold text-foreground mb-1 leading-snug">
              {metric.label}
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
              {metric.description}
            </p>
          </Card>
        ))}
      </div>

      {/* Interactive Automation Impact Calculator (Live Simulation Widget) */}
      <ImpactCalculator />

      {/* About Me Section */}
      <div className="border-t border-border pt-8">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-accent" />
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            About Me &amp; Approach
          </h3>
        </div>

        <div className="space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
          {about.bio.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

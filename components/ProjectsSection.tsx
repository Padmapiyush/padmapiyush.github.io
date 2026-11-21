import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderGit2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Layers,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { GithubIcon } from "./Icons";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { PORTFOLIO_DATA, Project } from "../data/portfolioData";

export function ProjectsSection() {
  const [expanded, setExpanded] = React.useState(false);
  const projects = PORTFOLIO_DATA.projects;

  const initialItems = projects.slice(0, 2);
  const additionalItems = projects.slice(2);

  return (
    <section id="projects" className="mb-16 scroll-mt-20">
      <div className="flex items-center gap-2 mb-2">
        <FolderGit2 className="h-6 w-6 text-accent" />
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Featured Data Projects
        </h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Production-ready lakehouse architectures, distributed streaming pipelines, and analytical intelligence.
      </p>

      <div className="space-y-6">
        {initialItems.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="space-y-6 overflow-hidden"
            >
              {additionalItems.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {projects.length > 2 && (
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            onClick={() => setExpanded(!expanded)}
            className="gap-2 text-sm"
          >
            {expanded ? (
              <>
                <span>Show Fewer Projects</span>
                <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                <span>Show All Projects ({projects.length})</span>
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      )}
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="p-6 paper-texture hover:shadow-lg transition-all duration-200 border-border bg-card">
      {/* Top Header: Badge, Title & External Links */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
        <div>
          {project.architectureBadge && (
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-accent mb-1.5 font-semibold">
              <Layers className="h-3.5 w-3.5" />
              <span>{project.architectureBadge}</span>
            </div>
          )}
          <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
            {project.name}
          </h3>
          <p className="text-sm text-muted-foreground italic mt-0.5">
            {project.tagline}
          </p>
        </div>

        {/* Links */}
        <div className="flex items-center gap-2 shrink-0">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub Repository"
            >
              <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                <GithubIcon className="h-3.5 w-3.5" />
                <span>Code</span>
              </Button>
            </a>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              title="View Project"
            >
              <Button variant="secondary" size="sm" className="gap-1.5 text-xs">
                <ExternalLink className="h-3.5 w-3.5 text-accent" />
                <span>Explore</span>
              </Button>
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {project.description}
      </p>

      {/* Problem & Solution Mini Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 p-3.5 rounded-md bg-secondary/30 border border-border/60 text-xs">
        <div className="space-y-1">
          <div className="font-semibold text-foreground flex items-center gap-1.5">
            <AlertCircle className="h-3.5 w-3.5 text-accent" />
            <span>Problem Statement:</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">{project.problem}</p>
        </div>
        <div className="space-y-1">
          <div className="font-semibold text-foreground flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
            <span>Architected Solution:</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
        </div>
      </div>

      {/* Architectural Highlights */}
      <div className="mb-4">
        <div className="text-xs font-mono uppercase tracking-wider text-accent font-semibold mb-2">
          Engineering Highlights
        </div>
        <ul className="space-y-1.5">
          {project.highlights.map((highlight, idx) => (
            <li
              key={idx}
              className="text-xs sm:text-sm text-muted-foreground flex items-start gap-2"
            >
              <span className="text-accent text-sm leading-none mt-1 select-none">
                •
              </span>
              <span className="leading-relaxed">{highlight}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Technology Stack Pills */}
      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/50">
        {project.skills.map((skill) => (
          <Badge
            key={skill}
            variant="secondary"
            className="rounded-full text-xs font-normal bg-secondary text-secondary-foreground"
          >
            {skill}
          </Badge>
        ))}
      </div>
    </Card>
  );
}

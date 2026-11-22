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
  ArrowRight,
  Search,
  X,
  Sparkles,
} from "lucide-react";
import { GithubIcon } from "./Icons";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { PORTFOLIO_DATA, Project } from "../data/portfolioData";

type CategoryFilter = "all" | "bi" | "cloud-lakehouse" | "ab-testing" | "streaming";

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = React.useState<CategoryFilter>("all");
  const [selectedTech, setSelectedTech] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [expanded, setExpanded] = React.useState(false);

  const projects = PORTFOLIO_DATA.projects;

  // Extract all unique tech skills for quick filter chips
  const allSkills = React.useMemo(() => {
    const skillsSet = new Set<string>();
    projects.forEach((p) => p.skills.forEach((s) => skillsSet.add(s)));
    return Array.from(skillsSet);
  }, [projects]);

  const filterTabs: { id: CategoryFilter; label: string; count: number }[] = [
    { id: "all", label: "All Projects", count: projects.length },
    {
      id: "bi",
      label: "Power BI & Dashboards",
      count: projects.filter((p) => p.category === "bi").length,
    },
    {
      id: "cloud-lakehouse",
      label: "Azure Cloud Lakehouse",
      count: projects.filter((p) => p.category === "cloud-lakehouse").length,
    },
    {
      id: "ab-testing",
      label: "A/B Testing & Optimization",
      count: projects.filter((p) => p.category === "ab-testing").length,
    },
    {
      id: "streaming",
      label: "Real-Time Streaming",
      count: projects.filter((p) => p.category === "streaming").length,
    },
  ];

  // Combined Filtering: Category + Tech + Keyword search
  const filteredProjects = React.useMemo(() => {
    return projects.filter((project) => {
      // Category match
      const matchesCategory =
        selectedCategory === "all" || project.category === selectedCategory;

      // Tech skill match
      const matchesTech =
        !selectedTech ||
        project.skills.some((s) => s.toLowerCase() === selectedTech.toLowerCase());

      // Search query match
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        project.name.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tagline.toLowerCase().includes(query) ||
        project.skills.some((s) => s.toLowerCase().includes(query));

      return matchesCategory && matchesTech && matchesSearch;
    });
  }, [projects, selectedCategory, selectedTech, searchQuery]);

  const hasActiveFilter =
    selectedCategory !== "all" || selectedTech !== null || searchQuery.trim().length > 0;

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedTech(null);
    setSearchQuery("");
  };

  const initialItems = !hasActiveFilter && !expanded ? filteredProjects.slice(0, 2) : filteredProjects;
  const canExpand = !hasActiveFilter && filteredProjects.length > 2;

  return (
    <section id="projects" className="mb-16 scroll-mt-20">
      <div className="flex items-center gap-2 mb-2">
        <FolderGit2 className="h-6 w-6 text-accent" />
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Featured Analytics & Engineering Projects
        </h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Executive Power BI dashboards, statistical A/B testing models, and high-throughput lakehouse pipelines processing 10M+ records.
      </p>

      {/* Filter Bar Controls */}
      <div className="space-y-3 mb-6 p-4 rounded-xl bg-card border border-border paper-texture">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {filterTabs.map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedCategory(tab.id);
                  setExpanded(true);
                }}
                className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? "bg-secondary text-foreground font-bold shadow-xs border border-border"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? "bg-accent/20 text-accent font-bold" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Tag Chips Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-2 border-t border-border/50">
          {/* Keyword Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tech or keyword (e.g. Power BI, A/B testing, Kafka)..."
              className="w-full bg-secondary/50 border border-border rounded-md pl-9 pr-8 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilter && (
            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
              className="text-xs font-mono text-accent gap-1 h-8 shrink-0"
            >
              <X className="h-3 w-3" />
              <span>Reset Filters</span>
            </Button>
          )}
        </div>

        {/* Popular Tech Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1 text-xs">
          <span className="text-[11px] font-mono text-muted-foreground mr-1">Filter by Tech:</span>
          {["Power BI", "SQL", "Python", "Azure Data Factory", "PySpark", "Kafka", "DAX", "A/B Testing"].map((tech) => {
            const isSelected = selectedTech?.toLowerCase() === tech.toLowerCase();
            return (
              <button
                key={tech}
                onClick={() => {
                  setSelectedTech(isSelected ? null : tech);
                  setExpanded(true);
                }}
                className={`text-[11px] px-2 py-0.5 rounded-full border transition-all cursor-pointer font-mono ${
                  isSelected
                    ? "bg-accent text-accent-foreground border-accent font-bold"
                    : "bg-secondary/40 text-muted-foreground hover:text-foreground border-border/80"
                }`}
              >
                {tech}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count feedback if filtered */}
      {hasActiveFilter && (
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 font-mono px-1">
          <span>
            Showing <b className="text-foreground">{filteredProjects.length}</b> of {projects.length} projects
          </span>
          {filteredProjects.length === 0 && (
            <span className="text-accent">No matches found. Try clearing filters.</span>
          )}
        </div>
      )}

      {/* Projects List */}
      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {initialItems.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
            >
              <ProjectCard project={project} onSelectTech={(tech) => setSelectedTech(tech)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {canExpand && (
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

function ProjectCard({
  project,
  onSelectTech,
}: {
  project: Project;
  onSelectTech?: (tech: string) => void;
}) {
  return (
    <Card className="p-6 paper-texture hover:shadow-lg transition-all duration-200 border-border bg-card">
      {/* Top Header: Badge, Title & External Links */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            {project.architectureBadge && (
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-accent font-semibold bg-accent/15 px-2 py-0.5 rounded-md border border-accent/30">
                <Layers className="h-3 w-3" />
                <span>{project.architectureBadge}</span>
              </span>
            )}
            <Badge variant="secondary" className="text-[10px] font-mono">
              {project.categoryLabel}
            </Badge>
          </div>

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
                <span>Source</span>
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
                <span>Live View</span>
              </Button>
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {project.description}
      </p>

      {/* Visual Pipeline / Architecture Flow */}
      {project.pipelineFlow && project.pipelineFlow.length > 0 && (
        <div className="mb-4 p-3 rounded-md bg-secondary/40 border border-border/80">
          <div className="text-[11px] font-mono uppercase tracking-wider text-accent font-semibold mb-2">
            End-to-End Data Pipeline Architecture
          </div>
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
            {project.pipelineFlow.map((step, idx) => (
              <React.Fragment key={idx}>
                <span className="px-2 py-1 rounded bg-card border border-border text-foreground font-medium shadow-2xs">
                  {step}
                </span>
                {idx < (project.pipelineFlow?.length ?? 0) - 1 && (
                  <ArrowRight className="h-3 w-3 text-accent shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Problem & Solution Mini Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 p-3.5 rounded-md bg-secondary/20 border border-border/60 text-xs">
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

      {/* Engineering Highlights */}
      <div className="mb-4">
        <div className="text-xs font-mono uppercase tracking-wider text-accent font-semibold mb-2">
          Engineering &amp; Analytical Highlights
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

      {/* Technology Stack Pills with interactive filter click */}
      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/50">
        {project.skills.map((skill) => (
          <button
            key={skill}
            onClick={() => onSelectTech && onSelectTech(skill)}
            title={`Filter by ${skill}`}
            className="rounded-full text-xs font-normal bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground px-2.5 py-0.5 border border-border/60 transition-colors cursor-pointer"
          >
            {skill}
          </button>
        ))}
      </div>
    </Card>
  );
}

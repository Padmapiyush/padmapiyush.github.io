import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, ChevronDown, ChevronUp, MapPin, Calendar } from "lucide-react";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { PORTFOLIO_DATA, Experience } from "../data/portfolioData";

export function ExperienceSection() {
  const [expanded, setExpanded] = React.useState(false);
  const experiences = PORTFOLIO_DATA.experiences;

  const initialItems = experiences.slice(0, 2);
  const additionalItems = experiences.slice(2);

  return (
    <section id="experience" className="mb-16 scroll-mt-20">
      <div className="flex items-center gap-2 mb-6">
        <Briefcase className="h-6 w-6 text-accent" />
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Professional Experience
        </h2>
      </div>

      <div className="space-y-4">
        {initialItems.map((exp, index) => (
          <ExperienceCard key={`${exp.company}-${index}`} experience={exp} />
        ))}

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="space-y-4 overflow-hidden"
            >
              {additionalItems.map((exp, index) => (
                <ExperienceCard
                  key={`${exp.company}-additional-${index}`}
                  experience={exp}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {experiences.length > 2 && (
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            onClick={() => setExpanded(!expanded)}
            className="gap-2 text-sm"
          >
            {expanded ? (
              <>
                <span>Show Less</span>
                <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                <span>Show All Experience ({experiences.length})</span>
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      )}
    </section>
  );
}

function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <Card className="p-6 paper-texture hover:shadow-lg transition-all duration-200 border-border bg-card">
      {/* Header: Company & Role */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              {experience.company}
            </h3>
            {experience.isCurrent && (
              <Badge variant="secondary" className="bg-accent/15 text-accent text-[11px] font-mono border-accent/30">
                Current Role
              </Badge>
            )}
          </div>
          <p className="text-sm sm:text-base text-muted-foreground italic mt-0.5">
            {experience.position}
          </p>
        </div>

        <div className="flex flex-col sm:items-end text-xs font-mono text-muted-foreground shrink-0">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-accent" />
            <span>{experience.duration}</span>
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
            <span>{experience.location}</span>
          </div>
        </div>
      </div>

      {/* Responsibilities */}
      <ul className="space-y-2 mb-4">
        {experience.responsibilities.map((bullet, idx) => (
          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2.5">
            <span className="text-accent text-base leading-none select-none mt-1">
              •
            </span>
            <span className="leading-relaxed">{bullet}</span>
          </li>
        ))}
      </ul>

      {/* Tech Pills */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {experience.skills.map((skill) => (
          <Badge
            key={skill}
            variant="secondary"
            className="rounded-full text-xs font-normal bg-secondary text-secondary-foreground hover:bg-muted"
          >
            {skill}
          </Badge>
        ))}
      </div>
    </Card>
  );
}

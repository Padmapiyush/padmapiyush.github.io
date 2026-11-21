import * as React from "react";
import { Cpu } from "lucide-react";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { PORTFOLIO_DATA } from "../data/portfolioData";

export function SkillsSection() {
  const skillsData = PORTFOLIO_DATA.skills;

  return (
    <section id="skills" className="mb-16 scroll-mt-20">
      <div className="flex items-center gap-2 mb-2">
        <Cpu className="h-6 w-6 text-accent" />
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Technical Skills & Stack
        </h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Modern cloud data stack, distributed engines, declarative infrastructure, and business analytics.
      </p>

      {/* Unified paper-texture card matching reference site */}
      <Card className="paper-texture overflow-hidden border-border bg-card">
        <div className="p-6 divide-y divide-border/60">
          {skillsData.map((category, idx) => (
            <div
              key={category.category}
              className={`flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 ${
                idx === 0 ? "pb-5" : idx === skillsData.length - 1 ? "pt-5" : "py-5"
              }`}
            >
              {/* Category Label */}
              <div className="sm:w-64 shrink-0">
                <span className="text-accent font-semibold text-sm sm:text-base font-mono tracking-tight uppercase">
                  {category.category}
                </span>
              </div>

              {/* Skill Badges */}
              <div className="flex flex-wrap gap-2 flex-1">
                {category.items.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="rounded-full border border-dashed border-border/80 px-3 py-1 text-xs font-medium text-secondary-foreground bg-secondary/80 hover:bg-muted transition-colors cursor-default"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}

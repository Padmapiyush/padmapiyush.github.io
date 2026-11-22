import * as React from "react";
import { Trophy, Award, Quote, CheckCircle2, Star, Sparkles, Building2 } from "lucide-react";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { PORTFOLIO_DATA } from "../data/portfolioData";

export function AwardsTestimonialsSection() {
  const { awards } = PORTFOLIO_DATA;

  const endorsements = [
    {
      role: "Operations & Business Stakeholder",
      context: "IDEMIA Public Security Dashboard Automation",
      quote:
        "Padmapiyush transformed how our leadership consumes operational metrics. Moving from error-prone manual spreadsheets to automated Power BI portals cut manual effort by 95% and gave our stakeholders instant visibility into project health.",
      tag: "95% Automation Impact",
    },
    {
      role: "Procurement & Logistics Partner",
      context: "A/B Testing Vendor Selection Initiative",
      quote:
        "His statistical A/B testing framework on vendor pricing and fulfillment SLAs directly yielded a 12% cost reduction and improved delivery turnaround by 8%. His analytical rigor and data-driven recommendations were indispensable.",
      tag: "12% Cost Optimization",
    },
    {
      role: "Data Engineering Collaborator",
      context: "Azure Lakehouse & Cloud ETL Pipelines",
      quote:
        "What truly sets Padmapiyush apart from typical analysts is his pipeline depth. He doesn't just build visualizations—he writes PySpark jobs, provisions Azure cloud infrastructure, and fixes data quality issues right at their source.",
      tag: "10M+ Records / Pipeline Depth",
    },
  ];

  return (
    <section id="awards" className="mb-16 scroll-mt-20">
      <div className="flex items-center gap-2 mb-2">
        <Trophy className="h-6 w-6 text-accent" />
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Corporate Honors &amp; Stakeholder Social Proof
        </h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Recognition for operational speed, high-ROI A/B testing, and end-to-end data pipeline mastery.
      </p>

      {/* Award Spotlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Spot Award */}
        <Card className="p-6 paper-texture border-accent/40 bg-card relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-lg bg-accent/20 border border-accent/40 flex items-center justify-center">
                <Award className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-bold text-base text-foreground">Spot Award</h3>
                <span className="text-xs font-mono text-muted-foreground">IDEMIA Public Security • 2025</span>
              </div>
            </div>
            <Badge variant="secondary" className="bg-accent/20 text-accent font-mono text-xs font-bold">
              HONOR
            </Badge>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
            Awarded by engineering leadership for rapid turnaround in architecting <strong>20+ Power BI dashboards</strong> and automating operational reporting workflows, reducing manual effort by <strong>~95%</strong> under critical production deadlines.
          </p>

          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/50 text-[11px] font-mono text-accent">
            <span className="px-2 py-0.5 rounded bg-secondary border border-border">95% Effort Reduction</span>
            <span className="px-2 py-0.5 rounded bg-secondary border border-border">20+ Dashboards</span>
            <span className="px-2 py-0.5 rounded bg-secondary border border-border">Rapid Turnaround</span>
          </div>
        </Card>

        {/* Shining Star Award */}
        <Card className="p-6 paper-texture border-accent/40 bg-card relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-lg bg-accent/20 border border-accent/40 flex items-center justify-center">
                <Star className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-bold text-base text-foreground">Shining Star Award</h3>
                <span className="text-xs font-mono text-muted-foreground">IDEMIA • 2024</span>
              </div>
            </div>
            <Badge variant="secondary" className="bg-accent/20 text-accent font-mono text-xs font-bold">
              EXCELLENCE
            </Badge>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
            Recognized for technical depth in dimensional data modeling and leading statistical <strong>A/B testing initiatives</strong> that directly achieved a <strong>12% cost reduction</strong> in vendor selection and <strong>8% faster delivery</strong> turnaround.
          </p>

          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/50 text-[11px] font-mono text-accent">
            <span className="px-2 py-0.5 rounded bg-secondary border border-border">12% Cost Reduction</span>
            <span className="px-2 py-0.5 rounded bg-secondary border border-border">A/B Testing Framework</span>
            <span className="px-2 py-0.5 rounded bg-secondary border border-border">Data Modeling</span>
          </div>
        </Card>
      </div>

      {/* Stakeholder Perspectives & Endorsement Cards */}
      <div>
        <div className="flex items-center gap-2 mb-3 text-xs font-mono uppercase tracking-wider text-accent font-semibold">
          <Quote className="h-4 w-4" />
          <span>Cross-Functional Impact Perspectives</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {endorsements.map((item, idx) => (
            <Card
              key={idx}
              className="p-4 paper-texture border-border bg-secondary/30 flex flex-col justify-between hover:bg-secondary/50 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-[10px] font-mono border-accent/30 text-accent">
                    {item.tag}
                  </Badge>
                  <Quote className="h-3.5 w-3.5 text-accent/40" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed italic mb-3">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-2 border-t border-border/50 text-[11px]">
                <div className="font-bold text-foreground">{item.role}</div>
                <div className="text-[10px] text-muted-foreground font-mono">{item.context}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

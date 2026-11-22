import * as React from "react";
import { Clock, TrendingDown, Zap, CheckCircle2, ArrowRight } from "lucide-react";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";

export function ImpactCalculator() {
  const [reportsCount, setReportsCount] = React.useState<number>(15);

  // Business calculations based on IDEMIA 95% automation metrics
  // Average manual reporting takes ~4 hours per report per week (data gathering, manual joins, formatting, emailing)
  const manualHoursPerMonth = reportsCount * 4 * 4;
  const automatedHoursPerMonth = Math.round(manualHoursPerMonth * 0.05); // 95% reduction
  const hoursSavedPerMonth = manualHoursPerMonth - automatedHoursPerMonth;
  const daysOfWorkSavedPerYear = Math.round((hoursSavedPerMonth * 12) / 8);

  return (
    <Card className="p-6 paper-texture border-border bg-card/90 my-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <h3 className="text-base sm:text-lg font-bold text-foreground">
              Interactive Automation & ROI Calculator
            </h3>
            <Badge variant="secondary" className="text-[10px] bg-accent/15 text-accent font-mono">
              LIVE SIMULATOR
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Simulate the business impact of transitioning from manual reporting to automated SQL & Python data pipelines.
          </p>
        </div>
        <div className="text-xs font-mono text-accent font-semibold shrink-0">
          95% Effort Reduction Model
        </div>
      </div>

      {/* Slider Control */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="text-muted-foreground">Number of Recurring Reports / Dashboards:</span>
          <span className="text-accent font-bold text-sm bg-secondary px-2.5 py-0.5 rounded-md border border-border">
            {reportsCount} Enterprise Reports
          </span>
        </div>
        <input
          type="range"
          min="3"
          max="35"
          step="1"
          value={reportsCount}
          onChange={(e) => setReportsCount(Number(e.target.value))}
          className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-accent"
        />
        <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
          <span>3 small team reports</span>
          <span>15 cross-functional reports</span>
          <span>35 enterprise dashboards</span>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Manual Process */}
        <div className="p-4 rounded-lg bg-secondary/30 border border-border/70 flex flex-col justify-between">
          <div className="text-xs font-mono text-muted-foreground mb-1 flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-red-400" />
            <span>Legacy Manual Method</span>
          </div>
          <div className="text-2xl font-extrabold text-foreground font-mono">
            {manualHoursPerMonth} <span className="text-xs font-normal text-muted-foreground">hrs/mo</span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
            Manual CSV extracts, spreadsheet merging, high error rates, delayed executive delivery.
          </p>
        </div>

        {/* Automated Process */}
        <div className="p-4 rounded-lg bg-accent/10 border border-accent/40 flex flex-col justify-between">
          <div className="text-xs font-mono text-accent mb-1 flex items-center gap-1.5 font-semibold">
            <Zap className="h-3.5 w-3.5" />
            <span>Padmapiyush's Pipeline</span>
          </div>
          <div className="text-2xl font-extrabold text-accent font-mono">
            {automatedHoursPerMonth} <span className="text-xs font-normal text-accent/80">hrs/mo</span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
            Automated SQL scheduled refreshes, PySpark transformations, 100% data lineage & instant dashboards.
          </p>
        </div>

        {/* Total Value Delivered */}
        <div className="p-4 rounded-lg bg-secondary/60 border border-border flex flex-col justify-between">
          <div className="text-xs font-mono text-accent mb-1 flex items-center gap-1.5 font-semibold">
            <TrendingDown className="h-3.5 w-3.5" />
            <span>Annual Resource Savings</span>
          </div>
          <div className="text-2xl font-extrabold text-foreground font-mono">
            {daysOfWorkSavedPerYear} <span className="text-xs font-normal text-accent">workdays saved/yr</span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
            Reinvested into proactive analytics, A/B testing optimization, and high-impact revenue strategy.
          </p>
        </div>
      </div>
    </Card>
  );
}

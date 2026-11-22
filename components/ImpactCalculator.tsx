import * as React from "react";
import {
  Clock,
  TrendingDown,
  Zap,
  CheckCircle2,
  DollarSign,
  BarChart3,
  LineChart as LineChartIcon,
} from "lucide-react";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";

export function ImpactCalculator() {
  const [activeTab, setActiveTab] = React.useState<"automation" | "abtesting">("automation");

  // Mode 1: 95% Automation parameters
  const [reportsCount, setReportsCount] = React.useState<number>(15);
  const manualHoursPerMonth = reportsCount * 4 * 4;
  const automatedHoursPerMonth = Math.round(manualHoursPerMonth * 0.05); // 95% reduction
  const hoursSavedPerMonth = manualHoursPerMonth - automatedHoursPerMonth;
  const daysOfWorkSavedPerYear = Math.round((hoursSavedPerMonth * 12) / 8);

  // Mode 2: 12% Cost Reduction parameters
  const [monthlySpend, setMonthlySpend] = React.useState<number>(50000);
  const annualSpend = monthlySpend * 12;
  const annualSavings = Math.round(annualSpend * 0.12); // 12% cost reduction
  const deliveryDaysSaved = Math.round(30 * 0.08); // 8% turnaround boost

  return (
    <Card className="p-6 paper-texture border-border bg-card/90 my-8 shadow-sm">
      {/* Simulator Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-border/70">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-accent animate-pulse" />
            <h3 className="text-base sm:text-lg font-bold text-foreground">
              Interactive Analytics Impact Simulator
            </h3>
            <Badge variant="secondary" className="text-[10px] bg-accent/15 text-accent font-mono font-semibold">
              LIVE KPI ENGINE
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Test and visualize the quantifiable business outcomes delivered across IDEMIA initiatives.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex p-1 bg-secondary/80 rounded-lg border border-border self-start sm:self-auto">
          <button
            onClick={() => setActiveTab("automation")}
            className={`px-3 py-1 rounded-md text-xs font-mono font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === "automation"
                ? "bg-card text-foreground font-bold shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <BarChart3 className="h-3.5 w-3.5 text-accent" />
            <span>95% Automation</span>
          </button>
          <button
            onClick={() => setActiveTab("abtesting")}
            className={`px-3 py-1 rounded-md text-xs font-mono font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === "abtesting"
                ? "bg-card text-foreground font-bold shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <LineChartIcon className="h-3.5 w-3.5 text-accent" />
            <span>12% A/B Test ROI</span>
          </button>
        </div>
      </div>

      {activeTab === "automation" ? (
        /* ================= MODE 1: 95% AUTOMATION SIMULATOR ================= */
        <div className="space-y-6">
          {/* Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-muted-foreground">Number of Active Enterprise Reports:</span>
              <span className="text-accent font-bold text-sm bg-secondary px-2.5 py-0.5 rounded-md border border-border">
                {reportsCount} Recurring Reports
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
              <span>3 team reports</span>
              <span>15 cross-functional portals</span>
              <span>35 global reports</span>
            </div>
          </div>

          {/* Interactive SVG Bar Chart Comparison */}
          <div className="p-4 rounded-lg bg-secondary/30 border border-border/70 space-y-3">
            <div className="text-xs font-mono text-muted-foreground flex justify-between">
              <span>Monthly Hours Spent on Reporting Workflows</span>
              <span className="text-accent font-semibold font-mono">95% reduction</span>
            </div>

            {/* Bar 1: Manual */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-red-400" />
                  <span>Manual Spreadsheet Extraction &amp; Formatting</span>
                </span>
                <span className="font-mono font-bold text-foreground">{manualHoursPerMonth} hrs/mo</span>
              </div>
              <div className="w-full h-4 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-400/80 rounded-full transition-all duration-300"
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            {/* Bar 2: Automated */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-accent font-semibold flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-accent" />
                  <span>Padmapiyush's Automated SQL &amp; Power BI Pipeline</span>
                </span>
                <span className="font-mono font-bold text-accent">{automatedHoursPerMonth} hrs/mo</span>
              </div>
              <div className="w-full h-4 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-300"
                  style={{ width: `${Math.max(5, (automatedHoursPerMonth / manualHoursPerMonth) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-lg bg-secondary/50 border border-border">
              <div className="text-xs font-mono text-accent font-semibold mb-1">
                Hours Reclaimed / Month
              </div>
              <div className="text-2xl font-extrabold text-foreground font-mono">
                {hoursSavedPerMonth} <span className="text-xs font-normal text-muted-foreground">hrs/mo</span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">
                Eliminates repetitive data gathering, manual joins, and spreadsheet formula bugs.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-secondary/50 border border-border">
              <div className="text-xs font-mono text-accent font-semibold mb-1">
                Annual Productivity Gain
              </div>
              <div className="text-2xl font-extrabold text-accent font-mono">
                {daysOfWorkSavedPerYear} <span className="text-xs font-normal text-accent/80">workdays/yr</span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">
                Freed bandwidth directly redirected to predictive modeling and executive strategy.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-secondary/50 border border-border">
              <div className="text-xs font-mono text-accent font-semibold mb-1">
                Data Fidelity &amp; Lineage
              </div>
              <div className="text-2xl font-extrabold text-foreground font-mono">
                100% <span className="text-xs font-normal text-muted-foreground">traceable</span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">
                Automated error notifications trace upstream schema anomalies before hitting dashboards.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* ================= MODE 2: 12% A/B TESTING ROI SIMULATOR ================= */
        <div className="space-y-6">
          {/* Spend Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-muted-foreground">Simulated Monthly Vendor &amp; Procurement Spend:</span>
              <span className="text-accent font-bold text-sm bg-secondary px-2.5 py-0.5 rounded-md border border-border">
                ${monthlySpend.toLocaleString()} / mo
              </span>
            </div>
            <input
              type="range"
              min="10000"
              max="200000"
              step="5000"
              value={monthlySpend}
              onChange={(e) => setMonthlySpend(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-accent"
            />
            <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
              <span>$10,000 / mo</span>
              <span>$50,000 / mo</span>
              <span>$200,000 / mo</span>
            </div>
          </div>

          {/* Interactive SVG Cumulative Savings Curve */}
          <div className="p-4 rounded-lg bg-secondary/30 border border-border/70 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono text-muted-foreground mb-1">
              <span>12-Month Cumulative Cost Savings from Statistical A/B Testing</span>
              <span className="text-accent font-bold">12% Bottom-Line Reduction</span>
            </div>

            {/* SVG Visual Chart */}
            <svg viewBox="0 0 500 120" className="w-full h-28 overflow-visible">
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#CF6D41" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#CF6D41" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Baseline axis */}
              <line x1="20" y1="100" x2="480" y2="100" stroke="#363E48" strokeWidth="1.5" />
              <line x1="20" y1="20" x2="20" y2="100" stroke="#363E48" strokeWidth="1.5" />

              {/* Grid ticks */}
              {[0, 3, 6, 9, 12].map((m, i) => (
                <text
                  key={i}
                  x={20 + (i * 460) / 4}
                  y="114"
                  fill="#9F9B93"
                  fontSize="9"
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  M{m}
                </text>
              ))}

              {/* Area & Line */}
              <path
                d={`M 20 100 Q 250 85 480 30 L 480 100 L 20 100 Z`}
                fill="url(#areaGradient)"
              />
              <path
                d={`M 20 100 Q 250 85 480 30`}
                fill="none"
                stroke="#CF6D41"
                strokeWidth="3"
              />

              {/* Endpoint dot and callout */}
              <circle cx="480" cy="30" r="5" fill="#CF6D41" stroke="#E6E3DC" strokeWidth="2" />
              <text x="475" y="20" fill="#CF6D41" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="end">
                +${annualSavings.toLocaleString()} saved
              </text>
            </svg>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-lg bg-secondary/50 border border-border">
              <div className="text-xs font-mono text-accent font-semibold mb-1">
                Annual Cost Saved
              </div>
              <div className="text-2xl font-extrabold text-accent font-mono">
                ${annualSavings.toLocaleString()}
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">
                Verified across IDEMIA procurement datasets via hypothesis-tested vendor selection.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-secondary/50 border border-border">
              <div className="text-xs font-mono text-accent font-semibold mb-1">
                Delivery Timeline SLA
              </div>
              <div className="text-2xl font-extrabold text-foreground font-mono">
                8% Faster
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">
                Anomaly detection in fulfillment lifecycles prevented inventory bottlenecks.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-secondary/50 border border-border">
              <div className="text-xs font-mono text-accent font-semibold mb-1">
                Statistical Confidence
              </div>
              <div className="text-2xl font-extrabold text-foreground font-mono">
                p &lt; 0.05
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">
                Rigorous confidence interval evaluations preventing false-positive supplier decisions.
              </p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

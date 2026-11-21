import * as React from "react";
import {
  Bot,
  X,
  Send,
  Sparkles,
  User,
  ArrowRight,
  Terminal,
  RefreshCw,
  Award,
  TrendingUp,
} from "lucide-react";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { PORTFOLIO_DATA } from "../data/portfolioData";

interface Message {
  role: "assistant" | "user";
  content: string;
}

interface AiCopilotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AiCopilotModal({ isOpen, onClose }: AiCopilotModalProps) {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm **Data Copilot**, Padmapiyush's portfolio assistant. Ask me anything about his analytics impact, 95% dashboard automation, 10M+ ETL pipelines, or why he's the ideal Data Analyst for your team!",
    },
  ]);
  const [input, setInput] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "Why is Padmapiyush the best analyst for our team?",
    "Tell me about his 95% reporting automation & 20+ dashboards.",
    "What business impact did he deliver via A/B testing?",
    "Is he open to international relocation?",
  ];

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, messages]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const newMessages: Message[] = [...messages, { role: "user", content: query }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateCopilotResponse(query);
      setMessages([...newMessages, { role: "assistant", content: reply }]);
      setIsTyping(false);
    }, 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl h-[88vh] max-h-[720px] rounded-xl border border-border bg-card paper-texture shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:px-6 border-b border-border flex items-center justify-between bg-card/80">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-secondary border border-border flex items-center justify-center">
              <Bot className="h-5 w-5 text-accent animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-foreground leading-tight">
                  Data Copilot (AI)
                </h3>
                <Badge
                  variant="secondary"
                  className="bg-accent/15 text-accent font-mono text-[10px] px-1.5 py-0"
                >
                  TOP ANALYST ASSISTANT
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground font-mono">
                Ask anything about Padmapiyush's analytics background & impact
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Chat History */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 text-sm">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "assistant" && (
                <div className="h-7 w-7 rounded-md bg-secondary border border-border shrink-0 flex items-center justify-center mt-0.5">
                  <Bot className="h-4 w-4 text-accent" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-lg p-3.5 leading-relaxed text-sm ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground font-medium"
                    : "bg-secondary/70 border border-border text-foreground shadow-xs"
                }`}
              >
                <div
                  className="prose prose-sm dark:prose-invert max-w-none space-y-2"
                  dangerouslySetInnerHTML={{
                    __html: formatMarkdownToHtml(msg.content),
                  }}
                />
              </div>

              {msg.role === "user" && (
                <div className="h-7 w-7 rounded-md bg-accent/20 border border-accent/40 shrink-0 flex items-center justify-center mt-0.5">
                  <User className="h-4 w-4 text-accent" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start items-center">
              <div className="h-7 w-7 rounded-md bg-secondary border border-border shrink-0 flex items-center justify-center">
                <Bot className="h-4 w-4 text-accent" />
              </div>
              <div className="p-3 rounded-lg bg-secondary/50 border border-border text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                <RefreshCw className="h-3 w-3 animate-spin text-accent" />
                <span>Querying performance metrics & achievements...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Starter Questions */}
        <div className="px-4 py-2 border-t border-border/50 bg-card/40 overflow-x-auto">
          <div className="flex gap-2 text-xs whitespace-nowrap">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="px-2.5 py-1 rounded-full border border-border bg-secondary/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer text-xs"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 border-t border-border bg-card flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about Power BI, 95% automation, A/B testing, IDEMIA awards..."
            className="flex-1 bg-secondary/60 border border-border rounded-md px-3.5 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
          <Button
            variant="default"
            size="default"
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="gap-1.5 font-medium px-4"
          >
            <span>Send</span>
            <Send className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function generateCopilotResponse(query: string): string {
  const q = query.toLowerCase();
  const data = PORTFOLIO_DATA;

  if (q.includes("best") || q.includes("why hire") || q.includes("stand out") || q.includes("sets apart")) {
    return (
      "What makes Padmapiyush the **best Data Analyst you can hire** is his rare **full-cycle ownership**:\n\n" +
      "- **Not Just a Dashboard Builder:** Most analysts merely flag anomalies on a chart; Padmapiyush understands the entire data pipeline and has built ETL/ELT pipelines processing **10M+ daily records** with Azure Data Factory, Databricks (PySpark), and SQL Server. He traces data quality bugs directly to their root source.\n" +
      "- **Measurable Business ROI:** Led A/B testing initiatives that **slashed vendor costs by 12%** and accelerated delivery timelines by **8%**.\n" +
      "- **High-Velocity Automation:** Automated reporting workflows to **cut manual effort by ~95%** at IDEMIA Public Security.\n" +
      "- **Proven Leadership & Recognition:** Recipient of both the **Spot Award** and **Shining Star Award** at IDEMIA, Google Certified, and former Data Science Lead at Team CodeOn."
    );
  }

  if (q.includes("automation") || q.includes("95%") || q.includes("dashboard") || q.includes("20+")) {
    return (
      "At **IDEMIA Public Security**, Padmapiyush delivered massive efficiency gains:\n\n" +
      "- **Published 20+ Enterprise Power BI Dashboards:** Unifying fragmented data streams into executive KPI portals with DAX modeling.\n" +
      "- **95% Manual Effort Reduction:** Replaced error-prone manual spreadsheets with automated SQL data refresh jobs and automated Python reporting routines.\n" +
      "- **Centralized KPI Models:** Integrated heterogeneous transactional databases into cohesive dimensional reporting models used across multi-national projects."
    );
  }

  if (q.includes("a/b") || q.includes("cost") || q.includes("vendor") || q.includes("roi")) {
    return (
      "During his tenure as Data Analyst at IDEMIA, Padmapiyush spearheaded rigorous **statistical A/B testing**:\n\n" +
      "- **12% Cost Reduction:** Evaluated vendor performance datasets and pricing models, guiding procurement teams to optimal partner selection.\n" +
      "- **8% Faster Delivery Timelines:** Identified bottleneck trends in supplier fulfillment SLAs.\n" +
      "- **7+ Deployed Dashboards:** Cut recurring manual reporting efforts by **40%**."
    );
  }

  if (q.includes("relocation") || q.includes("international") || q.includes("visa") || q.includes("remote") || q.includes("relocate")) {
    return (
      "Yes! Padmapiyush is **actively open to international relocation** as well as top-tier remote roles.\n\n" +
      "He holds a **Master of Computer Applications (MCA)**, is **Google Certified**, and brings enterprise-tested experience from a global organization (IDEMIA Public Security).\n\n" +
      "You can reach out directly via email at [thepadmapiyush@gmail.com](mailto:thepadmapiyush@gmail.com) or call [+91 9532683568](tel:+919532683568)."
    );
  }

  if (q.includes("award") || q.includes("honor") || q.includes("spot") || q.includes("shining star")) {
    return (
      "Padmapiyush has earned two major corporate excellence honors at IDEMIA:\n\n" +
      "- **Spot Award (IDEMIA Public Security):** For rapid turnaround on mission-critical stakeholder dashboards and delivering 95% reporting automation.\n" +
      "- **Shining Star Award (IDEMIA):** For technical excellence in enterprise data modeling, SQL optimization, and business impact through analytics."
    );
  }

  if (q.includes("skills") || q.includes("stack") || q.includes("tool") || q.includes("power bi") || q.includes("sql")) {
    return (
      "Padmapiyush's top competencies include:\n\n" +
      "- **BI & Visualization:** Microsoft Power BI, DAX Measures, Tableau, Advanced Excel, Executive Storytelling.\n" +
      "- **Querying & Scripting:** Advanced SQL (Level Up Certified), Python (Pandas/NumPy), PySpark, MySQL, T-SQL.\n" +
      "- **Pipelines & Cloud:** Azure Data Factory (ADF), Azure Databricks, SQL Server, Delta Lake, 10M+ Daily Records ETL/ELT.\n" +
      "- **Methodologies:** Statistical A/B Testing, Business Process Modeling, Root-Cause Analysis, KPI Architecture."
    );
  }

  if (q.includes("contact") || q.includes("hire") || q.includes("email") || q.includes("phone")) {
    return (
      "Connect directly with Padmapiyush:\n\n" +
      "- **Email:** [thepadmapiyush@gmail.com](mailto:thepadmapiyush@gmail.com)\n" +
      "- **Phone:** [+91 9532683568](tel:+919532683568)\n" +
      "- **LinkedIn:** [linkedin.com/in/padmapiyush](https://www.linkedin.com/in/padmapiyush/)\n" +
      "- **GitHub:** [github.com/padmapiyush](https://github.com/padmapiyush)\n" +
      "- **Resume:** [View / Download Resume](" + data.contact.resume + ")\n\n" +
      "He is ready to own analytics challenges from raw data to executive insight!"
    );
  }

  return (
    `Padmapiyush Pathak is a **Google Certified Data Analyst** at IDEMIA Public Security who brings a rare blend of **95% dashboard automation**, **A/B testing cost reduction (12%)**, and **10M+ records ETL engineering**.\n\n` +
    `Ask about his **20+ Power BI dashboards**, **A/B testing impact**, **Azure Databricks experience**, or [download his resume](${data.contact.resume})!`
  );
}

function formatMarkdownToHtml(text: string): string {
  let html = text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-accent underline font-semibold hover:opacity-80">$1</a>');

  const lines = html.split("\n");
  const processedLines: string[] = [];
  let inList = false;

  for (const line of lines) {
    if (line.trim().startsWith("- ")) {
      if (!inList) {
        processedLines.push("<ul class='list-disc pl-4 space-y-1 my-1.5'>");
        inList = true;
      }
      processedLines.push(`<li>${line.trim().substring(2)}</li>`);
    } else {
      if (inList) {
        processedLines.push("</ul>");
        inList = false;
      }
      if (line.trim()) {
        processedLines.push(`<p>${line}</p>`);
      }
    }
  }
  if (inList) {
    processedLines.push("</ul>");
  }

  return processedLines.join("");
}

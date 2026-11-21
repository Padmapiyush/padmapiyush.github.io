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
        "Hi! I'm **Data Copilot**, Padmapiyush's portfolio assistant. Ask me anything about his data engineering pipelines, Azure/Databricks experience, lakehouse architecture, or background!",
    },
  ]);
  const [input, setInput] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "What is Padmapiyush's current role and stack?",
    "Tell me about the Azure Medallion Lakehouse project.",
    "What are his core big data & streaming skills?",
    "How can I contact or hire Padmapiyush?",
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

    // Generate intelligent response grounded in Padmapiyush's real data
    setTimeout(() => {
      const reply = generateCopilotResponse(query);
      setMessages([...newMessages, { role: "assistant", content: reply }]);
      setIsTyping(false);
    }, 450);
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
                  LIVE ASSISTANT
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground font-mono">
                Ask anything about Padmapiyush's data engineering career
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
                <span>Thinking & querying knowledge base...</span>
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
            placeholder="Ask about Azure pipelines, PySpark, experience at IDEMIA..."
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

  if (q.includes("azure") || q.includes("lakehouse") || q.includes("medallion")) {
    return (
      "Padmapiyush architected the **Azure Medallion Lakehouse Pipeline**, a production-style lakehouse on Microsoft Azure:\n\n" +
      "- **Bronze Layer:** Raw data ingestion from varied endpoints via **Azure Data Factory (ADF)** with parameterized datasets.\n" +
      "- **Silver Layer:** Cleansed and standardized tables modeled in **Azure Databricks (PySpark)** with automated schema validation.\n" +
      "- **Gold Layer:** Optimized dimensional models stored as **Delta Lake** tables for ACID reliability and high-speed analytical queries.\n" +
      "- **DevOps & Security:** Fully provisioned with **Terraform**, credential isolation via **Azure Key Vault**, and automated CI/CD.\n\n" +
      "You can inspect the full source code on [GitHub](" + data.projects[0].github + ")."
    );
  }

  if (q.includes("streaming") || q.includes("kafka") || q.includes("real-time") || q.includes("spark")) {
    return (
      "In his **Real-Time Orders Streaming Platform**, Padmapiyush engineered an end-to-end streaming architecture:\n\n" +
      "- **Ingestion:** High-throughput streaming event ingestion using **Apache Kafka** partitioned topic clusters.\n" +
      "- **Processing:** Low-latency sliding-window aggregations implemented via **Spark Structured Streaming** with watermarking.\n" +
      "- **Orchestration & Transformation:** Managed through **Apache Airflow** DAGs and **dbt** (data build tool) running in Docker containers.\n\n" +
      "Check out the project details on [GitHub](" + data.projects[1].github + ")."
    );
  }

  if (q.includes("current") || q.includes("role") || q.includes("job") || q.includes("idemia") || q.includes("work")) {
    return (
      "Padmapiyush currently works as a **Data Engineering Analyst at IDEMIA Public Security** in Noida, India (since August 2025).\n\n" +
      "His core responsibilities include:\n" +
      "- Building robust ETL/ELT pipelines with **Azure Data Factory** and **Databricks (PySpark)**.\n" +
      "- Provisioning secure enterprise cloud infrastructure (**ADLS Gen2**, **Key Vault**, **Managed Identity**).\n" +
      "- Performance tuning SQL queries and PySpark partitions to slash compute costs and pipeline runtimes.\n" +
      "- Automating cloud deployments using **Terraform** and **GitHub Actions** CI/CD."
    );
  }

  if (q.includes("skills") || q.includes("stack") || q.includes("technology") || q.includes("tech")) {
    return (
      "Padmapiyush's technical stack spans modern data engineering and analytics:\n\n" +
      "- **Languages:** SQL, Python, PySpark, T-SQL, Bash, TypeScript\n" +
      "- **Data Engineering:** Medallion Lakehouse (Bronze-Silver-Gold), Delta Lake, ETL/ELT, Data Modeling\n" +
      "- **Cloud & Big Data:** Azure Data Factory, Databricks, ADLS Gen2, Apache Kafka, Spark\n" +
      "- **Orchestration & DevOps:** Airflow, dbt, Terraform (IaC), GitHub Actions, Docker\n" +
      "- **Analytics & BI:** Power BI, DAX, Tableau, Advanced Excel, A/B Testing"
    );
  }

  if (q.includes("contact") || q.includes("hire") || q.includes("email") || q.includes("reach") || q.includes("phone")) {
    return (
      "You can connect directly with Padmapiyush via:\n\n" +
      "- **Email:** [thepadmapiyush@gmail.com](mailto:thepadmapiyush@gmail.com)\n" +
      "- **LinkedIn:** [linkedin.com/in/padmapiyush](https://www.linkedin.com/in/padmapiyush/)\n" +
      "- **GitHub:** [github.com/padmapiyush](https://github.com/padmapiyush)\n" +
      "- **Phone:** +91 9532683568\n" +
      "- **Resume:** [View / Download Resume](" + data.contact.resume + ")\n\n" +
      "He is actively open for data engineering collaborations and strategic engineering opportunities!"
    );
  }

  if (q.includes("education") || q.includes("college") || q.includes("degree") || q.includes("certif")) {
    return (
      "Padmapiyush holds an **MCA (Master of Computer Applications, 2024)** from Galgotias College of Engineering & Technology, and a **BCA (2022)** from Integral University.\n\n" +
      "His professional certifications include:\n" +
      "- **Google Data Analytics Professional Certificate**\n" +
      "- **The Python Certification Course** (Edureka)\n" +
      "- **Learning Ansible** (Systems Orchestration)\n" +
      "- **Data Analytics A-Z with Python**\n" +
      "- **Graphite and Grafana Application Performance Visualization**"
    );
  }

  // Default fallback response
  return (
    `Padmapiyush is a **Data Engineering Analyst** at IDEMIA Public Security specializing in modern lakehouse architectures (Azure, Databricks, Delta Lake), real-time streaming (Kafka, Spark), and automation with Terraform & CI/CD.\n\n` +
    `Feel free to ask about his specific **projects**, **skills**, **experience**, or [download his resume](${data.contact.resume})!`
  );
}

function formatMarkdownToHtml(text: string): string {
  // Simple markdown to HTML parser for bold, italics, bullets, and links
  let html = text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-accent underline font-semibold hover:opacity-80">$1</a>');

  // Convert bullet lists
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

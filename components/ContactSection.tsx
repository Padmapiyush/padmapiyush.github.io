import * as React from "react";
import {
  Mail,
  Copy,
  Check,
  FileText,
  Phone,
  Share2,
  Calendar,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { PORTFOLIO_DATA } from "../data/portfolioData";

export function ContactSection() {
  const [copied, setCopied] = React.useState(false);
  const [dayPrompt, setDayPrompt] = React.useState({ day: "", text: "" });
  const { contact } = PORTFOLIO_DATA;

  React.useEffect(() => {
    const dayPrompts = [
      {
        day: "Sunday",
        text: "Sunday strategy sessions? I'm in. Let's discuss your next data architecture or lakehouse initiative.",
      },
      {
        day: "Monday",
        text: "New week, new opportunities! I'm ready to bring scalable data pipelines and automation to your team—let's talk.",
      },
      {
        day: "Tuesday",
        text: "Got a challenging data pipeline or cloud migration? I'm energized and ready to help you solve it today.",
      },
      {
        day: "Wednesday",
        text: "Mid-week momentum! Now is the perfect time to reach out and kick off high-impact data engineering work.",
      },
      {
        day: "Thursday",
        text: "The week isn't over yet! Let's connect and brainstorm how we can optimize your cloud data stack.",
      },
      {
        day: "Friday",
        text: "Finish the week strong! Drop me a message and let's plan a high-impact engineering collaboration.",
      },
      {
        day: "Saturday",
        text: "Great ideas don't take days off. If inspiration strikes for an analytics or data project, my inbox is open!",
      },
    ];

    const currentDay = new Date().getDay();
    setDayPrompt(dayPrompts[currentDay]);
  }, []);

  const handleCopyEmail = () => {
    try {
      navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (e) {
      console.error("Clipboard copy failed:", e);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <section id="contact" className="py-12 border-t border-border mt-16 scroll-mt-20">
      <Card className="p-8 paper-texture text-center border-border bg-card">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
          Let's Connect
        </h2>

        {/* Dynamic Day-of-the-Week Message */}
        <div className="mb-6 max-w-lg mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-accent mb-2 font-semibold">
            <Calendar className="h-3.5 w-3.5" />
            <span>{dayPrompt.day || "Today's Note"}</span>
          </div>
          <p className="text-muted-foreground italic text-sm sm:text-base leading-relaxed">
            "{dayPrompt.text}"
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
          <Button
            variant="default"
            size="lg"
            className="gap-2 w-56 font-medium"
            onClick={handleCopyEmail}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-accent" />
                <span>Email Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copy Email</span>
              </>
            )}
          </Button>

          <a
            href={contact.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button variant="outline" size="lg" className="gap-2 w-56 font-medium">
              <FileText className="h-4 w-4 text-accent" />
              <span>Download Resume</span>
            </Button>
          </a>
        </div>

        {/* Social and Communication Icons */}
        <div className="flex flex-wrap gap-3 justify-center items-center pt-4 border-t border-border/50">
          <a
            href={`mailto:${contact.email}`}
            title="Send Email"
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
            title="GitHub Profile"
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
            title="LinkedIn Profile"
            aria-label="LinkedIn"
          >
            <Button variant="outline" size="icon" className="h-9 w-9">
              <LinkedinIcon className="h-4 w-4" />
            </Button>
          </a>
          <a
            href={contact.linkedinPosts}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Posts"
            aria-label="Posts"
          >
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Share2 className="h-4 w-4" />
            </Button>
          </a>
          <a
            href={`tel:${contact.mobile}`}
            title="Call Padmapiyush"
            aria-label="Phone"
          >
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Phone className="h-4 w-4" />
            </Button>
          </a>
        </div>

        <div className="mt-4 text-xs font-mono text-muted-foreground">
          thepadmapiyush@gmail.com • +91 9532683568
        </div>
      </Card>
    </section>
  );
}

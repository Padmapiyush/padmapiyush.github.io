import * as React from "react";
import { GraduationCap, Award, ExternalLink, Calendar, MapPin, Trophy } from "lucide-react";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { PORTFOLIO_DATA } from "../data/portfolioData";

export function EducationCertificationsSection() {
  const { education, certifications, awards } = PORTFOLIO_DATA;

  return (
    <section id="education" className="mb-16 scroll-mt-20">
      <div className="flex items-center gap-2 mb-2">
        <GraduationCap className="h-6 w-6 text-accent" />
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Education, Certifications & Honors
        </h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Formal computer science background, verified industry accreditations, and internal company excellence awards.
      </p>

      {/* Grid of Education & Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Academic Background & Awards */}
        <div className="space-y-6">
          {/* Education */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-accent font-semibold">
              <GraduationCap className="h-4 w-4" />
              <span>Academic Education</span>
            </div>

            {education.map((edu, idx) => (
              <Card
                key={idx}
                className="p-5 paper-texture hover:shadow-md transition-shadow border-border bg-card"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h4 className="text-base font-bold text-foreground">
                    {edu.degree}
                  </h4>
                  <span className="text-xs font-mono text-muted-foreground shrink-0 flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-accent" />
                    {edu.year}
                  </span>
                </div>

                <div className="text-sm text-muted-foreground mb-1">
                  {edu.link ? (
                    <a
                      href={edu.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-accent inline-flex items-center gap-1 font-medium underline underline-offset-2"
                    >
                      {edu.institution}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <span className="font-medium text-foreground">{edu.institution}</span>
                  )}
                </div>

                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3 text-accent" />
                  <span>{edu.location}</span>
                </div>
              </Card>
            ))}
          </div>

          {/* Honors & Awards */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-accent font-semibold">
              <Trophy className="h-4 w-4" />
              <span>Honors & Awards</span>
            </div>

            {awards.map((award, idx) => (
              <Card
                key={idx}
                className="p-4 paper-texture hover:shadow-md transition-shadow border-border bg-secondary/30"
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                    <Award className="h-4 w-4 text-accent" />
                    <span>{award.title}</span>
                  </h4>
                  <Badge variant="secondary" className="text-[10px] bg-accent/20 text-accent font-mono">
                    {award.organization}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {award.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column: Certifications */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-accent font-semibold">
            <Award className="h-4 w-4" />
            <span>Professional Certifications</span>
          </div>

          {certifications.map((cert, idx) => (
            <Card
              key={idx}
              className="p-4 paper-texture hover:shadow-md transition-shadow border-border bg-card"
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="text-sm font-bold text-foreground leading-snug">
                  {cert.name}
                </h4>
                <Badge variant="secondary" className="text-[10px] shrink-0 font-mono">
                  Verified
                </Badge>
              </div>
              <div className="text-xs font-medium text-accent mb-1 font-mono">
                {cert.issuer}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {cert.focus}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

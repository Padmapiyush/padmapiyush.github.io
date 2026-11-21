import * as React from "react";
import Link from "next/link";
import { Gamepad2, Sparkles, Terminal, ArrowRight } from "lucide-react";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { PORTFOLIO_DATA } from "../data/portfolioData";

export function ArcadeSection() {
  const games = PORTFOLIO_DATA.interactiveGames;

  return (
    <section id="arcade" className="mb-16 scroll-mt-20">
      <div className="flex items-center gap-2 mb-2">
        <Gamepad2 className="h-6 w-6 text-accent" />
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Interactive Arcade & Quests
        </h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Hands-on interactive games, simulated auctions, and data engineering scenario challenges built into this portfolio.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {games.map((game) => (
          <Card
            key={game.id}
            className="p-6 paper-texture hover:shadow-lg transition-all duration-200 border-border bg-card flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <Badge
                  variant="secondary"
                  className="bg-accent/20 text-accent font-mono text-[11px] font-bold border-accent/40"
                >
                  {game.badge}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                  <Sparkles className="h-3 w-3 text-accent" />
                  <span>Interactive</span>
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-foreground tracking-tight mb-2">
                {game.title}
              </h3>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
                {game.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {game.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-[11px] rounded-full border-border/80 font-mono"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              {game.href.startsWith("/") ? (
                <Link href={game.href} className="inline-block w-full">
                  <Button variant="default" className="w-full gap-2 font-medium">
                    <span>{game.actionText}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="outline"
                  className="w-full gap-2 font-medium"
                  onClick={() => {
                    alert(
                      "Data Engineering Quest: Scenario challenges and interactive SQL practice questions are available directly in the playground terminal!"
                    );
                  }}
                >
                  <Terminal className="h-4 w-4 text-accent" />
                  <span>{game.actionText}</span>
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

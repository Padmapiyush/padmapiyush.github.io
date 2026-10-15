import { EvaluationResult, Game } from "@/types/game";
import { evaluateMatchLocally } from "@/lib/game-engine/scoring-engine";

export async function evaluateGameTeams(game: Game): Promise<EvaluationResult> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

    const res = await fetch("/api/ai/evaluate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(game),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data: EvaluationResult = await res.json();
      if (data && data.winnerPlayerId && data.teamScores) {
        return data;
      }
    }
  } catch {
    // In static export mode, offline, or server error -> fallback directly to local evaluation
  }

  // Guaranteed deterministic local tactical evaluation
  return evaluateMatchLocally(game);
}

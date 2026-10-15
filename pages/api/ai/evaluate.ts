import type { NextApiRequest, NextApiResponse } from "next";
import { Game, EvaluationResult } from "@/types/game";
import { evaluateMatchLocally } from "@/lib/game-engine/scoring-engine";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const game = req.body as Game;
  if (!game || !game.players || !game.characters) {
    return res.status(400).json({ error: "Invalid game payload" });
  }

  // Fallback local baseline
  const localResult = evaluateMatchLocally(game);

  // Check for server-side API key
  const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;

  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    // Graceful fallback to local tactical evaluation without error
    return res.status(200).json(localResult);
  }

  try {
    // If Gemini API is available
    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "your_gemini_api_key_here") {
      const prompt = `You are the Grand Overseer and Ultimate Tactical Judge of the Multiverse Arena.
Analyze the following completed team draft in the universe category: "${game.category}" (Custom label: "${game.customCategoryName || "N/A"}").

TEAMS DRAFTED:
${game.players
  .map((p) => {
    const chars = p.ownedCharacterIds
      .map((id) => game.characters.find((c) => c.id === id))
      .filter(Boolean);
    return `Player: ${p.name}
Budget Spent: $${p.totalSpent} (Remaining: $${p.remainingBudget})
Roster (${chars.length} members):
${chars
  .map(
    (c) =>
      `  - ${c?.name} [Peak Form: ${c?.peakForm}] (Attributes: Power ${c?.attributes.overall || c?.attributes.strength || 80}/100, Role: ${c?.role}, Abilities: ${c?.abilities.join(", ")})`
  )
  .join("\n")}`;
  })
  .join("\n\n")}

CRITERIA:
- Peak canonical prime forms
- Tactical synergy between drafted members
- Matchup weaknesses and counters
- Fair score between 40 and 99 for each team

Return ONLY a valid JSON object matching this structure:
{
  "winnerPlayerId": "the winning player's id (e.g. p1)",
  "championTitle": "e.g. SUPREME CHAMPION: [PLAYER NAME]",
  "victoryRationale": "A 3-4 sentence vivid, lore-grounded explanation of why this team wins over the others.",
  "scores": {
    "<playerId>": {
      "totalScore": 88,
      "summary": "Short 1-2 sentence squad summary",
      "strengths": ["strength 1", "strength 2"],
      "weaknesses": ["weakness 1", "weakness 2"]
    }
  }
}`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType: "application/json",
              temperature: 0.3,
            },
          }),
          signal: AbortSignal.timeout(8000), // 8s timeout
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API returned status ${response.status}`);
      }

      const data = await response.json();
      const textOutput = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!textOutput) throw new Error("Empty AI response");

      const parsedAI = JSON.parse(textOutput);

      if (parsedAI.winnerPlayerId && parsedAI.scores) {
        // Merge AI qualitative reasoning with deterministic structure
        const mergedScores = { ...localResult.teamScores };

        for (const [pid, aiScore] of Object.entries<any>(parsedAI.scores)) {
          if (mergedScores[pid]) {
            mergedScores[pid] = {
              ...mergedScores[pid],
              totalScore: typeof aiScore.totalScore === "number" ? Math.min(99, Math.max(30, aiScore.totalScore)) : mergedScores[pid].totalScore,
              strengths: Array.isArray(aiScore.strengths) && aiScore.strengths.length > 0 ? aiScore.strengths : mergedScores[pid].strengths,
              weaknesses: Array.isArray(aiScore.weaknesses) && aiScore.weaknesses.length > 0 ? aiScore.weaknesses : mergedScores[pid].weaknesses,
              summary: typeof aiScore.summary === "string" ? aiScore.summary : mergedScores[pid].summary,
            };
          }
        }

        const winnerPlayer = game.players.find((p) => p.id === parsedAI.winnerPlayerId) || game.players[0];

        const aiResult: EvaluationResult = {
          ...localResult,
          winnerPlayerId: winnerPlayer.id,
          winnerPlayerName: winnerPlayer.name,
          championTitle: parsedAI.championTitle || `CHAMPION: ${winnerPlayer.name.toUpperCase()}`,
          victoryRationale: parsedAI.victoryRationale || localResult.victoryRationale,
          teamScores: mergedScores,
          isAIEvaluated: true,
          evaluationSource: "ai",
          generatedAt: Date.now(),
        };

        return res.status(200).json(aiResult);
      }
    }
  } catch {
    // If external AI times out, throws error, or rate limits: fall back to local evaluator
  }

  // Graceful fallback to verified deterministic calculation
  return res.status(200).json(localResult);
}

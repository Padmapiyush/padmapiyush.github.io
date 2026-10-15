import { Character, EvaluationResult, Game, Player, TeamScore, TeamScoreCategoryBreakdown } from "@/types/game";

// Determine if a category is sports-based
export function isSportsCategory(category: string): boolean {
  return ["cricket", "football", "basketball"].includes(category);
}

// Compute deterministic score for a team
export function evaluateTeamLocally(
  player: Player,
  characters: Character[],
  category: string,
  allPlayers: Player[],
  allOwnedMap: Map<string, Character>
): TeamScore {
  const isSport = isSportsCategory(category);

  if (characters.length === 0) {
    return {
      playerId: player.id,
      playerName: player.name,
      totalScore: 0,
      rank: allPlayers.length,
      characters: [],
      budgetEfficiency: 0,
      synergyScore: 0,
      strengths: ["No characters drafted"],
      weaknesses: ["Empty roster - unable to compete in arena"],
      bestCharacter: null,
      mostValuablePurchase: null,
      bestBudgetDecision: "Preserved full budget but fielded no contenders",
      likelyMatchupVulnerabilities: ["Default forfeit due to no active squad members"],
      attributeBreakdown: [],
      summary: "Did not secure any characters during the auction.",
    };
  }

  // Calculate Base Attribute Averages
  let avgStrength = 0;
  let avgSpeed = 0;
  let avgInt = 0;
  let avgDur = 0;
  let avgCombat = 0;
  let avgSpecial = 0;

  let avgBatting = 0;
  let avgBowling = 0;
  let avgPace = 0;
  let avgDefense = 0;
  let avgPlaymaking = 0;
  let avgClutch = 0;

  for (const c of characters) {
    const a = c.attributes;
    avgStrength += a.strength || a.overall || 75;
    avgSpeed += a.speed || a.pace || 75;
    avgInt += a.intelligence || a.playmaking || 75;
    avgDur += a.durability || a.defense || 75;
    avgCombat += a.combat || a.shooting || 75;
    avgSpecial += a.special || a.clutch || 75;

    avgBatting += a.batting || a.shooting || 75;
    avgBowling += a.bowling || a.defense || 75;
    avgPace += a.pace || a.speed || 75;
    avgDefense += a.defense || a.durability || 75;
    avgPlaymaking += a.playmaking || a.intelligence || 75;
    avgClutch += a.clutch || a.special || 75;
  }

  const n = characters.length;
  avgStrength /= n;
  avgSpeed /= n;
  avgInt /= n;
  avgDur /= n;
  avgCombat /= n;
  avgSpecial /= n;

  avgBatting /= n;
  avgBowling /= n;
  avgPace /= n;
  avgDefense /= n;
  avgPlaymaking /= n;
  avgClutch /= n;

  // Synergy: variety of roles, complementary powers, squad size multiplier
  const uniqueRoles = new Set(characters.map((c) => c.role || "Specialist")).size;
  const roleBonus = Math.min(15, uniqueRoles * 3.5);
  const sizeFactor = Math.min(1.0, 0.75 + (n - 1) * 0.15); // Smooth scaling: 1 char = 75%, 2 = 90%, 3+ = 100%
  const rawSynergy = Math.min(98, Math.round(70 + roleBonus + (n >= 2 ? 10 : 0)));

  // Budget efficiency: Total power generated per dollar spent
  const totalBaseValue = characters.reduce((sum, c) => sum + c.baseValue, 0);
  const totalSpent = Math.max(1, player.totalSpent);
  const efficiencyRatio = totalBaseValue / totalSpent;
  const budgetEfficiency = Math.min(99, Math.max(40, Math.round(50 + efficiencyRatio * 25)));

  // Find best character (MVP)
  let bestCharacter: Character = characters[0];
  let highestPower = -1;
  for (const c of characters) {
    const power = c.attributes.overall || (c.attributes.strength || 0) + (c.attributes.combat || 0);
    if (power > highestPower) {
      highestPower = power;
      bestCharacter = c;
    }
  }

  // Find best value purchase (base value vs cost)
  const mostValuablePurchase = {
    character: bestCharacter,
    price: Math.round(player.totalSpent / characters.length),
  };

  // Build Attribute Breakdown
  let attributeBreakdown: TeamScoreCategoryBreakdown[] = [];
  let baseScore = 0;

  if (isSport) {
    attributeBreakdown = [
      { label: "Offense & Batting", score: Math.round(avgBatting), weight: 0.25, description: "Scoring power and boundary clearing execution" },
      { label: "Defense & Bowling", score: Math.round(avgBowling), weight: 0.25, description: "Containment, wicket taking, and defensive solidity" },
      { label: "Pace & Athleticism", score: Math.round(avgPace), weight: 0.15, description: "Fielding speed, transition velocity, and physical endurance" },
      { label: "Playmaking & Tactics", score: Math.round(avgPlaymaking), weight: 0.15, description: "Vision, game-reading IQ, and floor management" },
      { label: "Clutch & Team Synergy", score: Math.round((avgClutch + rawSynergy) / 2), weight: 0.2, description: "High-pressure execution and squad cohesion" },
    ];

    baseScore =
      avgBatting * 0.25 +
      avgBowling * 0.25 +
      avgPace * 0.15 +
      avgPlaymaking * 0.15 +
      ((avgClutch + rawSynergy) / 2) * 0.2;
  } else {
    attributeBreakdown = [
      { label: "Physical & Destructive Might", score: Math.round(avgStrength), weight: 0.25, description: "Raw physical force, kinetic damage, and frontline power" },
      { label: "Reaction & Velocity", score: Math.round(avgSpeed), weight: 0.2, description: "Combat reflex timing, dodging, and speed blitz capability" },
      { label: "Tactical & Strategic Intellect", score: Math.round(avgInt), weight: 0.15, description: "Battlefield calculation, pre-planning, and exploit discovery" },
      { label: "Survivability & Durability", score: Math.round(avgDur), weight: 0.2, description: "Damage mitigation, barrier resilience, and regenerative endurance" },
      { label: "Special Abilities & Versatility", score: Math.round(avgSpecial), weight: 0.2, description: "Reality warping, magic, hax abilities, and synergy" },
    ];

    baseScore =
      avgStrength * 0.25 +
      avgSpeed * 0.2 +
      avgInt * 0.15 +
      avgDur * 0.2 +
      avgSpecial * 0.2;
  }

  // Adjust score for team size scale
  const finalScore = Math.min(99, Math.max(30, Math.round(baseScore * sizeFactor)));

  // Generate dynamic Strengths & Weaknesses
  const strengths: string[] = [];
  const weaknesses: string[] = [];

  if (isSport) {
    if (avgBatting >= 88) strengths.push("Lethal top-tier scoring threat that can post massive totals or execute rapid run chases.");
    if (avgBowling >= 88) strengths.push("Championship-caliber defensive lockdown capable of squeezing opponents dry.");
    if (avgClutch >= 90) strengths.push("Unmatched nerve in death overs and high-stakes crunch time.");
    if (rawSynergy >= 85) strengths.push("Exceptional role distribution covering attacking, defensive, and transition duties.");

    if (avgDefense < 80) weaknesses.push("Susceptible to high-octane offensive bursts due to gaps in backline containment.");
    if (avgBatting < 80) weaknesses.push("May face batting slumps against express pace and precision spin.");
    if (n < 2) weaknesses.push("Critically undersized roster relying too heavily on solo brilliance.");
  } else {
    if (avgStrength >= 90) strengths.push("Overwhelming destructive capacity capable of leveling mountains and shattering armor.");
    if (avgSpeed >= 90) strengths.push("Blistering reflex velocity that disrupts opposing wind-up spells and strikes.");
    if (avgSpecial >= 92) strengths.push("High-tier cosmic/arcane versatility capable of bypassing conventional physical defenses.");
    if (rawSynergy >= 85) strengths.push("Complementary power-sets pairing frontline tanks with cunning tactical controllers.");

    if (avgDur < 80) weaknesses.push("Vulnerable to sustained bombardment or glass-cannon counter-attacks.");
    if (avgInt < 80) weaknesses.push("Prone to tactical traps and psychological manipulation against veteran strategists.");
    if (n < 2) weaknesses.push("Lacks squad depth to counter versatile multi-flank assaults.");
  }

  if (strengths.length === 0) strengths.push("Balanced baseline squad with steady foundational attributes across the board.");
  if (weaknesses.length === 0) weaknesses.push("Minimal glaring structural flaws; vulnerabilities depend on specific elemental counters.");

  const vulnerabilities = [
    `Susceptible to ${isSport ? "rapid counter-attacks and pressure bowling" : "speed blitzing and tactical entrapment"}`,
    `Heavily dependent on peak performance from ${bestCharacter.name}`,
  ];

  const bestBudgetDecision =
    player.remainingBudget > 0
      ? `Maintained $${player.remainingBudget} tactical reserves while locking in marquee anchor ${bestCharacter.name}`
      : `Maximized entire budget pool to secure ${bestCharacter.name} and key contributors`;

  const summary = `${player.name}'s squad fields ${n} legend${n > 1 ? "s" : ""}, anchored by ${bestCharacter.name} (${bestCharacter.peakForm}). The roster exhibits a ${rawSynergy}% synergy cohesion rating with an overall tactical rating of ${finalScore}/100.`;

  return {
    playerId: player.id,
    playerName: player.name,
    totalScore: finalScore,
    rank: 1, // Will be sorted
    characters,
    budgetEfficiency,
    synergyScore: rawSynergy,
    strengths,
    weaknesses,
    bestCharacter,
    mostValuablePurchase,
    bestBudgetDecision,
    likelyMatchupVulnerabilities: vulnerabilities,
    attributeBreakdown,
    summary,
  };
}

// Master Local Tactical Evaluator
export function evaluateMatchLocally(game: Game): EvaluationResult {
  const charactersById = new Map<string, Character>();
  for (const c of game.characters) {
    charactersById.set(c.id, c);
  }

  const teamScores: Record<string, TeamScore> = {};
  const scoredList: TeamScore[] = [];

  for (const player of game.players) {
    const owned = player.ownedCharacterIds
      .map((id) => charactersById.get(id))
      .filter((c): c is Character => Boolean(c));

    const score = evaluateTeamLocally(player, owned, game.category, game.players, charactersById);
    teamScores[player.id] = score;
    scoredList.push(score);
  }

  // Sort descending by totalScore
  scoredList.sort((a, b) => b.totalScore - a.totalScore);

  // Assign ranks
  scoredList.forEach((score, idx) => {
    score.rank = idx + 1;
  });

  const winner = scoredList[0] || {
    playerId: game.players[0]?.id || "p1",
    playerName: game.players[0]?.name || "Player 1",
    totalScore: 50,
  };

  const runnerUp = scoredList[1];
  const margin = runnerUp ? winner.totalScore - runnerUp.totalScore : winner.totalScore;

  const isSport = isSportsCategory(game.category);
  const rubricType = isSport ? "sports" : game.category === "custom" ? "custom" : "fictional";

  const rubric = {
    categoryType: rubricType as "fictional" | "sports" | "custom",
    rubricName: isSport
      ? "Professional Athletic & Squad Balance Matrix"
      : game.category === "custom"
      ? `${game.customCategoryName || "Custom Universe"} Multiverse Evaluation Rubric`
      : "Peak Canonical Multiverse Combat Rubric",
    description: isSport
      ? "Evaluates athletic squads across offensive output, defensive containment, transition speed, role complementarity, and clutch execution under championship pressure."
      : "Assesses squads in their prime canonical forms across destructive scaling, reflex reaction, durability, tactical intelligence, hax/magic abilities, and teammate synergies.",
    criteria: isSport
      ? [
          "Scoring Power & Offensive Efficiency (25%)",
          "Defensive Wall & Bowling/Lockdown Solidity (25%)",
          "Pace, Fielding & Physical Durability (15%)",
          "Tactical Playmaking & Game IQ (15%)",
          "Squad Synergy & Championship Clutch Factor (20%)",
        ]
      : [
          "Destructive Physical Output (25%)",
          "Speed, Reflexes & Kinetic Velocity (20%)",
          "Survivability & Regenerative Durability (20%)",
          "Tactical Mind & Exploitation Strategy (15%)",
          "Special Abilities, Hax & Squad Synergy (20%)",
        ],
  };

  const winnerScoreObj = teamScores[winner.playerId];
  const winnerMVP = winnerScoreObj?.bestCharacter?.name || "its legends";

  const victoryRationale = `${winner.playerName}'s team achieved victory with a decisive ${winner.totalScore}/100 tactical rating (a +${margin} margin over second place). Driven by peak-form anchor ${winnerMVP}, the squad combines elite frontline power with complementary support, fewer exploitable defensive blind spots, and superior squad synergy across simulated matchups.`;

  return {
    winnerPlayerId: winner.playerId,
    winnerPlayerName: winner.playerName,
    championTitle: `CHAMPION OF THE MULTIVERSE: ${winner.playerName.toUpperCase()}`,
    scoreMargin: margin,
    victoryRationale,
    evaluationRubric: rubric,
    teamScores,
    isAIEvaluated: false,
    evaluationSource: "tactical-local",
    generatedAt: Date.now(),
  };
}

export type GameCategory =
  | "marvel"
  | "dc"
  | "anime"
  | "cricket"
  | "football"
  | "basketball"
  | "movies"
  | "gaming"
  | "custom";

export type AuctionMode = "turn-based" | "open";

export interface CharacterAttributes {
  // Fictional attributes (0-100)
  strength?: number;
  speed?: number;
  intelligence?: number;
  durability?: number;
  combat?: number;
  special?: number;

  // Sports attributes (0-100)
  batting?: number;
  bowling?: number;
  fielding?: number;
  pace?: number;
  playmaking?: number;
  shooting?: number;
  defense?: number;
  clutch?: number;

  // Common score aggregate
  overall?: number;
}

export interface Character {
  id: string;
  name: string;
  category: GameCategory;
  universeName: string;
  imageUrl: string;
  fallbackColor?: string;
  description: string;
  baseValue: number;
  attributes: CharacterAttributes;
  peakForm: string;
  abilities: string[];
  weaknesses: string[];
  source: string;
  role?: string;
}

export interface Player {
  id: string;
  name: string;
  color: string;
  avatar: string;
  startingBudget: number;
  remainingBudget: number;
  totalSpent: number;
  ownedCharacterIds: string[];
}

export interface BidRecord {
  id: string;
  playerId: string;
  playerName: string;
  amount: number;
  timestamp: number;
}

export type AuctionStatus = "pending" | "active" | "paused" | "resolved" | "unsold";

export interface Auction {
  id: string;
  characterId: string;
  startingBid: number;
  currentHighestBid: number;
  highestBidderId: string | null;
  activePlayerId: string | null;
  eligiblePlayerIds: string[];
  passedPlayerIds: string[];
  status: AuctionStatus;
  winningPlayerId: string | null;
  winningPrice: number | null;
  bidHistory: BidRecord[];
}

export interface GameSettings {
  minimumBid: number;
  bidIncrement: number;
  auctionMode: AuctionMode;
  characterSelection: "catalog" | "ai";
  allowUnsold: boolean;
  currencySymbol: string;
  soundEnabled: boolean;
}

export interface TeamScoreCategoryBreakdown {
  label: string;
  score: number; // 0 - 100
  weight: number;
  description: string;
}

export interface TeamScore {
  playerId: string;
  playerName: string;
  totalScore: number; // 0 - 100
  rank: number;
  characters: Character[];
  budgetEfficiency: number; // 0 - 100
  synergyScore: number; // 0 - 100
  strengths: string[];
  weaknesses: string[];
  bestCharacter: Character | null;
  mostValuablePurchase: { character: Character; price: number } | null;
  bestBudgetDecision: string;
  likelyMatchupVulnerabilities: string[];
  attributeBreakdown: TeamScoreCategoryBreakdown[];
  summary: string;
}

export interface EvaluationResult {
  winnerPlayerId: string;
  winnerPlayerName: string;
  championTitle: string;
  scoreMargin: number;
  victoryRationale: string;
  evaluationRubric: {
    categoryType: "fictional" | "sports" | "custom";
    rubricName: string;
    description: string;
    criteria: string[];
  };
  teamScores: Record<string, TeamScore>;
  isAIEvaluated: boolean;
  evaluationSource: "ai" | "tactical-local";
  generatedAt: number;
}

export interface Game {
  id: string;
  category: GameCategory;
  customCategoryName?: string;
  players: Player[];
  characters: Character[];
  currentCharacterIndex: number;
  currentAuction: Auction | null;
  auctionHistory: Auction[];
  startingBudget: number;
  settings: GameSettings;
  status: "setup" | "auction" | "results";
  result: EvaluationResult | null;
  createdAt: number;
  updatedAt: number;
}

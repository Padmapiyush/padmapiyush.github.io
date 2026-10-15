import { describe, it, expect } from "vitest";
import {
  createAuction,
  getMinNextBid,
  validateBid,
  placeBidOnGame,
  passTurnOnGame,
  resolveCurrentAuction,
  advanceToNextCharacter,
} from "../../lib/game-engine/auction-engine";
import { evaluateMatchLocally } from "../../lib/game-engine/scoring-engine";
import { Game, Player, Character } from "../../types/game";

const mockPlayers: Player[] = [
  {
    id: "p1",
    name: "Alex",
    color: "#8B5CF6",
    avatar: "⚡",
    startingBudget: 100,
    remainingBudget: 100,
    totalSpent: 0,
    ownedCharacterIds: [],
  },
  {
    id: "p2",
    name: "Sam",
    color: "#22D3EE",
    avatar: "🛡️",
    startingBudget: 100,
    remainingBudget: 100,
    totalSpent: 0,
    ownedCharacterIds: [],
  },
];

const mockCharacters: Character[] = [
  {
    id: "c1",
    name: "Thor Odinson",
    category: "marvel",
    universeName: "Marvel",
    imageUrl: "https://example.com/thor.jpg",
    description: "God of Thunder",
    baseValue: 45,
    attributes: { strength: 95, speed: 85, intelligence: 80, durability: 95, combat: 90, special: 95, overall: 90 },
    peakForm: "Rune King Thor",
    abilities: ["Lightning", "Mjolnir"],
    weaknesses: ["Overconfidence"],
    source: "Marvel",
    role: "Vanguard",
  },
  {
    id: "c2",
    name: "Iron Man",
    category: "marvel",
    universeName: "Marvel",
    imageUrl: "https://example.com/ironman.jpg",
    description: "Genius inventor",
    baseValue: 40,
    attributes: { strength: 85, speed: 85, intelligence: 98, durability: 85, combat: 85, special: 90, overall: 88 },
    peakForm: "Nano Godkiller",
    abilities: ["Nanotech", "Laser"],
    weaknesses: ["Human without armor"],
    source: "Marvel",
    role: "Tactician",
  },
];

function createMockGame(mode: "turn-based" | "open" = "turn-based"): Game {
  const auction = createAuction(mockCharacters[0].id, mockPlayers, 5);
  return {
    id: "test-game-1",
    category: "marvel",
    players: JSON.parse(JSON.stringify(mockPlayers)),
    characters: mockCharacters,
    currentCharacterIndex: 0,
    currentAuction: auction,
    auctionHistory: [],
    startingBudget: 100,
    settings: {
      minimumBid: 5,
      bidIncrement: 2,
      auctionMode: mode,
      characterSelection: "catalog",
      allowUnsold: true,
      currencySymbol: "$",
      soundEnabled: true,
    },
    status: "auction",
    result: null,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

describe("TeamForge Auction Engine", () => {
  it("initializes an auction with minimum bid and correct eligible players", () => {
    const auction = createAuction("c1", mockPlayers, 5);
    expect(auction.startingBid).toBe(5);
    expect(auction.currentHighestBid).toBe(0);
    expect(auction.highestBidderId).toBeNull();
    expect(auction.eligiblePlayerIds).toEqual(["p1", "p2"]);
    expect(auction.status).toBe("active");
  });

  it("calculates minimum next bid correctly", () => {
    const auction = createAuction("c1", mockPlayers, 5);
    expect(getMinNextBid(auction, 5, 2)).toBe(5);

    // After first bid of 10
    const auctionWithBid = { ...auction, highestBidderId: "p1", currentHighestBid: 10 };
    expect(getMinNextBid(auctionWithBid, 5, 2)).toBe(12);
  });

  it("validates bids and prevents bidding beyond budget or invalid increment", () => {
    const game = createMockGame("turn-based");
    // p1 bids below min
    const resLow = validateBid(game, "p1", 3);
    expect(resLow.valid).toBe(false);

    // p1 bids valid min
    const resValid = validateBid(game, "p1", 5);
    expect(resValid.valid).toBe(true);

    // p1 bids above remaining budget
    const resOverBudget = validateBid(game, "p1", 150);
    expect(resOverBudget.valid).toBe(false);
  });

  it("handles turn-based bidding rotation correctly", () => {
    let game = createMockGame("turn-based");
    expect(game.currentAuction?.activePlayerId).toBe("p1");

    // p1 bids 10
    const bidRes1 = placeBidOnGame(game, "p1", 10);
    expect(bidRes1.success).toBe(true);
    game = bidRes1.game;

    expect(game.currentAuction?.currentHighestBid).toBe(10);
    expect(game.currentAuction?.highestBidderId).toBe("p1");
    expect(game.currentAuction?.activePlayerId).toBe("p2");

    // p2 passes
    const passRes = passTurnOnGame(game, "p2");
    expect(passRes.success).toBe(true);
    game = passRes.game;

    // With p2 passing, p1 is the sole remaining active bidder -> resolved and applied immediately!
    expect(game.currentAuction?.status).toBe("resolved");
    expect(game.currentAuction?.winningPlayerId).toBe("p1");
    expect(game.currentAuction?.winningPrice).toBe(10);
    const p1 = game.players.find((p) => p.id === "p1")!;
    expect(p1.ownedCharacterIds).toContain("c1");
    expect(p1.totalSpent).toBe(10);
    expect(p1.remainingBudget).toBe(90);
    expect(game.auctionHistory.length).toBe(1);
  });

  it("deducts budget and assigns character atomically on auction resolution", () => {
    let game = createMockGame("turn-based");
    game = placeBidOnGame(game, "p1", 20).game;
    game = passTurnOnGame(game, "p2").game;

    const resolveRes = resolveCurrentAuction(game);
    expect(resolveRes.success).toBe(true);
    game = resolveRes.game;

    const winner = game.players.find((p) => p.id === "p1")!;
    expect(winner.remainingBudget).toBe(80);
    expect(winner.totalSpent).toBe(20);
    expect(winner.ownedCharacterIds).toContain("c1");
    expect(game.auctionHistory.length).toBe(1);
  });

  it("marks character unsold when all players pass without bids", () => {
    let game = createMockGame("turn-based");
    // p1 passes
    game = passTurnOnGame(game, "p1").game;
    expect(game.currentAuction?.status).toBe("active");
    expect(game.currentAuction?.activePlayerId).toBe("p2");

    // p2 passes
    game = passTurnOnGame(game, "p2").game;
    expect(game.currentAuction?.status).toBe("unsold");

    const resolveRes = resolveCurrentAuction(game);
    game = resolveRes.game;

    const p1 = game.players.find((p) => p.id === "p1")!;
    const p2 = game.players.find((p) => p.id === "p2")!;
    expect(p1.remainingBudget).toBe(100);
    expect(p2.remainingBudget).toBe(100);
    expect(p1.ownedCharacterIds.length).toBe(0);
    expect(game.auctionHistory[0].status).toBe("unsold");
  });

  it("advances character index and transitions to results upon completing roster", () => {
    let game = createMockGame("turn-based");
    // Character 0 is c1, total characters = 2
    game = advanceToNextCharacter(game);
    expect(game.currentCharacterIndex).toBe(1);
    expect(game.currentAuction?.characterId).toBe("c2");

    // Advance past final character -> results
    game = advanceToNextCharacter(game);
    expect(game.currentCharacterIndex).toBe(2);
    expect(game.status).toBe("results");
  });
});

describe("TeamForge Scoring Engine", () => {
  it("evaluates completed match deterministically and crowns a champion", () => {
    let game = createMockGame("turn-based");
    // Give p1 Thor
    game.players[0].ownedCharacterIds = ["c1"];
    game.players[0].totalSpent = 30;
    // Give p2 Iron Man
    game.players[1].ownedCharacterIds = ["c2"];
    game.players[1].totalSpent = 25;

    const evalResult = evaluateMatchLocally(game);
    expect(evalResult).toBeDefined();
    expect(evalResult.winnerPlayerId).toBeDefined();
    expect(evalResult.teamScores[evalResult.winnerPlayerId].totalScore).toBeGreaterThan(50);
    expect(evalResult.evaluationRubric.criteria.length).toBeGreaterThan(3);
    expect(evalResult.evaluationSource).toBe("tactical-local");
    expect(evalResult.victoryRationale).toContain(evalResult.winnerPlayerName);
  });
});

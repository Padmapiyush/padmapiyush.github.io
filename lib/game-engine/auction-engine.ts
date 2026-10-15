import { Auction, Game, Player, BidRecord, AuctionStatus } from "@/types/game";

export interface BidValidationResult {
  valid: boolean;
  error?: string;
  minNextBid: number;
}

// Calculate the minimum allowable next bid for an auction
export function getMinNextBid(
  auction: Auction,
  minimumBidConfig: number,
  incrementConfig: number
): number {
  if (auction.highestBidderId === null) {
    return Math.max(1, minimumBidConfig);
  }
  return auction.currentHighestBid + Math.max(1, incrementConfig);
}

// Validate whether a player can place a specific bid amount
export function validateBid(
  game: Game,
  playerId: string,
  amount: number
): BidValidationResult {
  const auction = game.currentAuction;
  if (!auction) {
    return { valid: false, error: "No active auction in progress", minNextBid: 0 };
  }

  if (auction.status !== "active") {
    return { valid: false, error: "Auction is not currently open for bids", minNextBid: 0 };
  }

  const player = game.players.find((p) => p.id === playerId);
  if (!player) {
    return { valid: false, error: "Player not found", minNextBid: 0 };
  }

  const minNextBid = getMinNextBid(auction, game.settings.minimumBid, game.settings.bidIncrement);

  if (auction.passedPlayerIds.includes(playerId)) {
    return { valid: false, error: `${player.name} has already passed on this character`, minNextBid };
  }

  if (game.settings.auctionMode === "turn-based" && auction.activePlayerId !== playerId) {
    return { valid: false, error: "It is not your turn to bid", minNextBid };
  }

  if (auction.highestBidderId === playerId) {
    return { valid: false, error: `${player.name} is already the highest bidder`, minNextBid };
  }

  if (amount < minNextBid) {
    return {
      valid: false,
      error: `Bid must be at least ${game.settings.currencySymbol}${minNextBid}`,
      minNextBid,
    };
  }

  if (amount > player.remainingBudget) {
    return {
      valid: false,
      error: `Insufficient budget. Remaining: ${game.settings.currencySymbol}${player.remainingBudget}`,
      minNextBid,
    };
  }

  return { valid: true, minNextBid };
}

// Create a new fresh auction for a character
export function createAuction(
  characterId: string,
  players: Player[],
  minimumBid: number
): Auction {
  const eligiblePlayerIds = players
    .filter((p) => p.remainingBudget >= minimumBid)
    .map((p) => p.id);

  return {
    id: `auction-${characterId}-${Date.now()}`,
    characterId,
    startingBid: minimumBid,
    currentHighestBid: 0,
    highestBidderId: null,
    activePlayerId: eligiblePlayerIds.length > 0 ? eligiblePlayerIds[0] : null,
    eligiblePlayerIds,
    passedPlayerIds: [],
    status: "active",
    winningPlayerId: null,
    winningPrice: null,
    bidHistory: [],
  };
}

// Determine the next active player for turn-based mode
export function getNextTurnPlayerId(
  eligiblePlayerIds: string[],
  passedPlayerIds: string[],
  currentPlayerId: string | null
): string | null {
  const activeCandidates = eligiblePlayerIds.filter((id) => !passedPlayerIds.includes(id));
  if (activeCandidates.length === 0) return null;
  if (!currentPlayerId) return activeCandidates[0];

  const currentIndex = activeCandidates.indexOf(currentPlayerId);
  if (currentIndex === -1) {
    return activeCandidates[0];
  }
  const nextIndex = (currentIndex + 1) % activeCandidates.length;
  return activeCandidates[nextIndex];
}

// Check if an auction is in a legally resolvable state
export function isAuctionResolvable(
  auction: Auction,
  mode: "turn-based" | "open"
): { resolvable: boolean; reason?: string } {
  if (auction.status === "resolved" || auction.status === "unsold") {
    return { resolvable: true };
  }

  if (mode === "turn-based") {
    const remainingActiveBidders = auction.eligiblePlayerIds.filter(
      (id) => !auction.passedPlayerIds.includes(id)
    );

    // If there is a highest bidder and everyone else passed
    if (auction.highestBidderId && remainingActiveBidders.length <= 1) {
      return { resolvable: true };
    }

    // If everyone passed without any bids
    if (!auction.highestBidderId && remainingActiveBidders.length === 0) {
      return { resolvable: true };
    }

    return {
      resolvable: false,
      reason: `Waiting for remaining eligible players to bid or pass (${remainingActiveBidders.length} active).`,
    };
  }

  // Open mode: Host can close whenever there is a bid or if no bids placed
  return { resolvable: true };
}

// Core helper: Apply auction resolution to game state atomically (update roster, deduct budget, record history)
export function applyAuctionResolution(
  game: Game,
  resolvedAuction: Auction
): Game {
  // Check if this auction is already recorded in history
  const historyIndex = game.auctionHistory.findIndex((h) => h.id === resolvedAuction.id);
  const updatedHistory =
    historyIndex >= 0
      ? game.auctionHistory.map((h, i) => (i === historyIndex ? resolvedAuction : h))
      : [...game.auctionHistory, resolvedAuction];

  let updatedPlayers = game.players;

  if (
    resolvedAuction.status === "resolved" &&
    resolvedAuction.winningPlayerId &&
    resolvedAuction.winningPrice !== null
  ) {
    const winnerId = resolvedAuction.winningPlayerId;
    const price = resolvedAuction.winningPrice;
    const charId = resolvedAuction.characterId;

    updatedPlayers = game.players.map((p) => {
      if (p.id === winnerId) {
        const alreadyHasChar = p.ownedCharacterIds.includes(charId);
        const newOwned = alreadyHasChar ? p.ownedCharacterIds : [...p.ownedCharacterIds, charId];

        // Deduct price only if this auction wasn't already applied
        const alreadyApplied =
          historyIndex >= 0 &&
          game.auctionHistory[historyIndex].status === "resolved" &&
          game.auctionHistory[historyIndex].winningPlayerId === winnerId;

        const newRemaining = alreadyApplied ? p.remainingBudget : Math.max(0, p.remainingBudget - price);
        const newSpent = alreadyApplied ? p.totalSpent : p.totalSpent + price;

        return {
          ...p,
          remainingBudget: newRemaining,
          totalSpent: newSpent,
          ownedCharacterIds: newOwned,
        };
      }
      return p;
    });
  }

  return {
    ...game,
    players: updatedPlayers,
    currentAuction: resolvedAuction,
    auctionHistory: updatedHistory,
    updatedAt: Date.now(),
  };
}

// Pure function: Place a bid on the current auction
export function placeBidOnGame(
  game: Game,
  playerId: string,
  bidAmount: number
): { game: Game; success: boolean; error?: string } {
  const validation = validateBid(game, playerId, bidAmount);
  if (!validation.valid || !game.currentAuction) {
    return { game, success: false, error: validation.error };
  }

  const player = game.players.find((p) => p.id === playerId)!;
  const auction = game.currentAuction;

  const newBidRecord: BidRecord = {
    id: `bid-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    playerId,
    playerName: player.name,
    amount: bidAmount,
    timestamp: Date.now(),
  };

  const nextActive =
    game.settings.auctionMode === "turn-based"
      ? getNextTurnPlayerId(auction.eligiblePlayerIds, auction.passedPlayerIds, playerId)
      : auction.activePlayerId;

  const updatedAuction: Auction = {
    ...auction,
    currentHighestBid: bidAmount,
    highestBidderId: playerId,
    activePlayerId: nextActive,
    bidHistory: [newBidRecord, ...auction.bidHistory],
  };

  // Check if this bid immediately leaves 0 other eligible active bidders
  const remainingActiveBidders = updatedAuction.eligiblePlayerIds.filter(
    (id) => !updatedAuction.passedPlayerIds.includes(id) && id !== playerId
  );

  if (game.settings.auctionMode === "turn-based" && remainingActiveBidders.length === 0) {
    // Single bidder left! Auto-resolve and apply immediately
    const autoResolvedAuction: Auction = {
      ...updatedAuction,
      status: "resolved",
      winningPlayerId: playerId,
      winningPrice: bidAmount,
      activePlayerId: null,
    };
    return {
      game: applyAuctionResolution(game, autoResolvedAuction),
      success: true,
    };
  }

  return {
    game: {
      ...game,
      currentAuction: updatedAuction,
      updatedAt: Date.now(),
    },
    success: true,
  };
}

// Pure function: Pass turn on current character
export function passTurnOnGame(
  game: Game,
  playerId: string
): { game: Game; success: boolean; error?: string } {
  const auction = game.currentAuction;
  if (!auction || auction.status !== "active") {
    return { game, success: false, error: "Auction is not active" };
  }

  if (auction.passedPlayerIds.includes(playerId)) {
    return { game, success: false, error: "Player has already passed" };
  }

  if (auction.highestBidderId === playerId) {
    return { game, success: false, error: "The highest bidder cannot pass" };
  }

  const updatedPassed = [...auction.passedPlayerIds, playerId];
  const remainingActive = auction.eligiblePlayerIds.filter((id) => !updatedPassed.includes(id));

  // Turn-based mode resolution checks
  if (game.settings.auctionMode === "turn-based") {
    // Case A: Highest bidder exists and everyone else has passed -> Winner!
    if (
      auction.highestBidderId &&
      remainingActive.length === 1 &&
      remainingActive[0] === auction.highestBidderId
    ) {
      const resolvedAuction: Auction = {
        ...auction,
        passedPlayerIds: updatedPassed,
        status: "resolved",
        winningPlayerId: auction.highestBidderId,
        winningPrice: auction.currentHighestBid,
        activePlayerId: null,
      };
      return {
        game: applyAuctionResolution(game, resolvedAuction),
        success: true,
      };
    }

    // Case B: Nobody placed a bid and everyone has passed -> Unsold!
    if (!auction.highestBidderId && remainingActive.length === 0) {
      const unsoldAuction: Auction = {
        ...auction,
        passedPlayerIds: updatedPassed,
        status: "unsold",
        winningPlayerId: null,
        winningPrice: null,
        activePlayerId: null,
      };
      return {
        game: applyAuctionResolution(game, unsoldAuction),
        success: true,
      };
    }
  }

  // Otherwise, just advance turn to next active eligible bidder
  const nextActive = getNextTurnPlayerId(auction.eligiblePlayerIds, updatedPassed, auction.activePlayerId);

  const updatedAuction: Auction = {
    ...auction,
    passedPlayerIds: updatedPassed,
    activePlayerId: nextActive,
  };

  return {
    game: {
      ...game,
      currentAuction: updatedAuction,
      updatedAt: Date.now(),
    },
    success: true,
  };
}

// Pure function: Manually resolve the current auction
export function resolveCurrentAuction(game: Game): { game: Game; success: boolean; error?: string } {
  const auction = game.currentAuction;
  if (!auction) {
    return { game, success: false, error: "No active auction" };
  }

  // If already resolved/unsold, ensure it is applied to players and history
  if (auction.status === "resolved" || auction.status === "unsold") {
    return {
      game: applyAuctionResolution(game, auction),
      success: true,
    };
  }

  // Open mode or manual trigger with a winning bid
  if (auction.highestBidderId && auction.currentHighestBid > 0) {
    const resolvedAuction: Auction = {
      ...auction,
      status: "resolved",
      winningPlayerId: auction.highestBidderId,
      winningPrice: auction.currentHighestBid,
      activePlayerId: null,
    };
    return {
      game: applyAuctionResolution(game, resolvedAuction),
      success: true,
    };
  }

  // No bids placed -> unsold
  const unsoldAuction: Auction = {
    ...auction,
    status: "unsold",
    winningPlayerId: null,
    winningPrice: null,
    activePlayerId: null,
  };

  return {
    game: applyAuctionResolution(game, unsoldAuction),
    success: true,
  };
}

// Advance to the next character in the roster
export function advanceToNextCharacter(game: Game): Game {
  // Ensure the current auction is resolved and recorded before advancing
  let cleanGame = game;
  if (cleanGame.currentAuction) {
    if (cleanGame.currentAuction.status === "active") {
      const resolved = resolveCurrentAuction(cleanGame);
      cleanGame = resolved.game;
    } else {
      cleanGame = applyAuctionResolution(cleanGame, cleanGame.currentAuction);
    }
  }

  const nextIndex = cleanGame.currentCharacterIndex + 1;

  if (nextIndex >= cleanGame.characters.length) {
    // All characters finished! Match complete
    return {
      ...cleanGame,
      currentCharacterIndex: nextIndex,
      currentAuction: null,
      status: "results",
      updatedAt: Date.now(),
    };
  }

  const nextCharacter = cleanGame.characters[nextIndex];
  const newAuction = createAuction(nextCharacter.id, cleanGame.players, cleanGame.settings.minimumBid);

  return {
    ...cleanGame,
    currentCharacterIndex: nextIndex,
    currentAuction: newAuction,
    updatedAt: Date.now(),
  };
}

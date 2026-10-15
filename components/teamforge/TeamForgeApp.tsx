import React, { useState, useEffect } from "react";
import { Game, GameCategory, GameSettings, Player, Character, EvaluationResult } from "@/types/game";
import { createAuction } from "@/lib/game-engine/auction-engine";
import { evaluateGameTeams } from "@/lib/ai/ai-service";
import { saveGameState, loadGameState, clearGameState } from "@/lib/persistence/storage";
import GameSetup from "./GameSetup";
import AuctionArena from "./AuctionArena";
import TeamResults from "./TeamResults";
import { Sparkles, Trophy, RotateCcw } from "lucide-react";

interface TeamForgeAppProps {
  onExit: () => void;
}

export default function TeamForgeApp({ onExit }: TeamForgeAppProps) {
  const [game, setGame] = useState<Game | null>(null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [hasSavedSession, setHasSavedSession] = useState<boolean>(false);
  const [savedSessionData, setSavedSessionData] = useState<Game | null>(null);

  // Check for saved session on initial mount
  useEffect(() => {
    const saved = loadGameState();
    if (saved) {
      setSavedSessionData(saved);
      setHasSavedSession(true);
    }
  }, []);

  // Save game whenever state changes
  useEffect(() => {
    if (game) {
      saveGameState(game);
    }
  }, [game]);

  // Handler: Start a brand-new game from Setup screen
  const handleStartGame = (
    category: GameCategory,
    customName: string,
    characters: Character[],
    players: Player[],
    startingBudget: number,
    settings: GameSettings
  ) => {
    const initialAuction = createAuction(characters[0].id, players, settings.minimumBid);

    const newGame: Game = {
      id: `tf-game-${Date.now()}`,
      category,
      customCategoryName: customName,
      players,
      characters,
      currentCharacterIndex: 0,
      currentAuction: initialAuction,
      auctionHistory: [],
      startingBudget,
      settings,
      status: "auction",
      result: null,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    setGame(newGame);
    saveGameState(newGame);
    setHasSavedSession(false);
  };

  // Handler: Resume existing game from storage
  const handleResumeSavedGame = () => {
    if (savedSessionData) {
      setGame(savedSessionData);
      setHasSavedSession(false);
    }
  };

  // Handler: Discard existing game from storage
  const handleDiscardSavedGame = () => {
    clearGameState();
    setSavedSessionData(null);
    setHasSavedSession(false);
  };

  // Handler: Finish auction and trigger AI/Tactical analysis
  const handleFinishMatch = async (finalGame?: Game) => {
    const targetGame = finalGame || game;
    if (!targetGame) return;

    setIsEvaluating(true);
    try {
      const evaluation = await evaluateGameTeams(targetGame);
      const finishedGame: Game = {
        ...targetGame,
        status: "results",
        result: evaluation,
        updatedAt: Date.now(),
      };
      setGame(finishedGame);
      saveGameState(finishedGame);
    } catch (e) {
      console.error("Evaluation error:", e);
    } finally {
      setIsEvaluating(false);
    }
  };

  // Handler: Restart new match
  const handleRestart = () => {
    clearGameState();
    setGame(null);
    setHasSavedSession(false);
  };

  // Saved Session Modal
  if (hasSavedSession && savedSessionData && !game) {
    return (
      <div className="min-h-screen bg-[#0B0B14] text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full p-6 rounded-2xl bg-[#121224] border border-[#2A2A4E] shadow-2xl space-y-4 text-center">
          <div className="w-12 h-12 rounded-full bg-violet-600/20 border border-violet-500/40 text-violet-300 flex items-center justify-center mx-auto text-xl">
            ⚡
          </div>
          <h2 className="text-xl font-bold">Resume Previous Match?</h2>
          <p className="text-xs text-slate-400">
            A saved match session was found ({savedSessionData.category.toUpperCase()} universe,{" "}
            {savedSessionData.players.length} players, Character {savedSessionData.currentCharacterIndex + 1} of{" "}
            {savedSessionData.characters.length}).
          </p>
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <button
              onClick={handleResumeSavedGame}
              className="flex-1 py-2.5 px-4 rounded-xl bg-violet-600 hover:bg-violet-500 font-bold text-xs"
            >
              Resume Saved Match
            </button>
            <button
              onClick={handleDiscardSavedGame}
              className="flex-1 py-2.5 px-4 rounded-xl bg-[#1A1A32] hover:bg-[#252545] border border-[#2A2A4E] text-xs text-slate-300"
            >
              Start Fresh Game
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Evaluating Loading Screen
  if (isEvaluating) {
    return (
      <div className="min-h-screen bg-[#0B0B14] text-white flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="w-16 h-16 rounded-full border-4 border-violet-500/30 border-t-violet-500 animate-spin" />
        <h3 className="text-2xl font-bold tracking-tight">Analyzing Squads at Peak Prime Ability...</h3>
        <p className="text-sm text-slate-400 max-w-md">
          The Multiverse Overseer is calculating destructive power, tactical synergy, team balance, and matchup advantages.
        </p>
      </div>
    );
  }

  // SCREEN 3: RESULTS
  if (game && game.status === "results" && game.result) {
    return (
      <TeamResults
        game={game}
        result={game.result}
        onRestartGame={handleRestart}
        onExitToTerminal={onExit}
      />
    );
  }

  // SCREEN 2: AUCTION ARENA
  if (game && game.status === "auction") {
    return (
      <AuctionArena
        game={game}
        onUpdateGame={(updated) => setGame(updated)}
        onFinishMatch={handleFinishMatch}
        onExit={onExit}
      />
    );
  }

  // SCREEN 1: GAME SETUP
  return <GameSetup onStartGame={handleStartGame} onExitToTerminal={onExit} />;
}

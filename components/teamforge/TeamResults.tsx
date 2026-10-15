import React, { useEffect, useState } from "react";
import { Game, EvaluationResult, TeamScore, Character } from "@/types/game";
import { soundManager } from "@/lib/audio/sound-effects";
import CharacterArtwork from "./CharacterArtwork";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  RotateCcw,
  Sparkles,
  Shield,
  Zap,
  TrendingUp,
  Award,
  AlertTriangle,
  ChevronRight,
  LogOut,
  Layers,
  Coins,
  Cpu,
  Star,
  CheckCircle2,
} from "lucide-react";

interface TeamResultsProps {
  game: Game;
  result: EvaluationResult;
  onRestartGame: () => void;
  onExitToTerminal: () => void;
}

export default function TeamResults({
  game,
  result,
  onRestartGame,
  onExitToTerminal,
}: TeamResultsProps) {
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>(result.winnerPlayerId);
  const [confirmRestart, setConfirmRestart] = useState<boolean>(false);

  // Trigger celebration effects on mount
  useEffect(() => {
    soundManager.playVictory();

    // Multiverse confetti burst
    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.55 },
        colors: ["#8B5CF6", "#22D3EE", "#F59E0B", "#10B981", "#EC4899"],
      });

      const timer = setTimeout(() => {
        confetti({
          particleCount: 70,
          angle: 60,
          spread: 60,
          origin: { x: 0 },
          colors: ["#8B5CF6", "#F59E0B"],
        });
        confetti({
          particleCount: 70,
          angle: 120,
          spread: 60,
          origin: { x: 1 },
          colors: ["#22D3EE", "#10B981"],
        });
      }, 400);

      return () => clearTimeout(timer);
    } catch {
      // Ignore confetti issues if canvas not supported
    }
  }, []);

  const winnerScore = result.teamScores[result.winnerPlayerId];
  const activeTabScore = result.teamScores[selectedPlayerId] || winnerScore;

  // Sorted list of scores for leaderboards
  const scoreList: TeamScore[] = Object.values(result.teamScores).sort(
    (a, b) => b.totalScore - a.totalScore
  );

  return (
    <div className="min-h-screen bg-[#0B0B14] text-slate-100 p-3 sm:p-6 lg:p-8 flex flex-col items-center">
      <div className="w-full max-w-6xl space-y-8">
        {/* TOP BAR */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#2A2A4E] pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-900/50 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5" />
                FINAL RESULTS & EVALUATION
              </span>
              <span className="text-xs text-slate-400 capitalize">{game.category} Multiverse</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              THE STRONGEST SQUAD
            </h1>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => setConfirmRestart(true)}
              className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-violet-900/40 transition-transform active:scale-95 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>START AGAIN</span>
            </button>

            <button
              onClick={onExitToTerminal}
              className="px-4 py-2.5 rounded-xl bg-[#1A1A32] hover:bg-[#252545] border border-[#2A2A4E] text-slate-300 text-xs sm:text-sm font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Terminal</span>
            </button>
          </div>
        </header>

        {/* 6.C WINNER ANNOUNCEMENT BANNER */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-950/90 via-[#181832] to-cyan-950/90 border-2 border-amber-500/70 p-6 sm:p-8 shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Champion Badge & Details */}
            <div className="md:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black tracking-widest uppercase">
                <Award className="w-4 h-4 text-amber-400" />
                <span>CHAMPION CONQUEROR</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                {result.winnerPlayerName.toUpperCase()}
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-2xl">
                {result.victoryRationale}
              </p>

              {/* Engine Badge */}
              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
                {result.isAIEvaluated ? (
                  <span className="px-2.5 py-1 rounded-md bg-purple-900/60 border border-purple-500/40 text-purple-200 flex items-center gap-1.5 font-medium shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    Multiverse AI Deep Analysis
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-md bg-blue-900/60 border border-blue-500/40 text-blue-200 flex items-center gap-1.5 font-medium shadow-sm">
                    <Cpu className="w-3.5 h-3.5 text-blue-400" />
                    Tactical Prime Matrix Engine (Local Evaluator)
                  </span>
                )}
                <span className="text-slate-400 font-mono">
                  Victory Margin: <span className="text-amber-400 font-bold">+{result.scoreMargin} pts</span>
                </span>
              </div>
            </div>

            {/* Score Big Display */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-black/50 border border-amber-500/40 text-center shadow-inner">
              <span className="text-xs uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                Tactical Rating
              </span>
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="text-6xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-amber-300 via-amber-400 to-yellow-600 font-mono my-1"
              >
                {winnerScore?.totalScore || 90}
              </motion.div>
              <span className="text-xs text-slate-400 font-mono">out of 100 max score</span>
              <div className="mt-3 text-xs text-slate-300 flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
                <span className="text-slate-400">MVP:</span>
                <span className="font-extrabold text-white truncate max-w-[160px]">
                  {winnerScore?.bestCharacter?.name || "Squad Anchor"}
                </span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 6.A & 6.B EVALUATION RUBRIC CRITERIA INFO */}
        <section className="p-4 rounded-xl bg-[#121224] border border-[#2A2A4E] text-xs space-y-2">
          <div className="flex items-center justify-between font-bold text-slate-300">
            <span className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-violet-400" />
              {result.evaluationRubric.rubricName}
            </span>
            <span className="text-slate-400 uppercase tracking-wider text-[10px]">Prime Canonical Rubric</span>
          </div>
          <p className="text-slate-400 leading-relaxed">{result.evaluationRubric.description}</p>
          <div className="flex flex-wrap gap-2 pt-1">
            {result.evaluationRubric.criteria.map((c, i) => (
              <span key={i} className="px-2.5 py-1 rounded bg-[#1A1A32] border border-white/5 text-slate-300">
                {c}
              </span>
            ))}
          </div>
        </section>

        {/* 6.D TEAM COMPARISON & LEADERBOARDS */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            Head-to-Head Squad Breakdown
          </h3>

          {/* Player Tabs for Mobile & Desktop */}
          <div className="flex flex-wrap gap-2 border-b border-[#2A2A4E] pb-3">
            {scoreList.map((team, idx) => {
              const isSelected = selectedPlayerId === team.playerId;
              const playerObj = game.players.find((p) => p.id === team.playerId);

              return (
                <button
                  key={team.playerId}
                  type="button"
                  onClick={() => setSelectedPlayerId(team.playerId)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2.5 border cursor-pointer ${
                    isSelected
                      ? "bg-[#1E1E38] border-violet-500 text-white shadow-lg ring-2 ring-violet-500/40"
                      : "bg-[#121224] border-[#2A2A4E] text-slate-400 hover:text-white"
                  }`}
                >
                  <span className="font-mono text-slate-500 font-bold">#{idx + 1}</span>
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px]"
                    style={{ backgroundColor: playerObj?.color || "#8B5CF6" }}
                  >
                    {playerObj?.avatar || "⚡"}
                  </span>
                  <span>{team.playerName}</span>
                  <span className="ml-1 px-2 py-0.5 rounded-md bg-black/40 text-amber-400 font-mono text-xs">
                    {team.totalScore}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Player Detailed Breakdown Card */}
          <AnimatePresence mode="wait">
            {activeTabScore && (
              <motion.div
                key={activeTabScore.playerId}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 sm:p-6 rounded-2xl bg-[#121224] border border-[#2A2A4E]"
              >
                {/* Left Column: Attribute Breakdown & Key Metrics */}
                <div className="lg:col-span-6 space-y-5">
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-black text-white">{activeTabScore.playerName}&apos;s Squad Breakdown</h4>
                      <span className="text-xl font-black font-mono text-amber-400">
                        Rank #{activeTabScore.rank} ({activeTabScore.totalScore}/100)
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{activeTabScore.summary}</p>
                  </div>

                  {/* Tactical Category Radar / Bars */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      Category Attribute Scores
                    </span>
                    <div className="space-y-2">
                      {activeTabScore.attributeBreakdown.map((item, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-300 font-medium">{item.label}</span>
                            <span className="font-bold text-slate-200 font-mono">{item.score}/100</span>
                          </div>
                          <div className="w-full bg-[#0B0B14] rounded-full h-2 overflow-hidden border border-white/5">
                            <motion.div
                              className="bg-gradient-to-r from-violet-500 to-cyan-400 h-full rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${item.score}%` }}
                              transition={{ duration: 0.5, delay: idx * 0.1 }}
                            />
                          </div>
                          <p className="text-[10px] text-slate-500">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Synergy & Budget Efficiency */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 rounded-xl bg-[#16162D] border border-white/5">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">Synergy Cohesion</span>
                      <span className="text-2xl font-black text-cyan-400 font-mono">{activeTabScore.synergyScore}%</span>
                      <p className="text-[10px] text-slate-500 mt-0.5">Role complementarity & balance</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#16162D] border border-white/5">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">Budget Efficiency</span>
                      <span className="text-2xl font-black text-emerald-400 font-mono">{activeTabScore.budgetEfficiency}%</span>
                      <p className="text-[10px] text-slate-500 mt-0.5">Power yield per dollar spent</p>
                    </div>
                  </div>
                </div>

                {/* Right Column: Characters Owned & Highlights */}
                <div className="lg:col-span-6 space-y-5">
                  {/* Roster Badges */}
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Drafted Legends ({activeTabScore.characters.length})
                    </span>

                    {activeTabScore.characters.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {activeTabScore.characters.map((c) => (
                          <div
                            key={c.id}
                            className="p-3 rounded-xl bg-[#16162C] border border-[#2A2A4E] flex items-center gap-3 hover:border-violet-500/50 transition-colors"
                          >
                            <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-white/10">
                              <CharacterArtwork character={c} size="sm" />
                            </div>
                            <div className="min-w-0 flex-1 text-xs space-y-0.5">
                              <div className="font-bold text-white truncate flex items-center justify-between">
                                <span className="truncate">{c.name}</span>
                                <span className="text-[10px] font-mono text-cyan-400 ml-1">
                                  {c.attributes.overall || c.attributes.strength || 85}
                                </span>
                              </div>
                              <span className="text-[10px] text-violet-300 block truncate">★ {c.peakForm}</span>
                              <span className="text-[10px] text-slate-400 block truncate">{c.role || "Contender"}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl bg-[#16162C] border border-dashed border-[#2A2A4E] text-center text-xs text-slate-400 italic">
                        No characters acquired during this match
                      </div>
                    )}
                  </div>

                  {/* Strengths & Weaknesses */}
                  <div className="space-y-3 pt-2 border-t border-[#2A2A4E]">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                        Key Squad Strengths
                      </span>
                      <ul className="text-xs text-slate-300 space-y-1">
                        {activeTabScore.strengths.map((str, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-400 shrink-0 font-bold">✓</span>
                            <span>{str}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-400 block mb-1">
                        Likely Matchup Vulnerabilities
                      </span>
                      <ul className="text-xs text-slate-400 space-y-1">
                        {activeTabScore.weaknesses.map((w, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-rose-400 shrink-0 font-bold">⚠</span>
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Best Decisions */}
                  <div className="p-3.5 rounded-xl bg-[#16162D] border border-white/5 text-xs text-slate-300 space-y-1">
                    <span className="font-bold text-amber-400 text-[10px] uppercase block">Tactical Highlight</span>
                    <p>{activeTabScore.bestBudgetDecision}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>

      {/* Confirmation Modal */}
      {confirmRestart && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#121224] border border-violet-500/40 rounded-2xl p-6 max-w-sm w-full space-y-4 text-center">
            <h3 className="text-lg font-bold text-white">Start a New Match?</h3>
            <p className="text-xs text-slate-400">
              This will clear the current match session and return to Game Setup for a fresh draft.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setConfirmRestart(false)}
                className="flex-1 py-2 px-3 rounded-lg bg-[#1A1A32] border border-[#2A2A4E] text-xs font-semibold text-slate-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onRestartGame}
                className="flex-1 py-2 px-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-xs font-bold text-white cursor-pointer"
              >
                Yes, Start Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

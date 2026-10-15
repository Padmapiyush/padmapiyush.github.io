import React, { useState, useEffect } from "react";
import { Game, Player, Character, Auction } from "@/types/game";
import {
  getMinNextBid,
  placeBidOnGame,
  passTurnOnGame,
  resolveCurrentAuction,
  advanceToNextCharacter,
  isAuctionResolvable,
} from "@/lib/game-engine/auction-engine";
import { soundManager } from "@/lib/audio/sound-effects";
import CharacterArtwork from "./CharacterArtwork";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gavel,
  Shield,
  Coins,
  History,
  Users,
  Play,
  Pause,
  ChevronRight,
  ArrowRight,
  LogOut,
  Volume2,
  VolumeX,
  Trophy,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Info,
  Flame,
  Check,
} from "lucide-react";

interface AuctionArenaProps {
  game: Game;
  onUpdateGame: (updatedGame: Game) => void;
  onFinishMatch: (finalGame?: Game) => void;
  onExit: () => void;
}

export default function AuctionArena({
  game,
  onUpdateGame,
  onFinishMatch,
  onExit,
}: AuctionArenaProps) {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(game.settings.soundEnabled ?? true);
  const [customBidInputs, setCustomBidInputs] = useState<Record<string, string>>({});
  const [showRosterDrawer, setShowRosterDrawer] = useState<boolean>(false);
  const [confirmExit, setConfirmExit] = useState<boolean>(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const currentCharacter: Character | undefined = game.characters[game.currentCharacterIndex];
  const currentAuction: Auction | null = game.currentAuction;
  const isLastCharacter = game.currentCharacterIndex >= game.characters.length - 1;

  // Sound toggle synchronization
  useEffect(() => {
    soundManager.setEnabled(soundEnabled);
  }, [soundEnabled]);

  // Play card reveal sound when character changes
  useEffect(() => {
    setActionError(null);
    if (soundEnabled && currentCharacter) {
      soundManager.playCardReveal();
    }
  }, [game.currentCharacterIndex, soundEnabled, currentCharacter]);

  if (!currentCharacter || !currentAuction) {
    return (
      <div className="min-h-screen bg-[#0B0B14] text-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Auction Complete!</h2>
        <p className="text-slate-400 mb-6">All characters have been auctioned across the arena.</p>
        <button
          onClick={() => onFinishMatch(game)}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 font-bold"
        >
          ANALYZE THE TEAMS
        </button>
      </div>
    );
  }

  const minNextBid = getMinNextBid(currentAuction, game.settings.minimumBid, game.settings.bidIncrement);
  const resolvableCheck = isAuctionResolvable(currentAuction, game.settings.auctionMode);

  // Highest bidder player object
  const highestBidderPlayer = game.players.find((p) => p.id === currentAuction.highestBidderId);

  // Active turn player object for turn-based mode
  const activeTurnPlayer = game.players.find((p) => p.id === currentAuction.activePlayerId);

  // Handle placing a quick bid (min next bid)
  const handleQuickBid = (playerId: string) => {
    setActionError(null);
    const result = placeBidOnGame(game, playerId, minNextBid);
    if (!result.success) {
      setActionError(result.error || "Unable to place bid");
      return;
    }
    soundManager.playBid();
    onUpdateGame(result.game);
  };

  // Handle custom amount bid
  const handleCustomBid = (playerId: string) => {
    setActionError(null);
    const raw = customBidInputs[playerId];
    const amount = parseInt(raw, 10);
    if (isNaN(amount)) {
      setActionError("Please enter a valid numeric bid amount");
      return;
    }

    const result = placeBidOnGame(game, playerId, amount);
    if (!result.success) {
      setActionError(result.error || "Invalid bid amount");
      return;
    }

    soundManager.playBid();
    setCustomBidInputs({ ...customBidInputs, [playerId]: "" });
    onUpdateGame(result.game);
  };

  // Handle pass turn
  const handlePass = (playerId: string) => {
    setActionError(null);
    const result = passTurnOnGame(game, playerId);
    if (!result.success) {
      setActionError(result.error || "Unable to pass");
      return;
    }
    soundManager.playPass();
    onUpdateGame(result.game);
  };

  // Host action: Resolve Auction
  const handleResolve = () => {
    setActionError(null);
    if (!resolvableCheck.resolvable) {
      setActionError(resolvableCheck.reason || "Auction cannot be resolved yet");
      return;
    }

    soundManager.playGavel();
    const result = resolveCurrentAuction(game);
    if (!result.success) {
      setActionError(result.error || "Error resolving auction");
      return;
    }
    onUpdateGame(result.game);
  };

  // Host action: Next Character
  const handleAdvance = () => {
    setActionError(null);
    const updated = advanceToNextCharacter(game);
    onUpdateGame(updated);
    if (updated.status === "results") {
      onFinishMatch(updated);
    }
  };

  // Find character's key attributes to show in spotlight
  const attributesList = Object.entries(currentCharacter.attributes)
    .filter(([key]) => key !== "overall")
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-[#0B0B14] text-slate-100 flex flex-col justify-between pb-24 sm:pb-8">
      {/* 5.A AUCTION HEADER */}
      <header className="border-b border-[#2A2A4E] bg-[#0E0E1B]/95 backdrop-blur sticky top-0 z-30 px-3 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-1 rounded-lg bg-violet-950/80 border border-violet-500/40 text-violet-300 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping"></span>
              {game.category}
            </span>

            <div className="text-xs sm:text-sm font-semibold text-slate-300">
              Character <span className="text-cyan-400 font-bold">{game.currentCharacterIndex + 1}</span> / {game.characters.length}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="hidden md:flex items-center gap-3 flex-1 max-w-xs mx-4">
            <div className="w-full bg-[#1A1A32] rounded-full h-2 overflow-hidden border border-[#2A2A4E]">
              <motion.div
                className="bg-gradient-to-r from-violet-500 to-cyan-400 h-full rounded-full"
                animate={{
                  width: `${((game.currentCharacterIndex + (currentAuction.status === "resolved" ? 1 : 0)) / game.characters.length) * 100}%`,
                }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <span className="text-[11px] text-slate-400 font-mono whitespace-nowrap">
              {game.characters.length - (game.currentCharacterIndex + 1)} left
            </span>
          </div>

          {/* Header Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowRosterDrawer(true)}
              className="px-3 py-1.5 rounded-lg bg-[#1A1A32] hover:bg-[#252545] border border-[#2A2A4E] text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="View Rosters & History"
            >
              <History className="w-3.5 h-3.5 text-cyan-400" />
              <span>Rosters & Log</span>
            </button>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1.5 rounded-lg bg-[#1A1A32] hover:bg-[#252545] border border-[#2A2A4E] text-slate-300 transition-colors"
              title={soundEnabled ? "Mute SFX" : "Enable SFX"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>

            <button
              onClick={() => setConfirmExit(true)}
              className="px-2.5 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-xs text-red-300 flex items-center gap-1 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Exit</span>
            </button>
          </div>
        </div>
      </header>

      {/* Action Error Banner */}
      <AnimatePresence>
        {actionError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-red-950/90 border-b border-red-500/50 px-4 py-2.5 text-xs sm:text-sm text-red-200 text-center flex items-center justify-center gap-2 font-medium"
          >
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{actionError}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN ARENA LAYOUT */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 5.B SPOTLIGHT COLLECTIBLE CHARACTER CARD (Cols 1-5 on LG) */}
        <div className="lg:col-span-5 flex flex-col items-center w-full">
          <motion.div
            key={currentCharacter.id}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="w-full max-w-md bg-[#121224] rounded-2xl border border-[#2A2A4E] overflow-hidden shadow-2xl relative transition-all duration-300 hover:border-violet-500/60 group"
          >
            {/* Top Bar on Card */}
            <div className="p-3.5 bg-[#16162D] border-b border-[#2A2A4E] flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                {currentCharacter.universeName}
              </span>
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                <span>Est. Base:</span>
                <span>{game.settings.currencySymbol}{currentCharacter.baseValue}</span>
              </div>
            </div>

            {/* Character Artwork with Authentic Picture and Fallback */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden">
              <CharacterArtwork character={currentCharacter} size="spotlight" />

              {/* Peak Form Tag */}
              <div className="absolute bottom-3 left-3 right-3 z-10">
                <span className="px-2.5 py-1 rounded-md bg-black/85 backdrop-blur-md border border-violet-500/50 text-[11px] text-violet-300 font-mono font-semibold shadow-lg">
                  ★ PEAK: {currentCharacter.peakForm}
                </span>
              </div>
            </div>

            {/* Character Intel & Attributes */}
            <div className="p-4 sm:p-5 space-y-4">
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight">{currentCharacter.name}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{currentCharacter.description}</p>
              </div>

              {/* Attributes Radar / Bars */}
              <div className="space-y-2 pt-1">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex justify-between">
                  <span>Tactical Attribute Matrix</span>
                  <span className="text-cyan-400 font-bold">
                    Rating: {currentCharacter.attributes.overall || 88}
                  </span>
                </div>
                <div className="space-y-1.5">
                  {attributesList.map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2 text-xs">
                      <span className="w-24 capitalize text-slate-300 truncate text-[11px] font-mono">
                        {key}
                      </span>
                      <div className="flex-1 bg-[#1A1A32] rounded-full h-2 overflow-hidden border border-white/5">
                        <motion.div
                          className="bg-gradient-to-r from-violet-500 to-cyan-400 h-full rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, (value as number))}%` }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                        />
                      </div>
                      <span className="w-7 text-right text-[11px] font-bold text-slate-200">{value as number}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Abilities & Weaknesses */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#2A2A4E] text-[11px]">
                <div className="space-y-1">
                  <span className="text-cyan-400 font-bold block uppercase tracking-wider text-[10px]">
                    Signature Powers
                  </span>
                  <ul className="text-slate-300 space-y-0.5">
                    {currentCharacter.abilities.slice(0, 3).map((ab, i) => (
                      <li key={i} className="truncate">• {ab}</li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-1">
                  <span className="text-rose-400 font-bold block uppercase tracking-wider text-[10px]">
                    Canon Counters
                  </span>
                  <ul className="text-slate-400 space-y-0.5">
                    {currentCharacter.weaknesses.slice(0, 2).map((w, i) => (
                      <li key={i} className="truncate">• {w}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 5.C & 5.D PLAYER BIDDING ARENA & CONTROLS (Cols 6-12 on LG) */}
        <div className="lg:col-span-7 space-y-5 w-full">
          {/* Current Auction Live Status Card */}
          <motion.div
            layout
            className="p-4 sm:p-5 rounded-2xl bg-[#16162C] border border-[#2A2A4E] shadow-xl relative overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#2A2A4E] pb-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  Live Multiverse Auction
                </span>
                <div className="text-lg font-black text-white flex items-center gap-2 mt-0.5">
                  <Gavel className="w-5 h-5 text-amber-400" />
                  <span>Current Highest Bid:</span>
                  <motion.span
                    key={currentAuction.currentHighestBid}
                    initial={{ scale: 1.2, color: "#FBBF24" }}
                    animate={{ scale: 1, color: "#F59E0B" }}
                    className="text-2xl sm:text-3xl font-black text-amber-400 font-mono"
                  >
                    {game.settings.currencySymbol}
                    {currentAuction.currentHighestBid || 0}
                  </motion.span>
                </div>
              </div>

              {/* Highest Bidder Display */}
              <div className="text-left sm:text-right">
                <span className="text-[11px] text-slate-400 block">Leading Bidder</span>
                {highestBidderPlayer ? (
                  <div className="flex items-center gap-2 mt-0.5">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-md ring-2 ring-amber-400"
                      style={{ backgroundColor: highestBidderPlayer.color }}
                    >
                      {highestBidderPlayer.avatar}
                    </span>
                    <span className="font-extrabold text-white text-base">{highestBidderPlayer.name}</span>
                  </div>
                ) : (
                  <span className="text-xs text-slate-500 italic">No bids placed yet</span>
                )}
              </div>
            </div>

            {/* Auction Status and Next Legal Bid */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Next Minimum Bid:</span>
                <span className="px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono font-bold">
                  {game.settings.currencySymbol}
                  {minNextBid}
                </span>
              </div>

              <div className="flex items-center gap-2 text-slate-400">
                <span>Mode:</span>
                <span className="font-semibold text-slate-200 capitalize">
                  {game.settings.auctionMode === "turn-based" ? "Turn-Based Rotation" : "Open Arena"}
                </span>
              </div>
            </div>

            {/* Turn-Based Banner */}
            {game.settings.auctionMode === "turn-based" && currentAuction.status === "active" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 p-2.5 rounded-lg bg-violet-950/60 border border-violet-500/40 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="animate-bounce">👉</span>
                  <span>Active Turn:</span>
                  <span className="font-black text-violet-300 text-sm">
                    {activeTurnPlayer?.name || "N/A"}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400">Must Bid or Pass to advance</span>
              </motion.div>
            )}
          </motion.div>

          {/* 5.C PLAYER BIDDING PANELS (Desktop Columns / Mobile Responsive Cards) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-4 h-4 text-cyan-400" />
                Player Panels & Drafted Rosters
              </h4>
              <span className="text-xs text-slate-400">{game.players.length} Competitors</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {game.players.map((player) => {
                const hasPassed = currentAuction.passedPlayerIds.includes(player.id);
                const isLeading = currentAuction.highestBidderId === player.id;
                const isTurn = game.settings.auctionMode === "turn-based" && currentAuction.activePlayerId === player.id;
                const canAfford = player.remainingBudget >= minNextBid;
                const isAuctionActive = currentAuction.status === "active";

                const canBid =
                  isAuctionActive &&
                  !hasPassed &&
                  !isLeading &&
                  canAfford &&
                  (game.settings.auctionMode !== "turn-based" || isTurn);

                const canPass =
                  isAuctionActive &&
                  !hasPassed &&
                  !isLeading &&
                  (game.settings.auctionMode !== "turn-based" || isTurn);

                return (
                  <motion.div
                    key={player.id}
                    layout
                    className={`p-3.5 sm:p-4 rounded-xl border transition-all ${
                      isLeading
                        ? "bg-[#181832] border-amber-500/60 ring-2 ring-amber-500/40"
                        : isTurn
                        ? "bg-[#16162D] border-violet-500/80 ring-2 ring-violet-500/40"
                        : hasPassed
                        ? "bg-[#0E0E1B] border-[#202038] opacity-60"
                        : "bg-[#121224] border-[#2A2A4E]"
                    }`}
                  >
                    {/* Player Info Row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-md"
                          style={{ backgroundColor: player.color }}
                        >
                          {player.avatar}
                        </span>
                        <div>
                          <div className="font-bold text-white text-sm flex items-center gap-1.5">
                            <span>{player.name}</span>
                            {isLeading && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-black">
                                HIGHEST
                              </span>
                            )}
                            {hasPassed && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400">
                                PASSED
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            Won: <span className="text-white font-bold">{player.ownedCharacterIds.length}</span> |
                            Spent: <span className="text-slate-300 font-mono font-semibold">{game.settings.currencySymbol}{player.totalSpent}</span>
                          </div>
                        </div>
                      </div>

                      {/* Remaining Budget */}
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block uppercase">Budget Left</span>
                        <span className="text-base sm:text-lg font-black text-emerald-400 font-mono">
                          {game.settings.currencySymbol}
                          {player.remainingBudget}
                        </span>
                      </div>
                    </div>

                    {/* Won Characters Badges inside panel */}
                    {player.ownedCharacterIds.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2.5 pt-2 border-t border-white/5">
                        {player.ownedCharacterIds.map((charId) => {
                          const c = game.characters.find((x) => x.id === charId);
                          return (
                            <span
                              key={charId}
                              className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-violet-950/70 border border-violet-500/30 text-violet-200 truncate max-w-[140px]"
                            >
                              ★ {c?.name || "Legend"}
                            </span>
                          );
                        })}
                      </div>
                    )}

                    {/* Bid & Pass Controls */}
                    {isAuctionActive && (
                      <div className="mt-3 pt-3 border-t border-white/5 space-y-2">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            disabled={!canBid}
                            onClick={() => handleQuickBid(player.id)}
                            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                              canBid
                                ? "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-md active:scale-95"
                                : "bg-[#1E1E38] text-slate-500 cursor-not-allowed"
                            }`}
                          >
                            <span>Bid {game.settings.currencySymbol}{minNextBid}</span>
                          </button>

                          <button
                            type="button"
                            disabled={!canPass}
                            onClick={() => handlePass(player.id)}
                            className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                              canPass
                                ? "bg-[#1A1A32] hover:bg-[#252545] border-[#2A2A4E] text-slate-300"
                                : "bg-[#121224] border-transparent text-slate-600 cursor-not-allowed"
                            }`}
                          >
                            Pass
                          </button>
                        </div>

                        {/* Custom Bid Input */}
                        {canBid && (
                          <div className="flex items-center gap-1.5">
                            <input
                              type="number"
                              min={minNextBid}
                              max={player.remainingBudget}
                              placeholder={`Min ${game.settings.currencySymbol}${minNextBid}`}
                              value={customBidInputs[player.id] || ""}
                              onChange={(e) =>
                                setCustomBidInputs({ ...customBidInputs, [player.id]: e.target.value })
                              }
                              className="flex-1 px-2.5 py-1.5 rounded-lg bg-[#0B0B14] border border-[#2A2A4E] text-xs text-white"
                            />
                            <button
                              type="button"
                              onClick={() => handleCustomBid(player.id)}
                              className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold cursor-pointer"
                            >
                              Custom Bid
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* 5.E HOST CONTROLS & AUCTION RESOLUTION */}
          <div className="p-4 rounded-xl bg-[#121224] border border-[#2A2A4E] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Gavel className="w-4 h-4 text-violet-400" />
                Host Arena Controls
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                Status: <span className="text-white font-semibold uppercase">{currentAuction.status}</span>
              </span>
            </div>

            {/* If auction is still active */}
            {currentAuction.status === "active" ? (
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <button
                    type="button"
                    disabled={!resolvableCheck.resolvable}
                    onClick={handleResolve}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                      resolvableCheck.resolvable
                        ? "bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-950/50 cursor-pointer active:scale-98"
                        : "bg-[#1E1E38] text-slate-500 cursor-not-allowed border border-[#2A2A4E]"
                    }`}
                  >
                    <Gavel className="w-4 h-4" />
                    <span>Confirm & Resolve Auction</span>
                  </button>
                </div>

                {!resolvableCheck.resolvable && (
                  <p className="text-[11px] text-slate-400 flex items-center gap-1.5 justify-center sm:justify-start">
                    <Info className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>{resolvableCheck.reason}</span>
                  </p>
                )}
              </div>
            ) : (
              /* Resolved or Unsold State */
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3 pt-1"
              >
                <div
                  className={`p-3.5 rounded-xl border flex items-center gap-3 ${
                    currentAuction.winningPlayerId
                      ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200"
                      : "bg-amber-950/40 border-amber-500/40 text-amber-200"
                  }`}
                >
                  <Trophy className="w-6 h-6 shrink-0" />
                  <div>
                    <div className="font-bold text-sm sm:text-base">
                      {currentAuction.winningPlayerId
                        ? `AWARDED: ${highestBidderPlayer?.name} won ${currentCharacter.name} for ${game.settings.currencySymbol}${currentAuction.winningPrice}!`
                        : `${currentCharacter.name} went Unsold!`}
                    </div>
                    <div className="text-xs text-slate-300">
                      {currentAuction.winningPlayerId
                        ? "Added to winning squad roster. Budget deducted and saved."
                        : "No qualifying bids placed. Moving forward."}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAdvance}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer transform hover:scale-[1.01] active:scale-[0.98] transition-all"
                >
                  <span>{isLastCharacter ? "COMPLETE MATCH & ANALYZE TEAMS" : "NEXT CHARACTER AUCTION"}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      {/* 6. MOBILE STICKY BIDDING DOCK (Optimized for 360px - 430px screens) */}
      {currentAuction.status === "active" && activeTurnPlayer && (
        <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0E0E1B]/95 backdrop-blur-md border-t border-[#2A2A4E] p-2.5 shadow-2xl flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 truncate">
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0"
              style={{ backgroundColor: activeTurnPlayer.color }}
            >
              {activeTurnPlayer.avatar}
            </span>
            <div className="truncate text-xs">
              <span className="font-bold text-white truncate block">{activeTurnPlayer.name}</span>
              <span className="text-[10px] text-emerald-400 font-mono">
                {game.settings.currencySymbol}{activeTurnPlayer.remainingBudget} left
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => handleQuickBid(activeTurnPlayer.id)}
              disabled={activeTurnPlayer.remainingBudget < minNextBid || currentAuction.highestBidderId === activeTurnPlayer.id}
              className="py-2 px-3.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-md disabled:bg-slate-800 disabled:text-slate-500"
            >
              Bid {game.settings.currencySymbol}{minNextBid}
            </button>
            <button
              type="button"
              onClick={() => handlePass(activeTurnPlayer.id)}
              disabled={currentAuction.highestBidderId === activeTurnPlayer.id}
              className="py-2 px-2.5 rounded-lg bg-[#1A1A32] border border-[#2A2A4E] text-slate-300 font-semibold text-xs disabled:opacity-40"
            >
              Pass
            </button>
          </div>
        </div>
      )}

      {/* 5.F ROSTER & AUCTION HISTORY DRAWER */}
      <AnimatePresence>
        {showRosterDrawer && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="w-full max-w-lg bg-[#0E0E1B] border-l border-[#2A2A4E] h-full p-4 sm:p-6 overflow-y-auto space-y-6 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-[#2A2A4E] pb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <History className="w-5 h-5 text-cyan-400" />
                  Squad Rosters & Match History
                </h3>
                <button
                  onClick={() => setShowRosterDrawer(false)}
                  className="w-8 h-8 rounded-lg bg-[#1A1A32] hover:bg-[#252545] text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Squads */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Current Rosters</h4>
                {game.players.map((p) => {
                  const owned = p.ownedCharacterIds
                    .map((id) => game.characters.find((c) => c.id === id))
                    .filter(Boolean) as Character[];

                  return (
                    <div key={p.id} className="p-3.5 rounded-xl bg-[#121224] border border-[#2A2A4E] space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-md"
                            style={{ backgroundColor: p.color }}
                          >
                            {p.avatar}
                          </span>
                          <span className="font-bold text-white text-sm">{p.name}</span>
                          <span className="text-xs text-slate-400 font-mono">({owned.length} Legends)</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-emerald-400 font-mono font-bold block">
                            {game.settings.currencySymbol}{p.remainingBudget} left
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            Spent: {game.settings.currencySymbol}{p.totalSpent}
                          </span>
                        </div>
                      </div>

                      {owned.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                          {owned.map((c) => (
                            <span
                              key={c.id}
                              className="px-2 py-0.5 rounded-md bg-[#1A1A32] border border-white/10 text-xs text-slate-200 flex items-center gap-1"
                            >
                              <span className="text-amber-400">★</span>
                              <span>{c.name}</span>
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-slate-500 italic pt-1">No characters won yet</p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Completed Auctions Log */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Completed Auctions Log ({game.auctionHistory.length})
                </h4>
                {game.auctionHistory.length > 0 ? (
                  <div className="space-y-2">
                    {game.auctionHistory.map((h, idx) => {
                      const char = game.characters.find((c) => c.id === h.characterId);
                      const winner = game.players.find((p) => p.id === h.winningPlayerId);
                      return (
                        <div
                          key={idx}
                          className="p-3 rounded-lg bg-[#16162D] border border-white/5 text-xs flex items-center justify-between"
                        >
                          <div>
                            <span className="font-bold text-white block text-sm">{char?.name || "Character"}</span>
                            <span className="text-slate-400 block text-[11px] mt-0.5">
                              {winner ? (
                                <span className="text-emerald-400 font-semibold">Won by {winner.name}</span>
                              ) : (
                                <span className="text-amber-400">Unsold</span>
                              )}
                            </span>
                          </div>
                          <span className="font-mono font-bold text-amber-400 text-sm">
                            {h.winningPrice !== null ? `${game.settings.currencySymbol}${h.winningPrice}` : "—"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">No auctions completed yet</p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Exit Confirmation Modal */}
      {confirmExit && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#121224] border border-red-500/40 rounded-2xl p-6 max-w-sm w-full space-y-4 text-center">
            <h3 className="text-lg font-bold text-white">Exit Match?</h3>
            <p className="text-xs text-slate-400">
              Your match progress is saved in your browser, but the current active character auction will be paused.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setConfirmExit(false)}
                className="flex-1 py-2 px-3 rounded-lg bg-[#1A1A32] border border-[#2A2A4E] text-xs font-semibold text-slate-300"
              >
                Resume Match
              </button>
              <button
                type="button"
                onClick={onExit}
                className="flex-1 py-2 px-3 rounded-lg bg-red-600 hover:bg-red-500 text-xs font-bold text-white"
              >
                Confirm Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

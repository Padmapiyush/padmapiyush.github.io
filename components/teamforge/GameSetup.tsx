import React, { useState, useEffect } from "react";
import { GameCategory, GameSettings, Player, Character, AuctionMode } from "@/types/game";
import { getCharactersForGame, shuffleArray } from "@/lib/character-catalog/generator";
import { soundManager } from "@/lib/audio/sound-effects";
import CharacterArtwork from "./CharacterArtwork";
import {
  Sparkles,
  Users,
  Coins,
  Settings2,
  Shuffle,
  Shield,
  Sword,
  Film,
  Gamepad2,
  Trophy,
  Activity,
  Plus,
  Trash2,
  Check,
  ChevronRight,
  Flame,
  Zap,
} from "lucide-react";

interface GameSetupProps {
  onStartGame: (
    category: GameCategory,
    customName: string,
    characters: Character[],
    players: Player[],
    startingBudget: number,
    settings: GameSettings
  ) => void;
  onExitToTerminal: () => void;
}

const CATEGORIES: { id: GameCategory; label: string; icon: React.ReactNode; desc: string; gradient: string }[] = [
  { id: "marvel", label: "Marvel", icon: <Zap className="w-5 h-5 text-red-400" />, desc: "Earth-616 gods, mutants & avengers", gradient: "from-red-900/40 to-slate-900/80" },
  { id: "dc", label: "DC Comics", icon: <Shield className="w-5 h-5 text-blue-400" />, desc: "Justice League & cosmic pantheon", gradient: "from-blue-900/40 to-slate-900/80" },
  { id: "anime", label: "Anime", icon: <Flame className="w-5 h-5 text-orange-400" />, desc: "Saiyans, Hokages, Shinigami & pirates", gradient: "from-orange-900/40 to-slate-900/80" },
  { id: "cricket", label: "Cricket", icon: <Trophy className="w-5 h-5 text-amber-400" />, desc: "World Cup legends & master batters", gradient: "from-amber-900/40 to-slate-900/80" },
  { id: "football", label: "Football", icon: <Activity className="w-5 h-5 text-emerald-400" />, desc: "Ballon d'Or icons & football royalty", gradient: "from-emerald-900/40 to-slate-900/80" },
  { id: "basketball", label: "Basketball", icon: <Trophy className="w-5 h-5 text-purple-400" />, desc: "NBA legends, scoring champions & MVPs", gradient: "from-purple-900/40 to-slate-900/80" },
  { id: "movies", label: "Movies", icon: <Film className="w-5 h-5 text-cyan-400" />, desc: "Cinematic icons: Sith lords, Neo & Baba Yaga", gradient: "from-cyan-900/40 to-slate-900/80" },
  { id: "gaming", label: "Gaming", icon: <Gamepad2 className="w-5 h-5 text-violet-400" />, desc: "God of War, Doom Slayer & Master Chief", gradient: "from-violet-900/40 to-slate-900/80" },
  { id: "custom", label: "Custom Universe", icon: <Sparkles className="w-5 h-5 text-pink-400" />, desc: "Craft your own universe & legends", gradient: "from-pink-900/40 to-slate-900/80" },
];

const PRESET_PLAYER_COLORS = ["#8B5CF6", "#22D3EE", "#F59E0B", "#EF4444", "#10B981", "#EC4899", "#3B82F6", "#F97316"];
const PRESET_AVATARS = ["⚡", "🛡️", "🔥", "👑", "🗡️", "🎯", "🌟", "🪐"];
const PRESET_BUDGETS = [20, 50, 100, 250, 500];

export default function GameSetup({ onStartGame, onExitToTerminal }: GameSetupProps) {
  const [category, setCategory] = useState<GameCategory>("marvel");
  const [customCategoryName, setCustomCategoryName] = useState<string>("Harry Potter");
  const [characterCount, setCharacterCount] = useState<number>(10);
  const [candidatePool, setCandidatePool] = useState<Character[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<number>(100);
  const [customBudget, setCustomBudget] = useState<string>("");
  const [currencySymbol, setCurrencySymbol] = useState<string>("$");

  const [players, setPlayers] = useState<Player[]>([
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
  ]);

  const [settings, setSettings] = useState<GameSettings>({
    minimumBid: 1,
    bidIncrement: 1,
    auctionMode: "turn-based",
    characterSelection: "catalog",
    allowUnsold: true,
    currencySymbol: "$",
    soundEnabled: true,
  });

  const [validationError, setValidationError] = useState<string | null>(null);

  // Generate candidate pool whenever category or custom name or count changes
  useEffect(() => {
    const pool = getCharactersForGame(category, customCategoryName, characterCount);
    setCandidatePool(pool);
  }, [category, customCategoryName, characterCount]);

  // Sync budget changes with player starting budgets
  const activeBudget = customBudget ? parseInt(customBudget, 10) || selectedBudget : selectedBudget;

  const handleShufflePool = () => {
    soundManager.playClick();
    const shuffled = shuffleArray(candidatePool);
    setCandidatePool(shuffled);
  };

  const handleAddPlayer = () => {
    if (players.length >= 8) return;
    soundManager.playClick();
    const nextIdx = players.length;
    const newPlayer: Player = {
      id: `p${Date.now()}`,
      name: `Player ${nextIdx + 1}`,
      color: PRESET_PLAYER_COLORS[nextIdx % PRESET_PLAYER_COLORS.length],
      avatar: PRESET_AVATARS[nextIdx % PRESET_AVATARS.length],
      startingBudget: activeBudget,
      remainingBudget: activeBudget,
      totalSpent: 0,
      ownedCharacterIds: [],
    };
    setPlayers([...players, newPlayer]);
  };

  const handleRemovePlayer = (id: string) => {
    if (players.length <= 2) return;
    soundManager.playClick();
    setPlayers(players.filter((p) => p.id !== id));
  };

  const handlePlayerNameChange = (id: string, name: string) => {
    setPlayers(players.map((p) => (p.id === id ? { ...p, name } : p)));
  };

  const handlePlayerColorChange = (id: string, color: string) => {
    setPlayers(players.map((p) => (p.id === id ? { ...p, color } : p)));
  };

  const handlePlayerAvatarChange = (id: string, avatar: string) => {
    setPlayers(players.map((p) => (p.id === id ? { ...p, avatar } : p)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (players.length < 2 || players.length > 8) {
      setValidationError("Please configure between 2 and 8 players.");
      return;
    }

    for (const p of players) {
      if (!p.name.trim()) {
        setValidationError("Each player must have a non-empty name.");
        return;
      }
    }

    const playerNames = new Set(players.map((p) => p.name.trim().toLowerCase()));
    if (playerNames.size !== players.length) {
      setValidationError("Each player must have a unique display name.");
      return;
    }

    if (activeBudget <= 0) {
      setValidationError("Starting budget must be greater than 0.");
      return;
    }

    if (candidatePool.length < characterCount) {
      setValidationError("Character pool does not have enough unique characters.");
      return;
    }

    setValidationError(null);
    soundManager.playGavel();

    const finalizedPlayers = players.map((p) => ({
      ...p,
      startingBudget: activeBudget,
      remainingBudget: activeBudget,
      totalSpent: 0,
      ownedCharacterIds: [],
    }));

    onStartGame(
      category,
      category === "custom" ? customCategoryName : "",
      candidatePool.slice(0, characterCount),
      finalizedPlayers,
      activeBudget,
      {
        ...settings,
        currencySymbol,
      }
    );
  };

  return (
    <div className="min-h-screen bg-[#0B0B14] text-slate-100 p-3 sm:p-6 lg:p-8 flex flex-col items-center">
      <div className="w-full max-w-5xl space-y-8">
        {/* Navigation & Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#2A2A4E] pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-violet-900/60 text-violet-300 border border-violet-500/30">
                PROJECT: TEAMFORGE
              </span>
              <span className="text-xs text-slate-400">MULTIVERSE SQUAD AUCTION</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-violet-300 bg-clip-text text-transparent mt-1">
              BUILD YOUR DREAM TEAM
            </h1>
            <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-2xl">
              Choose your universe. Draft your legends. Prove your squad is the strongest.
            </p>
          </div>

          <button
            type="button"
            onClick={onExitToTerminal}
            className="px-4 py-2 text-xs sm:text-sm font-mono rounded-lg bg-[#1A1A32] hover:bg-[#252545] border border-[#2A2A4E] text-slate-300 transition-colors flex items-center gap-2 self-end sm:self-auto"
          >
            ← Exit to Terminal
          </button>
        </header>

        {validationError && (
          <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-sm flex items-center gap-3">
            <span className="text-lg">⚠️</span>
            <span>{validationError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* SECTION A: Select Category */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2 text-white">
                <span className="w-7 h-7 rounded-lg bg-violet-600/30 border border-violet-500/40 flex items-center justify-center text-xs text-violet-300">
                  A
                </span>
                Select a Character Category
              </h2>
              <span className="text-xs text-slate-400">9 Universes Available</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {CATEGORIES.map((cat) => {
                const isSelected = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setCategory(cat.id);
                    }}
                    className={`relative text-left p-4 rounded-xl border transition-all duration-200 bg-gradient-to-br ${cat.gradient} ${
                      isSelected
                        ? "border-violet-500 ring-2 ring-violet-500/30 bg-[#1A1A32]"
                        : "border-[#2A2A4E] hover:border-slate-500/60 bg-[#121224]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-black/40 border border-white/5">{cat.icon}</div>
                        <span className="font-semibold text-white text-base">{cat.label}</span>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-white" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-1">{cat.desc}</p>
                  </button>
                );
              })}
            </div>

            {/* Custom Category Input */}
            {category === "custom" && (
              <div className="p-4 rounded-xl bg-[#16162C] border border-violet-500/40 space-y-3">
                <label className="block text-xs font-semibold text-violet-300 uppercase tracking-wider">
                  Create your own universe
                </label>
                <input
                  type="text"
                  value={customCategoryName}
                  onChange={(e) => setCustomCategoryName(e.target.value)}
                  placeholder="e.g. Dragon Ball, Harry Potter, Indian cricket legends..."
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0B0B14] border border-[#2A2A4E] text-white text-sm focus:outline-none focus:border-violet-500"
                />
                <div className="flex flex-wrap gap-2 pt-1">
                  {["Harry Potter", "Greek Mythology", "Dragon Ball", "Premier League Legends"].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setCustomCategoryName(preset)}
                      className="text-xs px-2.5 py-1 rounded-full bg-[#1F1F3D] hover:bg-violet-900/50 text-slate-300 border border-[#2A2A4E]"
                    >
                      + {preset}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* SECTION B: Character Count & Pool Preview */}
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2 text-white">
                <span className="w-7 h-7 rounded-lg bg-cyan-600/30 border border-cyan-500/40 flex items-center justify-center text-xs text-cyan-300">
                  B
                </span>
                Characters to Auction: <span className="text-cyan-400 ml-1">{characterCount}</span>
              </h2>

              <button
                type="button"
                onClick={handleShufflePool}
                className="px-3 py-1.5 rounded-lg bg-[#1A1A32] hover:bg-[#252545] border border-[#2A2A4E] text-xs font-medium text-slate-300 flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Shuffle className="w-3.5 h-3.5 text-cyan-400" />
                Shuffle Candidate Pool
              </button>
            </div>

            {/* Slider */}
            <div className="p-4 rounded-xl bg-[#121224] border border-[#2A2A4E] space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>4 Characters</span>
                <span className="font-semibold text-cyan-300">Selected: {characterCount}</span>
                <span>20 Characters</span>
              </div>
              <input
                type="range"
                min="4"
                max="20"
                value={characterCount}
                onChange={(e) => setCharacterCount(parseInt(e.target.value, 10))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Candidate Pool Roster Preview */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Draft Pool Preview ({candidatePool.length} Legends)
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 max-h-56 overflow-y-auto p-1">
                {candidatePool.slice(0, characterCount).map((char, index) => (
                  <div
                    key={char.id}
                    className="p-2.5 rounded-lg bg-[#16162C] border border-[#2A2A4E] text-xs flex flex-col justify-between hover:border-violet-500/50 transition-colors shadow-sm"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-1.5">
                        <span className="font-semibold text-slate-400">#{index + 1}</span>
                        <span className="text-amber-400 font-bold">${char.baseValue}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-9 h-9 rounded-md overflow-hidden shrink-0 border border-white/10">
                          <CharacterArtwork character={char} size="sm" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-white truncate text-xs">{char.name}</div>
                          <div className="text-[10px] text-cyan-400 truncate font-mono">★ {char.peakForm}</div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-1 text-[10px] text-slate-400 flex items-center justify-between border-t border-white/5 pt-1 font-mono">
                      <span className="truncate">{char.role || "Contender"}</span>
                      <span className="font-bold text-slate-200">
                        {char.attributes.overall || char.attributes.strength || 85} PWR
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION C: Add Players */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2 text-white">
                <span className="w-7 h-7 rounded-lg bg-amber-600/30 border border-amber-500/40 flex items-center justify-center text-xs text-amber-300">
                  C
                </span>
                Participants ({players.length} / 8 Players)
              </h2>

              {players.length < 8 && (
                <button
                  type="button"
                  onClick={handleAddPlayer}
                  className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-xs font-medium text-amber-300 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Player
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {players.map((p, idx) => (
                <div
                  key={p.id}
                  className="p-4 rounded-xl bg-[#121224] border border-[#2A2A4E] space-y-3 relative group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-7 h-7 rounded-full flex items-center justify-center text-sm shadow-md"
                        style={{ backgroundColor: p.color }}
                      >
                        {p.avatar}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">Player {idx + 1}</span>
                    </div>

                    {players.length > 2 && (
                      <button
                        type="button"
                        onClick={() => handleRemovePlayer(p.id)}
                        className="text-slate-500 hover:text-red-400 p-1 transition-colors"
                        title="Remove player"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <input
                    type="text"
                    value={p.name}
                    onChange={(e) => handlePlayerNameChange(p.id, e.target.value)}
                    placeholder="Enter display name"
                    className="w-full px-3 py-2 rounded-lg bg-[#0B0B14] border border-[#2A2A4E] text-white text-sm focus:outline-none focus:border-violet-500"
                  />

                  {/* Color & Avatar choices */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5">
                      {PRESET_PLAYER_COLORS.slice(0, 5).map((col) => (
                        <button
                          key={col}
                          type="button"
                          onClick={() => handlePlayerColorChange(p.id, col)}
                          className={`w-5 h-5 rounded-full transition-transform ${
                            p.color === col ? "scale-125 ring-2 ring-white" : "opacity-70 hover:opacity-100"
                          }`}
                          style={{ backgroundColor: col }}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-1">
                      {PRESET_AVATARS.slice(0, 4).map((av) => (
                        <button
                          key={av}
                          type="button"
                          onClick={() => handlePlayerAvatarChange(p.id, av)}
                          className={`text-xs px-1.5 py-0.5 rounded ${
                            p.avatar === av ? "bg-white/20 text-white" : "text-slate-400 hover:text-white"
                          }`}
                        >
                          {av}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION D: Starting Budget */}
          <section className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2 text-white">
              <span className="w-7 h-7 rounded-lg bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-xs text-emerald-300">
                D
              </span>
              Starting Budget:{" "}
              <span className="text-emerald-400 ml-1">
                {currencySymbol}
                {activeBudget}
              </span>
            </h2>

            <div className="p-4 rounded-xl bg-[#121224] border border-[#2A2A4E] space-y-4">
              <div className="flex flex-wrap gap-2">
                {PRESET_BUDGETS.map((amt) => {
                  const isSelected = selectedBudget === amt && !customBudget;
                  return (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        setSelectedBudget(amt);
                        setCustomBudget("");
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                        isSelected
                          ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/50"
                          : "bg-[#1A1A32] text-slate-300 hover:bg-[#252545] border border-[#2A2A4E]"
                      }`}
                    >
                      {currencySymbol}
                      {amt}
                    </button>
                  );
                })}

                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-xs text-slate-400">Custom:</span>
                  <input
                    type="number"
                    min="1"
                    placeholder="Custom"
                    value={customBudget}
                    onChange={(e) => setCustomBudget(e.target.value)}
                    className="w-24 px-3 py-1.5 rounded-lg bg-[#0B0B14] border border-[#2A2A4E] text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Currency Selector */}
              <div className="flex items-center gap-3 pt-2 border-t border-white/5 text-xs text-slate-400">
                <span>Currency Symbol:</span>
                {["$", "€", "£", "₹", "🪙"].map((curr) => (
                  <button
                    key={curr}
                    type="button"
                    onClick={() => setCurrencySymbol(curr)}
                    className={`px-2 py-0.5 rounded font-mono ${
                      currencySymbol === curr ? "bg-emerald-600/30 text-emerald-300 font-bold" : "hover:text-white"
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION E: Additional Settings */}
          <section className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2 text-white">
              <span className="w-7 h-7 rounded-lg bg-pink-600/30 border border-pink-500/40 flex items-center justify-center text-xs text-pink-300">
                E
              </span>
              Arena Rules & Mechanics
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#121224] border border-[#2A2A4E] text-xs">
              <div className="space-y-1">
                <label className="text-slate-400 font-semibold block">Auction Mode</label>
                <select
                  value={settings.auctionMode}
                  onChange={(e) => setSettings({ ...settings, auctionMode: e.target.value as AuctionMode })}
                  className="w-full px-3 py-2 rounded-lg bg-[#0B0B14] border border-[#2A2A4E] text-white focus:outline-none focus:border-violet-500"
                >
                  <option value="turn-based">Turn-Based Bidding</option>
                  <option value="open">Open Arena Bidding</option>
                </select>
                <p className="text-[10px] text-slate-500">
                  {settings.auctionMode === "turn-based"
                    ? "Players bid or pass in turn sequence"
                    : "Live open bidding until host closes"}
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-semibold block">Minimum Bid / Increment</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    value={settings.minimumBid}
                    onChange={(e) =>
                      setSettings({ ...settings, minimumBid: Math.max(1, parseInt(e.target.value, 10) || 1) })
                    }
                    className="w-1/2 px-3 py-2 rounded-lg bg-[#0B0B14] border border-[#2A2A4E] text-white"
                    title="Minimum Bid"
                  />
                  <input
                    type="number"
                    min="1"
                    value={settings.bidIncrement}
                    onChange={(e) =>
                      setSettings({ ...settings, bidIncrement: Math.max(1, parseInt(e.target.value, 10) || 1) })
                    }
                    className="w-1/2 px-3 py-2 rounded-lg bg-[#0B0B14] border border-[#2A2A4E] text-white"
                    title="Bid Increment"
                  />
                </div>
                <p className="text-[10px] text-slate-500">Min Bid / Step Increment</p>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-semibold block">Unsold Characters</label>
                <select
                  value={settings.allowUnsold ? "yes" : "no"}
                  onChange={(e) => setSettings({ ...settings, allowUnsold: e.target.value === "yes" })}
                  className="w-full px-3 py-2 rounded-lg bg-[#0B0B14] border border-[#2A2A4E] text-white focus:outline-none focus:border-violet-500"
                >
                  <option value="yes">Allow Unsold (Pass to Next)</option>
                  <option value="no">Require Sale</option>
                </select>
                <p className="text-[10px] text-slate-500">Handling when all bidders pass</p>
              </div>
            </div>
          </section>

          {/* SECTION F: Continue Button */}
          <div className="pt-4 border-t border-[#2A2A4E] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400 text-center sm:text-left">
              Session configured for <span className="text-white font-bold">{players.length} players</span> across{" "}
              <span className="text-cyan-400 font-bold">{characterCount} character auctions</span>.
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-base shadow-xl shadow-violet-900/40 flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>ENTER THE AUCTION ARENA</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

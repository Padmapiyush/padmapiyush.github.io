import React, { useState } from "react";
import { Character } from "@/types/game";
import { Shield, Sparkles, Trophy, Flame, Zap, Award, Film, Gamepad2 } from "lucide-react";

interface CharacterArtworkProps {
  character: Character;
  className?: string;
  size?: "sm" | "md" | "lg" | "spotlight";
}

export default function CharacterArtwork({
  character,
  className = "",
  size = "spotlight",
}: CharacterArtworkProps) {
  const [loadFailed, setLoadFailed] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Category Icon Resolver
  const getCategoryIcon = () => {
    switch (character.category) {
      case "marvel":
        return <Zap className="w-8 h-8 text-red-400" />;
      case "dc":
        return <Shield className="w-8 h-8 text-blue-400" />;
      case "anime":
        return <Flame className="w-8 h-8 text-amber-400" />;
      case "cricket":
      case "football":
      case "basketball":
        return <Trophy className="w-8 h-8 text-yellow-400" />;
      case "movies":
        return <Film className="w-8 h-8 text-cyan-400" />;
      case "gaming":
        return <Gamepad2 className="w-8 h-8 text-purple-400" />;
      default:
        return <Sparkles className="w-8 h-8 text-pink-400" />;
    }
  };

  const initials = character.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <div
      className={`relative w-full h-full overflow-hidden flex items-center justify-center bg-[#0B0B14] select-none ${className}`}
    >
      {/* 1. Real Character Image with Crossfade */}
      {!loadFailed && (
        <img
          src={character.imageUrl}
          alt={character.name}
          onLoad={() => setIsLoaded(true)}
          onError={() => setLoadFailed(true)}
          className={`w-full h-full object-cover object-top transition-all duration-700 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          loading="eager"
        />
      )}

      {/* 2. Loading Placeholder Skeleton */}
      {!isLoaded && !loadFailed && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#121226] via-[#1A1A38] to-[#0E0E1B] animate-pulse flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-2 border-violet-500/20 border-t-violet-400 animate-spin" />
        </div>
      )}

      {/* 3. Illustrated Aesthetic Canvas Fallback (if image fails or is offline) */}
      {loadFailed && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center overflow-hidden"
          style={{
            background: `radial-gradient(circle at 50% 35%, ${character.fallbackColor || "#8B5CF6"}33 0%, #0B0B14 85%)`,
          }}
        >
          {/* Animated Background Geometric Grid */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#8B5CF6_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {/* Central Emblem Badge */}
          <div
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl flex flex-col items-center justify-center shadow-2xl relative border border-white/20 mb-3 backdrop-blur-md transform hover:scale-105 transition-transform"
            style={{
              backgroundColor: `${character.fallbackColor || "#8B5CF6"}44`,
              boxShadow: `0 0 35px ${character.fallbackColor || "#8B5CF6"}55`,
            }}
          >
            <div className="p-2 rounded-xl bg-black/40 border border-white/10 mb-1">
              {getCategoryIcon()}
            </div>
            <span className="text-xl sm:text-2xl font-black font-mono tracking-wider text-white">
              {initials}
            </span>
          </div>

          {/* Character Label Details */}
          <div className="relative z-10 max-w-xs space-y-1">
            <span className="text-lg sm:text-xl font-black text-white tracking-tight drop-shadow-md block">
              {character.name}
            </span>
            <span
              className="text-xs font-semibold px-2.5 py-0.5 rounded-full inline-block font-mono border"
              style={{
                backgroundColor: `${character.fallbackColor || "#8B5CF6"}22`,
                borderColor: `${character.fallbackColor || "#8B5CF6"}55`,
                color: character.fallbackColor || "#C4B5FD",
              }}
            >
              ★ {character.peakForm}
            </span>
          </div>
        </div>
      )}

      {/* Ambient Gradient Overlays for High-Contrast Cinematic Polish */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#121224] via-transparent to-black/30 pointer-events-none" />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />
    </div>
  );
}

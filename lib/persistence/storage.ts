import { Game } from "@/types/game";

const STORAGE_KEY = "teamforge_active_game_session_v1";

export function saveGameState(game: Game): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(game));
  } catch (e) {
    console.warn("Failed to persist TeamForge session to localStorage", e);
  }
}

export function loadGameState(): Game | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Game;

    // Structural validation
    if (
      parsed &&
      parsed.id &&
      Array.isArray(parsed.players) &&
      parsed.players.length >= 2 &&
      Array.isArray(parsed.characters) &&
      parsed.settings &&
      ["setup", "auction", "results"].includes(parsed.status)
    ) {
      return parsed;
    }
  } catch (e) {
    console.warn("Corrupt TeamForge session in localStorage", e);
  }
  return null;
}

export function clearGameState(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn("Failed to clear TeamForge session from localStorage", e);
  }
}

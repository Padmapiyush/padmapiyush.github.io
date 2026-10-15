import { Character, GameCategory } from "@/types/game";
import { BUILT_IN_CATALOG, getCategoryCharacters } from "./catalog";

// Pre-configured rich character pools for popular custom universes
const POPULAR_CUSTOM_POOLS: Record<string, Character[]> = {
  "harry potter": [
    {
      id: "hp-albus",
      name: "Albus Dumbledore",
      category: "custom",
      universeName: "Harry Potter",
      imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
      fallbackColor: "#6366F1",
      description: "Supreme Mugwump, Grand Sorcerer, and master of the Elder Wand with peerless transfiguration mastery.",
      baseValue: 48,
      attributes: { strength: 65, speed: 88, intelligence: 99, durability: 82, combat: 96, special: 100, overall: 92 },
      peakForm: "Master of the Elder Wand & Fire Whip Mastery",
      abilities: ["Elder Wand Unstoppable Magic", "Fawkes Phoenix Fire Disapparation", "Flawless Non-Verbal Casting", "Master Transfiguration & Occlumency"],
      weaknesses: ["Deep remorse over past familial tragedies", "Mortal wizard aging body"],
      source: "Wizarding World",
      role: "Supreme Archmage",
    },
    {
      id: "hp-voldemort",
      name: "Lord Voldemort (Tom Riddle)",
      category: "custom",
      universeName: "Harry Potter",
      imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
      fallbackColor: "#15803D",
      description: "The Dark Lord who pushed the boundaries of Dark Magic further than anyone before, anchored by Horcruxes.",
      baseValue: 47,
      attributes: { strength: 70, speed: 89, intelligence: 95, durability: 94, combat: 95, special: 99, overall: 91 },
      peakForm: "Horcrux Immortal Dark Lord with Fiendfyre Serpent",
      abilities: ["Avada Kedavra Killing Curse", "Horcrux Immortality Anchors", "Flight without Broomstick", "Parseltongue Snake Command"],
      weaknesses: ["Inability to comprehend love and sacrificial protection", "Extreme arrogance"],
      source: "Wizarding World",
      role: "Dark Lord & Horcrux Sovereign",
    },
    {
      id: "hp-harry",
      name: "Harry Potter",
      category: "custom",
      universeName: "Harry Potter",
      imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80",
      fallbackColor: "#DC2626",
      description: "The Boy Who Lived, Master of Death, exceptional seeker, and head Auror.",
      baseValue: 40,
      attributes: { strength: 72, speed: 92, intelligence: 84, durability: 88, combat: 90, special: 92, overall: 87 },
      peakForm: "Master of Death (Three Hallows Combined)",
      abilities: ["Master of the Three Deathly Hallows", "Corporeal Stag Patronus Shield", "Lightning-Fast Wand Dueling Reflexes", "Supernatural Luck & Intuition"],
      weaknesses: ["Impulsive savior complex", "Straightforward spell repertoire"],
      source: "Wizarding World",
      role: "Chosen Seeker & Dueling Prodigy",
    },
    {
      id: "hp-severus",
      name: "Severus Snape",
      category: "custom",
      universeName: "Harry Potter",
      imageUrl: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=600&auto=format&fit=crop&q=80",
      fallbackColor: "#1E293B",
      description: "Potions master, creator of Sectumsempra, and supreme double-agent with impenetrable Occlumency.",
      baseValue: 42,
      attributes: { strength: 68, speed: 86, intelligence: 98, durability: 80, combat: 94, special: 95, overall: 89 },
      peakForm: "Half-Blood Prince Dueling & Flight Form",
      abilities: ["Impenetrable Occlumency Mind Shield", "Sectumsempra Dark Slicing Curse", "Master Alchemical Potions", "Unsupported Atmospheric Flight"],
      weaknesses: ["Bitterness and brooding isolation", "Mortal human vulnerabilities"],
      source: "Wizarding World",
      role: "Master Spy & Dark Spell Innovator",
    },
  ],
  "mythology": [
    {
      id: "my-zeus",
      name: "Zeus, King of Olympus",
      category: "custom",
      universeName: "Greek Mythology",
      imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
      fallbackColor: "#EAB308",
      description: "Father of gods and men, ruler of Mount Olympus, brandishing the Master Thunderbolt.",
      baseValue: 50,
      attributes: { strength: 99, speed: 95, intelligence: 91, durability: 98, combat: 94, special: 100, overall: 96 },
      peakForm: "Titanomachy Victor / Primordial Lightning Discharge",
      abilities: ["Master Thunderbolt Smite", "Total Weather & Sky Authority", "Polymorphic Divine Shapeshifting", "Olympian Godhead Immortality"],
      weaknesses: ["Ego and susceptibility to petty rivalries", "Prophecy of succession"],
      source: "Greek Mythos",
      role: "Sky Father & Olympian Sovereign",
    },
    {
      id: "my-hades",
      name: "Hades, Lord of the Underworld",
      category: "custom",
      universeName: "Greek Mythology",
      imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
      fallbackColor: "#475569",
      description: "The Unseen Lord of the Dead, ruler of the Underworld and master of Earth's subterranean riches.",
      baseValue: 48,
      attributes: { strength: 95, speed: 88, intelligence: 97, durability: 98, combat: 91, special: 99, overall: 94 },
      peakForm: "Helm of Darkness Active with Cerberus Vanguard",
      abilities: ["Helm of Invisibility & Terror", "Infinite Army of the Dead Summoning", "Earth's Mineral Wealth Command", "Necrotic Soul Banishment"],
      weaknesses: ["Bound by sacred oaths of the Underworld", "Rarely leaves his chthonic realm"],
      source: "Greek Mythos",
      role: "Chthonic Sovereign & Necromancer",
    },
    {
      id: "my-poseidon",
      name: "Poseidon, Earthshaker",
      category: "custom",
      universeName: "Greek Mythology",
      imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80",
      fallbackColor: "#0284C7",
      description: "Lord of the oceans, creator of horses, capable of fracturing continents with his divine trident.",
      baseValue: 48,
      attributes: { strength: 98, speed: 90, intelligence: 88, durability: 96, combat: 93, special: 98, overall: 94 },
      peakForm: "Oceanic Tempest Earthshaker Form",
      abilities: ["Tectonic Continental Earthquake Strike", "Abyssal Megatsunami Wave", "Creation and Command of Warhorses", "Oceanic Dominion"],
      weaknesses: ["Volatile and wrathful temperament", "Territorial conflicts with Athena"],
      source: "Greek Mythos",
      role: "Earthshaker & Oceanic Titan",
    },
  ],
};

// Generates procedural characters if a brand-new custom universe is supplied
function generateProceduralCharacters(universeName: string, count: number): Character[] {
  const archetypes = [
    { title: "Champion", role: "Vanguard", color: "#8B5CF6", attr: { strength: 94, speed: 88, intelligence: 85, durability: 92, combat: 95, special: 90 } },
    { title: "Sage", role: "Tactician", color: "#06B6D4", attr: { strength: 70, speed: 82, intelligence: 99, durability: 80, combat: 85, special: 98 } },
    { title: "Shadow", role: "Infiltrator", color: "#10B981", attr: { strength: 80, speed: 98, intelligence: 90, durability: 75, combat: 96, special: 88 } },
    { title: "Titan", role: "Juggernaut", color: "#EF4444", attr: { strength: 99, speed: 72, intelligence: 76, durability: 100, combat: 88, special: 85 } },
    { title: "Oracle", role: "Controller", color: "#F59E0B", attr: { strength: 65, speed: 85, intelligence: 96, durability: 78, combat: 80, special: 100 } },
    { title: "Warlord", role: "Commander", color: "#EC4899", attr: { strength: 92, speed: 86, intelligence: 94, durability: 91, combat: 97, special: 89 } },
    { title: "Striker", role: "Finisher", color: "#EAB308", attr: { strength: 88, speed: 95, intelligence: 84, durability: 82, combat: 94, special: 91 } },
    { title: "Mystic", role: "Spellweaver", color: "#6366F1", attr: { strength: 68, speed: 84, intelligence: 95, durability: 83, combat: 82, special: 99 } },
  ];

  const characters: Character[] = [];
  const safeCount = Math.max(4, Math.min(count, 20));

  for (let i = 0; i < safeCount; i++) {
    const arch = archetypes[i % archetypes.length];
    const indexSuffix = Math.floor(i / archetypes.length) > 0 ? ` ${Math.floor(i / archetypes.length) + 1}` : "";
    const name = `${universeName} ${arch.title}${indexSuffix}`;
    const baseVal = 35 + ((i * 7 + 13) % 15);
    const overall = Math.round(
      (arch.attr.strength + arch.attr.speed + arch.attr.intelligence + arch.attr.durability + arch.attr.combat + arch.attr.special) / 6
    );

    characters.push({
      id: `gen-${universeName.toLowerCase().replace(/\s+/g, "-")}-${i + 1}`,
      name,
      category: "custom",
      universeName,
      imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80",
      fallbackColor: arch.color,
      description: `Eminent ${arch.role.toLowerCase()} from the ${universeName} universe, embodying peak ${arch.title.toLowerCase()} attributes.`,
      baseValue: baseVal,
      attributes: { ...arch.attr, overall },
      peakForm: `Ascended ${universeName} Resonance Form`,
      abilities: [`Signature ${universeName} Strike`, `Aura of the ${arch.title}`, `Tactical Mastery`, `Peak Unleashed Focus`],
      weaknesses: [`High energy expenditure in ascended state`, `Specialized vulnerabilities against opposing elements`],
      source: universeName,
      role: arch.role,
    });
  }

  return characters;
}

// Fisher-Yates shuffle algorithm
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Main character pool generator
export function getCharactersForGame(
  category: GameCategory,
  customName?: string,
  count: number = 10
): Character[] {
  if (category === "custom") {
    const query = (customName || "").trim().toLowerCase();
    // Check if we have a pre-configured pool
    for (const [key, pool] of Object.entries(POPULAR_CUSTOM_POOLS)) {
      if (query.includes(key) || key.includes(query)) {
        const shuffled = shuffleArray(pool);
        if (shuffled.length >= count) {
          return shuffled.slice(0, count);
        }
        // Expand if needed
        const extra = generateProceduralCharacters(customName || "Custom Universe", count - shuffled.length);
        return [...shuffled, ...extra];
      }
    }

    // Otherwise generate procedural pool for this universe
    return generateProceduralCharacters(customName || "Custom Universe", count);
  }

  const basePool = getCategoryCharacters(category);
  const shuffled = shuffleArray(basePool);
  
  if (shuffled.length >= count) {
    return shuffled.slice(0, count);
  }

  // If requested count exceeds base pool, clone with ascended designations to prevent duplicates
  const result: Character[] = [...shuffled];
  let cycle = 1;
  while (result.length < count) {
    for (const char of shuffled) {
      if (result.length >= count) break;
      result.push({
        ...char,
        id: `${char.id}-ascended-${cycle}`,
        name: `${char.name} (Variant Prime)`,
        peakForm: `${char.peakForm} [Dimensional Variant]`,
        baseValue: Math.min(50, char.baseValue + 2),
      });
    }
    cycle++;
  }

  return result.slice(0, count);
}

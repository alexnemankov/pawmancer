import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Hero } from "../types/game";
import HeroCard from "./HeroCard";

interface HeroSelectScreenProps {
  heroes: Hero[];
  onSelectHero: (hero: Hero) => void;
}

export default function HeroSelectScreen({
  heroes,
  onSelectHero,
}: HeroSelectScreenProps) {
  const [highlightedHero, setHighlightedHero] = useState<string | null>(null);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-6xl font-bold text-white mb-4 flex items-center gap-3">
        <Sparkles size={48} />
        Pawmancer
      </h1>
      <p className="text-2xl text-purple-200 mb-8">Choose Your Hero</p>
      <div className="flex flex-wrap items-stretch justify-center gap-8 w-full max-w-5xl">
        {heroes.map((hero) => (
          <HeroCard
            key={hero.id}
            hero={hero}
            onClick={() => onSelectHero(hero)}
            isHighlighted={highlightedHero === hero.id}
            onHover={() => setHighlightedHero(hero.id)}
            onBlur={() => setHighlightedHero(null)}
          />
        ))}
      </div>
    </div>
  );
}


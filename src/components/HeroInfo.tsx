import { Heart } from "lucide-react";
import { Hero } from "../types/game";

interface HeroInfoProps {
  hero: Hero;
  health: number;
  treats?: number;
  maxTreats?: number;
  iconSize?: number;
  showTreats?: boolean;
}

export default function HeroInfo({
  hero,
  health,
  treats,
  maxTreats,
  iconSize = 24,
  showTreats = false,
}: HeroInfoProps) {
  const Icon = hero.icon;

  return (
    <div className="text-white flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Icon size={iconSize} className="text-white" />
        <div>
          <div className="font-bold">{hero.name}</div>
          <div className="text-xs opacity-75">{hero.breed}</div>
        </div>
      </div>
      <div className="flex items-center bg-green-600 px-4 py-2 rounded">
        <Heart className="mr-2" />
        <span className="font-bold text-xl">{health}</span>
      </div>
      {showTreats && treats !== undefined && maxTreats !== undefined && (
        <div className="flex items-center bg-amber-600 px-4 py-2 rounded">
          <span className="mr-2">🦴</span>
          <span className="font-bold text-xl">
            {treats}/{maxTreats}
          </span>
        </div>
      )}
    </div>
  );
}


import { Heart } from "lucide-react";
import { Hero } from "../types/game";

interface HeroInfoProps {
  hero: Hero;
  health: number;
  treats?: number;
  maxTreats?: number;
  iconSize?: number;
  showTreats?: boolean;
  layout?: "row" | "column";
}

export default function HeroInfo({
  hero,
  health,
  treats,
  maxTreats,
  iconSize = 24,
  showTreats = false,
  layout = "row",
  compact = false,
}: HeroInfoProps & { compact?: boolean }) {
  const Icon = hero.icon;
  const isColumn = layout === "column";

  return (
    <div
      className={
        isColumn
          ? "flex flex-col gap-3 text-white"
          : `flex items-center ${compact ? "gap-2" : "gap-4"} text-white`
      }
    >
      <div
        className={
          isColumn
            ? "flex items-center gap-3"
            : `flex items-center ${compact ? "gap-2" : "gap-2"}`
        }
      >
        <Icon size={compact ? iconSize * 0.8 : iconSize} className="text-white drop-shadow" />
        <div>
          <div
            className={
              isColumn
                ? "text-xs uppercase tracking-[0.3em] text-white/70"
                : `text-xs opacity-75 ${compact ? "hidden sm:block" : ""}`
            }
          >
            {hero.breed}
          </div>
          <div className={isColumn ? "text-xl font-black" : `font-bold ${compact ? "text-sm" : ""}`}>
            {hero.name}
          </div>
        </div>
      </div>
      <div
        className={`flex items-center rounded-2xl bg-green-600/80 font-bold ${isColumn
            ? "text-2xl justify-between px-4 py-2"
            : `${compact ? "px-2 py-1 text-sm" : "px-4 py-2 text-xl"}`
          }`}
      >
        <span className="flex items-center gap-2 text-white">
          <Heart size={compact ? 14 : 20} />
          {health}
        </span>
      </div>
      {showTreats && treats !== undefined && maxTreats !== undefined && (
        <div className={`flex items-center justify-between rounded-2xl bg-amber-500/80 font-bold text-white ${compact ? "px-2 py-1" : "px-4 py-2 w-full"
          }`}>
          <span className={`text-sm uppercase tracking-[0.3em] ${compact ? "hidden" : ""}`}>Treats</span>
          <span className={compact ? "text-sm" : "text-xl"}>
            {treats}/{maxTreats}
          </span>
        </div>
      )}
    </div>
  );
}

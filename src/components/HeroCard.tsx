import {
  Cookie,
  Crown,
  Heart,
  Shield,
  Sword,
  Zap,
  LucideIcon,
} from "lucide-react";
import { Hero } from "../types/game";

interface HeroCardProps {
  hero: Hero;
  onClick: () => void;
  isHighlighted?: boolean;
  onHover?: () => void;
  onBlur?: () => void;
}

const abilityIcons: Record<string, LucideIcon> = {
  warrior: Sword,
  healer: Shield,
  rogue: Zap,
};

const difficultyStyles: Record<string, string> = {
  Easy: "from-emerald-500/30 to-emerald-400/20 text-emerald-100 border-emerald-200/80",
  Balanced:
    "from-sky-500/30 to-indigo-400/20 text-sky-50 border-sky-200/80",
  Advanced:
    "from-rose-500/30 to-orange-400/20 text-rose-50 border-rose-200/80",
};

export default function HeroCard({
  hero,
  onClick,
  isHighlighted = false,
  onHover,
  onBlur,
}: HeroCardProps) {
  const Icon = hero.icon;
  const AbilityIcon = abilityIcons[hero.id] || Crown;
  const badgeStyle =
    difficultyStyles[hero.difficulty] ||
    "from-slate-500/40 to-slate-600/20 text-slate-100 border-white/20";

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onHover}
      onFocus={onHover}
      onMouseLeave={onBlur}
      onBlur={onBlur}
      className={`group relative flex h-full min-h-[520px] w-72 flex-col gap-5 overflow-hidden rounded-[34px] border-2 border-white/15 bg-gradient-to-br ${hero.color} px-6 py-8 text-left transition-all duration-200 hover:-translate-y-1 hover:border-white/50 focus-visible:ring-4 focus-visible:ring-white/60 ${
        isHighlighted ? "ring-4 ring-amber-300 shadow-amber-500/30" : ""
      }`}
      aria-pressed={isHighlighted}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="absolute inset-[-40%] bg-white/10 blur-3xl" />
      </div>

      <div className="mb-4 flex w-full flex-wrap items-center gap-3 text-white">
        <span className="rounded-full border px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] whitespace-nowrap">
          {hero.breed}
        </span>
        <span
          className={`ml-auto rounded-full border bg-gradient-to-r px-3 py-1 text-xs font-semibold whitespace-nowrap ${badgeStyle}`}
        >
          {hero.difficulty}
        </span>
      </div>

      <div className="mb-5 flex flex-col items-center text-white">
        <Icon size={56} className="drop-shadow-lg" />
        <h3 className="mt-4 text-2xl font-black tracking-tight">
          {hero.name}
        </h3>
      </div>

      <div className="mb-4 flex items-center justify-between text-white/90">
        <div className="flex items-center gap-2">
          <Heart size={18} />
          <span className="text-sm font-semibold">{hero.health} HP</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Cookie size={18} />
          <span>
            {hero.abilityCost} Treat{hero.abilityCost !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 rounded-2xl bg-black/30 p-4 text-white shadow-inner min-h-[110px]">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
          <AbilityIcon size={18} />
          Hero Ability
        </div>
        <p className="text-base font-semibold leading-snug text-white">
          {hero.ability}
        </p>
      </div>

      <div className="mt-4 w-full text-center text-xs font-semibold uppercase tracking-[0.4em] text-white/80">
        Tap to Lead
      </div>
    </button>
  );
}

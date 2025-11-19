import { Sword, Heart } from "lucide-react";
import { Card as CardType } from "../types/game";
import { getCardTypeColor } from "../utils/cardColors";

interface CardProps {
  card: CardType;
  onClick?: () => void;
  disabled?: boolean;
  isSelected?: boolean;
  showCost?: boolean;
  canAttack?: boolean;
  scale?: number;
  id?: string;
  isValidTarget?: boolean;
}

export default function Card({
  card,
  onClick,
  disabled = false,
  isSelected = false,
  showCost = true,
  canAttack = false,
  scale = 1,
  id,
  isValidTarget = false,
}: CardProps) {
  const cardColor = getCardTypeColor(card.cardType, card.type);
  const isReadyToPlay = !disabled && !isSelected && !canAttack && !isValidTarget;
  const shouldPulse = canAttack;

  // Rarity visual styles
  const getRarityStyles = (rarity: string = "common") => {
    switch (rarity) {
      case "legendary":
        return {
          border: "border-amber-400",
          shadow: "shadow-amber-900/50",
          gem: "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]",
          bg: "bg-gradient-to-b from-amber-900/80 to-slate-900",
        };
      case "epic":
        return {
          border: "border-purple-400",
          shadow: "shadow-purple-900/50",
          gem: "bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]",
          bg: "bg-gradient-to-b from-purple-900/80 to-slate-900",
        };
      case "rare":
        return {
          border: "border-blue-400",
          shadow: "shadow-blue-900/50",
          gem: "bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.8)]",
          bg: "bg-gradient-to-b from-blue-900/80 to-slate-900",
        };
      default: // common
        return {
          border: "border-slate-600",
          shadow: "shadow-slate-900/50",
          gem: "bg-white/30",
          bg: "",
        };
    }
  };

  const rarityStyles = getRarityStyles(card.rarity);

  return (
    <div
      id={id}
      onClick={onClick}
      style={{
        transform: `scale(${scale}) perspective(1000px)`,
      }}
      className={`group relative w-40 h-56 rounded-xl cursor-pointer transition-all duration-300 ease-out origin-center select-none will-change-transform
        ${disabled ? "opacity-60 cursor-not-allowed grayscale-[0.8]" : "hover:z-50 hover:-translate-y-3 hover:rotate-x-6 hover:shadow-2xl hover:shadow-black/60"}
        ${isSelected ? "ring-4 ring-yellow-400 scale-[1.05] z-10 shadow-[0_0_30px_rgba(250,204,21,0.5)]" : ""}
        ${shouldPulse ? "ring-4 ring-red-500 shadow-[0_0_20px_rgba(239,68,68,0.6)] animate-pulse" : ""}
        ${isValidTarget ? "ring-4 ring-red-500 cursor-crosshair shadow-[0_0_25px_rgba(239,68,68,0.8)] hover:scale-[1.05]" : ""}
        ${isReadyToPlay ? "hover:ring-2 hover:ring-white/60" : ""}
        bg-gradient-to-br ${cardColor} shadow-lg border ${rarityStyles.border} overflow-hidden`}
    >
      {/* Card Content Container */}
      <div className="flex flex-col h-full p-2 gap-0.5 relative z-10">

        {/* Header: Cost & Name */}
        <div className="flex justify-between items-start h-6">
          {showCost && (
            <div className="w-7 h-7 -ml-1 -mt-1 bg-amber-500 rounded-full flex items-center justify-center font-black text-white text-base shadow-md border-2 border-amber-600 z-20">
              {card.cost}
            </div>
          )}
          <div className="flex-1 text-right pt-1 pr-1">
            {/* Rarity Gem */}
            <div className={`inline-block w-2.5 h-2.5 rotate-45 rounded-sm ${rarityStyles.gem} border border-white/20 transition-all duration-300`} />
          </div>
        </div>

        {/* Illustration Zone */}
        <div className="flex-1 flex flex-col items-center justify-center -mt-2 min-h-0">
          <div className="text-5xl drop-shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-xl">
            {card.art}
          </div>
        </div>

        {/* Info Zone */}
        <div className="flex flex-col gap-1 mt-auto">
          {/* Name & Subclass */}
          <div className="text-center">
            <div className="font-black text-white text-xs tracking-wide leading-tight drop-shadow-sm line-clamp-1 px-1">
              {card.name}
            </div>
            {card.cardType === "dog" && (
              <div className="text-[9px] font-bold uppercase tracking-widest text-white/60 mt-0.5">
                {card.type}
              </div>
            )}
            {(card.cardType === "spell" || card.cardType === "item") && (
              <div className="text-[9px] font-bold uppercase tracking-widest text-white/60 mt-0.5">
                {card.cardType}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent my-0.5" />

          {/* Stats (Dogs only) */}
          {card.cardType === "dog" && (
            <div className="flex justify-center gap-2 my-0.5">
              <div className="flex items-center justify-center gap-1 bg-slate-900/60 px-2 py-0.5 rounded-full shadow-inner border border-white/5 backdrop-blur-sm">
                <Sword size={10} className="text-yellow-400 fill-yellow-400" />
                <span className="font-black text-white text-xs">{card.attack}</span>
              </div>
              <div className="flex items-center justify-center gap-1 bg-slate-900/60 px-2 py-0.5 rounded-full shadow-inner border border-white/5 backdrop-blur-sm">
                <Heart size={10} className="text-red-400 fill-red-400" />
                <span className="font-black text-white text-xs">{card.health}</span>
              </div>
            </div>
          )}

          {/* Ability Box */}
          <div className="relative h-14 bg-gradient-to-br from-slate-900/90 to-slate-800/90 rounded-lg p-1.5 border border-white/10 shadow-inner flex items-center justify-center text-center overflow-hidden">
            <p className="text-[9px] leading-tight text-slate-200 font-medium line-clamp-3">
              {card.ability}
            </p>
          </div>
        </div>
      </div>

      {/* Shine/Glow Overlay (Decoration) */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500" />
    </div>
  );
}

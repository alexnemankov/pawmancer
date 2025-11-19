import { Zap, Heart } from "lucide-react";
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

  return (
    <div
      id={id}
      onClick={onClick}
      style={{ transform: `scale(${scale})` }}
      className={`relative w-32 h-44 rounded-lg p-2 cursor-pointer transition-all duration-200 origin-center
        ${disabled ? "opacity-50 cursor-not-allowed grayscale-[0.5]" : "hover:z-10 hover:-translate-y-2 hover:shadow-xl hover:shadow-black/50"}
        ${isSelected ? "ring-4 ring-yellow-400 scale-[1.05] z-10 shadow-[0_0_20px_rgba(250,204,21,0.6)]" : ""}
        ${canAttack ? "ring-4 ring-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)] animate-pulse" : ""}
        ${isValidTarget ? "ring-4 ring-red-500 cursor-crosshair shadow-[0_0_20px_rgba(239,68,68,0.8)] hover:scale-[1.05]" : ""}
        ${!disabled && !isSelected && !canAttack && !isValidTarget ? "hover:ring-2 hover:ring-white/50" : ""}
        bg-gradient-to-br ${cardColor} shadow-lg`}
    >
      {showCost && (
        <div className="absolute -top-2 -left-2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center font-bold text-white border-2 border-amber-600">
          {card.cost}
        </div>
      )}
      <div className="text-white text-center">
        <div className="text-3xl mb-1">{card.art}</div>
        <div className="font-bold text-xs mb-1">{card.name}</div>
        {card.cardType === "dog" && (
          <>
            <div className="text-xs opacity-90 mb-1">{card.type}</div>
            <div className="flex justify-center gap-2 my-1">
              <div className="flex items-center bg-black/30 px-2 py-1 rounded">
                <Zap size={10} className="mr-1" />
                <span className="font-bold text-xs">{card.attack}</span>
              </div>
              <div className="flex items-center bg-black/30 px-2 py-1 rounded">
                <Heart size={10} className="mr-1" />
                <span className="font-bold text-xs">{card.health}</span>
              </div>
            </div>
          </>
        )}
        {(card.cardType === "spell" || card.cardType === "item") && (
          <div className="text-xs font-bold opacity-90 mb-1 uppercase">
            {card.cardType}
          </div>
        )}
        <div className="text-xs bg-black/40 rounded p-1 mt-1 h-12 overflow-hidden">
          {card.ability}
        </div>
      </div>
    </div>
  );
}

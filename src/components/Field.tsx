import Card from "./Card";
import { Card as CardType } from "../types/game";

interface FieldProps {
  cards: CardType[];
  onCardClick?: (card: CardType) => void;
  showCost?: boolean;
  selectedCardId?: string;
  canAttackIds?: Set<string>;
  title?: string;
  className?: string;
}

export default function Field({
  cards,
  onCardClick,
  showCost = false,
  selectedCardId,
  canAttackIds,
  title,
  className = "",
}: FieldProps) {
  return (
    <div className={className}>
      {title && (
        <div className="text-white text-lg font-bold mb-2">{title}</div>
      )}
      <div className="flex gap-2 flex-wrap min-h-[180px]">
        {cards.map((card) => (
          <Card
            key={card.uid}
            card={card}
            onClick={() => onCardClick?.(card)}
            showCost={showCost}
            isSelected={selectedCardId === card.uid}
            canAttack={canAttackIds?.has(card.uid || "") || false}
          />
        ))}
      </div>
    </div>
  );
}


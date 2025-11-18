interface GameActionsProps {
  onHeroAbility: () => void;
  onEndTurn: () => void;
  onAttackEnemy: () => void;
  heroAbilityCost?: number;
  isPlayerTurn: boolean;
  canUseHeroAbility: boolean;
  canAttackEnemy: boolean;
}

export default function GameActions({
  onHeroAbility,
  onEndTurn,
  onAttackEnemy,
  heroAbilityCost,
  isPlayerTurn,
  canUseHeroAbility,
  canAttackEnemy,
}: GameActionsProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onHeroAbility}
        disabled={!canUseHeroAbility}
        className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-lg font-bold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Hero Power ({heroAbilityCost}🦴)
      </button>
      <button
        onClick={onEndTurn}
        disabled={!isPlayerTurn}
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
      >
        End Turn
      </button>
      <button
        onClick={onAttackEnemy}
        disabled={!canAttackEnemy}
        className="bg-gradient-to-r from-red-500 to-orange-600 text-white px-6 py-3 rounded-lg font-bold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Attack Enemy
      </button>
    </div>
  );
}


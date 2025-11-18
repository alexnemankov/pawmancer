import { Hero, Card as CardType } from "../types/game";
import GameHeader from "./GameHeader";
import HeroInfo from "./HeroInfo";
import Field from "./Field";
import GameActions from "./GameActions";
import Card from "./Card";

interface GameBoardProps {
  turn: number;
  isPlayerTurn: boolean;
  message: string;
  onQuit: () => void;
  onOpenTutorial: () => void;
  playerHero: Hero;
  enemyHero: Hero;
  playerHealth: number;
  enemyHealth: number;
  playerTreats: number;
  maxTreats: number;
  playerField: CardType[];
  enemyField: CardType[];
  playerHand: CardType[];
  selectedCard: CardType | null;
  selectedAttacker: CardType | null;
  onPlayerFieldCardClick: (card: CardType) => void;
  onEnemyFieldCardClick: (card: CardType) => void;
  onHandCardClick: (card: CardType) => void;
  onHeroAbility: () => void;
  onEndTurn: () => void;
  onAttackEnemy: () => void;
  canUseHeroAbility: boolean;
  canAttackEnemy: boolean;
  showGuidedHints: boolean;
  onDismissGuidedHints: () => void;
}

export default function GameBoard({
  turn,
  isPlayerTurn,
  message,
  onQuit,
  onOpenTutorial,
  playerHero,
  enemyHero,
  playerHealth,
  enemyHealth,
  playerTreats,
  maxTreats,
  playerField,
  enemyField,
  playerHand,
  selectedCard,
  selectedAttacker,
  onPlayerFieldCardClick,
  onEnemyFieldCardClick,
  onHandCardClick,
  onHeroAbility,
  onEndTurn,
  onAttackEnemy,
  canUseHeroAbility,
  canAttackEnemy,
  showGuidedHints,
  onDismissGuidedHints,
}: GameBoardProps) {
  const canAttackIds = new Set(
    playerField
      .filter((c) => c.canAttack && !c.hasAttacked && isPlayerTurn)
      .map((c) => c.uid || "")
  );

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 p-4">
      <GameHeader
        turn={turn}
        isPlayerTurn={isPlayerTurn}
        message={message}
        onQuit={onQuit}
        onOpenTutorial={onOpenTutorial}
        showTutorialPulse={showGuidedHints}
      />

      {/* Enemy Section */}
      {showGuidedHints && (
        <div className="mb-2 rounded-lg border border-cyan-400/60 bg-cyan-500/10 p-3 text-sm text-cyan-100">
          <span className="font-semibold">Step 1:</span> Watch the{" "}
          <span className="font-semibold">enemy row</span> to track the dogs you
          must defeat before striking their hero.
        </div>
      )}
      <div className="mb-6 bg-red-900/20 border-2 border-red-500 rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <HeroInfo hero={enemyHero} health={enemyHealth} />
          <div className="text-white text-xl font-bold">Enemy</div>
        </div>
        <Field
          cards={enemyField}
          onCardClick={onEnemyFieldCardClick}
          showCost={false}
        />
      </div>

      {/* Player Field Section */}
      {showGuidedHints && (
        <div className="mb-2 rounded-lg border border-emerald-400/60 bg-emerald-400/10 p-3 text-sm text-emerald-100">
          <span className="font-semibold">Step 2:</span> Play dogs to this{" "}
          <span className="font-semibold">battlefield</span>. Ready dogs highlight
          in teal—select one and then choose an enemy to attack.
        </div>
      )}
      <div className="mb-6 bg-blue-900/20 border-2 border-blue-500 rounded-lg p-4">
        <Field
          cards={playerField}
          onCardClick={onPlayerFieldCardClick}
          showCost={false}
          selectedCardId={selectedAttacker?.uid}
          canAttackIds={canAttackIds}
          title="Your Dogs"
        />
      </div>

      {/* Player Section */}
      <div className="bg-green-900/20 border-2 border-green-500 rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <HeroInfo
            hero={playerHero}
            health={playerHealth}
            treats={playerTreats}
            maxTreats={maxTreats}
            showTreats={true}
          />
          <GameActions
            onHeroAbility={onHeroAbility}
            onEndTurn={onEndTurn}
            onAttackEnemy={onAttackEnemy}
            heroAbilityCost={playerHero?.abilityCost}
            isPlayerTurn={isPlayerTurn}
            canUseHeroAbility={canUseHeroAbility}
            canAttackEnemy={canAttackEnemy}
          />
        </div>
        {showGuidedHints && (
          <div className="mb-4 rounded-lg border border-amber-300/60 bg-amber-200/10 p-3 text-sm text-amber-100">
            <span className="font-semibold">Step 3:</span> Use your{" "}
            <span className="font-semibold">Hero Ability</span> for unique perks
            and press <span className="font-semibold">End Turn</span> once
            you&apos;ve played cards.
          </div>
        )}
        <div className="text-white text-lg font-bold mb-2">Your Hand</div>
        {showGuidedHints && (
          <div className="mb-2 rounded-lg border border-purple-300/60 bg-purple-200/10 p-3 text-sm text-purple-100">
            <span className="font-semibold">Step 4:</span> Click a card in your
            hand to play it. Costs are shown in the top-left corner and spend
            Treats.
          </div>
        )}
        <div className="flex gap-2 flex-wrap">
          {playerHand.map((card) => (
            <Card
              key={card.uid}
              card={card}
              onClick={() => onHandCardClick(card)}
              disabled={!isPlayerTurn || playerTreats < card.cost}
              isSelected={selectedCard?.uid === card.uid}
            />
          ))}
        </div>
        {showGuidedHints && (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onDismissGuidedHints}
              className="rounded-full border border-white/50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-white/10"
            >
              Hide Tips
            </button>
            <p className="text-xs text-white/70">
              You can reopen the tutorial anytime from the top bar.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}


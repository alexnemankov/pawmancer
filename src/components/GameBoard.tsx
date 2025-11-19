import { Hero, Card as CardType } from "../types/game";
import { useState, useEffect } from "react";
import GameHeader from "./GameHeader";
import HeroInfo from "./HeroInfo";
import Field from "./Field";
import Card from "./Card";
import TargetingArrow from "./TargetingArrow";

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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [attackerPos, setAttackerPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Update attacker position when selectedAttacker changes
  useEffect(() => {
    if (selectedAttacker?.uid) {
      // Find the element for the selected attacker
      // This is a bit hacky, ideally we'd use refs, but for now we'll query by ID if we add one to Card
      // Or we can just center it on the screen for now as a fallback, but let's try to get the element
      const element = document.getElementById(`card-${selectedAttacker.uid}`);
      if (element) {
        const rect = element.getBoundingClientRect();
        setAttackerPos({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
    }
  }, [selectedAttacker]);

  const canAttackIds = new Set(
    playerField
      .filter((c) => c.canAttack && !c.hasAttacked && isPlayerTurn)
      .map((c) => c.uid || "")
  );

  // If an attacker is selected, all enemy cards are valid targets (simplification)
  const validTargetIds = new Set(
    selectedAttacker ? enemyField.map((c) => c.uid || "") : []
  );

  return (
    <div className="flex h-screen w-full flex-col bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 overflow-hidden">
      {selectedAttacker && (
        <TargetingArrow start={attackerPos} end={mousePos} />
      )}

      <GameHeader
        turn={turn}
        isPlayerTurn={isPlayerTurn}
        message={message}
        onQuit={onQuit}
        onOpenTutorial={onOpenTutorial}
        showTutorialPulse={showGuidedHints}
      />

      <div className="flex flex-1 flex-col gap-2 p-4 overflow-y-auto">
        {/* TOP: Enemy Section */}
        <section className="relative flex-none rounded-3xl border border-red-500/30 bg-red-900/20 p-4 shadow-inner shadow-red-900/20">
          {/* Enemy Hero Info Overlay or Header */}
          <div className="mb-2 flex items-center justify-between">
            <HeroInfo
              hero={enemyHero}
              health={enemyHealth}
              iconSize={24}
              layout="row"
              compact
            />
            <div className="text-xs uppercase tracking-[0.3em] text-white/60">
              Enemy Field
            </div>
          </div>

          <Field
            cards={enemyField}
            onCardClick={onEnemyFieldCardClick}
            showCost={false}
            validTargetIds={validTargetIds}
          />
        </section>

        {/* MIDDLE: Player Field */}
        <section className="flex-1 rounded-3xl border border-blue-500/30 bg-blue-900/20 p-4 shadow-inner shadow-blue-900/20 min-h-[150px]">
          <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/60">
            <span>Your Dogs</span>
            <span>{playerField.length}/7</span>
          </div>
          <Field
            cards={playerField}
            onCardClick={onPlayerFieldCardClick}
            showCost={false}
            selectedCardId={selectedAttacker?.uid}
            canAttackIds={canAttackIds}
          />
        </section>

        {/* BOTTOM: Player Hand & Controls */}
        <section className="flex-none space-y-2">
          {/* Hand */}
          <div className="rounded-3xl border border-green-500/30 bg-green-900/20 p-3 shadow-inner shadow-green-900/20">
            <div className="mb-2 flex items-center justify-between">
              <div className="text-sm font-bold text-white">Your Hand</div>
              <div className="text-xs uppercase tracking-[0.3em] text-white/60">
                {playerHand.length}/10
              </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {playerHand.map((card) => (
                <Card
                  key={card.uid}
                  id={`card-${card.uid}`} // Add ID for targeting
                  card={card}
                  onClick={() => onHandCardClick(card)}
                  disabled={!isPlayerTurn || playerTreats < card.cost}
                  isSelected={selectedCard?.uid === card.uid}
                  scale={0.85}
                />
              ))}
            </div>
          </div>

          {/* Player Controls Bar */}
          <div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-slate-900/60 p-3 shadow-lg backdrop-blur-sm">
            {/* Player Hero Info */}
            <div className="flex-1">
              <HeroInfo
                hero={playerHero}
                health={playerHealth}
                treats={playerTreats}
                maxTreats={maxTreats}
                showTreats
                iconSize={32}
                layout="row"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={onHeroAbility}
                disabled={!canUseHeroAbility}
                className={`flex flex-col items-center justify-center rounded-xl border border-white/10 bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-white transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${canUseHeroAbility ? "shadow-[0_0_15px_rgba(168,85,247,0.6)] animate-pulse ring-2 ring-purple-400" : ""
                  }`}
              >
                <span className="text-xs font-bold uppercase tracking-wider">Ability</span>
                <span className="text-[10px] opacity-80">{playerHero.abilityCost} Treats</span>
              </button>

              <button
                onClick={onAttackEnemy}
                disabled={!canAttackEnemy}
                className="rounded-xl bg-gradient-to-r from-red-500 to-orange-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Attack Enemy
              </button>

              <button
                onClick={onEndTurn}
                disabled={!isPlayerTurn}
                className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                End Turn
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

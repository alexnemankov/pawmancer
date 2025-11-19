import { Hero, Card as CardType } from "../types/game";
import { useState, useEffect } from "react";
import GameHeader from "./GameHeader";
import HeroInfo from "./HeroInfo";
import Field from "./Field";
import Card from "./Card";
import TargetingArrow from "./TargetingArrow";
import { PawPrintPattern, BonePattern } from "./BackgroundPatterns";
import TurnBanner from "./TurnBanner";
import EffectManager from "./EffectManager";
import { gameEvents } from "../utils/gameEvents";

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
  onHeroAbility: () => void;
  onEndTurn: () => void;
  onAttackEnemy: () => void;
  canUseHeroAbility: boolean;
  canAttackEnemy: boolean;
  showGuidedHints: boolean;
  onDismissGuidedHints: () => void;
  // Controlled props
  selectedCard: CardType | null;
  selectedAttacker: CardType | null;
  onPlayerFieldCardClick: (card: CardType) => void;
  onEnemyFieldCardClick: (card: CardType) => void;
  onHandCardClick: (card: CardType) => void;
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
  onHeroAbility,
  onEndTurn,
  onAttackEnemy,
  canUseHeroAbility,
  canAttackEnemy,
  showGuidedHints,
  onDismissGuidedHints,
  selectedCard,
  selectedAttacker,
  onPlayerFieldCardClick,
  onEnemyFieldCardClick,
  onHandCardClick,
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

  const handlePlayerFieldCardClick = (card: CardType) => {
    onPlayerFieldCardClick(card);
  };

  const handleEnemyFieldCardClick = (card: CardType) => {
    if (selectedAttacker) {
      gameEvents.emit("effect", { type: "scratch", targetId: card.uid });
    }
    onEnemyFieldCardClick(card);
  };

  const handleHandCardClick = (card: CardType) => {
    // If we are playing a card (simple check: player turn & enough treats), emit summon
    if (isPlayerTurn && playerTreats >= card.cost) {
      gameEvents.emit("effect", { type: "summon", targetId: card.uid });
    }
    onHandCardClick(card);
  };
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
      <TurnBanner isPlayerTurn={isPlayerTurn} turn={turn} />
      <EffectManager />

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
        onDismissGuidedHints={onDismissGuidedHints}
      />

      <div className="flex flex-1 flex-col gap-2 p-4 overflow-y-auto">
        {/* TOP: Enemy Section */}
        <section className="relative flex-none rounded-3xl border border-red-900/50 bg-gradient-to-b from-red-950 to-purple-950 p-4 shadow-lg shadow-red-900/20 overflow-hidden">
          <BonePattern opacity={0.03} className="text-red-200" />

          {/* Decorative Props (Enemy) */}
          <div className="absolute -right-4 -top-4 h-24 w-24 opacity-10 pointer-events-none">
            <svg viewBox="0 0 24 24" fill="currentColor" className="text-red-500">
              <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
            </svg>
          </div>

          {/* Enemy Hero Info Overlay or Header */}
          <div className="relative mb-2 flex items-center justify-between z-10">
            <HeroInfo
              hero={enemyHero}
              health={enemyHealth}
              iconSize={24}
              layout="row"
              compact
            />
            <div className="text-xs uppercase tracking-[0.3em] text-red-200/60 font-bold">
              Enemy Field
            </div>
          </div>

          <Field
            cards={enemyField}
            onCardClick={handleEnemyFieldCardClick}
            showCost={false}
            validTargetIds={validTargetIds}
            className="relative z-10"
          />
        </section>

        {/* MIDDLE: Player Field */}
        <section className="relative flex-1 rounded-3xl border border-blue-900/50 bg-gradient-to-b from-teal-950 to-slate-900 p-4 shadow-lg shadow-blue-900/20 min-h-[280px] overflow-hidden">
          <PawPrintPattern opacity={0.03} className="text-blue-200" />

          <div className="relative mb-2 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-blue-200/60 font-bold z-10">
            <span>Your Dogs</span>
            <span>{playerField.length}/7</span>
          </div>
          <Field
            cards={playerField}
            onCardClick={handlePlayerFieldCardClick}
            showCost={false}
            selectedCardId={selectedAttacker?.uid}
            canAttackIds={canAttackIds}
            className="relative z-10"
          />
        </section>

        {/* BOTTOM: Player Hand & Controls */}
        <section className="flex-none space-y-2">
          {/* Hand */}
          <div className="relative rounded-3xl border border-green-900/50 bg-gradient-to-r from-green-950 to-emerald-950 p-3 shadow-lg shadow-green-900/20 overflow-hidden">
            <PawPrintPattern opacity={0.02} className="text-green-200" />

            <div className="relative mb-2 flex items-center justify-between z-10">
              <div className="text-sm font-bold text-green-100">Your Hand</div>
              <div className="text-xs uppercase tracking-[0.3em] text-green-200/60">
                {playerHand.length}/10
              </div>
            </div>
            <div className="relative flex flex-wrap gap-2 justify-center z-10">
              {playerHand.map((card) => (
                <Card
                  key={card.uid}
                  id={`card-${card.uid}`} // Add ID for targeting
                  card={card}
                  onClick={() => handleHandCardClick(card)}
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

import { useEffect } from "react";
import { HEROES } from "../data/heroes";
import { useGameState } from "../hooks/useGameState";
import { useCardActions } from "../hooks/useCardActions";
import { useAttack } from "../hooks/useAttack";
import { useHeroAbility } from "../hooks/useHeroAbility";
import { useEnemyAI } from "../hooks/useEnemyAI";
import HeroSelectScreen from "./HeroSelectScreen";
import StartScreen from "./StartScreen";
import GameBoard from "./GameBoard";
import TutorialModal from "./TutorialModal";
import { Card } from "../types/game";

export default function PawmancerGame() {
  const gameState = useGameState();
  const {
    gameState: currentGameState,
    selectedHero,
    enemyHero,
    playerHealth,
    setPlayerHealth,
    enemyHealth,
    setEnemyHealth,
    playerTreats,
    setPlayerTreats,
    maxTreats,
    setMaxTreats,
    playerAbilityReady,
    setPlayerAbilityReady,
    turn,
    setTurn,
    isPlayerTurn,
    setIsPlayerTurn,
    playerHand,
    setPlayerHand,
    playerField,
    setPlayerField,
    enemyField,
    setEnemyField,
    selectedCard,
    setSelectedCard,
    selectedAttacker,
    setSelectedAttacker,
    targetingMode,
    setTargetingMode,
    message,
    setMessage,
    pendingTreatGains,
    setPendingTreatGains,
    selectHero,
    goToHeroSelect,
    drawCard,
    openTutorial,
    closeTutorial,
    isTutorialOpen,
    showGuidedHints,
    dismissGuidedHints,
  } = gameState;

  const cardActions = useCardActions({
    isPlayerTurn,
    playerTreats,
    maxTreats,
    setPlayerTreats,
    playerHand,
    setPlayerHand,
    playerField,
    setPlayerField,
    enemyField,
    setEnemyField,
    playerHealth,
    setPlayerHealth,
    enemyHealth,
    setEnemyHealth,
    selectedHeroHealth: selectedHero?.health || 20,
    selectedCard,
    setSelectedCard,
    targetingMode,
    setTargetingMode,
    setMessage,
    drawCard,
    setPendingTreatGains,
  });

  const { attack } = useAttack({
    isPlayerTurn,
    playerField,
    enemyField,
    setPlayerField,
    setEnemyField,
    setEnemyHealth,
    setSelectedAttacker,
    setMessage,
    drawCard,
  });

  const { useHeroAbility: activateHeroAbility } = useHeroAbility({
    isPlayerTurn,
    playerAbilityReady,
    playerTreats,
    selectedHero,
    playerHand,
    setPlayerTreats,
    setPlayerAbilityReady,
    setEnemyHealth,
    setPlayerHealth,
    setMessage,
    drawCard,
  });

  const { executeEnemyTurn } = useEnemyAI({
    maxTreats,
    setMaxTreats,
    enemyField,
    setEnemyField,
    playerField,
    setPlayerField,
    setPlayerHealth,
    setTurn,
    setPlayerTreats,
    setPlayerAbilityReady,
    setIsPlayerTurn,
    setMessage,
    drawCard,
    pendingTreatGains,
    setPendingTreatGains,
  });

  const endTurn = () => {
    if (!isPlayerTurn) return;

    setIsPlayerTurn(false);
    setSelectedAttacker(null);
    setMessage("Enemy's turn...");

    setTimeout(() => {
      executeEnemyTurn();
    }, 1000);
  };

  const handlePlayerFieldCardClick = (card: Card) => {
    if (!isPlayerTurn) {
      setMessage("Wait for your turn!");
      return;
    }
    if (card.hasAttacked) {
      setMessage(`${card.name} already attacked this turn!`);
      return;
    }
    if (!card.canAttack) {
      setMessage(`${card.name} can't attack yet!`);
      return;
    }
    if (targetingMode === "item" && selectedCard) {
      cardActions.applyItemToDog(card);
    } else if (targetingMode === "spell-buff" && selectedCard) {
      cardActions.applySpellToDog(card);
    } else {
      setSelectedAttacker(card);
      setMessage(`${card.name} ready to attack! Click enemy or enemy dog.`);
    }
  };

  const handleEnemyFieldCardClick = (card: Card) => {
    if (selectedAttacker) {
      attack(selectedAttacker, card);
    }
  };

  const handleHandCardClick = (card: Card) => {
    cardActions.playCard(card);
  };

  const handleAttackEnemy = () => {
    if (selectedAttacker) {
      attack(selectedAttacker, "enemy");
    }
  };

  useEffect(() => {
    if (currentGameState === "playing") {
      if (playerHealth <= 0) {
        setMessage("You lost! 💔");
        setTimeout(() => goToHeroSelect(), 2000);
      } else if (enemyHealth <= 0) {
        setMessage("You won! 🎉");
        setTimeout(() => goToHeroSelect(), 2000);
      }
    }
  }, [playerHealth, enemyHealth, currentGameState, goToHeroSelect, setMessage]);

  if (currentGameState === "start") {
    return <StartScreen onStart={goToHeroSelect} />;
  }

  if (currentGameState === "hero-select") {
    return <HeroSelectScreen heroes={HEROES} onSelectHero={selectHero} />;
  }

  if (!selectedHero || !enemyHero) {
    return null;
  }

  return (
    <>
      <GameBoard
        turn={turn}
        isPlayerTurn={isPlayerTurn}
        message={message}
        onQuit={goToHeroSelect}
        onOpenTutorial={openTutorial}
        playerHero={selectedHero}
        enemyHero={enemyHero}
        playerHealth={playerHealth}
        enemyHealth={enemyHealth}
        playerTreats={playerTreats}
        maxTreats={maxTreats}
        playerField={playerField}
        enemyField={enemyField}
        playerHand={playerHand}
        selectedCard={selectedCard}
        selectedAttacker={selectedAttacker}
        onPlayerFieldCardClick={handlePlayerFieldCardClick}
        onEnemyFieldCardClick={handleEnemyFieldCardClick}
        onHandCardClick={handleHandCardClick}
        onHeroAbility={activateHeroAbility}
        onEndTurn={endTurn}
        onAttackEnemy={handleAttackEnemy}
        canUseHeroAbility={
          isPlayerTurn &&
          playerAbilityReady &&
          selectedHero &&
          playerTreats >= selectedHero.abilityCost
        }
        canAttackEnemy={!!selectedAttacker}
        showGuidedHints={showGuidedHints}
        onDismissGuidedHints={dismissGuidedHints}
      />
      <TutorialModal
        isOpen={isTutorialOpen && currentGameState === "playing"}
        onClose={closeTutorial}
      />
    </>
  );
}


import { useCallback } from "react";
import { Card, TargetingMode } from "../types/game";
import {
  processCardAbility,
  processSpellEffect,
  applyItemToCard,
  applySpellBuff,
} from "../utils/cardEffects";

interface UseCardActionsProps {
  isPlayerTurn: boolean;
  playerTreats: number;
  maxTreats: number;
  setPlayerTreats: (value: number | ((prev: number) => number)) => void;
  playerHand: Card[];
  setPlayerHand: (value: Card[] | ((prev: Card[]) => Card[])) => void;
  playerField: Card[];
  setPlayerField: (value: Card[] | ((prev: Card[]) => Card[])) => void;
  enemyField: Card[];
  setEnemyField: (value: Card[] | ((prev: Card[]) => Card[])) => void;
  playerHealth: number;
  setPlayerHealth: (value: number | ((prev: number) => number)) => void;
  enemyHealth: number;
  setEnemyHealth: (value: number | ((prev: number) => number)) => void;
  selectedHeroHealth: number;
  selectedCard: Card | null;
  setSelectedCard: (card: Card | null) => void;
  targetingMode: TargetingMode;
  setTargetingMode: (mode: TargetingMode) => void;
  setMessage: (message: string) => void;
  drawCard: () => void;
  setPendingTreatGains: (value: number | ((prev: number) => number)) => void;
}

export function useCardActions({
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
  selectedHeroHealth,
  selectedCard,
  setSelectedCard,
  targetingMode,
  setTargetingMode,
  setMessage,
  drawCard,
  setPendingTreatGains,
}: UseCardActionsProps) {
  const playDog = useCallback(
    (card: Card) => {
      // Field limit: cannot play if field is full (7 creatures max)
      if (playerField.length >= 7) {
        setMessage("Field is full! Maximum 7 creatures allowed.");
        return;
      }
      
      setPlayerTreats((prev) => prev - card.cost);
      setPlayerHand((prev) => prev.filter((c) => c.uid !== card.uid));

      const canAttackNow = card.ability.includes("Rush");
      const newCard: Card = {
        ...card,
        canAttack: canAttackNow,
        hasAttacked: false,
      };
      const updatedField = [...playerField, newCard];
      setPlayerField(updatedField);

      const effects = processCardAbility(
        card,
        selectedHeroHealth,
        playerHealth,
        playerTreats,
        updatedField, // Use updated field so Rally includes the new card
        enemyHealth,
        enemyField
      );

      if (effects.playerHealth !== undefined) {
        setPlayerHealth(effects.playerHealth);
      }
      if (effects.enemyHealth !== undefined) {
        setEnemyHealth(effects.enemyHealth);
      }
      if (effects.playerTreats !== undefined) {
        // Cap treats at max treats (treat-gain doesn't increase max)
        setPlayerTreats(Math.min(maxTreats, effects.playerTreats));
      }
      if (effects.playerField) {
        setPlayerField(effects.playerField);
      }
      if (effects.enemyField) {
        setEnemyField(effects.enemyField);
      }
      if (effects.drawCards) {
        for (let i = 0; i < effects.drawCards; i++) {
          drawCard();
        }
      }
      
      // Handle "Gain treat next turn" for Corgi Mage
      if (card.ability.includes("Gain treat next turn")) {
        setPendingTreatGains((prev) => prev + 1);
      }

      setMessage(`Played ${card.name}!`);
      setSelectedCard(null);
    },
    [
      selectedHeroHealth,
      playerHealth,
      playerTreats,
      maxTreats,
      playerField,
      enemyHealth,
      enemyField,
      drawCard,
      setPlayerTreats,
      setPlayerHand,
      setPlayerField,
      setPlayerHealth,
      setEnemyHealth,
      setEnemyField,
      setMessage,
      setSelectedCard,
      setPendingTreatGains,
    ]
  );

  const playSpell = useCallback(
    (card: Card) => {
      setPlayerTreats((prev) => prev - card.cost);
      setPlayerHand((prev) => prev.filter((c) => c.uid !== card.uid));

      const effects = processSpellEffect(
        card.name,
        selectedHeroHealth,
        playerHealth,
        playerTreats,
        playerField,
        enemyHealth,
        enemyField
      );

      if (effects.needsTarget) {
        setTargetingMode("spell-buff");
        setSelectedCard(card);
        setMessage("Select a dog to buff!");
        return;
      }

      if (effects.playerHealth !== undefined) {
        setPlayerHealth(effects.playerHealth);
      }
      if (effects.enemyHealth !== undefined) {
        setEnemyHealth(effects.enemyHealth);
      }
      if (effects.playerTreats !== undefined) {
        // Cap treats at max treats (treat-gain doesn't increase max)
        setPlayerTreats(Math.min(maxTreats, effects.playerTreats));
      }
      if (effects.playerField) {
        setPlayerField(effects.playerField);
      }
      if (effects.enemyField) {
        setEnemyField(effects.enemyField);
      }
      if (effects.drawCards) {
        for (let i = 0; i < effects.drawCards; i++) {
          drawCard();
        }
      }
      if (effects.message) {
        setMessage(effects.message);
      }

      setSelectedCard(null);
    },
    [
      selectedHeroHealth,
      playerHealth,
      playerTreats,
      maxTreats,
      playerField,
      enemyHealth,
      enemyField,
      drawCard,
      setPlayerTreats,
      setPlayerHand,
      setPlayerHealth,
      setEnemyHealth,
      setPlayerField,
      setEnemyField,
      setTargetingMode,
      setSelectedCard,
      setMessage,
    ]
  );

  const playCard = useCallback(
    (card: Card) => {
      if (!isPlayerTurn || playerTreats < card.cost) return;

      if (card.cardType === "spell") {
        playSpell(card);
      } else if (card.cardType === "item") {
        setPlayerTreats((prev) => prev - card.cost);
        setPlayerHand((prev) => prev.filter((c) => c.uid !== card.uid));
        setTargetingMode("item");
        setSelectedCard(card);
        setMessage("Select a dog to equip this item!");
      } else {
        playDog(card);
      }
    },
    [
      isPlayerTurn,
      playerTreats,
      playSpell,
      playDog,
      setPlayerTreats,
      setPlayerHand,
      setTargetingMode,
      setSelectedCard,
      setMessage,
    ]
  );

  const applyItemToDog = useCallback(
    (dog: Card) => {
      if (!selectedCard || targetingMode !== "item") return;

      const item = selectedCard;
      setPlayerField((prev) =>
        prev.map((c) => (c.uid === dog.uid ? applyItemToCard(c, item.name) : c))
      );

      setMessage(`${item.name} equipped to ${dog.name}!`);
      setTargetingMode(null);
      setSelectedCard(null);
    },
    [selectedCard, targetingMode, setPlayerField, setMessage, setTargetingMode, setSelectedCard]
  );

  const applySpellToDog = useCallback(
    (dog: Card) => {
      if (!selectedCard || targetingMode !== "spell-buff") return;

      const spell = selectedCard;
      setPlayerField((prev) =>
        prev.map((c) =>
          c.uid === dog.uid ? applySpellBuff(c, spell.name) : c
        )
      );

      setMessage(`${spell.name} used on ${dog.name}!`);
      setTargetingMode(null);
      setSelectedCard(null);
    },
    [selectedCard, targetingMode, setPlayerField, setMessage, setTargetingMode, setSelectedCard]
  );

  return {
    playCard,
    playDog,
    playSpell,
    applyItemToDog,
    applySpellToDog,
  };
}


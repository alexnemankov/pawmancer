import { useCallback } from "react";
import { Hero, Card } from "../types/game";

interface UseHeroAbilityProps {
  isPlayerTurn: boolean;
  playerAbilityReady: boolean;
  playerTreats: number;
  selectedHero: Hero | null;
  playerHand: Card[];
  setPlayerTreats: (value: number | ((prev: number) => number)) => void;
  setPlayerAbilityReady: (value: boolean) => void;
  setEnemyHealth: (value: number | ((prev: number) => number)) => void;
  setPlayerHealth: (value: number | ((prev: number) => number)) => void;
  setMessage: (message: string) => void;
  drawCard: () => void;
}

export function useHeroAbility({
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
}: UseHeroAbilityProps) {
  const useHeroAbility = useCallback(() => {
    if (
      !isPlayerTurn ||
      !playerAbilityReady ||
      !selectedHero ||
      playerTreats < selectedHero.abilityCost
    )
      return;

    setPlayerTreats(playerTreats - selectedHero.abilityCost);
    setPlayerAbilityReady(false);

    switch (selectedHero.id) {
      case "warrior":
        setEnemyHealth((prev) => prev - 3);
        setMessage("Battle Howl dealt 3 damage!");
        break;
      case "healer":
        setPlayerHealth((prev) => Math.min(selectedHero.health, prev + 4));
        setMessage("Healing Light restored 4 health!");
        break;
      case "rogue":
        // If hand is full (10 cards), take 1 fatigue damage instead of drawing
        if (playerHand.length >= 10) {
          setPlayerHealth((prev) => prev - 1);
          setMessage("Hand is full! Took 1 fatigue damage!");
        } else {
          drawCard();
          setMessage("Quick Strike! Drew a card!");
        }
        break;
    }
  }, [
    isPlayerTurn,
    playerAbilityReady,
    playerTreats,
    selectedHero,
    playerHand,
    drawCard,
    setPlayerTreats,
    setPlayerAbilityReady,
    setEnemyHealth,
    setPlayerHealth,
    setMessage,
  ]);

  return { useHeroAbility };
}


import { useCallback } from "react";
import { Card } from "../types/game";
import { CARD_LIBRARY } from "../data/cards";

interface UseEnemyAIProps {
  maxTreats: number;
  setMaxTreats: (value: number | ((prev: number) => number)) => void;
  enemyField: Card[];
  setEnemyField: (value: Card[] | ((prev: Card[]) => Card[])) => void;
  playerField: Card[];
  setPlayerField: (value: Card[] | ((prev: Card[]) => Card[])) => void;
  setPlayerHealth: (value: number | ((prev: number) => number)) => void;
  setTurn: (value: number | ((prev: number) => number)) => void;
  setPlayerTreats: (value: number) => void;
  setPlayerAbilityReady: (value: boolean) => void;
  setIsPlayerTurn: (value: boolean) => void;
  setMessage: (message: string) => void;
  drawCard: () => void;
  pendingTreatGains: number;
  setPendingTreatGains: (value: number | ((prev: number) => number)) => void;
}

export function useEnemyAI({
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
}: UseEnemyAIProps) {
  const executeEnemyTurn = useCallback(() => {
    const newMaxTreats = Math.min(10, maxTreats + 1);
    setMaxTreats(newMaxTreats);

    const affordableCards = CARD_LIBRARY.filter(
      (c) => c.cost <= newMaxTreats && c.cardType === "dog"
    );
    if (affordableCards.length > 0 && Math.random() > 0.3) {
      const randomCard =
        affordableCards[Math.floor(Math.random() * affordableCards.length)];
      const newCard: Card = {
        ...randomCard,
        uid: `enemy-${Date.now()}`,
        canAttack: false,
        hasAttacked: false,
      };
      setEnemyField((prev) => [...prev, newCard]);
      setMessage(`Enemy played ${randomCard.name}!`);
    }

    setTimeout(() => {
      setEnemyField((prev) => {
        const attackers = prev.filter((c) => c.canAttack && !c.hasAttacked);
        attackers.forEach((attacker) => {
          const tauntDogs = playerField.filter((c) =>
            c.ability.includes("Taunt")
          );
          const targets = tauntDogs.length > 0 ? tauntDogs : playerField;

          if (targets.length > 0 && Math.random() > 0.4) {
            const target = targets[Math.floor(Math.random() * targets.length)];
            setPlayerField((p) =>
              p
                .map((c) =>
                  c.uid === target.uid
                    ? { ...c, health: (c.health || 0) - (attacker.attack || 0) }
                    : c
                )
                .filter((c) => (c.health || 0) > 0)
            );
          } else {
            setPlayerHealth((p) => p - (attacker.attack || 0));
          }
        });
        return prev.map((c) => ({ ...c, canAttack: true, hasAttacked: false }));
      });

      setTimeout(() => {
        setTurn((prev) => prev + 1);
        // Apply pending treat gains from previous turn (e.g., Corgi Mage)
        const treatsWithPending = Math.min(newMaxTreats, newMaxTreats + pendingTreatGains);
        setPlayerTreats(treatsWithPending);
        if (pendingTreatGains > 0) {
          const pendingCount = pendingTreatGains;
          setPendingTreatGains(0);
          if (pendingCount === 1) {
            setMessage("Your turn! Gained 1 treat from Corgi Mage!");
          } else {
            setMessage(`Your turn! Gained ${pendingCount} treats!`);
          }
        } else {
          setMessage("Your turn!");
        }
        setPlayerAbilityReady(true);
        setPlayerField((prev) =>
          prev.map((c) => ({ ...c, canAttack: true, hasAttacked: false }))
        );
        drawCard();
        setIsPlayerTurn(true);
      }, 1500);
    }, 1000);
  }, [
    maxTreats,
    playerField,
    drawCard,
    pendingTreatGains,
    setPendingTreatGains,
  ]);

  return { executeEnemyTurn };
}


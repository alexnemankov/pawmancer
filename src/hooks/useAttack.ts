import { useCallback } from "react";
import { Card } from "../types/game";

interface UseAttackProps {
  isPlayerTurn: boolean;
  playerField: Card[];
  enemyField: Card[];
  setPlayerField: (value: Card[] | ((prev: Card[]) => Card[])) => void;
  setEnemyField: (value: Card[] | ((prev: Card[]) => Card[])) => void;
  setEnemyHealth: (value: number | ((prev: number) => number)) => void;
  setSelectedAttacker: (card: Card | null) => void;
  setMessage: (message: string) => void;
  drawCard: () => void;
}

export function useAttack({
  isPlayerTurn,
  playerField,
  enemyField,
  setPlayerField,
  setEnemyField,
  setEnemyHealth,
  setSelectedAttacker,
  setMessage,
  drawCard,
}: UseAttackProps) {
  const attack = useCallback(
    (attacker: Card, target: Card | "enemy") => {
      if (!isPlayerTurn) {
        setMessage("It's not your turn!");
        return;
      }

      const attackerCard = playerField.find((c) => c.uid === attacker.uid);

      if (!attackerCard) {
        setMessage("Dog not found!");
        setSelectedAttacker(null);
        return;
      }

      if (attackerCard.hasAttacked) {
        setMessage(`${attackerCard.name} already attacked this turn!`);
        setSelectedAttacker(null);
        return;
      }

      if (!attackerCard.canAttack) {
        setMessage(`${attackerCard.name} can't attack yet!`);
        setSelectedAttacker(null);
        return;
      }

      const hasTaunt = enemyField.some((c) => c.ability.includes("Taunt"));
      if (target === "enemy" && hasTaunt) {
        setMessage("Must attack Taunt dogs first!");
        setSelectedAttacker(null);
        return;
      }

      if (target === "enemy") {
        // Glass Cannon: +1 bonus damage when attacking
        let damage = attacker.attack || 0;
        if (attackerCard.ability.includes("Glass Cannon")) {
          damage += 1;
        }
        
        setEnemyHealth((prev) => prev - damage);
        setPlayerField((prev) =>
          prev.map((c) =>
            c.uid === attacker.uid
              ? { ...c, hasAttacked: true, canAttack: false }
              : c
          )
        );

        if (attackerCard.ability.includes("Draw on attack")) {
          drawCard();
        }

        setMessage(`${attacker.name} attacked for ${damage} damage!`);
        setSelectedAttacker(null);
      } else {
        const targetCard = enemyField.find((c) => c.uid === target.uid);

        if (!targetCard) {
          setMessage("Target not found!");
          setSelectedAttacker(null);
          return;
        }

        // Check for dodge
        if (
          targetCard.ability.includes("dodge") ||
          targetCard.ability.includes("Evasion") ||
          targetCard.ability.includes("Agile")
        ) {
          let dodgeChance = 0;
          if (targetCard.ability.includes("20%")) dodgeChance = 0.2;
          else if (targetCard.ability.includes("30%")) dodgeChance = 0.3;
          else if (targetCard.ability.includes("40%")) dodgeChance = 0.4;
          else if (targetCard.ability.includes("Agile")) dodgeChance = 0.2; // Default for Agile keyword
          else if (targetCard.ability.includes("Evasion")) dodgeChance = 0.3; // Default for Evasion
          
          if (dodgeChance > 0 && Math.random() < dodgeChance) {
            setMessage(`${targetCard.name} dodged the attack!`);
            setPlayerField((prev) =>
              prev.map((c) =>
                c.uid === attacker.uid
                  ? { ...c, hasAttacked: true, canAttack: false }
                  : c
              )
            );
            setSelectedAttacker(null);
            return;
          }
        }

        // Calculate damage with Sturdy and Glass Cannon
        let attackerDamage = targetCard.attack || 0;
        let targetDamage = attacker.attack || 0;

        // Glass Cannon: +1 bonus damage when attacking
        if (attackerCard.ability.includes("Glass Cannon")) {
          targetDamage += 1;
        }

        if (attackerCard.ability.includes("Sturdy"))
          attackerDamage = Math.max(0, attackerDamage - 1);
        if (targetCard.ability.includes("Sturdy"))
          targetDamage = Math.max(0, targetDamage - 1);

        const newPlayerField = playerField.map((c) =>
          c.uid === attacker.uid
            ? {
                ...c,
                health: (c.health || 0) - attackerDamage,
                hasAttacked: true,
                canAttack: false,
              }
            : c
        );
        const newEnemyField = enemyField.map((c) =>
          c.uid === target.uid
            ? { ...c, health: (c.health || 0) - targetDamage }
            : c
        );

        // Check for Fetch/Deathrattle before filtering dead creatures
        const attackerBeforeDeath = newPlayerField.find((c) => c.uid === attacker.uid);
        const targetBeforeDeath = newEnemyField.find((c) => c.uid === target.uid);
        const attackerDies = attackerBeforeDeath && (attackerBeforeDeath.health || 0) <= 0;
        const targetDies = targetBeforeDeath && (targetBeforeDeath.health || 0) <= 0;

        // Fetch: Draw a card when this dies (for player's creatures)
        if (attackerDies && attackerCard.ability.includes("Fetch:")) {
          drawCard();
        }

        setPlayerField(newPlayerField.filter((c) => (c.health || 0) > 0));
        setEnemyField(newEnemyField.filter((c) => (c.health || 0) > 0));

        if (
          attackerCard.ability.includes("Draw on attack") &&
          newPlayerField.find((c) => c.uid === attacker.uid)?.health &&
          (newPlayerField.find((c) => c.uid === attacker.uid)?.health || 0) > 0
        ) {
          drawCard();
        }

        setMessage(`${attacker.name} fought ${targetCard.name}!`);
        setSelectedAttacker(null);
      }
    },
    [
      isPlayerTurn,
      playerField,
      enemyField,
      drawCard,
    ]
  );

  return { attack };
}


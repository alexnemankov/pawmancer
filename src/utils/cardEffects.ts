import { Card } from "../types/game";

export interface CardEffectResult {
  playerHealth?: number;
  enemyHealth?: number;
  playerTreats?: number;
  playerField?: Card[];
  enemyField?: Card[];
  drawCards?: number;
  message?: string;
  needsTarget?: boolean;
}

export function processCardAbility(
  card: Card,
  selectedHeroHealth: number,
  currentPlayerHealth: number,
  currentPlayerTreats: number,
  currentPlayerField: Card[],
  currentEnemyHealth: number,
  currentEnemyField: Card[]
): CardEffectResult {
  const result: CardEffectResult = {};

  // Gain treats (adds to current treats, does not increase max treats)
  // Note: "Gain treat next turn" is handled separately via pendingTreatGains state
  if (card.ability.includes("Gain 1 treat") && !card.ability.includes("next turn")) {
    result.playerTreats = currentPlayerTreats + 1;
  }
  if (card.ability.includes("Gain 2 treats")) {
    result.playerTreats = currentPlayerTreats + 2;
  }

  // Healing
  if (card.ability.includes("Heal 2 when played")) {
    result.playerHealth = Math.min(selectedHeroHealth, currentPlayerHealth + 2);
  }
  if (card.ability.includes("Heal 3 when played")) {
    result.playerHealth = Math.min(selectedHeroHealth, currentPlayerHealth + 3);
  }
  if (card.ability.includes("Heal all allies 1")) {
    result.playerField = currentPlayerField.map((c) => ({
      ...c,
      health: (c.health || 0) + 1,
    }));
  }

  // Damage
  if (card.ability.includes("Deal 2 damage to enemy")) {
    result.enemyHealth = currentEnemyHealth - 2;
  }
  if (card.ability.includes("Deal 1 damage to all enemy creatures")) {
    // Only damage creatures, not hero
    result.enemyField = currentEnemyField
      .map((c) => ({ ...c, health: (c.health || 0) - 1 }))
      .filter((c) => (c.health || 0) > 0);
  }
  if (card.ability.includes("Deal 1 damage to all enemies")) {
    result.enemyHealth = currentEnemyHealth - 1;
    result.enemyField = currentEnemyField
      .map((c) => ({ ...c, health: (c.health || 0) - 1 }))
      .filter((c) => (c.health || 0) > 0);
  }

  // Draw cards
  if (card.ability.includes("Draw 2 cards when played")) {
    result.drawCards = 2;
  } else if (card.ability.includes("Draw 1 card when played")) {
    result.drawCards = 1;
  } else if (card.ability.includes("Draw a card") && !card.ability.includes("when this dies")) {
    result.drawCards = 1;
  }

  // Rally: +1 attack to all allies
  if (card.ability.includes("Rally:")) {
    result.playerField = currentPlayerField.map((c) => ({
      ...c,
      attack: (c.attack || 0) + 1,
    }));
  }

  // Colossal: Deal 2 damage to all enemies when played
  if (card.ability.includes("Colossal:")) {
    result.enemyHealth = currentEnemyHealth - 2;
    result.enemyField = currentEnemyField
      .map((c) => ({ ...c, health: (c.health || 0) - 2 }))
      .filter((c) => (c.health || 0) > 0);
  }

  return result;
}

export function processSpellEffect(
  spellName: string,
  selectedHeroHealth: number,
  currentPlayerHealth: number,
  currentPlayerTreats: number,
  currentPlayerField: Card[],
  currentEnemyHealth: number,
  currentEnemyField: Card[]
): CardEffectResult {
  const result: CardEffectResult = {};

  switch (spellName) {
    case "Fireball Fetch":
      result.enemyHealth = currentEnemyHealth - 5;
      result.message = "Fireball dealt 5 damage!";
      break;
    case "Healing Treats":
      result.playerHealth = Math.min(selectedHeroHealth, currentPlayerHealth + 5);
      result.message = "Healed 5 health!";
      break;
    case "Pack Howl":
      result.playerField = currentPlayerField.map((c) => ({
        ...c,
        attack: (c.attack || 0) + 2,
        health: (c.health || 0) + 2,
      }));
      result.message = "All dogs buffed +2/+2!";
      break;
    case "Bone Storm":
      result.enemyHealth = currentEnemyHealth - 3;
      result.enemyField = currentEnemyField
        .map((c) => ({ ...c, health: (c.health || 0) - 3 }))
        .filter((c) => (c.health || 0) > 0);
      result.message = "Bone Storm hit all enemies!";
      break;
    case "Belly Rub":
    case "Bark Shield":
    case "Zoomies":
      result.needsTarget = true;
      break;
    case "Good Boy":
      result.drawCards = 2;
      result.message = "Drew 2 cards!";
      break;
    case "Tail Wag":
      result.playerTreats = currentPlayerTreats + 2;
      result.message = "Gained 2 treats!";
      break;
    case "Puppy Eyes":
      result.playerTreats = currentPlayerTreats + 1;
      result.message = "Gained 1 treat!";
      break;
    case "Fetch Lightning":
      result.enemyHealth = currentEnemyHealth - 6;
      result.message = "Lightning dealt 6 damage!";
      break;
    case "Unleash the Hounds":
      const hounds: Card[] = [
        {
          id: 999,
          name: "Hound Token",
          cost: 0,
          attack: 2,
          health: 2,
          cardType: "dog",
          type: "Token",
          ability: "None",
          art: "🐕",
          uid: `hound-${Date.now()}-1`,
          canAttack: false,
          hasAttacked: false,
        },
        {
          id: 999,
          name: "Hound Token",
          cost: 0,
          attack: 2,
          health: 2,
          cardType: "dog",
          type: "Token",
          ability: "None",
          art: "🐕",
          uid: `hound-${Date.now()}-2`,
          canAttack: false,
          hasAttacked: false,
        },
        {
          id: 999,
          name: "Hound Token",
          cost: 0,
          attack: 2,
          health: 2,
          cardType: "dog",
          type: "Token",
          ability: "None",
          art: "🐕",
          uid: `hound-${Date.now()}-3`,
          canAttack: false,
          hasAttacked: false,
        },
      ];
      result.playerField = [...currentPlayerField, ...hounds];
      result.message = "Summoned 3 hounds!";
      break;
  }

  return result;
}

export function applyItemToCard(card: Card, itemName: string): Card {
  const newCard = { ...card };

  switch (itemName) {
    case "Collar of Power":
      newCard.attack = (newCard.attack || 0) + 2;
      break;
    case "Armor Vest":
      newCard.health = (newCard.health || 0) + 3;
      break;
    case "Magic Bone":
      newCard.attack = (newCard.attack || 0) + 2;
      newCard.health = (newCard.health || 0) + 2;
      break;
    case "Speed Boots":
      newCard.canAttack = true;
      break;
    case "Crown of Kings":
      newCard.attack = (newCard.attack || 0) + 3;
      newCard.health = (newCard.health || 0) + 3;
      break;
    case "Shield Badge":
      newCard.ability += " Taunt";
      break;
    case "Golden Leash":
      newCard.attack = (newCard.attack || 0) + 1;
      newCard.health = (newCard.health || 0) + 4;
      break;
    case "Mystic Collar":
      newCard.ability += " Draw on attack";
      break;
  }

  return newCard;
}

export function applySpellBuff(card: Card, spellName: string): Card {
  const newCard = { ...card };

  switch (spellName) {
    case "Belly Rub":
      newCard.health = (newCard.health || 0) + 4;
      break;
    case "Bark Shield":
      newCard.health = (newCard.health || 0) + 3;
      break;
    case "Zoomies":
      newCard.attack = (newCard.attack || 0) + 2;
      break;
  }

  return newCard;
}


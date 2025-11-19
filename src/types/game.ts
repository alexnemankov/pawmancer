import { LucideIcon } from "lucide-react";

export interface Hero {
  id: string;
  name: string;
  breed: string;
  health: number;
  ability: string;
  abilityCost: number;
  icon: LucideIcon;
  color: string;
  difficulty: string;
}

export interface Card {
  id: number;
  name: string;
  cost: number;
  attack?: number;
  health?: number;
  cardType: "dog" | "spell" | "item";
  type?: string;
  ability: string;
  art: string;
  uid?: string;
  canAttack?: boolean;
  hasAttacked?: boolean;
  rarity?: "common" | "rare" | "epic" | "legendary";
}

export type GameState = "start" | "hero-select" | "playing";
export type TargetingMode = "item" | "spell-buff" | null;


import { Heart, Shield, Wind } from "lucide-react";

export const HEROES = [
  {
    id: "warrior",
    name: "Rex the Warrior",
    breed: "Shepherd",
    health: 25,
    ability: "Battle Howl: Deal 3 damage",
    abilityCost: 2,
    icon: Shield,
    color: "from-red-600 to-orange-600",
    difficulty: "Balanced",
  },
  {
    id: "healer",
    name: "Buddy the Guardian",
    breed: "Golden Retriever",
    health: 30,
    ability: "Healing Light: Restore 4 health",
    abilityCost: 2,
    icon: Heart,
    color: "from-yellow-500 to-amber-500",
    difficulty: "Easy",
  },
  {
    id: "rogue",
    name: "Shadow the Swift",
    breed: "Greyhound",
    health: 22,
    ability: "Quick Strike: Draw a card",
    abilityCost: 1,
    icon: Wind,
    color: "from-gray-700 to-slate-600",
    difficulty: "Advanced",
  },
];

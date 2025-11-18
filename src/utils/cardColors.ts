export const getCardTypeColor = (cardType: string, type?: string): string => {
  const typeColors: Record<string, string> = {
    Arcane: "from-purple-500 to-blue-500",
    Defender: "from-blue-600 to-cyan-500",
    Guard: "from-blue-700 to-indigo-600",
    Striker: "from-red-500 to-orange-500",
    Holy: "from-yellow-400 to-amber-300",
    Agile: "from-green-500 to-emerald-500",
    Support: "from-pink-500 to-rose-500",
    Trickster: "from-indigo-500 to-purple-600",
    Tank: "from-gray-600 to-slate-500",
    Legendary: "from-yellow-500 via-orange-500 to-red-500",
    Mystic: "from-indigo-600 to-purple-700",
    Storm: "from-cyan-500 to-blue-600",
    Titan: "from-stone-700 to-gray-800",
    Shadow: "from-gray-800 to-black",
    Scout: "from-green-600 to-teal-500",
    Genius: "from-blue-500 to-purple-500",
    Berserker: "from-red-700 to-orange-700",
    spell: "from-orange-600 to-red-600",
    item: "from-emerald-600 to-green-700",
  };

  if (cardType === "spell") return typeColors.spell;
  if (cardType === "item") return typeColors.item;
  return typeColors[type || ""] || "from-gray-500 to-gray-600";
};


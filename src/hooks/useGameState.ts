import { useState, useCallback } from "react";
import { Hero, Card, GameState, TargetingMode } from "../types/game";
import { CARD_LIBRARY } from "../data/cards";
import { HEROES } from "../data/heroes";

const TUTORIAL_STORAGE_KEY = "pawmancerTutorialDismissed";

const getTutorialDismissed = () => {
  if (typeof window === "undefined") {
    return false;
  }
  return localStorage.getItem(TUTORIAL_STORAGE_KEY) === "true";
};

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>("start");
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
  const [enemyHero, setEnemyHero] = useState<Hero | null>(null);
  const [playerHealth, setPlayerHealth] = useState(20);
  const [enemyHealth, setEnemyHealth] = useState(20);
  const [playerTreats, setPlayerTreats] = useState(1);
  const [maxTreats, setMaxTreats] = useState(1);
  const [playerAbilityReady, setPlayerAbilityReady] = useState(true);
  const [turn, setTurn] = useState(1);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [playerField, setPlayerField] = useState<Card[]>([]);
  const [enemyField, setEnemyField] = useState<Card[]>([]);
  const [playerDeck, setPlayerDeck] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [selectedAttacker, setSelectedAttacker] = useState<Card | null>(null);
  const [targetingMode, setTargetingMode] = useState<TargetingMode>(null);
  const [message, setMessage] = useState("Welcome to Pawmancer!");
  const [pendingTreatGains, setPendingTreatGains] = useState(0);
  const [tutorialDismissed, setTutorialDismissed] = useState(
    getTutorialDismissed
  );
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [showGuidedHints, setShowGuidedHints] = useState(false);

  const startGame = useCallback(
    (hero: Hero, enemy: Hero) => {
      const deck = [...CARD_LIBRARY, ...CARD_LIBRARY].map((c, i) => ({
        ...c,
        uid: `${c.id}-${i}`,
      }));
      const shuffled = deck.sort(() => Math.random() - 0.5);
      const hand = shuffled.slice(0, 4);
      const remaining = shuffled.slice(4);

      setPlayerDeck(remaining);
      setPlayerHand(hand);
      setPlayerHealth(hero.health);
      setEnemyHealth(enemy.health);
      setPlayerTreats(1);
      setMaxTreats(1);
      setTurn(1);
      setIsPlayerTurn(true);
      setPlayerField([]);
      setEnemyField([]);
      setSelectedCard(null);
      setSelectedAttacker(null);
      setTargetingMode(null);
      setPlayerAbilityReady(true);
      setPendingTreatGains(0);
      setShowGuidedHints(!tutorialDismissed);
      setIsTutorialOpen(!tutorialDismissed);
      setMessage("Your turn! Play cards or attack.");
    },
    [tutorialDismissed]
  );

  const goToHeroSelect = useCallback(() => {
    setSelectedHero(null);
    setEnemyHero(null);
    setMessage("Choose your hero!");
    setGameState("hero-select");
  }, []);

  const selectHero = useCallback(
    (hero: Hero) => {
      setSelectedHero(hero);
      const randomEnemy = HEROES[Math.floor(Math.random() * HEROES.length)];
      setEnemyHero(randomEnemy);
      setGameState("playing");
      startGame(hero, randomEnemy);
    },
    [startGame]
  );

  const drawCard = useCallback(() => {
    // Deck-out mechanic: lose if deck is empty and must draw
    if (playerDeck.length === 0) {
      setPlayerHealth(0);
      setMessage("Deck is empty! You lose!");
      return;
    }
    
    // Hand size limit: discard excess cards if hand is full (10 cards max)
    if (playerHand.length >= 10) {
      // Don't draw, just discard the top card
      setPlayerDeck((prev) => prev.slice(1));
      setMessage("Hand is full! Discarded a card.");
      return;
    }
    
    setPlayerHand((prev) => [...prev, playerDeck[0]]);
    setPlayerDeck((prev) => prev.slice(1));
  }, [playerDeck, playerHand]);

  const openTutorial = useCallback(() => {
    setIsTutorialOpen(true);
  }, []);

  const closeTutorial = useCallback((dontShowAgain: boolean) => {
    if (dontShowAgain) {
      setTutorialDismissed(true);
      if (typeof window !== "undefined") {
        localStorage.setItem(TUTORIAL_STORAGE_KEY, "true");
      }
      setShowGuidedHints(false);
    }
    setIsTutorialOpen(false);
  }, []);

  const dismissGuidedHints = useCallback(() => {
    setShowGuidedHints(false);
  }, []);

  return {
    // State
    gameState,
    setGameState,
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
    playerDeck,
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
    isTutorialOpen,
    showGuidedHints,
    // Actions
    selectHero,
    goToHeroSelect,
    startGame,
    drawCard,
    openTutorial,
    closeTutorial,
    dismissGuidedHints,
  };
}


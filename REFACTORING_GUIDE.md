# Refactoring Guide: Component Breakdown

This document explains the refactoring of `fantasy-dog-card-game.tsx` into a modular, maintainable structure.

## 📁 Folder Structure

```
src/
├── components/          # UI Components
│   ├── Card.tsx        # Reusable card display component
│   ├── HeroCard.tsx    # Hero selection card
│   ├── HeroInfo.tsx    # Hero information display
│   ├── Field.tsx       # Battlefield for cards
│   ├── GameHeader.tsx  # Game status header
│   ├── GameActions.tsx # Action buttons
│   ├── HeroSelectScreen.tsx  # Hero selection screen
│   ├── GameBoard.tsx   # Main game board
│   └── PawmancerGame.tsx  # Main game component (orchestrator)
├── hooks/              # Custom React Hooks
│   ├── useGameState.ts    # Game state management
│   ├── useCardActions.ts  # Card playing logic
│   ├── useAttack.ts       # Combat logic
│   ├── useHeroAbility.ts  # Hero ability logic
│   └── useEnemyAI.ts      # Enemy AI logic
├── data/              # Static Data
│   ├── heroes.ts      # Hero definitions
│   └── cards.ts       # Card library
├── types/             # TypeScript Types
│   └── game.ts        # Game type definitions
└── utils/             # Utility Functions
    ├── cardColors.ts  # Card color mapping
    └── cardEffects.ts # Card effect processing
```

## 🧩 Component Breakdown

### UI Components

#### 1. **Card.tsx** - Reusable Card Display
- **Responsibility**: Display any card (dog, spell, item) with consistent styling
- **Props**: `card`, `onClick`, `disabled`, `isSelected`, `showCost`, `canAttack`
- **Reusability**: Used in hand, field, and enemy field

#### 2. **HeroCard.tsx** - Hero Selection Card
- **Responsibility**: Display hero information in selection screen
- **Props**: `hero`, `onClick`
- **Single Responsibility**: Hero selection UI only

#### 3. **HeroInfo.tsx** - Hero Information Display
- **Responsibility**: Show hero name, breed, health, and optionally treats
- **Props**: `hero`, `health`, `treats?`, `maxTreats?`, `iconSize?`, `showTreats?`
- **Reusability**: Used for both player and enemy hero display

#### 4. **Field.tsx** - Battlefield Component
- **Responsibility**: Display a collection of cards on the battlefield
- **Props**: `cards`, `onCardClick?`, `showCost?`, `selectedCardId?`, `canAttackIds?`, `title?`, `className?`
- **Reusability**: Used for both player and enemy fields

#### 5. **GameHeader.tsx** - Game Status Header
- **Responsibility**: Display turn counter, message, and quit button
- **Props**: `turn`, `isPlayerTurn`, `message`, `onQuit`
- **Single Responsibility**: Header UI only

#### 6. **GameActions.tsx** - Action Buttons
- **Responsibility**: Display and handle game action buttons
- **Props**: `onHeroAbility`, `onEndTurn`, `onAttackEnemy`, `heroAbilityCost?`, `isPlayerTurn`, `canUseHeroAbility`, `canAttackEnemy`
- **Single Responsibility**: Action buttons UI

#### 7. **HeroSelectScreen.tsx** - Hero Selection Screen
- **Responsibility**: Complete hero selection interface
- **Props**: `heroes`, `onSelectHero`
- **Single Responsibility**: Hero selection screen

#### 8. **GameBoard.tsx** - Main Game Board
- **Responsibility**: Orchestrate all game UI components
- **Props**: All game state and handlers
- **Composition**: Combines Field, HeroInfo, GameHeader, GameActions

#### 9. **PawmancerGame.tsx** - Main Orchestrator
- **Responsibility**: Manage game state and coordinate hooks
- **State Management**: Uses all custom hooks
- **Routing**: Switches between HeroSelectScreen and GameBoard

### Custom Hooks

#### 1. **useGameState.ts** - State Management
- **Responsibility**: Centralize all game state
- **Returns**: All state variables and setters, plus `selectHero`, `startGame`, `drawCard`
- **Benefits**: Single source of truth for game state

#### 2. **useCardActions.ts** - Card Playing Logic
- **Responsibility**: Handle all card playing, item equipping, spell casting
- **Returns**: `playCard`, `playDog`, `playSpell`, `applyItemToDog`, `applySpellToDog`
- **Benefits**: Isolated card logic, easy to test

#### 3. **useAttack.ts** - Combat Logic
- **Responsibility**: Handle all combat interactions
- **Returns**: `attack` function
- **Benefits**: Isolated combat logic with dodge, taunt, sturdy mechanics

#### 4. **useHeroAbility.ts** - Hero Abilities
- **Responsibility**: Handle hero power activation
- **Returns**: `useHeroAbility` function
- **Benefits**: Isolated hero ability logic

#### 5. **useEnemyAI.ts** - Enemy AI
- **Responsibility**: Execute enemy turn logic
- **Returns**: `executeEnemyTurn` function
- **Benefits**: Isolated AI logic, easy to improve

### Utility Functions

#### 1. **cardColors.ts** - Card Color Mapping
- **Function**: `getCardTypeColor(cardType, type?)`
- **Responsibility**: Map card types to Tailwind gradient classes
- **Benefits**: Centralized styling logic

#### 2. **cardEffects.ts** - Card Effect Processing
- **Functions**: 
  - `processCardAbility()` - Process dog card abilities
  - `processSpellEffect()` - Process spell effects
  - `applyItemToCard()` - Apply item effects
  - `applySpellBuff()` - Apply spell buffs
- **Responsibility**: Pure functions for card effects
- **Benefits**: Testable, no side effects

## 🔄 State Management Strategy

### Current Approach: Custom Hooks
- **Pattern**: Multiple focused hooks instead of one large hook
- **Benefits**: 
  - Clear separation of concerns
  - Easy to test individual pieces
  - Can be reused in different contexts
- **Trade-offs**: 
  - Some prop drilling (mitigated by hook composition)
  - Multiple state updates (acceptable for game logic)

### Alternative Approaches Considered

1. **Context API**: 
   - Would eliminate prop drilling
   - Might be overkill for this game
   - Could be added later if needed

2. **State Management Library (Redux/Zustand)**:
   - Good for complex state
   - Adds dependency
   - Current hooks approach is sufficient

3. **Single Hook**:
   - Simpler but less maintainable
   - Harder to test
   - Current approach is better

## 🧪 Testing Strategy

### Component Testing
- **Card.tsx**: Test rendering, props, click handlers
- **HeroCard.tsx**: Test hero display, click handling
- **Field.tsx**: Test card rendering, selection states

### Hook Testing
- **useGameState**: Test state initialization, game start
- **useCardActions**: Test card playing, effect processing
- **useAttack**: Test combat logic, dodge, taunt
- **useHeroAbility**: Test each hero ability
- **useEnemyAI**: Test enemy turn logic

### Utility Testing
- **cardColors.ts**: Test color mapping
- **cardEffects.ts**: Test all effect functions

## 📊 Benefits of Refactoring

1. **Maintainability**: Each component has a single, clear responsibility
2. **Reusability**: Components like `Card` and `Field` are used multiple times
3. **Testability**: Isolated logic is easier to test
4. **Readability**: Smaller files are easier to understand
5. **Scalability**: Easy to add new cards, heroes, or features
6. **Type Safety**: TypeScript types ensure correctness

## 🔧 Prop Drilling Mitigation

### Current State
- Some props are passed through multiple layers
- Acceptable for this game size
- Hooks help reduce drilling

### If Needed Later
1. **Context API**: Create `GameContext` for shared state
2. **Composition**: Use component composition to reduce props
3. **State Lifting**: Keep state at appropriate levels

## 🚀 Future Improvements

1. **Add Context API**: If prop drilling becomes problematic
2. **Add Animations**: Smooth transitions between states
3. **Add Sound Effects**: Audio feedback for actions
4. **Add Card Animations**: Visual feedback for card plays
5. **Improve Enemy AI**: More sophisticated decision making
6. **Add Card Tooltips**: Hover information
7. **Add Deck Builder**: Custom deck construction
8. **Add Save/Load**: Persist game state

## 📝 Migration Notes

- Original file: `fantasy-dog-card-game.tsx` (1255 lines)
- New structure: ~15 files, each < 350 lines
- Main entry point: `src/components/PawmancerGame.tsx`
- All functionality preserved
- No breaking changes to game logic

## 🎯 Key Principles Applied

1. **Single Responsibility**: Each component/hook does one thing
2. **DRY (Don't Repeat Yourself)**: Reusable components
3. **Separation of Concerns**: UI, logic, and data separated
4. **Composition over Inheritance**: Components compose together
5. **Testability**: Pure functions and isolated logic
6. **Type Safety**: TypeScript throughout


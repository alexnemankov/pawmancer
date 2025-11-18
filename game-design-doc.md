# Pawmancer - Fantasy Dog Card Game

## Game Design Document

**Version:** 1.1  
**Last Updated:** 2024  
**Game Type:** Turn-based Strategy Card Game  
**Platform:** Web (React + TypeScript + Vite + Tailwind CSS)

---

## Table of Contents

1. [Game Overview](#game-overview)
2. [Core Mechanics](#core-mechanics)
3. [Hero System](#hero-system)
4. [Card System](#card-system)
5. [Combat System](#combat-system)
6. [Turn Structure](#turn-structure)
7. [Abilities & Keywords](#abilities--keywords)
8. [UI/UX Features](#uiux-features)
9. [Technical Implementation](#technical-implementation)
10. [Implementation Checklist](#implementation-checklist)
11. [Development Roadmap](#development-roadmap)
12. [Future Features](#future-features)

---

## Game Overview

**Pawmancer** is a turn-based card game where players battle as fantasy dog heroes, summoning dog cards, casting spells, and equipping items to defeat their opponent. The game features a unique "treats" resource system (similar to mana in other card games) and strategic combat mechanics.

### Core Concept

- Players start at the **Start Screen** (entry point with branding and navigation)
- Navigate to **Hero Selection** (choose from 3 heroes, each with unique abilities and health)
- Build a deck from a shared card library
- Battle against an AI opponent
- Reduce opponent's health to zero to win

### Onboarding Flow

1. **Start Screen** → Entry point with "Start Game" and "Rules/Tutorial" buttons
2. **Hero Selection** → Choose from 3 heroes (Rex, Buddy, Shadow)
3. **Game Screen** → Battle against AI opponent
4. **Tutorial System** → Optional tutorial modal and first-time tooltips guide new players

---

## Core Mechanics

### Resource System: Treats (🦴)

- **Starting Treats:** 1 per turn
- **Maximum Treats:** Increases by 1 each turn (capped at 10)
- **Usage:** All cards cost treats to play
- **Regeneration:** Resets to maximum at start of each turn

### Health System

- Each hero has a unique starting health (20-30 HP)
- When health reaches 0, player loses
- Health can be restored through spells and abilities

### Deck System

- **Deck Construction:** 2 copies of each card from CARD_LIBRARY (total ~88 cards)
- **Starting Hand:** 4 cards
- **Draw:** 1 card per turn at start of player's turn
- **Shuffle:** Deck is shuffled at game start
- **Hand Size Limit:** Maximum 10 cards (excess cards are discarded when drawn)
- **Deck-out Mechanic:** Player loses if deck is empty and must draw

### Field System

- **Player Field:** Maximum 7 dogs (enforced - cannot play if field full)
- **Enemy Field:** AI-controlled field
- Cards on field can attack or be attacked

---

## Hero System

### Hero Selection

Players choose from 3 unique heroes before each game:

#### 1. **Rex the Warrior** (German Shepherd)

- **Health:** 25
- **Ability:** Battle Howl - Deal 3 damage to enemy
- **Cost:** 2 treats
- **Icon:** Shield
- **Color:** Red to Orange gradient
- **Role:** Attacker-balanced hero

#### 2. **Buddy the Guardian** (Golden Retriever)

- **Health:** 30
- **Ability:** Healing Light - Restore 4 health
- **Cost:** 2 treats
- **Icon:** Heart
- **Color:** Yellow to Amber gradient
- **Role:** Healer-tank hero

#### 3. **Shadow the Swift** (Greyhound)

- **Health:** 22
- **Ability:** Quick Strike - Draw a card (take 1 fatigue if hand full)
- **Cost:** 1 treat
- **Icon:** Wind
- **Color:** Gray to Slate gradient
- **Role:** Draw/tempo hero

### Hero Abilities

- Can be used once per turn (resets at start of turn)
- Requires treats to activate
- Button disabled when conditions not met

---

## Card System

### Card Types

#### 1. Dog Cards (Creatures)

- **Properties:** Cost, Attack, Health, Type, Ability
- **Summoning Sickness:** Dogs cannot attack the turn they're played (unless Rush)
- **Types:** Arcane, Defender, Guard, Striker, Holy, Agile, Support, Trickster, Tank, Legendary, Mystic, Storm, Titan, Shadow, Scout, Genius, Berserker, Token
- **Visual:** Each type has unique gradient color

#### 2. Spell Cards

- **Properties:** Cost, Ability
- **Types:** Direct damage, Healing, Buffs, Card draw, Resource gain, Summoning
- **Targeting:** Some spells require targeting (Belly Rub, Bark Shield, Zoomies)

#### 3. Item Cards

- **Properties:** Cost, Ability
- **Usage:** Must be equipped to a dog on the field
- **Effects:** Permanent stat boosts or ability grants

### Card Library

#### Dog Cards (20 total)

1. **Corgi Mage** (3 cost, 2/3) - Arcane - Summon: Gain 1 treat
2. **Golden Guardian** (5 cost, 4/5) - Defender - Taunt
3. **Husky Howler** (4 cost, 5/3) - Striker - Rush: Can attack immediately
4. **Pug Paladin** (2 cost, 2/2) - Holy - Divine: Heal 2 when played
5. **Shepherd Scout** (1 cost, 1/2) - Agile - None
6. **Beagle Bard** (3 cost, 1/4) - Support - Rally: +1 attack to all allies
7. **Dachshund Duelist** (2 cost, 3/1) - Striker - Glass Cannon
8. **Labrador Luminary** (6 cost, 6/6) - Legendary - Radiant: Deal 2 damage to enemy
9. **Chihuahua Charmer** (2 cost, 1/3) - Trickster - Evasion: 30% dodge
10. **Bulldog Bruiser** (4 cost, 3/6) - Tank - Sturdy: -1 damage taken
11. **Poodle Prodigy** (3 cost, 2/4) - Arcane - Summon: Draw a card
12. **Doberman Defender** (5 cost, 5/4) - Guard - Taunt
13. **Shiba Shaman** (4 cost, 3/4) - Mystic - Spirit: Gain 2 treats
14. **Terrier Tempest** (3 cost, 4/2) - Storm - Rush: Can attack immediately
15. **Mastiff Mountain** (7 cost, 7/8) - Titan - Colossal: Taunt
16. **Collie Cleric** (4 cost, 2/5) - Holy - Blessing: Heal all allies 1
17. **Akita Assassin** (3 cost, 4/3) - Shadow - Stealth: 40% dodge first turn
18. **Retriever Ranger** (2 cost, 2/3) - Scout - Fetch: Draw when this dies
19. **Border Collie Brain** (5 cost, 3/5) - Genius - Draw 2 cards when played
20. **Rottweiler Ravager** (6 cost, 6/5) - Berserker - Deal 1 damage to all enemies

#### Spell Cards (12 total)

1. **Fireball Fetch** (4 cost) - Deal 4 damage
2. **Healing Treats** (3 cost) - Restore 5 health
3. **Pack Howl** (5 cost) - +2/+2 to all your dogs
4. **Bone Storm** (6 cost) - Deal 2 damage to all enemies
5. **Belly Rub** (2 cost) - Heal a dog for 4 health (targeted)
6. **Zoomies** (1 cost) - Give a dog +2 attack this turn (targeted)
7. **Good Boy** (2 cost) - Draw 2 cards
8. **Tail Wag** (3 cost) - Gain 3 treats
9. **Bark Shield** (3 cost) - Give a dog +3 health (targeted)
10. **Fetch Lightning** (5 cost) - Deal 6 damage to target
11. **Puppy Eyes** (1 cost) - Gain 2 treats
12. **Unleash the Hounds** (7 cost) - Summon three 2/2 dogs

#### Item Cards (8 total)

1. **Collar of Power** (2 cost) - Dog gets +2 attack
2. **Armor Vest** (2 cost) - Dog gets +3 health
3. **Magic Bone** (3 cost) - Dog gets +2/+2
4. **Speed Boots** (1 cost) - Dog gains Rush
5. **Crown of Kings** (4 cost) - Dog gets +3/+3
6. **Shield Badge** (2 cost) - Dog gains Taunt
7. **Golden Leash** (3 cost) - Dog gets +1/+4
8. **Mystic Collar** (4 cost) - Dog gains: Draw a card when attacks

---

## Combat System

### Attack Mechanics

#### Direct Attack (Enemy Hero)

- Select attacker → Click "Attack Enemy" button
- Deals damage equal to attacker's attack value
- Attacker marked as "hasAttacked" for the turn

#### Creature vs Creature

- Select attacker → Click target creature
- Both creatures deal damage to each other simultaneously
- Creatures with 0 or less health are removed from field
- Damage calculation happens before removal

### Combat Rules

#### Taunt

- If enemy has any creature with Taunt, must attack Taunt creatures first
- Cannot attack enemy hero directly if Taunt exists
- Message: "Must attack Taunt dogs first!"

#### Rush

- Creatures with Rush can attack immediately when played
- Normal creatures have "summoning sickness" (canAttack: false initially)
- Rush creatures have canAttack: true when played

#### Dodge/Evasion

- **30% Dodge:** Chihuahua Charmer
- **40% Dodge:** Akita Assassin (first turn only)
- If dodge succeeds, attacker still marked as attacked but no damage dealt

#### Sturdy

- Reduces incoming damage by 1
- Minimum damage is 0 (cannot go negative)
- Applied to both attacker and defender if both have Sturdy

#### Death Effects

- **Fetch:** Retriever Ranger draws a card when it dies
- Currently only implemented for player's creatures

### Attack Restrictions

- Can only attack on player's turn
- Can only attack once per turn
- Must wait one turn after being played (unless Rush)
- Cannot attack if already attacked this turn

---

## Turn Structure

### Player Turn

1. **Start of Turn:**

   - Treats reset to maximum (increases by 1, max 10)
   - Hero ability becomes available
   - Draw 1 card
   - All creatures can attack (canAttack: true, hasAttacked: false)

2. **During Turn:**

   - Play cards (dogs, spells, items)
   - Use hero ability
   - Attack with creatures
   - Equip items to creatures
   - Cast targeted spells

3. **End Turn:**
   - Click "End Turn" button
   - Turn counter increments
   - Control passes to enemy

### Enemy Turn (AI)

1. **Start of Turn:**

   - Maximum treats increases
   - AI may play a random affordable dog card (70% chance)
   - All enemy creatures can attack

2. **Combat Phase:**

   - Enemy creatures attack (60% chance to attack player creatures, 40% to attack player directly)
   - Taunt creatures are prioritized as targets
   - Damage is dealt

3. **End of Turn:**
   - Control returns to player
   - Player's turn begins

---

## Abilities & Keywords

### Creature Abilities

#### Taunt

- Forces enemy to attack this creature before attacking hero
- Multiple Taunt creatures: any can be targeted
- Can be granted by items (Shield Badge)

#### Rush

- Creature can attack immediately when played
- Bypasses summoning sickness
- Can be granted by items (Speed Boots)

#### Evasion/Dodge

- **30% Dodge:** 30% chance to avoid damage
- **40% Dodge:** 40% chance (first turn only for Akita Assassin)
- If dodged, attacker still marked as attacked

#### Sturdy

- Reduces all incoming damage by 1
- Minimum damage is 0

#### Summon Effects (On Play)

- **Gain 1 treat:** Corgi Mage
- **Gain 2 treats:** Shiba Shaman
- **Heal 2 when played:** Pug Paladin
- **Deal 2 damage to enemy:** Labrador Luminary
- **Draw a card:** Poodle Prodigy
- **Draw 2 cards:** Border Collie Brain
- **Heal all allies 1:** Collie Cleric
- **Deal 1 damage to all enemies:** Rottweiler Ravager

#### Rally

- **Beagle Bard:** +1 attack to all allies when played - ✅ **IMPLEMENTED**

#### Draw on Attack

- Draw a card when this creature attacks
- Can be granted by Mystic Collar item

#### Fetch (Deathrattle)

- **Retriever Ranger:** Draw a card when this dies - ✅ **IMPLEMENTED**

#### Glass Cannon

- **Dachshund Duelist:** Deals +1 bonus damage when attacking - ✅ **IMPLEMENTED**
- High attack, low health creature that deals extra damage

#### Colossal

- **Mastiff Mountain:** Deals 2 damage to all enemies when played - ✅ **IMPLEMENTED**
- Massive creature that causes area damage on summon

### Spell Effects

#### Direct Damage

- Fireball Fetch: 4 damage
- Fetch Lightning: 6 damage
- Bone Storm: 2 damage to all enemies

#### Healing

- Healing Treats: Restore 5 health (capped at hero max health)
- Belly Rub: Heal target dog for 4 health

#### Buffs

- Pack Howl: +2/+2 to all your dogs
- Bark Shield: +3 health to target dog
- Zoomies: +2 attack to target dog (this turn only)

#### Card Draw

- Good Boy: Draw 2 cards

#### Resource Gain

- Tail Wag: Gain 3 treats
- Puppy Eyes: Gain 2 treats

#### Summoning

- Unleash the Hounds: Summon three 2/2 Hound Tokens

### Item Effects

#### Stat Boosts

- Collar of Power: +2 attack
- Armor Vest: +3 health
- Magic Bone: +2/+2
- Crown of Kings: +3/+3
- Golden Leash: +1/+4

#### Ability Grants

- Speed Boots: Grants Rush
- Shield Badge: Grants Taunt
- Mystic Collar: Grants "Draw on attack"

---

## UI/UX Features

### Visual Design

- **Color Scheme:** Gradient backgrounds based on card types
- **Card Design:**
  - Cost badge (top-left, amber circle)
  - Art emoji (large, centered)
  - Name (bold, small text)
  - Type/Stats (for dogs)
  - Ability text (bottom, black/40 opacity background)
- **Visual States:**
  - Disabled: 50% opacity
  - Selected: Yellow ring, scale 105%
  - Can Attack: Green ring, pulse animation
  - Hover: Scale 105%

### Game States

1. **Start Screen:**

   - Title: "Pawmancer" with Sparkles icon
   - Simple logo/branding
   - Subtle animated background gradient
   - "Start Game" button → Navigates to Hero Select
   - "Rules/Tutorial" button → Opens tutorial modal
   - Entry point for all new games

2. **Hero Selection Screen:**

   - Title: "Pawmancer" with Sparkles icon
   - Centered layout with 3 hero cards (reduced from 6)
   - Premium hero cards display: breed tag, difficulty badge, hero icon, HP + Treat cost row, and ability pill with icon
   - Hover/focus states: tilt/scale effects, glowing outline pulse
   - Difficulty colors communicate approachability (Easy/Balanced/Advanced)
   - CTA footer ("Tap to Lead") reinforces interaction cue

3. **Game Screen:**
   - Top bar: Turn counter, Message display, Tutorial button (pulses when new tips available), Quit button
   - Enemy section: Hero info, Health, Field
   - Player field section: Your Dogs
   - Player section: Hero info, Health, Treats, Hero Ability/End Turn buttons, Hand
   - Guided onboarding: contextual tip banners highlight key areas during the first match

### User Interactions

- **Card Click:** Play card (if affordable) or select for targeting
- **Creature Click:** Select as attacker or target for items/spells
- **Button Clicks:**
  - Hero Power: Activate hero ability
  - End Turn: Pass turn to enemy
  - Tutorial: Reopen the rules modal on-demand, even if auto-show is disabled
  - Attack Enemy: Direct attack to enemy hero
  - Quit: Return to hero selection

### Feedback Systems

- **Message Display:** Shows current game state and actions
- **Visual Feedback:**
  - Card highlighting
  - Disabled states
  - Attack indicators
- **Turn Indicators:** "Your Turn" / "Enemy Turn" display

### UI/UX Improvements (Planned)

#### Visual Hierarchy Improvements

- **Game Board:**

  - Add drop shadows under card UI rows
  - Add slightly darker panels behind enemy/player areas
  - Add subtle soft borders around player's hand
  - Reduce empty blue area in "Your Dogs" section (add illustration/pattern or scale panels tighter)

- **Hero Cards:**
  - Increase hero name font by 10-15%
  - Add thin white outline around hero icons
  - Make health icon slightly larger
  - Add subtle background vignette for contrast
  - Replace emoji art with vector icons (optional future enhancement)

#### Button Bar Improvements

- **Hero Power:** Standout pill shape with glow effect
- **End Turn:** Bright color (yellow/blue) with highlight
- **Attack Enemy:** Strong red/orange button
- **Visual Grouping:**
  - Hero Power (standalone)
  - Actions (grouped)
  - End Turn (highlighted, separate)

#### Card Text Contrast

- Increase contrast on ability text boxes
- Add slight rounded corners
- Increase ability font weight or size
- Add icons for abilities (heal, attack, shield, draw, etc.)

#### Animations

- **Card hover:** Subtle float effect
- **Card play:** Scale out + fade in
- **Attack:** Quick shake/flash
- **Damage:** Red flicker or number popup
- **Heal:** Green sparkle and +HP popup
- **Draw:** Card slides into hand
- Implement with Tailwind animate utilities or Framer Motion

#### Empty Board Areas

- Add semi-transparent pawprint pattern
- Add corner glow edges
- Reduce vertical padding in "Your Dogs" area
- Add small "Drag cards here to play dog cards" tooltip for tutorial version

#### Targeting Feedback

- Cursor change (pointer → crosshair when targeting)
- Highlight targetable units with glowing border
- Disable untargetable ones more visibly (blur or darker dim)

#### Turn Messaging

- Big "Your Turn" banner with ripple animation
- Opponent's turn dims the field and disables buttons more clearly

#### First-Time Tutorial UX

- Tutorial modal auto-opens before the first match with three guided steps (turn flow, Treat economy, victory tips).
- Contextual banners highlight the enemy row, your field, hero ability controls, and your hand until dismissed.
- Tutorial button in the header pulses while guidance is active; clicking it reopens the modal anytime.
- "Hide Tips" action clears the banners, and a "Don't show again" checkbox stores the player preference in `localStorage`.

#### Sound Cues

- Card drawn
- Card played
- Damage dealt
- Heal
- End turn
- Hero ability used
- Error (invalid move)
- Light, satisfying "clicks" and "pops"

#### Mobile Friendly Layout

- Hand as a slider
- Buttons stacked vertically
- Slightly larger hitboxes
- 3 heroes work well in vertical layout

---

## Technical Implementation

### Technology Stack

- **Framework:** React 18.2.0
- **Language:** TypeScript
- **Build Tool:** Vite 5.0.8
- **Styling:** Tailwind CSS 3.3.6
- **Icons:** Lucide React 0.294.0

### State Management

- React Hooks (useState, useEffect)
- Game state variables:
  - `gameState`: 'hero-select' | 'playing'
  - `selectedHero`, `enemyHero`
  - `playerHealth`, `enemyHealth`
  - `playerTreats`, `maxTreats`
  - `playerHand`, `playerField`, `enemyField`, `playerDeck`
  - `selectedCard`, `selectedAttacker`, `targetingMode`
  - `turn`, `isPlayerTurn`, `playerAbilityReady`
  - `message`

### Key Functions

- `selectHero()`: Initialize game with selected hero
- `startGame()`: Setup deck, hand, initial state
- `drawCard()`: Add card from deck to hand
- `playCard()`: Handle card playing logic
- `playDog()`: Summon dog to field
- `playSpell()`: Execute spell effects
- `applyItemToDog()`: Equip item to creature
- `applySpellToDog()`: Apply targeted spell
- `attack()`: Handle combat
- `endTurn()`: Transition to enemy turn
- `enemyTurn()`: AI turn logic
- `useHeroAbility()`: Activate hero power

### Data Structures

#### Hero Object

```typescript
{
  id: string;
  name: string;
  breed: string;
  health: number;
  ability: string;
  abilityCost: number;
  icon: LucideIcon;
  color: string; // Tailwind gradient class
}
```

#### Card Object

```typescript
{
  id: number;
  name: string;
  cost: number;
  attack?: number; // Dogs only
  health?: number; // Dogs only
  cardType: "dog" | "spell" | "item";
  type?: string; // Dog type (Arcane, Striker, etc.)
  ability: string;
  art: string; // Emoji
  uid?: string; // Unique ID for instances
  canAttack?: boolean; // For dogs on field
  hasAttacked?: boolean; // For dogs on field
}
```

---

## Implementation Checklist

### ✅ Completed Features

#### Core Systems

- [x] Hero selection screen
- [x] 3 playable heroes (Rex, Buddy, Shadow) with unique abilities
- [x] Treat resource system (1-10 max)
- [x] Deck construction (2 copies of each card)
- [x] Hand management (starting hand, draw per turn)
- [x] Turn-based gameplay
- [x] Win/loss conditions

#### Card Types

- [x] Dog cards (20 unique dogs)
- [x] Spell cards (12 unique spells)
- [x] Item cards (8 unique items)
- [x] Card playing mechanics
- [x] Cost system

#### Combat System

- [x] Direct hero attacks
- [x] Creature vs creature combat
- [x] Taunt mechanic
- [x] Rush mechanic
- [x] Dodge/Evasion (30% and 40%)
- [x] Sturdy damage reduction
- [x] Summoning sickness
- [x] Attack once per turn restriction

#### Abilities

- [x] Hero abilities (current roster)
- [x] Summon effects (treat gain, healing, damage, card draw)
- [x] Rush ability
- [x] Taunt ability
- [x] Dodge/Evasion
- [x] Sturdy
- [x] Draw on attack (Mystic Collar)
- [x] Rally ability (Beagle Bard)
- [x] Fetch/Deathrattle (Retriever Ranger)
- [x] Glass Cannon (Dachshund Duelist)
- [x] Colossal (Mastiff Mountain)

#### Spells

- [x] Direct damage spells
- [x] Healing spells
- [x] Buff spells (Pack Howl, Bark Shield, Zoomies)
- [x] Card draw spells
- [x] Resource gain spells
- [x] Summoning spells (Unleash the Hounds)
- [x] Targeted spells (Belly Rub, Bark Shield, Zoomies)

#### Items

- [x] Stat boost items
- [x] Ability grant items (Rush, Taunt, Draw on attack)
- [x] Item targeting system
- [x] Item application to creatures

#### AI System

- [x] Enemy hero selection (random)
- [x] AI card playing (70% chance, affordable cards)
- [x] AI combat (60% attack creatures, 40% attack hero)
- [x] AI taunt priority
- [x] Enemy turn automation

#### UI/UX

- [x] Hero selection screen
- [x] Game board layout
- [x] Card visual design
- [x] Color-coded card types
- [x] Visual feedback (selected, disabled, can attack)
- [x] Message system
- [x] Turn indicators
- [x] Health and treat displays
- [x] Button controls

### ❌ Not Yet Implemented / Needs Work

> **Note:** See [Development Roadmap](#development-roadmap) for prioritized task list with dependencies.

#### Missing Abilities (Priority: Medium)

- [x] Rally ability (Beagle Bard: +1 attack to all allies) - ✅ **COMPLETED**
- [x] Fetch/Deathrattle (Retriever Ranger: Draw when dies) - ✅ **COMPLETED**
- [x] Glass Cannon (Dachshund Duelist: +1 bonus damage when attacking) - ✅ **COMPLETED**
- [x] Colossal keyword (Mastiff Mountain: Deal 2 damage to all enemies when played) - ✅ **COMPLETED**

#### Missing Features (Priority: High)

- [x] Hand size limit (10 card maximum, excess discarded) - ✅ **COMPLETED**
- [x] Field size limit (7 creature maximum, enforced) - ✅ **COMPLETED**
- [x] Deck out mechanic (lose when deck empty) - ✅ **COMPLETED**
- [x] **Start Screen** - New entry point with branding - **Dependency:** None (see Roadmap Task 5) - �?: **COMPLETED**
- [x] **Tutorial Modal** - Rules and tutorial system - **Dependency:** Start screen (see Roadmap Task 6) - �?: **COMPLETED**
- [x] **Reduce Hero Roster** - Streamline to 3 heroes - **Dependency:** None (see Roadmap Task 7) - ✅ **COMPLETED**
- [x] **Hero Selection UI Improvements** - Enhanced visual design - **Dependency:** 3-hero roster (see Roadmap Task 9) - ✅ **COMPLETED**
- [ ] Card animations - **Dependency:** None
- [ ] Sound effects - **Dependency:** None
- [ ] Victory/defeat animations - **Dependency:** None
- [ ] Statistics tracking - **Dependency:** None
- [ ] Game history/replay - **Dependency:** None

#### Balance & Polish (Priority: High)

- [x] Card balance testing - ✅ **COMPLETED** (see Roadmap Task 1)
- [x] Hero balance testing - ✅ **COMPLETED** (see Roadmap Task 2)
- [ ] AI difficulty levels - **Dependency:** None
- [x] Tutorial system - **Dependency:** Start screen (see Roadmap Task 6) - �?: **COMPLETED**
- [ ] Tooltips for abilities - **Dependency:** None
- [ ] Card hover descriptions - **Dependency:** None
- [ ] **UI/UX Improvements** - Visual hierarchy, animations, targeting feedback - **Dependency:** None (see UI/UX Improvements section)

#### Technical Improvements (Priority: Medium)

- [ ] TypeScript type definitions (currently many `any` types) - **Dependency:** None
- [ ] Error handling - **Dependency:** None
- [ ] Performance optimization - **Dependency:** None
- [ ] Code refactoring (extract constants, reduce duplication) - **Dependency:** None
- [ ] Unit tests - **Dependency:** None
- [ ] Integration tests - **Dependency:** None

---

## Development Roadmap

This section outlines the planned development tasks with priorities and dependencies. Tasks are organized by priority level and include dependency information to guide implementation order.

### Priority Levels

- **High Priority:** Critical for game balance and core functionality
- **Medium Priority:** Important features that enhance gameplay
- **Low Priority:** Nice-to-have features and polish

### Task List

#### 1. Balance Changes (High Priority) ✅ COMPLETED

**Purpose:** Fix overtuned/undertuned cards and hero abilities.

**Dependencies:** None

##### 1.1 Card Stat Adjustments ✅

- [x] **Husky Howler:** Adjust to 4/3 stats OR increase cost to 5 (Changed to 4/3)
- [x] **Terrier Tempest:** Verify stats are 3/2 (currently 4/2, may need adjustment) (Changed to 3/2)
- [x] **Border Collie Brain:** Nerf (choose one):
  - Reduce to 1 card draw, OR
  - Change stats to 2/4, OR
  - Increase cost to 6 (Reduced to 1 card draw)
- [x] **Rottweiler Ravager:** Change ability to "Deal 1 damage to all enemy creatures" (remove hero damage)
- [x] **Shepherd Scout:** Buff with small keyword:
  - Agile: 20% dodge, OR
  - Weaker Fetch ability (Added Agile: 20% dodge)
- [x] **Pug Paladin:** Increase heal from 2 → 3 OR add mini-shield effect (Increased heal to 3)
- [x] **Mastiff Mountain:** Adjust once Colossal keyword is defined - ✅ **COMPLETED** (Colossal: Deal 2 damage to all enemies when played)
- [x] **Add missing keyword definitions:** Rally, Fetch, Glass Cannon, Colossal - ✅ **COMPLETED**

##### 1.2 Spell Balance Updates ✅

- [x] **Fireball Fetch:** Increase damage from 4 → 5
- [x] **Bone Storm:** Increase damage from 2 → 3 OR reduce cost from 6 → 5 (Increased damage to 3)
- [x] **Pack Howl:** Increase cost from 5 → 6 OR reduce buff from +2/+2 → +1/+2 (Increased cost to 6)

##### 1.3 Resource System Fixes ✅

- [x] **Treat-gain fix:** Treat-gain abilities no longer increase max treats (only current treats)
- [x] **Tail Wag:** Reduce from gain 3 treats → gain 2 treats
- [x] **Puppy Eyes:** Reduce from gain 2 treats → gain 1 treat
- [x] **Shiba Shaman:** Reduce from gain 2 treats → gain 1 treat
- [x] **Corgi Mage:** Change to "Gain treat next turn" (delayed effect)

---

#### 2. Hero Balance Update (High Priority) ✅ COMPLETED

**Dependencies:** None

- [x] **Rex the Warrior:** Increase damage from 2 → 3
- [x] **Shadow the Swift:** Add "take 1 fatigue if hand full" to card draw ability
- [x] **Roster cleanup:** Legacy heroes were archived and removed from selection in Task 7

---

#### 3. Core Rule Improvements (High Priority) ✅ COMPLETED

**Dependencies:** None

- [x] **Hand size limit:** Implement 10 card maximum (discard excess)
- [x] **Field limit:** Implement 7 creature maximum (cannot play if field full)
- [x] **Deck-out mechanic:** Player loses if deck is empty and must draw
- [ ] **Keyword rules cleanup:** Implement full keyword rules section with all definitions (Deferred - will be implemented in Task 4)

---

#### 4. Complete Missing Abilities (Medium Priority) ✅ COMPLETED

**Dependencies:** Balance pass first (Tasks 1-3)

- [x] **Rally ability:** Implement Beagle Bard's +1 attack to all allies - ✅ **COMPLETED**
- [x] **Fetch/Deathrattle:** Implement Retriever Ranger's "Draw when this dies" - ✅ **COMPLETED**
- [x] **Glass Cannon:** Define and implement for Dachshund Duelist - ✅ **COMPLETED** (Deals +1 bonus damage when attacking)
- [x] **Colossal:** Define and implement for Mastiff Mountain - ✅ **COMPLETED** (Deals 2 damage to all enemies when played)
- [x] **Ability parsing:** Add ability text patterns to ability parsing section - ✅ **COMPLETED**

---

#### 5. Add Start Screen (High Priority) �?: COMPLETED

**Purpose:** Create new entry point for the game with proper onboarding flow.

**Dependencies:** None

**Tasks:**

- [x] **Create new screen:** Start Screen component now gates entry before hero selection
- [x] **Add Start Game button:** CTA transitions directly into Hero Select screen
- [x] **Add Rules/Tutorial button:** Book icon button opens an overlay modal with rules content
- [x] **Add simple logo/branding:** Sparkles icon with Pawmancer masthead + tagline
- [x] **Add subtle animated background gradient:** Dynamic gradient layer and light overlay
- [x] **Remove instant hero selection:** App boots into start screen instead of showing heroes immediately

---

#### 6. Implement Small Tutorial Modal (High Priority) �?: **COMPLETED**

**Purpose:** Provide in-game tutorial and rules explanation for new players.

**Dependencies:** Start screen (Task 5)

**Tasks:**

- [x] **Create in-game Rules modal:** Dedicated `TutorialModal` component covers turn order, Treat economy, victory rules, and card type explanations.
- [x] **Add visual cues and diagrams:** Lucide icons + mini board diagrams + card-type cheat sheet reinforce onboarding concepts.
- [x] **Add "Don't show again" preference:** Checkbox persists to `localStorage` to skip auto-open in future matches.
- [x] **Integrate first-time UX tips:** Modal auto-opens on the first game and enables guided tooltips with contextual highlights and a hide button.

---

#### 7. Reduce Hero Roster to 3 Heroes (High Priority) ✅ **COMPLETED**

**Purpose:** Simplify hero selection for cleaner starter experience in early development.

**Dependencies:** None

**Tasks:**

- [x] **Trimmed playable heroes:** `HEROES` data now contains only Rex, Buddy, and Shadow so both player choice and enemy selection draw from the same focused trio.
- [x] **Enemy AI alignment:** Random enemy hero selection automatically respects the trimmed pool, preventing legacy heroes from reappearing.
- [x] **Hero Select layout:** Screen now centers three hero cards with even spacing for a balanced presentation on all breakpoints.
- [x] **Documentation refresh:** Hero System, roadmap, and checklists describe only the current three heroes and highlight their roles.
- [x] **Removed legacy references:** Excised outdated hero names from tasks/balance notes to avoid confusion.
- [x] **Systems validation:** Hero ability logic and deck-building flow confirmed to work without additional branching for retired heroes.

**Current Heroes:**

- **Rex the Warrior:** Attacker-balanced hero
- **Buddy the Guardian:** Healer-tank hero
- **Shadow the Swift:** Draw/tempo hero

---

#### 8. Update GDD Content (High Priority) - COMPLETED

**Purpose:** Keep documentation in sync with game changes.

**Dependencies:** Remove heroes (Task 7)

**Tasks:**

- [x] **Update Hero System section:** Lists only Rex, Buddy, and Shadow with their latest stats, abilities, and roles.
- [x] **Remove references to legacy heroes:** All balance notes, roadmap bullets, and UI sections now refer exclusively to the active roster.
- [x] **Update screenshots, hero examples, and UI descriptions:** Copy describes the centered 3-hero grid and highlights the surviving heroes.
- [x] **Add Start Screen to Game States section:** Start screen details (logo, CTA buttons, gradient background) live in the Game States chapter.
- [x] **Add Rules/Tutorial to UI/UX chapter:** Tutorial modal flow, guided hints, and the header button behavior are documented.
- [x] **Add new onboarding flow to Game Overview:** The overview now calls out Start Screen -> Hero Selection -> Game Screen as the default path.

---

#### 9. Improve Hero Selection Screen UI (High Priority) ✅ **COMPLETED**

**Purpose:** Enhance visual appeal and usability of hero selection with 3-hero layout.

**Dependencies:** 3-hero roster (Task 7)

**Tasks:**

- [x] **Responsive centering:** Hero cards sit in a flexible row that stays centered on all breakpoints with comfortable spacing.
- [x] **Premium hero card layout:** Updated cards feature breed tag, difficulty badge, HP + Treat cost bar, and an ability pill with dedicated icons.
- [x] **Micro-interactions:** Hover/focus states add tilt/translate motion, glow overlays, and a pulsing selection ring driven by highlight state.
- [x] **Difficulty labels:** Easy/Balanced/Advanced badges with color coding communicate approachability.
- [x] **CTA footer + guidance:** “Tap to Lead” footer text nudges players to click, reinforcing the interaction model.

---

#### 10. Campaign Mode Section (Medium Priority)

**Dependencies:** None

**Add new GDD chapter covering:**

- [ ] **Campaign map overview:** World structure and progression
- [ ] **Acts:**
  - Act 1: Whiskerwood
  - Act 2: Barkspire
  - Act 3: Howlbane
  - Act 4: Void Kennel
- [ ] **Boss mechanics:** Special boss encounters and abilities
- [ ] **Difficulty scaling:** How difficulty increases through campaign
- [ ] **Campaign rewards:** Cards, lore, cosmetics unlocked through campaign

---

#### 11. Multiplayer Mode Additions (Medium Priority)

**Dependencies:** Basic balance and rules must be updated first (Tasks 1-3)

**Add new GDD section covering:**

- [ ] **Casual PvP:** Unranked player vs player matches
- [ ] **Ranked ladder:** Competitive ranked system
- [ ] **MMR matchmaking:** Matchmaking rating system
- [ ] **Seasonal resets:** Rank reset mechanics
- [ ] **Ranked rewards:** Rewards for ranked play
- [ ] **Future modes:** Arena, Draft, Friendly Match concepts

---

#### 12. Progression, Achievements & Unlocks (Medium Priority)

**Dependencies:** None

**Add new section covering:**

- [ ] **Player XP system:** Experience points and leveling
- [ ] **Level milestones:** Rewards at specific levels
- [ ] **Daily/weekly quests:** Quest system design
- [ ] **Achievements categories:** Types of achievements
- [ ] **Rewards system:** Packs, cosmetics, hero skins
- [ ] **Card packs:** Rarity drop rates
- [ ] **Duplicate → dust system:** Crafting resource system
- [ ] **Collection screen structure:** UI/UX for collection management

---

#### 13. Monetization (Optional) (Low/Medium Priority)

**Dependencies:** Unlock/progression section must be added first (Task 12)

- [ ] **Cosmetic shop items:** Define cosmetic-only purchases
- [ ] **Battle pass model:** Seasonal battle pass structure
- [ ] **Starter bundle:** New player bundle design
- [ ] **Ethical paid packs rules:** Guidelines for monetization
- [ ] **Event-based limited cosmetics:** Limited-time cosmetic items

---

#### 14. Technical GDD Updates (Medium Priority)

**Dependencies:** New features must be described first (Tasks 10-13)

- [ ] **Ability system architecture:** Update with new ability patterns
- [ ] **Multiplayer backend section:** API, sockets, matchmaking service
- [ ] **Campaign state persistence:** How campaign progress is saved
- [ ] **Progression storage:** Database structure for player data

---

#### 15. Future Scalability Updates (Low Priority)

**Dependencies:** None

- [ ] **Deck-building system:** Custom deck construction
- [ ] **Card crafting:** Craft cards from resources
- [ ] **Tournament mode:** Tournament structure and rules
- [ ] **Spectator mode:** Watch other players' games
- [ ] **Replays:** Save and replay game sessions
- [ ] **Seasonal expansions:** New card set release model
- [ ] **Mobile/PWA roadmap:** Mobile app development plan

---

#### 16. Document Restructure Tasks (Low Priority)

**Dependencies:** After adding all new sections (Tasks 10-14)

- [ ] **Reorganize table of contents:** Update with new sections
- [ ] **Add cross links:** Link related sections together
- [ ] **Move keyword definitions to appendix:** Better organization
- [ ] **Add glossary:** Quick reference for terms
- [ ] **Version update:** Mark as v1.1 after changes

---

### Implementation Order Recommendation

**Phase 1 (Critical Balance):**

1. Tasks 1-3 (Balance Changes, Hero Balance, Core Rules) - ✅ **COMPLETED**

**Phase 2 (New High Priority Features):**

2. Task 5 (Start Screen) - ✅ **COMPLETED**
3. Task 6 (Tutorial Modal) - ✅ **COMPLETED**
4. Task 7 (Reduce Hero Roster) - ✅ **COMPLETED**
5. Task 8 (Update GDD Content) - ✅ **COMPLETED**
6. Task 9 (Improve Hero Selection UI) - ✅ **COMPLETED**

**Phase 3 (Core Features):**

7. Task 4 (Missing Abilities) - ✅ **COMPLETED**
8. Task 10 (Campaign Mode) - Can start after Phase 2

**Phase 4 (Extended Features):**

9. Task 12 (Progression System) - Can start in parallel
10. Task 11 (Multiplayer) - After Phase 2 & 3
11. Task 13 (Monetization) - After Task 12

**Phase 5 (Documentation & Polish):**

12. Task 14 (Technical Updates) - After features are defined
13. Task 15 (Future Scalability) - Ongoing planning
14. Task 16 (Document Restructure) - Final step

---

## Future Features

> **Note:** For detailed implementation roadmap with priorities and dependencies, see [Development Roadmap](#development-roadmap) section.

### High Priority Features (See Roadmap Tasks 1-9)

- Complete balance changes (cards, heroes, spells) - ✅ **COMPLETED**
- Core rule improvements (hand limit, field limit, deck-out) - ✅ **COMPLETED**
- Missing ability implementations (Rally, Fetch, Glass Cannon, Colossal) - ✅ **COMPLETED**
- **Start Screen** - New entry point with branding and navigation - ✅: **COMPLETED**
- **Tutorial Modal** - In-game rules and tutorial system - ✅: **COMPLETED**
- **Reduce Hero Roster** - Streamline to 3 heroes (Rex, Buddy, Shadow) - ✅: **COMPLETED**
- **Hero Selection UI Improvements** - Enhanced visual design and interactions - ✅: **COMPLETED**
- **UI/UX Polish** - Visual hierarchy, animations, targeting feedback, sound cues

### Medium Priority Features (See Roadmap Tasks 10-14)

- Campaign mode with story progression
- Multiplayer PvP (casual and ranked)
- Progression system (XP, achievements, unlocks)
- Monetization (cosmetics, battle pass)

### Low Priority Features (See Roadmap Tasks 9-11)

- Advanced game modes (Arena, Draft, Tournament)
- Social features (leaderboards, friends, spectating)
- Content expansions (new card sets, seasonal events)
- Platform expansion (mobile, PWA)

### Technical Improvements

- Full TypeScript implementation
- Comprehensive testing suite
- State management refactor
- Performance optimization
- Mobile responsive design

---

## Card Ability Reference

### How to Read Abilities

When implementing new abilities, check the ability text string for keywords:

- **"Gain X treat(s)"** - Add treats to player
- **"Draw X card(s)"** - Draw from deck
- **"Heal X"** - Restore health
- **"Deal X damage"** - Reduce enemy health
- **"Rush"** - Can attack immediately
- **"Taunt"** - Must be attacked first
- **"Dodge"** or **"Evasion"** - Chance to avoid damage
- **"Sturdy"** - Reduce incoming damage by 1
- **"Summon:"** - Effect when played
- **"Fetch:"** - Effect when dies (draw a card)
- **"Rally:"** - Effect to all allies (+1 attack to all allies)
- **"Glass Cannon"** - +1 bonus damage when attacking
- **"Colossal:"** - Deal 2 damage to all enemies when played
- **"Draw on attack"** - Effect when attacking

### Ability Implementation Pattern

Most abilities are checked using `card.ability.includes("keyword")`. This is a simple string matching approach. For more complex abilities, consider:

1. Parsing ability text into structured data
2. Using ability IDs instead of text matching
3. Creating an ability system with registered effects

---

## Notes for Developers

### Adding New Cards

1. Add card object to `CARD_LIBRARY` array
2. If dog card: Add type to `typeColors` in Card component
3. If spell: Add effect logic to `playSpell()` function
4. If item: Add effect logic to `applyItemToDog()` function
5. If dog has new ability: Add logic to `playDog()` or `attack()` functions

### Adding New Heroes

1. Add hero object to `HEROES` array
2. Import icon from lucide-react
3. Add case to `useHeroAbility()` switch statement
4. Hero will automatically appear in selection screen

### Modifying Game Rules

- Treat system: Modify `maxTreats` logic in `enemyTurn()`
- Starting hand: Modify `startGame()` function
- Draw per turn: Modify `enemyTurn()` and start of player turn
- Field limits: Add checks in `playDog()` function

### AI Improvements

Current AI is very simple (random card play, random targeting). To improve:

1. Add card evaluation (value cards by cost/stat ratio)
2. Add threat assessment (prioritize high-value targets)
3. Add resource management (save treats for better cards)
4. Add difficulty levels (adjust AI decision making)

---

## Version History

### v1.1 (Current)

- Added Development Roadmap with priorities and dependencies
- Updated Future Features section
- Updated Implementation Checklist with dependency information
- Reorganized task tracking

### v1.0

- Initial release
- 6 heroes
- 20 dog cards, 12 spell cards, 8 item cards
- Basic combat system
- AI opponent
- Core gameplay loop

---

**End of Document**



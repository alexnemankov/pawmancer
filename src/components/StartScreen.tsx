import { useState } from "react";
import { Sparkles, Play, BookOpen, X } from "lucide-react";

interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  const [showRules, setShowRules] = useState(false);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden text-white">
      <div className="start-screen-gradient absolute inset-0" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_65%)]" />

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center px-6 py-16 text-center">
        <div className="flex items-center gap-4 text-5xl font-black tracking-tight md:text-6xl">
          <Sparkles className="text-amber-200 drop-shadow-lg" size={56} />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-200">
              Fantasy Dog Card Game
            </p>
            Pawmancer
          </div>
        </div>
        <p className="mt-6 text-xl text-slate-100 md:text-2xl">
          Lead your legendary pack of pups, unleash spells, and outsmart the AI
          in tactical card battles.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <button
            type="button"
            onClick={onStart}
            className="flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-rose-500 via-orange-400 to-amber-300 px-10 py-4 text-lg font-semibold text-slate-900 shadow-2xl shadow-rose-700/30 transition hover:scale-105 hover:shadow-rose-600/50 focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-200"
          >
            <Play />
            Start Game
          </button>
          <button
            type="button"
            onClick={() => setShowRules(true)}
            className="flex items-center justify-center gap-3 rounded-full border border-white/60 px-10 py-4 text-lg font-semibold text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
          >
            <BookOpen />
            Rules & Tutorial
          </button>
        </div>

        <div className="mt-16 grid w-full grid-cols-1 gap-6 text-left md:grid-cols-3">
          {[
            {
              title: "Build Your Pack",
              description:
                "Draw from a shared library of heroic hounds, spells, and items to create wild combos.",
            },
            {
              title: "Master Treat Economy",
              description:
                "Treats recharge each turn—spend them wisely to control the tempo and secure the win.",
            },
            {
              title: "Claim Victory",
              description:
                "Reduce the enemy hero to 0 health by commanding your dogs and casting powerful spells.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-3xl border border-white/20 bg-white/5 p-6 backdrop-blur"
            >
              <h3 className="text-xl font-semibold text-white">{card.title}</h3>
              <p className="mt-3 text-sm text-slate-100">{card.description}</p>
            </div>
          ))}
        </div>
      </div>

      {showRules && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-950/70 px-6 py-8 backdrop-blur">
          <div className="w-full max-w-3xl rounded-3xl border border-slate-100 bg-white text-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <div className="flex items-center gap-3 text-2xl font-bold">
                <BookOpen className="text-rose-500" />
                Rules & Tutorial
              </div>
              <button
                type="button"
                onClick={() => setShowRules(false)}
                className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100"
                aria-label="Close rules"
              >
                <X />
              </button>
            </div>
            <div className="grid gap-4 px-6 py-6 text-left text-base leading-relaxed">
              <div>
                <p className="font-semibold text-slate-900">Objective</p>
                <p className="text-slate-600">
                  Choose a hero, command your squad of dogs, and reduce the
                  enemy hero&apos;s health to 0 before they do the same.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Turn Flow</p>
                <ul className="list-disc pl-5 text-slate-600">
                  <li>Draw a card at the start of your turn.</li>
                  <li>
                    Spend Treats (mana) to play dog, spell, or item cards.
                  </li>
                  <li>
                    Dogs can attack once per turn. Aim at enemy dogs or their
                    hero.
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Card Types</p>
                <ul className="list-disc pl-5 text-slate-600">
                  <li>
                    <span className="font-semibold text-slate-900">Dogs:</span>{" "}
                    Creature cards that stay on the board and attack.
                  </li>
                  <li>
                    <span className="font-semibold text-slate-900">Spells:</span>{" "}
                    One-time effects like damage, buffs, or card draw.
                  </li>
                  <li>
                    <span className="font-semibold text-slate-900">Items:</span>{" "}
                    Attachments that upgrade a friendly dog.
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Tips</p>
                <ul className="list-disc pl-5 text-slate-600">
                  <li>Plan around the 7-dog field limit and 10-card hand cap.</li>
                  <li>
                    Hero abilities refresh each turn—use them to swing momentum.
                  </li>
                  <li>Use Treat-gain carefully; max Treats only rise each turn.</li>
                </ul>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4">
              <button
                type="button"
                onClick={() => setShowRules(false)}
                className="rounded-full bg-rose-500 px-6 py-2 text-white transition hover:bg-rose-600"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

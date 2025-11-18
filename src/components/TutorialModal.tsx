import { useEffect, useState } from "react";
import { BookOpen, Sparkles, Zap, PawPrint, Sword, Target } from "lucide-react";

interface TutorialModalProps {
  isOpen: boolean;
  onClose: (dontShowAgain: boolean) => void;
}

const steps = [
  {
    title: "Turn Overview",
    description:
      "Each round begins with a new card draw. Spend treats to play cards, command your dogs, and end your turn when you are ready.",
    bullets: [
      "Draw 1 card",
      "Play dogs, spells, or items",
      "Attack, then End Turn",
    ],
    icon: BookOpen,
  },
  {
    title: "Treat Economy",
    description:
      "Treats refresh every turn. Plan ahead so you can curve out powerful dogs or hold spells for the perfect moment.",
    bullets: [
      "Max treats increase by 1 each turn (up to 10)",
      "Unspent treats do not carry over",
      "Cards show their treat cost on the top-left",
    ],
    icon: Zap,
  },
  {
    title: "Win Conditions",
    description:
      "Knock the opposing hero to 0 health before they can do the same to you. Clear enemy dogs strategically to open a path.",
    bullets: [
      "Dogs can attack once per turn",
      "Target enemy dogs first unless the path is clear",
      "Hero abilities refresh every turn—use them!",
    ],
    icon: Sword,
  },
];

const cardCheatsheet = [
  {
    label: "Dogs",
    description: "Stay on board, have attack & health values",
    color: "bg-emerald-400/30 border-emerald-400/50 text-emerald-900",
  },
  {
    label: "Spells",
    description: "One-shot effects for damage, buffs, or utility",
    color: "bg-sky-400/30 border-sky-400/50 text-sky-900",
  },
  {
    label: "Items",
    description: "Attach to a dog to upgrade its stats or keywords",
    color: "bg-amber-400/30 border-amber-400/50 text-amber-900",
  },
];

export default function TutorialModal({ isOpen, onClose }: TutorialModalProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStepIndex(0);
      setDontShowAgain(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const CurrentIcon = steps[stepIndex].icon;

  const handleAdvance = () => {
    if (stepIndex === steps.length - 1) {
      onClose(dontShowAgain);
      return;
    }
    setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const closeFromX = () => onClose(dontShowAgain);

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-950/70 px-4 py-8 backdrop-blur">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-8 py-6">
          <div className="flex items-center gap-3 text-2xl font-bold text-slate-900">
            <Sparkles className="text-rose-500" />
            Pawmancer Tutorial
          </div>
          <button
            type="button"
            onClick={closeFromX}
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100"
            aria-label="Close tutorial"
          >
            X
          </button>
        </div>

        <div className="grid gap-8 bg-slate-50 px-8 py-8 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-inner">
            <div className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-400">
              Step {stepIndex + 1} / {steps.length}
            </div>
            <div className="mt-4 flex items-center gap-3 text-2xl font-bold text-slate-900">
              <CurrentIcon className="text-rose-500" />
              {steps[stepIndex].title}
            </div>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              {steps[stepIndex].description}
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
              {steps[stepIndex].bullets.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              {steps.map((_, idx) => (
                <button
                  key={idx}
                  aria-label={`Go to tutorial step ${idx + 1}`}
                  className={`h-2 w-10 rounded-full transition ${
                    idx === stepIndex ? "bg-rose-500" : "bg-slate-200"
                  }`}
                  onClick={() => setStepIndex(idx)}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="mb-4 flex items-center gap-3 text-lg font-semibold text-slate-900">
                <Target className="text-slate-500" />
                Quick Reference
              </div>
              <div className="grid gap-3 text-sm text-slate-600">
                <div className="rounded-xl border border-indigo-200 bg-indigo-50/70 p-3">
                  <p className="font-semibold text-indigo-900">Field Layout</p>
                  <div className="mt-3 grid grid-cols-3 gap-1 text-center text-xs font-semibold text-slate-500">
                    <span className="rounded-md bg-red-200/70 py-1 text-red-700">
                      Enemy Dogs
                    </span>
                    <span className="rounded-md bg-slate-200/70 py-1 text-slate-700">
                      Heroes
                    </span>
                    <span className="rounded-md bg-emerald-200/70 py-1 text-emerald-700">
                      Your Dogs
                    </span>
                  </div>
                </div>
                <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3">
                  <p className="font-semibold text-amber-900">Hero Ability</p>
                  <p>
                    Costs Treats and refreshes each turn. Great for breaking a
                    stalemate or stabilizing.
                  </p>
                </div>
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-3">
                  <p className="font-semibold text-emerald-900">Treat Tips</p>
                  <p>
                    Gain 1 max treat per turn. Plan for turns 3, 5, and 7 where
                    power spikes happen.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="mb-3 flex items-center gap-3 text-lg font-semibold text-slate-900">
                <PawPrint className="text-emerald-500" />
                Card Types
              </div>
              <div className="grid gap-3">
                {cardCheatsheet.map((card) => (
                  <div
                    key={card.label}
                    className={`rounded-2xl border px-4 py-3 text-sm ${card.color}`}
                  >
                    <p className="text-base font-semibold">{card.label}</p>
                    <p className="text-xs opacity-90">{card.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between border-t border-slate-100 bg-white px-8 py-5">
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(event) => setDontShowAgain(event.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-rose-500 focus:ring-rose-400"
            />
            Don&apos;t show again
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleBack}
              disabled={stepIndex === 0}
              className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-600 transition enabled:hover:bg-slate-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={handleAdvance}
              className="rounded-full bg-rose-500 px-6 py-2 text-sm font-semibold text-white transition hover:bg-rose-600"
            >
              {stepIndex === steps.length - 1 ? "Start Playing" : "Next Tip"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

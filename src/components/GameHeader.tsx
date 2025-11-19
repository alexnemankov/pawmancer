interface GameHeaderProps {
  turn: number;
  isPlayerTurn: boolean;
  message: string;
  onQuit: () => void;
  onOpenTutorial: () => void;
  showTutorialPulse?: boolean;
}

export default function GameHeader({
  turn,
  isPlayerTurn,
  message,
  onQuit,
  onOpenTutorial,
  showTutorialPulse = false,
}: GameHeaderProps) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-2">
      <div className="text-white leading-tight">
        <div className="text-xs uppercase tracking-[0.3em] text-white/60">
          Turn {turn}
        </div>
        <div className="text-base font-bold">
          {isPlayerTurn ? "Your Turn" : "Enemy Turn"}
        </div>
      </div>
      <div className="flex-1 rounded-full bg-black/40 px-4 py-2 text-center text-sm font-semibold text-white shadow-inner">
        {message}
      </div>
      <div className="flex gap-2">
        <button
          onClick={onOpenTutorial}
          className={`rounded-full border border-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-white/10 ${
            showTutorialPulse
              ? "shadow-[0_0_0_2px_rgba(190,242,100,0.4)]"
              : ""
          }`}
        >
          Tutorial
        </button>
        <button
          onClick={onQuit}
          className="rounded-full bg-red-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-red-600"
        >
          Quit
        </button>
      </div>
    </div>
  );
}


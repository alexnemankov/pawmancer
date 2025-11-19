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
    <div className="relative mb-4 flex items-center justify-between rounded-xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-6 py-3 shadow-lg border-y border-white/10">
      {/* Left: Turn Counter */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 font-bold text-white shadow-inner ring-2 ring-white/10">
          {turn}
        </div>
        <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Turn
        </div>
      </div>

      {/* Center: Status Banner */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <div
          className={`text-2xl font-black uppercase tracking-wider drop-shadow-lg transition-colors duration-300 ${isPlayerTurn ? "text-amber-400" : "text-red-400"
            }`}
        >
          {isPlayerTurn ? "Your Turn" : "Enemy Turn"}
        </div>
        <div className="text-sm font-medium text-white/80">{message}</div>
      </div>

      {/* Right: Controls */}
      <div className="flex gap-2">
        <button
          onClick={onOpenTutorial}
          className={`rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-white/10 ${showTutorialPulse
              ? "animate-pulse ring-2 ring-amber-400/50"
              : ""
            }`}
        >
          Tips
        </button>
        <button
          onClick={onQuit}
          className="rounded-lg bg-red-500/20 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-red-200 transition hover:bg-red-500/40"
        >
          Quit
        </button>
      </div>
    </div>
  );
}


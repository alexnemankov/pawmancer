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
    <div className="mb-4 flex items-center justify-between">
      <div className="text-white">
        <div className="text-sm opacity-75">Turn {turn}</div>
        <div className="text-lg font-bold">
          {isPlayerTurn ? "Your Turn" : "Enemy Turn"}
        </div>
      </div>
      <div className="rounded bg-black/30 px-4 py-2 text-center text-lg font-bold text-white">
        {message}
      </div>
      <div className="flex gap-2">
        <button
          onClick={onOpenTutorial}
          className={`rounded border border-white/40 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 ${
            showTutorialPulse
              ? "shadow-[0_0_0_2px_rgba(190,242,100,0.4)]"
              : ""
          }`}
        >
          Tutorial
        </button>
        <button
          onClick={onQuit}
          className="rounded bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
        >
          Quit
        </button>
      </div>
    </div>
  );
}


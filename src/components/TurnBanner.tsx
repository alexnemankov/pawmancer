import React, { useEffect, useState } from "react";

interface TurnBannerProps {
    isPlayerTurn: boolean;
    turn: number;
}

export default function TurnBanner({ isPlayerTurn, turn }: TurnBannerProps) {
    const [visible, setVisible] = useState(false);
    const [animating, setAnimating] = useState(false);

    useEffect(() => {
        // Trigger animation on turn change
        setVisible(true);
        setAnimating(true);

        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(() => setAnimating(false), 500); // Wait for fade out
        }, 1500); // Hold duration

        return () => clearTimeout(timer);
    }, [turn, isPlayerTurn]);

    if (!animating && !visible) return null;

    return (
        <div
            className={`pointer-events-none fixed inset-x-0 top-24 z-50 flex justify-center transition-all duration-500 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
                }`}
        >
            <div
                className={`relative overflow-hidden rounded-lg border-y-2 px-12 py-4 shadow-2xl backdrop-blur-md ${isPlayerTurn
                        ? "border-amber-400 bg-gradient-to-r from-blue-900/90 via-blue-800/90 to-blue-900/90 text-amber-100"
                        : "border-red-900 bg-gradient-to-r from-slate-950/90 via-red-950/90 to-slate-950/90 text-red-100"
                    }`}
            >
                {/* Inner Glow */}
                <div
                    className={`absolute inset-0 opacity-30 ${isPlayerTurn ? "bg-amber-400 blur-xl" : "bg-red-600 blur-xl"
                        }`}
                />

                <div className="relative flex flex-col items-center">
                    <h2 className="text-3xl font-black tracking-[0.2em] uppercase drop-shadow-lg">
                        {isPlayerTurn ? "Your Turn" : "Enemy Turn"}
                    </h2>
                    <div className="mt-1 h-0.5 w-full bg-current opacity-50" />
                    <p className="mt-1 text-xs font-bold tracking-widest opacity-80">
                        TURN {turn}
                    </p>
                </div>
            </div>
        </div>
    );
}

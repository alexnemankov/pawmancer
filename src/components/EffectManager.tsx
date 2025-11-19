import React, { useEffect, useState } from "react";
import { gameEvents } from "../utils/gameEvents";

interface Effect {
    id: string;
    type: "scratch" | "heal" | "summon" | "buff";
    x: number;
    y: number;
}

export default function EffectManager() {
    const [effects, setEffects] = useState<Effect[]>([]);

    useEffect(() => {
        const handleEffect = (data: { type: string; targetId?: string; x?: number; y?: number }) => {
            // In a real implementation, we'd look up the target element's position if targetId is provided.
            // For now, we'll use mouse position or center of screen if not provided.
            // This is a simplification. To do this properly, we need a way to map card IDs to DOM rects.
            // We can use document.getElementById(`card-${targetId}`)

            let x = data.x || window.innerWidth / 2;
            let y = data.y || window.innerHeight / 2;

            if (data.targetId) {
                const element = document.getElementById(`card-${data.targetId}`);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    x = rect.left + rect.width / 2;
                    y = rect.top + rect.height / 2;
                }
            }

            const id = Math.random().toString(36).substr(2, 9);
            setEffects((prev) => [...prev, { id, type: data.type as any, x, y }]);

            // Remove effect after animation
            setTimeout(() => {
                setEffects((prev) => prev.filter((e) => e.id !== id));
            }, 1000);
        };

        gameEvents.on("effect", handleEffect);
        return () => gameEvents.off("effect", handleEffect);
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
            {effects.map((effect) => (
                <div
                    key={effect.id}
                    className="absolute"
                    style={{ left: effect.x, top: effect.y }}
                >
                    {effect.type === "scratch" && (
                        <div className="animate-ping absolute -translate-x-1/2 -translate-y-1/2 text-red-600 font-bold text-4xl">
                            /
                        </div>
                    )}
                    {effect.type === "heal" && (
                        <div className="animate-bounce absolute -translate-x-1/2 -translate-y-1/2 text-green-400 text-4xl">
                            +
                        </div>
                    )}
                    {effect.type === "summon" && (
                        <div className="animate-ping absolute -translate-x-1/2 -translate-y-1/2 h-20 w-20 rounded-full bg-white/30 blur-xl" />
                    )}
                    {effect.type === "buff" && (
                        <div className="animate-pulse absolute -translate-x-1/2 -translate-y-1/2 h-24 w-24 rounded-full border-4 border-yellow-400 opacity-50" />
                    )}
                </div>
            ))}
        </div>
    );
}

import React from 'react';

interface Point {
    x: number;
    y: number;
}

interface TargetingArrowProps {
    start: Point;
    end: Point;
}

export default function TargetingArrow({ start, end }: TargetingArrowProps) {
    // Calculate control point for curve
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const controlPoint = {
        x: start.x + dx * 0.5,
        y: start.y + dy * 0.1, // Slight arc
    };

    const path = `M ${start.x} ${start.y} Q ${controlPoint.x} ${controlPoint.y} ${end.x} ${end.y}`;

    return (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
            <svg className="h-full w-full">
                <defs>
                    <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="7"
                        refX="9"
                        refY="3.5"
                        orient="auto"
                    >
                        <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
                    </marker>
                </defs>
                {/* Glow effect */}
                <path
                    d={path}
                    stroke="#f87171"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    className="opacity-50 blur-sm"
                />
                {/* Main line */}
                <path
                    d={path}
                    stroke="#ef4444"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="10 5"
                    markerEnd="url(#arrowhead)"
                    className="animate-pulse"
                />
            </svg>
        </div>
    );
}

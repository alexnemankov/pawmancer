import React from "react";

export const PawPrintPattern = ({ opacity = 0.05, className = "" }: { opacity?: number; className?: string }) => (
    <svg
        className={`absolute inset-0 h-full w-full pointer-events-none ${className}`}
        style={{ opacity }}
        xmlns="http://www.w3.org/2000/svg"
    >
        <defs>
            <pattern
                id="paw-pattern"
                x="0"
                y="0"
                width="100"
                height="100"
                patternUnits="userSpaceOnUse"
            >
                <path
                    d="M25 25c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8 8-3.6 8-8zm24 0c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8 8-3.6 8-8zm-12 16c-6.6 0-12 5.4-12 12 0 6.6 5.4 12 12 12s12-5.4 12-12c0-6.6-5.4-12-12-12zm-22-8c0-3.3-2.7-6-6-6s-6 2.7-6 6 2.7 6 6 6 6-2.7 6-6zm56 0c0-3.3-2.7-6-6-6s-6 2.7-6 6 2.7 6 6 6 6-2.7 6-6z"
                    fill="currentColor"
                />
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#paw-pattern)" />
    </svg>
);

export const BonePattern = ({ opacity = 0.05, className = "" }: { opacity?: number; className?: string }) => (
    <svg
        className={`absolute inset-0 h-full w-full pointer-events-none ${className}`}
        style={{ opacity }}
        xmlns="http://www.w3.org/2000/svg"
    >
        <defs>
            <pattern
                id="bone-pattern"
                x="0"
                y="0"
                width="80"
                height="80"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
            >
                <path
                    d="M20 10c-2.2 0-4 1.8-4 4 0 1.3.6 2.4 1.6 3.2-.9.8-1.6 1.9-1.6 3.2 0 2.2 1.8 4 4 4 1.3 0 2.4-.6 3.2-1.6.8.9 1.9 1.6 3.2 1.6 2.2 0 4-1.8 4-4 0-1.3-.6-2.4-1.6-3.2.9-.8 1.6-1.9 1.6-3.2 0-2.2-1.8-4-4-4-1.3 0-2.4.6-3.2 1.6-.8-.9-1.9-1.6-3.2-1.6z"
                    fill="currentColor"
                    transform="scale(0.8) translate(10, 10)"
                />
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bone-pattern)" />
    </svg>
);

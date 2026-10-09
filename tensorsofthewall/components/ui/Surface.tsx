import { createElement, type HTMLAttributes } from "react";

interface SurfaceStyleOptions {
    /** Hover lift, border brighten and background change; also highlights when a child has focus. */
    interactive?: boolean;
    /** Accent edge on one side. */
    accent?: "top" | "left";
}

/** Class string for a surface, for elements that cannot be a <Surface> (e.g. a next/link). */
export function surfaceClass({ interactive, accent }: SurfaceStyleOptions = {}) {
    return [
        "rounded-xl border border-line bg-surface",
        accent === "top" && "border-t-2 border-t-accent/70",
        accent === "left" && "border-l-2 border-l-accent",
        interactive &&
            "group relative transition duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:bg-surface-hover focus-within:border-accent motion-reduce:transition-none motion-reduce:hover:translate-y-0",
    ]
        .filter(Boolean)
        .join(" ");
}

interface SurfaceProps extends HTMLAttributes<HTMLElement>, SurfaceStyleOptions {
    as?: "div" | "article" | "section" | "li";
}

/** The shared card surface: dark panel, subtle border, optional hover language. */
export default function Surface({ as = "div", interactive, accent, className = "", ...rest }: SurfaceProps) {
    return createElement(as, { ...rest, className: `${surfaceClass({ interactive, accent })} ${className}`.trim() });
}

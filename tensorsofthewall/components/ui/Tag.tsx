interface TagListProps {
    tags: string[];
    /** "outline": bordered chips. "quiet": filled chips. "strong": accent chips. "inline": dot-separated text. */
    variant?: "outline" | "quiet" | "strong" | "inline";
    size?: "sm" | "md";
    label?: string;
    /** Per-tag override, e.g. to emphasise signature skills. */
    variantFor?: (tag: string) => TagListProps["variant"];
    className?: string;
}

const CHIP = {
    outline: "border border-line text-secondary",
    quiet: "bg-surface-hover text-secondary",
    strong: "border border-accent/50 bg-accent/10 text-foreground",
} as const;

export default function TagList({ tags, variant = "outline", size = "sm", label = "Topics", variantFor, className = "" }: TagListProps) {
    if (tags.length === 0) return null;

    if (variant === "inline") {
        return (
            <ul className={`flex flex-wrap gap-x-2 gap-y-1 text-xs text-secondary ${className}`} aria-label={label}>
                {tags.map((tag, i) => (
                    <li key={tag} className="whitespace-nowrap">
                        {i > 0 && <span aria-hidden="true" className="mr-2 text-muted">·</span>}
                        {tag}
                    </li>
                ))}
            </ul>
        );
    }

    const sizing = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-sm";
    return (
        <ul className={`flex flex-wrap gap-2 ${className}`} aria-label={label}>
            {tags.map((tag) => {
                const v = variantFor?.(tag) ?? variant;
                return (
                    <li key={tag} className={`rounded ${sizing} ${v === "inline" ? "" : CHIP[v]}`}>
                        {tag}
                    </li>
                );
            })}
        </ul>
    );
}

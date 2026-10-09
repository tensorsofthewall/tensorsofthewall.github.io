import { Children, type ReactNode } from "react";

/** Secondary info on one line, e.g. "Jul 30, 2026 · 16 min read". Falsy items are skipped. */
export default function MetaRow({ children, className = "" }: { children: ReactNode; className?: string }) {
    const items = Children.toArray(children).filter(Boolean);
    return (
        <p className={`text-sm text-secondary ${className}`}>
            {items.map((item, i) => (
                <span key={i}>
                    {i > 0 && <span aria-hidden="true" className="mx-2 text-muted">·</span>}
                    {item}
                </span>
            ))}
        </p>
    );
}

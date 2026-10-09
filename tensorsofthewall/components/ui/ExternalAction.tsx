import type { ReactNode } from "react";

/** Outbound action button. Opens in a new tab; the arrow is decorative and the new-tab note is for screen readers. */
export default function ExternalAction({ href, children }: { href: string; children: ReactNode }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center gap-1 rounded-md border border-line px-3.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
            {children}
            <span aria-hidden="true">↗</span>
            <span className="sr-only">(opens in a new tab)</span>
        </a>
    );
}

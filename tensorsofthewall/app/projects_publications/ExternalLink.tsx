import type { ReactNode } from 'react';

/** Pill-style outbound action. Opens in a new tab; the arrow is decorative. */
export default function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center gap-1 rounded-md border border-[#2a2d30] px-3.5 text-sm font-medium text-[#ededed] transition-colors hover:border-[#37accd] hover:text-[#37accd] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#37accd]"
        >
            {children}
            <span aria-hidden="true">↗</span>
            <span className="sr-only">(opens in a new tab)</span>
        </a>
    );
}

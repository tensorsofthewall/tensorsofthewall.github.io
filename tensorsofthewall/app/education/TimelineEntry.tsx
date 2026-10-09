import Image from "next/image";
import type { ReactNode } from "react";

interface TimelineEntryProps {
    /** Anchor id for links from other pages. */
    id?: string;
    /** Start and end labels, e.g. "Sep 2022" and "May 2024". */
    start: string;
    end: string;
    children: ReactNode;
}

const year = (label: string) => label.match(/\d{4}/)?.[0] ?? label;

/** One stop on the education timeline: dates in a left rail on desktop, inline on mobile. */
export default function TimelineEntry({ id, start, end, children }: TimelineEntryProps) {
    return (
        <li id={id} className="relative scroll-mt-24 border-l border-line pb-14 pl-6 last:border-l-transparent last:pb-0 md:grid md:grid-cols-[190px_1fr] md:border-l-0 md:pb-0 md:pl-0">
            <span aria-hidden="true" className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-accent md:hidden" />
            <div className="mb-3 md:mb-0 md:pr-8 md:pt-1 md:text-right">
                <p className="whitespace-nowrap text-sm font-semibold text-accent md:text-2xl md:font-bold md:text-foreground">
                    {year(start)}<span className="mx-1.5 text-muted" aria-hidden="true">–</span><span className="sr-only"> to </span>{year(end)}
                </p>
                <p className="mt-1 hidden whitespace-nowrap text-xs text-muted md:block">
                    {start} – {end}
                </p>
            </div>
            <div className="relative md:border-l md:border-line md:pb-14 md:pl-10 md:[li:last-child_&]:border-l-transparent md:[li:last-child_&]:pb-0">
                <span aria-hidden="true" className="absolute -left-[5px] top-2 hidden h-2.5 w-2.5 rounded-full bg-accent md:block" />
                {children}
            </div>
        </li>
    );
}

export function InstitutionMark({ src, name }: { src: string; name: string }) {
    // Logos come with their own padding/backgrounds; crop to a small, consistent mark.
    return (
        <span className="relative block h-9 w-16 shrink-0 overflow-hidden rounded bg-surface">
            <Image src={src} alt="" fill sizes="64px" className="scale-[1.2] object-contain" aria-hidden="true" />
            <span className="sr-only">{name} logo</span>
        </span>
    );
}

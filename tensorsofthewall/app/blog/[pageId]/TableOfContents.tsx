"use client";
import { useEffect, useState } from "react";
import type { TocEntry } from "@/lib/headings";

/** Sticky "On this page" list; highlights the section currently being read. */
export default function TableOfContents({ entries }: { entries: TocEntry[] }) {
    const [active, setActive] = useState<string | null>(null);

    useEffect(() => {
        const elements = entries
            .map((e) => document.getElementById(e.id))
            .filter((el): el is HTMLElement => el !== null);
        let frame = 0;

        const update = () => {
            frame = 0;
            let current: string | null = null;
            for (const el of elements) {
                if (el.getBoundingClientRect().top <= 140) current = el.id;
                else break;
            }
            setActive(current);
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [entries]);

    return (
        <nav aria-label="On this page" className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#9ca3af]">On this page</p>
            <ul className="flex flex-col gap-0.5 border-l border-[#2a2d30] text-sm">
                {entries.map((e) => (
                    <li key={e.id}>
                        <a
                            href={`#${e.id}`}
                            aria-current={active === e.id ? "location" : undefined}
                            className={`-ml-px block border-l py-1 leading-snug transition-colors ${
                                e.level === 3 ? "pl-7" : "pl-4"
                            } ${
                                active === e.id
                                    ? "border-[#37accd] text-[#37accd]"
                                    : "border-transparent text-[#9ca3af] hover:text-[#ededed]"
                            }`}
                        >
                            {e.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

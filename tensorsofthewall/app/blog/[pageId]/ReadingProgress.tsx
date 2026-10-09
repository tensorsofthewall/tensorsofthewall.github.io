"use client";
import { useEffect, useRef } from "react";

/** Thin bar showing how far through the article body the reader is. No transitions, so it
 * is safe for reduced-motion users. */
export default function ReadingProgress({ targetId }: { targetId: string }) {
    const bar = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const target = document.getElementById(targetId);
        if (!target) return;
        let frame = 0;

        const update = () => {
            frame = 0;
            const rect = target.getBoundingClientRect();
            const scrollable = rect.height - window.innerHeight;
            const progress = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
            if (bar.current) bar.current.style.transform = `scaleX(${progress})`;
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [targetId]);

    return (
        <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[1100] h-[3px] bg-transparent">
            <div ref={bar} className="h-full origin-left bg-[#37accd]" style={{ transform: "scaleX(0)" }} />
        </div>
    );
}

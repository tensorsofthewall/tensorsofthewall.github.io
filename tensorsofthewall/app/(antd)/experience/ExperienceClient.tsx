"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import ExperienceCard, { ExperienceEntry } from "./ExperienceCard";
import type { ResearchExpProps } from "../research-exp/researchExpCard";
import type { IndustryExpProps } from "../industry-exp/industryExpCard";
import { relatedFor } from "@/lib/related";
import { slugify } from "@/lib/headings";

const MIN_EXPANSION = 260;      // minimum slot height when any card is expanded

// ── Date helpers ─────────────────────────────────────────────────────────────
function parseMonthYear(part: string): Date {
    if (part.toLowerCase() === 'present') return new Date(9999, 11, 31);
    const spaceIdx = part.indexOf(' ');
    const month = part.slice(0, spaceIdx);
    const year = part.slice(spaceIdx + 1);
    return new Date(`${month} 1, ${year}`);
}

function parseStartDate(duration: string): Date {
    const parts = duration.split(/\s*[-–—]\s*/);
    return parseMonthYear(parts[0].trim());
}

function parseEndDate(duration: string): Date {
    const parts = duration.split(/\s*[-–—]\s*/);
    const end = parts[1]?.trim() ?? parts[0].trim();
    return parseMonthYear(end);
}

interface Props {
    researchExperience: ResearchExpProps[];
    industryExperience: IndustryExpProps[];
}

const ExperienceClient: React.FC<Props> = ({
    researchExperience, industryExperience
}) => {
    const [expandedCard, setExpandedCard] = useState<number | null>(null);
    // Tracks the actual rendered height of the currently expanded card.
    // Starts at 0; set to a minimum estimate on click so the row expands
    // immediately, then refined by ResizeObserver to the true height.
    const [expandedCardHeight, setExpandedCardHeight] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(1000);
    // The server cannot know the container width, so the first render uses a guess. Until the real
    // width has been measured the timeline is hidden and snaps (no animation) to its real geometry;
    // only then is it revealed and the 0.35s transitions switched on. This avoids visible layout shift.
    const [ready, setReady] = useState(false);
    const moveDuration = ready ? 0.35 : 0;
    const cardObserverRef = useRef<ResizeObserver | null>(null);

    useEffect(() => {
        const update = () => {
            if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
        };
        update();
        // Two frames: one to commit the measured geometry, one to paint it, then reveal.
        let raf2 = 0;
        const raf1 = requestAnimationFrame(() => { raf2 = requestAnimationFrame(() => setReady(true)); });
        const obs = new ResizeObserver(update);
        if (containerRef.current) obs.observe(containerRef.current);
        return () => { obs.disconnect(); cancelAnimationFrame(raf1); cancelAnimationFrame(raf2); };
    }, []);

    // Reset measured height when no card is expanded
    useEffect(() => {
        if (expandedCard === null) {
            cardObserverRef.current?.disconnect();
            cardObserverRef.current = null;
            setExpandedCardHeight(0);
        }
    }, [expandedCard]);

    // Ref callback: attaches a ResizeObserver to the rendered card's DOM node
    // so expandedCardHeight always matches the card's actual height.
    const cardRefCallback = useCallback((node: HTMLDivElement | null) => {
        cardObserverRef.current?.disconnect();
        cardObserverRef.current = null;
        if (node) {
            const measure = () => setExpandedCardHeight(node.offsetHeight);
            measure();
            const obs = new ResizeObserver(measure);
            obs.observe(node);
            cardObserverRef.current = obs;
        }
    }, []);

    const handleCardClick = (realIdx: number, isExp: boolean) => {
        if (isExp) {
            setExpandedCard(null);
        } else {
            // Set a minimum estimate so the row starts expanding immediately
            // before the ResizeObserver fires with the true height.
            setExpandedCardHeight(MIN_EXPANSION);
            setExpandedCard(realIdx);
        }
    };

    // ── Responsive geometry (derived from containerWidth) ─────────────────
    const itemsPerRow = containerWidth >= 650 ? 3 : 2;
    const PAD         = Math.max(16, Math.min(48,  Math.round(containerWidth * 0.04)));
    const CARD_WIDTH  = Math.max(160, Math.floor((containerWidth - 2 * PAD) / itemsPerRow * 0.85));
    const logoSize    = Math.max(40,  Math.min(80,  Math.round(containerWidth * 0.065)));
    const CURVE_BULGE = Math.max(40,  Math.round(PAD * 2.5));
    const LOGO_AREA_HEIGHT = Math.max(80,  Math.min(120, Math.round(containerWidth * 0.094)));
    const TEXT_AREA_HEIGHT = Math.max(60,  Math.min(70,  Math.round(containerWidth * 0.055)));
    const CONNECTOR_HEIGHT = Math.max(110,  Math.min(110, Math.round(containerWidth * 0.08)));

    // ── Merge + sort ───────────────────────────────────────────────────────
    const allExperiences: ExperienceEntry[] = [
        ...researchExperience.map(e => ({
            kind: (e.kind ?? ['research']) as ('research' | 'industry')[],
            id: e.id ?? slugify(e.organization),
            name: e.organization,
            logo: e.logo, url: e.url, location: e.location, duration: e.duration,
            position: e.position, type: e.type, achievements: e.achievements,
            note: e.note, supervisor: e.supervisor,
        })),
        ...industryExperience.map(e => ({
            kind: (e.kind ?? ['industry']) as ('research' | 'industry')[],
            id: e.id ?? slugify(e.company),
            name: e.company,
            logo: e.logo, url: e.url, location: e.location, duration: e.duration,
            position: e.position, type: e.type, achievements: e.achievements,
            note: e.note,
        })),
    ].sort((a, b) => {
        const endDiff = parseEndDate(b.duration).getTime() - parseEndDate(a.duration).getTime();
        if (endDiff !== 0) return endDiff;
        return parseStartDate(b.duration).getTime() - parseStartDate(a.duration).getTime();
    });

    // ── Group into rows ────────────────────────────────────────────────────
    const rows: (ExperienceEntry | null)[][] = [];
    for (let i = 0; i < allExperiences.length; i += itemsPerRow) {
        const row: (ExperienceEntry | null)[] = allExperiences.slice(i, i + itemsPerRow);
        while (row.length < itemsPerRow) row.push(null);
        rows.push(row);
    }

    // Arriving on /experience#<id> (from a cross-link) opens that stop and scrolls it into view.
    useEffect(() => {
        const openFromHash = () => {
            const id = decodeURIComponent(window.location.hash.slice(1));
            const idx = allExperiences.findIndex((e) => e.id === id);
            if (idx < 0) return;
            setExpandedCardHeight(MIN_EXPANSION);
            setExpandedCard(idx);
            const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            window.setTimeout(() => {
                document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
            }, 450);
        };
        openFromHash();
        window.addEventListener("hashchange", openFromHash);
        return () => window.removeEventListener("hashchange", openFromHash);
        // allExperiences is derived from static props; run once on mount.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ── Per-row geometry (changes when a card is expanded) ─────────────────
    //
    //  All rows: cards always pop BELOW the timeline line → expand textH downward.
    //  logoH stays fixed at LOGO_AREA_HEIGHT so the SVG line position is stable.
    //
    const rowDims = rows.map((_, ri) => {
        const hasExpanded =
            expandedCard !== null &&
            expandedCard >= ri * itemsPerRow &&
            expandedCard < (ri + 1) * itemsPerRow;
        const expansion = hasExpanded ? Math.max(expandedCardHeight, MIN_EXPANSION) : 0;
        const isReversed = ri % 2 === 0;
        const logoH = LOGO_AREA_HEIGHT;                  // always constant
        const textH = TEXT_AREA_HEIGHT + expansion;      // grows when card is open
        return { logoH, textH, rowH: logoH + textH, isReversed };
    });

    // Cumulative top-Y for each row
    const rowTopY: number[] = [];
    let cumY = 0;
    rowDims.forEach(({ rowH }, i) => {
        rowTopY.push(cumY);
        cumY += rowH + (i < rows.length - 1 ? CONNECTOR_HEIGHT : 0);
    });
    const totalHeight = cumY;

    // ── SVG S-path + arrow data ────────────────────────────────────────────
    // The dot is 16px tall; its center is 8px below LOGO_AREA_HEIGHT.
    const DOT_HALF = 8;

    interface ArrowData { mx: number; my: number; rightward: boolean; }
    const arrows: ArrowData[] = [];
    interface ConnArrow { cx: number; cy: number; }
    const connectorArrows: ConnArrow[] = [];

    const svgPath = (() => {
        if (!rows.length || containerWidth < 100) return 'M 0 0';
        const W = containerWidth;
        const parts: string[] = [];

        rows.forEach((_, ri) => {
            const { isReversed } = rowDims[ri];
            // Center of the timeline dot
            const lineY = rowTopY[ri] + LOGO_AREA_HEIGHT + DOT_HALF;

            if (ri === 0) {
                parts.push(isReversed
                    ? `M ${W - PAD} ${lineY} L ${PAD} ${lineY}`
                    : `M ${PAD} ${lineY} L ${W - PAD} ${lineY}`);
            } else if (isReversed) {
                parts.push(`L ${PAD} ${lineY}`);     // continue from right bezier
            } else {
                parts.push(`L ${W - PAD} ${lineY}`); // continue from left bezier
            }

            // Arrows between each adjacent dot pair — works for any itemsPerRow.
            // Dot x-centers: space-between layout, each item CARD_WIDTH wide.
            const rowW = W - 2 * PAD;
            const itemGap = itemsPerRow > 1 ? (rowW - CARD_WIDTH * itemsPerRow) / (itemsPerRow - 1) : 0;
            const dotXs = Array.from({ length: itemsPerRow }, (_, k) =>
                PAD + CARD_WIDTH / 2 + k * (CARD_WIDTH + itemGap)
            );
            for (let k = 0; k < itemsPerRow - 1; k++) {
                arrows.push({ mx: (dotXs[k] + dotXs[k + 1]) / 2, my: lineY, rightward: isReversed });
            }

            if (ri < rows.length - 1) {
                const nextLineY = rowTopY[ri + 1] + LOGO_AREA_HEIGHT + DOT_HALF;
                const midY = (lineY + nextLineY) / 2;
                if (!isReversed) {
                    // Right-side bezier — clamp control point to W so it never leaves the viewport
                    const cx = Math.min(W, W - PAD + CURVE_BULGE);
                    parts.push(`C ${cx} ${lineY} ${cx} ${nextLineY} ${W - PAD} ${nextLineY}`);
                    // Midpoint at t=0.5: x = (W-PAD)/4 + 3*cx/4
                    connectorArrows.push({ cx: (W - PAD) / 4 + 3 * cx / 4, cy: midY });
                } else {
                    // Left-side bezier — clamp control point to 0 so it never leaves the viewport
                    const cx = Math.max(0, PAD - CURVE_BULGE);
                    parts.push(`C ${cx} ${lineY} ${cx} ${nextLineY} ${PAD} ${nextLineY}`);
                    // Midpoint at t=0.5: x = PAD/4 + 3*cx/4
                    connectorArrows.push({ cx: PAD / 4 + 3 * cx / 4, cy: midY });
                }
            }
        });

        return parts.join(' ');
    })();

    return (
        <div>
            {/* ── S-Timeline ──────────────────────────────────────────── */}
            {/* overflow-x: clip: before the width is measured the timeline is laid out at a 1000px guess, which must not widen the page. */}
            <div className="w-full pb-20" style={{ overflowX: 'clip' }}>
                <div
                    ref={containerRef}
                    className="relative w-full max-w-6xl mx-auto"
                    style={{
                        height: totalHeight,
                        transition: ready ? 'height 0.35s ease' : 'none',
                        visibility: ready ? 'visible' : 'hidden',
                    }}
                >
                    {/* Animated SVG S-path + directional arrows */}
                    <svg
                        style={{
                            position: 'absolute', inset: 0,
                            width: '100%', height: '100%',
                            overflow: 'visible',
                            pointerEvents: 'none',
                            zIndex: 1,
                        }}
                    >
                        <motion.path
                            d={svgPath}
                            fill="none"
                            stroke="rgba(255,255,255,0.9)"
                            strokeWidth="3.5"
                            strokeDasharray="6 16"
                            strokeLinecap="round"
                            initial={false}
                            animate={{ d: svgPath }}
                            transition={{ duration: moveDuration, ease: 'easeInOut' }}
                        />
                        {/* Directional arrows at midpoint of each horizontal segment */}
                        {/* Arrow size constants — tune these to resize horizontal arrows */}
                        {(() => {
                            const AW = 10;    // half-length (tip to tail)
                            const AH = 8;     // half-height
                            const ABOW = 2;   // how far the outer edges bow toward the tip
                            const ANOTCH = 3; // how deep the back notch cuts in
                            return arrows.map((a, i) => {
                                const { mx, my } = a;
                                const d = a.rightward
                                    ? `M ${mx-AW},${my-AH} Q ${mx+ABOW},${my-AH/2} ${mx+AW},${my} Q ${mx+ABOW},${my+AH/2} ${mx-AW},${my+AH} Q ${mx-ANOTCH},${my} ${mx-AW},${my-AH} Z`
                                    : `M ${mx+AW},${my-AH} Q ${mx-ABOW},${my-AH/2} ${mx-AW},${my} Q ${mx-ABOW},${my+AH/2} ${mx+AW},${my+AH} Q ${mx+ANOTCH},${my} ${mx+AW},${my-AH} Z`;
                                return (
                                    <motion.path
                                        key={`arr-${i}`}
                                        d={d}
                                        initial={false}
                                        animate={{ d }}
                                        transition={{ duration: moveDuration, ease: 'easeInOut' }}
                                        fill="rgba(255,255,255,0.85)"
                                    />
                                );
                            });
                        })()}
                        {/* Upward arrows at midpoint of each S-curve connector */}
                        {/* Arrow size constants — tune these to resize connector arrows */}
                        {(() => {
                            const CAW = 8;    // half-width
                            const CAH = 10;   // half-height (tip to tail)
                            const CABOW = 2;  // how far the outer edges bow toward the tip
                            const CANOTCH = 3; // how deep the back notch cuts in
                            return connectorArrows.map((a, i) => {
                                const { cx, cy } = a;
                                const d = `M ${cx-CAW},${cy+CAH} Q ${cx-CABOW},${cy-CAH/5} ${cx},${cy-CAH} Q ${cx+CABOW},${cy-CAH/5} ${cx+CAW},${cy+CAH} Q ${cx},${cy+CANOTCH} ${cx-CAW},${cy+CAH} Z`;
                                return (
                                    <motion.path
                                        key={`carr-${i}`}
                                        d={d}
                                        initial={false}
                                        animate={{ d }}
                                        transition={{ duration: moveDuration, ease: 'easeInOut' }}
                                        fill="rgba(255,255,255,0.85)"
                                    />
                                );
                            });
                        })()}
                        {/* ── "Today" marker at the right endpoint of row 0 ── */}
                        {(() => {
                            if (!rows.length || containerWidth < 100) return null;
                            const lineY = rowTopY[0] + LOGO_AREA_HEIGHT + DOT_HALF;
                            const x = containerWidth - PAD;
                            const textProps = {
                                textAnchor: 'middle' as const,
                                fill: 'rgba(255,255,255,0.9)',
                                fontSize: '13',
                                fontWeight: '700',
                                fontFamily: 'arial',
                            };
                            return (
                                <g>
                                    {/* vertical tick at line endpoint */}
                                    <line
                                        x1={x} y1={lineY - 16} x2={x} y2={lineY + 16}
                                        stroke="rgba(255,255,255,0.85)" strokeWidth="2.5"
                                        strokeLinecap="round"
                                    />
                                    <text x={x} y={lineY - 22} {...textProps}>Today</text>
                                </g>
                            );
                        })()}
                    </svg>

                    {/* ── Rows ──────────────────────────────────────────── */}
                    {rows.map((row, ri) => {
                        const { textH, rowH, isReversed } = rowDims[ri];
                        const displayRow = isReversed ? [...row].reverse() : row;
                        const rowHasExpanded =
                            expandedCard !== null &&
                            expandedCard >= ri * itemsPerRow &&
                            expandedCard < (ri + 1) * itemsPerRow;

                        return (
                            <motion.div
                                key={ri}
                                style={{
                                    position: 'absolute',
                                    left: PAD,
                                    right: PAD,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    zIndex: rowHasExpanded ? 20 : 10,
                                }}
                                initial={false}
                                animate={{ top: rowTopY[ri], height: rowH }}
                                transition={{ duration: moveDuration, ease: 'easeInOut' }}
                            >
                                {displayRow.map((exp, vi) => {
                                    if (!exp) return <div key={`sp-${vi}`} style={{ width: CARD_WIDTH }} />;

                                    const realIdx = isReversed
                                        ? ri * itemsPerRow + (row.length - 1 - vi)
                                        : ri * itemsPerRow + vi;
                                    const isExp = expandedCard === realIdx;

                                    return (
                                        <motion.div
                                            key={realIdx}
                                            id={exp.id}
                                            style={{
                                                scrollMarginTop: 150,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                position: 'relative',
                                            }}
                                            initial={false}
                                            animate={{ height: rowH }}
                                            transition={{ duration: moveDuration, ease: 'easeInOut' }}
                                        >
                                            {/* ── Logo (just above timeline line) ──────────────── */}
                                            <div style={{
                                                height: LOGO_AREA_HEIGHT,
                                                display: 'flex',
                                                alignItems: 'flex-end',
                                                paddingBottom: 8,
                                                flexShrink: 0,
                                            }}>
                                                <button
                                                    type="button"
                                                    onClick={() => handleCardClick(realIdx, isExp)}
                                                    aria-expanded={isExp}
                                                    aria-label={`${exp.name}: ${isExp ? 'hide' : 'show'} details`}
                                                    className={`block cursor-pointer rounded-full border-2 bg-white/10 p-[5px] backdrop-blur-[5px] transition duration-200 hover:-translate-y-0.5 hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${isExp ? 'border-accent' : exp.kind.includes('research') ? 'border-accent/50' : 'border-secondary/50'}`}
                                                >
                                                    <picture>
                                                        <img
                                                            src={exp.logo}
                                                            alt={exp.name}
                                                            className="rounded-full object-contain bg-white"
                                                            style={{ width: logoSize, height: logoSize }}
                                                        />
                                                    </picture>
                                                </button>
                                            </div>

                                            {/* ── Timeline dot (on the SVG line) ───────────────── */}
                                            <div style={{
                                                width: 16, height: 16, borderRadius: '50%',
                                                background: 'white', flexShrink: 0,
                                                position: 'relative', zIndex: 2,
                                            }}>
                                                <div style={{
                                                    width: 32, height: 32, borderRadius: '50%',
                                                    background: 'rgba(255,255,255,0.1)',
                                                    position: 'absolute', top: '50%', left: '50%',
                                                    transform: 'translate(-50%,-50%)',
                                                }} />
                                            </div>

                                            {/* ── Duration + kind badge (below line) ───────────── */}
                                            <div style={{ paddingTop: 8, textAlign: 'center', flexShrink: 0, height: TEXT_AREA_HEIGHT - 16 }}>
                                                <span
                                                    className="text-xs sm:text-sm text-foreground font-semibold"
                                                    style={{ display: 'block', whiteSpace: 'nowrap' }}
                                                >
                                                    {exp.duration}
                                                </span>
                                                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', columnGap: 6, marginTop: 4 }}>
                                                    {exp.kind.map((k, ki) => (
                                                        <span key={k} className={`text-xs font-medium ${k === 'research' ? 'text-accent' : 'text-secondary'}`}>
                                                            {ki > 0 && <span aria-hidden="true" className="mr-1.5 text-muted">·</span>}
                                                            {k === 'research' ? 'Research' : 'Engineering'}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* ── Embedded card slot (below text, all rows) ────── */}
                                            <motion.div
                                                style={{
                                                    width: CARD_WIDTH,
                                                    overflow: 'visible',
                                                    flexShrink: 0,
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                    paddingTop: 8,
                                                }}
                                                initial={false}
                                                animate={{ height: textH - TEXT_AREA_HEIGHT }}
                                                transition={{ duration: moveDuration, ease: 'easeInOut' }}
                                            >
                                                <AnimatePresence>
                                                    {isExp && (
                                                        <motion.div
                                                            ref={cardRefCallback}
                                                            style={{ width: '100%', zIndex: 50 }}
                                                            initial={{ opacity: 0, scaleY: 0.6, originY: 0 }}
                                                            animate={{ opacity: 1, scaleY: 1 }}
                                                            exit={{ opacity: 0, scaleY: 0.6 }}
                                                            transition={{ duration: 0.25, ease: 'easeOut' }}
                                                        >
                                                            <ExperienceCard {...exp} related={relatedFor('experience', exp.id)} />
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ExperienceClient;

"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import ExperienceCard, { ExperienceEntry } from "./ExperienceCard";
import type { ResearchExpProps } from "../research-exp/researchExpCard";
import type { IndustryExpProps } from "../industry-exp/industryExpCard";

const MIN_EXPANSION = 260;      // minimum slot height when any card is expanded

// ── Date helper ─────────────────────────────────────────────────────────────
function parseStartDate(duration: string): Date {
    const part = duration.split(/\s*[-–—]\s*/)[0].trim();
    const spaceIdx = part.indexOf(' ');
    const month = part.slice(0, spaceIdx);
    const year = part.slice(spaceIdx + 1);
    return new Date(`${month} 1, ${year}`);
}

interface Props {
    researchExperience: ResearchExpProps[];
    industryExperience: IndustryExpProps[];
    pageStartText: string;
    pageSubText: string;
}

const ExperienceClient: React.FC<Props> = ({
    researchExperience, industryExperience, pageStartText, pageSubText
}) => {
    const [expandedCard, setExpandedCard] = useState<number | null>(null);
    // Tracks the actual rendered height of the currently expanded card.
    // Starts at 0; set to a minimum estimate on click so the row expands
    // immediately, then refined by ResizeObserver to the true height.
    const [expandedCardHeight, setExpandedCardHeight] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(1000);
    const cardObserverRef = useRef<ResizeObserver | null>(null);

    useEffect(() => {
        const update = () => {
            if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
        };
        update();
        const obs = new ResizeObserver(update);
        if (containerRef.current) obs.observe(containerRef.current);
        return () => obs.disconnect();
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
            kind: 'research' as const,
            name: e.organization,
            logo: e.logo, url: e.url, location: e.location, duration: e.duration,
            position: e.position, type: e.type, achievements: e.achievements,
            note: e.note, supervisor: e.supervisor,
        })),
        ...industryExperience.map(e => ({
            kind: 'industry' as const,
            name: e.company,
            logo: e.logo, url: e.url, location: e.location, duration: e.duration,
            position: e.position, type: e.type, achievements: e.achievements,
            note: e.note,
        })),
    ].sort((a, b) => parseStartDate(b.duration).getTime() - parseStartDate(a.duration).getTime());

    // ── Group into rows ────────────────────────────────────────────────────
    const rows: (ExperienceEntry | null)[][] = [];
    for (let i = 0; i < allExperiences.length; i += itemsPerRow) {
        const row: (ExperienceEntry | null)[] = allExperiences.slice(i, i + itemsPerRow);
        while (row.length < itemsPerRow) row.push(null);
        rows.push(row);
    }

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
            {/* ── Header text ─────────────────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
                className="font-['arial']">
                <strong style={{ marginTop: '2rem', marginBottom: '2rem' }}
                    className="w-[90vw] max-w-[550px] text-sm sm:text-base md:text-xl lg:text-2xl">
                    {pageStartText}
                    <div className="blur-sm hover:blur-none transition-all duration-300"
                        style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                        <h1 style={{ fontSize: '18px', whiteSpace: 'pre-line' }}>{pageSubText}</h1>
                    </div>
                </strong>
            </div>

            {/* ── S-Timeline ──────────────────────────────────────────── */}
            <div className="w-full pb-20" style={{ overflowX: 'visible' }}>
                <div
                    ref={containerRef}
                    className="relative w-full max-w-6xl mx-auto"
                    style={{
                        height: totalHeight,
                        transition: 'height 0.35s ease',
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
                            strokeWidth="2"
                            animate={{ d: svgPath }}
                            transition={{ duration: 0.35, ease: 'easeInOut' }}
                        />
                        {/* Directional arrows at midpoint of each horizontal segment */}
                        {arrows.map((a, i) => (
                            <polygon
                                key={`arr-${i}`}
                                points={
                                    a.rightward
                                        ? `${a.mx - 10},${a.my - 6} ${a.mx + 10},${a.my} ${a.mx - 10},${a.my + 6}`
                                        : `${a.mx + 10},${a.my - 6} ${a.mx - 10},${a.my} ${a.mx + 10},${a.my + 6}`
                                }
                                fill="rgba(255,255,255,0.85)"
                            />
                        ))}
                        {/* Upward arrows at midpoint of each S-curve connector */}
                        {connectorArrows.map((a, i) => (
                            <motion.polygon
                                key={`carr-${i}`}
                                points={`${a.cx - 6},${a.cy + 10} ${a.cx + 6},${a.cy + 10} ${a.cx},${a.cy - 10}`}
                                animate={{ points: `${a.cx - 6},${a.cy + 10} ${a.cx + 6},${a.cy + 10} ${a.cx},${a.cy - 10}` }}
                                transition={{ duration: 0.35, ease: 'easeInOut' }}
                                fill="rgba(255,255,255,0.85)"
                            />
                        ))}
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
                            <div
                                key={ri}
                                style={{
                                    position: 'absolute',
                                    top: rowTopY[ri],
                                    left: PAD,
                                    right: PAD,
                                    height: rowH,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    // Expanded row must paint above all other rows
                                    zIndex: rowHasExpanded ? 20 : 10,
                                    transition: 'top 0.35s ease, height 0.35s ease',
                                }}
                            >
                                {displayRow.map((exp, vi) => {
                                    if (!exp) return <div key={`sp-${vi}`} style={{ width: CARD_WIDTH }} />;

                                    const realIdx = isReversed
                                        ? ri * itemsPerRow + (row.length - 1 - vi)
                                        : ri * itemsPerRow + vi;
                                    const isExp = expandedCard === realIdx;

                                    return (
                                        <div
                                            key={realIdx}
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                position: 'relative',
                                                height: rowH,
                                            }}
                                        >
                                            {/* ── Logo (just above timeline line) ──────────────── */}
                                            <div style={{
                                                height: LOGO_AREA_HEIGHT,
                                                display: 'flex',
                                                alignItems: 'flex-end',
                                                paddingBottom: 8,
                                                flexShrink: 0,
                                            }}>
                                                <div
                                                    onClick={() => handleCardClick(realIdx, isExp)}
                                                    className="hover:scale-110 transition-transform duration-200 cursor-pointer"
                                                    style={{
                                                        background: 'rgba(255,255,255,0.1)',
                                                        padding: 5,
                                                        borderRadius: '50%',
                                                        backdropFilter: 'blur(5px)',
                                                        border: exp.kind === 'research'
                                                            ? '2px solid rgba(253,224,71,0.5)'
                                                            : '2px solid rgba(147,197,253,0.5)',
                                                    }}
                                                >
                                                    <picture>
                                                        <img
                                                            src={exp.logo}
                                                            alt={exp.name}
                                                            className="rounded-full object-contain bg-white"
                                                            style={{ width: logoSize, height: logoSize }}
                                                        />
                                                    </picture>
                                                </div>
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
                                                    className="text-xs sm:text-sm text-white font-medium drop-shadow-lg"
                                                    style={{ display: 'block', whiteSpace: 'nowrap' }}
                                                >
                                                    {exp.duration}
                                                </span>
                                                <span className={`text-xs font-semibold mt-1 block ${exp.kind === 'research' ? 'text-yellow-300' : 'text-blue-300'}`}>
                                                    {exp.kind === 'research' ? '⚗ Research' : '💼 Industry'}
                                                </span>
                                            </div>

                                            {/* ── Embedded card slot (below text, all rows) ────── */}
                                            <div style={{
                                                height: textH - TEXT_AREA_HEIGHT,
                                                width: CARD_WIDTH,
                                                overflow: 'visible',
                                                flexShrink: 0,
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                paddingTop: 8,
                                            }}>
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
                                                            <ExperienceCard {...exp} embedded />
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ExperienceClient;

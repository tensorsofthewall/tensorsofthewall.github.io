/* eslint-disable @typescript-eslint/no-explicit-any */

export interface TocEntry {
    id: string;
    text: string;
    /** Rendered heading level: 2 (section) or 3 (subsection). */
    level: 2 | 3;
}

const HEADING_LEVEL: Record<string, number> = { heading_1: 1, heading_2: 2, heading_3: 3 };

export function headingText(block: any): string {
    return (block[block.type]?.rich_text ?? []).map((t: any) => t.plain_text).join("");
}

export function slugify(text: string): string {
    return (
        text
            .toLowerCase()
            .normalize("NFKD")
            .replace(/[̀-ͯ]/g, "")
            .replace(/&/g, " and ")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "") || "section"
    );
}

function walk(blocks: any[], visit: (b: any) => void) {
    for (const b of blocks) {
        visit(b);
        if (Array.isArray(b.children)) walk(b.children, visit);
    }
}

/**
 * Gives every heading block a stable, de-duplicated `_anchor` id and a semantic `_tag`
 * level, and returns the table of contents.
 *
 * The page title is the only h1, so the shallowest Notion heading used in a post becomes
 * an h2 and the rest shift down accordingly (posts that use Notion H1 for sections and
 * posts that start at H2 both come out as h2/h3/h4). The TOC lists the top two levels.
 */
export function annotateHeadings(blocks: any[]): TocEntry[] {
    const headings: any[] = [];
    walk(blocks, (b) => {
        if (b.type in HEADING_LEVEL) headings.push(b);
    });
    if (headings.length === 0) return [];

    const minLevel = Math.min(...headings.map((h) => HEADING_LEVEL[h.type]));
    const seen = new Map<string, number>();
    const toc: TocEntry[] = [];

    for (const h of headings) {
        const text = headingText(h);
        const base = slugify(text);
        const count = seen.get(base) ?? 0;
        seen.set(base, count + 1);
        const id = count === 0 ? base : `${base}-${count + 1}`;
        const tag = Math.min(6, HEADING_LEVEL[h.type] - minLevel + 2);

        h._anchor = id;
        h._tag = tag;
        if (tag <= 3 && text.trim()) toc.push({ id, text, level: tag as 2 | 3 });
    }
    return toc;
}

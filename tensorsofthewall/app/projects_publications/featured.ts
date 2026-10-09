import data from '@/public/data/resume_json.json';
import type { Project, Publication } from './types';
import { slugify } from '@/lib/headings';

export interface FeaturedItem {
    key: string;
    /** Stable id used for anchors and cross-links. */
    id: string;
    title: string;
    /** Small accent line above the title, e.g. "ECCV 2024" or "Project · Jan 2025 - Apr 2025". */
    eyebrow: string;
    authors?: string[];
    description: string;
    highlight?: string;
    tags: string[];
    links: { label: string; url: string }[];
    image: string;
    imageAlt: string;
    /** Papers have white-background figures; project logos sit on the dark panel. */
    imageTone: 'light' | 'dark';
}

/** Optional fields that any publication or project entry in resume_json.json may carry. */
interface FeaturedFlags {
    featured?: boolean;
    featuredOrder?: number;
    highlight?: string;
    links?: { label: string; url: string }[];
}

const order = (e: FeaturedFlags) => e.featuredOrder ?? 0;

/**
 * Anything with `"featured": true` in resume_json.json (publication or project) is shown in
 * Featured Work, sorted by optional `featuredOrder` (lower first), then data order.
 */
export function getFeaturedItems(): FeaturedItem[] {
    const pubs: (Publication & FeaturedFlags)[] = data.publications;
    const projs: (Project & FeaturedFlags)[] = data.projects;

    const papers = pubs
        .filter((p) => p.featured)
        .map((p) => ({
            order: order(p),
            item: {
                key: p.title,
                id: p.id,
                title: p.title,
                eyebrow: `${p.venue} ${p.year}`,
                authors: p.authors,
                description: p.tldr,
                highlight: p.highlight,
                tags: p.tags,
                links: p.links,
                image: p.figure,
                imageAlt: `Overview figure from "${p.title}"`,
                imageTone: 'light',
            } as FeaturedItem,
        }));

    const projects = projs
        .filter((p) => p.featured)
        .map((p) => ({
            order: order(p),
            item: {
                key: p.name,
                id: slugify(p.name),
                title: p.name,
                eyebrow: `Project · ${p.duration}`,
                description: p.summary,
                highlight: p.highlight,
                tags: p.tags,
                links: p.links ?? [{ label: 'Project Page', url: p.url }],
                image: p.image,
                imageAlt: `${p.name} logo or screenshot`,
                imageTone: 'dark',
            } as FeaturedItem,
        }));

    return [...papers, ...projects].sort((a, b) => a.order - b.order).map((x) => x.item);
}

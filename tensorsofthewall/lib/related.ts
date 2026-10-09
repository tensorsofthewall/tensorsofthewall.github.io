/**
 * Cross-links between portfolio sections. Only real relationships live here: a link appears
 * next to an item if (and only if) it has an entry below.
 *
 * Keys: experience entries by their `id` in resume_json.json, projects by the slug of their
 * name, publications by their `id`, education by the slug of the institution.
 */
export interface RelatedLink {
    label: string;
    href: string;
}

const LINKS = {
    unilcd: { label: "UniLCD", href: "/projects_publications#featured-unilcd" },
    gaitPaper: { label: "Gait re-identification paper", href: "/projects_publications#pub-etccs-2020" },
    auv: { label: "Autonomous Underwater Vehicle", href: "/projects_publications#project-autonomous-underwater-vehicle" },
    h2x: { label: "H2X Lab", href: "/experience#h2x" },
    cdac: { label: "C-DAC internship", href: "/experience#cdac" },
    thesis: { label: "MS Thesis", href: "/education#thesis" },
    bu: { label: "Boston University", href: "/education#boston-university" },
    iiitdm: { label: "IIITDM Kancheepuram", href: "/education#iiitdm-kancheepuram" },
} satisfies Record<string, RelatedLink>;

export const RELATED = {
    experience: {
        h2x: [LINKS.unilcd, LINKS.thesis],
        cdac: [LINKS.gaitPaper],
        "bu-ta": [LINKS.bu],
    },
    projects: {
        unilcd: [LINKS.h2x, LINKS.thesis],
        "etccs-2020": [LINKS.cdac],
        "autonomous-underwater-vehicle": [LINKS.iiitdm],
    },
    education: {
        "boston-university": [LINKS.unilcd, LINKS.h2x],
        "iiitdm-kancheepuram": [LINKS.auv],
    },
} satisfies Record<string, Record<string, RelatedLink[]>>;

export function relatedFor(section: keyof typeof RELATED, key: string): RelatedLink[] {
    return (RELATED[section] as Record<string, RelatedLink[]>)[key] ?? [];
}

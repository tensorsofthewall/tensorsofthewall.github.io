import Surface from "@/components/ui/Surface";
import RelatedLinks from "@/components/ui/RelatedLinks";
import type { RelatedLink } from "@/lib/related";

export interface ExperienceEntry {
    /** Stable id for anchors (`/experience#h2x`) and cross-links. */
    id: string;
    kind: ('research' | 'industry')[];
    name: string;
    logo: string;
    url: string;
    location: string;
    duration: string;
    position: string;
    type: string;
    achievements: string[];
    note?: string;
    supervisor?: string;
}

/**
 * Details panel that opens under a timeline stop. Everything is visible as soon as it opens;
 * its height is measured by the timeline, which makes room for it.
 */
const ExperienceCard = ({ name, url, location, position, type, achievements, note, related = [] }: ExperienceEntry & { related?: RelatedLink[] }) => (
    <Surface className="p-4 text-left">
        <p className="text-sm font-semibold leading-snug text-foreground">{position}</p>
        <p className="mt-0.5 text-xs text-secondary">{type} · {location}</p>
        {note && <p className="mt-3 border-t border-line pt-3 text-xs italic leading-relaxed text-muted">{note}</p>}
        <ul className="mt-3 flex list-disc flex-col gap-1.5 border-t border-line pl-4 pt-3 text-xs leading-relaxed text-body marker:text-muted">
            {achievements.map((achievement) => (
                <li key={achievement}>{achievement}</li>
            ))}
        </ul>
        <RelatedLinks links={related} className="mt-4 border-t border-line pt-3" />
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-xs font-medium text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
            Visit {name} <span aria-hidden="true">↗</span>
            <span className="sr-only">(opens in a new tab)</span>
        </a>
    </Surface>
);

export default ExperienceCard;

import Image from 'next/image';
import type { Project } from './types';
import Surface from '@/components/ui/Surface';
import TagList from '@/components/ui/Tag';
import { slugify } from '@/lib/headings';
import RelatedLinks from '@/components/ui/RelatedLinks';
import { relatedFor } from '@/lib/related';

/**
 * Static card: the title link is stretched over the whole card (::after) so the card is one
 * big tap/click target while keyboard users get a single labelled link.
 */
export default function ProjectCard({ project }: { project: Project }) {
    return (
        <Surface as="article" interactive id={`project-${slugify(project.name)}`} className="flex scroll-mt-24 flex-col overflow-hidden">
            <div className="relative aspect-[16/9] bg-background">
                <Image
                    src={project.image}
                    alt={`${project.name} logo or screenshot`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-contain p-4"
                />
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold leading-snug">
                        <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground outline-none after:absolute after:inset-0 after:content-[''] group-hover:text-accent"
                        >
                            {project.name}
                            <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                    </h3>
                    <span aria-hidden="true" className="text-lg text-secondary transition-colors group-hover:text-accent">↗</span>
                </div>
                <p className="line-clamp-3 text-sm leading-relaxed text-secondary">{project.summary}</p>
                <div className="mt-auto flex flex-col gap-3 pt-1">
                    <TagList tags={project.tags} variant="inline" />
                    <p className="text-xs text-muted">{project.duration}</p>
                    {/* Sits above the card-wide link so it stays clickable. */}
                    <RelatedLinks links={relatedFor('projects', slugify(project.name))} label="Related" className="relative z-10" />
                </div>
            </div>
        </Surface>
    );
}

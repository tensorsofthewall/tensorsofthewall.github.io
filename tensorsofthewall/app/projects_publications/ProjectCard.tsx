import Image from 'next/image';
import type { Project } from './types';
import Tags from './Tags';
import { slugify } from '@/lib/headings';

/**
 * Static card: the title link is stretched over the whole card (::after) so the card is one
 * big tap/click target while keyboard users get a single labelled link.
 */
export default function ProjectCard({ project }: { project: Project }) {
    return (
        <article id={`project-${slugify(project.name)}`} className="scroll-mt-24 group relative flex flex-col overflow-hidden rounded-xl border border-[#2a2d30] bg-[#111315] transition duration-200 hover:-translate-y-0.5 hover:border-[#37accd]/60 hover:bg-[#15181b] focus-within:border-[#37accd] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
            <div className="relative aspect-[16/9] bg-[#0a0a0a]">
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
                            className="text-[#ededed] outline-none after:absolute after:inset-0 after:content-[''] group-hover:text-[#37accd]"
                        >
                            {project.name}
                            <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                    </h3>
                    <span aria-hidden="true" className="text-lg text-[#9ca3af] transition-colors group-hover:text-[#37accd]">↗</span>
                </div>
                <p className="line-clamp-3 text-sm leading-relaxed text-[#9ca3af]">{project.summary}</p>
                <div className="mt-auto flex flex-col gap-3 pt-1">
                    <Tags tags={project.tags} dot />
                    <p className="text-xs text-[#6b7280]">{project.duration}</p>
                </div>
            </div>
        </article>
    );
}

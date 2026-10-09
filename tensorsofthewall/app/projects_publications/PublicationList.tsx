import Image from 'next/image';
import type { Publication } from './types';
import Authors from './Authors';
import Tags from './Tags';
import ExternalLink from './ExternalLink';

/** Academic-style list: year/venue gutter, title, authors, one-line TL;DR, actions. */
export default function PublicationList({ papers }: { papers: Publication[] }) {
    return (
        <ol className="divide-y divide-[#2a2d30] border-y border-[#2a2d30]">
            {papers.map((p) => (
                <li key={p.title} className="grid gap-4 py-7 md:grid-cols-[110px_1fr_180px] md:gap-8">
                    <p className="text-sm font-semibold text-[#37accd] md:pt-1">
                        <span className="text-[#ededed]">{p.year}</span>
                        <span className="ml-2 md:mt-1 md:ml-0 md:block">{p.venue}</span>
                    </p>
                    <div className="flex flex-col gap-3">
                        <h3 className="text-lg font-semibold leading-snug text-[#ededed]">{p.title}</h3>
                        <Authors authors={p.authors} />
                        <Tags tags={p.tags} dot />
                        <p className="text-sm leading-relaxed text-[#d1d5db]">{p.tldr}</p>
                        <div className="flex flex-wrap gap-3 pt-1">
                            {p.links.map((l) => (
                                <ExternalLink key={l.url} href={l.url}>{l.label}</ExternalLink>
                            ))}
                        </div>
                    </div>
                    <div className="relative hidden aspect-[3/2] self-start overflow-hidden rounded-md border border-[#2a2d30] bg-white md:block">
                        <Image
                            src={p.figure}
                            alt={`Figure from "${p.title}"`}
                            fill
                            sizes="180px"
                            className="object-contain p-1"
                        />
                    </div>
                </li>
            ))}
        </ol>
    );
}

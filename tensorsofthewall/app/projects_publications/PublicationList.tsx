import Image from 'next/image';
import type { Publication } from './types';
import Authors from './Authors';
import TagList from '@/components/ui/Tag';
import ExternalAction from '@/components/ui/ExternalAction';

/** Academic-style list: year/venue gutter, title, authors, one-line TL;DR, actions. */
export default function PublicationList({ papers }: { papers: Publication[] }) {
    return (
        <ol className="divide-y divide-line border-y border-line">
            {papers.map((p) => (
                <li key={p.title} className="grid gap-4 py-7 md:grid-cols-[110px_1fr_180px] md:gap-8">
                    <p className="text-sm font-semibold text-accent md:pt-1">
                        <span className="text-foreground">{p.year}</span>
                        <span className="ml-2 md:mt-1 md:ml-0 md:block">{p.venue}</span>
                    </p>
                    <div className="flex flex-col gap-3">
                        <h3 className="text-lg font-semibold leading-snug text-foreground">{p.title}</h3>
                        <Authors authors={p.authors} />
                        <TagList tags={p.tags} variant="inline" />
                        <p className="text-sm leading-relaxed text-body">{p.tldr}</p>
                        <div className="flex flex-wrap gap-3 pt-1">
                            {p.links.map((l) => (
                                <ExternalAction key={l.url} href={l.url}>{l.label}</ExternalAction>
                            ))}
                        </div>
                    </div>
                    <div className="relative hidden aspect-[3/2] self-start overflow-hidden rounded-md border border-line bg-white md:block">
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

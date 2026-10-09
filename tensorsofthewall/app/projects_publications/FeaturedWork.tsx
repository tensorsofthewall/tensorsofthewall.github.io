import Image from 'next/image';
import type { FeaturedItem } from './featured';
import Authors from './Authors';
import Tags from './Tags';
import { slugify } from '@/lib/headings';
import ExternalLink from './ExternalLink';

/** Large showcase for a headline piece of work. Stack several for more than one; no carousel. */
export default function FeaturedWork({ item }: { item: FeaturedItem }) {
    return (
        <article id={`featured-${slugify(item.key)}`} className="scroll-mt-24 grid overflow-hidden rounded-xl border border-[#2a2d30] bg-[#111315] lg:grid-cols-[1.1fr_1fr]">
            <div className={`relative aspect-[16/9] ${item.imageTone === 'light' ? 'bg-white' : 'bg-[#0a0a0a]'} lg:aspect-auto lg:min-h-[320px]`}>
                <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(min-width: 1200px) 600px, (min-width: 1024px) 55vw, 100vw"
                    className="object-contain p-3"
                    priority
                />
            </div>
            <div className="flex flex-col gap-4 p-5 sm:p-7">
                <div>
                    <p className="text-sm font-semibold tracking-wide text-[#37accd]">
                        {item.eyebrow}
                    </p>
                    <h3 className="mt-1 text-xl font-bold leading-snug text-[#ededed] sm:text-2xl">{item.title}</h3>
                </div>
                {item.authors && <Authors authors={item.authors} />}
                <p className="text-[15px] leading-relaxed text-[#d1d5db]">{item.description}</p>
                {item.highlight && (
                    <p className="border-l-2 border-[#37accd] pl-3 text-sm text-[#ededed]">
                        <span className="text-xl font-bold text-[#37accd]">{item.highlight.split(' ')[0]}</span>{' '}
                        {item.highlight.split(' ').slice(1).join(' ')}
                    </p>
                )}
                <Tags tags={item.tags} />
                <div className="mt-auto flex flex-wrap gap-3 pt-1">
                    {item.links.map((l) => (
                        <ExternalLink key={l.url} href={l.url}>{l.label}</ExternalLink>
                    ))}
                </div>
            </div>
        </article>
    );
}

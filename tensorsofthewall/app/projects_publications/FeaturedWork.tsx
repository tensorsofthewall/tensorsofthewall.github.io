import Image from 'next/image';
import type { FeaturedItem } from './featured';
import Authors from './Authors';
import Surface from '@/components/ui/Surface';
import TagList from '@/components/ui/Tag';
import RelatedLinks from '@/components/ui/RelatedLinks';
import { relatedFor } from '@/lib/related';
import ExternalAction from '@/components/ui/ExternalAction';

/** Large showcase for a headline piece of work. Stack several for more than one; no carousel. */
export default function FeaturedWork({ item }: { item: FeaturedItem }) {
    return (
        <Surface as="article" id={`featured-${item.id}`} className="grid scroll-mt-24 overflow-hidden lg:grid-cols-[1.1fr_1fr]">
            <div className={`relative aspect-[16/9] ${item.imageTone === 'light' ? 'bg-white' : 'bg-background'} lg:aspect-auto lg:min-h-[320px]`}>
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
                    <p className="text-sm font-semibold tracking-wide text-accent">
                        {item.eyebrow}
                    </p>
                    <h3 className="mt-1 text-xl font-bold leading-snug text-foreground sm:text-2xl">{item.title}</h3>
                </div>
                {item.authors && <Authors authors={item.authors} />}
                <p className="text-[15px] leading-relaxed text-body">{item.description}</p>
                {item.highlight && (
                    <p className="border-l-2 border-accent pl-3 text-sm text-foreground">
                        <span className="text-xl font-bold text-accent">{item.highlight.split(' ')[0]}</span>{' '}
                        {item.highlight.split(' ').slice(1).join(' ')}
                    </p>
                )}
                <TagList tags={item.tags} />
                <div className="mt-auto flex flex-wrap gap-3 pt-1">
                    {item.links.map((l) => (
                        <ExternalAction key={l.url} href={l.url}>{l.label}</ExternalAction>
                    ))}
                </div>
                <RelatedLinks links={relatedFor('projects', item.id)} />
            </div>
        </Surface>
    );
}

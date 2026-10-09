import Image from "next/image";
import Link from "next/link";
import type { BlogPostSummary } from "@/lib/blogPosts";
import PostMeta from "./PostMeta";
import Surface from "@/components/ui/Surface";
import TagList from "@/components/ui/Tag";

/** The newest article, given editorial prominence. Whole card is one link. */
export default function FeaturedPost({ post }: { post: BlogPostSummary }) {
    return (
        <Surface as="article" interactive className="grid overflow-hidden lg:grid-cols-[1.1fr_1fr]">
            <div className="relative aspect-[16/9] bg-background lg:aspect-auto lg:min-h-[320px]">
                <Image
                    src={post.imageURL}
                    alt={`Cover image for "${post.title}"`}
                    fill
                    sizes="(min-width: 1200px) 600px, (min-width: 1024px) 55vw, 100vw"
                    className="object-contain p-3"
                    priority
                />
            </div>
            <div className="flex flex-col gap-4 p-5 sm:p-7">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Latest</p>
                <h2 className="text-xl font-bold leading-snug text-foreground sm:text-2xl">
                    <Link
                        href={`/blog/${post.slug}`}
                        className="outline-none after:absolute after:inset-0 after:content-[''] group-hover:text-accent"
                    >
                        {post.title}
                    </Link>
                </h2>
                <p className="text-[15px] leading-relaxed text-body">{post.description}</p>
                <PostMeta post={post} />
                <div className="mt-auto pt-1"><TagList tags={post.tags} /></div>
            </div>
        </Surface>
    );
}

import Image from "next/image";
import Link from "next/link";
import type { BlogPostSummary } from "@/lib/blogPosts";
import { PostMeta, PostTags } from "./PostMeta";

/** The newest article, given editorial prominence. Whole card is one link. */
export default function FeaturedPost({ post }: { post: BlogPostSummary }) {
    return (
        <article className="group relative grid overflow-hidden rounded-xl border border-[#2a2d30] bg-[#111315] transition duration-200 hover:-translate-y-0.5 hover:border-[#37accd]/60 hover:bg-[#15181b] focus-within:border-[#37accd] motion-reduce:transition-none motion-reduce:hover:translate-y-0 lg:grid-cols-[1.1fr_1fr]">
            <div className="relative aspect-[16/9] bg-[#0a0a0a] lg:aspect-auto lg:min-h-[320px]">
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
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#37accd]">Latest</p>
                <h2 className="text-xl font-bold leading-snug text-[#ededed] sm:text-2xl">
                    <Link
                        href={`/blog/${post.slug}`}
                        className="outline-none after:absolute after:inset-0 after:content-[''] group-hover:text-[#37accd]"
                    >
                        {post.title}
                    </Link>
                </h2>
                <p className="text-[15px] leading-relaxed text-[#d1d5db]">{post.description}</p>
                <PostMeta post={post} />
                <div className="mt-auto pt-1"><PostTags tags={post.tags} /></div>
            </div>
        </article>
    );
}

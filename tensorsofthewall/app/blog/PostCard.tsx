import Image from "next/image";
import Link from "next/link";
import type { BlogPostSummary } from "@/lib/blogPosts";
import { PostMeta, PostTags } from "./PostMeta";

export default function PostCard({ post }: { post: BlogPostSummary }) {
    return (
        <article className="group relative flex flex-col overflow-hidden rounded-xl border border-[#2a2d30] bg-[#111315] transition duration-200 hover:-translate-y-0.5 hover:border-[#37accd]/60 hover:bg-[#15181b] focus-within:border-[#37accd] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
            <div className="relative aspect-[16/9] bg-[#0a0a0a]">
                <Image
                    src={post.imageURL}
                    alt={`Cover image for "${post.title}"`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-contain p-3"
                />
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5">
                <h3 className="text-lg font-semibold leading-snug text-[#ededed]">
                    <Link
                        href={`/blog/${post.slug}`}
                        className="outline-none after:absolute after:inset-0 after:content-[''] group-hover:text-[#37accd]"
                    >
                        {post.title}
                    </Link>
                </h3>
                <p className="line-clamp-3 text-sm leading-relaxed text-[#9ca3af]">{post.description}</p>
                <div className="mt-auto flex flex-col gap-3 pt-1">
                    <PostMeta post={post} />
                    <PostTags tags={post.tags} />
                </div>
            </div>
        </article>
    );
}

import Image from "next/image";
import Link from "next/link";
import type { BlogPostSummary } from "@/lib/blogPosts";
import PostMeta from "./PostMeta";
import Surface from "@/components/ui/Surface";
import TagList from "@/components/ui/Tag";

export default function PostCard({ post }: { post: BlogPostSummary }) {
    return (
        <Surface as="article" interactive className="flex flex-col overflow-hidden">
            <div className="relative aspect-[16/9] bg-background">
                <Image
                    src={post.imageURL}
                    alt={`Cover image for "${post.title}"`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-contain p-3"
                />
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5">
                <h3 className="text-lg font-semibold leading-snug text-foreground">
                    <Link
                        href={`/blog/${post.slug}`}
                        className="outline-none after:absolute after:inset-0 after:content-[''] group-hover:text-accent"
                    >
                        {post.title}
                    </Link>
                </h3>
                <p className="line-clamp-3 text-sm leading-relaxed text-secondary">{post.description}</p>
                <div className="mt-auto flex flex-col gap-3 pt-1">
                    <PostMeta post={post} />
                    <TagList tags={post.tags} />
                </div>
            </div>
        </Surface>
    );
}

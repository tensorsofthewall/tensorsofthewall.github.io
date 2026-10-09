import type { BlogPostSummary } from "@/lib/blogPosts";

export function PostMeta({ post }: { post: BlogPostSummary }) {
    return (
        <p className="text-sm text-[#9ca3af]">
            {post.publishDate}
            {post.readTime !== null && (
                <>
                    <span aria-hidden="true" className="mx-2 text-[#6b7280]">·</span>
                    {post.readTime} min read
                </>
            )}
        </p>
    );
}

export function PostTags({ tags }: { tags: string[] }) {
    if (tags.length === 0) return null;
    return (
        <ul className="flex flex-wrap gap-2 text-xs text-[#9ca3af]" aria-label="Topics">
            {tags.map((tag) => (
                <li key={tag} className="rounded border border-[#2a2d30] px-2 py-0.5">{tag}</li>
            ))}
        </ul>
    );
}

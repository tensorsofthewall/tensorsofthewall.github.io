import type { BlogPostSummary } from "@/lib/blogPosts";
import MetaRow from "@/components/ui/MetaRow";

export default function PostMeta({ post, className }: { post: BlogPostSummary; className?: string }) {
    return (
        <MetaRow className={className}>
            {post.publishDate}
            {post.readTime !== null && `${post.readTime} min read`}
        </MetaRow>
    );
}

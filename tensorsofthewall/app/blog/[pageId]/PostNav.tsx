import Link from "next/link";
import type { BlogPostSummary } from "@/lib/blogPosts";
import { surfaceClass } from "@/components/ui/Surface";

function NavLink({ post, label, align }: { post: BlogPostSummary; label: string; align: "left" | "right" }) {
    return (
        <Link
            href={`/blog/${post.slug}`}
            className={`${surfaceClass({ interactive: true })} flex flex-col gap-1 p-4 ${align === "right" ? "sm:text-right" : ""}`}
        >
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">{label}</span>
            <span className="font-semibold leading-snug text-foreground group-hover:text-accent">{post.title}</span>
        </Link>
    );
}

/** Newer / older article links. `newer` and `older` are optional at the ends of the archive. */
export default function PostNav({ newer, older }: { newer?: BlogPostSummary; older?: BlogPostSummary }) {
    if (!newer && !older) return null;
    return (
        <nav aria-label="More articles" className="mt-16 grid gap-4 sm:grid-cols-2">
            {older ? <NavLink post={older} label="← Older" align="left" /> : <span />}
            {newer ? <NavLink post={newer} label="Newer →" align="right" /> : <span />}
        </nav>
    );
}

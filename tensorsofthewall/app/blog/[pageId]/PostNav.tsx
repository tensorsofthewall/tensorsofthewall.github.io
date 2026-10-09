import Link from "next/link";
import type { BlogPostSummary } from "@/lib/blogPosts";

function NavLink({ post, label, align }: { post: BlogPostSummary; label: string; align: "left" | "right" }) {
    return (
        <Link
            href={`/blog/${post.slug}`}
            className={`group flex flex-col gap-1 rounded-xl border border-[#2a2d30] bg-[#111315] p-4 transition duration-200 hover:-translate-y-0.5 hover:border-[#37accd]/60 hover:bg-[#15181b] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
                align === "right" ? "sm:text-right" : ""
            }`}
        >
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9ca3af]">{label}</span>
            <span className="font-semibold leading-snug text-[#ededed] group-hover:text-[#37accd]">{post.title}</span>
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

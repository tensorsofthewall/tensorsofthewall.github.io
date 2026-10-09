import Link from "next/link";
import type { RelatedLink } from "@/lib/related";

interface RelatedLinksProps {
    links: RelatedLink[];
    label?: string;
    className?: string;
}

/** Quiet "Related work → A · B" row. Renders nothing when there is nothing related. */
export default function RelatedLinks({ links, label = "Related work", className = "" }: RelatedLinksProps) {
    if (links.length === 0) return null;
    return (
        <div className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm ${className}`}>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">{label}</span>
            <ul className="flex flex-wrap gap-x-4 gap-y-1">
                {links.map((link) => (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            className="group inline-flex min-h-8 items-center gap-1 text-body transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                        >
                            <span aria-hidden="true" className="text-accent transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none">→</span>
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

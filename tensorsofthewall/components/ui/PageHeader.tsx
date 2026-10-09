import type { ReactNode } from "react";

interface PageHeaderProps {
    /** Small accent label above the title, e.g. "Work". */
    eyebrow?: string;
    title: string;
    /** The personality line. */
    subtitle?: ReactNode;
    /** Optional quieter line below the subtitle. */
    helper?: ReactNode;
    /** Replaces the default bottom margin (mb-14), e.g. when the header sits in a grid. */
    className?: string;
}

/** Page title block. A plain div: the global CSS gives every <header> element a fixed 600px height. */
export default function PageHeader({ eyebrow, title, subtitle, helper, className = "mb-14" }: PageHeaderProps) {
    return (
        <div className={className}>
            {eyebrow && <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-accent">{eyebrow}</p>}
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">{title}</h1>
            {subtitle && <p className="mt-3 max-w-xl text-lg text-secondary">{subtitle}</p>}
            {helper && <p className="mt-1 text-sm text-muted">{helper}</p>}
        </div>
    );
}

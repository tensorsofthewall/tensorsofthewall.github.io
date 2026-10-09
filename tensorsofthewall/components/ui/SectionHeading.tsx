import type { ReactNode } from "react";

interface SectionHeadingProps {
    id?: string;
    children: ReactNode;
    /** Heading element; pick the level that fits the page outline. */
    as?: "h2" | "h3";
    /** "md" for page sections, "sm" for labels inside a card. */
    size?: "md" | "sm";
    className?: string;
}

export default function SectionHeading({ id, children, as: Tag = "h2", size = "md", className = "" }: SectionHeadingProps) {
    const sizing = size === "md" ? "mb-6 text-sm tracking-[0.18em]" : "mb-3 text-xs tracking-[0.18em]";
    return (
        <Tag id={id} className={`font-semibold uppercase text-secondary ${sizing} ${className}`}>
            {children}
        </Tag>
    );
}

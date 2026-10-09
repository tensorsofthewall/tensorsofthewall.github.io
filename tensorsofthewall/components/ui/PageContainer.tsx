import type { ReactNode } from "react";

/** Standard page width and gutters: 16px on mobile up to 40px on desktop, content capped at 1100px. */
export default function PageContainer({ children, className = "pb-24" }: { children: ReactNode; className?: string }) {
    return <div className={`mx-auto w-full max-w-[1100px] px-4 pt-20 sm:px-8 md:px-10 ${className}`}>{children}</div>;
}

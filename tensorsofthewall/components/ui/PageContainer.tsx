import type { ReactNode } from "react";

/** Standard page width and gutters: 16px on mobile up to 40px on desktop, content capped at 1100px. */
export default function PageContainer({ children }: { children: ReactNode }) {
    return <div className="mx-auto w-full max-w-[1100px] px-4 pb-24 pt-20 sm:px-8 md:px-10">{children}</div>;
}

export default function Tags({ tags, dot = false }: { tags: string[]; dot?: boolean }) {
    return (
        <ul className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-[#9ca3af]" aria-label="Topics">
            {tags.map((tag, i) => (
                <li key={tag} className="whitespace-nowrap">
                    {dot && i > 0 && <span aria-hidden="true" className="mr-2 text-[#2a2d30]">·</span>}
                    {dot ? tag : (
                        <span className="rounded border border-[#2a2d30] px-2 py-0.5">{tag}</span>
                    )}
                </li>
            ))}
        </ul>
    );
}

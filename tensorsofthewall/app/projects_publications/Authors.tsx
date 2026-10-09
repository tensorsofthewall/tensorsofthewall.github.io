import { SCHOLAR_URL } from './types';

export default function Authors({ authors }: { authors: string[] }) {
    return (
        <p className="text-sm leading-relaxed text-secondary">
            {authors.map((author, i) => (
                <span key={author}>
                    {i > 0 && ' · '}
                    <span className="whitespace-nowrap">
                    {author === 'S. Bharadwaj' ? (
                        <a
                            href={SCHOLAR_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-highlight hover:underline"
                        >
                            {author}
                        </a>
                    ) : author}
                    </span>
                </span>
            ))}
        </p>
    );
}

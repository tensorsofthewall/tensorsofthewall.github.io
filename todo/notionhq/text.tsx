import Link from 'next/link';

export default function Text({ title }: { title: any }) {
    if (!title) {
        return null;
    }

    return title.map((value: any) => {
        const {
            annotations: {
                bold,
                italic,
                strikethrough,
                underline,
                code,
                color,
            },
            text,
        } = value;

        return (
            <span
                className={[
                    bold ? 'font-bold' : '',
                    italic ? 'italic' : '',
                    strikethrough ? 'line-through' : '', 
                    underline ? 'underline' : '',
                    code ? '' : '',
                ].join(' ')}
                style={color !== 'default' ? { color } : {}}
                key={text.content}
            >
                {text.link ? <Link href={text.link.url}>{text.content}</Link> : text.content}
            </span>
        )
    })
}
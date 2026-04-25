/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import styles from "../../styles/post.module.css";
import katex from "katex";

function safeUrl(url: string): string {
    try {
        const u = new URL(url);
        return u.protocol === 'https:' || u.protocol === 'http:' ? url : '#';
    } catch { return '#'; }
}

export default function Text(rtext: any) {
    if (!rtext) {
        return null;
    }

    return rtext.title.map((value: any, idx: number) => {
        if (value.type === 'text') {
            const {
                annotations: {
                    bold, code, color, italic, strikethrough, underline,
                },
                text,
            } = value;

            return (
                <span className={[
                    bold ? styles.bold : '',
                    code ? 'font-mono px-1 rounded bg-[#292827] text-[#eb5757]' : '', // bg-code text-[#eb5757]
                    italic ? styles.italic : '',
                    strikethrough ? styles.strikethrough : '',
                    underline ? 'underline' : '',
                ].join(' ').trim()}
                    style={color !== 'default' ? { color } : {}}
                    key={`${value.type}-${text.content}-${idx}`}
                >
                    {text.link ? <Link href={safeUrl(text.link.url)} className="underline" style={{ color: '#9c9c9c' }} target="_blank" rel="noopener noreferrer">{text.content}</Link> : text.content}
                </span>
            )
        } else if (value.type === 'equation') {
            const {
                annotations: {
                    bold, code, color, italic, strikethrough, underline,
                },
                equation: { expression }
            } = value;

            return (
                <span
                    className={[
                        bold ? styles.bold : '',
                        code ? 'font-mono px-1 rounded' : '',
                        italic ? styles.italic : '',
                        strikethrough ? styles.strikethrough : '',
                        underline ? 'underline' : '',
                    ].join(' ').trim()}
                    style={color !== 'default' ? { color } : {}}
                    key={`${value.type}-${value.equation.expression}-${idx}`}
                    // Use dangerouslySetInnerHTML to render KaTeX HTML
                    dangerouslySetInnerHTML={{
                        __html: katex.renderToString(expression, {
                            throwOnError: false,
                            displayMode: false,
                            output: 'html',
                        })
                    }}
                />
            )
        }
    })
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import styles from "../../styles/post.module.css";
import katex from "katex";

export default function Text(rtext: any) {
    if (!rtext) {
        return null;
    }

    return rtext.title.map((value: any) => {
        if (value.type === 'text'){
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
                key={text.content}
                >
                    {text.link ? <Link href={text.link.url}>{text.content}</Link> : text.content}
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
                    // Use dangerouslySetInnerHTML to render KaTeX HTML
                    dangerouslySetInnerHTML={{ __html: katex.renderToString(expression, {
                        throwOnError: false,
                        displayMode: false,
                        output: 'html',
                        }) 
                    }}
                    key={expression}
                />
            )
        }
    })
}
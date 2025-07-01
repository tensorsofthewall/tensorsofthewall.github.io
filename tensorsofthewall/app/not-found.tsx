import Link from 'next/link';
import Image from "next/image";
import { useMemo } from 'react';

const xkcdComicsURL = [
    "https://imgs.xkcd.com/comics/ai_methodology.png",
    "https://imgs.xkcd.com/comics/machine_learning.png",
    "https://imgs.xkcd.com/comics/machine_learning_captcha.png",
    "https://imgs.xkcd.com/comics/predictive_models.png",
    "https://imgs.xkcd.com/comics/tasks.png",
    "https://imgs.xkcd.com/comics/ai_research.png",
    "https://imgs.xkcd.com/comics/trained_a_neural_net.png",
    "https://imgs.xkcd.com/comics/ai_hiring_algorithm.png"
];

export default function NotFound() {
    // Memoize the random comic selection so it doesn't change on re-render
    const imgURL = useMemo(() => {
        const randomIndex = Math.floor(Math.random() * xkcdComicsURL.length);
        return xkcdComicsURL[randomIndex];
    }, []);

    return (
        <div className="sticky top-0 z-50 mx-auto flex max-w-8xl flex-col items-center justify-center bg-zinc-925 p-2 pt-4 relative text-xl font-bold text-white-400" >
            <p>Error 404: The LLM didn&apos;t predict this, and neither did I.<br /><br /></p>
            <p className='text-blue-400'>Here&apos;s an XKCD comic for your troubles<br /><br /></p>
            <Image
                src={imgURL}
                width={480}
                height={512}
                alt="Never mind, it's probably your fault you're here anyway."
                priority
                style={{ maxWidth: "100%", height: "auto" }}
            />
            <Link href="/" className="text-red-500 decoration-accent-500 decoration-2 underline-offset-4 hover:scale-110 transition-all duration-100">
                <strong><br /><br />Now go away.</strong>
            </Link>
        </div>
    );
}
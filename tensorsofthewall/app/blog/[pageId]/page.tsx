import React from "react";
import { getPublishedPosts, getBlocks, getPageFromSlug } from "@/lib/notion";
import { Fragment } from "react";
import Link from "next/link";
import { renderBlock } from "@/components/notion/renderer";

import CommentSection from "@/components/commentSection";

export const dynamic = 'auto'
export const revalidate = 60;

type Params = Promise<{pageId: string}>;

export async function generateStaticParams() {
    const posts = await getPublishedPosts();
    
    return posts.map((post) => ({
            pageId:
                post.properties.Slug?.type === "rich_text"
                    ? post.properties.Slug.rich_text[0]?.plain_text
                    : ""
    }));
}

export default async function Page({ params }: {
    params: Params
}) {
    // // Required to ensure that params are generated correctly
    const awaitedParams = await params;

    const page = await getPageFromSlug(awaitedParams.pageId)
    if (!page) {
        return (
            <div/>
        );
    }

    const blocks = await getBlocks(page.id)

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="relative flex items-center w-[85vw] max-w-screen-lg mt-4 mb-2">
                <Link
                    href="/blog"
                    className="absolute left-0 text-blue-400 hover:underline text-md sm:text-lg md:text-xl lg:text-2xl"
                >
                    ← Back
                </Link>
                {/* <h1 className="mx-auto text-3xl font-bold text-center w-full">
                    {page.properties.Title.title[0].plain_text}
                </h1> */}
                <h1 className="mx-auto font-bold text-center w-full text-lg sm:text-xl md:text-2xl lg:text-3xl">
                    {page.properties.Title.title[0].plain_text}
                </h1>
            </div>
            <section className="w-[85vw] max-w-screen-lg mt-8 justify-center items-center">
                {blocks.map((block) => (
                    <Fragment key={block.id}>{renderBlock(block)}</Fragment>
                ))}
            </section>
            <div className="w-[75vw] max-w-screen-lg mt-8 justify-center items-center">
                <CommentSection/>
            </div>
        </div>
    )
}
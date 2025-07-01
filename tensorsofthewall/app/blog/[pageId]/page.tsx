import React from "react";
import { getPublishedPosts, getBlocks, getPageFromSlug } from "@/lib/notion";
import { Fragment } from "react";
import Link from "next/link";
import { renderBlock } from "@/components/notion/renderer";

import CommentSection from "@/components/commentSection";
import { RxTimer } from "react-icons/rx";

export const dynamic = 'auto'
export const revalidate = 600;

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

export async function generateMetadata({ params }: { params: Params }) {
    const awaitedParams = await params;
    const page = await getPageFromSlug(awaitedParams.pageId);

    if (!page) {
        return {};
    }

    const title = page.properties.Title?.title?.[0]?.plain_text || "Some blog post";
    const description = page.properties.Description?.rich_text?.[0]?.plain_text || "No description available";
    const imageUrl =
        page.properties.PresentativeMedia?.files?.[0]?.file?.url
            ? page.properties.PresentativeMedia.files[0].file.url.startsWith("http")
                ? page.properties.PresentativeMedia.files[0].file.url
                : `https://www.tensorsofthewall.com${page.properties.PresentativeMedia.files[0].file.url}`
            : "https://www.tensorsofthewall.com/images/blog/blogPostPlaceholder.png";
    const tags = page.properties.Tags?.multi_select?.map((tag: { name: string }) => tag.name).join(", ") || "blog, articles, opinions";
    const publishedTime = page.properties.PublishDate?.date?.start || undefined;
    const canonicalUrl = `https://www.tensorsofthewall.com/blog/${awaitedParams.pageId}`;

    return {
        metadataBase: new URL("https://www.tensorsofthewall.com"),
        title: `${title} | Overfitted Opinions by TensorsOfTheWall`,
        description,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: `${title} | Overfitted Opinions by TensorsOfTheWall`,
            description,
            url: canonicalUrl,
            type: "article",
            images: [
                {
                    url: imageUrl,
                },
            ],
            ...(publishedTime && { publishedTime }),
            ...(tags && { tags: tags.split(", ") }),
        },
        keywords: tags,
        twitter: {
            card: "summary_large_image",
            title: `${title} | Overfitted Opinions by TensorsOfTheWall`,
            description,
            images: [imageUrl],
            site: "@tensorofthewall",
        },
        ...(publishedTime && { authors: ["Sandesh Bharadwaj"] }),
    };
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

    const readTime = `${Math.max(1, Math.ceil((page.properties.numWords?.number ?? 0) / 200))} min read`;

    const blocks = await getBlocks(page.id)

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="relative w-[85vw] max-w-screen-lg mt-4 mb-2">
                <div className="flex items-center justify-between w-full">
                    {/* Back link on the left */}
                    <Link
                        href="/blog"
                        aria-label="Back to blog"
                        className="text-blue-400 hover:underline text-md sm:text-lg md:text-xl lg:text-2xl"
                    >
                        ← Back
                    </Link>
                    {/* Title in the center */}
                    <h1 className="font-bold text-center flex-1 text-lg sm:text-xl md:text-2xl lg:text-3xl">
                        {page.properties.Title.title[0].plain_text}
                    </h1>
                    {/* Read time on the right */}
                    <span className="flex items-center gap-1 text-sm sm:text-base md:text-lg text-gray-400 ml-4 whitespace-nowrap">
                        <RxTimer />{readTime}
                    </span>
                </div>
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
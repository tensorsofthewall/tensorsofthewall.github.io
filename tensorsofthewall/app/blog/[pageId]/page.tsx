import "katex/dist/katex.min.css";
import { getPublishedPosts, getBlocks, getPageFromSlug } from "@/lib/notion";
import { getPostSummaries, summarizePost } from "@/lib/blogPosts";
import { annotateHeadings } from "@/lib/headings";
import { Fragment } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { renderBlock } from "@/components/notion/renderer";

import CommentSection from "@/components/commentSection";
import ReadingProgress from "./ReadingProgress";
import TableOfContents from "./TableOfContents";
import PostNav from "./PostNav";
import PostMeta from "../PostMeta";
import PageContainer from "@/components/ui/PageContainer";
import TagList from "@/components/ui/Tag";
import Divider from "@/components/ui/Divider";

export const dynamic = 'auto'
export const revalidate = 600;

type Params = Promise<{ pageId: string }>;

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
        return { title: "Post Not Found | TensorsOfTheWall" };
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

/** Show the table of contents only when the post has enough sections to navigate. */
const MIN_TOC_ENTRIES = 3;

export default async function Page({ params }: {
    params: Params
}) {
    const awaitedParams = await params;

    const page = await getPageFromSlug(awaitedParams.pageId)
    if (!page) {
        notFound();
    }

    const post = summarizePost(page);
    const [blocks, allPosts] = await Promise.all([
        getBlocks(page.id),
        getPostSummaries().catch(() => []),
    ]);
    const toc = annotateHeadings(blocks);
    const showToc = toc.length >= MIN_TOC_ENTRIES;

    // allPosts is newest-first, so the previous index is the newer post.
    const index = allPosts.findIndex((p) => p.slug === post.slug);
    const newer = index > 0 ? allPosts[index - 1] : undefined;
    const older = index >= 0 ? allPosts[index + 1] : undefined;

    return (
        <>
            <ReadingProgress targetId="article-body" />
            <PageContainer>
                <div className={showToc ? "lg:grid lg:grid-cols-[minmax(0,720px)_220px] lg:justify-center lg:gap-x-24" : "mx-auto max-w-[720px]"}>
                    <article className="min-w-0">
                        <div className="mb-10">
                            <Link
                                href="/blog"
                                className="mb-6 inline-flex min-h-10 items-center text-sm font-medium text-accent hover:underline"
                            >
                                <span aria-hidden="true" className="mr-1">←</span> Overfitted Opinions
                            </Link>
                            <h1 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl" style={{ textWrap: "balance" }}>
                                {post.title}
                            </h1>
                            <PostMeta post={post} className="mt-4" />
                            <TagList tags={post.tags} className="mt-4" />
                            <Divider className="mt-8" />
                        </div>

                        <div id="article-body">
                            {blocks.map((block) => (
                                <Fragment key={block.id}>{renderBlock(block)}</Fragment>
                            ))}
                        </div>

                        <PostNav newer={newer} older={older} />

                        <div className="mt-16">
                            <CommentSection />
                        </div>
                    </article>

                    {showToc && (
                        <aside className="hidden lg:block">
                            <TableOfContents entries={toc} />
                        </aside>
                    )}
                </div>
            </PageContainer>
        </>
    )
}

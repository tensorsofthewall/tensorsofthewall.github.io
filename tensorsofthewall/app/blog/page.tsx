import { getPostSummaries, type BlogPostSummary } from "@/lib/blogPosts";
import FeaturedPost from "./FeaturedPost";
import PostCard from "./PostCard";
import PageContainer from "@/components/ui/PageContainer";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";

const pageStartText = "Overfitted Opinions: I write things down here instead of explaining them at 2 a.m. to someone trying to sleep"
const pageSubtitle = "I write things down here instead of explaining them at 2 a.m. to someone trying to sleep."

export const metadata = {
    metadataBase: new URL("https://www.tensorsofthewall.com"),
    title: "Overfitted Opinions | Blog by TensorsOfTheWall",
    description: pageStartText,
    alternates: {
        canonical: "https://www.tensorsofthewall.com/blog",
    },
    openGraph: {
        title: "Overfitted Opinions | Blog by TensorsOfTheWall",
        description: pageStartText,
        url: "https://www.tensorsofthewall.com/blog",
        type: "website",
        images: [
            {
                url: "https://www.tensorsofthewall.com/images/blog/blogPostPlaceholder.png",
                width: 1200,
                height: 630,
                alt: "Overfitted Opinions Blog Banner",
            },
        ],
    },
    keywords: [
        "AI blog",
        "machine learning",
        "deep learning",
        "artificial intelligence",
        "software engineering",
        "autonomous systems",
        "computer vision",
        "generative AI",
        "TensorsOfTheWall",
        "Overfitted Opinions",
        "Sandesh Bharadwaj",
        "blog",
        "articles",
        "opinions"
    ],
    twitter: {
        card: "summary_large_image",
        title: "Overfitted Opinions | Blog by TensorsOfTheWall",
        description: pageStartText,
        images: ["https://www.tensorsofthewall.com/images/blog/blogPostPlaceholder.png"],
        site: "@tensorofthewall",
    },
};

export const revalidate = 1800;

export default async function BlogPage() {
    let posts: BlogPostSummary[] = [];
    try {
        posts = await getPostSummaries();
    } catch (error) {
        console.error("Failed to load blog posts:", error);
    }

    // Posts arrive newest-first from Notion.
    const [latest, ...archive] = posts;

    return (
        <PageContainer>
            <PageHeader eyebrow="Writing" title="Overfitted Opinions" subtitle={pageSubtitle} />

            {!latest && <p className="text-secondary">Nothing to read yet. Check back soon.</p>}

            {latest && (
                <section aria-label="Latest article" className="mb-16">
                    <FeaturedPost post={latest} />
                </section>
            )}

            {archive.length > 0 && (
                <section aria-labelledby="archive">
                    <SectionHeading id="archive">Archive</SectionHeading>
                    <div className="grid gap-5 sm:grid-cols-2">
                        {archive.map((post) => (
                            <PostCard key={post.slug} post={post} />
                        ))}
                    </div>
                </section>
            )}
        </PageContainer>
    );
}

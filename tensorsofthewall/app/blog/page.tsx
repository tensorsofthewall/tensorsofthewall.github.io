import {  getPublishedPosts } from "@/lib/notion"
import { Space } from "antd";
import BlogPostCard from "./blogPostCard";
import { format } from "date-fns";

const pageStartText = "Overfitted Opinions: I write things down here instead of explaining them at 2 a.m. to someone trying to sleep"

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

async function getPostInfo() {
    const posts = await getPublishedPosts();
    const postCards = posts.map((post) => {
        const titleProp = post.properties.Title;
        const slugProp = post.properties.Slug;
        const tagsProp = post.properties.Tags;
        const publishDateProp = post.properties.PublishDate;
        const descriptionProp = post.properties.Description;
        const imageURLProp = post.properties.PresentativeMedia;
        const numWordsProp = post.properties.numWords

        return {
            title:
                titleProp.type === "title" && titleProp.title.length > 0
                    ? titleProp.title[0].plain_text
                    : "",
            description:
                descriptionProp.type === "rich_text" && descriptionProp.rich_text.length > 0
                    ? descriptionProp.rich_text[0].plain_text
                    : "",
            imageURL:
                imageURLProp.type === "files" &&
                imageURLProp.files.length > 0 &&
                imageURLProp.files[0].type === "file"
                    ? imageURLProp.files[0].file.url
                    : "/images/blog/blogPostPlaceholder.png",
            slug:
                slugProp.type === "rich_text" && slugProp.rich_text.length > 0
                    ? slugProp.rich_text[0].plain_text
                    : "",
            tags:
                tagsProp.type === "multi_select"
                    ? tagsProp.multi_select.map((tag: { name: string }) => tag.name)
                    : [],
            publishDate:
                publishDateProp.type === "date" && publishDateProp.date
                    ? format(new Date(publishDateProp.date.start), "MMM dd, yyyy")
                    : "",
            lastEditDate: format(new Date(post.last_edited_time), "MMM dd, yyyy"),
            readTime: numWordsProp.type === "number" && numWordsProp.number ? Math.ceil(numWordsProp.number / 200).toString() : "0", // Assuming average reading speed of 200 wpm
        };
    })
    return postCards;
}

export default async function BlogPage() {
    const postCards= await getPostInfo();

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}} className="font-['arial]">
                    <strong style={{marginTop: '2rem'}} className='w-[400px] sm:w-[400px] md:w-[450px] lg:w-[500px] text-medium sm:text-large md:text-xl lg:text-2xl'>{pageStartText}</strong>
                
            <div className="w-auto h-auto " style={{paddingTop: "6vh"}}>
                {postCards.map((postCardData, idx) => (
                    <Space direction="horizontal" size="middle" key={idx} align="center" wrap
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: '2rem',
                            listStyleType: 'none',
                            paddingLeft: '0',
                            paddingRight: '0',
                        }}
                    >
                        <BlogPostCard {...postCardData} />
                    </Space>
                ))}
                </div>
            </div>
        </div>
    );
}
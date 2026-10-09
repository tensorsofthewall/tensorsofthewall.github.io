import { format } from "date-fns";
import { getPublishedPosts } from "@/lib/notion";

export interface BlogPostSummary {
    title: string;
    description: string;
    imageURL: string;
    slug: string;
    /**
     * Notion multi-select tags. These double as categories: once there are enough posts,
     * filter the archive by tag (e.g. Systems, Computer Vision, Robotics, Opinion, AI).
     */
    tags: string[];
    publishDate: string;
    /** Minutes, or null when the word count is unknown. */
    readTime: number | null;
}

const PLACEHOLDER_IMAGE = "/images/blog/blogPostPlaceholder.png";
const WORDS_PER_MINUTE = 200;

/** Published posts, newest first. */
export async function getPostSummaries(): Promise<BlogPostSummary[]> {
    const posts = await getPublishedPosts();
    return posts.map(summarizePost);
}

/** Reads the Notion properties of a single post page into a plain summary. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function summarizePost(post: { properties: Record<string, any> }): BlogPostSummary {
    const { Title, Slug, Tags, PublishDate, Description, PresentativeMedia, numWords } = post.properties;

    return {
        title: Title.type === "title" && Title.title.length > 0 ? Title.title[0].plain_text : "",
        description:
            Description.type === "rich_text" && Description.rich_text.length > 0
                ? Description.rich_text[0].plain_text
                : "",
        imageURL:
            PresentativeMedia.type === "files" &&
            PresentativeMedia.files.length > 0 &&
            PresentativeMedia.files[0].type === "file"
                ? PresentativeMedia.files[0].file.url
                : PLACEHOLDER_IMAGE,
        slug: Slug.type === "rich_text" && Slug.rich_text.length > 0 ? Slug.rich_text[0].plain_text : "",
        tags: Tags.type === "multi_select" ? Tags.multi_select.map((tag: { name: string }) => tag.name) : [],
        publishDate:
            PublishDate.type === "date" && PublishDate.date
                ? format(new Date(PublishDate.date.start), "MMM d, yyyy")
                : "",
        readTime:
            numWords.type === "number" && numWords.number
                ? Math.ceil(numWords.number / WORDS_PER_MINUTE)
                : null,
    };
}

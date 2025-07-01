import type { MetadataRoute } from 'next';
import { getPublishedPosts } from '@/lib/notion';
// import { format } from "date-fns";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticPages = [
        '',
        'skills',
        'research-exp',
        'industry-exp',
        'education',
        'projects_publications',
        'blog',
        'hero'
    ];

    // Dynamic blog posts
    let blogPosts: { url: string; lastModified: string }[] = [];
    try {
        const posts = await getPublishedPosts();
        blogPosts = posts.map((post) => {
            const slugProp = post.properties.Slug;
            const publishDateProp = post.properties.PublishDate;
            const slug =
            slugProp?.type === 'rich_text' && slugProp.rich_text.length > 0
                ? slugProp.rich_text[0].plain_text
                : '';
            const lastMod = publishDateProp.type === "date" && publishDateProp.date
                                ? new Date(publishDateProp.date.start).toISOString()
                                : new Date().toISOString();
            return {
            url: `https://tensorsofthewall.com/blog/${slug}`,
            lastModified: lastMod,
            changeFrequency: 'weekly',
            priority: 0.8
            };
        });
    } catch {
        // Fallback: no blog posts
        blogPosts = [];
    }
  return [
    ...staticPages.map((page) => ({
      url: `https://tensorsofthewall.com/${page}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: page === '' ? 1 : 0.8,
    })),
    ...blogPosts,
  ];
}
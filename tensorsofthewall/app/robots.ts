import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "Googlebot-Image",
                disallow: "/images/sandesh_photo_closeup.jpg",
            },
            {
                userAgent: '*',
                disallow: '/_next/',
            },
            {
                userAgent: '*',
                disallow: '/private/',
            }
        ],
        sitemap: "https://tensorsofthewall.com/sitemap.xml",
    };
}
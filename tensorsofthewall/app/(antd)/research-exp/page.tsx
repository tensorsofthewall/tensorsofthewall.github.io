import React from "react";
import data from "@/public/data/resume_json.json";
import ResearchExpClient from "./ResearchExpClient";
import type { ResearchExpProps } from "./researchExpCard";

const pageStartText = "Research: Where \‘what if\’ turns into months of debugging and a publication that makes it all worth it."

export const metadata = {
    metadataBase: new URL("https://www.tensorsofthewall.com"),
    title: "Research Experience | TensorsOfTheWall",
    description: pageStartText,
    alternates: {
        canonical: "https://www.tensorsofthewall.com/industry-exp",
    },
    openGraph: {
        title: "Research Experience | TensorsOfTheWall",
        description: pageStartText,
        url: "https://www.tensorsofthewall.com/industry-exp",
        type: "website",
        images: [
            {
                url: "https://www.tensorsofthewall.com/images/banners/research_banner.png", // Update if you have a specific banner
                width: 960,
                height: 640,
                alt: "Projects and Publications at TensorsOfTheWall",
            },
        ],
    },
    keywords: [
        "research experience",
        "academic research",
        "Sandesh Bharadwaj",
        "TensorsOfTheWall",
        "software engineering",
        "internship",
        "work experience",
        "projects",
        "career",
        "research",
        "deep learning",
        "computer vision",
        "audio processing",
        "generative AI",
        "autonomous driving",
        "person re-identification",
        "music source separation",
        "source separation",
        "language models",
        "vision-language models",
        ...data.researchExperience.map((exp) => exp.organization),
    ],
    twitter: {
        card: "summary_large_image",
        title: "Research Experience | TensorsOfTheWall",
        description: pageStartText,
        images: ["https://www.tensorsofthewall.com/images/banners/research_banner.png"],
        site: "@tensorofthewall",
    },
};

const pageSubText = "Click on each card to view more details.";

export const revalidate = 3600; // Revalidate every hour

export default function ResearchExp() {
    const researchExperience: ResearchExpProps[] = data.researchExperience;
    return (
        <ResearchExpClient
            researchExperience={researchExperience}
            pageStartText={pageStartText}
            pageSubText={pageSubText}
        />
    );
}
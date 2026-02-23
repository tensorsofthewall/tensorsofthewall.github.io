import React from "react";
import data from "@/public/data/resume_json.json";
import ExperienceClient from "./ExperienceClient";
import type { ResearchExpProps } from "../research-exp/researchExpCard";
import type { IndustryExpProps } from "../industry-exp/industryExpCard";

const pageStartText = 'Research & Engineering: Where "what if" turns into months of debugging and occasional progress.';

export const metadata = {
    metadataBase: new URL("https://www.tensorsofthewall.com"),
    title: "Research and Engineering | TensorsOfTheWall",
    description: pageStartText,
    alternates: {
        canonical: "https://www.tensorsofthewall.com/experience",
    },
    openGraph: {
        title: "Research and Engineering | TensorsOfTheWall",
        description: pageStartText,
        url: "https://www.tensorsofthewall.com/experience",
        type: "website",
        images: [
            {
                url: "https://www.tensorsofthewall.com/images/banners/experience_banner.png",
                width: 960,
                height: 640,
                alt: "TensorsOfTheWall Experience Banner",
            },
        ],
    },
    keywords: [
        "experience",
        "research",
        "engineering",
        "research experience",
        "industry experience",
        "professional experience",
        "academic research",
        "Sandesh Bharadwaj",
        "TensorsOfTheWall",
        "software engineering",
        "internship",
        "work experience",
        "career",
        "deep learning",
        "computer vision",
        "generative AI",
        "autonomous driving",
        ...data.researchExperience.map((exp) => exp.organization),
        ...data.industryExperience.map((exp) => exp.company),
    ],
    twitter: {
        card: "summary_large_image",
        title: "Experience | TensorsOfTheWall",
        description: pageStartText,
        images: ["https://www.tensorsofthewall.com/images/banners/industry_banner.png"],
        site: "@tensorofthewall",
    },
};

export const revalidate = 3600;

const pageSubText = "Click on each card to view more details.";

export default function ExperiencePage() {
    const researchExperience: ResearchExpProps[] = data.researchExperience;
    const industryExperience: IndustryExpProps[] = data.industryExperience;
    return (
        <ExperienceClient
            researchExperience={researchExperience}
            industryExperience={industryExperience}
            pageStartText={pageStartText}
            pageSubText={pageSubText}
        />
    );
}

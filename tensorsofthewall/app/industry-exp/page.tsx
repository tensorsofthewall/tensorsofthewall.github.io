import React from "react";
import data from "@/public/data/resume_json.json";
import IndustryExpClient from "./IndustryExpClient";
import { IndustryExpProps } from "./industryExpCard";

const pageStartText = 'Industry: Where I learned that "It works on my machine" is not an acceptable debug strategy.';

export const metadata = {
    metadataBase: new URL("https://www.tensorsofthewall.com"),
    title: "Industry Experience | TensorsOfTheWall",
    description: pageStartText,
    alternates: {
        canonical: "https://www.tensorsofthewall.com/industry-exp",
    },
    openGraph: {
        title: "Industry Experience | TensorsOfTheWall",
        description: pageStartText,
        url: "https://www.tensorsofthewall.com/industry-exp",
        type: "website",
        images: [
            {
                url: "https://www.tensorsofthewall.com/images/banners/industry_banner.png",
                width: 960,
                height: 640,
                alt: "TensorsOfTheWall Industry Experience Banner",
            },
        ],
    },
    keywords: [
        "industry experience",
        "professional experience",
        "Sandesh Bharadwaj",
        "TensorsOfTheWall",
        "resume",
        "software engineering",
        "internship",
        "work experience",
        "projects",
        "career",
        "industry",
        ...data.industryExperience.map((exp) => exp.company),
    ],
    twitter: {
        card: "summary_large_image",
        title: "Industry Experience | TensorsOfTheWall",
        description: pageStartText,
        images: ["https://www.tensorsofthewall.com/images/banners/industry_banner.png"],
        site: "@tensorofthewall",
    },
};

export const revalidate = 3600; // Enable ISR

const pageSubText = "Click on each card to view more details.";

export default function IndustryExpPage() {
    const industryExperience: IndustryExpProps[] = data.industryExperience;
    return <IndustryExpClient industryExperience={industryExperience} pageStartText={pageStartText}
            pageSubText={pageSubText} />;
}
import { Tabs } from 'antd';
import data from '@/public/data/resume_json.json';
import ResearchCarousel from './paperCarousel';
import ProjectCarousel from './projectCarousel';
import { useMemo } from 'react';

export const revalidate = 3600; // Revalidate every hour

const pageStartText = 'Here lies some evidence of my ‘productive’ rabbit holes.';

const pageSubText = "Click on the title in each card to view the\n full details (link opens in new tab).";

export const metadata = {
    metadataBase: new URL("https://www.tensorsofthewall.com"),
    title: "Projects & Publications | TensorsOfTheWall",
    description: "Published papers and projects over the years.",
    alternates: {
        canonical: "https://www.tensorsofthewall.com/projects_publications",
    },
    openGraph: {
        title: "Projects & Publications | TensorsOfTheWall",
        description: "Published papers and projects over the years.",
        url: "https://www.tensorsofthewall.com/projects_publications",
        type: "website",
        images: [
            {
                url: "https://www.tensorsofthewall.com/images/banners/projects_banner.png",
                width: 960,
                height: 640,
                alt: "Projects and Publications at TensorsOfTheWall",
            },
        ],
    },
    keywords: [
        "projects",
        "publications",
        "research",
        "Sandesh Bharadwaj",
        "TensorsOfTheWall",
        "portfolio",
        "AI",
        "computer vision",
        "deep learning",
        "autonomous systems",
        "European Conference for Computer Vision",
        // Add publication titles and project names for SEO
        ...data.publications.map((pub) => pub.title),
        ...data.projects.map((proj) => proj.name),
        // Add publication conferences for extra SEO
        ...data.publications.map((pub) => pub.conference || "").filter(Boolean),
    ],
    twitter: {
        card: "summary_large_image",
        title: "Projects & Publications | TensorsOfTheWall",
        description: "Published papers and projects over the years.",
        images: ["https://www.tensorsofthewall.com/images/banners/projects_banner.png"],
        site: "@tensorofthewall",
    },
};

const TabCarousel = () => {
    const TabItems = useMemo(() =>[
        {
            key: '1',
            label: <span className='text-sm sm:text-base md:text-xl lg:text-2xl'>Publications</span>,
            children: (
                <div className='pt-10'>
                <ResearchCarousel papers={data.publications} />
                </div>
            )
        },
        {
            key: '2',
            label: <span className='text-sm sm:text-base md:text-xl lg:text-2xl'>Projects</span>,
            children: (
                <div className='pt-10'>
                <ProjectCarousel projects={data.projects} />
                </div>
            )
        }
    ], []);

    return (
        <div style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: '75px'}} className="font-['arial']">
            <strong className='w-[90vw] max-w-[550px] text-sm sm:text-base md:text-xl lg:text-2xl'>{pageStartText}<div className="blur-sm hover:blur-none transition-all duration-300" 
                style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
                <h1 style={{ fontSize: '18px', whiteSpace: 'pre-line'}}>{pageSubText}</h1>
            </div></strong>
            <Tabs
                defaultActiveKey="1"
                centered
                animated
                className="text-white-600 justify-center text-center"
                tabBarGutter={48}
                tabBarStyle={{ paddingTop: '5px', marginBottom: '-10px', display: 'flex', justifyContent: 'center' }}
                size="small"
                items={TabItems}
            />
        </div>
    )
}

export default TabCarousel;
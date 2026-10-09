import data from '@/public/data/resume_json.json';
import FeaturedWork from './FeaturedWork';
import ProjectCard from './ProjectCard';
import PublicationList from './PublicationList';
import PageContainer from '@/components/ui/PageContainer';
import PageHeader from '@/components/ui/PageHeader';
import SectionHeading from '@/components/ui/SectionHeading';
import { getFeaturedItems } from './featured';

export const revalidate = 3600; // Revalidate every hour

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

const ProjectsPublicationsPage = () => {
    const featured = getFeaturedItems();
    const papers = [...data.publications].sort((a, b) => b.year - a.year);

    return (
        <PageContainer>
            <PageHeader
                eyebrow="Work"
                title="Projects & Publications"
                subtitle={<>Here lies some evidence of my &lsquo;productive&rsquo; rabbit holes.</>}
            />

            <section aria-labelledby="featured" className="mb-16">
                <SectionHeading id="featured">Featured Work</SectionHeading>
                <div className="flex flex-col gap-6">
                    {featured.map((item) => (
                        <FeaturedWork key={item.key} item={item} />
                    ))}
                </div>
            </section>

            <section aria-labelledby="projects" className="mb-16">
                <SectionHeading id="projects">Selected Projects</SectionHeading>
                <div className="grid gap-5 sm:grid-cols-2">
                    {data.projects.map((project) => (
                        <ProjectCard key={project.name} project={project} />
                    ))}
                </div>
            </section>

            <section aria-labelledby="publications">
                <SectionHeading id="publications">Publications</SectionHeading>
                <PublicationList papers={papers} />
            </section>
        </PageContainer>
    );
};

export default ProjectsPublicationsPage;

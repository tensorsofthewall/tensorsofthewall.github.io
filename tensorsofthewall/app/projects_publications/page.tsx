import data from '@/public/data/resume_json.json';
import FeaturedWork from './FeaturedWork';
import ProjectCard from './ProjectCard';
import PublicationList from './PublicationList';

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

const SectionHeading = ({ id, children }: { id: string; children: React.ReactNode }) => (
    <h2 id={id} className="mb-6 text-sm font-semibold uppercase tracking-[0.18em] text-[#9ca3af]">
        {children}
    </h2>
);

const ProjectsPublicationsPage = () => {
    const featured = data.publications.filter((p) => p.featured);
    const papers = [...data.publications].sort((a, b) => b.year - a.year);

    return (
        <div className="mx-auto w-full max-w-[1100px] px-4 pb-24 pt-20 sm:px-8 md:px-10">
            <div className="mb-14">
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#37accd]">Work</p>
                <h1 className="text-3xl font-bold text-[#ededed] sm:text-4xl">Projects &amp; Publications</h1>
                <p className="mt-3 max-w-xl text-lg text-[#9ca3af]">
                    Here lies some evidence of my &lsquo;productive&rsquo; rabbit holes.
                </p>
            </div>

            <section aria-labelledby="featured" className="mb-16">
                <SectionHeading id="featured">Featured Work</SectionHeading>
                <div className="flex flex-col gap-6">
                    {featured.map((item) => (
                        <FeaturedWork key={item.title} item={item} />
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
        </div>
    );
};

export default ProjectsPublicationsPage;

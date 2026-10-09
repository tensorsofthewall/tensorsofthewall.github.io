import TimelineEntry, { InstitutionMark } from './TimelineEntry';
import PageContainer from '@/components/ui/PageContainer';
import PageHeader from '@/components/ui/PageHeader';
import SectionHeading from '@/components/ui/SectionHeading';
import Surface from '@/components/ui/Surface';
import TagList from '@/components/ui/Tag';
import ExternalAction from '@/components/ui/ExternalAction';
import data from '@/public/data/resume_json.json' assert { type: 'json' };

export const revalidate = 3600;

const pageStartText = "University: Where I learned to turn coffee into thesis papers and prototypes that mostly worked on the first try."

export async function generateMetadata() {
    const title = "Education | TensorsOfTheWall";
    const description = pageStartText;
    const url = "https://www.tensorsofthewall.com/education";

    return {
        metadataBase: new URL("https://www.tensorsofthewall.com"),
        title,
        description,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
            type: "website",
            images: [
                {
                    url: "https://www.tensorsofthewall.com/images/banners/hero_banner.png",
                    width: 960,
                    height: 640,
                    alt: "TensorsOfTheWall Education Banner",
                },
            ],
        },
        keywords: [
            "education",
            "university",
            "Boston University",
            "Boston",
            "BU",
            "Indian Institute of Information Technology, Design and Manufacturing, Kancheepuram",
            "IIITDM Kancheepuram",
            "IIITDM",
            "Sandesh Bharadwaj",
            "coursework",
            "degrees",
            "research thesis",
            "thesis",
            "master's degree",
            "bachelor's degree",
            "computer science",
            "TensorsOfTheWall",
            "Electronics and Communication Engineering",
            "AUV IIITDM",
            "Autonomous Underwater Vehicle",
            "Vision-language models",
            "Autonomous driving",
        ],
        twitter: {
            card: "summary_large_image",
            title,
            description,
            site: "@tensorofthewall",
            images: ["https://www.tensorsofthewall.com/images/banners/hero_banner.png"],
        },
    };
}

/** "Teaching Assistant - ENG EC 444: ..." -> role + context. */
const splitRole = (position: string) => {
    const [role, ...rest] = position.split(' - ');
    return { role, context: rest.join(' - ') };
};

const EducationPage = () => {
    return (
        <PageContainer>
            <PageHeader eyebrow="Learning" title="Education" subtitle={pageStartText} />

            <ol className="list-none">
                {data.education.map((edu) => (
                    <TimelineEntry key={edu.institution} start={edu.startDate} end={edu.graduation}>
                        <div className="flex items-center gap-4">
                            <InstitutionMark src={edu.logo} name={edu.institution} />
                            <h2 className="text-xl font-semibold text-foreground sm:text-2xl">{edu.institution}</h2>
                        </div>
                        <p className="mt-3 text-lg text-body">{edu.degree}</p>

                        {edu.thesis && (
                            <Surface accent="left" className="mt-6 p-5">
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Thesis</p>
                                <p className="mt-2 text-lg font-semibold leading-snug text-foreground">{edu.thesis.title}</p>
                                <div className="mt-4 flex flex-wrap gap-3">
                                    {edu.thesis.links.map((l) => (
                                        <ExternalAction key={l.url} href={encodeURI(l.url)}>{l.label}</ExternalAction>
                                    ))}
                                </div>
                            </Surface>
                        )}

                        <div className="mt-6 grid gap-6 sm:grid-cols-2">
                            <div>
                                <SectionHeading as="h3" size="sm">Roles</SectionHeading>
                                <ul className="flex flex-col gap-2.5">
                                    {edu.positions.map((position) => {
                                        const { role, context } = splitRole(position);
                                        return (
                                            <li key={position} className="text-sm leading-snug">
                                                <span className="font-medium text-foreground">{role}</span>
                                                {context && <span className="block text-secondary">{context}</span>}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                            <div>
                                <SectionHeading as="h3" size="sm">Selected coursework</SectionHeading>
                                <TagList tags={edu.coursework} label="Coursework" />
                            </div>
                        </div>
                    </TimelineEntry>
                ))}
            </ol>
        </PageContainer>
    );
};

export default EducationPage;

import TimelineEntry, { InstitutionMark } from './TimelineEntry';
import ActionLink from './ActionLink';
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
        <div className="mx-auto w-full max-w-[1100px] px-4 pb-24 pt-20 sm:px-8 md:px-10">
            <div className="mb-14">
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#37accd]">Learning</p>
                <h1 className="text-3xl font-bold text-[#ededed] sm:text-4xl">Education</h1>
                <p className="mt-3 max-w-xl text-lg text-[#9ca3af]">{pageStartText}</p>
            </div>

            <ol className="list-none">
                {data.education.map((edu) => (
                    <TimelineEntry key={edu.institution} start={edu.startDate} end={edu.graduation}>
                        <div className="flex items-center gap-4">
                            <InstitutionMark src={edu.logo} name={edu.institution} />
                            <h2 className="text-xl font-semibold text-[#ededed] sm:text-2xl">{edu.institution}</h2>
                        </div>
                        <p className="mt-3 text-lg text-[#d1d5db]">{edu.degree}</p>

                        {edu.thesis && (
                            <div className="mt-6 rounded-xl border border-[#2a2d30] border-l-2 border-l-[#37accd] bg-[#111315] p-5">
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#37accd]">Thesis</p>
                                <p className="mt-2 text-lg font-semibold leading-snug text-[#ededed]">{edu.thesis.title}</p>
                                <div className="mt-4 flex flex-wrap gap-3">
                                    {edu.thesis.links.map((l) => (
                                        <ActionLink key={l.url} href={encodeURI(l.url)}>{l.label}</ActionLink>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-6 grid gap-6 sm:grid-cols-2">
                            <div>
                                <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#9ca3af]">Roles</h3>
                                <ul className="flex flex-col gap-2.5">
                                    {edu.positions.map((position) => {
                                        const { role, context } = splitRole(position);
                                        return (
                                            <li key={position} className="text-sm leading-snug">
                                                <span className="font-medium text-[#ededed]">{role}</span>
                                                {context && <span className="block text-[#9ca3af]">{context}</span>}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                            <div>
                                <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#9ca3af]">Selected coursework</h3>
                                <ul className="flex flex-wrap gap-1.5">
                                    {edu.coursework.map((course) => (
                                        <li key={course} className="rounded border border-[#2a2d30] px-2 py-0.5 text-xs text-[#9ca3af]">
                                            {course}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </TimelineEntry>
                ))}
            </ol>
        </div>
    );
};

export default EducationPage;

import data from "@/public/data/resume_json.json" assert { type: "json" };
import ToolboxWheel from "./ToolboxWheel";
import PageContainer from "@/components/ui/PageContainer";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import Surface from "@/components/ui/Surface";
import TagList from "@/components/ui/Tag";

export const revalidate = 3600; // Revalidate every hour


const pageStartText = ["Skills? Let’s just say if it involves code, I can make it work... eventually.","I mean, you're on this website."]

/** Shorter labels for the names used in the resume data. */
const DISPLAY_NAME: Record<string, string> = {
    "HuggingFace Transformers": "Transformers",
    "Intel OpenVINO": "OpenVINO",
    "Apache Spark": "Spark",
    "Apache AirFlow": "Airflow",
    "NextJS": "Next.js",
    "GazeboSim": "Gazebo",
    "Scikit-Learn": "scikit-learn",
};
const label = (name: string) => DISPLAY_NAME[name] ?? name;

/** Groups with too few leftovers to stand alone are folded into another. */
const MERGE_INTO: Record<string, string> = { databases: "frameworks" };

const GROUP_TITLE: Record<string, string> = {
    languages: "Languages",
    devOpsAndSimulators: "DevOps & Simulators",
    frameworks: "Frameworks & Data",
    libraries: "Libraries",
};

export const metadata = {
    metadataBase: new URL("https://www.tensorsofthewall.com"),
    title: "Technical Skills | TensorsOfTheWall",
    description: pageStartText[0],
    alternates: {
        canonical: "https://www.tensorsofthewall.com/skills",
    },
    openGraph: {
        title: "Technical Skills | TensorsOfTheWall",
        description: pageStartText[0],
        url: "https://www.tensorsofthewall.com/skills",
        type: "website",
        images: [
            {
                url: "https://www.tensorsofthewall.com/images/projects/skills_banner.png",
                width: 960,
                height: 640,
                alt: "Technical Skills Banner",
            },
        ],
    },
    keywords: [
        "skills",
        "technical skills",
        "Sandesh Bharadwaj",
        "TensorsOfTheWall",
        "resume",
        "programming",
        "developer",
        "portfolio",
        ...data.skills.languages,
        ...data.skills.databases,
        ...data.skills.devOpsAndSimulators,
        ...data.skills.frameworks,
        ...data.skills.libraries,
        ...data.skills.capabilities.map((c) => c.title),
    ],
    twitter: {
        card: "summary_large_image",
        title: "Technical Skills | TensorsOfTheWall",
        description: pageStartText[0],
        site: "@tensorofthewall",
        images: ["https://www.tensorsofthewall.com/images/projects/skills_banner.png"],
    },
};

const Skills = () => {
    const { capabilities, toolbox, ...groups } = data.skills;

    // Everything in the resume data that is not called out in a capability is shown as plain
    // supporting text rather than a badge, so distinctive skills keep the visual weight.
    const featured = new Set(capabilities.flatMap((c) => c.skills));
    const seen = new Set<string>();
    const merged: Record<string, string[]> = {};
    for (const [key, skills] of Object.entries(groups)) {
        const target = MERGE_INTO[key] ?? key;
        merged[target] = [...(merged[target] ?? []), ...skills];
    }
    const supporting = Object.entries(merged)
        .map(([key, skills]) => ({
            key,
            title: GROUP_TITLE[key] ?? key,
            skills: skills.filter((s) => {
                if (featured.has(s) || seen.has(s)) return false;
                seen.add(s);
                return true;
            }),
        }))
        .filter((g) => g.skills.length > 0);

    return (
        <PageContainer>
            <div className="mb-14 grid items-center gap-10 lg:grid-cols-[1fr_380px]">
                <PageHeader
                    className=""
                    eyebrow="Toolbox"
                    title="Technical Skills"
                    subtitle={pageStartText[0]}
                    helper={pageStartText[1]}
                />
                <ToolboxWheel names={toolbox} />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {capabilities.map((cap, i) => (
                    <Surface as="section" accent="top" key={cap.id} aria-labelledby={cap.id} className="relative flex flex-col gap-5 overflow-hidden p-5 sm:p-7">
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute right-5 top-3 select-none text-6xl font-bold leading-none text-foreground/[0.05]"
                        >
                            {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                            <h2 id={cap.id} className="text-xl font-semibold text-foreground">{cap.title}</h2>
                            <p className="mt-2 text-[15px] leading-relaxed text-secondary">{cap.context}</p>
                        </div>
                        <p className="border-l-2 border-accent pl-3 text-sm leading-snug text-body">
                            <span className="mr-1.5 text-2xl font-bold text-accent">{cap.highlight.value}</span>
                            {cap.highlight.label}
                        </p>
                        <TagList
                            tags={cap.skills.map(label)}
                            size="md"
                            label={`${cap.title} skills`}
                            className="mt-auto"
                            variantFor={(tag) => (cap.primary.map(label).includes(tag) ? "strong" : "outline")}
                        />
                    </Surface>
                ))}
            </div>

            <section aria-labelledby="also" className="mt-14">
                <SectionHeading id="also" className="!mb-1">Also in the toolbox</SectionHeading>
                <p className="mb-5 text-sm text-muted">The supporting cast: used often, just not the headline.</p>
                <Surface className="grid gap-x-8 gap-y-6 !bg-surface/50 p-5 sm:grid-cols-2 sm:p-7 lg:grid-cols-3">
                    {supporting.map((group) => (
                        <div key={group.key}>
                            <SectionHeading as="h3" size="sm" className="flex items-center gap-2 !mb-2.5">
                                <span aria-hidden="true" className="h-px w-4 bg-accent/60" />
                                {group.title}
                            </SectionHeading>
                            <TagList tags={group.skills.map(label)} variant="quiet" label={`${group.title} tools`} className="gap-1.5" />
                        </div>
                    ))}
                </Surface>
            </section>
        </PageContainer>
    );
};

export default Skills;

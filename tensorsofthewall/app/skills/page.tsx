import Link from "next/link";
import data from "@/public/data/resume_json.json" assert { type: "json" };
import ToolboxWheel from "./ToolboxWheel";

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
    const supporting = [...new Set(Object.values(groups).flat())].filter((s) => !featured.has(s));

    return (
        <div className="mx-auto w-full max-w-[1100px] px-4 pb-24 pt-20 sm:px-8 md:px-10">
            <div className="mb-14 grid items-center gap-10 lg:grid-cols-[1fr_380px]">
                <div>
                    <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#37accd]">Toolbox</p>
                    <h1 className="text-3xl font-bold text-[#ededed] sm:text-4xl">Technical Skills</h1>
                    <p className="mt-3 max-w-xl text-lg text-[#9ca3af]">{pageStartText[0]}</p>
                    <p className="mt-1 text-sm text-[#6b7280]">{pageStartText[1]}</p>
                </div>
                <ToolboxWheel names={toolbox} />
            </div>

            <div className="flex flex-col gap-6">
                {capabilities.map((cap) => (
                    <section
                        key={cap.id}
                        aria-labelledby={cap.id}
                        className="grid gap-6 rounded-xl border border-[#2a2d30] bg-[#111315] p-5 sm:p-7 md:grid-cols-[1.1fr_1fr] md:gap-10"
                    >
                        <div className="flex flex-col gap-4">
                            <h2 id={cap.id} className="text-xl font-semibold text-[#ededed]">{cap.title}</h2>
                            <p className="text-[15px] leading-relaxed text-[#9ca3af]">{cap.context}</p>
                            <ul className="flex flex-wrap gap-2" aria-label={`${cap.title} skills`}>
                                {cap.skills.map((skill) => (
                                    <li key={skill} className="rounded border border-[#2a2d30] px-2.5 py-1 text-sm text-[#ededed]">
                                        {label(skill)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#9ca3af]">Where this shows up</h3>
                            <ul className="flex flex-col gap-1">
                                {cap.evidence.map((e) => (
                                    <li key={e.label}>
                                        <Link
                                            href={e.href}
                                            className="group flex min-h-10 items-start gap-2 py-1.5 text-sm leading-snug text-[#d1d5db] hover:text-[#37accd]"
                                        >
                                            <span aria-hidden="true" className="text-[#37accd] transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none">→</span>
                                            {e.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                ))}
            </div>

            <section aria-labelledby="also" className="mt-12">
                <h2 id="also" className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#9ca3af]">
                    Also in the toolbox
                </h2>
                <p className="text-sm leading-loose text-[#6b7280]">
                    {supporting.map(label).join(" · ")}
                </p>
            </section>
        </div>
    );
};

export default Skills;

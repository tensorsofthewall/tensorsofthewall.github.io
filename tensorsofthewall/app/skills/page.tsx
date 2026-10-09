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

const GROUP_TITLE: Record<string, string> = {
    languages: "Languages",
    databases: "Data",
    devOpsAndSimulators: "DevOps & Simulators",
    frameworks: "Frameworks",
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
    const supporting = Object.entries(groups)
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

            <div className="grid gap-6 md:grid-cols-2">
                {capabilities.map((cap, i) => (
                    <section
                        key={cap.id}
                        aria-labelledby={cap.id}
                        className="relative flex flex-col gap-5 overflow-hidden rounded-xl border border-[#2a2d30] border-t-2 border-t-[#37accd]/70 bg-[#111315] p-5 sm:p-7"
                    >
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute right-5 top-3 select-none text-6xl font-bold leading-none text-[#ededed]/[0.05]"
                        >
                            {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                            <h2 id={cap.id} className="text-xl font-semibold text-[#ededed]">{cap.title}</h2>
                            <p className="mt-2 text-[15px] leading-relaxed text-[#9ca3af]">{cap.context}</p>
                        </div>
                        <p className="border-l-2 border-[#37accd] pl-3 text-sm leading-snug text-[#d1d5db]">
                            <span className="mr-1.5 text-2xl font-bold text-[#37accd]">{cap.highlight.value}</span>
                            {cap.highlight.label}
                        </p>
                        <ul className="mt-auto flex flex-wrap gap-2" aria-label={`${cap.title} skills`}>
                            {cap.skills.map((skill) => (
                                <li
                                    key={skill}
                                    className={`rounded border px-2.5 py-1 text-sm ${
                                        cap.primary.includes(skill)
                                            ? "border-[#37accd]/50 bg-[#37accd]/10 text-[#ededed]"
                                            : "border-[#2a2d30] text-[#9ca3af]"
                                    }`}
                                >
                                    {label(skill)}
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>

            <section aria-labelledby="also" className="mt-14">
                <h2 id="also" className="mb-1 text-sm font-semibold uppercase tracking-[0.18em] text-[#9ca3af]">
                    Also in the toolbox
                </h2>
                <p className="mb-5 text-sm text-[#6b7280]">The supporting cast: used often, just not the headline.</p>
                <div className="grid gap-x-8 gap-y-6 rounded-xl border border-[#2a2d30] bg-[#0f1113] p-5 sm:grid-cols-2 sm:p-7 lg:grid-cols-3">
                    {supporting.map((group) => (
                        <div key={group.key}>
                            <h3 className="mb-2.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#9ca3af]">
                                <span aria-hidden="true" className="h-px w-4 bg-[#37accd]/60" />
                                {group.title}
                            </h3>
                            <ul className="flex flex-wrap gap-1.5">
                                {group.skills.map((skill) => (
                                    <li key={skill} className="rounded bg-[#15181b] px-2 py-0.5 text-xs text-[#9ca3af]">
                                        {label(skill)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Skills;

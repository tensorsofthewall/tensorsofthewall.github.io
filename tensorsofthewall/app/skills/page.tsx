import { Tabs } from "antd";
import * as motion from "motion/react-client";
import Image from "next/image";
import data from "@/public/data/resume_json.json" assert { type: "json" };
import badges from "./badges";
import React from "react";

export const revalidate = 3600; // Revalidate every hour


const pageStartText = ["Skills? Let’s just say if it involves code, I can make it work... eventually.","I mean, you're on this website."]

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
    const skills = data.skills;

    const generateSkillImages = (skillList: string[]) => {
        return skillList.map((skill, idx) => (
            <div key={idx} style={{
                display: 'flex',
                height: '4.5vh',
                width: '30vh',
                position: 'relative',
            }}>
                <Image
                    src={badges[skill]}
                    alt={skill}
                    fill
                    sizes="35vh"
                    style={{
                        objectFit: 'contain',
                    }}
                    unoptimized
                />
            </div>
        ));
    }

    const renderSkillList = (skillList: string[]) => {
        const skillImages = generateSkillImages(skillList);
        const totalDuration = 6.2; // Total duration for one complete rotation
        const staggerDelay = totalDuration / skillImages.length;
    
        return (
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
                {skillImages.map((img, idx) => (
                    <motion.div
                        key={idx}
                        className="ferris-wheel-animation pt-10"
                        initial={{ opacity: 0, rotate: 0 }}
                        animate={{ opacity: 1, rotate: 360 }}
                        transition={{
                            opacity: { duration: 0.5, delay: idx * staggerDelay },
                            rotate: {
                                duration: totalDuration,
                                delay: idx * staggerDelay,
                                repeat: Infinity,
                                ease: "linear",
                                repeatDelay: totalDuration
                            },
                        }}
                        style={{
                            position: 'absolute',
                            width: '45vh',
                            height:'45vh',
                            margin: "0 auto",
                            left: '-13vh',
                            top: '0vh'
                        }}
                    >
                        <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: -360 }}
                            transition={{
                                duration: totalDuration,
                                delay: idx * staggerDelay,
                                repeat: Infinity,
                                ease: "linear",
                                repeatDelay: totalDuration,
                            }}
                        >
                            {img}
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        );
    }

    const formatTabTitle = (key: string) => {
        return key.split(/(?=[A-Z])/).map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }

    const items = Object.entries(skills).map(([key, value], index) => ({
        key: index.toString(),
        label: <span className="text-[11.8px] sm:text-lg md:text-xl lg:text-2xl">{formatTabTitle(key)}</span>,
        children: renderSkillList(value),
    }));

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: '20px'}} className="font-['arial'] ">
        <strong className="w-[400px] sm:w-[400px] md:w-[450px] lg:w-[500px]">
            {pageStartText.map((text, index) => (
                <React.Fragment key={index}>
                    <span style={{ fontSize: `${24-index*6}px`}}>
                    {text}<br/>{index ===0 && <br/>}
                    </span>
                </React.Fragment>
            ))}
        </strong>
        <Tabs 
            defaultActiveKey="0" 
            centered 
            animated
            className="text-white-600 justify-center items-center text-center" 
            items={items}
            style={{ color: '#ffffff', paddingTop: '35px', width: '100%' }}
            tabBarGutter={12}
            tabBarStyle={{ marginBottom: '2vh', display: 'flex', justifyContent: 'center' }}
            size="middle"
        />
        </div>
    );
}

export default Skills;

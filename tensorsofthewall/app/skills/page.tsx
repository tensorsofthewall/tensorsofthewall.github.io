"use client";
import { Tabs } from "antd";
import { motion } from "motion/react";
import Image from "next/image";
import data from "../../public/data/resume_json.json" assert { type: "json" };
import badges from "./badges";

const Skills = () => {
    const skills = data.skills;

    const generateSkillImages = (skillList: string[]) => {
        return skillList.map((skill, idx) => (
            <div key={idx} style={{
                display: 'inline-block',
                height: '40px',
                width: '300px',
                position: 'relative',
            }}>
                <Image
                    src={badges[skill]}
                    alt={skill}
                    fill
                    sizes="300px"
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
        const totalDuration = 13; // Total duration for one complete rotation
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
                                ease: "linear"
                            }
                        }}
                    >
                        <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: -360 }}
                            transition={{
                                duration: totalDuration,
                                delay: idx * staggerDelay,
                                repeat: Infinity,
                                ease: "linear"
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
        label: <span style={{ fontSize: '24px' }}>{formatTabTitle(key)}</span>,
        children: renderSkillList(value),
    }));

    return (
        <Tabs 
            defaultActiveKey="0" 
            centered 
            className="text-white-600 justify-center items-center text-center" 
            items={items}
            style={{ color: '#ffffff', paddingTop: '75px', width: '100%' }}
            tabBarGutter={64}
            tabBarStyle={{ marginBottom: '40px' }}
        />
    );
}

export default Skills;

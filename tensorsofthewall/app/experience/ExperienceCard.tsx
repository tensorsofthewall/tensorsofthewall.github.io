"use client";
import React, { useState } from "react";
import Image from "next/image";
import Card from "antd/es/card/Card";

export interface ExperienceEntry {
    kind: ('research' | 'industry')[];
    name: string;
    logo: string;
    url: string;
    location: string;
    duration: string;
    position: string;
    type: string;
    achievements: string[];
    note?: string;
    supervisor?: string;
}

interface ExperienceCardProps extends ExperienceEntry {
    /** When true the card sits inline in the timeline row: no floating transforms, no width expansion */
    embedded?: boolean;
}

const ExperienceCard = ({ embedded = false, ...data }: ExperienceCardProps) => {
    const { name, logo, url, location, position, type, achievements, note, kind } = data;
    const [achievementsOpen, setAchievementsOpen] = useState(false);

    return (
        <Card
            hoverable
            className="text-center items-center justify-center relative"
            title={
                <a href={url} target="_blank">
                    <div className="flex justify-center items-center w-full">
                        <Image
                            src={logo}
                            alt={name}
                            width={embedded ? 64 : 128}
                            height={embedded ? 64 : 128}
                            style={{ objectFit: "scale-down", backgroundColor: "#fffffff" }}
                        />
                    </div>
                </a>
            }
            onClick={() => setAchievementsOpen(!achievementsOpen)}
            style={{
                width: embedded ? '100%' : (achievementsOpen ? '140%' : '100%'),
                transition: 'all 0.3s ease-in-out',
                cursor: 'pointer',
                transform: embedded
                    ? undefined
                    : (achievementsOpen ? 'translateY(-65%) translateX(13%)' : 'translateY(-40%) translateX(0)'),
                zIndex: achievementsOpen ? 10 : 1,
                background: 'white',
            }}
            styles={{
                header: { background: 'white', padding: embedded ? '8px 12px' : undefined },
                body: { background: 'white', padding: embedded ? '8px 12px' : undefined },
            }}
        >
            {embedded ? (
                <div className="text-center mb-2 space-y-1.5">
                    <div className="flex gap-1 justify-center flex-wrap">
                        {kind.map(k => (
                            <span key={k} className={`inline-block px-2 py-0.5 text-xs rounded-full font-bold ${k === 'research' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                                {k === 'research' ? 'Research' : 'Engineering'}
                            </span>
                        ))}
                    </div>
                    <div className="text-xs font-semibold text-gray-800 leading-tight">{position}</div>
                    <div className="text-xs text-gray-500">{type} · {location}</div>
                </div>
            ) : (
                <div className="flex flex-row justify-center items-center gap-2 text-black-800 mb-3 flex-wrap">
                    {kind.map(k => (
                        <span key={k} className={`px-2 py-0.5 text-xs rounded-full font-bold ${k === 'research' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                            {k === 'research' ? 'Research' : 'Engineering'}
                        </span>
                    ))}
                    <span className="font-semibold">{position}</span>
                    <span>|</span>
                    <span className="font-semibold">{type}</span>
                    <span>|</span>
                    <span className="font-semibold">{location}</span>
                </div>
            )}
            <div style={{
                maxHeight: achievementsOpen ? '220px' : '0',
                opacity: achievementsOpen ? 1 : 0,
                transition: 'all 0.3s ease-in-out',
                overflow: 'auto',
            }}>
                {note && (
                    <div className={embedded ? 'mb-1' : 'mt-4 mb-2 px-4'}>
                        <p className={`text-gray-700 italic ${embedded ? 'text-xs' : ''}`}>{note}</p>
                        <div className="border-b border-gray-200 my-2"></div>
                    </div>
                )}
                <div className={embedded ? '' : 'mt-4 px-4'}>
                    <h4 className={`font-semibold text-left ${embedded ? 'text-xs mb-1' : 'mb-2'}`}>Achievements</h4>
                    <ul style={{ listStyleType: 'disc', paddingLeft: embedded ? 16 : 20 }} className={`text-left ${embedded ? 'space-y-1.5' : 'space-y-2'}`}>
                        {achievements.map((achievement, index) => (
                            <li key={index} className={`text-gray-700 ${embedded ? 'text-xs' : ''}`}>{achievement}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </Card>
    );
};

export default ExperienceCard;

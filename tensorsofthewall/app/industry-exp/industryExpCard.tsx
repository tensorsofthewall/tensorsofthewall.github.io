"use client";
import React, {useState} from "react";
import Image from "next/image";
import Card from "antd/es/card/Card";

interface IndustryExpProps {
    company: string;
    logo: string;
    url: string;
    location: string;
    duration: string;
    position: string;
    type: string;
    achievements: string[];
    note?: string;
}

const IndustryExpCard = (( data: IndustryExpProps) => {
    const { company, logo, url, location, position, type, achievements, note } = data;
    
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <Card 
            hoverable
            className="text-center items-center justify-center hover:scale-110 relative" 
            title={
                <a href={url} target="_blank">
                    <div className="flex justify-center items-center w-full ">
                        <Image 
                            src={logo} 
                            alt={company} 
                            width={144} 
                            height={144} 
                            style={{
                                objectFit: "scale-down", 
                                backgroundColor: "#fffffff"
                            }} 
                        />
                    </div>
                </a>
            }
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
                width: isExpanded ? '140%' : '100%', // Expands width by 40%
                transition: 'all 0.3s ease-in-out',
                cursor: 'pointer',
                transform: isExpanded ? 'translateY(-65%) translateX(-13%)' : 'translateY(-30%) translateX(0)', // Added translateX to center the expanded card
                zIndex: isExpanded ? 10 : 1
            }}   
        >
            <div className="flex flex-row justify-center items-center gap-2 text-black-800 mb-4">
                <span className="font-semibold">{position}</span>
                <span>|</span>
                <span className="font-semibold">{type}</span>
                <span>|</span>
                <span className="font-semibold">{location}</span>
            </div>
            <div style={{
                maxHeight: isExpanded ? '250px': '0',
                opacity: isExpanded ? 1 : 0,
                transition: 'all 0.3s ease-in-out',
                overflow: 'auto',
                position: 'relative'
            }} className="text-center text-black-800">
                {note && (
                    <div className="mt-4 mb-2 px-4">
                        <p className="text-gray-700 italic">{note}</p>
                        <div className="border-b border-gray-200 my-2"></div>
                    </div>
                )}

                <div className="mt-4 px-4">
                    <h4 className="font-semibold mb-2 text-left">Achievements</h4>
                    <ul className="list-disc text-left pl-5 space-y-1">
                        {achievements.map((achievement, index) => (
                            <li key={index} className="text-gray-700">
                                {achievement}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Card>
    )
});

export default IndustryExpCard;
export type {IndustryExpProps};
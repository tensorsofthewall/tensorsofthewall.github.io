"use client";
import React, { useState } from "react";
import data from "../../public/data/resume_json.json";
import ResearchExpCard, { ResearchExpProps } from "./researchExpCard";
import {motion} from "motion/react";
import PaperCard from "../projects_publications/paperCard";

const pageStartText = "Research: Where \‘what if\’ turns into months of debugging and a publication that makes it all worth it."

const ResearchExp = () => {
    const researchExperience = data.researchExperience;
    const [expandedCard, setExpandedCard] = useState<number | null>(null);
    
    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}} className="font-['arial']">
                <strong style={{ fontSize: '24px', marginTop: '2rem', width: '450px' }}>{pageStartText}</strong>
            </div>
            <div className="flex flex-col w-full items-center justify-center min-h-screen -translate-y-[5%]" >
                <div className="w-full max-w-6xl">
                    <div className="relative flex flex-row min-w-max p-1">
                        {/* Timeline base line */}
                        <div className="absolute h-1 w-full bg-white opacity-90 top-1/2 transform -translate-y-1/2">
                        </div>
                        
                        {/* Timeline items */}
                        <div className="flex flex-row justify-between w-full relative z-10">
                            {researchExperience.map((exp: ResearchExpProps, i: number) => (
                                <div key={i} className="flex flex-col items-center text-center">
                                    {/* Logo/Timeline point */}
                                    <div className="relative -translate-y-1/4 mb-4">
                                        <div 
                                            onClick={() => setExpandedCard(expandedCard === i ? null : i)}
                                            className="mb-3 cursor-pointer transform transition-transform hover:scale-110"
                                            style={{
                                                background: 'rgba(255, 255, 255, 0.1)',
                                                padding: '5px',
                                                borderRadius: '50%',
                                                backdropFilter: 'blur(5px)'
                                            }}
                                        >
                                            <picture>
                                            <img
                                                src={exp.logo}
                                                alt={exp.organization}
                                                className="w-24 h-24 rounded-full object-contain bg-white"
                                            />
                                            </picture>
                                        </div>
                                        
                                        {/* Circle aligned with logo */}
                                        <div className="relative 
                                        top-1/8 bottom- left-1/2 transform -translate-x-1/2 -translate-y-1/8 w-4 h-4 bg-white rounded-full">
                                            <div className="absolute w-10 h-10 bg-white bg-opacity-10 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                                        </div>
                                    </div>
                                    
                                    {/* Duration label */}
                                    <span className="text-xl text-white-700 opacity-100 mt-2 font-medium drop-shadow-lg">
                                        {exp.duration}
                                    </span>
                                    
                                    {/* Card container */}
                                    <motion.div 
                                        className="absolute mt-2 w-64 text-center items-center"
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ 
                                            scale: expandedCard === i ? 1 : 0,
                                            opacity: expandedCard === i ? 1 : 0,
                                            y: expandedCard === i ? -200 : 0
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ResearchExpCard {...exp} />
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResearchExp;
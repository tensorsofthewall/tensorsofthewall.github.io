"use client";
import React, { useState } from "react";
import ResearchExpCard, { ResearchExpProps } from "./researchExpCard";
import { motion } from "motion/react";

interface Props {
    researchExperience: ResearchExpProps[];
    pageStartText: string;
    pageSubText: string;
}

const ResearchExpClient: React.FC<Props> = ({ researchExperience, pageStartText, pageSubText }) => {
    const [expandedCard, setExpandedCard] = useState<number | null>(null);

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}} className="font-['arial']">
                <strong style={{ marginTop: '2rem'}} className="w-[400px] sm:w-[400px] md:w-[450px] lg:w-[500px] text-medium sm:text-large md:text-xl lg:text-2xl">{pageStartText}<div className="blur-sm hover:blur-none transition-all duration-300" 
                style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
                <h1 style={{ fontSize: '18px', whiteSpace: 'pre-line'}}>{pageSubText}</h1>
            </div></strong>
            </div>
            <div className="flex flex-col w-full items-center justify-center min-h-screen -translate-y-[0.7%]" >
                <div className="w-full sm:md:lg:xl:max-w-7xl">
                    <div className="relative flex flex-row min-w-max p-1">
                        {/* Timeline base line */}
                        <div className="absolute h-1 w-full bg-white opacity-90 top-1/2 transform -translate-y-1/2">
                        </div>
                        
                        {/* Timeline items */}
                        <div className="flex flex-row justify-between w-full relative z-10">
                            {researchExperience.map((exp: ResearchExpProps, i: number) => (
                                <React.Fragment key={i}>
                                <div className="flex flex-col items-center text-center">
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
                                                className="w-8 h-8 sm:w-12 sm:h-12 md:w-18 md:h-18 lg:w-24 lg:h-24 rounded-full object-contain bg-white"
                                            />
                                            </picture>
                                        </div>
                                        
                                        {/* Circle aligned with logo */}
                                        <div className="relative 
                                        top-1/8 bottom-1/8 left-1/2 transform -translate-x-1/2 translate-y-[9px] sm:translate-y-[6px] md:translate-y-[6px] lg:translate-y-[14px] xl:translate-y-[14px]  w-4 h-4 max-sm:w-3 max-sm:h-3 bg-white rounded-full">
                                            <div className="absolute w-10 h-10 max-sm:w-8 max-sm:h-8 bg-white bg-opacity-10 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                                        </div>
                                    </div>
                                    
                                    {/* Duration label */}
                                    <span className="text-xs sm:text-medium md:text-large lg:text-xl text-white-700 opacity-100 mt-2 font-medium drop-shadow-lg" style={{width: '150px'}}>
                                        {exp.duration}
                                    </span>
                                    
                                    {/* Card container */}
                                    <motion.div 
                                        className="absolute mt-2 w-64 text-center items-center"
                                        style={{ willChange: 'transform, opacity' }}
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
                                {/* Arrow between items, except after the last item */}
                                {i < researchExperience.length - 1 && (
                                    <svg
                                    className="mx-2 my-auto w-7 h-7"
                                    viewBox="0 0 24 24"
                                    fill="#fff"
                                    xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <polygon points="12,12 8,5 20,12 8,19" />
                                    </svg>
                                )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResearchExpClient;
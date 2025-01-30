"use client";
import React, { useState } from "react";
import { Card } from "antd";
import Image from "next/image";

interface ProjectCardProps {
    name: string;
    // duration: string;
    url?: string;
    web_description: string[];
    image?: string;
}

const ProjectCard = ((projectProps: ProjectCardProps) => {
    const {name, url, web_description, image} = projectProps;

    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Card 
            hoverable
            className="center text-center items-center justify-center cursor-pointer"
            cover={
                <div className="h-200 w-200 items-center justify-center text-center cursor-pointer"
                style={{
                    transform: isExpanded ? 'translateY(0%) translateX(18%)' : 'translateY(0%) translateX(13%)'
                }}
                > 
                {/* Container for image */}
                {image &&
                    <Image
                        src={image}
                        alt={name + " figure"}
                        width={256}
                        height={256}
                        style={{
                            objectFit: "cover",
                            
                        }}
                    />
                }
                </div>
            }
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
                width: isExpanded ? '400px' : '350px',
                height: isExpanded ? '600px' : '360px',
                transition: 'all 0.3s ease-in-out',
                cursor: 'pointer',
                transform: isExpanded ? 'translateY(-5%) translateX(0%)' : 'translateY(20%) translateX(0)',
                zIndex: isExpanded ? 10 : 1,
                backgroundColor: '#0a0a0a',
                marginTop: '2rem',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {/* Project Name */}
            <div className={`font-bold text-lg mb-2`}
            style={{
                transform: (url &&isExpanded) ? 'translateY(-30%) translateX(0%)' : 'translateY(0%) translateX(0%)',
            }}
            >
            { url ?  (
                <a href={url} target="_blank" rel="noopener noreferrer" style={{color: '#37accd', fontSize: '20px '}}>
                    <strong>{name}</strong>
                </a>
            ) : (
                <span style={{color: '#37accd'}}><strong>{name}</strong></span>
            )}
            </div>

            <div style={{
                maxHeight: isExpanded ? '250px' : '0',
                opacity: isExpanded ? 1 : 0,
                transition: 'all 0.3s ease-in-out',
                overflow: 'scroll',
            }}>

                {/* Description */}
                <div className="px-4">
                    <h4 className="font-semibold mb-2 text-center" style={{color: '#f5f5f5', fontSize:'16px'}}>Description<br/><br/></h4>
                    <p className="text-left text-sm" style={{color: '#f5f5f5'}}>
                        {web_description.map((desc,index) => (
                        <React.Fragment key={index}>
                            {desc}
                            {index < desc.length - 1 && <><br /><br /></>}
                        </React.Fragment>
                        ))}
                    </p>
                
                </div>
            </div>
        </Card>
    )
});

export default ProjectCard;
export type { ProjectCardProps };
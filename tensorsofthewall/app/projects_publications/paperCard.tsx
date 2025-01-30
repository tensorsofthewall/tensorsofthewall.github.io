"use client";
import React, {useState} from "react";
import { Card } from "antd";
import Image from "next/image";

interface PaperCardProps {
    title: string;
    abstract: string[];
    link: string;
    figure: string;
    conference: string;
    conference_url?: string;
    authors: string[];
}


const PaperCard = ((paperProps: PaperCardProps) => {
    const {
        title,
        abstract,
        link,
        figure,
        conference,
        conference_url,
        authors
    } = paperProps;

    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Card
            hoverable
            className="text-center items-center justify-center cursor-pointer"
            cover={
                <div className="h-200 w-200 p-2"> {/* Container for image */}
                    <Image
                        src={figure}
                        alt={title + " figure"}
                        width={512}
                        height={512}
                        style={{
                            objectFit: "fill",
                        }}
                    />
                </div>
            }
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
                width: isExpanded ? '400px' : '350px',
                height: isExpanded ? '600px' : '360px',
                transition: 'all 0.3s ease-in-out',
                cursor: 'pointer',
                transform: isExpanded ? 'translateY(-5%) translateX(-5%)' : 'translateY(20%) translateX(0)',
                zIndex: isExpanded ? 10 : 1,
                backgroundColor: '#0a0a0a',
                marginTop: '2rem',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {/* Paper Title */}
            <div className="font-bold text-lg mb-2">
                <a href={link} target="_blank" rel="noopener noreferrer" style={{color: '#37accd', fontSize: '18px '}}>
                    {title}
                </a>
            </div>

                {/* Authors */}
                <div className="text-sm mb-2"
            style={{
                color: '#f5f5f5',}}
            >
                {/* {authors.join(', ')} */}
                {authors.map((author, index)=>(
                    <React.Fragment key={index}>
                        {author === 'S. Bharadwaj' ? <a href="https://scholar.google.com/citations?user=1JcdIt8AAAAJ&hl=en" target="_blank"><strong style={{color:'#eab676'}}>{author}</strong></a> : author}
                        {index < authors.length - 1 ? ', ' : ''}
                    </React.Fragment>
                ))}
            </div>

            {/* Conference with link */}
            <div className="font-semibold mb-2">
                <a href={conference_url} target="_blank" rel="noopener noreferrer" 
                   className="hover:text-blue-700"
                   style={{
                    color: '#f5f5f5',
                    fontSize: "18px"
                   }}>
                    {conference}
                </a>
            </div>

            {/* Expanded Content */}
            <div style={{
                maxHeight: isExpanded ? '250px' : '0',
                opacity: isExpanded ? 1 : 0,
                transition: 'all 0.3s ease-in-out',
                overflow: 'auto',
            }}>

                {/* Abstract */}
                <div className="mt-4 px-4">
                    <h4 className="font-semibold mb-2 text-center" style={{color: '#f5f5f5', fontSize:'16px'}}>Abstract<br/></h4>
                    <p className="text-left text-sm" style={{color: '#f5f5f5'}}>
                        {abstract.map((abs, index)=>(
                    <React.Fragment key={index}>
                        {abs}
                        {index < abstract.length - 1 && <><br /><br /></>}
                    </React.Fragment>
                ))}
                    </p>
                </div>
            </div>
        </Card>
    );
});

export default PaperCard;
export type { PaperCardProps };
"use client";
import Image from 'next/image';
import React, { useState, useMemo } from 'react';
import { Timeline, Card } from "antd";
import { FaGraduationCap } from "react-icons/fa";
import 'antd/dist/reset.css';

interface Education {
    institution: string;
    logo: string;
    degree: string | string[];
    graduation: string;
    coursework: string[];
    startDate: string;
    positions: string[];
}

const EducationCard = React.memo(({ educationData }: { educationData: Education }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { institution, logo, degree, coursework, positions } = educationData;

    // Memoize coursework and positions rendering
    const courseworkList = useMemo(() => (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '10px',
                padding: '10px',
                overflowX: 'hidden'
            }}
            className='items-center justify-center'
        >
            {coursework.map((course, idx) => (
                <div key={idx} style={{
                    padding: '10px',
                    backgroundColor: '#087099',
                    borderRadius: '5px',
                    textAlign: 'center',
                    paddingRight: '2px',
                    paddingLeft: '2px'
                }}>
                    <strong>{course}</strong>
                </div>
            ))}
        </div>
    ), [coursework]);

    const positionsList = useMemo(() => (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(1, minmax(200px, 1fr))',
                gap: '10px',
                padding: '10px',
                overflowX: 'hidden'
            }}
            className='items-center justify-center'
        >
            <h4><strong style={{ fontSize: '18px' }}><u>Positions</u></strong></h4>
            {positions.map((por, idx) => (
                <div key={idx} style={{
                    padding: '10px',
                    backgroundColor: '#087099',
                    borderRadius: '5px',
                    textAlign: 'center',
                    paddingRight: '1px',
                    paddingLeft: '1px',
                    overflow: 'visible'
                }}>
                    <strong>{por}</strong>
                </div>
            ))}
        </div>
    ), [positions]);

    return (
        <Card
            hoverable
            className="custom-card text-center items-center justify-center "
            title={
                <div className="flex justify-center items-center w-full">
                    <Image
                        src={logo}
                        alt={institution}
                        width={160}
                        height={160}
                        style={{
                            objectFit: "scale-down",
                            backgroundColor: "#0a0a0a",
                            margin: '0 auto'
                        }}
                    />
                </div>
            }
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
                width: isExpanded ? '150%' : '100%',
                transition: 'all 0.3s ease-in-out',
                cursor: 'pointer',
                backgroundColor: '#0a0a0a',
                transform: isExpanded ? 'translateX(-10%)' : 'translateX(-1%)',
            }}
            styles={{
                header: {
                    display: "flex",
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%'
                }
            }}
        >
            <div>
                <p><strong style={{ fontSize: "18px" }}>{degree}</strong></p>
            </div>
            <div style={{
                maxHeight: isExpanded ? 'fit-content' : '0',
                opacity: isExpanded ? 1 : 0,
                transition: 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out',
                overflow: 'hidden',
            }}>
                {institution.includes("Boston") ? (
                    <div>
                        <div style={{ borderBottom: '1px solid white', margin: '1rem 0' }}></div>
                        <p><strong style={{ fontSize: "17px" }}><u>Research Thesis</u></strong></p>
                        <p style={{ fontSize: "17px" }}>Efficient Vision and Language Models for Autonomous Systems</p>
                        <p>
                            [<a href='/data/Efficient Vision and Language Models for Autonomous Systems - MS Thesis Defense - Sandesh Bharadwaj.pptx' target='_blank' style={{ color: '#3344dd', marginRight: '1px', fontSize: '15px' }}> <b>slides</b></a> |
                            <a href='/data/Efficient Vision and Language Models for Autonomous Systems - MS Thesis - Sandesh Bharadwaj.pdf' target='_blank' style={{ color: '#3344dd', marginLeft: '1px', fontSize: '15px' }}> <b>pdf</b></a> ]
                        </p>
                        <hr style={{ borderColor: 'white', margin: '1rem 0' }} />
                    </div>
                ) : (
                    <div>
                        <div style={{ borderBottom: '1px solid white', margin: '1rem 0' }}></div>
                    </div>
                )}
                <br />
                <h4><strong style={{ fontSize: '18px' }}><u>Coursework</u></strong></h4>
                {courseworkList}
                <br /><hr style={{ borderColor: 'white' }} /><br />
                {positionsList}
            </div>
        </Card>
    );
});

EducationCard.displayName = "EducationCard";

const EducationTimeline = React.memo(({ educationData }: { educationData: Education[] }) => {
    // Memoize timeline items to avoid recalculation unless educationData changes
    const items = useMemo(() => educationData.map((edu, index) => ({
        key: index,
        label: (
            <div style={{
                flexDirection: 'column-reverse',
                alignItems: 'center',
                paddingLeft: '15px',
                paddingRight: '15px',
            }}>
                <span><strong className='tracking-tighter text-sm sm:text-md md:text-lg lg:text-xl'>{edu.startDate} - {edu.graduation}</strong></span>
            </div>
        ),
        children: (
            <div className="flex w-full -translate-x-[1vh] sm:-translate-x-[5.5vh] md:-translate-x-[7.5vh] lg:-translate-x-[12.5vh]" style={{
                justifyContent: 'center',
                maxWidth: '250px',
                margin: '0 auto',
                paddingLeft: '50px',
                paddingRight: '15px',
            }}>
                <div className='w-[200px] sm:w-[200px] md:w-[250px] lg:w-[300px]'>
                    <EducationCard educationData={edu} />
                </div>
            </div>
        ),
        dot: <FaGraduationCap style={{
            color: "#f5f5f5",
            fontSize: '24px',
            margin: '10px 0 10px 0',
            transform: `translateY('5px')`,
        }} />,
        style: { color: "#f5f5f5", fontSize: '20px' },
    })), [educationData]);

    return (
        <div className="max-w-[1200px] mx-auto">
            <Timeline mode="left" items={items} />
        </div>
    );
});

EducationTimeline.displayName = "EducationTimeline";

export default EducationTimeline;
export type { Education };
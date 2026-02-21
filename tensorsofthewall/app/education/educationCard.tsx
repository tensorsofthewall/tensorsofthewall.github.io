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
                gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                gridAutoRows: '1fr',
                gap: '8px',
                padding: '8px',
            }}
        >
            {coursework.map((course, idx) => (
                <div key={idx} style={{
                    padding: '8px',
                    backgroundColor: '#087099',
                    borderRadius: '5px',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <strong className="text-xs sm:text-sm md:text-base" style={{ wordBreak: 'break-word' }}>{course}</strong>
                </div>
            ))}
        </div>
    ), [coursework]);

    const positionsList = useMemo(() => (
        <div>
            <h4 className="mb-2"><strong className="text-sm sm:text-base md:text-lg"><u>Positions</u></strong></h4>
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
                gridAutoRows: '1fr',
                gap: '8px',
                padding: '8px',
            }}
        >
            {positions.map((por, idx) => (
                <div key={idx} style={{
                    padding: '8px',
                    backgroundColor: '#087099',
                    borderRadius: '5px',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <strong className="text-xs sm:text-sm md:text-base" style={{ wordBreak: 'break-word' }}>{por}</strong>
                </div>
            ))}
        </div>
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
                width: '100%',
                transition: 'all 0.3s ease-in-out',
                cursor: 'pointer',
                backgroundColor: '#0a0a0a',
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
                <p><strong className="text-sm sm:text-base md:text-lg lg:text-xl">{degree}</strong></p>
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
                        <p><strong className="text-sm sm:text-base md:text-lg"><u>Research Thesis</u></strong></p>
                        <p className="text-sm sm:text-base md:text-lg">Efficient Vision and Language Models for Autonomous Systems</p>
                        <p className="text-xs sm:text-sm md:text-base">
                            [<a href='/data/Efficient Vision and Language Models for Autonomous Systems - MS Thesis Defense - Sandesh Bharadwaj.pptx' target='_blank' style={{ color: '#3344dd', marginRight: '1px' }}> <b>slides</b></a> |
                            <a href='/data/Efficient Vision and Language Models for Autonomous Systems - MS Thesis - Sandesh Bharadwaj.pdf' target='_blank' style={{ color: '#3344dd', marginLeft: '1px' }}> <b>pdf</b></a> ]
                        </p>
                        <hr style={{ borderColor: 'white', margin: '1rem 0' }} />
                    </div>
                ) : (
                    <div>
                        <div style={{ borderBottom: '1px solid white', margin: '1rem 0' }}></div>
                    </div>
                )}
                <br />
                <h4><strong className="text-sm sm:text-base md:text-lg"><u>Coursework</u></strong></h4>
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
            <div className="w-full pr-4">
                <div className='w-full max-w-[400px]'>
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
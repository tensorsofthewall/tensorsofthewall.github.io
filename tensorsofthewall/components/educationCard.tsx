"use client";
import Image from 'next/image';
import React, {useState} from 'react';
import {Timeline, Card} from "antd";
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

const EducationCard = ({ educationData }: {educationData: Education}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { institution, logo, degree, coursework, positions } = educationData;

    return (
        <Card 
            className="custom-card text-center items-center justify-center" 
            title={
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <Image src={logo} alt={institution} width={160} height={160} />
                </div>
            }
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
                width: '105%',
                transition: 'all 0.3s ease-in-out',
                cursor: 'pointer'
            }}
            
        >
            {institution.includes("Boston") ? (
            <div>
                <p><strong style={{fontSize:"18px"}}>{degree}</strong></p>
                <div style={{ borderBottom: '1px solid white', margin: '1rem 0' }}></div>
                <p><strong style={{fontSize:"17px"}}><u>Research Thesis</u></strong></p>
                <p>Efficient Vision and Language Models for Autonomous Systems</p>
                <p>
                [<a href='/data/Efficient Vision and Language Models for Autonomous Systems - MS Thesis Defense - Sandesh Bharadwaj.pptx' target='_blank' style={{color: '#3344dd', marginRight: '1px'}}> slides</a> | 
                <a href='/data/Efficient Vision and Language Models for Autonomous Systems - MS Thesis - Sandesh Bharadwaj.pdf' target='_blank' style={{color: '#3344dd', marginLeft: '1px'}}> pdf</a> ]
                </p>
                <hr style={{ borderColor: 'white', margin: '1rem 0' }} />
            </div>
            ) : (
            <div>
                <p><strong style={{fontSize:"18px"}}>{degree}</strong></p>
                <div style={{ borderBottom: '1px solid white', margin: '1rem 0' }}></div>
            </div>
            )}
            
            <div style={{
                maxHeight: isExpanded ? 'fit-content' : '0',
                opacity: isExpanded ? 1 : 0,
                transition: 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out',
                overflow: 'hidden',
            }}>
                <br />
                <h4><strong style={{fontSize: '18px'}}><u>Coursework</u></strong></h4>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '10px',
                    padding: '10px',
                    overflowX: 'hidden'
                }} className='items-center justify-center'>
                    {coursework.map((course, idx) => (
                        <div key={idx} style={{
                            padding: '10px',
                            backgroundColor: '#000000',
                            borderRadius: '5px',
                            textAlign: 'center',
                            paddingRight: '2px',
                            paddingLeft: '2px'
                        }}>
                            <strong>{course}</strong>
                        </div>
                    ))}
                </div>
                <br/><hr style={{ borderColor: 'white'}} /><br />
                
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(1, minmax(250px, 1fr))',
                    gap: '10px',
                    padding: '10px',
                    overflowX: 'hidden'
                }} className='items-center justify-center'>
                <h4><strong style={{fontSize: '18px'}}><u>Positions</u></strong></h4>
                    {positions.map((por, idx) => (
                            <div key={idx} style={{
                                padding: '10px',
                                backgroundColor: '#000000',
                                borderRadius: '5px',
                                textAlign: 'center',
                                paddingRight: '2px',
                                paddingLeft: '2px'
                            }}>
                                <strong>{por}</strong>
                            </div>
                        ))}
                </div>
            </div>
        </Card>
    )
};

const EducationTimeline = ({ educationData }: {educationData: Education[]}) => {
    const items = educationData.map((edu, index) => ({
        key: index,
        label: (
            <div style={{
                flexDirection: index % 2 === 0 ? 'column' : 'column-reverse',
                alignItems: index % 2 === 0 ? 'flex-start' : 'flex-end',
            }}>
                <span><strong className='tracking-tighter'>{edu.startDate} - {edu.graduation} </strong></span>
            </div>
        ),
        children: (
            <div style={{
                display: 'flex',
                justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end',
                paddingLeft: index % 2 === 0 ? '30px' : '25px',
                paddingRight: index % 2 === 0 ? '25px' : '30px',
            }}>
                <div style={{ width: '40%' }}>
                    <EducationCard educationData={edu} />
                </div>
            </div>
        ),
        color: 'red',
        dot: (
            <FaGraduationCap 
                style={{ 
                    color: "#f5f5f5", 
                    fontSize: '20px', 
                    marginBottom: index % 2 === 0 ? '10px' : '0px',
                    marginTop: index % 2 === 0 ? '0px' : '10px',
                }}
            />
        ),
        style: { color: "#f5f5f5", fontSize: '20px'},
    }));

    return (
        <Timeline 
            mode="alternate" 
            items={items}
        />
    );
}


export default EducationTimeline;
export type {Education};
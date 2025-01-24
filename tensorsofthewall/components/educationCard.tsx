"use client";
import Image from 'next/image';
import React, {useState, useRef} from 'react';
import {motion, useScroll, useTransform} from "motion/react"
import {Timeline, Card} from "antd";
import { FaGraduationCap } from "react-icons/fa";
import 'antd/dist/reset.css';
import Header from './header';
import Home from '@/app/page';

interface Education {
    institution: string;
    logo: string;
    degree: string | string[];
    graduation: string;
    coursework: string[];
    startDate: string;
  }

const EducationCard = ({ educationData }: {educationData: Education}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { institution, logo, degree, coursework } = educationData;

    return (
        <Card 
            className="custom-card text-center items-center justify-center" 
            title={
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <Image src={logo} alt={institution} width={144} height={144} />
                </div>
            }
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
                width: '100%',
                transition: 'all 0.3s ease-in-out',
                cursor: 'pointer'
            }}
        >
            <p><strong>{institution.includes("Boston") ? (
                <>
                {degree}
                <br /> <br />
                <strong>Research Thesis:</strong> Efficient Vision and Language Models for Autonomous Systems [<a href='/data/Efficient Vision and Language Models for Autonomous Systems - MS Thesis Defense - Sandesh Bharadwaj.pptx' target='_blank' style={{color: '#d5d5d5', marginRight: '1px'}}>slides</a>,<a href='/data/Efficient Vision and Language Models for Autonomous Systems - MS Thesis - Sandesh Bharadwaj.pdf' target='_blank' style={{color: '#d5d5d5', marginLeft: '1px'}}>pdf</a>]
                <br />
                </>
            ) : degree}</strong></p>
            <div style={{
                maxHeight: isExpanded ? '400px' : '0',
                opacity: isExpanded ? 1 : 0,
                transition: 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out',
                overflow: 'hidden',
            }}>
                <br />
                <h4><strong>Coursework</strong></h4>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '10px',
                    padding: '10px'
                }}>
                    {coursework.map((course, idx) => (
                        <div key={idx} style={{
                            padding: '10px',
                            backgroundColor: '#000000',
                            borderRadius: '5px',
                            textAlign: 'center'
                        }}>
                            {course}
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    )
};

// const EducationCard = ({ educationData }: {educationData: Education}) => {
//     const [isExpanded, setIsExpanded] = useState(false);
//     const { institution, logo, degree, coursework } = educationData;
    
//     // Create a ref for the card
//     const cardRef = useRef(null);

//     // Use the useScroll hook to track scroll progress
//     const { scrollYProgress } = useScroll({
//         target: cardRef,
//         offset: ["start start", "end end"]
//     });

//     // Transform scroll progress to opacity
//     const opacity = useTransform(scrollYProgress, [1, 0.85, 0.7], [1, 0.85, 0.1]);

//     return (
//         <motion.div ref={cardRef} style={{ opacity }}>
//             <Card 
//                 className="custom-card text-center items-center justify-center" 
//                 title={
//                     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
//                         <Image src={logo} alt={institution} width={144} height={144} />
//                     </div>
//                 }
//                 onClick={() => setIsExpanded(!isExpanded)}
//                 style={{
//                     width: '100%',
//                     transition: 'all 0.3s ease-in-out',
//                     cursor: 'pointer'
//                 }}
//             >
//                 <p><strong>{institution.includes("Boston") ? (
//                 <>
//                 {degree}
//                 <br /> <br />
//                 <strong>Research Thesis:</strong> Efficient Vision and Language Models for Autonomous Systems
//                 <br />
//                 <a href='/data/Efficient Vision and Language Models for Autonomous Systems - MS Thesis - Sandesh Bharadwaj.pptx' target='_blank' style={{color: '#d5d5d5', marginRight: '20px'}}>Download Slides</a>
//                 <a href='/data/Efficient Vision and Language Models for Autonomous Systems - MS Thesis - Sandesh Bharadwaj.pdf' target='_blank' style={{color: '#d5d5d5', marginLeft: '20px'}}>View PDF</a>
//                 </>
//             ) : degree}</strong></p>
//             <div style={{
//                 maxHeight: isExpanded ? '400px' : '0',
//                 opacity: isExpanded ? 1 : 0,
//                 transition: 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out',
//                 overflow: 'hidden',
//             }}>
//                 <br />
//                 <h4><strong>Coursework</strong></h4>
//                 <div style={{
//                     display: 'grid',
//                     gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
//                     gap: '10px',
//                     padding: '10px'
//                 }}>
//                     {coursework.map((course, idx) => (
//                         <div key={idx} style={{
//                             padding: '10px',
//                             backgroundColor: '#000000',
//                             borderRadius: '5px',
//                             textAlign: 'center'
//                         }}>
//                             {course}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             </Card>
//         </motion.div>
//     );
// };

// const EducationTimeline = ({ educationData }: {educationData: Education[]}) => {
//     const items = educationData.map((edu, index) => ({
//         key: index,
//         label: (
//             <div style={{
//                 flexDirection: index % 2 === 0 ? 'column' : 'column-reverse',
//                 alignItems: index % 2 === 0 ? 'flex-start' : 'flex-end',
//             }}>
//                 <span>{edu.startDate} - {edu.graduation}</span>
//             </div>
//         ),
//         children: (
//             <div style={{
//                 display: 'flex',
//                 justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end',
//                 paddingLeft: index % 2 === 0 ? '30px' : '25px',
//                 paddingRight: index % 2 === 0 ? '25px' : '30px',
//             }}>
//                 <div style={{ width: '40%' }}>
//                     <EducationCard educationData={edu} />
//                 </div>
//             </div>
//         ),
//         color: 'red',
//         dot: (
//             <FaGraduationCap 
//                 style={{ 
//                     color: "#f5f5f5", 
//                     fontSize: '20px', 
//                     marginBottom: index % 2 === 0 ? '10px' : '0px',
//                     marginTop: index % 2 === 0 ? '0px' : '10px',
//                 }}
//             />
//         ),
//         style: { color: "#f5f5f5", fontSize: '20px'},
//     }));

//     return (
//         <Timeline 
//             mode="alternate" 
//             items={items}
//         />
//     );
// }

const EducationTimeline = ({ educationData }: {educationData: Education[]}) => {
    // Create a ref for the timeline
    const timelineRef = useRef(null);

    // Use the useScroll hook to track scroll progress
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start start", "end end"]
    });

    // Transform scroll progress to opacity
    const opacity = useTransform(scrollYProgress, [1, 0.75, 0.25], [1, 0.5, 0]);

    const items = educationData.map((edu, index) => ({
                key: index,
                label: (
                    <div style={{
                        flexDirection: index % 2 === 0 ? 'column' : 'column-reverse',
                        alignItems: index % 2 === 0 ? 'flex-start' : 'flex-end',
                    }}>
                        <span>{edu.startDate} - {edu.graduation}</span>
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
        <motion.div ref={timelineRef} style={{ opacity }}>
            <Timeline 
                mode="alternate" 
                items={items}
            />
        </motion.div>
    );
}


export default EducationTimeline;
export type {Education};
"use client";
import EducationTimeline from './educationCard';
import { useEffect } from 'react';
import data from '../../public/data/resume_json.json' assert { type: 'json' };

const pageStartText = "University: Where I learned to turn coffee into thesis papers and prototypes that mostly worked on the first try."

const EducationPage = () => {
    const educationData = data.education;

    useEffect(() => {
    })
    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}} className="font-['arial]">
                    <strong style={{ fontSize: '24px', marginTop: '2rem', width: '480px' }}>{pageStartText}</strong>
                </div>
            <div className="w-full h-full" style={{paddingTop: "100px"}}> 
                <EducationTimeline educationData={educationData} />
            </div>
        </div>
    );
}

export default EducationPage;
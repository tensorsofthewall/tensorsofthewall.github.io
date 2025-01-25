"use client";
import EducationTimeline from '@/components/educationCard';
import { useEffect } from 'react';
import data from '../../public/data/resume_json.json' assert { type: 'json' };



const EducationPage = () => {
    const educationData = data.education;

    useEffect(() => {
    })
    return (
        <div className="w-full h-full" style={{paddingTop: "60px"}}> 
            <EducationTimeline educationData={educationData} />
        </div>
    );
}

export default EducationPage;
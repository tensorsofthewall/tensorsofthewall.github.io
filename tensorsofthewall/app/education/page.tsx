"use client";
import EducationTimeline from '@/components/educationCard';
import { useEffect } from 'react';



const EducationPage = () => {
    const educationData = require("@/public/data/resume_json.json").education;

    useEffect(() => {
    })
    return (
        <div> 
            <EducationTimeline educationData={educationData} />
        </div>
    );
}

export default EducationPage;
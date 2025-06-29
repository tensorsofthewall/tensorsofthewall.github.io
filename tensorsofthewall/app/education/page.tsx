"use client";
import EducationTimeline from './educationCard';
import data from '@/public/data/resume_json.json' assert { type: 'json' };

const pageStartText = "University: Where I learned to turn coffee into thesis papers and prototypes that mostly worked on the first try."

const EducationPage = () => {
    const educationData = data.education;

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}} className="font-['arial]">
                    <strong style={{marginTop: '2rem'}} className='w-[400px] sm:w-[400px] md:w-[450px] lg:w-[500px] text-medium sm:text-large md:text-xl lg:text-2xl'>{pageStartText}</strong>
                </div>
            <div className="w-full h-full" style={{paddingTop: "11vh"}}> 
                <EducationTimeline educationData={educationData} />
            </div>
        </div>
    );
}

export default EducationPage;
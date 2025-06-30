"use client";
import EducationTimeline from './educationCard';
import data from '@/public/data/resume_json.json' assert { type: 'json' };

const pageStartText = "University: Where I learned to turn coffee into thesis papers and prototypes that mostly worked on the first try."

const pageSubText = "Click on each card to view more details.";

const EducationPage = () => {
    const educationData = data.education;

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}} className="font-['arial]">
                    <strong style={{marginTop: '2rem'}} className='w-[400px] sm:w-[400px] md:w-[450px] lg:w-[500px] text-medium sm:text-large md:text-xl lg:text-2xl'>{pageStartText}<div className="blur-sm hover:blur-none transition-all duration-300" 
                style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
                <h1 style={{ fontSize: '18px', whiteSpace: 'pre-line'}}>{pageSubText}</h1>
            </div></strong>
                </div>
            <div className="w-full h-full max-sm:-translate-x-[5vh]" style={{paddingTop: "11vh"}}> 
                <EducationTimeline educationData={educationData} />
            </div>
        </div>
    );
}

export default EducationPage;
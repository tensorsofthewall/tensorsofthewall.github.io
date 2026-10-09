import EducationTimeline from './educationCard';
import data from '@/public/data/resume_json.json' assert { type: 'json' };

export const revalidate = 3600;

const pageStartText = "University: Where I learned to turn coffee into thesis papers and prototypes that mostly worked on the first try."

const pageSubText = "Click on each card to view more details.";

export async function generateMetadata() {
    const title = "Education | TensorsOfTheWall";
    const description = pageStartText;
    const url = "https://www.tensorsofthewall.com/education";

    return {
        metadataBase: new URL("https://www.tensorsofthewall.com"),
        title,
        description,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
            type: "website",
            images: [
                {
                    url: "https://www.tensorsofthewall.com/images/banners/hero_banner.png",
                    width: 960,
                    height: 640,
                    alt: "TensorsOfTheWall Education Banner",
                },
            ],
        },
        keywords: [
            "education",
            "university",
            "Boston University",
            "Boston",
            "BU",
            "Indian Institute of Information Technology, Design and Manufacturing, Kancheepuram",
            "IIITDM Kancheepuram",
            "IIITDM",
            "Sandesh Bharadwaj",
            "coursework",
            "degrees",
            "research thesis",
            "thesis",
            "master's degree",
            "bachelor's degree",
            "computer science",
            "TensorsOfTheWall",
            "Electronics and Communication Engineering",
            "AUV IIITDM",
            "Autonomous Underwater Vehicle",
            "Vision-language models",
            "Autonomous driving",
        ],
        twitter: {
            card: "summary_large_image",
            title,
            description,
            site: "@tensorofthewall",
            images: ["https://www.tensorsofthewall.com/images/banners/hero_banner.png"],
        },
    };
}

const EducationPage = () => {
    const educationData = data.education;

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}} className="font-['arial]">
                    <strong style={{marginTop: '2rem'}} className='w-[90vw] max-w-[550px] text-sm sm:text-base md:text-xl lg:text-2xl'>{pageStartText}<div className="blur-sm hover:blur-none transition-all duration-300" 
                style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
                <h1 style={{ fontSize: '18px', whiteSpace: 'pre-line'}}>{pageSubText}</h1>
            </div></strong>
                </div>
            <div className="w-full h-full" style={{paddingTop: "5vh"}}>
                <EducationTimeline educationData={educationData} />
            </div>
        </div>
    );
}

export default EducationPage;
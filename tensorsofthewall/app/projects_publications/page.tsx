"use client";
import { Tabs } from 'antd';
import data from '@/public/data/resume_json.json';
import ResearchCarousel from './paperCarousel';
import ProjectCarousel from './projectCarousel';


const pageStartText = 'Here lies some evidence of my ‘productive’ rabbit holes.';

const pageSubText = "Click on the title in each card to view the full details (link opens in new tab).";

const TabCarousel = () => {
    const TabItems = [
        {
            key: '1',
            label: <span style={{ fontSize: '24px' }}>Publications</span>,
            children: (
                <div className='pt-10'>
                <ResearchCarousel papers={data.publications} />
                </div>
            )
        },
        {
            key: '2',
            label: <span style={{ fontSize: '24px' }}>Projects</span>,
            children: (
                <div className='pt-10'>
                <ProjectCarousel projects={data.projects} />
                </div>
            )
        }
    ]

    return (
        <div style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: '75px'}} className="font-['arial']">
            <strong style={{ width: '450px', fontSize: '24px'}}>{pageStartText}</strong>
            <div className="blur-sm hover:blur-none transition-all duration-300" 
                style={{ transform: 'translateY(10%)translateX(38%)',alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
                <h1 style={{ fontSize: '18px', width: '350px', whiteSpace: 'pre-line'}}>{pageSubText}</h1>
            </div>
            <Tabs
                defaultActiveKey="1"
                centered
                animated
                className="text-white-600 justify-center text-center"
                tabBarGutter={48}
                tabBarStyle={{ paddingTop: '10px', marginBottom: '40px', display: 'flex', justifyContent: 'center' }}
                size="small"
                items={TabItems}
            />
        </div>
    )
}

export default TabCarousel;